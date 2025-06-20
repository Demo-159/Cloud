export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const targetUrl = url.searchParams.get("url");

    if (!targetUrl) {
      return new Response("Missing URL", { status: 400 });
    }

    const proxiedResponse = await fetch(targetUrl, {
      headers: {
        "Referer": targetUrl, // opcional
        "User-Agent": request.headers.get("User-Agent") || ""
      }
    });

    return new Response(proxiedResponse.body, {
      status: proxiedResponse.status,
      headers: proxiedResponse.headers
    });
  }
};
