---
layout: layout/base.njk
title: sitemap
---
<div class="pages-article">

[home](/)  
[sitemap](/sitemap/) \<-- you are here!  
[links](/links/)  
[credits](/credits/)  
[journal.html](/journal_html/)  
[infinite nightmare list of things i want to draw](/infinite_nightmare/)  
{% for tag in collections.tagsList %}
  [{{tag}}]({{"/" + tag + "/"}})
  {% for post in collections[tag] | reverse %}
 \- [{{ post.data.title or post.data.page.fileSlug }}](/{{ tag }}/{{ post.data.page.fileSlug }}/)
  {% endfor %}
{% endfor %}
</div>
