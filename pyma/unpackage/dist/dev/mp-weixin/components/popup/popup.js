"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  name: "popup",
  data() {
    return {
      translateY: 0
    };
  },
  props: {
    show: {
      type: Boolean,
      default: false
    },
    height: {
      type: String,
      default: 50
    }
  },
  methods: {
    close() {
      this.$emit("update:show", false);
    }
  },
  computed: {
    style() {
      let translateY = 0;
      if (!this.show) {
        translateY = 100;
      }
      return {
        height: `calc(100vh - (100% - ${this.height}%))`,
        transform: `translateY(${translateY}%)`
      };
    }
  }
};
if (!Array) {
  const _component_template = common_vendor.resolveComponent("template");
  _component_template();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $props.show
  }, $props.show ? {
    b: common_vendor.o((...args) => $options.close && $options.close(...args))
  } : {}, {
    c: common_vendor.o((...args) => $options.close && $options.close(...args)),
    d: common_vendor.o(() => {
    }),
    e: common_vendor.s($options.style)
  });
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-4bcd74eb"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/components/popup/popup.js.map
