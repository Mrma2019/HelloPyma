"use strict";
const common_vendor = require("../../common/vendor.js");
const store_systemStore = require("../../store/systemStore.js");
const pages_info_index = require("./index.js");
const common_assets = require("../../common/assets.js");
const _sfc_main = {
  data() {
    return {
      pageInfo: {}
    };
  },
  methods: {},
  async mounted() {
    this.pageInfo = await pages_info_index.getPageInfo();
  },
  computed: {
    systemInfo() {
      const data = store_systemStore.systemStore.data;
      common_vendor.index.__f__("log", "at pages/info/info.vue:48", "inof", data);
      return {
        navBarHeight: data.navBarHeight
      };
    }
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
  var _a, _b, _c, _d;
  return {
    a: common_vendor.p({
      title: (_a = $data.pageInfo) == null ? void 0 : _a.navTitle,
      align: (_b = $data.pageInfo) == null ? void 0 : _b.navAlgin,
      color: (_c = $data.pageInfo) == null ? void 0 : _c.navColor
    }),
    b: common_assets._imports_0,
    c: ((_d = $options.systemInfo) == null ? void 0 : _d.navBarHeight) + "px"
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/info/info.js.map
