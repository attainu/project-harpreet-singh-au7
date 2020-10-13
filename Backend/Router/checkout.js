import express from "express";
import userModel from "../DBmodels/userModel.js";
import dbModel from "../DBmodels/ProductModel.js";
import { upload, gfs } from "../DBmodels/imageStorage.js";

var router = express();

router.post("/checkout", (req, res) => {
    if (remove !== undefined) {
        MongoClient.connect(mongourl, function (err, db) {
            if (err) throw err;
            var dbo = db.db("mydb");
            var myquery = { itemName: remove };
            dbo.collection("shoppingCart").deleteOne(myquery, function (err, obj) {
                if (err) throw err;
                console.log("deleted:" + myquery);
                db.close();
            });
        });
    }
}

router.post("/checkout", (req, res) => {
    if (create !== undefined) {
        MongoClient.connect(mongourl, function (err, db) {
            if (err) throw err;
            var dbo = db.db("mydb");
            var myobj = { itemName: create };
            dbo.collection("shoppingCart").insertOne(myobj, function (err, res) {
                if (err) throw err;
                console.log("document inserted:" + myobj);
                db.close();
            });
        });
    }
}