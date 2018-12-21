package com.godman.anvil.utils;

import java.lang.reflect.Type;
import java.text.DateFormat;
import java.util.ArrayList;
import java.util.List;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

public class JsonUnify {
	private static Gson gson = new GsonBuilder().setDateFormat(DateFormat.FULL, DateFormat.FULL).create();

	public static final String DEFAULT_DATE_FORMAT = "yyyy-MM-dd HH:mm:ss";

	public static <T> T fromJson(String json, Class<T> classOfT) {
		return gson.fromJson(json, classOfT);
	}

	public static <T> T fromJson(String json, Type type) {
		return gson.fromJson(json, type);
	}

	public static String toJson(Object obj) {
		return gson.toJson(obj);
	}

	public static String toJson(Object obj, Type type) {
		return gson.toJson(obj, type);
	}

	public static JsonArray toJsonArray(String json) {
		return new JsonParser().parse(json.trim()).getAsJsonArray();
	}

	public static JsonObject toJsonObject(String json) {
		return new JsonParser().parse(json.trim()).getAsJsonObject();
	}

	public static <T> T fromJson(Class<T> clazz, JsonElement json, String dateFormat) {
		GsonBuilder gsonBuilder = new GsonBuilder();
		gsonBuilder.setDateFormat(dateFormat);
		return gsonBuilder.create().fromJson(json, clazz);
	}

	public static <T> T fromJson(Class<T> clazz, String json, String dateFormat) {
		GsonBuilder gsonBuilder = new GsonBuilder();
		gsonBuilder.setDateFormat(dateFormat);
		return gsonBuilder.create().fromJson(json, clazz);
	}

	public static <T> List<T> fromJsonToList(Class<T> clazz, String json, String dateFormat) {
		List<T> result = new ArrayList<T>();
		JsonArray jsonArray = toJsonArray(json);
		for (JsonElement jsonElement : jsonArray) {
			result.add(fromJson(clazz, jsonElement, dateFormat));
		}
		return result;
	}
}
