---
title: lists
layout: layout/base.njk
eleventyImport.collections: ["list"]
---

{% for post in collections.list %}
 \- [{{ post.data.title || post.data.title != "" ? post.data.title : post.data.page.fileSlug }}](/list/{{ post.data.page.fileSlug }})
{% endfor %}