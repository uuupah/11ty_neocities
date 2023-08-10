---
title: lists
layout: layout/base.njk
eleventyImport.collections: ["lists"]
---

<div class="pages-article">
{% for post in collections.lists | reverse %}
 \- {{ post.page.date.toLocaleDateString("en-UK") }} // [{{ post.data.title or post.data.page.fileSlug }}](/lists/{{ post.data.page.fileSlug }})
{% endfor %}
</div>