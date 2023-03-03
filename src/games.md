---
title: games
layout: layout/base.njk
eleventyImport.collections: ["games"]
---

<div class="pages-article">
{% for post in collections.game reversed %}
 \- [{{ post.data.title || post.data.title != "" ? post.data.title : post.data.page.fileSlug }}](/game/{{ post.data.page.fileSlug }})
{% endfor %}
</div>