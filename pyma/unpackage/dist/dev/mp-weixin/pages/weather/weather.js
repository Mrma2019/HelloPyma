"use strict";
const common_vendor = require("../../common/vendor.js");
const pages_weather_index = require("./index.js");
const store_weatherStore = require("../../store/weatherStore.js");
const _sfc_main = {
  data() {
    return {
      pageInfo: {},
      navigatorHeight: 0
    };
  },
  methods: {
    getNavHeight(height) {
      this.navigatorHeight = height;
    }
  },
  async onLoad() {
    this.pageInfo = await pages_weather_index.getPageInfo();
  },
  computed: {
    weatherStore() {
      common_vendor.index.__f__("log", "at pages/weather/weather.vue:40", "天气信息", store_weatherStore.weatherStore);
      return store_weatherStore.weatherStore;
    }
  }
};
if (!Array) {
  const _easycom_uni_nav_bar2 = common_vendor.resolveComponent("uni-nav-bar");
  _easycom_uni_nav_bar2();
}
const _easycom_uni_nav_bar = () => "../../components/nav-bar/nav-bar.js";
if (!Math) {
  _easycom_uni_nav_bar();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  var _a, _b, _c, _d;
  return {
    a: common_vendor.o($options.getNavHeight),
    b: common_vendor.p({
      align: (_a = $data.pageInfo) == null ? void 0 : _a.navAlgin,
      title: (_b = $data.pageInfo) == null ? void 0 : _b.navTitle,
      color: (_c = $data.pageInfo) == null ? void 0 : _c.navColor,
      [","]: true,
      ["is-back"]: (_d = $data.pageInfo) == null ? void 0 : _d.isBack
    }),
    c: common_vendor.t($options.weatherStore.location.name),
    d: common_vendor.t($options.weatherStore.data.obsTime),
    e: $data.navigatorHeight + "px"
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-54774d74"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/weather/weather.js.map
