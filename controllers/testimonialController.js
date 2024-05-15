var MongoClient = require("mongodb").MongoClient;
var url =
  "mongodb+srv://Arooj:aroojfyp@markazcluster.qnkzs.mongodb.net/Markaz?retryWrites=true&w=majority";
var ObjectId = require("mongodb").ObjectId;

var dbo = null;

MongoClient.connect(url, function (err, db) {
  if (err) throw err;
  dbo = db.db("Markaz");
});

exports.index = async (req, res) => {
  //   console.log("All gigs list");
  dbo
    .collection("Testimonials")
    .find()
    .toArray(function (err, testimonials) {
      if (err) {
        return res.status(400).json({ msg: "Error" });
      }
      //   console.log(gigs);
      return res.json({ testimonials });
    });
};

exports.create = (req, res) => {
  //   console.log("All gigs list");
  const testimonial = req.body;
  //   console.log(gig);
  dbo.collection("Testimonials").insert(testimonial);
  return res.json({ testimonial });
};

exports.delete = (req, res) => {
  //   console.log("All gigs list");
  const { id } = req.params;
  console.log(id);
  dbo.collection("Testimonials").remove({ _id: ObjectId(id) });
  return res.json({ msg: "deleted" });
};

exports.show = (req, res) => {
  //   console.log("All gigs list");
  const { id } = req.params;
  console.log(id);
  dbo
    .collection("Testimonials")
    .findOne({ _id: ObjectId(id) }, function (err, testimonials) {
      if (err) {
        return res.status(400).json({ msg: "Error" });
      }
      //   console.log(gigs);
      return res.json(testimonials);
    });
  //   return res.json({ gigs });
};
