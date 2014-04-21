//--
var imgScrollNum2 = new Array();
for ( i = 0; i < 50; i++) {
	imgScrollNum2[i] = 0;
}
function imgScrollRight2(a, b, c, d) {
	//a.stop();
	if (imgScrollNum2[d] < b) {
		imgScrollNum2[d]++;
		a.animate({
			scrollLeft : imgScrollNum2[d] * c
		}, 200);
	}
}

function imgScrollLeft2(a, b, c, d) {
	//a.stop();
	if (imgScrollNum2[d] > 0) {
		imgScrollNum2[d]--;
		a.animate({
			scrollLeft : imgScrollNum2[d] * c
		}, 200);
	}
}

//规范化动画帧函数
window.requestAnimFrame = (function() {
	return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || null;
})();

/*
 * Viewport - jQuery selectors for finding elements in viewport
 *
 * Copyright (c) 2008-2009 Mika Tuupola
 *
 * Licensed under the MIT license:
 *   http://www.opensource.org/licenses/mit-license.php
 *
 * Project home:
 *  http://www.appelsiini.net/projects/viewport
 *
 */
(function($) {

	var $window = $(window);

	$.belowthefold = function(element, settings) {
		var fold = $window.height() + $window.scrollTop();
		return fold <= $(element).offset().top - settings.threshold;
	};

	$.abovethetop = function(element, settings) {
		var top = $window.scrollTop();
		return top >= $(element).offset().top + $(element).height() - settings.threshold;
	};

	$.rightofscreen = function(element, settings) {
		var fold = $window.width() + $window.scrollLeft();
		return fold <= $(element).offset().left - settings.threshold;
	};

	$.leftofscreen = function(element, settings) {
		var left = $window.scrollLeft();
		return left >= $(element).offset().left + $(element).width() - settings.threshold;
	};

	$.inviewport = function(element, settings) {
		var $element = $(element);
		var offset = $element.offset();

		var windowTop = $window.scrollTop();
		var threshold = settings.threshold;

		if (offset.top - threshold < windowTop) {
			if (offset.top + $element.height() + threshold >= windowTop) {
				// top edge below the window's top
			} else {
				return false;
			}
		} else {
			if (offset.top - threshold <= windowTop + $window.height()) {
				// bottom edge above the window's bottom
			} else {
				return false;
			}
		}

		var windowLeft = $window.scrollLeft();

		if (offset.left - threshold < windowLeft) {
			if (offset.left + $element.width() + threshold >= windowLeft) {
				// left edge be on the left side of the window's left edge
			} else {
				return false;
			}
		} else {
			if (offset.left - threshold <= windowLeft + $window.width()) {
				// right edge be on the right side of the window's right edge
			} else {
				return false;
			}
		}

		return true;
	};

	$.extend($.expr[':'], {
		"below-the-fold" : function(a, i, m) {
			return $.belowthefold(a, {
				threshold : 0
			});
		},
		"above-the-top" : function(a, i, m) {
			return $.abovethetop(a, {
				threshold : 0
			});
		},
		"left-of-screen" : function(a, i, m) {
			return $.leftofscreen(a, {
				threshold : 0
			});
		},
		"right-of-screen" : function(a, i, m) {
			return $.rightofscreen(a, {
				threshold : 0
			});
		},
		"in-viewport" : function(a, i, m) {
			return $.inviewport(a, {
				threshold : 0
			});
		}
	});

})(jQuery);

/**
 * jQuery.ScrollTo
 * Copyright (c) 2007-2009 Ariel Flesler - aflesler(at)gmail(dot)com | http://flesler.blogspot.com
 * Dual licensed under MIT and GPL.
 * Date: 3/9/2009
 *
 * @projectDescription Easy element scrolling using jQuery.
 * http://flesler.blogspot.com/2007/10/jqueryscrollto.html
 * Works with jQuery +1.2.6. Tested on FF 2/3, IE 6/7/8, Opera 9.5/6, Safari 3, Chrome 1 on WinXP.
 *
 * @author Ariel Flesler
 * @version 1.4.1
 *
 * @id jQuery.scrollTo
 * @id jQuery.fn.scrollTo
 * @param {String, Number, DOMElement, jQuery, Object} target Where to scroll the matched elements.
 *	  The different options for target are:
 *		- A number position (will be applied to all axes).
 *		- A string position ('44', '100px', '+=90', etc ) will be applied to all axes
 *		- A jQuery/DOM element ( logically, child of the element to scroll )
 *		- A string selector, that will be relative to the element to scroll ( 'li:eq(2)', etc )
 *		- A hash { top:x, left:y }, x and y can be any kind of number/string like above.
 *		- The string 'max' for go-to-end.
 * @param {Number} duration The OVERALL length of the animation, this argument can be the settings object instead.
 * @param {Object,Function} settings Optional set of settings or the onAfter callback.
 *	 @option {String} axis Which axis must be scrolled, use 'x', 'y', 'xy' or 'yx'.
 *	 @option {Number} duration The OVERALL length of the animation.
 *	 @option {String} easing The easing method for the animation.
 *	 @option {Boolean} margin If true, the margin of the target element will be deducted from the final position.
 *	 @option {Object, Number} offset Add/deduct from the end position. One number for both axes or { top:x, left:y }.
 *	 @option {Object, Number} over Add/deduct the height/width multiplied by 'over', can be { top:x, left:y } when using both axes.
 *	 @option {Boolean} queue If true, and both axis are given, the 2nd axis will only be animated after the first one ends.
 *	 @option {Function} onAfter Function to be called after the scrolling ends.
 *	 @option {Function} onAfterFirst If queuing is activated, this function will be called after the first scrolling ends.
 * @return {jQuery} Returns the same jQuery object, for chaining.
 *
 * @desc Scroll to a fixed position
 * @example $('div').scrollTo( 340 );
 *
 * @desc Scroll relatively to the actual position
 * @example $('div').scrollTo( '+=340px', { axis:'y' } );
 *
 * @dec Scroll using a selector (relative to the scrolled element)
 * @example $('div').scrollTo( 'p.paragraph:eq(2)', 500, { easing:'swing', queue:true, axis:'xy' } );
 *
 * @ Scroll to a DOM element (same for jQuery object)
 * @example var second_child = document.getElementById('container').firstChild.nextSibling;
 *			$('#container').scrollTo( second_child, { duration:500, axis:'x', onAfter:function(){
 *				alert('scrolled!!');
 *			}});
 *
 * @desc Scroll on both axes, to different values
 * @example $('div').scrollTo( { top: 300, left:'+=200' }, { axis:'xy', offset:-20 } );
 */
;(function($) {

	var $scrollTo = $.scrollTo = function(target, duration, settings) {
		$(window).scrollTo(target, duration, settings);
	};

	$scrollTo.defaults = {
		axis : 'xy',
		duration : parseFloat($.fn.jquery) >= 1.3 ? 0 : 1
	};

	// Returns the element that needs to be animated to scroll the window.
	// Kept for backwards compatibility (specially for localScroll & serialScroll)
	$scrollTo.window = function(scope) {
		return $(window).scrollable();
	};

	// Hack, hack, hack... stay away!
	// Returns the real elements to scroll (supports window/iframes, documents and regular nodes)
	$.fn.scrollable = function() {
		return this.map(function() {
			var elem = this, isWin = !elem.nodeName || $.inArray(elem.nodeName.toLowerCase(), ['iframe', '#document', 'html', 'body']) != -1;

			if (!isWin)
				return elem;

			var doc = (elem.contentWindow || elem).document || elem.ownerDocument || elem;

			return $.browser.safari || doc.compatMode == 'BackCompat' ? doc.body : doc.documentElement;
		});
	};

	$.fn.scrollTo = function(target, duration, settings) {
		if ( typeof duration == 'object') {
			settings = duration;
			duration = 0;
		}
		if ( typeof settings == 'function')
			settings = {
				onAfter : settings
			};

		if (target == 'max')
			target = 9e9;

		settings = $.extend({}, $scrollTo.defaults, settings);
		// Speed is still recognized for backwards compatibility
		duration = duration || settings.speed || settings.duration;
		// Make sure the settings are given right
		settings.queue = settings.queue && settings.axis.length > 1;

		if (settings.queue)
			// Let's keep the overall duration
			duration /= 2;
		settings.offset = both(settings.offset);
		settings.over = both(settings.over);

		return this.scrollable().each(function() {
			var elem = this, $elem = $(elem), targ = target, toff, attr = {}, win = $elem.is('html,body');

			switch( typeof targ ) {
				// A number will pass the regex
				case 'number':
				case 'string':
					if (/^([+-]=)?\d+(\.\d+)?(px)?$/.test(targ)) {
						targ = both(targ);
						// We are done
						break;
					}
					// Relative selector, no break!
					targ = $(targ, this);
				case 'object':
					// DOMElement / jQuery
					if (targ.is || targ.style)
						// Get the real position of the target
						toff = ( targ = $(targ)).offset();
			}
			$.each(settings.axis.split(''), function(i, axis) {
				var Pos = axis == 'x' ? 'Left' : 'Top', pos = Pos.toLowerCase(), key = 'scroll' + Pos, old = elem[key], Dim = axis == 'x' ? 'Width' : 'Height';

				if (toff) {// jQuery / DOMElement
					attr[key] = toff[pos] + ( win ? 0 : old - $elem.offset()[pos] );

					// If it's a dom element, reduce the margin
					if (settings.margin) {
						attr[key] -= parseInt(targ.css('margin' + Pos)) || 0;
						attr[key] -= parseInt(targ.css('border' + Pos + 'Width')) || 0;
					}

					attr[key] += settings.offset[pos] || 0;

					if (settings.over[pos])
						// Scroll to a fraction of its width/height
						attr[key] += targ[Dim.toLowerCase()]() * settings.over[pos];
				} else
					attr[key] = targ[pos];

				// Number or 'number'
				if (/^\d+$/.test(attr[key]))
					// Check the limits
					attr[key] = attr[key] <= 0 ? 0 : Math.min(attr[key], max(Dim));

				// Queueing axes
				if (!i && settings.queue) {
					// Don't waste time animating, if there's no need.
					if (old != attr[key])
						// Intermediate animation
						animate(settings.onAfterFirst);
					// Don't animate this axis again in the next iteration.
					delete attr[key];
				}
			});

			animate(settings.onAfter);

			function animate(callback) {
				$elem.stop(true);
				$elem.animate(attr, duration, settings.easing, callback &&
				function() {
					callback.call(this, target, settings);
				});
			};

			// Max scrolling position, works on quirks mode
			// It only fails (not too badly) on IE, quirks mode.
			function max(Dim) {
				var scroll = 'scroll' + Dim;

				if (!win)
					return elem[scroll];

				var size = 'client' + Dim, html = elem.ownerDocument.documentElement, body = elem.ownerDocument.body;

				return Math.max(html[scroll], body[scroll]) - Math.min(html[size], body[size]);

			};

		}).end();
	};

	function both(val) {
		return typeof val == 'object' ? val : {
			top : val,
			left : val
		};
	};

})(jQuery);

/**
 * 视差滚动效果
 *
 */
(function($) {
	$(function() {
		//计算出视差滚动元素的坐标
		var newPos = function(x, adjuster, inertia, pos) {
			return x + " " + (adjuster - pos * inertia) + "px";
		};

		var newTop = function(adjuster, inertia, pos) {
			return (adjuster - pos * inertia) + "px";
		};

		//将background-position的css值转换成数值数组
		function bgPosToArray(strg) {
			strg = strg.replace(/left|top/g, '0px');
			strg = strg.replace(/right|bottom/g, '100%');
			strg = strg.replace(/([0-9\.]+)(\s|\)|$)/g, "$1px$2");
			var res = strg.match(/(-?[0-9\.]+)(px|\%|em|pt)\s(-?[0-9\.]+)(px|\%|em|pt)/);
			return [parseFloat(res[1], 10), res[2], parseFloat(res[3], 10), res[4]];
		}

		var moveParallax = function() {
			$.each(parallaxes, function(i, parallax) {
				var scrollPosition = parallax.scrollPosition;
				if (scrollPosition == 'background-position') {
					if (parallax.element.is(':in-viewport')) {
						parallax.element.css({
							'background-position' : newPos(parallax.left, parallax.adjuster, parallax.inertia, pos)
						});
					}

				} else {
					parallax.element.css({
						'top' : newTop(parallax.adjuster, parallax.inertia, pos)
					});
				}
			});
		};

		var pos, ticking = false;
		var parallaxes;
		var rafUpdate = function() {
			ticking = false;
			moveParallax();
		};

		var requestTick = function() {
			if (!ticking) {
				window.requestAnimFrame(rafUpdate);
			}
			ticking = true;
		};

		var findParallaxes = function() {
			var result = new Array();
			$("[data-parallax-background-inertia]").each(function(i, elem) {
				var $elem = $(elem);
				var inertia = $elem.attr('data-parallax-background-inertia');
				var bgTop = $elem.attr('data-parallax-offset-top') == undefined ? 0 : parseFloat($elem.attr('data-parallax-offset-top'));
				supportsBackgroundPositionXY = $('<div />', {
					style : 'background:#fff'
				}).css('background-position-x') !== undefined;

				if (supportsBackgroundPositionXY) {
					left = $elem.css('background-position-x');
				} else {
					var bgPos = bgPosToArray($elem.css('background-position'));
					left = bgPos[0] + '' + bgPos[1];
				}

				var data = {
					'scrollPosition' : 'background-position',
					'inertia' : inertia,
					'adjuster' : $elem.offset().top * inertia + bgTop,
					'element' : $elem,
					'left' : left
				};
				result.push(data);
			});
			$("[data-parallax-inertia]").each(function(i, elem) {
				var $elem = $(elem);
				var inertia = parseFloat($elem.attr('data-parallax-inertia'));
				var parentOffset = $(this).closest('[data-parallax-offset="true"]');
				var adjuster = $elem.attr('data-parallax-offset-top') == undefined ? 0 : parseFloat($elem.attr('data-parallax-offset-top'));
				if (parentOffset.size() > 0) {
					adjuster += parentOffset.offset().top;
				}

				var data = {
					'scrollPosition' : 'top',
					'inertia' : inertia,
					'element' : $elem,
					'adjuster' : adjuster
				};
				result.push(data);
			});
			return result;

		};

		$(document).ready(function() {
			pos = $(window).scrollTop();
			parallaxes = findParallaxes();
			moveParallax();
			$(window).bind('scroll', function() {
				pos = $(window).scrollTop();
				if(pos > $(window).height()) {
					$(".topA").fadeIn(500);
				} else {
					$(".topA").fadeOut(500);
				}
				//如果浏览器支持requestAnimationFrame，使用requestAnimationFrame来更新动画
				if (window.requestAnimFrame !== null) {
					requestTick();
				} else {
					moveParallax();
				}

				$('.webPart1Div').each(function(i, elem) {
					var $elem = $(elem);
					if ($.inviewport($elem, {
						threshold : -500
					})) {
						$elem.addClass('in-viewport');
					}
				});

			});

			//chrome浏览器滚轮平滑滚动
			if ($.browser.webkit) {
				var scrollStep = 100;
				var bottomWheelNum = 0;
				var topWheelNum = 0;
				$(window).scrollable().mousewheel(function(event, delta, deltaX, deltaY) {
					event.preventDefault();
					var firstScrollTop = $(this).scrollTop();
					var currentScrollTop = $('body').data('scrollTop')?$('body').data('scrollTop'):firstScrollTop;
					if (delta > 0) {
						if(bottomWheelNum > 0) {
							$('body').data('scrollTop', $(this).scrollTop());
							bottomWheelNum = 0;
						}
						topWheelNum ++;
						var scrollTo = currentScrollTop - scrollStep * topWheelNum < 0 ? 0 : currentScrollTop - scrollStep * topWheelNum;
						$.scrollTo(scrollTo, 500, function(){topWheelNum = 0;$('body').data('scrollTop', scrollTo);});
					} else if (delta < 0) {
						if(topWheelNum > 0) {
							$('body').data('scrollTop', $(this).scrollTop());
							topWheelNum = 0;
						}
						bottomWheelNum ++ ;
						var scrollTo = currentScrollTop + scrollStep * bottomWheelNum < $(document).height() - $(window).height() ? currentScrollTop + scrollStep * bottomWheelNum : $(document).height() - $(window).height();
						$.scrollTo(currentScrollTop + scrollStep * bottomWheelNum, 500, function(){bottomWheelNum = 0;$('body').data('scrollTop', scrollTo);});
					}
				});
			}

		});

		//加载动画
		$(document).ready(function () {
			    $("body").queryLoader2({
			    	backgroundColor: '#FFFFFF',
			    	barColor: '#CC0000',
			    	barHeight: 3
			    });
			});

	});
})(jQuery);
