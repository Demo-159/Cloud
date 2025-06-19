export default {
  async fetch(request) {
    const videoUrl = "https://mdstrm.com/live-stream-playlist/533adcc949386ce765657d7c.m3u8";

    const response = await fetch(videoUrl, {
      headers: {
        'User-Agent': request.headers.get("User-Agent") || "",
        'Range': request.headers.get("Range") || "",
      }
    });

    // Clonamos headers originales y agregamos CORS
    const newHeaders = new Headers(response.headers);
    newHeaders.set("Access-Control-Allow-Origin", "*");
    newHeaders.set("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS");
    newHeaders.set("Access-Control-Allow-Headers", "*");

    // No modificar Content-Type
    return new Response(response.body, {
      status: response.status,
      headers: newHeaders,
    });
  }
};