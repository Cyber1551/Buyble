import pymongo
from pymongo import MongoClient
import pprint
import flask
from flask import request
from flask import Flask
from flask_cors import CORS
import json
import datetime

app = Flask(__name__)
CORS(app)

client = MongoClient(
    "mongodb+srv://dbUser:beholdtheWineCaves@cluster0-itr0f.mongodb.net/test?retryWrites=true&w=majority")
db = client['stores']
shop = db['shop']


# pprint.pprint(db.collection_names())

# collection = db['storeOne']
# pprint.pprint(collection.distinct("_id"))
# collection.insert_one({"x":1})
# collection.update_one({"x": 1},{"$inc":{"x":3}})

# doc = collection.find_one({"Name" : "FirstDummy"})
# pprint.pprint(doc)


@app.route("/connection", methods=['POST'])
def test():
    return "YEET"


@app.route("/insertData", methods=['POST'])
def data():
    datatoinsert = request.get_data()
    parsed = parseData(datatoinsert)
    print(parsed)
    res = validateProductData(parsed)
    if res["res"] and get_product(parsed["name"]) is None:
        insertPurchase(parsed["date"], "null", parsed["quantity"], parsed["price"], parsed["name"])
        return "SUCCESS"
    else:
        return res["info"]


@app.route('/product/<string:name>', methods=['GET'])
def get_product(name):
    query = shop.find_one({"product": name}, {'_id': False})
    print(query)
    return query


@app.route("/product/addSales", methods=['POST'])
def addPurchase(): #productName, quantity):
    data = request.get_data()
    lst = data.decode('ascii').split('&')
    productName = arr[0].split('=')[1]
    quantity = arr[1].split('=')[1]
    shop.update_one({"product": productName}, {"$inc": {"quantity": quantity}})


def insertPurchase(date, weather, quantity, price, product):
    shop.insert_one({"product": str(product), "price": float(price),
                     "quantity": int(quantity), "weather": str(weather),
                     "date": str(date)})


def subPurchase(docId, collection, quantity):
    col = db[collection]
    doc = col.find_one({"_id": docId})
    doc["quantity"] = doc["quantity"] - quantity
    col.replace_one({"_id": docId}, doc)


def delete(docId, collection):
    col = db[collection]
    col.delete_one({"_id": docId})


def parseData(d):
    arr = d.decode('ascii').split('&')
    name = arr[0].split('=')[1]
    date = arr[1].split('=')[1]
    quantity = arr[2].split('=')[1]
    price = arr[3].split('=')[1]
    obj = {
        "name": name,
        "date": date,
        "quantity": quantity,
        "price": price
    }
    return obj


def validateProductData(d):
    res = {
        "res": True,
        "info": ""
    }
    values = [
        validateString(d["name"]),
        validateInt(d["quantity"]),
        validateFloat(d["price"]),
        validateDate(d["date"])
    ]
    for val in values:
        if not val["res"]:
            res["res"] = False
            res["info"] = val["info"]

    return res


def validateDate(date_text):
    try:
        datetime.datetime.strptime(date_text, '%Y-%m-%d')
        return {
            "res": True
        }
    except ValueError:
        return {
            "res": False,
            "info": "Value {} is not an date".format(date_text)
        }


def validateString(text):
    if len(text) > 0 and text is not None:
        return {
            "res": True
        }
    else:
        return {
            "res": False,
            "info": "Value '{}' cannot be an empty string".format(text)
        }


def validateFloat(flt):
    try:
        float(flt)
        return {
            "res": True
        }
    except ValueError:
        return {
            "res": False,
            "info": "Value {} is not an float".format(flt)
        }


def validateInt(inte):
    try:
        int(inte)
        return {
            "res": True
        }
    except ValueError:
        return {
            "res": False,
            "info": "Value {} is not an int".format(inte)
        }
