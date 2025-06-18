export default {
  async fetch(request) {
    const videoUrl = "https://uc06e182d0911a63a65f890b3b50.dl.dropboxusercontent.com/cd/0/get/Cr6cqFNXwAir6rc87sHcJPYAhWNEZ5oaBfNmtImRuLbR3nQQL3RNEk_RF8Xt9lAhRPfBfYe9ZunBYliUnwcFMi4izxhNWjows6aIlcO004Li3UsWmpm5imXhLYiieQfKiyobRqB_rtqe6IrFvaJMMSbSuVTEScevY_Ai-83Ptfs70vMOMXZ4r0Q-p_Z8A1i05gQ/file?_download_id=69983300337712875777372362620875696478673494613507225086718588514&_log_download_success=1";

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