---
title: games
layout: layout/base.njk
eleventyImport.collections: ["games"]
---

{% for post in collections.game %}
 \- [{{ post.data.title || post.data.title != "" ? post.data.title : post.data.page.fileSlug }}](/{{ tag }}/{{ post.data.page.fileSlug }})
{% endfor %}