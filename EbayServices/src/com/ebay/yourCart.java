package com.ebay;

import static com.mongodb.client.model.Filters.and;
import static com.mongodb.client.model.Filters.eq;

import org.bson.Document;

import com.mongodb.BasicDBObject;
import com.mongodb.MongoClient;
import com.mongodb.MongoClientURI;
import com.mongodb.client.FindIterable;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;

public class yourCart {
	public Object removeYourBidAD(String product_id, String username) {

		System.out.println("INSIDE WEB SERVICE REMOVE YOUR BID ITEM");

		MongoClientURI connectionString = new MongoClientURI("mongodb://localhost:27017");
		MongoClient mongoClient = new MongoClient(connectionString);

		MongoDatabase database = mongoClient.getDatabase("EbayDatabaseMongoDB");

		MongoCollection<Document> collection = database.getCollection("cart");
		BasicDBObject query = new BasicDBObject();
		BasicDBObject fields = new BasicDBObject("_id", "1");
		FindIterable<Document> cursor = collection.find(query);
	
		System.out.println("YOUR CURRENT STATUS OF CART IS FETCHED");
		return 1;

	}
}
