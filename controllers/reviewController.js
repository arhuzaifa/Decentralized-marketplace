const { Profiler } = require("react");
const fs = require("fs");
var path = require("path");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const { body, validationResult } = require("express-validator");

var MongoClient = require("mongodb").MongoClient;
var url =
  "mongodb+srv://Arooj:aroojfyp@markazcluster.qnkzs.mongodb.net/Markaz?retryWrites=true&w=majority";
var ObjectId = require("mongodb").ObjectId;

var dbo = null;

// var reviewsData = {
//   reviews: [],
// };

MongoClient.connect(url, function (err, db) {
  if (err) throw err;
  // console.log("CONNECTION IS MADE!!!!!!!!!!!!!!!!!!!!!");
  dbo = db.db("Markaz");
});

exports.create = async (req, res) => {
  var description = req.body.description;
  var clientId = req.body.clientId;
  var clientName = req.body.clientName;
  var workerId = req.body.workerId;
  var workerName = req.body.workerName;

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array(),
      message: "review not successful",
    });
  }
  const data = await dbo.collection("Reviews").insertOne({
    description,
    clientId,
    workerName,
    workerId,
  });
  const id = res.json({ data });
  console.log(id);
  return;
};

exports.show = async (req, res) => {
  //   console.log("All gigs list");
  // console.log(req.params);
  dbo
    .collection("Reviews")
    .find({
      $or: [{ workerId: { $regex: req.params.workerId } }],
    })
    .toArray(function (err, reviews) {
      if (err) {
        return res.status(400).json({ msg: "Error" });
      }
      //   console.log(gigs);
      return res.json({ reviews });
    });
};
