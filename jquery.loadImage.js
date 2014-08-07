;(function($) {

/**
 * load image and display 
 * @param  {String} src     HTML or URL string to image
 * @param  {Object} options user opts
 * @return {Object}         jQuery object
 */
$.fn.loadImage = function(src, options) {
	var self 		= this,
		// default options
		defaults 	= {
			width: 		null,
			height: 	null,
			// jQuery animation
			animation: 'slideDown',
			// animation length
			time: 		300,
			// callbacks
			onload: 	function() {},
			onshow: 	function() {}
		},
		// if <img/> passed
		discreet 	= document.createElement('div'),
		// regex to find if <tag/>
		isTag 		= /^<([^\s>]+)/.exec(src),
		// img object to laod
		img  		= new Image(),
		// dimension cache
		dims 		= {
			width: 		0,
			height: 	0
		},
		// merged options
		opts 		= $.extend({}, defaults, options);
	
	// only if src string passed
	if ( src ) {
		// if match and is an image tag
		if ( isTag && isTag[1] == 'img' ) {
			// extract src attribute from created node
			discreet.innerHTML = src;
			src = discreet.firstChild.src;
		}

		// only for image strings
		if ( /\.(jpg|png|gif)$/.test(src) ) {
			// set src attribute on new image
			img.src = src;
			// hide
			img.style.cssText 	= 'display:none;';
			// when image loads
			img.onload = function() {
				// ratio of width:height
				var ratio = (this.width/this.height).toFixed(1);

				// when loaded run callback
				opts.onload(this);

				// set width either user required or...
				dims.width = opts.width || (function() {
					// if user height required
					if ( opts.height ) {
						// calculate according to ratio
						return Math.round(opts.height*ratio);
					// width of image
					} else {
						return this.width;
					}
				}).call(this);

				// set height either user required or...
				dims.height = opts.height || (function() {
					// if user width required
					if ( opts.width ) {
						// calculate according to ratio
						return Math.round(opts.width/ratio);
					// height of image
					} else {
						return this.height;
					}
				}).call(this);	

				// for each elm
				self.each(function() {
					// set width
					img.width 	= dims.width;
					// set height
					img.height 	= dims.height;
					// insert into elm
					this.insertBefore(img, null);

					// allow insert
					setTimeout(function() {
						// if animation
						if ( opts.animation ) {
							// run animation according to time and run callback
							$(img)[opts.animation](opts.time, opts.onshow);
						// just show image
						} else {
							img.style.display = '';
						}	
					}, 150);
				});
			};
			// add hidden image to body to trigger load
			document.body.insertBefore(img, null);
		}
		
	}
	// for chaining
	return this;
};

})(jQuery);