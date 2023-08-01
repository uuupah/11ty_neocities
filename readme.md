a personal neocities page using 11ty as a static site generator. deploys to https://uuupah.neocities.org.

# getting started

1. clone the repo

`git clone https://github.com/uuupah/11ty_neocities.git && cd 11ty_neocities`

2. install dependencies

`npm install`

3. start the dev instance 

`npm start`

# links

hosted on neocities - https://uuupah.neocities.org

automatically builds and deploys on a commit to main using [bcomnes' deploy-to-neocities github action](https://github.com/bcomnes/deploy-to-neocities)

i got started using [flamed fury's 11ty guide](https://flamedfury.com/guides/11ty-homepage-neocities/)

# todo
- [ ] set up image shortcodes to automatically create webps 
- [ ] set up all albums to load placeholder image instead; potentially use some level of automation for this
  - [ ] find a way to template this using includes
- [ ] completely fucking redo front page navigation
- [ ] paginate infinite nightmare
- [ ] convert fallback images for image links
  - [ ] create script to do this automatically
- [ ] make the 404 page less wankery