import mongoose, { Schema } from "mongoose";
import to from "../lib/to";

const VideoSchema = new Schema({
    title: String,
    description: String,
    thumbnail: String,
    url: String,
});

const VideoModel = mongoose.model("VideoModel", VideoSchema);

const findAllVideos = () => {
    return new Promise(async (resolve, reject) => {
        const [err, result] = await to(VideoModel.find({}).exec());

        if (err || !result) return reject(err);

        resolve(result);
    });
};

const insertVideo = (url: string) => {
    return new Promise(async (resolve, rejects) => {
        const id = getIdFromURL(url);

        if (!id) return rejects("Invalid URL");

        const URL = `${process.env.YOUTUBE_API_URL}?id=${id}&key=${process.env.YOUTUBE_API_KEY}&part=snippet`;

        let [err, data] = await to(fetch(URL));

        if (err || !data) return rejects(err);

        [err, data] = await to(data.json())

        if (err || !data) return rejects(err);

        const newVideo = new VideoModel({
            title: data.items[0].snippet.title,
            description: data.items[0].snippet.description,
            thumbnail: data.items[0].snippet.thumbnails.standard.url,
            url: url,
        });

        await newVideo.save();
        resolve(newVideo);
    });
};

const deleteVideo = (id: string) => {
    return new Promise(async (resolve, reject) => {
        const [err, result] = await to(VideoModel.deleteOne({_id: id}))

        if (err || !result)
            return reject(err)

        return resolve(result)
    })
}

const getIdFromURL = (url: string) => {
    const regExp =
        /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regExp);
    return match ? match[1] : null;
};

export { VideoModel, findAllVideos, insertVideo, deleteVideo };
