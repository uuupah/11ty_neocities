module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("./src/_assets/css");
  eleventyConfig.addPassthroughCopy("./src/_assets/img");
  eleventyConfig.addPassthroughCopy("./src/_assets/fonts");
  eleventyConfig.addPassthroughCopy("./src/_assets/js");

  eleventyConfig.addCollection("tagsList", function(collectionApi) {
    const tagsList = new Set();
    collectionApi.getAll().map( item => {
        if (item.data.tags) { // handle pages that don't have tags
            item.data.tags.map( tag => tagsList.add(tag))
        }
    });
    return tagsList;
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