const htmlmin = require("html-minifier");
const rimraf = require("rimraf");
const cleancss = require("clean-css");

module.exports = function (eleventyConfig) {
  // delete contents of public to ensure removed files are removed from the final build
  rimraf.windows.sync("public/")

  eleventyConfig.addPassthroughCopy("./src/_assets/css");
  eleventyConfig.addPassthroughCopy("./src/_assets/img");
  eleventyConfig.addPassthroughCopy("./src/_assets/fonts");
  eleventyConfig.addPassthroughCopy("./src/_assets/js");

  // make a list of all tags besides "post" and add them to the collection
  eleventyConfig.addCollection("tagsList", function (collectionApi) {
    const tagsList = new Set();
    collectionApi.getAll().map(item => {
      if (item.data.tags) { // handle pages that don't have tags
        item.data.tags.map(tag => {
          if (tag != "post"){
            tagsList.add(tag)
          }
        })
      }
    });
    return tagsList;
  });

  // minify all html files
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

  // clean and inline all css files
  eleventyConfig.addFilter("cssmin", function(code) {
    return new cleancss({}).minify(code).styles;
  });
  
  // // the below three configs allow for excluding files from builds using draft: true
  // // https://www.11ty.dev/docs/quicktips/draft-posts/ 
  // When `permalink` is false, the file is not written to disk
	eleventyConfig.addGlobalData("eleventyComputed.permalink", function() {
		return (data) => {
			// Always skip during non-watch/serve builds
			if(data.draft && !process.env.BUILD_DRAFTS) {
				return false;
			}

			return data.permalink;
		}
	});

  // When `eleventyExcludeFromCollections` is true, the file is not included in any collections
	eleventyConfig.addGlobalData("eleventyComputed.eleventyExcludeFromCollections", function() {
		return (data) => {
			// Always exclude from non-watch/serve builds
			if(data.draft && !process.env.BUILD_DRAFTS) {
				return true;
			}

			return data.eleventyExcludeFromCollections;
		}
	});

	eleventyConfig.on("eleventy.before", ({runMode}) => {
		// Set the environment variable
		if(runMode === "serve" || runMode === "watch") {
			process.env.BUILD_DRAFTS = true;
		}
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