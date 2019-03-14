package com.godman.anvil.utils;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import com.godman.anvil.security.SecurityUser;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

@Component
public class JwtTokenUtil {
	private static final String CLAIM_KEY_USERNAME = "sub";
	private static final String CLAIM_KEY_CREATED = "created";
	private static final String CLAIM_KEY_REFRESH = "refresh";

	@Value("${jwt.secret}")
	private String secret;

	@Value("${jwt.expiration}")
	private Long expiration;

	@Value("${jwt.refreshallow}")
	private Long refreshallow;

	public String getUsernameFromToken(String token) {
		String username;
		try {
			final Claims claims = getClaimsFromToken(token);
			username = claims.getSubject();
		} catch (Exception e) {
			username = null;
		}
		return username;
	}

	private Date getRefreshDateFromToken(String token) {
		Date refreshDate;
		try {
			final Claims claims = getClaimsFromToken(token);
			refreshDate = new Date((Long) claims.get(CLAIM_KEY_REFRESH));
		} catch (ExpiredJwtException e) {
			refreshDate = new Date((Long) e.getClaims().get(CLAIM_KEY_REFRESH));
		} catch (Exception e) {
			refreshDate = null;
		}
		return refreshDate;
	}

	private Date getExpirationDateFromToken(String token) {
		Date expiration;
		try {
			final Claims claims = getClaimsFromToken(token);
			expiration = claims.getExpiration();
		} catch (ExpiredJwtException e) {
			expiration = e.getClaims().getExpiration();
		} catch (Exception e) {
			expiration = null;
		}
		return expiration;
	}

	private Claims getClaimsFromToken(String token) {
		return Jwts.parser().setSigningKey(secret).parseClaimsJws(token).getBody();
	}

	public String generateToken(UserDetails userDetails) {
		Map<String, Object> claims = new HashMap<>();
		claims.put(CLAIM_KEY_USERNAME, userDetails.getUsername());

		Long nowTime = System.currentTimeMillis();
		claims.put(CLAIM_KEY_CREATED, new Date(nowTime));
		claims.put(CLAIM_KEY_REFRESH, new Date(nowTime + refreshallow * 60 * 1000));
		return generateToken(claims);
	}

	public String generateToken(Map<String, Object> claims) {
		Date expirationDate = new Date(((Date) claims.get(CLAIM_KEY_CREATED)).getTime() + expiration * 60 * 1000);
		return Jwts.builder().setClaims(claims).setExpiration(expirationDate).signWith(SignatureAlgorithm.HS512, secret)
				.compact();
	}

	public String refreshToken(String token) {
		Claims claims;
		try {
			claims = getClaimsFromToken(token);
		}catch (ExpiredJwtException e) {
			claims = e.getClaims();
		} catch (Exception e) {
			return null;
		}
		Long nowTime = System.currentTimeMillis();
		claims.put(CLAIM_KEY_CREATED, new Date(nowTime));
		claims.put(CLAIM_KEY_REFRESH, new Date(nowTime + refreshallow * 60 * 1000));
		return generateToken(claims);
	}

	public Boolean isTokenExpired(String token) {
		final Date expiration = getExpirationDateFromToken(token);
		if (expiration == null) {
			return true;
		}
		return expiration.before(new Date());
	}

	public Boolean canTokenBeRefreshed(String token) {
		final Date refreshDate = getRefreshDateFromToken(token);
		if (refreshDate == null) {
			return false;
		}
		return refreshDate.after(new Date());
	}

	public Boolean validateToken(String token, UserDetails userDetails) {
		SecurityUser user = (SecurityUser) userDetails;
		final String username = getUsernameFromToken(token);
		return (username.equals(user.getUsername()) && !isTokenExpired(token));
	}
}
