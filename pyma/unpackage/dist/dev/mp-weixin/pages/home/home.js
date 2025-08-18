"use strict";
const common_vendor = require("../../common/vendor.js");
const store_weather = require("../../store/weather.js");
const store_date = require("../../store/date.js");
const common_assets = require("../../common/assets.js");
const _sfc_main = {
  data() {
    return {
      title: "HelloPyMa",
      algin: "left",
      color: "white",
      navBarHeight: 0,
      swiperHeight: 0,
      contentPanelPaddingBottom: 0
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
      common_vendor.index.__f__("log", "at pages/home/home.vue:85", this.weatherData);
    }
  },
  computed: {
    weatherData() {
      return store_weather.weatherStore.data || {};
    },
    formatDate() {
      return store_date.dateStore.date || {};
    },
    formatTime() {
      return store_date.dateStore.time || {};
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
    c: common_assets._imports_0,
    d: $data.navBarHeight + "px",
    e: $data.navBarHeight + $data.swiperHeight / 2 + "px",
    f: common_vendor.t($options.weatherData.temp),
    g: common_vendor.t($options.formatTime),
    h: common_vendor.t($options.weatherData.text),
    i: common_vendor.t($options.weatherData.windDir + $options.weatherData.windScale + "级"),
    j: common_vendor.t("空气湿度" + $options.weatherData.humidity),
    k: common_vendor.o((...args) => $options.navigatorTo && $options.navigatorTo(...args)),
    l: common_vendor.f($options.formatDate.split(":"), (item, k0, i0) => {
      return {
        a: common_vendor.t(item)
      };
    }),
    m: $data.swiperHeight / 2 + 10 + "px",
    n: $data.contentPanelPaddingBottom + "px",
    o: common_vendor.o($options.setContentPanelPaddingBottom)
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/home/home.js.map
