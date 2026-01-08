// used for minifying code for space saving
const htmlmin = require("html-minifier");
const cleancss = require("clean-css");
// used for cleaning /public directory - not needed for github ci
const rimraf = require("rimraf");
// used for rss
const pluginRss = require("@11ty/eleventy-plugin-rss");
// used for rss - reading over html and replacing iframes
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const HOSTLOCATION = "https://uuupah.neocities.org";

module.exports = async function (eleventyConfig) {
  // delete contents of public to ensure removed files are removed from the final build
  rimraf.windows.sync("public/");

  eleventyConfig.addPlugin(pluginRss);

  const { IdAttributePlugin } = await import("@11ty/eleventy");
  eleventyConfig.addPlugin(IdAttributePlugin);

  eleventyConfig.addPassthroughCopy("./src/_assets/css");
  eleventyConfig.addPassthroughCopy("./src/_assets/img");
  eleventyConfig.addPassthroughCopy("./src/_assets/font");
  eleventyConfig.addPassthroughCopy("./src/_assets/js");
  eleventyConfig.addPassthroughCopy("./src/robots.txt");

  eleventyConfig.addShortcode(
    "albumtile",
    function (title, embedLink, coverImage) {
      var slug = slugify(title);

      return `<div>
    <a class="hide" href="${embedLink}" target="${slug}">
    <img class="album-tile-cover-image" src="${coverImage}">
      </a>
      <iframe class="album-tile-iframe" name="${slug}" src="about:blank" seamless></iframe>
      <b>${title}</b>
    </div>`;
    },
  );

  eleventyConfig.addShortcode(
    "listentry",
    function (title, link, image, video, iframelink, description) {
      if (!title || title == "") {
        return "";
      }

      var imageString = "";
      var linkString = "";
      var videoString = "";
      var iframeString = "";

      var slug = slugify(title);

      if (Array.isArray(link)) {
        if (typeof link[0] === "string") {
          linkString =
            link.map((l) => `<a href="${l}">link</a><br>`).join(" // ") +
            "<br>";
        } else {
          linkString =
            link.map((l) => `<a href="${l.link}">${l.title}</a>`).join(" // ") +
            "<br>";
        }
      } else if (typeof link === "string") {
        linkString = `<a href="${link}">link</a><br>`;
      }

      if (Array.isArray(image)) {
        imageString = image
          .map(
            (i, index) => `<a href="#img_${slug}_${index}"><img src="${i}"/></a>
      <a href="#_${slug}_${index}" class="lightbox trans" id="img_${slug}_${index}"><img src="${i}"/></a><br>`,
          )
          .join(" ");
      } else if (typeof image === "string") {
        imageString = `<a href="#img_${slug}"><img src="${image}"/></a>
      <a href="#_${slug}" class="lightbox trans" id="img_${slug}"><img src="${image}"/></a><br>`;
      }

      if (video) {
        videoString = `<video autoplay loop muted controls poster="${video.poster}">
          <source src="${video.link}" type="video/mp4"></source>
          <img src="${video.poster}"></img>
          </video><br>`;
      }

      if (iframelink) {
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
    </p>`;
    },
  );

  eleventyConfig.addShortcode(
    "blogImage",
    (link, maxWidth, lightbox = true) => {
      if (!maxWidth) {
        maxWidth = 500;
      }

      if (maxWidth > 720) {
        maxWidth = 720;
      }

      if (link && typeof link === "string") {
        // this is not guaranteed to give uniqueness but i should be giving all the images in a blogpost a different name
        // anyway
        var slug = slugify(link.split("/").at(-1));

        if (lightbox) {
          return `<a href="#img_${slug}"><img style="width: ${maxWidth}px;" src="${link}"/></a>
        <a href="#_${slug}" aria-hidden="true" class="lightbox trans" id="img_${slug}"><img src="${link}"/></a><br>`;
        } else {
          return `<img style="width: ${maxWidth}px;" src="${link}"/>`;
        }
      } else {
        return "";
      }
    },
  );

  // make a list of all tags besides "post" and add them to the collection
  eleventyConfig.addCollection("tagsList", function (collectionApi) {
    const tagsList = new Set();
    collectionApi.getAll().map((item) => {
      if (item.data.tags) {
        // handle pages that don't have tags
        item.data.tags.map((tag) => {
          if (tag != "post") {
            tagsList.add(tag);
          }
        });
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
        collapseWhitespace: true,
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
    };
  });

  // When `eleventyExcludeFromCollections` is true, the file is not included in any collections
  eleventyConfig.addGlobalData(
    "eleventyComputed.eleventyExcludeFromCollections",
    function () {
      return (data) => {
        // Always exclude from non-watch/serve builds
        if (data.draft && !process.env.BUILD_DRAFTS) {
          return true;
        }

        return data.eleventyExcludeFromCollections;
      };
    },
  );

  eleventyConfig.addFilter("rssCleanup", function (content) {
    const dom = new JSDOM(content);
    const doc = dom.window.document;

    // Process and replace all <iframe> elements
    const iframes = Array.from(doc.querySelectorAll("iframe"));

    for (const iframe of iframes) {
      const rssLink =
        iframe.getAttribute("rss-link") ?? iframe.getAttribute("src");
      const rssImage = iframe.getAttribute("rss-image");
      const rssLinkName =
        iframe.getAttribute("rss-linkname") ||
        "(there was an iframe here but rss hid it)";

      const newAnchor = doc.createElement("a");
      newAnchor.setAttribute("href", rssLink);

      if (rssImage) {
        const rssImg = doc.createElement("img");
        rssImg.setAttribute("src", HOSTLOCATION + rssImage);
        newAnchor.appendChild(rssImg);
      }

      newAnchor.appendChild(doc.createTextNode(rssLinkName));
      newAnchor.appendChild(doc.createElement("br"));

      iframe.parentNode.replaceChild(newAnchor, iframe);
    }

    // Remove all elements with class "lightbox"
    doc.querySelectorAll(".lightbox").forEach((el) => el.remove());

    // Serialize and return the modified HTML
    return dom.serialize();
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
  return (
    preSlug
      .toLowerCase()
      .trim()
      // remove accents
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      // replace invalid characters with spaces
      .replace(/[^a-z0-9\s-]/g, " ")
      .trim()
      // replace multiple spaces or hyphens with a hyphen
      .replace(/[\s-]+/g, "-")
  );
};
