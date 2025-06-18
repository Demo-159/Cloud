export default {
  async fetch(request) {
    const url = "https://ia903100.us.archive.org/33/items/shr-2010/Shr2010.mp4";

    const res = await fetch(url, {
      headers: request.headers
    });

    const headers = new Headers(res.headers);
    headers.set("Access-Control-Allow-Origin", "*");
    headers.set("Content-Disposition", "inline");
    headers.set("Cache-Control", "public, max-age=31536000");

    return new Response(res.body, {
      status: res.status,
      headers
    });
  }
}export default {
  async fetch(request) {
    const url = "https://ia903100.us.archive.org/33/items/shr-2010/Shr2010.mp4";

    const res = await fetch(url, {
      headers: request.headers
    });

    const headers = new Headers(res.headers);
    headers.set("Access-Control-Allow-Origin", "*");
    headers.set("Content-Disposition", "inline");
    headers.set("Cache-Control", "public, max-age=31536000");

    return new Response(res.body, {
      status: res.status,
      headers
    });
  }
}
