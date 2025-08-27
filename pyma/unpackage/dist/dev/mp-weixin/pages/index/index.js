"use strict";
const common_vendor = require("../../common/vendor.js");
const store_weatherStore = require("../../store/weatherStore.js");
async function getPageInfo() {
  const pageInfo = {
    logo: "/static/logo.jpg",
    appName: "HelloPyma",
    pagepath: "/pages/home/home"
  };
  return pageInfo;
}
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const pageInfo = common_vendor.ref({});
    common_vendor.onMounted(async () => {
      pageInfo.value = await getPageInfo();
    });
    common_vendor.watch(() => store_weatherStore.weatherStore.loading, (newVal) => {
      if (!newVal) {
        setTimeout(() => {
          common_vendor.index.switchTab({
            url: pageInfo.value.pagepath
          });
        }, 1e3);
      }
    });
    return (_ctx, _cache) => {
      return {
        a: pageInfo.value.logo,
        b: common_vendor.t(pageInfo.value.appName)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-1cf27b2a"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/index/index.js.map
