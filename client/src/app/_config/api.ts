const API_BASE_URL = 'http://localhost:3000';


export const API = {
  url: function (path: string) : string {
    return API_BASE_URL + path;
  } 
};
