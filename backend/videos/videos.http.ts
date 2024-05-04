import { Request, Response } from "express";
import mongoose from "mongoose";
import { insertVideo, findAllVideos, deleteVideo } from "./videos.controller";
import to from "../lib/to";

const readAllVideos = async (req: Request, res: Response) => {
    const [err, data] = await to(findAllVideos());

    if (err || !data)
        return res.status(500).json({
            message: "[ERROR] Could not retrieve videos from database",
        });

    return res.status(200).json({ data: data });
};

const addVideo = async (req: Request, res: Response) => {
    if (!req.body || !req.body.url)
        return res.status(400).json({ message: "[ERROR] No URL was given" });

    const [err, data] = await to(insertVideo(req.body.url));

    if (err || !data)
        return res.status(500).json({
            message: "[ERROR] Unexpected error, could not insert into database",
        });

    return res.status(200).json({ video: data });
};

const removeVideo = async (req: Request, res: Response) => {
    if (!req.params || !req.params.id)
        return res
            .status(400)
            .json({ message: "[ERROR] You should request against an id" });

    const [err, data] = await to(deleteVideo(req.params.id));

    if (err || !data)
        return res
            .status(500)
            .json({
                message:
                    "[ERROR] Unexpected error, could not delete from database",
            });

    return res.status(200).json({ message: "Successfully deleted!" });
};

export { readAllVideos, addVideo, removeVideo };
