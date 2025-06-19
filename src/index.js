export default {
  async fetch(request) {
    const videoUrl = "https://mdstrm.com/live-stream-playlist/533adcc949386ce765657d7c.m3u8?uid=gYw9Il7GJSs6B3iXK8S0poGoYjgWLhQJ&sid=QCYawf7hwcGSBEr8tTO8Tm9QT99M4omP&pid=yOYSm6nzZDIt4m352iSLxE5bdWRr739c&pid_dvr=PKwl1kcPlyMyqyRvQvHOb35rGGaQdDGk&an=tvn-play-app-web&at=web-app&av=v6.0.170&c=60f116b37d8b8718bd5be2b8&ref=https%3A%2F%2Ftvnplay.cl%2F&res=342x192&without_cookies=false&listenerid=&dnt=true&adInsertionGoogleStreamId=cecb59df-aeab-49aa-a737-9f33175abe68:SCL";
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