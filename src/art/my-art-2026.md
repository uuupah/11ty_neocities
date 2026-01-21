---
title: "my art 2026"
date: 2026-01-21
---

[last year ==>](/art/my-art-2025)

<script src="https://gusbus.space/smallweb-subway.js/doodlecrew.js"></script>
<div class="smallweb-subway-handler">
    <smallweb-subway-doodlecrew></smallweb-subway-doodlecrew>
</div>

{% set images = [
    "/_assets/img/my_art_2026/theprecariousworld.png",
    "/_assets/img/my_art_2026/yeah.webp"
] %}

<div class="gallery">
{% for image in images %}
    <a href="#img_{{images.length - loop.index}}"><img class="gallery-image" src="{{image}}"></a>
    <a href="#_{{images.length - loop.index}}" class="lightbox trans" id="img_{{images.length - loop.index}}"><img src="{{image}}"></a>
{% endfor %}
</div>
