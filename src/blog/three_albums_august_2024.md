---
title: "august 2024 blog // three albums"
date: 2024-08-22
draft: true
---

### no hands - joey valence & brae

### oncle jazz - men i trust

### melkweg - jameszoo, metropole orkest, jules buckley

the extra stuff this month is going to be extremely unfocused and higgeldy piggeldy because i did a massive cleanup of my 200+ (!) phone tabs and took notes of the interesting ones. they are being archived here for my future reference and your viewing pleasure:

### games
#### mutazione
{% blogImage "/_assets/img/three_albums_august_2024/mutazione.webp" %}
i first tried playing mutazione more than a year ago. these flavour of game where you walk around a town and get to know everyone's weird business and have interesting interpersonal moments are totally my jam (night in the woods is probably my favourite game ever) and this provides that with its own super unique paper cut-out visual style. i think the opening couple of hours maybe don't grab the average player as well as they could, and the whole thing is very much a visual novel without much need for problem solving, but the overall experience is really lovely and intriguing. i will 100% overlook all kinds of sins if you let me explore a visually interesting world and dig into some weird kinda mundane soap opera level stories. mutazione absolutely scratched my night in the woods itch and i'm now on the hunt for _another_ game to fill that gap

#### disco elysium
{% blogImage "/_assets/img/three_albums_august_2024/disco.webp" %}
disco elysium also (nominally) fits in the walk-around-a-town genre of game, but frames it as a detective mystery instead. you play as a cop in a familiar but alternate reality who has drunk themselves into almost total amnesia and must figure out what's going on in _the world_ before they can figure out who committed the crime at hand. disco has an absolutely gorgeous smeary oil painting look to the entire game and each character has their own unique portrait that is full of charm (and a little bit unsettling, sometimes). the core system that sets this game apart is your skills being separated into a sort of greek chorus that, depending on your skill in each one, will check in on the situation at hand depending on your proficiency. this creates a perfect thematic move where you feel like you are going slightly crazy and talking to yourself. the game is also structured in a way where taking the weird or "wrong" move is somewhat encouraged due to your character being a bit of a fuck-up, which gives you more freedom to roleplay than ive seen in a lot of other game experiences - it feels like a little thing, but i think it helps disco to stand out as one of the best of its style in recent years

#### disco elysium gb
{% blogImage "/_assets/img/three_albums_august_2024/discogb.png" %}
[www.csbrannan.itch.io/disco-elysium-game-boy-edition](https://csbrannan.itch.io/disco-elysium-game-boy-edition)  
outwardly this one totally looks like a bit of a goof, but theyve done an honestly impressive job at simplifying disco elysium's systems without losing the original vibe, the visuals are also a hidden gem here; i love kim's tiny little chat portrait and how easily it can be read

### food
#### the best corn tortilla recipe ive found yet
{% blogImage "/_assets/img/three_albums_august_2024/tortilla.webp" %}
[link](https://www.youtube.com/watch?v=U3RKg4jEyAk)  
this is the only corn tortilla i've ever had any real success with. the advice this youtuber gives is super reliant on detecting issues and adjusting yourself which i think is really key with cooking. he unfortunately doesnt allow for video embedding, but trust me, this one is good. even if you don't get the perfect puff, getting close will still yield an extremely good tortilla

#### chicken karahi
<iframe rss-link="https://www.youtube.com/watch?v=fEguvHE0Clg" rss-image="/_assets/img/three_albums_august_2024/karahi.jpeg" rss-linkname="chicken karahi recipe by imran ali" width="560" height="315" src="https://www.youtube-nocookie.com/embed/fEguvHE0Clg?si=ElMzbmszPjqA9kl8" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

this recipe did result in me spending an hour going to three (3) separate indian grocers looking for fenugreek leaves / methi, but the end result was incredible. if you stumble onto a bunch of fresh tomatoes the flavour of this dish is out of this world and also somehow unbelieveably easy and simple. the 35 minute number promised in the title isn't hyperbole

#### pesto calabrese
<iframe rss-lnk="https://www.youtube.com/watch?v=I0DkkLsvF4o" rss-image="/_assets/img/three_albums_august_2024/pasta.webp" rss-linkname="pesto calabrese recipe by not another cooking show" width="560" height="315" src="https://www.youtube-nocookie.com/embed/I0DkkLsvF4o?si=QpBeSBA6HZSQ9k1u" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

[www.notanothercookingshow.tv/post/spicy-red-pepper-pasta](www.notanothercookingshow.tv/post/spicy-red-pepper-pasta)  
finally, this recipe is a little bit of effort, but is totally worthwhile. keep an eye out for cavatappi specifically because it truly heightens the whole experience

### webdev
#### zed editor
{% blogImage "/_assets/img/three_albums_august_2024/zed.png" %}
i'm writing this post in the zed code editor for linux! i grabbed it on a whim a week or so ago and have (mostly) been pleasantly surprised by the experience. it's pretty pared down compared to vscode but it starts way faster and has a bit less impact on my system. i'm into the fact that it's truly open source and seems to have some mostly pretty logical defaults built in. my only complaint is the inclusion of a couple of unnecessary collaboration and ai tools, but the following settings in your settings.json file (which you can open by pressing ctrl-p and typing in "settings") will hide them:

```json
"features": {
  "copilot": false,
  "inline_completion_provider": "none"
},
"collaboration_panel": {
  "button": false
},
"chat_panel": {
  "button": false
},
"assistant": {
  "enabled": false,
  "version": "2",
  "button": false
},
"assistant_v2": {
  "enabled": false
}
```

#### 11ty sitemap generator
[www.belter.io/eleventy-sitemap/](https://www.belter.io/eleventy-sitemap/)  
this is a lil one but i like this tutorial for making an auto generated sitemap.xml file for search engines to grab. i'm not necessarily chasing seo on this site but it's nice for it to be indexed so people can search for my posts if they want to

#### ladybird browser
[ladybird.org/](https://ladybird.org/)  
this is a project that i'm super excited about, that is also not desperately interesting to the average human being. i'm quite passionate about google's monopoly over the browser space and the negative effects it has on the internet at large. even as a hardcore firefox user i'm very aware of googles own investment in mozilla and the deal it has to ship google as the default search engine on its competitor's browser. ladybird is the first true competitor in a long while, running off of new software to provide a browsing experience that is decoupled from a lot of the issues with the modern browser space. the main issue is that it is still _very_ in development, and while you can build it yourself on your own system (and the team should be given props for how insanely easy this actually is), it is missing creature comforts like loading images and css3. in any case, the first alpha release is schedules for "summer 2026" on linux and macos, so watch me completely reactivate in 24 months

### art
#### digital painting
{% blogImage "/_assets/img/three_albums_august_2024/painting.webp" %}
[link](https://www.youtube.com/watch?v=93oPmKWuKrk)  
a lot of big developments in my art journey have centred around finding a topic i want to dig into and sifting through thirty or so dogshit youtube tutorials until i find the diamond in the rough that works for me specifically, and this video was that for monochrome, realistic digital painting. i found the technique simple and the process for the first image easy to follow, but also the whole concept could be easily transferred to different references

#### ayeeops brushes
[ayeoops.gumroad.com](https://ayeoops.gumroad.com/l/waxnn)  
i have gone absolutely fucking crazy on these brushes the last couple of weeks [like with this piece](/art/my-art-2024/#img_24) - the texture on the "crunkly" brush makes it feel really natural to use and allows for a bit of a carefree drawing experience which has kicked my ass into gear with actually knuckling down and finishing things

### blogs
#### dustbunnybedroom
[dustbunnybedroom.neocities.org/blog](https://dustbunnybedroom.neocities.org/blog)  
i stumbled onto this site in the neocities activity page and i adore how genuine and personal it feels. it's inspired me a little and also given me a bit of a boost because i feel like we write in a similar kind of manner. plus, they have all these cute little uplifting affirmations at the end of their posts and i honestly need that shit right now <3

#### japanese food isnt actually japanese food
{% blogImage "/_assets/img/three_albums_august_2024/jp.avif" %}
[link](https://theconversation.com/white-rice-with-side-dishes-isnt-really-traditional-japanese-food-so-where-did-we-get-this-idea-233871)  
a friend of mine wrote this piece on the perceivance of traditional japanese cuisine a month or two back and i think it's super intriguing! give it a read! 

### anime
#### narenare
{% blogImage "/_assets/img/three_albums_august_2024/narenare.webp" %}
i saw a couple of clips from this show and grabbed it immediately because it looks absolutely gorgeous - i particularly love the use of contrasting linework to make the world feel bright and colourful, and while theyve used 3d animation for the more complex dance scenes, it largely looks pretty good! the real problem with this show is that the story is extremely generic and uninteresting, to the point that i had to put it down after just three episodes

#### i parry everything
{% blogImage "/_assets/img/three_albums_august_2024/parry.webp" %}
conversely, i heard a brief explanation of this show and thought "well, it cant hurt to watch an episode or two" and then proceeded to binge the remaining episodes and get completely up to date. i parry everything is so intriguing because it's a native isekai (an exquisitely boring setting), the animation is _just okay_ the music is _just okay_ and the characters are about as generic as it gets, but the conceit of the show being that the main character has willpowered himself into being unbelievably skilled (one punch man style) but is such a sheltered dipshit that he doesn't realise that all of his feats of strength are at otherworldly levels _somehow works_. i don't even like stories that pivot around misunderstanding between characters, and yet. i'm going to sheepishly give this one a recommendation to check it out, with condition that it's currently only up to episode 9 and it could totally go downhill
