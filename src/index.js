export default {
  async fetch(request) {
    const videoUrl = "https://mdstrm.com/live-stream-playlist/533adcc949386ce765657d7c.m3u8";

    const response = await fetch(videoUrl, {
      headers: {
        'User-Agent': request.headers.get("User-Agent") || "",
        'Range': request.headers.get("Range") || "",
      }
    });

    const newHeaders = new Headers(response.headers);
    newHeaders.set("Access-Control-Allow-Origin", "*");
    newHeaders.set("Content-Disposition", "inline");
    newHeaders.set("Content-Type", "video/mp4");

    return new Response(response.body, {
      status: response.status,
      headers: newHeaders,
    });
  }
};