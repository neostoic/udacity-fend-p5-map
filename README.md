# udacity-fend-p5-map
Udacity Front End Nano Degree Project 5.1 Neighborhood map, this is a SPA that runs on knockout.js, jQuery, and APIs from Google maps, Yelp and FourSquare. UI is powered by MaterializeCss and Font-Awesome.
## Developer Install Instructions
### Git... Going...
Use git to clone this repository into your chosen working directory.
[The Repository](https://github.com/mcarpenterjr/udacity-fend-p5-map.git)
#### Then...
**Open You're Favorite CLI and Start Pluggin' Away!**

### Install Node
_Node Install Instructions Go Here_
You can install nodeJs by following the instructions here...
[NODEjs](https://nodejs.org/en/download/)
This should also install NPM _(Node Package Manager)_.

### Install Bower
If bower is not globally installed it's not a bad idea to do that now.
run: `npm install -g bower`

once that completes run: `npm install --save-dev bower`

### Install Gulp
If Gulp is not globally installed it's not a bad idea to do that now.
run: `bower install -g gulp`

once that completes run: `bower install --save-dev gulp`

### Install Font-Awesome
Simply run: `bower install font-awesome`

Make sure the stylesheet link in `index.html` is pointing to either
`font-awesome.css` or `font-awesome.min.css`

I recommend using `font-awesome.css` for development purposes and then using gulp, and change the link later on when creating a minified site for deployment.
### Install Font-Awesome-SVG-PNG
Simply run: `bower install font-awesome-svg-png`

When using check the directory tree for the best use png or svg.
Read more on the custom icon creation feature here.
[font-awesome-svg-png](https://github.com/encharm/Font-Awesome-SVG-PNG/blob/master/README.md)

### Install jQuery
Simply run: `bower install jquery`

We could just create an import tag for jQuery in the `index.html`  header direct from an CDN. This however could create an issue if jQuery is ever updated, putting our web application at risk of breaking without our immediate knowledge.

### Install Materialize CSS
Simply run: `bower install materialize`

_Elaborate on MaterializeCSS and our usage here_
### Install Knockout JS
Simply run: `bower install knockout`

_Elaborate More on the KnockoutJS Framework and our usage here_
## Hard Coded Locations
Main area is West Dover, VT
