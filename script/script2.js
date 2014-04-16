var iddiv="";
var showdiv=false;
var posY = 0;
var posYold=0;


function calcParallax(tileheight, speedratio, scrollposition) {
	return ((tileheight - (Math.floor(scrollposition / speedratio) % (tileheight+1)))-tileheight);
}
function calcParallaxM(tileheight, speedratio, scrollposition) {
	return (((tileheight - (Math.floor(scrollposition / speedratio) % (tileheight+1)))-tileheight)*-1);
}
function calcParallaxInv(tileheight, speedratio, scrollposition) {
	return ((tileheight + (Math.floor(scrollposition / speedratio) % (tileheight+1)))+tileheight);
}



			
			
function fixedBoxes(){
	var win = jQuery(window);
	var boxes = jQuery(' .home-slides, .services, .services2, .ecommerce, .print, .mobile, .clients, .marketing, .hosting, .media, .testimonials, .contact, .inner_mobile');
	boxes.each(function(){
		var box = jQuery(this);
		box.css({
			position:'fixed'
		})
	});
	
	var holder = jQuery('#w1');
	var sections = jQuery('.home-slides, .services, .services2, .ecommerce, .print, .mobile, .marketing, .clients, .hosting, .media, .testimonials, .contact, #particals_wrapper , .inner_mobile');
	if(sections.length){
		if(holder.width() > 1000) sections.css('width',holder.width());
		else sections.css('width',1000);
	}
	
	
	win.resize(function(){
		if(sections.length){
			if(holder.width() > 1000) sections.css('width',holder.width());
			else sections.css('width',1000);
		}
		
	})	
	
}

function initParalaxPage(){
	var page = jQuery('#main-wrapper');
	page.bind('scroll',function() {
		parallaxLines();
		
		posY = page.scrollTop();
		var layer1  = calcParallax(20000, 2.6, posY);
		var layer2  = calcParallax(20000, 2.2, posY);
		var layer3  = calcParallax(20000, 1.8, posY);
		var layer4  = calcParallax(20000, 1.4, posY);
		var layer5  = calcParallax(20000, 1,   posY);
		var layer6  = calcParallax(20000, 1.3, posY);
		var layer7  = calcParallax(20000, 1.1, posY);
		var layer8  = calcParallax(20000, 1.2, posY);
		var layer9  = calcParallax(20000, 1.1, posY);
		var layer10 = calcParallax(20000, 0.9, posY);
		var layer11 = calcParallax(20000, 0.7, posY);
		var layer12 = calcParallax(20000, 3.3, posY);
		var layer13 = calcParallaxM(20000, 1.3, posY);

		if((Math.abs(posY-posYold))>10){
			//jQuery(".section1").animate({marginTop:layer2},{queue:false, duration: 1200, "easing": "easeOutCubic"});	
			//jQuery(".section2").animate({marginTop:layer2},{queue:false, duration: 1300, "easing": "easeOutCubic"});	
			//jQuery(".section3").animate({marginTop:layer2},{queue:false, duration: 1400, "easing": "easeOutCubic"});	
			//jQuery(".section4").animate({marginTop:layer2},{queue:false, duration: 1400, "easing": "easeOutCubic"});	
			//jQuery(".section5").animate({marginTop:layer2},{queue:false, duration: 1400, "easing": "easeOutCubic"});			
			//jQuery(".section6").animate({marginTop:layer2},{queue:false, duration: 1600, "easing": "easeOutCubic"});
			
			//jQuery(".header-wrapper").animate({marginTop:layer1},{queue:false, duration: 1200, "easing": "easeOutCubic"});	
			jQuery(".home-page #header-wrapper, .hfx #header-wrapper").animate({marginTop:layer1},{queue:false, duration: 1200, "easing": "easeOutCubic"});	
			
			jQuery(".home-slides").animate({marginTop:layer1},{queue:false, duration: 1200, "easing": "easeOutCubic"});	
				jQuery("#main-img-001").animate({marginTop:layer1},{queue:false, duration: 1500, "easing": "easeOutCubic"});	
				jQuery("#main-img-002").animate({marginTop:layer2},{queue:false, duration: 1000, "easing": "easeOutCubic"});	
				jQuery("#main-img-003").animate({marginTop:layer5},{queue:false, duration: 1400, "easing": "easeOutCubic"});
				jQuery("#main-img-004").animate({marginTop:layer3},{queue:false, duration: 1000, "easing": "easeOutCubic"});	
				jQuery("#main-img-005").animate({marginTop:layer1},{queue:false, duration: 1000, "easing": "easeOutCubic"});	
				jQuery("#main-img-006").animate({marginTop:layer2},{queue:false, duration: 1500, "easing": "easeOutCubic"});	
				jQuery("#main-img-007").animate({marginTop:layer5},{queue:false, duration: 1400, "easing": "easeOutCubic"});	
				jQuery("#main-img-008").animate({marginTop:layer4},{queue:false, duration: 1600, "easing": "easeOutCubic"});	
				jQuery("#main-img-009").animate({marginTop:layer2},{queue:false, duration: 1500, "easing": "easeOutCubic"});	
				jQuery("#main-img-010").animate({marginTop:layer5},{queue:false, duration: 1400, "easing": "easeOutCubic"});	
				jQuery("#main-img-011").animate({marginTop:layer4},{queue:false, duration: 1600, "easing": "easeOutCubic"});					
			
			jQuery(".services").animate({marginTop:layer1},{queue:false, duration: 1400, "easing": "easeOutCubic"});	
				
			/*jQuery("#ipadScroll00").animate({marginTop:layer1},{queue:false, duration: 1500, "easing": "easeOutCubic"});	
				jQuery("#ipadScroll01").animate({marginTop:layer4},{queue:false, duration: 1300, "easing": "easeOutCubic"});	
				jQuery("#ipadScroll02").animate({marginTop:layer2},{queue:false, duration: 1400, "easing": "easeOutCubic"});	
				jQuery("#ipadScroll03").animate({marginTop:layer5},{queue:false, duration: 1200, "easing": "easeOutCubic"});	
				jQuery("#ipadScroll04").animate({marginTop:layer3},{queue:false, duration: 1500, "easing": "easeOutCubic"});	
			*/
			
			jQuery(".services").animate({marginTop:layer1},{queue:false, duration: 1200, "easing": "easeOutCubic"});	
			
			
			jQuery(".services2").animate({marginTop:layer1},{queue:false, duration: 1200, "easing": "easeOutCubic"});
				jQuery(".broken-glasses").animate({marginTop:layer12},{queue:false, duration: 700, "easing": "easeOutCubic"});
				
			
			jQuery(".ecommerce").animate({marginTop:layer1},{queue:false, duration: 1200, "easing": "easeOutCubic"});
				jQuery("#eCom_1").animate({marginTop:layer4},{queue:false, duration: 1400, "easing": "easeOutCubic"});
				jQuery("#eCom_2").animate({marginTop:layer1},{queue:false, duration: 1000, "easing": "easeOutCubic"});
			
			
			jQuery(".print").animate({marginTop:layer1},{queue:false, duration: 1200, "easing": "easeOutCubic"});
				jQuery("#project1").animate({marginTop:layer2},{queue:false, duration: 1400, "easing": "easeOutCubic"});
				jQuery("#project2").animate({marginTop:layer13},{queue:false, duration: 1200, "easing": "easeOutCubic"});
				jQuery("#project3").animate({marginTop:layer1},{queue:false, duration: 800, "easing": "easeOutCubic"});
				jQuery("#hand").animate({marginTop:layer1},{queue:false, duration: 1400, "easing": "easeOutCubic"});
				
			jQuery(".mobile").animate({marginTop:layer1},{queue:false, duration: 1200, "easing": "easeOutCubic"});
				jQuery("#color1").animate({marginTop:layer4},{queue:false, duration: 1400, "easing": "easeOutCubic"});
				jQuery("#color2").animate({marginTop:layer13},{queue:false, duration: 1200, "easing": "easeOutCubic"});
				jQuery("#color3").animate({marginTop:layer1},{queue:false, duration: 1000, "easing": "easeOutCubic"});
			
			/* 
			jQuery(".mobile").animate({marginTop:layer1},{queue:false, duration: 1200, "easing": "easeOutCubic"});			
				jQuery("#color1").animate({marginTop:layer13},{queue:false, duration: 1400, "easing": "easeOutCubic"});
				jQuery("#color2").animate({marginTop:layer2},{queue:false, duration: 1200, "easing": "easeOutCubic"});
				jQuery("#color3").animate({marginTop:layer1},{queue:false, duration: 1000, "easing": "easeOutCubic"});
			*/
			
			jQuery(".marketing").animate({marginTop:layer1},{queue:false, duration: 1200, "easing": "easeOutCubic"});	
			jQuery(".clients").animate({marginTop:layer1},{queue:false, duration: 1200, "easing": "easeOutCubic"});	
			jQuery(".hosting").animate({marginTop:layer1},{queue:false, duration: 1200, "easing": "easeOutCubic"});
			jQuery(".testimonials").animate({marginTop:layer1},{queue:false, duration: 1200, "easing": "easeOutCubic"});
			jQuery(".media").animate({marginTop:layer1},{queue:false, duration: 1200, "easing": "easeOutCubic"});
			jQuery(".contact").animate({marginTop:layer1},{queue:false, duration: 1200, "easing": "easeOutCubic"});
			
			
			jQuery(".inner_mobile").animate({marginTop:layer1},{queue:false, duration: 1200, "easing": "easeOutCubic"});

			
		}		
		posYold = page.scrollTop();
	});
	jQuery(window).mousewheel(function(event, delta, deltaX, deltaY){
		if(delta < 0) page.scrollTop(page.scrollTop() + 200);
		else if(delta > 0) page.scrollTop(page.scrollTop() - 200);
		return false;
	})
}

// script 2 =========================================================  
jQuery(function(){
		//|| $(window).width() > 768
	// do not apply easing on ipad
	//initParalaxPage();	!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))
	
	if(  navigator.userAgent.match(/iPad/i) != null  ){	
	//if( $(window).width() < 768 ){	
				//ipad is here
			
	}
	else if( $(window).width() < 768 ){	

	}	
	else{
			initParalaxPage();	
			fixedBoxes();
	}
	
	
		
	
});


