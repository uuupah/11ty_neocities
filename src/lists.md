---
title: lists
layout: layout/base.njk
eleventyImport.collections: ["list"]
---

{% for post in collections.list %}
 \- [{{ post.data.title || post.data.title != "" ? post.data.title : post.data.page.fileSlug }}](/{{ tag }}/{{ post.data.page.fileSlug }})
{% endfor %}