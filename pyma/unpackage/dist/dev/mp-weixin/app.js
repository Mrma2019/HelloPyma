"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const common_vendor = require("./common/vendor.js");
const utils_weather = require("./utils/weather.js");
const utils_format = require("./utils/format.js");
if (!Math) {
  "./pages/index/index.js";
  "./pages/home/home.js";
  "./pages/info/info.js";
  "./pages/weather/weather.js";
}
const _sfc_main = {
  onLaunch: function() {
    common_vendor.index.__f__("log", "at App.vue:12", "App Launch");
    utils_weather.getWeather();
    utils_format.formatDate();
  },
  onShow: function() {
    common_vendor.index.__f__("log", "at App.vue:19", "App Show");
    this.weatherTimer = setInterval(() => {
      utils_weather.getWeather();
    }, 24 * 60 * 60 * 1e3);
    this.formatTimer = setInterval(() => {
      utils_format.formatDate();
    }, 600);
  },
  onHide: function() {
    common_vendor.index.__f__("log", "at App.vue:28", "App Hide");
    clearInterval(this.weatherTimer);
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
