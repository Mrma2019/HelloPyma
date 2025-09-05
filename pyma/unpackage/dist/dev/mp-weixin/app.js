"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const common_vendor = require("./common/vendor.js");
const utils_weather = require("./utils/weather.js");
const utils_format = require("./utils/format.js");
const utils_system = require("./utils/system.js");
if (!Math) {
  "./pages/home/home.js";
  "./pages/info/info.js";
  "./pages/weather/weather.js";
  "./pages/square/square.js";
}
const _sfc_main = {
  onLaunch: function() {
    common_vendor.index.__f__("log", "at App.vue:15", "App Launch");
    utils_weather.getWeather();
    utils_system.getSystemInfo();
    utils_format.formatDate();
    this.formatTimer = setInterval(() => {
      utils_format.formatDate();
    }, 600);
  },
  onShow: function() {
    common_vendor.index.__f__("log", "at App.vue:25", "App Show");
  },
  onHide: function() {
    common_vendor.index.__f__("log", "at App.vue:28", "App Hide");
    clearInterval(this.formatTimer);
  },
  methods: {}
};
function createApp() {
  const app = common_vendor.createSSRApp(_sfc_main);
  return {
    app
  };
}
createApp().app.mount("#app");
exports.createApp = createApp;
//# sourceMappingURL=../.sourcemap/mp-weixin/app.js.map
