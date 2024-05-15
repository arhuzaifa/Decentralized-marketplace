var MongoClient = require("mongodb").MongoClient;
var url =
  "mongodb+srv://Arooj:aroojfyp@markazcluster.qnkzs.mongodb.net/?retryWrites=true&w=majority";
var ObjectId = require("mongodb").ObjectId;

var dbo = null;
// console.log("Connection trying...");

MongoClient.connect(url, function (err, db) {
  // console.log("Connection trying...");
  if (err) throw err;
  // console.log(err);
  dbo = db.db("Markaz");
  // console.log(dbo);
});

console.log(dbo);

exports.index = async (req, res) => {
  //   console.log("All gigs list");
  dbo
    .collection("Categories")
    .find()
    .toArray(function (err, categories) {
      if (err) {
        return res.status(400).json({ msg: "Error" });
      }
      //   console.log(gigs);
      return res.json({ categories });
    });
};

exports.create = (req, res) => {
  //   console.log("All gigs list");
  const category = req.body;
  //   console.log(gig);
  dbo.collection("Categories").insert(category);
  return res.json({ category });
};

exports.delete = (req, res) => {
  //   console.log("All gigs list");
  const { id } = req.params;
  console.log(id);
  dbo.collection("Categories").remove({ _id: ObjectId(id) });
  return res.json({ msg: "deleted" });
};

exports.show = (req, res) => {
  //   console.log("All gigs list");
  const { id } = req.params;
  console.log(id);
  dbo
    .collection("Categories")
    .findOne({ _id: ObjectId(id) }, function (err, categories) {
      if (err) {
        return res.status(400).json({ msg: "Error" });
      }
      //   console.log(gigs);
      return res.json(categories);
    });
  //   return res.json({ gigs });
};
