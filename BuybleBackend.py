import pymongo
from pymongo import MongoClient
import pprint
import flask
from flask import request
from flask import Flask
from flask_cors import CORS
import json
import datetime
import random
import basehash


app = Flask(__name__)
CORS(app)

TOKEN = 55555
hash_fn = basehash.base36()
client = MongoClient(
    "mongodb+srv://dbUser:beholdtheWineCaves@cluster0-itr0f.mongodb.net/test?retryWrites=true&w=majority")
db = client['stores']
accounts = db['accounts']


# pprint.pprint(db.collection_names())

# collection = db['storeOne']
# pprint.pprint(collection.distinct("_id"))
# collection.insert_one({"x":1})
# collection.update_one({"x": 1},{"$inc":{"x":3}})

# doc = collection.find_one({"Name" : "FirstDummy"})
# pprint.pprint(doc)


@app.route("/insertData", methods=['POST'])
def data():
    datatoinsert = request.get_data()
    parsed = parseData(datatoinsert)
    print(parsed)
    res = validateProductData(parsed)
    if res["res"]:
        insertPurchase(parsed["user"], "null", parsed["quantity"], parsed["price"], parsed["name"])
        return {
            "res": True
        }
    else:
        return {
            "res": False,
            "info": res["info"]
        }


@app.route('/product/<string:name>', methods=['GET'])
def get_product(name):
    query = shop.find({"product": name}, {'_id': False})
    length = query.count_documents()
    q = query[0:length]

    if len(q) is 0:
        return {
            "res": False,
            "info": "The product does not exist"
        }
    else:
        return json.dumps({"info":q})


@app.route('/user/<string:email>', methods=['GET'])
def get_user(email):
    query = accounts.find_one({"email": email}, {'_id': False})
    if query is None:
        return {
            "res": False,
            "info": "The user does not exist"
        }
    else:
        return query


@app.route('/product/<string:name>/add', methods=['POST'])
def addPurchase(name):
    print(name)
    userd = request.get_data()
    user = parseData(userd)
    col = db[user["user"]]
    query = {"name": name}
    values = {"$inc": {"quantity": 1}}

    col.update_one(query, values)
    return {
        "res": True
    }


@app.route('/login', methods=['POST'])
def login():
    user_data = request.get_data()
    parsed = parseData(user_data)
    user = authenticateUser(parsed["email"], parsed["password"])
    if user is None:
        return {
            "res": False,
            "info": "Incorrect Username or Password..."
        }
    else:
        return {
            "res": True,
            "user": parsed["email"],
            "info": hash_fn.hash(TOKEN)
        }


def authenticateUser(email, password):
    return accounts.find_one({"email": email, "password": password}, {"_id": False})


@app.route('/authenticateToken', methods=['POST'])
def authenticateToken():
    k = request.get_data()
    parsed = parseData(k)
    return {
        "res": (hash_fn.unhash(parsed["key"]) == TOKEN)
    }


@app.route('/register', methods=['POST'])
def register():
    user = request.get_data()
    parsed = parseData(user)
    res = validateUser(parsed)
    if res["res"]:
        check = get_user(parsed["email"])
        if "res" in check:
            insertUser(parsed["email"], parsed["store"], parsed["password"])
            return {
                "res": True
            }
        else:
            return {
                "res": False,
                "info": "User already exists"
            }
    else:
        return {
            "res": False,
            "info": res["info"]
        }


def insertUser(email, store, password):
    accounts.insert_one({"email": str(email), "store": str(store), "password": str(password)})
    db.create_collection(str(email))


def insertPurchase(user, weather, quantity, price, product):
    print(user)
    if user in db.list_collection_names():
        col = db[user]
        v = col.find({"name": product}, {"_id": False})
        if len(list(v)) == 0:
            col.insert_one({"name": product, "quantity": int(quantity), "price": float(price)})


@app.route('/product/<string:name>/sub', methods=['POST'])
def subPurchase(name):
    print(name)
    userd = request.get_data()
    user = parseData(userd)
    col = db[user["user"]]
    query = {"name": name}
    values = {"$inc": {"quantity": -1}}

    col.update_one(query, values)
    return {
        "res": True
    }


def delete(docId, collection):
    col = db[collection]
    col.delete_one({"_id": docId})


@app.route('/product_list', methods=['POST'])
def getNameAndQuantity():
    d = request.get_data()
    user = parseData(d)
    col = db[user["user"]]
    docs = col.find({}, {"_id": False})

    docTuples = []
    for doc in docs:
        docTuples.append(
            {
                "name": doc["name"],
                "value": int(doc["quantity"])
            }
        )

    return {
        "res": docTuples
    }


def parseData(d):
    arr = json.loads(d.decode('ascii'))
    return arr


def validateProductData(d):
    res = {
        "res": True,
        "info": ""
    }
    values = [
        validateFloat(d["price"]),
        validateInt(d["quantity"]),
        validateString(d["name"])
    ]
    for val in values:
        if not val["res"]:
            res["res"] = False
            res["info"] = val["info"]

    return res


def validateUser(user):
    res = {
        "res": True,
        "info": ""
    }
    values = [
        validateString(user["password"]),
        validateString(user["store"]),
        validateString(user["email"])
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
