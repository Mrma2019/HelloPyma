"use strict";
const common_vendor = require("../common/vendor.js");
const _store = common_vendor.reactive({
  data: {}
});
const formatStore = {
  get store() {
    return common_vendor.readonly(_store);
  },
  setData(val) {
    _store.data = val;
  }
};
exports.formatStore = formatStore;
//# sourceMappingURL=../../.sourcemap/mp-weixin/store/formatStore.js.map
