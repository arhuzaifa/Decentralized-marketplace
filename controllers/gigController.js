const { Profiler } = require("react");
const fs = require("fs");
var path = require("path");

var MongoClient = require("mongodb").MongoClient;
var url =
  "mongodb+srv://Arooj:aroojfyp@markazcluster.qnkzs.mongodb.net/Markaz?retryWrites=true&w=majority";
var ObjectId = require("mongodb").ObjectId;

const { body, validationResult } = require("express-validator");

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
        if (err) {
          return res.status(400).json({ msg: "Error" });
        }
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

exports.check = async (req, res) => {
  if (req.headers.accept === "text/event-stream") {
    sendEvent(req, res);
  } else {
    res.json({ message: "Ok" });
  }
};
// console.log("Hello");
exports.index = async (req, res) => {
  //   console.log("All gigs list");
  //let profile = req.file.path;

  dbo
    .collection("Gigs")
    .find()
    .toArray(function (err, gigs) {
      //gigs.myFile = profile ? profile : gigs.myFile;
      if (err) {
        return res.status(400).json({ msg: "Error" });
      }
      //   console.log(gigs);
      // res.setHeader("content-type", "text/event-stream");
      // console.log("Loop");
      return res.json({ gigs });
    });
};

exports.filteredgigs = async (req, res) => {
  //   console.log("All gigs list");
  // console.log(req.params);
  dbo
    .collection("Gigs")
    .find({
      $or: [{ category: { $regex: req.params.category } }],
    })
    .toArray(function (err, gigs) {
      if (err) {
        return res.status(400).json({ msg: "Error" });
      }
      //   console.log(gigs);
      return res.json({ gigs });
    });
};

exports.gigAgainstWorkerId = async (req, res) => {
  //   console.log("All gigs list");
  // console.log(req.params);
  // const { id } = req.params;
  dbo
    .collection("Gigs")
    .find({
      $or: [{ workerId: { $regex: req.params.workerId } }],
    })
    .toArray(function (err, gigs) {
      if (err) {
        return res.status(400).json({ msg: "Error" });
      }
      //   console.log(gigs);
      return res.json({ gigs });
    });
};

exports.create = (req, res) => {
  var profile = fs.readFileSync(req.file.path);
  var encImg = profile.toString("base64");
  var picture = new Buffer(encImg, "base64");

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array(),
      message: "gig creation not successful",
    });
  }

  var gigTitle = req.body.gigTitle;
  var budget = req.body.budget;
  var category = req.body.category;
  var gigdescription = req.body.gigdescription;
  var workerId = req.body.workerId;

  // [check("gigTitle").not().isEmpty().withMessage("Title is required")];

  // var errors = validationResult(req).array();
  // if (errors) {
  //   console.log("error block");
  //   req.session.errors = errors;
  //   req.session.success = false;
  // } else {
  console.log("fine block");
  dbo.collection("Gigs").insertOne({
    gigTitle,
    budget,
    category,
    gigdescription,
    picture,
    workerId,
  });
  // return res.status(200).json({
  //   success: true,
  //   message: "Login successful",
  // });
};

exports.delete = (req, res) => {
  //   console.log("All gigs list");
  const { id } = req.params;
  console.log(id);
  dbo.collection("Gigs").remove({ _id: ObjectId(id) });

  // dbo.collection("JobOffers").remove({ gigId: id });
  return res.json({ msg: "deleted" });
};

exports.show = (req, res) => {
  //   console.log("All gigs list");
  const { id } = req.params;
  console.log(id);
  dbo.collection("Gigs").findOne({ _id: ObjectId(id) }, function (err, gigs) {
    if (err) {
      return res.status(400).json({ msg: "Error" });
    }
    // console.log(gigs);
    return res.json(gigs);
  });
  //   return res.json({ gigs });
};

exports.getGigs = (req, res) => {
  console.log("All gigs list");
  const id = req.params.workerId;
  console.log(id);
  dbo
    .collection("Gigs")
    .find({
      $or: [{ workerId: { $regex: req.params.workerId } }],
    })
    .toArray(function (err, gigs) {
      if (err) {
        return res.status(400).json({ msg: "Error" });
      }
      // console.log(gigs);
      return res.json({ gigs });
    });
  // if (req.headers.accept === "text/event-stream") {
  //   sendEvent(req, res);
  // } else {
  //   res.json({ message: "Ok" });
  // }
  ///////
  // const { id } = req.params;
  // console.log(id);
  // dbo.collection("Gigs").findOne({ _id: ObjectId(id) }, function (err, gigs) {
  //   if (err) {
  //     return res.status(400).json({ msg: "Error" });
  //   }
  //   console.log(gigs);
  //   return res.json(gigs);
  // });
  //   return res.json({ gigs });
};

exports.edit = async (req, res) => {
  // const gig = req.body;
  const gig = req.body;
  console.log(gig);

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array(),
      message: "gig updation not successful",
    });
  }

  await dbo
    .collection("Gigs")
    .findOne({ _id: ObjectId(gig._id) }, function (err, gigs) {
      if (err) {
        return res.status(400).json({ msg: "Error" });
      }
      // console.log(gigs);
      // return res.json(gigs);
      dbo.collection("Gigs").update(
        { _id: ObjectId(gig._id) },
        {
          $set: {
            gigTitle: gig.gigTitle,
            budget: gig.budget,
            category: gig.category,
            gigdescription: gig.gigdescription,
          },
        }
      );
    });
};
