"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const common_vendor = require("./common/vendor.js");
const store_weather = require("./store/weather.js");
const store_date = require("./store/date.js");
if (!Math) {
  "./pages/home/home.js";
  "./pages/info/info.js";
  "./pages/weather/weather.js";
}
const _sfc_main = {
  globalData: {
    key: "d2885a769f0a4646b8c934f5fdef054f"
  },
  onLaunch: function() {
    common_vendor.index.__f__("log", "at App.vue:15", "App Launch");
    this.getWeatherInfo();
    setInterval(() => {
      this.getWeatherInfo();
    }, 60 * 60 * 1e3);
    setInterval(() => {
      this.formatDate();
    }, 600);
  },
  onShow: function() {
    common_vendor.index.__f__("log", "at App.vue:28", "App Show");
  },
  onHide: function() {
    common_vendor.index.__f__("log", "at App.vue:31", "App Hide");
  },
  methods: {
    getWeatherInfo() {
      common_vendor.index.getLocation({
        type: "gcj02",
        // 返回国测局坐标，可用于 wx.openLocation
        success: (res) => {
          const {
            latitude,
            longitude
          } = res;
          this.getWeather(longitude, latitude);
        },
        fail: (err) => {
          common_vendor.index.__f__("error", "at App.vue:46", "获取位置失败：", err);
        }
      });
    },
    getWeather(lon, lat) {
      const key = this.globalData.key;
      common_vendor.index.request({
        url: `https://nj3jpfq5xf.re.qweatherapi.com/geo/v2/city/lookup`,
        data: {
          key,
          location: `${lon},${lat}`
        },
        success: (res) => {
          const adcode = res.data.location[0].id;
          this.getWeatherByAdcode(key, adcode);
        },
        fail: (err) => {
          common_vendor.index.__f__("log", "at App.vue:65", "未获取到城市信息", err);
        }
      });
    },
    getWeatherByAdcode(key, code) {
      store_weather.weatherStore.loading = true;
      common_vendor.index.request({
        url: `https://nj3jpfq5xf.re.qweatherapi.com/v7/weather/now`,
        data: {
          key: `${key}`,
          location: `${code}`
        },
        success: (res) => {
          common_vendor.index.__f__("log", "at App.vue:79", res.data.now);
          store_weather.weatherStore.data = res.data.now;
        },
        complete: () => {
          store_weather.weatherStore.loading = false;
        }
      });
    },
    formatDate() {
      const date = /* @__PURE__ */ new Date();
      const year = date.getFullYear();
      const month = date.getMonth().toString().padStart(2, "0");
      const day = date.getDate().toString().padStart(2, "0");
      const hours = date.getHours().toString().padStart(2, "0");
      const minutes = date.getMinutes().toString().padStart(2, "0");
      const formatDate = `${year}:${month}:${day}`;
      const formatTime = `${hours}:${minutes}`;
      store_date.dateStore.date = formatDate;
      store_date.dateStore.time = formatTime;
    }
  }
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
