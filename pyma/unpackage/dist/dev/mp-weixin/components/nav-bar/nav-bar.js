"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  name: "nav-bar",
  data() {
    return {
      navBarHeight: 0,
      titlePaddingBottom: 0,
      titlePaddingLeft: 15,
      menuInfo: {}
    };
  },
  props: {
    title: {
      type: String,
      default: ""
    },
    align: {
      type: String,
      default: "center"
    },
    isBack: {
      type: Boolean,
      default: false
    },
    color: {
      type: String,
      default: "#000"
    }
  },
  mounted() {
    const sysInfo = common_vendor.index.getWindowInfo();
    const menuInfo = common_vendor.index.getMenuButtonBoundingClientRect();
    this.menuInfo = menuInfo;
    this.navBarHeight = menuInfo.top * 2 + menuInfo.height - sysInfo.statusBarHeight;
    this.titlePaddingBottom = menuInfo.top - sysInfo.statusBarHeight;
    this.$emit("sendNavBarHeight", this.navBarHeight);
  },
  computed: {
    titleStyle() {
      const menuWidth = this.menuInfo.width + 10;
      if (this.align == "left") {
        return {
          textAlign: this.align,
          left: this.titlePaddingLeft + 5 + "px",
          right: menuWidth + "px"
        };
      } else {
        return {
          textAlign: this.align,
          left: menuWidth + "px",
          right: menuWidth + "px"
        };
      }
    }
  },
  methods: {
    goBack() {
      common_vendor.index.navigateBack();
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $props.isBack
  }, $props.isBack ? {
    b: common_vendor.o((...args) => $options.goBack && $options.goBack(...args))
  } : {}, {
    c: common_vendor.t($props.title),
    d: common_vendor.s($options.titleStyle),
    e: common_vendor.s({
      lineHeight: $data.menuInfo.height + "px"
    }),
    f: $data.menuInfo.height + "px",
    g: $data.titlePaddingLeft + "px",
    h: $data.navBarHeight + "px",
    i: $data.navBarHeight - $data.menuInfo.bottom + "px",
    j: $props.color
  });
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-e9345f2e"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/components/nav-bar/nav-bar.js.map
