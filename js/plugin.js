/**
 * @author lxr
 */
(function($) {
	(function($) {
		$.extend($.fx.step, {
			backgroundPosition : function(fx, fb, fc) {
				if (fx.state === undefined && typeof fx.end == 'string') {
					var start = $(fx.elem).css('backgroundPosition');
					start = toArray(start);
					fx.start = [start[0], start[2]];
					var end = toArray(fx.end);
					fx.end = [end[0], end[2]];
					fx.unit = [end[1], end[3]];
				}
				var nowPosX = [];
				nowPosX[0] = ((fx.end[0] - fx.start[0]) * fx.pos) + fx.start[0] + fx.unit[0];
				nowPosX[1] = ((fx.end[1] - fx.start[1]) * fx.pos) + fx.start[1] + fx.unit[1];
				fx.elem.style.backgroundPosition = nowPosX[0] + ' ' + nowPosX[1];

				function toArray(strg) {
					strg = strg.replace(/left|top/g, '0px');
					strg = strg.replace(/right|bottom/g, '100%');
					strg = strg.replace(/([0-9\.]+)(\s|\)|$)/g, "$1px$2");
					var res = strg.match(/(-?[0-9\.]+)(px|\%|em|pt)\s(-?[0-9\.]+)(px|\%|em|pt)/);
					return [parseFloat(res[1], 10), res[2], parseFloat(res[3], 10), res[4]];
				}

			}
		});
	})(jQuery);

	//not used
	$.fn.scrollPlay = function(options) {
		var opts = $.extend({}, $.fn.scrollPlay.defaults, options);
		// iterate and reformat each matched element
		return this.each(function() {
			var $this = $(this);

			var width = $this.width();
			var parentWidth = $this.parent().width();

			//如果没有超出父元素宽度，无需处理
			if (width <= parentWidth) {
				return;
			}

			var offsetWidth = width - parentWidth;
			var direction = $this.attr('data-direction');
			if (!direction || direction === undefined) {
				direction = opts.direction;
			}

			play();
			function play() {
				if (direction == 'left') {
					var marginLeft = $this.css('marginLeft');
					console.log(marginLeft);
					$this.animate({
						'margin-left' : offsetWidth * -1
					}, {
						duration : 1000 * (offsetWidth ) / opts.speed,
						"easing" : opts.easing
					}).animate({
						'margin-left' : 0
					}, {
						duration : 1000 * (offsetWidth ) / opts.speed,
						"easing" : opts.easing,
						complete : play
					});
				} else {
					$this.css('margin-left', offsetWidth * -1);
					$this.animate({
						'margin-left' : 0
					}, {
						duration : 1000 * offsetWidth / opts.speed,
						"easing" : opts.easing
					}).animate({
						'margin-left' : offsetWidth * -1
					}, {
						duration : 1000 * offsetWidth / opts.speed,
						"easing" : opts.easing,
						complete : play
					});
				}
			}


			$this.hover(function() {
				$this.stop(true);
			}, function() {
				play();
			});

		});
	};
	$.fn.scrollPlay.defaults = {
		direction : 'left',
		speed : 30,
		easing : "easeInOutSine",
	};
})(jQuery);
