---
title: This Is My Blog
layout: layout/base.njk
---

These are all of my amazing blog posts, enjoy!
  {% for post in collections.blog | reverse %}
   - [{{ post.data.title }}]({{ post.data.page.fileSlug }})
  {% endfor %}

<!-- post.data contents are at https://github.com/11ty/eleventy/discussions/2284 -->