---
title: "my art 2024"
date: 2024-02-09
---

[last year ==>](/art/my-art-2023)

<div class="smallweb-subway-handler">
    <smallweb-subway></smallweb-subway>
</div>

{% set images = [
    "/_assets/img/my_art_2024/bikini-knight.jpg",
    "/_assets/img/my_art_2024/turkey-tail.png",
    "/_assets/img/my_art_2024/skate-wizard.png",
    "/_assets/img/my_art_2024/wcburger-clown.png"
] %}

<div class="gallery">
{% for image in images %}
    <a href="#img_{{images.length - loop.index}}"><img class="gallery-image" src="{{image}}"></a>
    <a href="#_{{images.length - loop.index}}" class="lightbox trans" id="img_{{images.length - loop.index}}"><img src="{{image}}"></a>
{% endfor %}
</div>