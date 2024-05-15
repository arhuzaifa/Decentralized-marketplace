var MongoClient = require("mongodb").MongoClient;
var url =
  "mongodb+srv://Arooj:aroojfyp@markazcluster.qnkzs.mongodb.net/Markaz?retryWrites=true&w=majority";
var ObjectId = require("mongodb").ObjectId;
const fs = require("fs");
var path = require("path");
var dbo = null;
const { body, validationResult } = require("express-validator");

MongoClient.connect(url, function (err, db) {
  if (err) throw err;
  dbo = db.db("Markaz");
});

exports.index = async (req, res) => {
  //   console.log("All gigs list");
  dbo
    .collection("WorkerData")
    .find()
    .toArray(function (err, workers) {
      if (err) {
        return res.status(400).json({ msg: "Error" });
      }
      //   console.log(gigs);
      return res.json({ workers });
    });
};

exports.create = (req, res) => {
  //   console.log("All gigs list");
  //const worker = req.body;
  //   console.log(gig);

  var profile = fs.readFileSync(req.file.path);
  var encImg = profile.toString("base64");
  var picture = new Buffer(encImg, "base64");

  var Name = req.body.Name;
  var city = req.body.city;
  var contact = req.body.contact;
  var skills = req.body.skills;
  var about = req.body.about;
  var address = req.body.address;
  var user_id = req.body.user_id;
  dbo.collection("WorkerData").insertOne({
    Name,
    city,
    contact,
    skills,
    about,
    picture,
    address,
    user_id,
  });
  //return res.json({ worker });
  return;
};

exports.delete = (req, res) => {
  //   console.log("All gigs list");
  const { id } = req.params;
  console.log(id);
  dbo.collection("WorkerData").remove({ _id: ObjectId(id) });
  return res.json({ msg: "deleted" });
};

exports.show = (req, res) => {
  //   console.log("All gigs list");
  const { id } = req.params;
  console.log(id);
  dbo
    .collection("WorkerData")
    .findOne({ _id: ObjectId(id) }, function (err, workers) {
      if (err) {
        return res.status(400).json({ msg: "Error" });
      }
      //   console.log(gigs);
      return res.json(workers);
    });
  //   return res.json({ gigs });
};

exports.showAgainstUserId = (req, res) => {
  //   console.log("All gigs list");
  // const user_id = req.params.userId;
  // console.log(id);
  dbo
    .collection("WorkerData")
    .findOne({ user_id: req.params.user_id }, function (err, workers) {
      if (err) {
        return res.status(400).json({ msg: "Error" });
      }
      //   console.log(gigs);
      return res.json(workers);
    });
  //   return res.json({ gigs });
};

exports.showAgainstGig = (req, res) => {
  //   console.log("All gigs list");
  const id = req.params.workerId;
  console.log(id);
  dbo
    .collection("WorkerData")
    .findOne({ user_id: req.params.workerId }, function (err, workers) {
      if (err) {
        return res.status(400).json({ msg: "Error" });
      }
      //   console.log(gigs);
      return res.json(workers);
    });
  //   return res.json({ gigs });
};

exports.edit = async (req, res) => {
  // const gig = req.body;
  const worker = req.body;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array(),
      message: "update profile not successful",
    });
  }
  // console.log(job);
  await dbo
    .collection("WorkerData")
    .findOne({ _id: ObjectId(worker._id) }, function (err, worker) {
      if (err) {
        return res.status(400).json({ msg: "Error" });
      }
      // console.log(gigs);
      // return res.json(gigs);
      dbo.collection("WorkerData").update(
        { _id: ObjectId(worker._id) },
        {
          $set: {
            Name: worker.Name,
            city: worker.city,
            contact: worker.contact,
            skills: worker.skills,
            about: worker.about,
            address: worker.address,
          },
        }
      );
    });
};
