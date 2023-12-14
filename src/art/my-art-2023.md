---
title: "my art 2023"
date: 2023-11-21
---

<div class="smallweb-subway-handler">
    <smallweb-subway></smallweb-subway>
</div>

<!-- <span>
    <button class="smallweb-subway" onclick="goToPrev()">&lt;==</button> 
    smallweb subway
    <button class="smallweb-subway" onclick="goToNext()">==&gt;</button>
</span> -->

{% set images = [
    "/_assets/img/my_art_2023/witches.png",
    "/_assets/img/my_art_2023/angel.png",
    "/_assets/img/my_art_2023/duck-wagie.png",
    "/_assets/img/my_art_2023/vine-boom.png",
    "/_assets/img/my_art_2023/nehera-aw22.jpg",
    "/_assets/img/my_art_2023/claireisaur.jpg",
    "/_assets/img/my_art_2023/crud.png",
    "/_assets/img/my_art_2023/bea-santello.png",
    "/_assets/img/my_art_2023/sunset.png",
    "/_assets/img/my_art_2023/demon-mechanic-2.png",
    "/_assets/img/my_art_2023/team-fame.png",
    "/_assets/img/my_art_2023/cat-journalist.png",
    "/_assets/img/my_art_2023/umbrella.png",
    "/_assets/img/my_art_2023/shadow-study.png",
    "/_assets/img/my_art_2023/lean.png",
    "/_assets/img/my_art_2023/demon-mechanic.jpg",
    "/_assets/img/my_art_2023/oxen-free-1.jpg",
    "/_assets/img/my_art_2023/oxen-free-2.jpg",
    "/_assets/img/my_art_2023/oxen-free-3.jpg",
    "/_assets/img/my_art_2023/oxen-free-4.jpg",
    "/_assets/img/my_art_2023/lyn-robins.jpg",
    "/_assets/img/my_art_2023/matt-stephenson.jpg",
    "/_assets/img/my_art_2023/apoco-chef.jpg",
    "/_assets/img/my_art_2023/life-drawing.jpg",
    "/_assets/img/my_art_2023/office-lady.jpg",
    "/_assets/img/my_art_2023/fursona.jpg",
    "/_assets/img/my_art_2023/coral-glasses.jpg",
    "/_assets/img/my_art_2023/dryad.jpg",
    "/_assets/img/my_art_2023/milkmaid.jpg",
    "/_assets/img/my_art_2023/blue-copic.jpg"
] %}

<div class="gallery">
{% for image in images %}
    <a href="#img_{{images.length - loop.index}}"><img class="gallery-image" src="{{image}}"></a>
    <a href="#_{{images.length - loop.index}}" class="lightbox trans" id="img_{{images.length - loop.index}}"><img src="{{image}}"></a>
{% endfor %}
</div>

<!-- TODO: add some kind of fixed aspect ratio so that these are nice and consistent-->
<!-- TODO: add fallback images -->