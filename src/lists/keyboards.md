---
draft: true
title: keyboards
date: 2023-12-07
---

i got a little mechanical keyboard crazy when i built my first pc, and i got pretty deep into the ""community"" for the better part of a decade. i think they've become a little too much of an opportunity to flex peoples wealth these days, but i still really appreciate the small groups of makers out there creating cool new designs. i am still somewhat interested in the progression of the technology these days, but i only really get on projects that are super affordable and require a bit of work to complete, hence my collection of incredibly sketchy looking boards

🚧 also there are a LOT of keyboards here so the descriptions are probably going to be a bit minimal until i can gather enough motivation to do them properly 🚧  

{% for post in keyboards %}
  {% listentry 
    post.title,
    post.link,
    post.image,
    post.video,
    post.iframelink,
    post.description
  %}
{% endfor %}