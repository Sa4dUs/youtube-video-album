import express from "express";
import {readAllVideos, addVideo, removeVideo} from "./videos.http";

const router = express.Router();

router.route("/").get(readAllVideos);
router.route("/").post(addVideo);
router.route("/:id").delete(removeVideo);

export default router
