const API_BASE_URL = window.location.origin.replace(/4200/, '3000');


export const API = {
  url: function (path: string) : string {
    return API_BASE_URL + path;
  },

  base: function () {
    return API_BASE_URL;
  }
};
