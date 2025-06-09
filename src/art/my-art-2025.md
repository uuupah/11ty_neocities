---
title: "my art 2025"
date: 2025-06-09
---

[last year ==>](/art/my-art-2024)

<script src="https://gusbus.space/smallweb-subway.js/doodlecrew.js"></script>
<div class="smallweb-subway-handler">
    <smallweb-subway-doodlecrew></smallweb-subway-doodlecrew>
</div>

{% set images = [
    "/_assets/img/my_art_2025/paint.png",
    "/_assets/img/my_art_2025/recline.webp",
    "/_assets/img/my_art_2025/arms.png",
    "/_assets/img/my_art_2025/goat.png",
    "/_assets/img/my_art_2025/uuupah.png"
] %}

<div class="gallery">
{% for image in images %}
    <a href="#img_{{images.length - loop.index}}"><img class="gallery-image" src="{{image}}"></a>
    <a href="#_{{images.length - loop.index}}" class="lightbox trans" id="img_{{images.length - loop.index}}"><img src="{{image}}"></a>
{% endfor %}
</div>
