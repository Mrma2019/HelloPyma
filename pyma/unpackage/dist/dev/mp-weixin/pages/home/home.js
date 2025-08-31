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
      is_popup: false,
      refresherTriggered: false
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
  onHide() {
    this.is_popup = false;
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
    async onRefresher() {
      this.refresherTriggered = true;
      await this.getData();
      this.refresherTriggered = false;
    },
    getData() {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve();
        }, 1e3);
      });
    },
    onClick(item) {
      if (item.is_popup) {
        this.is_popup = true;
      } else {
        this.is_popup = false;
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
      const date = store_formatStore.formatStore.data.date.split("-").map((item, index) => {
        let label = "";
        switch (index) {
          case 0:
            label = "Year";
            break;
          case 1:
            label = "Month";
            break;
          case 2:
            label = "Date";
            break;
        }
        return {
          value: item,
          label
        };
      });
      return date;
    },
    time() {
      return store_formatStore.formatStore.data.time;
    }
  }
};
if (!Array) {
  const _easycom_uni_nav_bar2 = common_vendor.resolveComponent("uni-nav-bar");
  const _easycom_uni_tap_bar2 = common_vendor.resolveComponent("uni-tap-bar");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  const _easycom_uni_tab_bar2 = common_vendor.resolveComponent("uni-tab-bar");
  (_easycom_uni_nav_bar2 + _easycom_uni_tap_bar2 + _easycom_uni_popup2 + _easycom_uni_tab_bar2)();
}
const _easycom_uni_nav_bar = () => "../../components/nav-bar/nav-bar.js";
const _easycom_uni_tap_bar = () => "../../components/tap-bar/tap-bar.js";
const _easycom_uni_popup = () => "../../components/popup/popup.js";
const _easycom_uni_tab_bar = () => "../../components/tab-bar/tab-bar.js";
if (!Math) {
  (_easycom_uni_nav_bar + _easycom_uni_tap_bar + _easycom_uni_popup + _easycom_uni_tab_bar)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r, _s, _t, _u;
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
    g: common_vendor.n("qi-" + ((_f = $options.weatherInfo) == null ? void 0 : _f.icon)),
    h: common_vendor.n(((_g = $options.weatherInfo) == null ? void 0 : _g.icon) == 100 ? "rotate" : "breath"),
    i: common_vendor.t(((_h = $options.weatherInfo) == null ? void 0 : _h.temp) || "--"),
    j: common_vendor.t($options.time || "--"),
    k: common_vendor.t(((_i = $options.weatherInfo) == null ? void 0 : _i.text) || "--"),
    l: common_vendor.t(((_j = $options.weatherInfo) == null ? void 0 : _j.windDir) || "--"),
    m: common_vendor.t(((_k = $options.weatherInfo) == null ? void 0 : _k.humidity) || "--"),
    n: (_m = (_l = $data.pageInfo) == null ? void 0 : _l.pages) == null ? void 0 : _m.info_to,
    o: common_vendor.o((...args) => $options.navigatorTo && $options.navigatorTo(...args)),
    p: common_vendor.t(((_n = $options.weatherInfo) == null ? void 0 : _n.dateTitle) || "--"),
    q: common_vendor.f($options.date, (item, index, i0) => {
      return {
        a: common_vendor.t(item["value"] || "--"),
        b: common_vendor.t(item["label"]),
        c: index
      };
    }),
    r: common_vendor.t(((_o = $data.pageInfo.mainBtn) == null ? void 0 : _o.text) || "--"),
    s: common_vendor.t(((_p = $data.pageInfo.mainBtn) == null ? void 0 : _p.desc) || "--"),
    t: common_vendor.n((_q = $data.pageInfo.mainBtn) == null ? void 0 : _q.icon),
    v: (_s = (_r = $data.pageInfo) == null ? void 0 : _r.pages) == null ? void 0 : _s.mainBtn_to,
    w: common_vendor.o((...args) => $options.navigatorTo && $options.navigatorTo(...args)),
    x: common_vendor.f((_t = $data.pageInfo) == null ? void 0 : _t.subBtns, (item, index, i0) => {
      return {
        a: common_vendor.t((item == null ? void 0 : item.text) || "--"),
        b: common_vendor.t((item == null ? void 0 : item.desc) || "--"),
        c: common_vendor.n(item.icon),
        d: index,
        e: common_vendor.o(($event) => $options.onClick(item), index)
      };
    }),
    y: common_vendor.p({
      taps: (_u = $data.pageInfo) == null ? void 0 : _u.taps
    }),
    z: $data.contentPanelPaddingBottom + "px",
    A: $data.refresherTriggered,
    B: common_vendor.o((...args) => $options.onRefresher && $options.onRefresher(...args)),
    C: $data.contentPanelPaddingBottom + 20 + "px",
    D: "20px",
    E: common_vendor.o(($event) => $data.is_popup = $event),
    F: common_vendor.p({
      height: "65",
      show: $data.is_popup
    }),
    G: common_vendor.o($options.setContentPanelPaddingBottom)
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-07e72d3c"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/home/home.js.map
