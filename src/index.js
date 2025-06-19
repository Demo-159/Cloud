export default {
  async fetch(request) {
    const videoUrl = "https://a309a.cloudatacdn.com/u5kj6k5pyhblsdgge6mmi3splfptdne67kr7y3oulxzkjj2ovtyfoy7ripwq/28vmhprtel~33plReQtil?token=tuhoamvqoualla0b8ib8wwwl&expiry=1750296001832";

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