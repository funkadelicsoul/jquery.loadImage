jquery.loadImage
================

Load image at dimensions required by interface requirements

## Usage
`$('#myElement').loadImage('image', {opts})`

## Settings

### image (required)
Type: `url string | image html string`
Default: ''

Image being loaded

Example:
```
// URL
$('...').loadImage('image.jpg');

// HTML
$('...').loadImage('<img src="image.jpg">');
``` 

### options
Type: `Object`

#### width
Type: `int`
Default: `null`

Width required in pixels

**Width has precedence over height.** If width _and_ height options passed then width will dictate height.

#### height
Type: `int`
Default: `null`

Height required in pixels.

In the absence of a width option, height will dictate width.

#### animation
Type: `string`
Default: `slideDown`

jQuery animation effect or no effect at all

#### time
Type: `int`
Default: `300`

Animation length in milliseconds

#### onload
Type: `function`
Default: `null`

Called when image has loaded

Callback is passed the image as a parameter

`this` within the function is the element the plugin is called on

```
function($img) {
    // do something
}
```

#### onshow
Type: `function`
Default: `null`

Called when animation finishes

Callback is passed the image as a parameter

`this` within the function is the element the plugin is called on

```
function($img) {
    // do something
}
```

## Examples

### Basic

```
$('#myElm').loadImage('image.jpg')
```

### At required width

```
$('#myElm').loadImage('image.jpg', {
    width: 50
})
```

### At required height

```
$('#myElm').loadImage('image.jpg', {
    height: 50
})
```

### Fade in once loaded

```
$('#myElm').loadImage('image.jpg', {
    width:      100,
    animation:  'fadeIn',
    time:       1000
})
```

### Just display image, no animation

```
$('#myElm').loadImage('image.jpg', {
    animation:  false
})
```

### Do something once loaded

```
$('#myElm').loadImage('image.jpg', {
    onload: function($img) {
        $(this).removeClass('loading')
    }
})
```

### Do something on display

```
$('#myElm').loadImage('image.jpg', {
    onshow: function($img) {
        $img.addClass('pulse')
    }
})
```