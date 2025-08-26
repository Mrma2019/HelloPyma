"use strict";
const common_vendor = require("../common/vendor.js");
const weatherStore = common_vendor.reactive({
  icon: null,
  data: null,
  loading: true,
  location: null
});
exports.weatherStore = weatherStore;
//# sourceMappingURL=../../.sourcemap/mp-weixin/store/weatherStore.js.map
