var iddiv="";
var showdiv=false;
var posY = 0;
var posYold=0;


function calcParallax(tileheight, speedratio, scrollposition) {
	return ((tileheight - (Math.floor(scrollposition / speedratio) % (tileheight+1)))-tileheight);
}

$(window).scroll(function(){
	page=$(window);
	    posY = page.scrollTop();
		var layer1  = calcParallax(20000, 0.6, posY);
		var layer2  = calcParallax(20000, 1.2, posY);
		var layer3  = calcParallax(20000, 0.8, posY);
		var layer4  = calcParallax(20000, 0.4, posY);
		var layer5  = calcParallax(20000, 1,   posY);
		var layer6  = calcParallax(20000, 0.3, posY);
		var layer7  = calcParallax(20000, 1.1, posY);
		var layer8  = calcParallax(20000, 1.2, posY);
		var layer9  = calcParallax(20000, 1.1, posY);
		var layer10 = calcParallax(20000, 0.9, posY);
		var layer11 = calcParallax(20000, 0.7, posY);
		var layer12 = calcParallax(20000, 0.3, posY);

		if((Math.abs(posY-posYold))>10){
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
			
		}		
		posYold = page.scrollTop();
	})