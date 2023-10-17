---
title: infinite nightmare list of artists / pieces / references / things i want to draw
layout: layout/base.njk
pagination: 
  data: infinite_nightmare
  size: 1000
  alias: postslist
---
<div class="infinite-nightmare list-formatting">

### 🔞 warning! some of this stuff will be nsfw or include art that is nsfw 🔞
thats just art baby! people are naked a _lot_ as it turns out

welcome to the infinite nightmare list aka a big dumpster for me to put art related stuff that i want to revisit at some point. each section should have a reason that i want to revisit a link. also, i will probably just take images directly from the source so if shit is broken then that would be why

{% for post in postslist %}
  {% infinitenightmare 
    post.title,
    post.link,
    post.image,
    post.video,
    post.iframelink,
    post.description
  %}
{% endfor %}

</div>