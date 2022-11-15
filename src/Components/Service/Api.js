import axios from "axios";
import TokenService from "../../Components/Service/TokenService";

const instance = axios.create({
  baseURL: process.env.REACT_APP_SERVER_BASEURL,
  headers: {
    "Content-Type": "application/json",    
  },
  
});
instance.interceptors.request.use(
  (config) => {
    const token = TokenService.getLocalAccessToken();
    if (token) {
      config.headers["Authorization"] = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
instance.interceptors.response.use(
 (res) => {
    return res;
  },
  async (err) => {
    const originalConfig = err.config;
    console.log(originalConfig);
    if (originalConfig.url !== "/User/Login" && originalConfig.url !== "/User/Register" && err.response) {
      console.log(err.response);
      // Access Token was expired
      if (err.response.status === 403 && !originalConfig._retry) {
        originalConfig._retry = true;
        try {
          const rs = await instance.get("/refresh", {});
          console.log(rs);
          const accessToken = rs.data.authorisation.token;
          TokenService.setLocalAccessToken(accessToken);
          return instance(originalConfig);
        } catch (_error) {
          return Promise.reject(_error);
        }
      } 
      // else if (err.response.status === 401) {
      //   console.log("401");
      //   TokenService.clearStorage();
      //   window.location = process.env.REACT_APP_BASEURL;
      // }
    }
    return Promise.reject(err);
  }
);
export default instance;
