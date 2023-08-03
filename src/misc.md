---
title: misc
layout: layout/base.njk
eleventyImport.collections: ["misc"]
---

<div class="pages-article">
{% for post in collections.misc | reverse %}
 \- {{ post.page.date.toLocaleDateString("en-UK") }} // [{{post.data.title or post.data.page.fileSlug }}](/misc/{{ post.data.page.fileSlug }})
{% endfor %}
</div>