const fs = require("fs");
const express = require("express");
const router = express.Router();
const { v4: uuid } = require("uuid");

router
  .route("/")
  .get((req, res) => {
    const data = fs.readFileSync("./data/video-details.json", "utf-8");
    res.json(JSON.parse(data));
  })
  .post((req, res) => {
    const data = fs.readFileSync("./data/video-details.json", "utf-8");
    const videoData = JSON.parse(data);
    if (req.body && req.body.title && req.body.description) {
      const updateVideo = {
        id: uuid(),
        title: req.body.title,
        channel: "DOMOMO",
        image: "http://localhost:5050/images/Domo.jpg",
        description: req.body.description,
        views: "9,392",
        likes: "7,584",
        duration: "3:25",
        video: "https://project-2-api.herokuapp.com/stream",
        timestamp: Date.now(),
        comments: [],
      };
      const newVideoData = [...videoData, updateVideo];
      fs.writeFileSync(
        "./data/video-details.json",
        JSON.stringify(newVideoData)
      );
      res.send("Video data updated");
    } else {
      res.send("You forgot to include json data in your request");
    }
  });

router.route("/:id").get((req, res) => {
  const data = fs.readFileSync("./data/video-details.json", "utf-8");
  const videos = JSON.parse(data);
  const foundVideo = videos.find((video) => video.id === req.params.id);
  res.json(foundVideo);
});

router
  .route("/:id/comments")
  .get((req, res) => {
    const data = fs.readFileSync("./data/video-details.json", "utf-8");
    res.json(JSON.parse(data));
  })
  .post((req, res) => {
    const data = fs.readFileSync("./data/video-details.json", "utf-8");
    const videoData = JSON.parse(data);

    console.log(videoData);
    if (req.body && req.body.comment) {
      const updateComment = {
        id: uuid(),
        name: "Kiwoon",
        comment: req.body.comment,
        likes: "0",
        timestamp: Date.now(),
      };

      //for loop method
      // for (let i = 0; i < videoData.length; i++) {
      //   if (videoData[i].id === req.params.id) {
      //     videoData[i].comments.push(updateComment);
      //   }
      // }

      const newVideoData = videoData.map((video) => {
        if (video.id === req.params.id) {
          video.comments.push(updateComment);
        }
        return video;
      });
      fs.writeFileSync(
        "./data/video-details.json",
        JSON.stringify(newVideoData)
      );
      res.send("comment updated");
    } else {
      res.send("You forgot to include json data in your request");
    }
  });

module.exports = router;
