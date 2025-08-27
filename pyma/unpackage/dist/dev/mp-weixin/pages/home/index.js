"use strict";
async function getPageInfo() {
  const pageInfo = {
    navTitle: "HelloPyMa",
    navAlgin: "left",
    navColor: "white",
    isBack: false,
    swiperImageSrc: [
      "/static/pictures/827d7d49-a85d-4c47-8773-8a9c3275c034.jpg"
    ],
    mainBtn: {
      text: "找搭子",
      desc: "进入广场",
      icon: "icon-xunzhao"
    },
    subBtns: [{
      text: "待参加",
      desc: "进入",
      icon: "icon-liebiao1",
      ispopup: false
    }, {
      text: "声明",
      desc: "查看",
      icon: "icon-guanyuapp",
      ispopup: true
    }]
  };
  return pageInfo;
}
exports.getPageInfo = getPageInfo;
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/home/index.js.map
