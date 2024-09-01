---
title: "my art 2024"
date: 2024-07-27
---

[last year ==>](/art/my-art-2023)

<div class="smallweb-subway-handler">
    <smallweb-subway-doodlecrew></smallweb-subway-doodlecrew>
</div>

{% set images = [
    "/_assets/img/my_art_2024/thumper.png",
    "/_assets/img/my_art_2024/trio.png",
    "/_assets/img/my_art_2024/marble-apollo.png",
    "/_assets/img/my_art_2024/uuupproved.png",
    "/_assets/img/my_art_2024/marble2.png",
    "/_assets/img/my_art_2024/rifle.png",
    "/_assets/img/my_art_2024/marble-david.png",
    "/_assets/img/my_art_2024/landscape4.png",
    "/_assets/img/my_art_2024/flamberge.png",
    "/_assets/img/my_art_2024/pike.png",
    "/_assets/img/my_art_2024/landscape3.png",
    "/_assets/img/my_art_2024/vope.png",
    "/_assets/img/my_art_2024/less-comfortable.png",
    "/_assets/img/my_art_2024/firefly.png",
    "/_assets/img/my_art_2024/landscape2.png",
    "/_assets/img/my_art_2024/landscape1.png",
    "/_assets/img/my_art_2024/value3.png",
    "/_assets/img/my_art_2024/protaxite.png",
    "/_assets/img/my_art_2024/pumpkin-melon.png",
    "/_assets/img/my_art_2024/puffball.png",
    "/_assets/img/my_art_2024/silver-leaf-fungus.png",
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

<script src="https://gusbus.space/smallweb-subway.js/doodlecrew.js"></script>
