"use strict";
const common_vendor = require("../../common/vendor.js");
const store_systemStore = require("../../store/systemStore.js");
const pages_info_index = require("./index.js");
const common_assets = require("../../common/assets.js");
const _sfc_main = {
  data() {
    return {
      pageInfo: {},
      gap: 10,
      is_popup: false,
      avaterUrl: "",
      defaultAvaterUrl: "/static/logo.jpg"
    };
  },
  methods: {
    onClick() {
      this.is_popup = true;
    },
    onChooseAvatar(e) {
      const {
        avaterUrl
      } = e.detail;
      common_vendor.index.__f__("log", "at pages/info/info.vue:60", "avatarUrl", avaterUrl);
      this.avaterUrl = avaterUrl;
    }
  },
  async mounted() {
    this.pageInfo = await pages_info_index.getPageInfo();
  },
  computed: {
    systemInfo() {
      const data = store_systemStore.systemStore.data;
      common_vendor.index.__f__("log", "at pages/info/info.vue:70", "inof", data);
      return {
        navBarHeight: data.navBarHeight
      };
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
  var _a, _b, _c, _d;
  return {
    a: common_vendor.p({
      title: (_a = $data.pageInfo) == null ? void 0 : _a.navTitle,
      align: (_b = $data.pageInfo) == null ? void 0 : _b.navAlgin,
      color: (_c = $data.pageInfo) == null ? void 0 : _c.navColor
    }),
    b: common_assets._imports_0,
    c: common_vendor.o((...args) => $options.onClick && $options.onClick(...args)),
    d: ((_d = $options.systemInfo) == null ? void 0 : _d.navBarHeight) + $data.gap + "px",
    e: $data.avaterUrl || $data.defaultAvaterUrl,
    f: common_vendor.o((...args) => $options.onChooseAvatar && $options.onChooseAvatar(...args)),
    g: common_vendor.f(100, (item, index, i0) => {
      return {
        a: common_vendor.t(item),
        b: index
      };
    }),
    h: common_vendor.o(($event) => $data.is_popup = $event),
    i: common_vendor.p({
      height: "40",
      show: $data.is_popup
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/info/info.js.map
