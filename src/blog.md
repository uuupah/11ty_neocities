---
title: blog
layout: layout/base.njk
eleventyImport.collections: ["blog"]
---

<div class="pages-article">
{% for post in collections.blog reversed %}
 \- [{{ post.data.title || post.data.title != "" ? post.data.title : post.data.page.fileSlug }}](/blog/{{ post.data.page.fileSlug }})
{% endfor %}
</div>