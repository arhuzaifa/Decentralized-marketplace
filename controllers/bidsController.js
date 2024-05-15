var MongoClient = require("mongodb").MongoClient;
var url =
  "mongodb+srv://Arooj:aroojfyp@markazcluster.qnkzs.mongodb.net/Markaz?retryWrites=true&w=majority";
var ObjectId = require("mongodb").ObjectId;
const { body, validationResult } = require("express-validator");
var dbo = null;

var BidsData = {
  bids: [],
};

const writeEvent = async (req, res) => {
  try {
    dbo
      .collection("Bids")
      .find({
        $or: [{ job_id: { $regex: req.params.job_id } }],
      })
      .toArray(function (err, bids) {
        if (err) {
          return res.status(400).json({ msg: "Error" });
        }
        //   console.log(gigs);
        BidsData.bids = bids;
        return res.write(`data: ${JSON.stringify(BidsData)}\n\n`);
      });
  } catch (err) {
    const errData = {
      bids: [],
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
    collection = dbo.collection("Bids");
  } catch (err) {
    return writeEvent(_req, res);
  }
  const changeStream = collection.watch();
  changeStream.on("change", (next) => {
    writeEvent(_req, res);
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

  return writeEvent(_req, res);
  // res.end();
};

MongoClient.connect(url, function (err, db) {
  if (err) throw err;
  // console.log("CONNECTION IS MADE!!!!!!!!!!!!!!!!!!!!!");
  dbo = db.db("Markaz");
});

exports.create = (req, res) => {
  //   console.log("All gigs list");
  const bid = req.body;

  console.log(bid);
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array(),
      message: "bid creation not successful",
    });
  }
  dbo.collection("Bids").insert(bid);
  //   res.end();
  //   return;
  return res.json({ bid });
};

exports.show = (req, res) => {
  if (req.headers.accept === "text/event-stream") {
    sendEvent(req, res);
  } else {
    res.json({ message: "Ok" });
  }
  // console.log("All gigs list");
  // dbo
  //   .collection("Bids")
  //   .find({
  //     $or: [{ job_id: { $regex: req.params.job_id } }],
  //   })
  //   .toArray(function (err, bids) {
  //     if (err) {
  //       return res.status(400).json({ msg: "Error" });
  //     }
  //     // console.log(bids);
  //     return res.json({ bids });
  //   });
  // return res.json({ bids });
};

exports.getBid = (req, res) => {
  //   console.log("All gigs list");
  const id = req.params.id;
  // console.log(id);
  dbo.collection("Bids").findOne({ _id: ObjectId(id) }, function (err, bids) {
    if (err) {
      return res.status(400).json({ msg: "Error" });
    }
    // console.log(bids);
    return res.json(bids);
  });
  //   return res.json({ gigs });
};
