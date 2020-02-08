import pymongo
from pymongo import MongoClient
import pprint


client = MongoClient("mongodb+srv://dbUser:beholdtheWineCaves@cluster0-itr0f.mongodb.net/test?retryWrites=true&w=majority")
db = client['stores']
#pprint.pprint(db.collection_names())

collection = db['storeOne']
#pprint.pprint(collection.distinct("_id"))
#collection.insert_one({"x":1})
#collection.update_one({"x": 1},{"$inc":{"x":3}})

#doc = collection.find_one({"Name" : "FirstDummy"})
#pprint.pprint(doc)


def addPurchase(docId, collection, quantity):
    col = db[collection]
    #doc = col.find_one({"_id" : docId})
    col.update_one({"_id":docId},{"$inc":{"quantity":quantity}})

def insert(date, weather, quantity, price, product, store):
    col = db[store]
    col.insert_one({"product":product,"price":price,
                    "quantity":quantity, "weather": weather,
                    "date":date})

def subPurchase(docId, collection, quantity):
    col = db[collection]
    doc = col.find_one({"_id" : docId})
    doc["quantity"] = doc["quantity"] - quantity
    col.replace_one({"_id" : docId}, doc)
