---
title: games
layout: layout/base.njk
eleventyImport.collections: ["games"]
---

<div class="pages-article">
{% for post in collections.games | reverse %}
 \- [{{ post.data.title or post.data.page.fileSlug }}](/games/{{ post.data.page.fileSlug }})
{% endfor %}
</div>