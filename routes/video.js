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
        image: "http://localhost:5050/Images/Upload.video-preview.jpg",
        description: req.body.description,
        views: 0,
        likes: 0,
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

module.exports = router;

// .post((req, res) => {
//   fs.readFileSync("./public/data/video-details.json", "utf-8",((err, data) =>{
//     console.log(data)
//     if(err){
//       console.log(err)
//     }else{
//       const videoData = JSON.parse(data);
//       console.log(videoData)
//         videoData.push({
//           "id": uuid(),
//           "title": req.body.title,
//           "channel": "DOMOMO",
//           "image": "",
//           "description": req.body.content,
//           "views": "9,829",
//           "likes": "8,392",
//           "duration": "3:25",
//           "video": "",
//           "timestamp": new Date(),
//           "comments": [],
//         });
//         fs.writeFileSync(
//           "./public/data/video-details.json",
//           JSON.stringify(videoData)
//         );
//         res.send("Video data updated");
//     }

//   }));
// });
