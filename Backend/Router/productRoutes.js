import express from "express";
import userModel from "../DBmodels/userModel.js";
import dbModel from "../DBmodels/ProductModel.js";
import { upload, gfs } from "../DBmodels/imageStorage.js";

var router = express();
// Product adding routes

router.post("/additems", (req, res) => {
  const body = req.body;

  dbModel.create(body, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  });
});

router.get("/additems/sync", (req, res) => {
  dbModel.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

//Image uploading
router.post("/upload/image", upload.single("file"), (err, req, res) => {
  if (err) console.log(err);
  else res.status(201).send(req.file);
});

router.get("/retrive/image/single", (req, res) => {
  gfs.files.findOne({ filename: req.query.name }, (err, file) => {
    if (err) {
      res.status(500).send(err);
    } else {
      if (!file || file.length === 0) {
        res.status(404).json({ err: "file not found" });
      } else {
        const readstream = gfs.createReadStream(file.filename);
        readstream.pipe(res);
      }
    }
  });
});
export default router;
