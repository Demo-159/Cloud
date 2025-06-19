export default {
  async fetch(request) {
    const videoUrl = "https://data.1024tera.com/file/a079c5d4ef404beab9b0701475a54736?bkt=en-4d166c0718877615adb5acdc1396c50e8ec46ddb503a981df2629594eeadd74ee2c45d3a2af0654b&xcode=16bbc05962bc9e956fcb3d8e208b84840c865ed7c59cc990c0c831533b067373f331b88b930d01340fa63d4a05c13b73ad4821849a10fcf3&fid=4398630017732-250528-959381056090162&time=1750292352&sign=FDTAXUGERLQlBHSKfWon-DCb740ccc5511e5e8fedcff06b081203-v7lDFtIoR3di3vicBrYwVssT5yg%3D&to=164&size=4512957&sta_dx=4512957&sta_cs=1&sta_ft=mp4&sta_ct=7&sta_mt=0&fm2=MH%2Ctky%2CAnywhere%2C%2CQmlvYsOtbw%3D%3D%2Cany&region=tky&ctime=1688712569&mtime=1750291812&resv0=-1&resv1=0&resv2=&resv3=&resv4=4512957&vuk=4398713923012&iv=0&htype=&randtype=&newver=1&newfm=1&secfm=1&flow_ver=3&pkey=en-4706de61d88895b2261f4b2e04a77a0b7a7b2312dd4b7a05ac9c8f60ec90ed03bf9fde279cf7ffd9&sl=68091977&expires=1750321152&rt=sh&r=817036858&sh=1&vbdid=-&fin=Get+More+Than+Just+Storage-TeraBox%27s+Variety+of+Goods.mp4&fn=Get+More+Than+Just+Storage-TeraBox%27s+Variety+of+Goods.mp4&rtype=1&dp-logid=468862932082297569&dp-callid=0.1&hps=1&tsl=2000&csl=2000&fsl=-1&csign=Ugd%2F9%2FHfmMph8BXhA5hSRrKhw6M%3D&so=0&ut=6&uter=4&serv=1&uc=3049254975&ti=e6e2f9d25109af0ecd1bc267dc0de57b3f8fb00140ab1c73&tuse=&raw_appid=0&ogr=0&rregion=XVVi&adg=&reqlabel=250528_f_09dfc9c6c9a144f8157c609643617c08_-1_3feb7f0b11b05a98cd412ebc4c85f752&ccn=CL&by=themis";

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