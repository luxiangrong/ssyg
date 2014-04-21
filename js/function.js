jQuery.noConflict();
(function($) {
	$(function() {
		$(document).ready(function() {
			$(window).bind('scroll', function() {
				pos = $(window).scrollTop();
				if(pos > $(window).height()) {
					$(".topA").fadeIn(500);
				} else {
					$(".topA").fadeOut(500);
				}
			});
			
			$('.topA').click(function() {
				$('body,html').animate({
					scrollTop : 0
				}, 500);
			});
			
			//大事记内容和效果
			var eventsMap = [
				{
					top: 35,
					year: "2014",
					content: "2014 国际野生生物保护学会(WCS)中国委托公司网站开发事宜"
				},
				 {
					top: 425,
					year: "2013",
					content: "2013 国际野生生物保护学会(WCS)中国委托公司网站开发事宜"
				},	
				 {
					top: 745,
					year: "2012",
					content: "2012 国际野生生物保护学会(WCS)中国委托公司网站开发事宜"
				},	
				{
					top: 1060,
					year: "2011",
					content: "2011 国际野生生物保护学会(WCS)中国委托公司网站开发事宜"
				},
				{
					top: 1260,
					year: "2010",
					content: "2010 国际野生生物保护学会(WCS)中国委托公司网站开发事宜"
				},		
				{
					top: 1465,
					year: "2009",
					content: "2009 国际野生生物保护学会(WCS)中国委托公司网站开发事宜"
				},	
			];
			
			var getEventByHeight  = function(height){
				var result ;
				$.each(eventsMap, function(index, data){
					if(height > data.top) {
						result = data;
					} else {
						return false;
					}
				});
				return result;
			};
			$(window).on('scroll.events', function(){
				var start = $('#screen-1').height() + $("#screen-3").height() + 500;
				var $this = $(this);
				var $events = $('#events');
				var $eventsTag = $events.find('.events-tag');
				var currentScrollTop = $this.scrollTop();
				var height = currentScrollTop-start;
				if(height <= 500) {
					$eventsTag.animate({
						top : 550 - height
					}, {
						queue : false,
						duration : 1000,
						"easing" : "easeOutCubic"
					});
				}
				if(currentScrollTop > start && currentScrollTop < start + 1648) {
					$eventsTag.show();
					$eventsTag.fadeIn(500);
					
					$events.find('.mask').animate({
						height : height
					}, {
						queue : false,
						duration : 500,
						"easing" : "easeOutCubic"
					});
					var eventObj = getEventByHeight(height);
					if(eventObj) {
						$events.find('.events-tag dt').html(eventObj.year);
						$events.find('.events-tag .events-tag-body-middle').html(eventObj.content);
					}
				} else {
					if(currentScrollTop < start) {
						$events.find('.mask').height(0);
							$events.find('.mask').animate({
							height : 0
						}, {
							queue : false,
							duration : 500,
							"easing" : "easeOutCubic"
						});
					}
					if(currentScrollTop > start + 1648) {
						$events.find('.mask').animate({
							height : 1648
						}, {
							queue : false,
							duration : 500,
							"easing" : "easeOutCubic"
						});
					}
					$eventsTag.fadeOut(500);
				}
				
			});
		

			//3d效果展示
			$(".box").hover(function() {
				$this = $(this);
				var top = $this.find('.top');
				$this.addClass('openBox');
			}, function() {
				var top = $this.find('.top');
				$this.removeClass('openBox');
			});


			//案例展示部分
			$(".case-list .case-item").hover(function(e) {
				e.stopPropagation();
				$this = $(this);
				var offset = $this.offset();
				var height = $this.height() - 20;
				var caseInfoPicElem = $this.find('.case-pic');
				var caseIntroElem = $this.find('.case-intro');
				//将详细介绍定位到原来位置
				caseInfoPicElem.css('top', 0).css('left', 0);
				caseIntroElem.css('top', 0).css('left', 0);
				$this.css('z-index', 1000);

				caseInfoPicElem.stop(true, true).animate({
					top : -1 * height / 2
				}, {
					queue : false,
					duration : 500,
					"easing" : "easeOutCubic"
				});
				caseIntroElem.stop(true, true).animate({
					top : height / 2,
					opacity : 1
				}, {
					queue : false,
					duration : 300,
					"easing" : "easeOutCubic"
				});
			}, function(e) {
				e.stopPropagation();
				$this = $(this);
				var offset = $this.offset();
				var caseInfoPicElem = $this.find('.case-pic');
				var caseIntroElem = $this.find('.case-intro');
				//将详细介绍定位到原来位置
				$this.css('z-index', 100);

				caseInfoPicElem.stop(true, false).animate({
					top : 0
				}, {
					queue : false,
					duration : 500,
					"easing" : "easeOutCubic"
				});
				caseIntroElem.stop(true, false).animate({
					top : 0,
					opacity : 0
				}, {
					queue : false,
					duration : 300,
					"easing" : "easeOutCubic"
				});
			});

			//案例展示部分自动计算长宽值
			function calcCaseContainerHeight(){
				var w_h_ratio = 320 / 213;
				var numPerRow = 4;
				
				if(($(".container").width() + 135 ) > $(window).width())  {
					$("#case-container").width($(window).width());
				} else {
					$("#case-container").width($(".container").width() + 135);
				}
				
				var containerWidth = $("#case-container").width();
				
				var containerHeight = (containerWidth / w_h_ratio / numPerRow);
				$(".case-item ").height(containerHeight);
				$(".case-item ").width((containerWidth/numPerRow));
			}
			calcCaseContainerHeight();
			$(window).on("resize", calcCaseContainerHeight);

			//视差滚动效果
			// $.stellar.positionProperty.position = {
				// setTop : function($element, newTop, originalTop) {
					// $element.stop(true).animate({
						// top : newTop
					// }, {
						// queue : false,
						// duration : 1000,
						// "easing" : "easeOutCubic"
					// });
					// //$element.css('top', newTop);
				// },
				// setLeft : function($element, newLeft, originalLeft) {
					// $elem.css('left', left);
				// },
			// };
			
			// var screen1Height = $("#screen-1").height();
			// var screen3Height = $("#screen-3").height();
			// var screen4Height = $("#screen-4").height() ;
			// var screen5Height = $("#events").height();
			// var screen6Height = $("#screen-6").height();
			// var screen7Height = $("#screen-7").height();
// 			
			// $("#screen-3").attr("data-stellar-vertical-offset", -screen1Height);
			// $("#screen-4").attr("data-stellar-vertical-offset", -screen1Height - screen3Height);
			// $("#events").attr("data-stellar-vertical-offset", -screen1Height - screen3Height - screen4Height);
			// $("#screen-6").attr("data-stellar-vertical-offset", -screen1Height - screen3Height - screen4Height - screen5Height );
			// $("#screen-7").attr("data-stellar-vertical-offset", -screen1Height - screen3Height - screen4Height - screen5Height - screen6Height);
			// $("body").height(screen1Height + screen3Height + screen4Height + screen5Height + screen6Height + screen7Height);
			// $.stellar({
				// horizontalScrolling : false, //默认水平方向开启滚动
				// hideDistantElements : false, //默认为隐藏
			// });
		});
	});
	
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
			var scrollable = $(window).scrollable();
			pos = scrollable.scrollTop();
			parallaxes = findParallaxes();
			moveParallax();
			$(window).bind('scroll', function() {
				pos = scrollable.scrollTop();
				//如果浏览器支持requestAnimationFrame，使用requestAnimationFrame来更新动画
				if (window.requestAnimFrame !== null) {
					requestTick();
				} else {
					moveParallax();
				}

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
