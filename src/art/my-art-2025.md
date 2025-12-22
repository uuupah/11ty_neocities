---
title: "my art 2025"
date: 2025-10-13
---

[last year ==>](/art/my-art-2024)

<script src="https://gusbus.space/smallweb-subway.js/doodlecrew.js"></script>
<div class="smallweb-subway-handler">
    <smallweb-subway-doodlecrew></smallweb-subway-doodlecrew>
</div>

{% set images = [
    "/_assets/img/my_art_2025/rikeandfig.png",
    "/_assets/img/my_art_2025/ammiss3.png",
    "/_assets/img/my_art_2025/mikumikubomb.png",
    "/_assets/img/my_art_2025/ammiss2.png",
    "/_assets/img/my_art_2025/ammiss1.png",
    "/_assets/img/my_art_2025/oil.png",
    "/_assets/img/my_art_2025/kettle.png",
    "/_assets/img/my_art_2025/map.png",
    "/_assets/img/my_art_2025/yule.png",
    "/_assets/img/my_art_2025/still.png",
    "/_assets/img/my_art_2025/can.png",
    "/_assets/img/my_art_2025/tap.png",
    "/_assets/img/my_art_2025/bag.png",
    "/_assets/img/my_art_2025/mabon.png",
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
