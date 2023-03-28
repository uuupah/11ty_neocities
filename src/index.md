---
layout: layout/base.njk
title: becoming one with the slime
---

hey what's up! my name is uuupah. im a twenty-something non-binary (they/them please!) software dev from australia plagued by a metaphysical urge to record my thoughts and feelings in meandering prose. i'm into exploring less mainstream music genres, character design and figure drawing, puzzle and movement videogames, old anime and rock climbing.

### recent updates 

<div class="updates-field">
{% for post in collections.post | reverse | limit(5) %}
    <p>{{ post.page.date.toLocaleDateString("en-UK") }} - [{{ post.data.title }}]({{post.filePathStem}}) [{{post.data.tags[0]}}]</p>
{% endfor %}
</div>

### pages

{% include 'partials/link_tiles.njk' %}

### this site

is built using [eleventy](https://11ty.dev) and hosted on [neocities](https://neocities.org/). i used [flamedfury's tutorial](https://flamedfury.com/guides/11ty-homepage-neocities/) to get started, and implemented [bcomnes deployment github action](https://github.com/bcomnes/deploy-to-neocities) to bring the amount of work required to make changes to almost zero. i also use [obsidian](https://obsidian.md/) and obsidian git to create and edit posts on my phone. the source code for this site is [here](https://github.com/uuupah/11ty_neocities).