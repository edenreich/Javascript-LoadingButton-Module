var LoadingButton = function() {

	'use strict';

	/**
	 * stores the button element.
	 */
	var element = {};

	/**
	 * stores the text element.
	 */
	var elementText = {};

	/**
	 * stores the Button original text.
	 */
	var elementOriginalText = {};

	/**
	 * stores the Button Text.
	 */
	var elementOriginalInnerText = '';

	/**
	 * stores the Button Id.
	 */
	var elementId = '';

	/**
	 * stores the loader overlay.
	 */
	var loader = {};

	/**
	 * stores the Default Settings.
	 */
	var settings = {
		progressColor: 'green',
		bindToElementById: 'button',
		buttonColor: 'blue',
		buttonWidth: '200px',
		buttonHeight: '80px',
		checkMarkColor: '#0DFF84',
		xMarkColor: 'red',
		fontSize: '56px',
		fontColor: '#ffffff',
		backToOriginalState: true,
	}

	/**
	 * - checks if the developer passed own settings.
	 * - check if the element exist in the DOM.
	 * - add a style tag to the head.
	 */
	function init(options) {
		settings = extend(settings, options);

		if(document.getElementById(settings.bindToElementById)) {
			element = document.getElementById(settings.bindToElementById);
			elementOriginalInnerText = element.innerHTML;
			elementId = settings.bindToElementById;
		} else {
			throw new Error('Selector does not exist in the DOM '+ settings.bindToElementById);
		}

		addStyleTags();
		wrapInnerHTML();
		addHoverEvents();
	}

	/**
	 * start the loader overlay.
	 */
	function start() {
		var regExp = new RegExp('(?:^|\s)(animated|loading)(?!\S)');

		if(regExp.test(element.className)) {
			return;
		}

		if(element.className) {
			element.className = element.className +' loading';
		} else {
			element.className = 'loading';
		}

		elementText.className = elementText.className +' fade-out';

		loader = document.createElement('div');
		loader.className = 'loader';
		element.appendChild(loader);
	}

	/**
	 * wrap the text that exist inside the button in a div with class text.
	 */
	function wrapInnerHTML() {
		elementText = document.createElement('div');
		elementText.className = 'text';
		elementText.innerHTML = elementOriginalInnerText;
		element.innerHTML = '';
		element.appendChild(elementText);
	}

	/**
	 * Stop the loader and add a checkmark in the button.
	 */
	function stop(status) {
		var icon = document.createElement('div');
		element.className = element.className.replace('loading', '');
		element.innerHTML = '';
		element.className = 'animated';

		switch(status) {
			case 'failed':
				icon.className = 'x-mark';
				break;
			case 'success':
				icon.className = 'check-mark';
				break;
		}

		element.appendChild(icon);

		if(settings.backToOriginalState) setTimeout(reset, 2000);
	}
	
	/**
	 * reset the button element to its original state.
	 */
	function reset() {
		element.className = '';
		wrapInnerHTML();
	}

	/**
	 * add style tag to the head tag.
	 */
	function addStyleTags() {
		var head = document.head || document.getElementsByTagName('head')[0];
		var styleTag = document.createElement('style');
		var CSS = `

		#${elementId} {
			z-index: 1;
			width: ${settings.buttonWidth};
			height: ${settings.buttonHeight};
			background: ${settings.buttonColor};
			color: ${settings.fontColor};
			font-size: ${settings.fontSize};
			border: 0;
			position: relative;
			overflow: hidden;
	    	}

	    	#${elementId}:hover {
			cursor: pointer;
		}

		.text {
			z-index: 4;
			text-align: center;
		}

	    	.loader {
			opacity: 0.8;
			z-index: 0;
		 	position: absolute;
			top:0;
			left:0;
			background-color: ${settings.progressColor};
			height: 100%;
			animation-name: load;
			animation-duration: 4s;
			animation-fill-mode: forwards;
	    	}

	    	.x-mark::before {
	    		content: "X";
	    		display: inlne-block;
	    		font-size: 1.5em;
	    		color: ${settings.xMarkColor};
	    		vertical-align: middle;
	    		margin: 0 auto;
	    	}

	    	.check-mark {
			z-index: 3;
			display: inline-block;
			margin: 0 auto;
			width: 10px;
			height: 30px;
			border: 10px solid ${settings.checkMarkColor};
			border-top: none;
			border-left: none;
			transform: rotate(35deg);
			vertical-align: middle;
	    	}

	    	.fade-out {
	  		opacity: 1;
			animation-name: fade-out;
			animation-duration: 3s;
			animation-fill-mode: forwards;
	    	}

	    	@keyframes load {
			from {
			  	width: 0;
			} to {
			  	width: 100%;
			}
	    	}

	    	@-webkit-keyframes load {
			from {
		  		width: 0;
			} to {
		  		width: 100%;
			}
		}

	    	@keyframes fade-out {
			from {
		  		opacity: 1;
			} to {
		  		opacity: 0;
			}
	    	}

	  	@-webkit-keyframes fade-out {
			from {
		  		opacity: 1;
			} to {
		  		opacity: 0;
		}
	    }`;
	    
	    // pipe it through the minfier
	    CSS = minify_css(CSS);
	    // adding it to the styletag
	    styleTag.innerHTML= CSS;
	    // give an id to recognize the style tag
		styleTag.setAttribute('id', settings.bindToElementById +'ButtonCSS');
		// appending that style tag to the DOM head tag
		head.appendChild(styleTag);
	}

	/**
	 * bind the click event.
	 */
	function onclick(callback) {
		element.onclick = function() { 
			start();
			callback();
		}
	}
	
	/**
	 * bind the hover event.
	 */
	function addHoverEvents() {
		element.onmouseover = function() {
			if(element.className == 'loading') return;
			
			elementText.innerHTML = 'send';
		};
	}

	/**
	 * Extend an object, overrides the properties of the origin/abstract object.
	 */
	function extend(currentObj, newObj ) {

		var extended = {};
	    	var prop;

	    	for (prop in currentObj) {
	        	if (Object.prototype.hasOwnProperty.call(currentObj, prop)) {
	            		extended[prop] = currentObj[prop];
	        	}
		}

	    	for (prop in newObj) {
	        	if (Object.prototype.hasOwnProperty.call(newObj, prop)) {
	            		extended[prop] = newObj[prop];
	        	}
		}

	    	return extended;
	}

	/**
	 * minifies the css text.
	 */
	function minify_css(string) {
	    string = string.replace( /\/\*(?:(?!\*\/)[\s\S])*\*\/|[\r\n\t]+/g, '' );
	    // now all comments, newlines and tabs have been removed
	    string = string.replace( / {2,}/g, ' ' );
	    // now there are no more than single adjacent spaces left
	    // now unnecessary: string = string.replace( /(\s)+\./g, ' .' );
	    string = string.replace( / ([{:}]) /g, '$1' );
	    string = string.replace( /([;,]) /g, '$1' );
	    string = string.replace( / !/g, '!' );
	    
	    return string;
	}
	
	return {
		start: start,
		stop: stop,
		settings: function(options) {
			init(options);
		},
		onclick: onclick,
	};
	
};
