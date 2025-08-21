"use strict";
const common_vendor = require("../../common/vendor.js");
const components_tabBar_index = require("./index.js");
const _sfc_main = {
  name: "tab-bar",
  data() {
    return {
      tabList: components_tabBar_index.tabList,
      tabBarPaddingBottom: 0,
      tabBarHeight: 0
    };
  },
  created() {
    const sysInfo = common_vendor.index.getWindowInfo();
    const platform = common_vendor.index.getDeviceInfo().platform;
    if (platform !== "ios") {
      this.tabBarPaddingBottom = 10;
    } else {
      this.tabBarPaddingBottom = sysInfo.safeAreaInsets.bottom;
    }
    const query = common_vendor.index.createSelectorQuery().in(this);
    query.select(".tab-bar").boundingClientRect((rect) => {
      this.tabBarHeight = rect.height;
      this.$emit("sendTabBarHeight", this.tabBarHeight);
    }).exec();
  },
  computed: {
    currentPagePath() {
      const pages = getCurrentPages();
      const currentPage = pages[pages.length - 1];
      return currentPage.route;
    }
  },
  methods: {
    switchTab(index) {
      const url = this.tabList[index].pagePath;
      common_vendor.index.switchTab({
        url: `/${url}`
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($data.tabList, (item, index, i0) => {
      return {
        a: common_vendor.n(item.iconfont),
        b: common_vendor.t(item.text),
        c: common_vendor.n({
          active: item.pagePath === $options.currentPagePath
        }),
        d: index,
        e: common_vendor.o(($event) => $options.switchTab(index), index)
      };
    }),
    b: $data.tabBarPaddingBottom + "px"
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-ffb3232c"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/components/tab-bar/tab-bar.js.map
