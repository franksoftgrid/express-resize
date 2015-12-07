# Express-Resize

**Express middleware to resize images on the fly.**

## Installation

`npm install --S express-resize`

## Usage

**If you are using other middleware make sure to include express-resize before them!**

```
var express = require('express');
var resize = require('express-resize');

var app = express();

app.use(resize);
app.use(express.static()); //express.static initialized after express-resize

app.listen(3030);
```

Just put the full sized image in your content directory and request it with the width and or height parameters. For example:

* Need a small image for mobiles? get *http://yoursite/image.jpg?width=150*

* Need to crop an image to a square format for an avatar? get *http://yoursite/avatar.jpg?width=100&height=100*

*Supported formats are: jpg, jpeg, png, gif, svg.*

## Todo

* Provide options for crop positioning

