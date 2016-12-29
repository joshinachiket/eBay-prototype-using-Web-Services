package com.ebay;

import static com.mongodb.client.model.Filters.and;
import static com.mongodb.client.model.Filters.eq;

import org.bson.Document;
import org.bson.conversions.Bson;

import com.mongodb.DBObject;
import com.mongodb.MongoClient;
import com.mongodb.MongoClientURI;
import com.mongodb.QueryBuilder;
import com.mongodb.client.FindIterable;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;

public class soldHistory {
	public Object removeYourBidAD(String product_id, String username) {

		System.out.println("INSIDE WEB SERVICE REMOVE YOUR BID ITEM");

		MongoClientURI connectionString = new MongoClientURI("mongodb://localhost:27017");
		MongoClient mongoClient = new MongoClient(connectionString);

		MongoDatabase database = mongoClient.getDatabase("EbayDatabaseMongoDB");

		MongoCollection<Document> collection = database.getCollection("history");
		
		DBObject query = QueryBuilder.start("bought_product_original_price").lessThanEquals(7).and("bought_product_original_price").greaterThanEquals(7).get();

		FindIterable<Document> cursor = collection.find((Bson) query);
	
		System.out.println("YOUR SOLD HISTORY ITEMS HAVE BEEN FETCHED");
		return 1;

	}
}
