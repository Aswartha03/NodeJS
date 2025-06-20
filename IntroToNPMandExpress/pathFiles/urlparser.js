let url = require("url");

let urlDataProvide = (urlInput) => {
  let myUrl = new URL(urlInput);
  return {
    hostName: myUrl.hostname,
    pathName: myUrl.pathname,
    query: Object.fromEntries(myUrl.searchParams),
  };
};

module.exports = urlDataProvide;

