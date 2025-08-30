"use strict";
const store_weatherStore = require("../../store/weatherStore.js");
const store_formatStore = require("../../store/formatStore.js");
const pages_weather_index = require("./index.js");
const utils_format = require("../../utils/format.js");
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      pageInfo: {},
      navigatorHeight: 0,
      footer: "数据来源：和风天气Api"
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
    weatherInfo() {
      var _a, _b;
      const data = store_weatherStore.weatherStore.data;
      const gridInfo = ((_a = store_weatherStore.weatherStore.girdInfo) == null ? void 0 : _a.daily).map((item) => {
        const fd = utils_format.formatDate(item.fxDate);
        return {
          ...item,
          day: fd.day
        };
      });
      const indices = store_weatherStore.weatherStore.indices.daily[0];
      return {
        gridInfo,
        indices,
        icon: data.icon,
        temp: data.temp,
        text: data.text,
        location: data.location,
        updateTime: ((_b = data.obsTime) == null ? void 0 : _b.match(/\d{2}:\d{2}/)[0]) + "更新" || "--",
        cloud: `${data.cloud}%`,
        windSpeed: `${data.windSpeed}Km/h`,
        feelsLike: `${data.feelsLike}℃`
      };
    },
    date() {
      const data = store_formatStore.formatStore.data;
      return `(${data.prefix}${data.date})`;
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
  var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r, _s, _t;
  return {
    a: common_vendor.o($options.getNavHeight),
    b: common_vendor.p({
      align: (_a = $data.pageInfo) == null ? void 0 : _a.navAlgin,
      title: (_b = $data.pageInfo) == null ? void 0 : _b.navTitle,
      color: (_c = $data.pageInfo) == null ? void 0 : _c.navColor,
      [","]: true,
      ["is-back"]: (_d = $data.pageInfo) == null ? void 0 : _d.isBack
    }),
    c: common_vendor.t(((_e = $options.weatherInfo.location) == null ? void 0 : _e.name) || "--"),
    d: common_vendor.t($options.date || "--"),
    e: common_vendor.t(((_f = $options.weatherInfo) == null ? void 0 : _f.updateTime) || "--"),
    f: common_vendor.t(((_g = $options.weatherInfo) == null ? void 0 : _g.temp) || "--"),
    g: common_vendor.n("qi-" + ((_h = $options.weatherInfo) == null ? void 0 : _h.icon)),
    h: common_vendor.n(((_i = $options.weatherInfo) == null ? void 0 : _i.icon) == 100 ? "rotate" : "breath"),
    i: common_vendor.t(((_j = $options.weatherInfo) == null ? void 0 : _j.text) || "--"),
    j: common_vendor.t(((_k = $options.weatherInfo) == null ? void 0 : _k.windSpeed) || "--"),
    k: common_vendor.t(((_l = $options.weatherInfo) == null ? void 0 : _l.cloud) || "--"),
    l: common_vendor.t(((_m = $options.weatherInfo) == null ? void 0 : _m.feelsLike) || "--"),
    m: common_vendor.f((_n = $options.weatherInfo) == null ? void 0 : _n.gridInfo, (item, index, i0) => {
      return {
        a: common_vendor.t(item.day || "--"),
        b: common_vendor.n("qi-" + item.iconDay),
        c: common_vendor.t(item.tempMax || "--"),
        d: index
      };
    }),
    n: common_vendor.t(((_p = (_o = $options.weatherInfo) == null ? void 0 : _o.indices) == null ? void 0 : _p.name) || "--"),
    o: common_vendor.t(((_r = (_q = $options.weatherInfo) == null ? void 0 : _q.indices) == null ? void 0 : _r.category) || "--"),
    p: common_vendor.t(((_t = (_s = $options.weatherInfo) == null ? void 0 : _s.indices) == null ? void 0 : _t.text) || "--"),
    q: common_vendor.t($data.footer),
    r: $data.navigatorHeight + "px"
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-54774d74"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/weather/weather.js.map
