"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  name: "nav-bar",
  data() {
    return {
      navBarHeight: 0,
      titleBottom: 0,
      menuWidth: 0
    };
  },
  props: {
    title: String,
    algin: String,
    color: String
  },
  created() {
    const sysInfo = common_vendor.index.getWindowInfo();
    const menuInfo = common_vendor.index.getMenuButtonBoundingClientRect();
    this.navBarHeight = menuInfo.top * 2 + menuInfo.height - sysInfo.statusBarHeight;
    this.titleBottom = menuInfo.top - sysInfo.statusBarHeight;
    this.menuWidth = menuInfo.width + 20;
    this.$emit("sendNavBarHeight", this.navBarHeight);
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.t($props.title),
    b: $data.titleBottom + "px",
    c: "calc(100% - " + $data.menuWidth + "px)",
    d: $data.navBarHeight + "px",
    e: $props.algin,
    f: $props.color
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-e9345f2e"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/components/nav-bar/nav-bar.js.map
