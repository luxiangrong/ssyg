$(function() {
	//--第一屏雪花图片（复杂特效）
	//--
	$('.indexPart1').find('li').hover(function() {
		$(this).addClass('liNow');
	}, function() {
		$(this).removeClass('liNow');
	});
	//--公司活动（复杂特效）
	//--关于我们精英团队
	$('.aboutPart1').find('ul').width($('.aboutPart1').find('li').length / 2 * 250);
	$('.aboutPart1').find('.rightBtn').click(function() {
		imgScrollRight2($('.aboutPart1').find('.list'), $('.aboutPart1').find('li').length / 2 - 4, 250, 0);
	});
	$('.aboutPart1').find('.leftBtn').click(function() {
		imgScrollLeft2($('.aboutPart1').find('.list'), $('.aboutPart1').find('li').length / 2 - 4, 250, 0);
	});
	//--关于我们公司动态（复杂特效）
	$('.aboutPart2Btn').find('.rightBtn').click(function() {
		$('.aboutPart2').load("aboutPart2.html");
	});
	$('.aboutPart2Btn').find('.leftBtn').click(function() {
		$('.aboutPart2').load("aboutPart2.html");
	});
	//--关于我们公司活动（复杂特效）
	//--关于我们发展历程（复杂特效）
	$('.aboutPart4').find('.list1').find('li').each(function() {
		if ($(this).find('p').length == 0) {
			$(this).css('background', 'none');
		}
	});
	$('.aboutPart4').find('.list').width($('.aboutPart4').find('.list').find('li').length * 150);
	$('.aboutPart4').find('.list').find('a').each(function(i) {
		$('.aboutPart4').find('.list1').find('li').eq(i).css('left', $(this).offset().left + 25);
	});
	//--关于我们公司介绍（复杂特效）
	$('.aboutPart5').find('li').hover(function() {
		$(this).addClass('liNow');
	}, function() {
		$(this).removeClass('liNow');
	});
	//--关于我们菜单
	$('.aboutNav').find('a').each(function(i) {
		$(this).click(function() {
			$('.aboutNav').find('a').removeClass('aNow');
			$('.aboutNav').find('a').eq(i).addClass('aNow');
			$('body,html').animate({
				scrollTop : $('.aboutPart').eq(i).offset().top - 50
			}, 500);
		});
	});
	if ($('.aboutNav').length > 0) {
		$(window).scroll(function() {
			$('.aboutPart').each(function(i) {
				if ($(window).scrollTop() >= $(this).offset().top - $(window).height() / 2) {
					$('.aboutNav').find('a').removeClass('aNow');
					$('.aboutNav').find('a').eq(i).addClass('aNow');
				}
			});
		});
	}
	//--MobilePart1
	$('.MobilePart1').find('li').find('img:first').fadeIn(500);
	$('.MobilePart1').find('li').hover(function() {
		$(this).addClass('liNow');
		$(this).find('img:first').fadeOut(500);
		$(this).find('img:last').fadeIn(500);
	}, function() {
		$(this).removeClass('liNow');
		$(this).find('img:first').fadeIn(500);
		$(this).find('img:last').fadeOut(500);
	});
	//--MobilePart2(复杂特效)
	//--微产品
	$('.MobilePart3').find('li').hover(function() {
		$(this).find('.btn').show();
	}, function() {
		$(this).find('.btn').hide();
	});
	$('.MobilePart3').find('.rightBtn').click(function() {
		imgScrollRight2($('.MobilePart3').find('.list'), $('.MobilePart3').find('li').length - 4, 259, 0);
	});
	$('.MobilePart3').find('.leftBtn').click(function() {
		imgScrollLeft2($('.MobilePart3').find('.list'), $('.MobilePart3').find('li').length - 4, 259, 0);
	});
	//--案例(复杂特效)
	$('.case').find('ul').width($('.case').find('li').length / 3 * 415);
	$('.case').find('li').hover(function() {
		$(this).find('.contentDiv').fadeIn(500);
	}, function() {
		$(this).find('.contentDiv').fadeOut(500);
	});
	$('.case').find('.rightBtn').click(function() {
		imgScrollRight2($('.case').find('.list'), $('.case').find('li').length / 12, 1245, 0);
	});
	$('.case').find('.leftBtn').click(function() {
		imgScrollLeft2($('.case').find('.list'), $('.case').find('li').length / 12, 1245, 0);
	});
	//--webPart1
	$('.webPart1').find('li').find('img:first').fadeIn(500);
	$('.webPart1').find('li').hover(function() {
		$(this).addClass('liNow');
		$(this).find('img:first').fadeOut(500);
		$(this).find('img:last').fadeIn(500);
	}, function() {
		$(this).removeClass('liNow');
		$(this).find('img:first').fadeIn(500);
		$(this).find('img:last').fadeOut(500);
	});
	//--页面滚动
	$('.webPart1').find('a').each(function(i) {
		$(this).click(function() {
			$('body,html').animate({
				scrollTop : $('.webPart1Div').eq(i).offset().top - 50
			}, 500);
		});
	});
	$('.MobilePart1').find('a').each(function(i) {
		$(this).click(function() {
			$('body,html').animate({
				scrollTop : $('.MobilePart1Div').eq(i).offset().top - 50
			}, 500);
		});
	});
	//--
	$('.topA').click(function() {
		$('body,html').animate({
			scrollTop : 0
		}, 500);
	});
	//
	
});
