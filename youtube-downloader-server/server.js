const express = require('express');
const ytdl = require("@distube/ytdl-core");
const app = express();
const port = 8080;

app.use(express.json());

app.get('/', (_req, res) => {
    res.send("<h1>I tried embedding everything on the client.</h1> <p>I did. But it's so damn annoying dealing with YouTube API breaking changes and not being able to use ytdl-core embedded on the app frontend, and the Rust alternative (rusty_ytdl) isn't working at the time. I have to finish this, so this is the way to go unfortunately.</p>");
})

app.post('/api/video_info', async (req, res) => {
    console.debug("POST /api/video_info |", req.body);
    const videoId = req.body.videoId;
    console.debug("Video ID:", videoId);

    const basicInfo = await ytdl.getBasicInfo(videoId);
    const videoInfo = {
        id: basicInfo.videoDetails.videoId,
        title: basicInfo.videoDetails.title,
        thumbnail: basicInfo.videoDetails.thumbnails.sort((a, b) => {
            // Branchless programming just for fun
            const widthComp = b.width > a.width;
            const heightComp = b.height > a.height;
            return (widthComp + ((!widthComp) * -1)) + (heightComp + ((!heightComp) * -1));
        })[0],
        lengthSeconds: basicInfo.videoDetails.lengthSeconds
    }
    console.log("Video Info:", videoInfo);
    res.send(videoInfo);
});

app.post("/api/download_video", async (req, res) => {
    console.debug("POST /api/download_video |", req.body);
    const videoId = req.body.videoId;
    console.debug("Video ID:", videoId);

    console.debug("Downloading video and sending stream...");
    ytdl(videoId).pipe(res);
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})
      
