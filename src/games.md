---
title: games
layout: layout/base.njk
eleventyImport.collections: ["games"]
---

<div class="pages-article">
{% for post in collections.game | reverse %}
 \- [{{ post.data.title or post.data.page.fileSlug }}](/game/{{ post.data.page.fileSlug }})
{% endfor %}
</div>