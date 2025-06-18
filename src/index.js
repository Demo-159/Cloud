export default {
  async fetch(request) {
    const videoUrl = "https://uc4b332f0dfda5d7e80764225514.dl.dropboxusercontent.com/cd/0/get/Cr629It4lsMFYvKImZCI1oQwtSV_ycTEtdcZL_gxDYlJVLmQTeHT2GD6pcef4EjqIymUM81G-s6q53utSuky1eiUrilEu1oDC2tajCDet5Ow-aVwU33a9AGSHE4g1vNz2lYjeBSP17uXaJGJ-6AkrSgGS0pAhzn4iOryw-5EkfAkHTJSI7RFkAmXZG6O4its5fY/file?_download_id=21920669219587985439420612255324679834014363599449209317378111671&_log_download_success=1&_notify_domain=www.dropbox.com&dl=1";

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