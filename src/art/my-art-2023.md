---
title: "my art 2023"
date: 2023-10-31
---

{% set images = [
    "https://64.media.tumblr.com/4775171322a43e1b258623d68308f9a3/7ed75d330d92d028-3f/s1280x1920/d29cb830f15602faa0b1a433d17dca9585024514.jpg",
    "https://64.media.tumblr.com/f28e2eb4048a8c56fd1b4bc32b6fe9c5/330716978dc16587-19/s2048x3072/ede045a087000045aadf5e4f910d7bfd5dbd0984.jpg",
    "https://64.media.tumblr.com/73664c2db98367afc6462f82d11924a1/cbc4809088d7ec7d-58/s2048x3072/aa922c49d80bebe1d988ac2b09bf3c9ace400304.jpg",
    "https://64.media.tumblr.com/09af0b329be794314a6e6c65351379f6/092355d93a758455-02/s1280x1920/1fb6f11e87775ad38259027bb3d0a7ac0667c036.jpg",
    "https://64.media.tumblr.com/263955c8b9dd2eb051559cbb1e8565d5/c376053e5fcbb60f-70/s1280x1920/657a3f6d45332d9ba1a5cee22f050ef118b9e705.jpg",
    "https://64.media.tumblr.com/e3c9527e74ff0824559a00f1d88ea85e/5983e4c21d8ea95b-18/s1280x1920/7f4fa7c20583bd0d706c0d2dd4ef6039931c7347.jpg",
    "https://64.media.tumblr.com/5a1c8764f789933907542730bb060af0/302aab6d7ec693aa-93/s640x960/0d512e299f60240935d721dd4e2255e5f3a84eac.jpg",
    "https://64.media.tumblr.com/430f1b2f7e04313aa22d111ac4527e4d/5201aee65ca936be-f7/s1280x1920/f8daab88dbbc77d2cf1851727acf411b1d8e1c13.pnj",
    "https://64.media.tumblr.com/b28bb1e86ec2a44d4c1d5c2fca092415/982105c9a3bbb277-3b/s1280x1920/b60fa6e6ce872fa6fead0c0a3cb25b2d8f1d5e71.pnj",
    "https://64.media.tumblr.com/93c24ca81ca7bf3db69a13c09130b72b/7a7b02d9db4b4579-56/s2048x3072/278da6d6d984f2424de50f5e81f06c9020891310.pnj",
    "https://64.media.tumblr.com/643e3197bb9f8d0f74adf536f7ab99db/3924d91c27437d3b-cb/s1280x1920/954855c213882fa2c1e062989880252d2c59fec9.pnj",
    "https://64.media.tumblr.com/fffe9f99eeea285cabdf0ca126a1017f/d4da3637e0f536c0-35/s2048x3072/40c08ec10034d9698876d0c48d794f16b4ae8899.pnj",
    "https://64.media.tumblr.com/ad99929cb7e9d6d9f3e249097f267b9f/0dbbfadbd374e273-9e/s2048x3072/99750ec2c751902fe61886d2496375780ae08378.jpg",
    "https://64.media.tumblr.com/1afae6b1d2fc3aa7c9065286868fbe24/07a0cf26eae49890-53/s2048x3072/a2513039ca4f97faf4a728dfd6dda855e1f99f1d.jpg",
    "https://64.media.tumblr.com/310f556700075702736d3889c291726d/547275473b97e7a6-5b/s2048x3072/b4589a7ac8a2e71f16c51037a8fa0ec295165667.jpg",
    "https://64.media.tumblr.com/a007941bf623d1e1e63ea136a3f70a47/f3fef654f36bbd33-43/s2048x3072/19d7cb154d573b52992db7e6115fefb2c5bb43b1.jpg",
    "https://64.media.tumblr.com/b7829c71d26b7ce18ed2c159f8e9179d/1dbfb56e44c99949-e5/s2048x3072/340497de75f0645ff5d827f9783c3d06997bbb9e.jpg",
    "https://64.media.tumblr.com/10fde4a23bb0e05413f8cd5ecae4e36c/21cbd1a48d5db050-fb/s2048x3072/2aaaffd1fe91fb3b4446446d0f76e8d82d08db79.jpg",
    "https://64.media.tumblr.com/cac56ee7f893bfd44f7edfeebe4f758b/d33ca069567ae5be-39/s2048x3072/2c956759f355dfb3479a1b927ba3d4ca4ae76490.jpg",
    "https://64.media.tumblr.com/d1aaa272dd4f83067ff79c7c548a6499/e8d6544cc351bfab-14/s2048x3072/687dc706e2f76294a23551e697dcec41401bd24e.jpg",
    "https://64.media.tumblr.com/a70f95375813be040807a23233f937ed/53ef6cdeb1614453-f3/s2048x3072/2f8617a4c94e0566906a5149c60118e04c926398.jpg",
    "https://64.media.tumblr.com/da0b202b2ebd573a0a597b107a801abb/94d35b22379fa929-e0/s2048x3072/aff3b24a5572df5edd25b72546c13624d4fe76c3.jpg",
    "https://64.media.tumblr.com/571a72794b015e108fa087960aee10a6/fd7bb0b078b20401-35/s2048x3072/deab9b35634fe79e06dc96bfc2ee7f337f138a61.jpg"
] %}

<div class="gallery">
{% for image in images %}
    <a href="#img_{{images.length - loop.index}}"><img class="gallery-image" src="{{image}}"></a>
    <a href="#_{{images.length - loop.index}}" class="lightbox trans" id="img_{{images.length - loop.index}}"><img src="{{image}}"></a>
{% endfor %}
</div>

<!-- TODO: add some kind of fixed aspect ratio so that these are nice and consistent-->
<!-- TODO: add fallback images -->