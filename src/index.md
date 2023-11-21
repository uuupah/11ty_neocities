---
layout: layout/base.njk
title: my heart's not .init()
---

![](https://64.media.tumblr.com/5d37ab2aa782462c7aa092f7bd0d27cb/c44d7d4b9325e7d1-16/s1280x1920/1690fe1e95401b094ffa62ae933ff2c038e62814.gifv)

hey what's up! my name is uuupah. im a twenty-something non-binary (they/them) person from australia plagued by a metaphysical urge to record my thoughts and feelings in meandering prose. i'm into exploring less mainstream music genres, character design and figure drawing, puzzle and movement videogames, old anime and rock climbing.

## pages

<div class="paragraph-deparagrapher">

  #### [🧑‍🎨 my art 👩‍🎨](/art/my-art-2023/)
  #### [journal.html](/journal_html/)
  #### [⚠️ newest post! ⚠️]({{collections.post[collections.post.length - 1].filePathStem}})
  #### thoughts and feelings
  {% for post in collections['blog'] | reverse | limit(5) %}
      - {{ post.page.date.toLocaleDateString("en-UK") }} // [{{ post.data.title }}]({{post.filePathStem}})
  {% endfor %}
  \- [...and da restt ...](/blog/)
  #### lists of things
  {% for post in collections['lists'] | reverse | limit(5) %}
      - {{ post.page.date.toLocaleDateString("en-UK") }} // [{{ post.data.title }}]({{post.filePathStem}})
  {% endfor %}
  \- [older lists](/lists/)
  #### [art inspiration list](/infinite_nightmare/)
  #### [sitemap](/sitemap/)
  #### [miscellania](/misc/)

</div>