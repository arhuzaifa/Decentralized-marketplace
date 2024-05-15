var MongoClient = require("mongodb").MongoClient;
const { Profiler } = require("react");
const fs = require("fs");
var path = require("path");
var url =
  "mongodb+srv://Arooj:aroojfyp@markazcluster.qnkzs.mongodb.net/Markaz?retryWrites=true&w=majority";
var ObjectId = require("mongodb").ObjectId;
const { body, validationResult } = require("express-validator");

var dbo = null;

var jobsData = {
  jobs: [],
};

// const writeEvent = async (req, res) => {
//   try {
//     // dbo
//     //   .collection("CustomJobs")
//     //   .find()
//     //   .toArray(function (err, jobs) {
//     //     // if (err) {
//     //     //   return res.status(400).json({ msg: "Error" });
//     //     // }
//     //     //   console.log(gigs);

//     //     // res.setHeader("content-type", "text/event-stream");

//     //     // console.log("Loop");
//     //     // return res.json({ gigs });
//     //     jobsData.jobs = jobs;
//     //     return res.write(`data: ${JSON.stringify(jobsData)}\n\n`);
//     //     // res.end();
//     //   });
//     // console.log(req.params.id, "HELO");
//     dbo
//       .collection("CustomJobs")
//       .find({
//         $or: [{ clientId: { $regex: req.params.id } }],
//       })
//       .toArray(function (err, jobs) {
//         // if (err) {
//         //   return res.status(400).json({ msg: "Error" });
//         // }
//         //   console.log(gigs);
//         jobsData.jobs = jobs;
//         return res.write(`data: ${JSON.stringify(jobsData)}\n\n`);
//       });
//   } catch (err) {
//     const errData = {
//       jobs: [],
//     };
//     return res.write(`data: ${JSON.stringify(errData)}\n\n`);
//   }
//   // res.write(`id: ${sseId}\n`);
// };

// const sendEvent = (_req, res) => {
//   // console.log(_req.params.id);
//   res.writeHead(200, {
//     "Cache-Control": "no-cache",
//     Connection: "keep-alive",
//     "Content-Type": "text/event-stream",
//   });

//   var collection = null;
//   try {
//     collection = dbo.collection("CustomJobs");
//   } catch (err) {
//     return writeEvent(_req, res);
//   }
//   const changeStream = collection.watch();
//   changeStream.on("change", (next) => {
//     writeEvent(_req, res);
//     // if (req.headers.accept === "text/event-stream") {
//     //   console.log("Gigs have changed");
//     //   // if (req.headers.accept === "text/event-stream") {
//     //   return sendEvent(req, res);
//     // } else {
//     //   return res.json("ok");
//     // }
//     // }
//   });
//   // res.writeHead(200, {
//   //   "Cache-Control": "no-cache",
//   //   Connection: "keep-alive",
//   //   "Content-Type": "text/event-stream",
//   // });

//   const sseId = new Date().toDateString();

//   return writeEvent(_req, res);
//   res.end();
// };

const writeEvent = async (res) => {
  try {
    dbo
      .collection("CustomJobs")
      .find()
      .toArray(function (err, jobs) {
        // if (err) {
        //   return res.status(400).json({ msg: "Error" });
        // }
        //   console.log(gigs);

        // res.setHeader("content-type", "text/event-stream");

        // console.log("Loop");
        // return res.json({ gigs });
        jobsData.jobs = jobs;
        return res.write(`data: ${JSON.stringify(jobsData)}\n\n`);
        // res.end();
      });
    // console.log(req.params.id, "HELO");
    // dbo
    //   .collection("CustomJobs")
    //   .find({
    //     $or: [{ clientId: { $regex: req.params.id } }],
    //   })
    //   .toArray(function (err, jobs) {
    //     // if (err) {
    //     //   return res.status(400).json({ msg: "Error" });
    //     // }
    //     //   console.log(gigs);
    //     jobsData.jobs = jobs;
    //     return res.write(`data: ${JSON.stringify(jobsData)}\n\n`);
    //   });
  } catch (err) {
    const errData = {
      jobs: [],
    };
    return res.write(`data: ${JSON.stringify(errData)}\n\n`);
  }
  // res.write(`id: ${sseId}\n`);
};

const sendEvent = (_req, res) => {
  // console.log(_req.params.id);
  res.writeHead(200, {
    "Cache-Control": "no-cache",
    Connection: "keep-alive",
    "Content-Type": "text/event-stream",
  });

  var collection = null;
  try {
    collection = dbo.collection("CustomJobs");
  } catch (err) {
    return writeEvent(res);
  }
  const changeStream = collection.watch();
  changeStream.on("change", (next) => {
    writeEvent(res);
  });
  const sseId = new Date().toDateString();

  return writeEvent(res);
};

exports.getAllJobs = async (req, res) => {
  if (req.headers.accept === "text/event-stream") {
    sendEvent(req, res);
  } else {
    res.json({ message: "Ok" });
  }
};

MongoClient.connect(url, function (err, db) {
  if (err) throw err;
  dbo = db.db("Markaz");
});

exports.check = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  dbo
    .collection("CustomJobs")
    .find({
      $or: [{ clientId: { $regex: req.params.id } }],
    })
    .toArray(function (err, jobs) {
      if (err) {
        return res.status(400).json({ msg: "Error" });
      }
      //   console.log(gigs);
      return res.json({ jobs });
    });
  // if (req.headers.accept === "text/event-stream") {
  //   sendEvent(req, res);
  // } else {
  //   res.json({ message: "Ok" });
  // }
};
exports.get = async (req, res) => {
  const id = req.params.id;
  // console.log(id);
  dbo
    .collection("CustomJobs")
    .findOne({ _id: ObjectId(id) }, function (err, jobs) {
      if (err) {
        return res.status(400).json({ msg: "Error" });
      }
      //   console.log(gigs);
      return res.json(jobs);
    });
  // if (req.headers.accept === "text/event-stream") {
  //   sendEvent(req, res);
  // } else {
  //   res.json({ message: "Ok" });
  // }
};

exports.index = async (req, res) => {
  //   console.log("All gigs list");
  dbo
    .collection("CustomJobs")
    .find()
    .toArray(function (err, jobs) {
      if (err) {
        return res.status(400).json({ msg: "Error" });
      }
      //   console.log(gigs);
      return res.json({ jobs });
    });
};

exports.create = (req, res) => {
  //   console.log("All gigs list");
  // const job = req.body;
  // var profile = fs.readFileSync(req.file.path);
  // var encImg = profile.toString("base64");
  // var picture = new Buffer(encImg, "base64");
  // // const job = req.body;
  // const errors = validationResult(req);
  // if (!errors.isEmpty()) {
  //   return res.status(400).json({
  //     success: false,
  //     errors: errors.array(),
  //     message: "job creation not successful",
  //   });
  // }
  // // body("gigTitle").isLength({
  // //   min: 6,
  // // });
  // // const errors = validationResult(req);
  // // if (!errors.isEmpty()) {
  // //   console.log("Form check");
  // //   return res.status(400).json({
  // //     success: false,
  // //     errors: errors.array(),
  // //   });
  // // } else {
  // //   console.log(gig);
  // var title = req.body.title;
  // var budget = req.body.budget;
  // var category = req.body.category;
  // var description = req.body.description;
  // var clientId = req.body.clientId;
  // var city = req.body.city;
  // var address = req.body.address;
  // console.log("fine block");
  // dbo.collection("CustomJobs").insertOne({
  //   title,
  //   budget,
  //   category,
  //   description,
  //   picture,
  //   clientId,
  //   city,
  //   address,
  // });
  // return res.json({ job });
  const job = req.body;

  dbo.collection("CustomJobs").insert(job);
  return res.json({ job });
};

exports.delete = (req, res) => {
  //   console.log("All gigs list");
  const { id } = req.params;

  console.log(id);
  // dbo.collection("Bids").remove({ job_id: id });
  // dbo.collection("Bids").deleteMany({ job_id: id });
  //db.collection("Bids").deleteMany({ job_id: id });
  dbo.collection("CustomJobs").remove({ _id: ObjectId(id) });
  return res.json({ msg: "deleted" });
};

exports.show = (req, res) => {
  //   console.log("All gigs list");
  const { id } = req.params;
  console.log(id);
  dbo
    .collection("CustomJobs")
    .findOne({ _id: ObjectId(id) }, function (err, jobs) {
      if (err) {
        return res.status(400).json({ msg: "Error" });
      }
      //   console.log(gigs);
      return res.json(jobs);
    });
  //   return res.json({ gigs });
};

exports.search = async (req, res) => {
  //   console.log("All gigs list");
  await dbo
    .collection("CustomJobs")
    .find({
      $or: [
        { title: { $regex: req.params.key } },
        // { address: { $regex: req.params.key } }
      ],
    })
    .toArray(function (err, jobs) {
      if (err) {
        return res.status(400).json({ msg: "Error" });
      }
      //   console.log(gigs);
      return res.json({ jobs });
    });
  // console.log(req.params.key);

  // .toArray(function (err, jobs) {  //   if (err) {
  //     return res.status(400).json({ msg: "Error" });
  //   }
  //   //   console.log(gigs);
  //   return res.json({ jobs });
  // });
  // console.log(result);
  // res.send(result);
};

exports.delete = (req, res) => {
  //   console.log("All gigs list");
  const { id } = req.params;
  console.log(id);
  dbo.collection("CustomJobs").remove({ _id: ObjectId(id) });
  return res.json({ msg: "deleted" });
};

exports.edit = async (req, res) => {
  // const gig = req.body;
  const job = req.body;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array(),
      message: "job updation not successful",
    });
  }

  console.log(job);
  await dbo
    .collection("CustomJobs")
    .findOne({ _id: ObjectId(job._id) }, function (err, jobs) {
      if (err) {
        return res.status(400).json({ msg: "Error" });
      }
      // console.log(gigs);
      // return res.json(gigs);
      dbo.collection("CustomJobs").update(
        { _id: ObjectId(job._id) },
        {
          $set: {
            title: job.title,
            budget: job.budget,
            category: job.category,
            description: job.description,
            city: job.city,
            address: job.address,
          },
        }
      );
    });
};
