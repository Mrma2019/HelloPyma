"use strict";
async function getPageInfo() {
  const pageInfo = {
    navTitle: "HELLOPYMA",
    navAlgin: "left",
    navColor: "white",
    isBack: false,
    swiperImageSrc: [
      "/static/pictures/827d7d49-a85d-4c47-8773-8a9c3275c034.jpg"
    ],
    //按钮配置
    mainBtn: {
      text: "找搭子",
      desc: "进入广场",
      icon: "icon-xunzhao"
    },
    subBtns: [{
      text: "待参加",
      desc: "进入",
      icon: "icon-liebiao1",
      is_popup: false
    }, {
      text: "声明",
      desc: "查看",
      icon: "icon-guanyuapp",
      is_popup: true
    }],
    // 页面跳转配置
    pages: {
      info_to: "/pages/weather/weather",
      mainBtn_to: "/pages/square/square",
      subBtn_to: ""
    },
    taps: [
      {
        name: "活动",
        list: [{
          text: "开发中...",
          desc: "敬请期待",
          icon: "icon-jiaoxuerenwu"
        }]
      },
      {
        name: "关于",
        list: [{
          text: "开发初衷",
          desc: "进入",
          icon: "icon-jiaoyukeben"
        }]
      }
    ]
  };
  return pageInfo;
}
exports.getPageInfo = getPageInfo;
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/home/index.js.map
