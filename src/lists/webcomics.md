---
title: webcomics
date: 2024-05-02
---

<div class="list-formatting half-width">

<!-- /src/_data/webcomics.json/ -->
{% for post in webcomics %}
  {% listentry 
    post.title,
    post.link,
    post.image,
    post.video,
    post.iframelink,
    post.description
  %}
{% endfor %}

</div><br>