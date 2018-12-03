package com.godman.anvil;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.core.env.Environment;

@ComponentScan
@EnableAutoConfiguration
public class Application {

	private static final Logger LOGGER = LoggerFactory.getLogger(Application.class);

	@Autowired
	private Environment env;

	public static void main(String[] args) {
		final SpringApplication app = new SpringApplication(Application.class);
		final Environment env = app.run(args).getEnvironment();
		LOGGER.info("Application start profile is {}", env.getProperty("spring.profiles.active"));
	}
}
