const { Profiler } = require("react");
const fs = require("fs");
var path = require("path");

var MongoClient = require("mongodb").MongoClient;
var url =
  "mongodb+srv://Arooj:aroojfyp@markazcluster.qnkzs.mongodb.net/Markaz?retryWrites=true&w=majority";
var ObjectId = require("mongodb").ObjectId;

var dbo = null;

// const { check, validationResult } = require("express-validator");
// const dbo = require("./connections");

MongoClient.connect(url, function (err, db) {
  if (err) throw err;
  // console.log("CONNECTION IS MADE!!!!!!!!!!!!!!!!!!!!!");
  dbo = db.db("Markaz");
});

exports.create = (req, res) => {
  const contract = req.body;

  console.log(contract);
  dbo.collection("Contract").insert(contract);
  //   res.end();
  //   return;
  return res.json({ contract });
};

exports.show = async (req, res) => {
  //   console.log("All gigs list");
  //   await dbo
  //     .collection("Contract")
  //     .find({
  //       $or: [
  //         { jobOfferid: { $regex: req.params.jobOfferId } },
  //         // { address: { $regex: req.params.key } }
  //       ],
  //     })
  //     .toArray(function (err, contract) {
  //       if (err) {
  //         return res.status(400).json({ msg: "Error" });
  //       }
  //       console.log(contract);
  //       return res.json({ contract });
  //     });
  await dbo
    .collection("Contract")
    .findOne({ jobOfferId: req.params.jobOfferId }, function (err, contract) {
      if (err) {
        return res.status(400).json({ msg: "Error" });
      }
      console.log(contract);
      return res.json(contract);
    });
};
