---
layout: layout/base.njk
title: pages
---
<div class="pages-article">
{% for tag in collections.tagsList %}
  {{tag}}
  {% for post in collections[tag] %}
 \- [{{ post.data.title }}](/{{ tag }}/{{ post.data.page.fileSlug }})
  {% endfor %}
{% endfor %}
</div>