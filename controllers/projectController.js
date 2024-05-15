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

var gigsData = {
  gigs: [],
};

const writeEvent = async (res) => {
  try {
    dbo
      .collection("Gigs")
      .find()
      .toArray(function (err, gigs) {
        // if (err) {
        //   return res.status(400).json({ msg: "Error" });
        // }
        //   console.log(gigs);

        // res.setHeader("content-type", "text/event-stream");

        // console.log("Loop");
        // return res.json({ gigs });
        gigsData.gigs = gigs;
        return res.write(`data: ${JSON.stringify(gigsData)}\n\n`);
        // res.end();
      });
  } catch (err) {
    const errData = {
      gigs: [],
    };
    return res.write(`data: ${JSON.stringify(errData)}\n\n`);
  }
  // res.write(`id: ${sseId}\n`);
};

const sendEvent = (_req, res) => {
  res.writeHead(200, {
    "Cache-Control": "no-cache",
    Connection: "keep-alive",
    "Content-Type": "text/event-stream",
  });

  var collection = null;
  try {
    collection = dbo.collection("Gigs");
  } catch (err) {
    return writeEvent(res);
  }
  const changeStream = collection.watch();
  changeStream.on("change", (next) => {
    writeEvent(res);
    // if (req.headers.accept === "text/event-stream") {
    //   console.log("Gigs have changed");
    //   // if (req.headers.accept === "text/event-stream") {
    //   return sendEvent(req, res);
    // } else {
    //   return res.json("ok");
    // }
    // }
  });
  // res.writeHead(200, {
  //   "Cache-Control": "no-cache",
  //   Connection: "keep-alive",
  //   "Content-Type": "text/event-stream",
  // });

  const sseId = new Date().toDateString();

  return writeEvent(res);
  res.end();
};

// async function connection() {
//   const client = new MongoClient(url);
//   dbo = await client.connect();
// }

// connection();

MongoClient.connect(url, function (err, db) {
  if (err) throw err;
  // console.log("CONNECTION IS MADE!!!!!!!!!!!!!!!!!!!!!");
  dbo = db.db("Markaz");
});

exports.create = (req, res) => {
  const project = req.body;

  console.log(project);
  dbo.collection("Projects").insert(project);
  //   res.end();
  //   return;
  return res.json({ project });
};

exports.show = async (req, res) => {
  //   console.log("All gigs list");
  await dbo
    .collection("Projects")
    .find({
      $or: [
        { workerId: { $regex: req.params.worker_id } },
        // { address: { $regex: req.params.key } }
      ],
    })
    .toArray(function (err, projects) {
      if (err) {
        return res.status(400).json({ msg: "Error" });
      }
      //   console.log(gigs);
      return res.json({ projects });
    });
};

exports.showProject = (req, res) => {
  //   console.log("All gigs list");
  const { id } = req.params;
  console.log(id);
  dbo
    .collection("Projects")
    .findOne({ _id: ObjectId(id) }, function (err, projects) {
      if (err) {
        return res.status(400).json({ msg: "Error" });
      }
      console.log(projects);
      return res.json(projects);
    });
  //   return res.json({ gigs });
};

exports.showByClient = async (req, res) => {
  //   console.log("All gigs list");
  console.log(req.params.client_id);
  await dbo
    .collection("Projects")
    .find({
      $or: [
        { clientId: { $regex: req.params.client_id } },
        // { address: { $regex: req.params.key } }
      ],
    })
    .toArray(function (err, projects) {
      if (err) {
        return res.status(400).json({ msg: "Error" });
      }
      //   console.log(projects);
      return res.json({ projects });
    });
};
