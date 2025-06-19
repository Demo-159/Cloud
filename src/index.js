export default {
  async fetch(request) {
    const videoUrl = "https://fin-3dg-b1.i8yz83pn.com/hls2/01/09265/7bhx68umfv5q_x/master.m3u8?t=ZWFq20T8foCD_HgBIQaZ968ImWq3EqXk83joCof4GPM&s=1750295360&e=10800&f=46327812&srv=26&asn=27901&sp=5500&p=";

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