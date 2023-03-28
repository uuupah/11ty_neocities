---
title: music
layout: layout/base.njk
eleventyImport.collections: ["music"]
---

<div class="pages-article">
{% for post in collections.music | reverse %}
 \- [{{ post.data.title or post.data.page.fileSlug }}](/music/{{ post.data.page.fileSlug }})
{% endfor %}
<div>