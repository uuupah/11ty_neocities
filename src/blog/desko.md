---
title: desko keyboard upgrade
date: 2024-04-16
---

<img src="/_assets/img/desko/drill.jpg" style="display:none;"></img>

the desko bmos 5200 is a pretty interesting keyboard. i first saw one at the amman civil airport in jordan, and it has been absolutely stuck in my head for the last four years. i snagged one from taobao for a mere 50 aud and, horror of horrors, was greeted by this:

{% blogImage '/_assets/img/blog/desko.jpg', 720 %}
that's right. a full width backspace. the nerve.

### some context

i've been an unabashed keyboard dork for some time now. i don't particularly care for the current saturation of the hobby in dropping big money on enhancing the sound and look of a keyboard, and am much more interested in the tinkering side. very few of the keyboards that i have bought have cost more than a hundred bucks (although keycaps and switch prices tend to blow the final cost out a little bit (a lot)). [my keyboard list post](http://localhost:8080/lists/keyboards/) should illustrate this pretty easily. besides microbudget costs, the other thing that has been core to my my messing with keyboards has been the layout. i got a [happy hacking keyboard](https://happyhackingkb.com/) years ago, which has a bit of a unique layout - most notably, the ctrl switches have been removed from the corners and moved to the caps lock position, the backspace has been shifted down to where the 'pipe' key normally sits, just above enter, and a short shift allows for the addition of a function key in the bottom left corner, moving a lot of standard keyboard functions below a layer. i've made a couple of personal modifications to the layout of what the switches actually _do_, but i've found this physical layout has been incredible for me and very difficult to stop using, hence the creation of the **uuupah standardised layout**

{% blogImage '/_assets/img/desko/usl.jpg', 720 %}
i've modified or designed all of my boards (bar a few) to use this layout so i can swap them in and out at will. it's very much a muscle memory thing at this point, but i do find typing on a normal board much more of a chore, given that i have to use the ctrl key and backspace so often, and they're both normally stretched out to the full extents of the layout. 

blissfully, the desko already has half of the problem solved: the right shift is a full unit shorter to squeeze in the arrow keys. this is generally the more difficult problem to solve, leading me to buying an entire spare caps lock key for [my aek60](/lists/keyboards/#aek60). unfortunately, the backspace is full-width, and even worse, there isn't a hidden spare pair of contacts on the pcb (which is the norm more often than you might expect).

{% blogImage '/_assets/img/desko/back.jpg' %} 
<sub>this board was very secondhand and the pcb was FILTHY. apologies</sub>

clearly, more drastic changes will be required to get this thing where i need it.

### the plan
a lot of people are, understandably, a little nervous to modify a printed circuit board. they tend to be small and fiddly and also generally multi-layered, meaning the circuit you can see on the top isn't necessarily indicative of all the magic going on inside. [this lovely reddit post](https://www.reddit.com/r/AskElectronics/comments/12aoh3n/drilling_through_a_safe_hole_in_my_pcb_somehow/) shows just how easily you can mess up a piece of precision electronics with a power tool. thankfully, comparatively, keyboards are extremely simple hardware. each switch is about as simple as a component can really get, and they are huge and spread over a large area, meaning theres plenty of room to get a little silly if you're willing to get your hands a bit dirty. hence, my modification plan, scribbled in the back of a notebook:

{% blogImage '/_assets/img/desko/napkin-maths.jpg' %} 
the long and short of this plan was to remove the existing backspace switch and the pcb underneath (shown in dashed red) and add in two more switches with a plate supporting it against the surrounding existing switches. this was done with basically zero knowledge of the actual construction of the pcb (and i had assumed that there would be gaps under the switch blockers above the number row to make this cutting easier). in reality, the pcb is completely filled in (because why wouldn't it be) so i decided to go a little bit off the rails and follow my gut:

{% blogImage '/_assets/img/desko/jumped-traces.jpg' %} 
{% blogImage '/_assets/img/desko/strain-relief.jpg' %} 
first up, i removed the existing backspace key, followed the traces on the circuit board and soldered some arduino jumper wires to them. hot glue was used for strain relief, which is horrifically ugly, but should work just fine. for those a little unfamiliar with circuit boards, the little raised lines (known as 'traces') are functionally wires which carry the signals around the circuit, and they are generally coated in a thin layer of solder mask - a thin layer of plastic that stops the trace from touching something metal and creating a circuit somewhere else. it's pretty common when repairing electronics (providing they aren't _too_ complex) to scrape this solder mask off and solder directly to the trace. this lets you make connections wherever you want without relying on the big exposed conductive circles (generally called pads, but sometimes also contacts). in this case i have just connected to the two traces that make a backspace signal when combined - i still want to use this circuit when i add the new switches in. for now, i've just scooched the wires through some spare holes in the pcb, normally used for the centre shaft of a cherry mx style keyboard switch

{% blogImage '/_assets/img/desko/cut-guides.jpg' %} 
next up, some precision marking was done with a sharp pair of tweezers to make guides on the circuit board - once i actually got this open i realised that my "cut away a big piece of pcb" plan would actually be a huge pain, but because the circuit board was so clear, i could maybe drill the three requisite holes for a switch to mount directly. a little bot of a crazy plan perhaps, but the worst that would happen is i would screw up this section and go back to plan A. also note the lifted pads that the backspace key was previously attached to. if you get these two hot or yank them too hard they can come right off, which is generally a major pain in the ass to work around. thankfully i won't need this particular set of pads again, but i'll need to be way more careful when desoldering in the future if i intend to swap out the cherry mx black switches with something more my style.

{% blogImage '/_assets/img/desko/drill.jpg' %} 
<sub> this concept is so absurd to most normal electronics people that i had to grab a pic.</sub>

and away we go! this didn't go quite as smoothly as i wanted, but i did manage to drill the three holes per switch that i needed. i found that my horrifically oversized masonry drill and very cheap chinese drill bits tended to slide around a little bit, despite me tapping a homing point on the pcb, but pcb is actually pretty soft and holes can be adjusted with a craft knife of a pair of nippers. note that i was wearing a respirator this whole time! pcb dust is pretty nasty shit and you do not want to breathe it in.

{% blogImage '/_assets/img/desko/new-switches.jpg' %} 
{% blogImage '/_assets/img/desko/jump.jpg' %} 
my original plan was to use a plate to keep these switches stable, but because i'd gone down the alternate route, i put down a bunch of hot glue to keep the switches stable. normally you can hold switches to a pcb with the two plastic pins on either side of the central shaft, but the first six holes had been hard enough to line up, and i didnt want to try my luck with four more. this solution is temporary, as i'll discuss in a second, and it feels plenty stable for the time being.

on the back of the keyboard you can see the jumps i made to connect the new switches to the circuit board. the left switch is connected directly to the old backspace, and the right switch to the scroll lock on the far right of the keyboard. i did this because scroll lock is basically unused in 2024, so i could remap it to some other switch and not really impede the original key. what's that? remapping? how do you do that? 

### soarer's converter // vial 
way back in the infancy of mechanical keyboards as a hobby a guy called soarer created a kit for converting the then-more-common ps/2 connector to usb. given that the desko keyboard runs on ps/2, i considered making one myself, but because the hardware is a bit of a fiddle to get your hands on, i instead opted for [this little number](https://www.tinkerboy.xyz/product/tinkerboy-ps-2-keyboard-to-usb-with-soarers-converter/) from a person called tinkerboy. this lets me take the backspace and scroll lock that the keyboard is taking in and change them to the inputs that i want (as well as some other mods)

{% blogImage '/_assets/img/desko/vial.jpg' , 720 %} 

### final product
this is what the board looks like as of april 2024:

{% blogImage '/_assets/img/desko/finished-april.jpg' , 720 %} 
(i have since found the missing tilde key) the caps are still a bit dumpy and the cherry mx blacks are not quite my cup of tea, but they're getting replaced soon. the two new switches are also a little bit wonky, but i also have a stabilisation plan to fix them as well! 

### what next?
there's still a bunch i want to do with this board!

- general cleanup - the pcb and some of the internals are filthy, but this will be easier to fix up when i do some more major modifications in the future. i will be keeping the massive scuff on the top of the magnet scanner because i think it gives the board character
- new switches and keycaps - i spent an embarrassing amount on a new set of [switches](https://cafege.com.au/products/haimu-x-geon-switches?variant=43550190698741) and [keycaps](https://kbdfans.com/products/pbtfans-doubleshot-wob). i'm willing to cough up for the keycaps because they're very universal and can be migrated to other boards if i feel the need, and the haimu switches were quite affordable by todays standards. 
- caps ctrl - i've remapped the caps lock key to ctrl as per my normal layout, but this board doesn't have n-key rollover. this means that the normal ctrl key has been wired so that it is unlikely to conflict with any of the other switches on the keyboard, but the caps lock is just a normal key, making it prone to conflicts. my most pressing example is that i use ctrl+shift+1 and ctrl+shift+2 to speed up and slow down playback in reaper, but conflicts mean that the first shortcut doesnt work if i use the caps lock enter. easy solution: cut the existing traces for caps lock and jump them directly to left ctrl. ever so slightly risky, but should be worth it
- extra support for new switches - the new split backspace works fine, but the hot glue is not an amazing long term solution. to give it some more stability i've grabbed the cheapest fr4 pcb i could get my hands on from aliexpress (15aud) and i'll be cutting it down to do the same switch support i wanted to do in plan A. i might also have to do this for the above caps ctrl change, depending on if i do any serious damage to the pcb
- removing modifiers - i might pop the bottom row ctrl and right super/win key, just because this makes homing a little easier for me. i'll also be getting rid of the arrow keys - up will become fn, right will become a numpad 0, and the other two will be unused
- more function keys - the contacts hidden under the switch blockers do seem to work, and while i wouldnt really have any practical use for them it would be really fun to have f13-f24 keys on the top of the board. the real trick is finding a keycap set that will fit them