---
layout: layout/base.njk
title: pages
---

{% if collections.blog.length > 0 %}
blog posts
{% endif %}
{% for post in collections.blog | reverse %}
 \- [{{ post.data.title }}](/blog/{{ post.data.page.fileSlug }})
{% endfor %}
{% if collections.music.length > 0 %}
music
{% endif %}
{% for post in collections.music | reverse %}
 \- [{{ post.data.title }}]({{ post.data.page.fileSlug }})
{% endfor %}