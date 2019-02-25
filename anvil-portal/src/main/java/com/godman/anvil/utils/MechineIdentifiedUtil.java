package com.godman.anvil.utils;

import java.net.NetworkInterface;
import java.nio.ByteBuffer;
import java.util.Enumeration;
import java.util.Random;
import java.util.concurrent.atomic.AtomicInteger;

public class MechineIdentifiedUtil {

	private final int _time;

	private final int _machine;

	private final int _inc;

	private static final int _genmachine;

	private static AtomicInteger _nextInc = new AtomicInteger((new java.util.Random()).nextInt());
	
	/**
	 * Gets a new object id.
	 *
	 * @return the new id
	 */
	public static String get() {
		return new MechineIdentifiedUtil().toHexString();
	}
	
	/**
	 * Create a new object id.
	 */
	private MechineIdentifiedUtil() {
		_time = (int) (System.currentTimeMillis() / 1000);
		_machine = _genmachine;
		_inc = _nextInc.getAndIncrement();
	}

	/**
	 * Converts this instance into a 24-byte hexadecimal string representation.
	 *
	 * @return a string representation of the ObjectId in hexadecimal format
	 */
	private String toHexString() {
		final StringBuilder buf = new StringBuilder(24);
		for (final byte b : toByteArray()) {
			buf.append(String.format("%02x", b & 0xff));
		}
		return buf.toString();
	}

	/**
	 * Convert to a byte array. Note that the numbers are stored in big-endian
	 * order.
	 *
	 * @return the byte array
	 */
	private byte[] toByteArray() {
		byte b[] = new byte[12];
		ByteBuffer bb = ByteBuffer.wrap(b);
		// by default BB is big endian like we need
		bb.putInt(_time);
		bb.putInt(_machine);
		bb.putInt(_inc);
		return b;
	}

	static {

		try {
			// build a 2-byte machine piece based on NICs info
			int machinePiece;
			{
				try {
					StringBuilder sb = new StringBuilder();
					Enumeration<NetworkInterface> e = NetworkInterface.getNetworkInterfaces();
					while (e.hasMoreElements()) {
						NetworkInterface ni = e.nextElement();
						sb.append(ni.toString());
					}
					machinePiece = sb.toString().hashCode() << 16;
				} catch (Throwable e) {
					// exception sometimes happens with IBM JVM, use random
					machinePiece = (new Random().nextInt()) << 16;
				}
			}

			// add a 2 byte process piece. It must represent not only the JVM but the class
			// loader.
			// Since static var belong to class loader there could be collisions otherwise
			final int processPiece;
			{
				int processId = new java.util.Random().nextInt();
				try {
					processId = java.lang.management.ManagementFactory.getRuntimeMXBean().getName().hashCode();
				} catch (Throwable t) {
				}

				ClassLoader loader = MechineIdentifiedUtil.class.getClassLoader();
				int loaderId = loader != null ? System.identityHashCode(loader) : 0;

				StringBuilder sb = new StringBuilder();
				sb.append(Integer.toHexString(processId));
				sb.append(Integer.toHexString(loaderId));
				processPiece = sb.toString().hashCode() & 0xFFFF;
			}

			_genmachine = machinePiece | processPiece;
		} catch (Exception e) {
			throw new RuntimeException(e);
		}

	}

}
