jQuery.noConflict();
(function($) {
	$(function() {
		$(document).ready(function() {
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
			}
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
			$.stellar.positionProperty.position = {
				setTop : function($element, newTop, originalTop) {
					$element.stop(true).animate({
						top : newTop
					}, {
						queue : false,
						duration : 1000,
						"easing" : "easeOutCubic"
					});
					//$element.css('top', newTop);
				},
				setLeft : function($element, newLeft, originalLeft) {
					$elem.css('left', left);
				},
			};
			
			var screen1Height = $("#screen-1").height();
			var screen3Height = $("#screen-3").height();
			var screen4Height = $("#screen-4").height() ;
			var screen5Height = $("#events").height();
			var screen6Height = $("#screen-6").height();
			var screen7Height = $("#screen-7").height();
			
			$("#screen-3").attr("data-stellar-vertical-offset", -screen1Height);
			$("#screen-4").attr("data-stellar-vertical-offset", -screen1Height - screen3Height);
			$("#events").attr("data-stellar-vertical-offset", -screen1Height - screen3Height - screen4Height);
			$("#screen-6").attr("data-stellar-vertical-offset", -screen1Height - screen3Height - screen4Height - screen5Height );
			$("#screen-7").attr("data-stellar-vertical-offset", -screen1Height - screen3Height - screen4Height - screen5Height - screen6Height);
			$("body").height(screen1Height + screen3Height + screen4Height + screen5Height + screen6Height + screen7Height);
			$.stellar({
				horizontalScrolling : false, //默认水平方向开启滚动
				hideDistantElements : false, //默认为隐藏
			});
		});
	});
})(jQuery);
