---
title: blog
layout: layout/base.njk
eleventyImport.collections: ["blog"]
---

{% for post in collections.blog %}
 \- [{{ post.data.title || post.data.title != "" ? post.data.title : post.data.page.fileSlug }}](/{{ tag }}/{{ post.data.page.fileSlug }})
{% endfor %}