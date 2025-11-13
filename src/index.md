---
layout: layout/base.njk
title: my heart's not .init()
---

![](/_assets/img/index.gif)

my name is uuupah. im a twenty-something non-binary (they/them) holy being composed of concentrated, weapons grade fomo. i'm into exploring music, character design and figure drawing, puzzle and movement videogames, cooking, animation and rock climbing.

## pages

<div class="paragraph-deparagrapher">

  #### [🖌️ my art 🖼️](/art/my-art-2025/)
  #### [⚠️ newest post! ⚠️]({{collections.post[collections.post.length - 1].filePathStem}})
  #### thoughts and feelings
  {% for post in collections['blog'] | reverse | limit(5) %}
      - {{ post.page.date.toLocaleDateString("en-UK") }} // [{{ post.data.title }}]({{post.filePathStem}}/)
  {% endfor %}
  \- [more!](/blog/)
  #### lists of things
  {% for post in collections['lists'] | reverse | limit(5) %}
      - {{ post.page.date.toLocaleDateString("en-UK") }} // [{{ post.data.title }}]({{post.filePathStem}}/)
  {% endfor %}
  \- [older lists:](/lists/)
  #### [🤔 art inspiration list 💭](/infinite_nightmare/)
  #### [🗺️ sitemap 🌏](/sitemap/)
  #### [changelog and other little cute thoughts](/journal_html/)
  #### [miscellania](/misc/)

</div>
