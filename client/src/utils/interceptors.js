import axios from "axios";

import { Toast } from "antd-mobile";

// intercept request
axios.interceptors.request.use(config => {
  Toast.loading("loading", 3, () => {
    console.log("Load complete !!!");
  });
  return config;
});

// intercept response
axios.interceptors.response.use(config => {
  Toast.hide();
  return config;
});
