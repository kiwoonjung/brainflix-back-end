const fs = require("fs");
// const { v4: uuid } = require("uuid");
const express = require("express");
const router = express.Router();

router.route("/").get((req, res) => {
  const videoData = fs.readFileSync(
    "./public/data/video-details.json",
    "utf-8"
  );
  res.json(JSON.parse(videoData));
});

router.route("/:id").get((req, res) => {
  res.send(`Sending comment info for ${req.params.id}`);
});

module.exports = router;
