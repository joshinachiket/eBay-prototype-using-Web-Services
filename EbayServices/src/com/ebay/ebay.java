package com.ebay;

import com.mongodb.MongoClient;
import com.mongodb.MongoClientURI;
import com.mongodb.ServerAddress;

import com.mongodb.client.MongoDatabase;
import com.mongodb.client.MongoCollection;

import org.bson.Document;

import com.mongodb.client.MongoCursor;
import static com.mongodb.client.model.Filters.*;
import com.mongodb.client.result.DeleteResult;
/*import static com.mongodb.client.model.Updates.*;*/
import com.mongodb.client.result.UpdateResult;
import java.util.ArrayList;
import java.util.List;
import javax.jws.WebService;

public class ebay {

	public Object submitAd(String product_name, String product_desc, String product_price, String tot_product,
			String username) {

		System.out.println("INSIDE WEB SERVICE SUBMIT USER ADVERTISEMENT");

		MongoClientURI connectionString = new MongoClientURI("mongodb://localhost:27017");
		MongoClient mongoClient = new MongoClient(connectionString);

		MongoDatabase database = mongoClient.getDatabase("EbayDatabaseMongoDB");

		MongoCollection<Document> collection = database.getCollection("products");

		Document doc = new Document("product_name", product_name)
				.append("product_desc", product_desc)
				.append("product_price", product_price)
				.append("tot_product", tot_product)
				.append("username", username);

		collection.insertOne(doc);
		System.out.println("USER ADVERTISEMENT SUBMITTED");
		return 1;

	}
}
