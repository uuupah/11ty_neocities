---
layout: layout/base.njk
title: pages
---
<div class="pages-article">
{% for tag in collections.tagsList %}
  {{tag}}
  {% for post in collections[tag] %}
 \- [{{ post.data.title || post.data.title != "" ? post.data.title : post.data.page.fileSlug }}](/{{ tag }}/{{ post.data.page.fileSlug }})
  {% endfor %}
{% endfor %}
</div>