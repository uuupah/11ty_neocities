---
title: art
layout: layout/base.njk
eleventyImport.collections: ["art"]
---

<div class="pages-article">
{% for post in collections.art | reverse %}
 \- [{{ post.data.title or post.data.page.fileSlug }}](/art/{{ post.data.page.fileSlug }})
{% endfor %}
</div>