const htmlmin = require("html-minifier");
const rimraf = require("rimraf");
const cleancss = require("clean-css");

module.exports = function (eleventyConfig) {
  rimraf.windows.sync("public/")

  eleventyConfig.addPassthroughCopy("./src/_assets/css");
  eleventyConfig.addPassthroughCopy("./src/_assets/img");
  eleventyConfig.addPassthroughCopy("./src/_assets/fonts");
  eleventyConfig.addPassthroughCopy("./src/_assets/js");

  eleventyConfig.addCollection("tagsList", function (collectionApi) {
    const tagsList = new Set();
    collectionApi.getAll().map(item => {
      if (item.data.tags) { // handle pages that don't have tags
        item.data.tags.map(tag => tagsList.add(tag))
      }
    });
    return tagsList;
  });

  eleventyConfig.addTransform("htmlmin", function (content) {
    if (this.page.outputPath && this.page.outputPath.endsWith(".html")) {
      let minified = htmlmin.minify(content, {
        useShortDoctype: true,
        removeComments: true,
        collapseWhitespace: true
      });
      return minified;
    }
    return content;
  });

  eleventyConfig.addFilter("cssmin", function(code) {
    return new cleancss({}).minify(code).styles;
  });

  return {
    passthroughFileCopy: true,
    dir: {
      input: "src",
      output: "public",
      includes: "_includes",
    },
  };
};