"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  name: "tap-bar",
  data() {
    return {
      currentIndex: 0,
      swiperHeight: 0
    };
  },
  props: {
    taps: {
      type: Array,
      default: () => []
    }
  },
  mounted() {
    this.setSwiperHeight(this.currentIndex);
  },
  methods: {
    onClick(index) {
      this.currentIndex = index;
      this.$nextTick(() => {
        this.setSwiperHeight(index);
      });
    },
    onChange(e) {
      const index = e.detail.current;
      this.currentIndex = index;
      this.$nextTick(() => {
        this.setSwiperHeight(index);
      });
    },
    setSwiperHeight(index) {
      common_vendor.index.createSelectorQuery().in(this).selectAll(".tab-content").boundingClientRect((rects) => {
        if (rects[index]) {
          this.swiperHeight = rects[index].height;
        }
      }).exec();
    },
    navigatorTo() {
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($props.taps, (item, index, i0) => {
      return {
        a: common_vendor.t(item.name),
        b: common_vendor.n($data.currentIndex === index ? "active" : ""),
        c: index,
        d: common_vendor.o(($event) => $options.onClick(index), index)
      };
    }),
    b: common_vendor.f($props.taps, (tab, tabIndex, i0) => {
      return {
        a: common_vendor.f(tab.list, (item, index, i1) => {
          return {
            a: common_vendor.n(item.icon),
            b: common_vendor.t(item.text),
            c: common_vendor.t(item.desc),
            d: index,
            e: common_vendor.o((...args) => $options.navigatorTo && $options.navigatorTo(...args), index)
          };
        }),
        b: tabIndex
      };
    }),
    c: $data.currentIndex,
    d: common_vendor.o((...args) => $options.onChange && $options.onChange(...args)),
    e: $data.swiperHeight + "px"
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-6c5c0562"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/components/tap-bar/tap-bar.js.map
