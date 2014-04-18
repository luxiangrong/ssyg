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
				if(scrollPosition == 'background-position') {
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
				var inertia = parseFloat( $elem.attr('data-parallax-inertia'));
				var parentOffset = $(this).closest('[data-parallax-offset="true"]');
				var adjuster = $elem.attr('data-parallax-offset-top') == undefined ? 0 : parseFloat($elem.attr('data-parallax-offset-top'));
				if(parentOffset.size() > 0) {
					adjuster += parentOffset.offset().top;
				}
				
				var data = {
					'scrollPosition' : 'top',
					'inertia' : inertia,
					'element' : $elem,
					'adjuster': adjuster
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
		});

	});
})(jQuery);
