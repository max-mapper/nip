var menu = {};
var slide = {};
$(function(){
	slide.originX = $(document).width() / 2;
	slide.originY = -640;
	
	$(".header-menubtn").click(function(e) {
		if($('.page').hasClass("menu-open")){
			$('.page, .menu, .chat').removeClass("menu-open");
		}else{
			$('.page, .menu, .chat').addClass("menu-open");
		}
    });
	
	$("#header-chat").click(function(e) {
		if($('.page').hasClass("chat-open")){
			$('.page, .menu, .chat').removeClass("chat-open");
		}else{
			$('.page, .menu, .chat').addClass("chat-open");
		}
    });
	
	
	
	
	$('.evaluate').mousedown(function(event) {
		event.touches = [{pageX: 0 , pageY: 0}];
		event.touches[0].pageX = event.pageX;
		event.touches[0].pageY = event.pageY;
        touchstartfun(event);
    });
	
	$('body').mousemove(function(event) {
		event.touches = [{pageX: 0 , pageY: 0}];
		event.touches[0].pageX = event.pageX;
		event.touches[0].pageY = event.pageY;
        touchmovefun(event);
    });
	
	$('.evaluate').mouseup(function(e) {
        touchendfun(e);
    });
	
	
	
	
	$('.evaluate')[0].addEventListener('touchstart', touchstartfun, false);
	$('body')[0].addEventListener('touchmove', touchmovefun, false);
	$('.evaluate')[0].addEventListener('touchend', touchendfun, false);
	
	function touchstartfun(event) {
        slide.mousedown = true;
		slide.startX = event.touches[0].pageX;
		slide.startY = event.touches[0].pageY;
		slide.startLength = Math.sqrt(Math.pow(slide.startX - slide.originX,2) + Math.pow(slide.startY - slide.originY,2));
		slide.startAngle = Math.atan((slide.originX - slide.startX) / (slide.startY - slide.originY)) / Math.PI * 180;
		/^(?:INPUT|TEXTAREA|A)$/.test(event.target.tagName)||event.preventDefault();
    };
	
	function touchmovefun(event) {
		if(slide.mousedown){
			slide.endX = event.touches[0].pageX;
			slide.endY = event.touches[0].pageY;
			slide.endLength = Math.sqrt(Math.pow(slide.endX - slide.originX,2) + Math.pow(slide.endY - slide.originY,2));
			slide.endAngle = Math.atan((slide.originX - slide.endX) / (slide.endY - slide.originY)) / Math.PI * 180;
			
			slide.diffLength = slide.startLength - slide.endLength;
			slide.offX = (slide.diffLength / slide.startLength) * (slide.originX - slide.startX);
			slide.offY = -(slide.diffLength / slide.startLength) * (slide.startY - slide.originY);
			slide.offAngle = -(slide.startAngle - slide.endAngle);
			$('.evaluate li:nth-last-child(1)').addClass("toporigin").css("-webkit-transform","translate(" + slide.offX + "px, " + slide.offY + "px) rotate(" + slide.offAngle + "deg)");
		} 
    };
	
	function touchendfun(e) {
        if(slide.mousedown){
			slide.mousedown = false;
			if(slide.offAngle < -6){
				slide.offAngle = -45;
				$('.evaluate li:nth-last-child(1)').addClass("transition").css("-webkit-transform","translate(" + slide.offX + "px, " + slide.offY + "px) rotate(" + slide.offAngle + "deg)");
				$('.evaluate li:nth-last-child(2)').css("-webkit-transform","scale(1,1)");
				$('.evaluate li:nth-last-child(3)').css("-webkit-transform","scale(0.95,0.95) translateY(16px)");
				setTimeout(function() {$('.evaluate li:nth-last-child(1)').remove()}, 500);
			}else if(slide.offAngle > 6){
				slide.offAngle = 45;
				$('.evaluate li:nth-last-child(1)').addClass("transition").css("-webkit-transform","translate(" + slide.offX + "px, " + slide.offY + "px) rotate(" + slide.offAngle + "deg)");
				$('.evaluate li:nth-last-child(2)').css("-webkit-transform","scale(1,1)");
				$('.evaluate li:nth-last-child(3)').css("-webkit-transform","scale(0.95,0.95) translateY(16px)");
				setTimeout(function() {$('.evaluate li:nth-last-child(1)').remove()}, 500);
			}else{
				$('.evaluate li:nth-last-child(1)').addClass("transition").css("-webkit-transform","translate(0px, 0px) rotate(0deg)");
				setTimeout(function() {$('.evaluate li:nth-last-child(1)').removeClass("transition")}, 500);
			}
		}
    };
	

	
	$('#evaluate-nope').click(function(e) {
		if(slide.run)return;
		slide.run = true;
		$('.evaluate li:nth-last-child(1)').addClass("transition").addClass("transition").css("-webkit-transform","translate(0px, 0px) rotate(45deg)");
		$('.evaluate li:nth-last-child(2)').css("-webkit-transform","scale(1,1)");
		$('.evaluate li:nth-last-child(3)').css("-webkit-transform","scale(0.95,0.95) translateY(16px)");
		setTimeout(removeLastEvaluate, 500);
    });
	
	$('#evaluate-like').click(function(e) {
		if(slide.run)return;
		slide.run = true;
		$('.evaluate li:nth-last-child(1)').addClass("transition").addClass("transition").css("-webkit-transform","translate(0px, 0px) rotate(-45deg)");
		$('.evaluate li:nth-last-child(2)').css("-webkit-transform","scale(1,1)");
		$('.evaluate li:nth-last-child(3)').css("-webkit-transform","scale(0.95,0.95) translateY(16px)");
		setTimeout(removeLastEvaluate, 500);
    });
});

function removeLastEvaluate(){
	$('.evaluate li:nth-last-child(1)').remove();
	slide.run = false;
}

//绘制图形
var rader = {};

function startDrawRader(){
	rader.circle1 = $("#rader-circle1");
	rader.circle2 = $("#rader-circle2");
	var dateObj=new Date();
	rader.currentTime = dateObj.getTime();
	drawRader(0);
}

function stopDrawRader(){
	cancelRequestAnimFrame(rader.requestId);
	rader.circle1.width(100).height(100).css({'top': "104px", 'margin-left': "-50px", 'opacity': 0});
	rader.circle2.width(100).height(100).css({'top': "104px", 'margin-left': "-50px", 'opacity': 0});
}

function drawRader(currentTime){
	rader.requestId = requestAnimFrame(drawRader);
	if(currentTime == null){
		var dateObj=new Date();
		currentTime = dateObj.getTime() - rader.currentTime;
	};
	var raderTime1 = currentTime / 3 % 1600;
	var raderTime2 = (currentTime / 3 % 1600) - 800;
	if(raderTime2 < 0)raderTime2 += 1600; 
	if(raderTime1 < 1000){
		rader.radius1 = 0.3 * raderTime1 + 100;
		rader.opacity1 = -0.0004 * raderTime1 + 0.4;
		rader.top1 = -0.5 * rader.radius1 + 154;
		rader.marginLeft1 = -rader.radius1 / 2;
		rader.circle1.width(rader.radius1).height(rader.radius1).css({'top': rader.top1 + "px", 'margin-left': rader.marginLeft1 + "px", 'opacity': rader.opacity1});
	}else{
		rader.circle1.css('opacity', 0);
	}
	if(currentTime > 800 & raderTime2 < 1000){
		rader.radius2 = 0.3 * raderTime2 + 100;
		rader.opacity2 = -0.0004 * raderTime2 + 0.4;
		rader.top2 = -0.5 * rader.radius2 + 154;
		rader.marginLeft2 = -rader.radius2 / 2;
		rader.circle2.width(rader.radius2).height(rader.radius2).css({'top': rader.top2 + "px", 'margin-left': rader.marginLeft2 + "px", 'opacity': rader.opacity2});
	}else{
		rader.circle2.css('opacity', 0);
	}
}

/**
 * Provides requestAnimationFrame in a cross browser way.
 */
window.requestAnimFrame = (function() {
  return window.requestAnimationFrame ||
         window.webkitRequestAnimationFrame ||
         window.mozRequestAnimationFrame ||
         window.oRequestAnimationFrame ||
         window.msRequestAnimationFrame ||
         function(/* function FrameRequestCallback */ callback, /* DOMElement Element */ element) {
           return window.setTimeout(callback, 1000/60);
         };
})();

/**
 * Provides cancelRequestAnimationFrame in a cross browser way.
 */
window.cancelRequestAnimFrame = (function() {
  return window.cancelCancelRequestAnimationFrame ||
         window.webkitCancelRequestAnimationFrame ||
         window.mozCancelRequestAnimationFrame ||
         window.oCancelRequestAnimationFrame ||
         window.msCancelRequestAnimationFrame ||
         window.clearTimeout;
})();