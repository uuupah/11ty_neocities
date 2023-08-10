---
title: blog
layout: layout/base.njk
eleventyImport.collections: ["blog"]
---

<div class="pages-article">
{% for post in collections.blog | reverse %}
 \- {{ post.page.date.toLocaleDateString("en-UK") }} // [{{post.data.title or post.data.page.fileSlug }}](/blog/{{ post.data.page.fileSlug }})
{% endfor %}
</div>