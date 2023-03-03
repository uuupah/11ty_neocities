---
title: music
layout: layout/base.njk
eleventyImport.collections: ["music"]
---

{% for post in collections.music %}
 \- [{{ post.data.title || post.data.title != "" ? post.data.title : post.data.page.fileSlug }}](/{{ tag }}/{{ post.data.page.fileSlug }})