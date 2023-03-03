---
title: lists
layout: layout/base.njk
eleventyImport.collections: ["list"]
---

<div class="pages-article">
{% for post in collections.list reversed %}
 \- [{{ post.data.title || post.data.title != "" ? post.data.title : post.data.page.fileSlug }}](/list/{{ post.data.page.fileSlug }})
{% endfor %}
</div>