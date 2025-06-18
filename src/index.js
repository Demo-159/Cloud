export default {
  async fetch(request) {
    const videoUrl = "http://fliz.wuaze.com/wp-content/uploads/2025/06/AQPg06-FNVxPwg5lylHh5dom21oA8sRRpkqj9UU6yfZ-vvKNTWsbGFe59YTpBIsm9zGwArQJbsCCdazEVbrtwjxf5fYA9fnCbQcgIR4.mp4";

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