"use strict";
const common_vendor = require("../../common/vendor.js");
const store_weatherStore = require("../../store/weatherStore.js");
const store_formatStore = require("../../store/formatStore.js");
const common_assets = require("../../common/assets.js");
const _sfc_main = {
  data() {
    return {
      title: "HelloPyMa",
      algin: "left",
      color: "white",
      navBarHeight: 0,
      swiperHeight: 0,
      contentPanelPaddingBottom: 0,
      buttonCardInfo: {
        mainBtn: {
          text: "立即发布",
          desc: "找搭子",
          icon: "icon-xunzhao"
        },
        subBtns: [{
          text: "留言板",
          desc: "去留言",
          icon: "icon-liuyan"
        }, {
          text: "声明",
          desc: "查看",
          icon: "icon-guanyuapp"
        }]
      }
    };
  },
  methods: {
    getNavBarHeight(height) {
      this.navBarHeight = height;
    },
    setContentPanelPaddingBottom(height) {
      this.contentPanelPaddingBottom = height;
    },
    //页面跳转
    navigatorTo(e) {
      const pagepath = e.currentTarget.dataset.pagepath;
      common_vendor.index.navigateTo({
        url: `${pagepath}`
      });
      common_vendor.index.__f__("log", "at pages/home/home.vue:116", this.weatherData);
    }
  },
  computed: {
    weatherCardInfo() {
      const weatherInfo = store_weatherStore.weatherStore.data;
      return {
        temp: weatherInfo.temp,
        text: weatherInfo.text,
        windDir: `${weatherInfo.windDir} ${weatherInfo.windScale}级`,
        humidity: `空气湿度 ${weatherInfo.humidity}`,
        dateTitle: "当前日期 年/月/日"
      };
    },
    formatDate() {
      return store_formatStore.formatStore.data.date || "";
    },
    formatTime() {
      return store_formatStore.formatStore.data.time || "";
    }
  },
  onLoad() {
    const query = common_vendor.index.createSelectorQuery().in(this);
    query.select(".swiper").boundingClientRect((rect) => {
      this.swiperHeight = rect.height;
    }).exec();
  }
};
if (!Array) {
  const _easycom_uni_nav_bar2 = common_vendor.resolveComponent("uni-nav-bar");
  const _easycom_uni_tab_bar2 = common_vendor.resolveComponent("uni-tab-bar");
  (_easycom_uni_nav_bar2 + _easycom_uni_tab_bar2)();
}
const _easycom_uni_nav_bar = () => "../../components/nav-bar/nav-bar.js";
const _easycom_uni_tab_bar = () => "../../components/tab-bar/tab-bar.js";
if (!Math) {
  (_easycom_uni_nav_bar + _easycom_uni_tab_bar)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o($options.getNavBarHeight),
    b: common_vendor.p({
      title: $data.title,
      algin: $data.algin,
      color: $data.color
    }),
    c: common_assets._imports_0$1,
    d: $data.navBarHeight + "px",
    e: $data.navBarHeight + $data.swiperHeight / 2 + "px",
    f: common_vendor.t($options.weatherCardInfo.temp),
    g: common_vendor.t($options.formatTime),
    h: common_vendor.t($options.weatherCardInfo.text),
    i: common_vendor.t($options.weatherCardInfo.windDir),
    j: common_vendor.t($options.weatherCardInfo.humidity),
    k: common_vendor.o((...args) => $options.navigatorTo && $options.navigatorTo(...args)),
    l: common_vendor.t($options.weatherCardInfo.dateTitle),
    m: common_vendor.f($options.formatDate.split(":"), (item, index, i0) => {
      return {
        a: common_vendor.t(item),
        b: common_vendor.t(index === 0 ? "year" : index === 1 ? "month" : "day"),
        c: index
      };
    }),
    n: common_vendor.t($data.buttonCardInfo.mainBtn.text),
    o: common_vendor.t($data.buttonCardInfo.mainBtn.desc),
    p: common_vendor.n($data.buttonCardInfo.mainBtn.icon),
    q: common_vendor.f($data.buttonCardInfo.subBtns, (item, index, i0) => {
      return {
        a: common_vendor.t(item.text),
        b: common_vendor.t(item.desc),
        c: common_vendor.n(item.icon),
        d: index
      };
    }),
    r: $data.swiperHeight / 2 + 10 + "px",
    s: $data.contentPanelPaddingBottom + "px",
    t: common_vendor.o($options.setContentPanelPaddingBottom)
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/home/home.js.map
