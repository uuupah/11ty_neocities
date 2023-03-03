---
title: music
layout: layout/base.njk
eleventyImport.collections: ["music"]
---

<div class="pages-article">
{% for post in collections.music reversed %}
 \- [{{ post.data.title || post.data.title != "" ? post.data.title : post.data.page.fileSlug }}](/music/{{ post.data.page.fileSlug }})
{% endfor %}
<div>