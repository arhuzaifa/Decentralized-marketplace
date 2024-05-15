const { Profiler } = require("react");
const fs = require("fs");
var path = require("path");

var MongoClient = require("mongodb").MongoClient;
var url =
  "mongodb+srv://Arooj:aroojfyp@markazcluster.qnkzs.mongodb.net/Markaz?retryWrites=true&w=majority";
var ObjectId = require("mongodb").ObjectId;

var dbo = null;

var offersData = {
  offers: [],
};
var id;

MongoClient.connect(url, function (err, db) {
  if (err) throw err;
  // console.log("CONNECTION IS MADE!!!!!!!!!!!!!!!!!!!!!");
  dbo = db.db("Markaz");
});

exports.create = async (req, res) => {
  var title = req.body.title;
  var budget = req.body.budget;
  var city = req.body.city;
  var description = req.body.description;
  var clientId = req.body.clientId;
  var address = req.body.address;
  var clientName = req.body.clientName;
  var workerId = req.body.worker;

  const data = await dbo.collection("JobOffers").insertOne({
    title,
    budget,
    city,
    description,
    clientId,
    address,
    clientName,
    workerId,
  });
  const id = res.json({ data });
  console.log(id);
  return;
};

const writeEvent = async (res) => {
  try {
    dbo
      .collection("JobOffers")
      .find({
        $or: [
          { workerId: { $regex: id } },
          // { address: { $regex: req.params.key } }
        ],
      })
      .toArray(function (err, offers) {
        console.log(offers);
        console.log(id);
        console.log("hello");
        if (offers) {
          offersData.offers = offers;
        } else {
          offersData.offers = [];
        }
        return res.write(`data: ${JSON.stringify(offersData)}\n\n`);
        // res.end();
      });
  } catch (err) {
    const errData = {
      offers: [],
    };
    return res.write(`data: ${JSON.stringify(errData)}\n\n`);
  }
  // res.write(`id: ${sseId}\n`);
};

const sendEvent = (_req, res) => {
  // console.log(_req.params.id);
  // const id = _req.params.workerId;
  res.writeHead(200, {
    "Cache-Control": "no-cache",
    Connection: "keep-alive",
    "Content-Type": "text/event-stream",
  });

  var collection = null;
  try {
    collection = dbo.collection("JobOffers");
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

exports.getAllOffers = async (req, res) => {
  id = req.params.workerId;
  console.log(id);
  if (req.headers.accept === "text/event-stream") {
    sendEvent(req, res);
  } else {
    res.json({ message: "Ok" });
  }
};

// exports.get = async (req, res) => {
//   await dbo
//     .collection("JobOffers")
//     .find({
//       $or: [
//         { workerId: { $regex: req.params.workerId } },
//         // { address: { $regex: req.params.key } }
//       ],
//     })
//     .toArray(function (err, offers) {
//       if (err) {
//         return res.status(400).json({ msg: "Error" });
//       }
//       //   console.log(gigs);
//       return res.json({ offers });
//     });
// };

exports.delete = (req, res) => {
  //   console.log("All gigs list");
  const { id } = req.params;
  console.log(id);
  dbo.collection("JobOffers").remove({ _id: ObjectId(id) });
  return res.json({ msg: "deleted" });
};
