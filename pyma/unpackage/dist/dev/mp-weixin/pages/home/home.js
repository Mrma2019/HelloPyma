"use strict";
const common_vendor = require("../../common/vendor.js");
const store_weatherStore = require("../../store/weatherStore.js");
const store_formatStore = require("../../store/formatStore.js");
const pages_home_index = require("./index.js");
const _sfc_main = {
  data() {
    return {
      navBarHeight: 0,
      swiperHeight: 0,
      contentPanelPaddingBottom: 0,
      gap: 10,
      pageInfo: {},
      ispopup: false
    };
  },
  async onLoad() {
    this.pageInfo = await pages_home_index.getPageInfo();
    this.$nextTick(() => {
      const query = common_vendor.index.createSelectorQuery().in(this);
      query.select(".swiper").boundingClientRect((rect) => {
        this.swiperHeight = rect.height;
      }).exec();
    });
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
    },
    popup(item) {
      if (item.ispopup) {
        this.ispopup = true;
      } else {
        this.ispopup = false;
      }
    }
  },
  computed: {
    weatherInfo() {
      const data = store_weatherStore.weatherStore.data;
      return {
        temp: data.temp,
        text: data.text,
        windDir: `${data.windDir} ${data.windScale}级`,
        humidity: `空气湿度 ${data.humidity}`,
        dateTitle: "当前日期 年/月/日",
        icon: data.icon
      };
    },
    date() {
      return store_formatStore.formatStore.data.date;
    },
    time() {
      return store_formatStore.formatStore.data.time;
    }
  }
};
if (!Array) {
  const _easycom_uni_nav_bar2 = common_vendor.resolveComponent("uni-nav-bar");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  const _easycom_uni_tab_bar2 = common_vendor.resolveComponent("uni-tab-bar");
  (_easycom_uni_nav_bar2 + _easycom_uni_popup2 + _easycom_uni_tab_bar2)();
}
const _easycom_uni_nav_bar = () => "../../components/nav-bar/nav-bar.js";
const _easycom_uni_popup = () => "../../components/popup/popup.js";
const _easycom_uni_tab_bar = () => "../../components/tab-bar/tab-bar.js";
if (!Math) {
  (_easycom_uni_nav_bar + _easycom_uni_popup + _easycom_uni_tab_bar)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m;
  return {
    a: common_vendor.o($options.getNavBarHeight),
    b: common_vendor.p({
      title: (_a = $data.pageInfo) == null ? void 0 : _a.navTitle,
      align: (_b = $data.pageInfo) == null ? void 0 : _b.navAlgin,
      ["is-back"]: (_c = $data.pageInfo) == null ? void 0 : _c.isBack,
      color: (_d = $data.pageInfo) == null ? void 0 : _d.navColor
    }),
    c: common_vendor.f((_e = $data.pageInfo) == null ? void 0 : _e.swiperImageSrc, (item, index, i0) => {
      return {
        a: item,
        b: index
      };
    }),
    d: $data.navBarHeight + $data.gap + "px",
    e: $data.navBarHeight + $data.gap + $data.swiperHeight / 2 + "px",
    f: $data.swiperHeight / 2 + "px",
    g: common_vendor.n("qi-" + $options.weatherInfo.icon),
    h: common_vendor.n($options.weatherInfo.icon == 100 ? "rotate" : "breath"),
    i: common_vendor.t($options.weatherInfo.temp || "--"),
    j: common_vendor.t($options.time || "--"),
    k: common_vendor.t(((_f = $options.weatherInfo) == null ? void 0 : _f.text) || "--"),
    l: common_vendor.t(((_g = $options.weatherInfo) == null ? void 0 : _g.windDir) || "--"),
    m: common_vendor.t(((_h = $options.weatherInfo) == null ? void 0 : _h.humidity) || "--"),
    n: common_vendor.o((...args) => $options.navigatorTo && $options.navigatorTo(...args)),
    o: common_vendor.t(((_i = $options.weatherInfo) == null ? void 0 : _i.dateTitle) || "--"),
    p: common_vendor.f($options.date.split("-"), (item, index, i0) => {
      return {
        a: common_vendor.t(item || "--"),
        b: common_vendor.t(index === 0 ? "Year" : index === 1 ? "Month" : "Date"),
        c: index
      };
    }),
    q: common_vendor.t(((_j = $data.pageInfo.mainBtn) == null ? void 0 : _j.text) || "--"),
    r: common_vendor.t(((_k = $data.pageInfo.mainBtn) == null ? void 0 : _k.desc) || "--"),
    s: common_vendor.n((_l = $data.pageInfo.mainBtn) == null ? void 0 : _l.icon),
    t: common_vendor.f((_m = $data.pageInfo) == null ? void 0 : _m.subBtns, (item, index, i0) => {
      return {
        a: common_vendor.t((item == null ? void 0 : item.text) || "--"),
        b: common_vendor.t((item == null ? void 0 : item.desc) || "--"),
        c: common_vendor.n(item.icon),
        d: index,
        e: common_vendor.o(($event) => $options.popup(item), index)
      };
    }),
    v: $data.contentPanelPaddingBottom + "px",
    w: common_vendor.o(($event) => $data.ispopup = $event),
    x: common_vendor.p({
      show: $data.ispopup
    }),
    y: common_vendor.o($options.setContentPanelPaddingBottom)
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-07e72d3c"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/home/home.js.map
