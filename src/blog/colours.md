---
draft: true
title: "on linux colour schemes"
---

✒️editors note: i use the global spelling of colour throughout this, but unfortunately will have to use the usamericanisation (🤢color🤮) whenever something is referencing code. im also using "color" in filenames for the same reason. consistency is shamefully more important to me than my petty standards

i'm spinning this out of my current blogpost becase 1. it's far too specific and i don't want the people who want silly media updates to have to skip it and 2. it's far too specific and i don't want the people who want silly linux thoughts to miss it

### the problem
as you start making your own hyperspecific linux setup, it doesnt take you long to notice that the colours of everything don't quite match. and you have full control of everything in your system! why shouldn't the colours match? this is, of course, insane people talk, and affects only a subset of linux people, who are themselves a hilarious minority of computer people. all this aside, this minority are also the people most likely to waste their hard earned time on this planet composing extremely complicated solutions to this specific non-problem and as such there are a couple of ways you can go about it:

### the solutions (?)
if you are using a normal desktop environment like kde plasma or gnome you can just install a theme. these are pretty common and will get you something flash looking and clean with very little trouble. you might have to update your terminal colour scheme too, but that's just one extra step, and that might even be included in the process now? i haven't been paying attention

if you're dhh and creating [omarchy](https://omarchy.org/), you might build a whole system for composing and parsing themes that updates the full set of tools that come installed with your distribution. sounds like a lot of work!

if you're someone like bread on penguins, you'll probably just go for [pywall16](https://github.com/eylles/pywal16), a very nifty tool that generates a colour scheme from your wallpaper. you can then use some extra tools and a little bit of scripting to update all of your programs in one swing. you're no longer limited by the imaginations of people who have studied ui design. the world is your oyster

### my problems with the solutions
first and foremost, and to diminish my own gotcha, gtk and plasma are not bad, espcially if your system leverages them for core theming. while i've become a bit deranged about all this stuff that doesnt mean that you have to, and honestly these systems are so much better than windows that you really do have to give them a hand. however, it doesn't fix my particular issue

the omarchy move is also good if you use omarchy, but i don't. you won't catch me running a linux distribution that comes with grok preinstalled. this is probably the last i'll talk about omarchy in this post (and maybe ever on this blog) and while i wouldnt use the distribution myself, i'd love to thank dhh for providing a really good codebase with some nice scripts and solutions to weird problems that i can pilfer. but also, you can jam your generative ai trash down your throat!

pywal seems good then, right? it allows scripting and has good support! unfortunately, pywal kind of trips up and falls flat on its fucking face from turn one because the colour schemes it creates are _fucking ugly_. trust me, i've tried my hardest. tweaking the `--saturate` setting, tossing up between different `--backends`, trying loads of different background images. no dice. the background field ends up too saturated, the foreground too white. there isnt much in the way of handling these two colours in particular, and given that theyre the most important, it feels like a major failing of the app.

on top of this, the colours tend to be all over the place. when i was first introduced i was hoping that the system would find a kind of average colour of the wallpaper and leverage this to determine the saturation and luminosity, then applying a hue depending on the colour we're looking for (red, green, yellow, blue, purple etc). instead, you end up with a disorganised hodgepodge, regardless of the backend you use. again, this works fine in some situations, it's kind of the luck of the draw, but i would prefer to have more control

(i should also say, i'm not the kind of person to change my theme regularly, but i would like the option - weighing up the value of a different theme is much more difficult when you need to knuckle down for half an hour or so to apply it to your software. the value of having clean, automated control of all this stuff is simply that i wont need to do much fiddling once it's done! theoretically anyway)

### my solution to my problem with the solutions to the problem
that's right, i just built a massive stupid fucking script to do all this for me. this is not that far removed from the normal pywal behaviour, where you would run a script afterwards to fill in all the apps that are less automatic, but it gives me a touch more freedom

### colour
honestly, scripting wasnt even really the hard part. the hard part was getting my head around the colours i wanted to use. i started with [everforest](https://everforest.vercel.app/), a color scheme that i actually like quite a lot, and had previously themed my system with. everforest comes with a couple of really handy features, notably five stages of background brightness, three greys, an orange, and a set of "background colours". the former are excellent for interfaces - "background dim" is used all over the place for tab trays in things like firefox and zed to show. greys are great for "unselected" colours in file pickers, as well as for comments. oranges are excellent for catching the user's attention - i've seen multiple tools use them for TODOs. and the background colours might be my most favourite, because they're perfectly suited for high importance notifications in dunst. they are different enough to catch the attention, but still look good under the standard foreground colour.

hell, even the concepts of foreground and background colours, quite standard features of alacritty themes but not actually technically part of the standard 16 colour set, might be their own problem. this is because, even though i don't necessarily want to use it all the time, having pywal as an option for generating colour schemes would still be cool, but it _only_ provides the 16 colours.

### descent into madness

- pre-existing colourschemes are handy because people have done the hard work for you
  - this is doubly true for theming less config-friendly apps like firefox
    - god firefox, what a pain in the ass
  - while we're on it, let's complain about micro
  
- to use 16 colours or not to use 16 colours
  - orange
  - bright black
  - foreground and background
  - bright colours
  
- adjusting colors in bash
  - hsl
  - oh christ i might have to actually learn colour theory
  
- pywal's usefulness
  - scripting that other people have already done

- i should make a post about why i find the modern
