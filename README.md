# JS Frogger

JS Frogger is a JavaScript rendition of the [classic 1981 arcade game called Frogger](https://en.wikipedia.org/wiki/Frogger). It was built using simple HTML, CSS, JavaScript, and jQuery, and does not include any other custom libraries or templates.

## Original Game

The object of the game is to navigate a frog sprite accross a busy street and a raging river. The user must navigate the treacherous terrains to bring the frogger to one of five homes, and can die in many ways:

- Getting hit by a truck/car
- Drowning in the river
- Moving off the screen
- Hitting an alligator or snake
- Trying to enter a home that already has a frog
- Missing the home by a little and hitting the shrubs in between the homes
- Running out of time

All in all, it's quite a difficult game to win at. The user has three lives to bring all five frogs to the homes, at which point they advance to another, more difficult level, without having their lives replenished.

## This Emulation

In my emulation, I limited the methods of dying to the following:

- Getting hit by a truck/car
- Drowning in the river
- Trying to enter a home that already has a frog

Play begins with a bunch of randomly generated trucks and logs already on the playing area, and continues to generate new ones off screen when the old ones move off the playing field.

The user controls a blue square, which is our frogger, with the arrow keys, and avoids seven lanes of truck-traffic, then crosses seven rows of river, hopping from log to log to do so.

## Technologies and Methodologies Employed

### General Concept

The overarching idea I had when building this game was to create a grid of divs on the screen, then simply style them when sprites move around on the screen. I found this to be more appealing than, say, moving sets of divs around because in my chosen method, I knew that I wouldn't have to worry about generating new HTML elements or positioning existing ones, which I thought would be a lot tougher to do and require more manipulation of CSS styles. Therefore, I chose to use JS to set and remove ID's and classes on my grid of divs to control movement and the runtime of the game.

### HTML

The HTML for my game, while quite long and repetitive, is very simple: I made 17 divs with 17 divs as their children, representing a 17X17 grid.

### CSS

The CSS of the game is a little more involved, yet simplified and dignified by the use of flexbox. The entire container div of my grid is a flex container, which allowed me to leave the sizing of each cell element to the browser to handle. I utilized a few media queries to resize this flex container and set a few other styles as well. I employed keyframes to change the box-shadow property of a few elements to give them a glowing look. Overall, the CSS is very straightforward, and doesn't do all that much.

### JavaScript

The heart of this game is in the JavaScript, which controls the entire experience of the game. The first encounter the user has with JS is on the landing page, where I simply move a picture of a frog around the screen at random.

The remainder of the JS code is implemented on the game.html page. I thought it necessary to break up the code into three files:

1) The file called ['globals.js'](scripts/globals.js) simply contains all the global variables I set and use in the game, and is kept separate from the actual code so that the variables can be used by the other two files from the first instance they're loaded.

2) The file called ['classes.js'](scripts/classes.js) defines three classes:
  - Sprite
  - Truck
  - Log  
   which will be explained below.

3) The file called ['game-script.js'](scripts/game-script.js) contans the runtime functions for the game, and is responsible for starting and playing the game.




https://wireframe.cc/fBjoaA


