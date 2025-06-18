export default {
  async fetch(request) {
    const videoUrl = "https://uc34e60808db1181a20dd64c69a4.dl.dropboxusercontent.com/cd/0/get/Cr5MRsZxN44PsqdqNJqTPVy_d3aiuq14sblymVA58BJ3IWSiIn7BTIhh4mWrYyjA69cIby3a4UcVlz_gwJYeVirj_EX0WOE9hwwACpzU1OHGX-J8kX7QdDqoy0E3zeQPyfCt0kveeCoomRVJMm0bDVGZAxc7aTqVc0axk7qm0NeF-Rik0RTobrD3nxQn5cXXdvY/file?_download_id=687857951195571925157862419523966016964308909948769874393147394&_log_download_success=1&_notify_domain=www.dropbox.com&dl=1";

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