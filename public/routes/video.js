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
  // res.send(`Sending video info for ${req.params.id}`);

  const videoData = fs.readFileSync(
    "./public/data/video-details.json",
    "utf-8"
  );
  const videos = JSON.parse(videoData);
  const foundVideo = videos.find((video) => video.id === req.params.id);
  res.json(foundVideo);
});

module.exports = router;
