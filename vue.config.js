module.exports = {
  //publicPath:
  //process.env.NODE_ENV === "production" ? "https://rolling-scopes-school.github.io/komarofff-JSFE2022Q3/online-store/" : "/",
  //process.env.NODE_ENV === "production" ? "./" : "./",
  //for .netlify.app
  pwa: {
    workboxOptions: {
      exclude: [/_redirects/],
    },
  },
};
