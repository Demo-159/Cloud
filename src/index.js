export default {
  async fetch(request) {
    const videoUrl = "https://cl-a8-i-e-jr2.cdn.mdstrm.com/live-stream-gdai/linear/hls/pa/event/aNEyNPB8SFCfwr9zw5dPfw/stream/cecb59df-aeab-49aa-a737-9f33175abe68:SCL/master.m3u8?aid=51c2f628b440bd797900051f&uid=gYw9Il7GJSs6B3iXK8S0poGoYjgWLhQJ&sid=QCYawf7hwcGSBEr8tTO8Tm9QT99M4omP&pid=yOYSm6nzZDIt4m352iSLxE5bdWRr739c&pid_dvr=PKwl1kcPlyMyqyRvQvHOb35rGGaQdDGk&c=60f116b37d8b8718bd5be2b8&ref=https%3A%2F%2Ftvnplay.cl%2F&without_cookies=false&listenerid=&dnt=true&adInsertionGoogleStreamId=cecb59df-aeab-49aa-a737-9f33175abe68%3ASCL&es=cl-a8-i-e-jr2.cdn.mdstrm.com&ote=1750451493651&ot=m7OeB2mQ1w8kisMUAfxSkA&proto=https&pz=cl";
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