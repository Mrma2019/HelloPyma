"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const store_weatherStore = require("../../store/weatherStore.js");
const appName = "HelloPyma";
const pagepath = "/pages/home/home";
const _sfc_main = {
  __name: "index",
  setup(__props) {
    common_vendor.watch(() => store_weatherStore.weatherStore.loading, (newVal) => {
      if (!newVal) {
        common_vendor.index.switchTab({
          url: `${pagepath}`
        });
      }
    });
    return (_ctx, _cache) => {
      return {
        a: common_assets._imports_0,
        b: common_vendor.t(appName)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-1cf27b2a"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/index/index.js.map
