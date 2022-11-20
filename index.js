require("dotenv").config();
const express = require("express");
const app = express();
const videoRoutes = require("./routes/video");
const PORT = process.env.PORT || 5050;
const cors = require("cors");

app.use(cors());
app.use(express.static("public"));
app.use(express.json());

app.use("/videos", videoRoutes);

app.get("/", (req, res) => {
  res.send("Hello there!!!");
});

app.listen(PORT, () => {
  console.log(`Server is up and running on http://localhost:${PORT}`);
});
