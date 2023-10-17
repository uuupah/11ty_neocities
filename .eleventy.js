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

  eleventyConfig.addShortcode("albumtile", function (title, embedLink, coverImage) {
    var slug = slugify(title);
    
    return `<div>
    <a class="hide" href="${embedLink}" target="${slug}">
    <img class="album-tile-cover-image" src="${coverImage}">
      </a>
      <iframe class="album-tile-iframe" name="${slug}" src="about:blank" seamless></iframe>
      <b>${title}</b>
    </div>`
  });

  eleventyConfig.addShortcode("listentry", function (title, link, image, video, iframelink, description) {
    if (!title || title == "") {
      return '';
    };

    var imageString = "";
    var linkString = "";
    var videoString = "";
    var iframeString = "";
    
    var slug = slugify(title);

    if (Array.isArray(link)) {
      if (typeof link[0] === 'string') {
        linkString = link.map((l) => `<a href="${l}">link</a><br>`).join(" // ") + '<br>';
      } else {
        linkString = link.map((l) => `<a href="${l.link}">${l.title}</a>`).join(" // ") + '<br>';
      }
    } else if (typeof link === 'string') {
      linkString = `<a href="${link}">link</a><br>`;
    }

    if (Array.isArray(image)) {
      imageString = image.map((i, index) => `<a href="#img_${slug}_${index}"><img src="${i}"/></a>
      <a href="#_${slug}_${index}" class="lightbox trans" id="img_${slug}_${index}"><img src="${i}"/></a><br>`).join(" ");
    } else if (typeof image === 'string') {
      imageString = `<a href="#img_${slug}"><img src="${image}"/></a>
      <a href="#_${slug}" class="lightbox trans" id="img_${slug}"><img src="${image}"/></a><br>`
    }
    
    if (video) {
      videoString = `<video autoplay loop muted controls poster="${video.poster}">  
          <source src="${video.link}" type="video/mp4"></source>  
          <img src="${video.poster}"></img>  
          </video><br>`
    }

    if (iframelink) {
      console.log(iframelink)
      iframeString = `
      <iframe src="${iframelink}" style="width: 560px; aspect-ratio: 16/9; max-width: 100%;" seamless allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe><br>`;
    }
    
    return `<p>
      <h3 id="${slug}">${title}</h3>
      ${linkString}
      ${imageString}
      ${videoString}
      ${iframeString}
      ${description}
    </p>`
  });
  
  // make a list of all tags besides "post" and add them to the collection
  eleventyConfig.addCollection("tagsList", function (collectionApi) {
    const tagsList = new Set();
    collectionApi.getAll().map(item => {
      if (item.data.tags) { // handle pages that don't have tags
        item.data.tags.map(tag => {
          if (tag != "post") {
            tagsList.add(tag)
          }
        })
      }
    });
    const sortedTagsList = new Set(Array.from(tagsList).sort());
    return sortedTagsList;
  });
  
  // limit filter
  eleventyConfig.addFilter("limit", function (array, limit) {
    return array.slice(0, limit);
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
  eleventyConfig.addFilter("cssmin", function (code) {
    return new cleancss({}).minify(code).styles;
  });

  // // the below three configs allow for excluding files from builds using draft: true
  // // https://www.11ty.dev/docs/quicktips/draft-posts/ 
  // When `permalink` is false, the file is not written to disk
  eleventyConfig.addGlobalData("eleventyComputed.permalink", function () {
    return (data) => {
      // Always skip during non-watch/serve builds
      if (data.draft && !process.env.BUILD_DRAFTS) {
        return false;
      }

      return data.permalink;
    }
  });
  
  // When `eleventyExcludeFromCollections` is true, the file is not included in any collections
  eleventyConfig.addGlobalData("eleventyComputed.eleventyExcludeFromCollections", function () {
    return (data) => {
      // Always exclude from non-watch/serve builds
      if (data.draft && !process.env.BUILD_DRAFTS) {
        return true;
      }

      return data.eleventyExcludeFromCollections;
    }
  });
  
  eleventyConfig.on("eleventy.before", ({ runMode }) => {
    // Set the environment variable
    if (runMode === "serve" || runMode === "watch") {
      process.env.BUILD_DRAFTS = true;
    }
  });

  return {
    passthroughFileCopy: true,
    markdownTemplateEngine: "njk",
    dir: {
      input: "src",
      output: "public",
      includes: "_includes",
    },
  };
};
  
var slugify = function (preSlug) {
  return preSlug
  .toLowerCase()
  .trim()
  // remove accents
  .normalize('NFD')
  .replace(/[\u0300-\u036f]/g, '')
  // replace invalid characters with spaces
  .replace(/[^a-z0-9\s-]/g, ' ')
  .trim()
  // replace multiple spaces or hyphens with a hyphen
  .replace(/[\s-]+/g, '-');
}