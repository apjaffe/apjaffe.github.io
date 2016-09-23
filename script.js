var emailAddress=[96, 107, 96, 109, 111, 105, 96, 101, 101, 100, 63, 102, 108, 96, 104, 107, 45, 98, 110, 108]; //Make life difficult for spammers
//var readyForHashchange=false;
var scrollPos = 0;
var scrollNames=[];
var destScrollPosName="intro";
var scrollPosByPage={};
var modifiedScrollPos={};
var scrollDist=0;
var stillLoading=true;
var safeFromSpammers=false;
var ignoreHashChanges=0;
var mousePosX=null;
var mousePosY=null;

var swipePosX=null;
var swipePosY=null;
var swipeStartTime=null;

$(document).ready(function() {
	$( "div.scrollable" ).each(function(index)
	{
		scrollNames.push($(this).attr("name"));
	});

	$( "a.button" )
	.button();
	
	if(docCookies.hasItem("ishuman"))
	{
		secretFunctionHiddenFromSpammers(docCookies.getItem("ishuman"),true);
	}
	
	if(location.hash==="#tutorinfo")
	{
		secretFunctionHiddenFromSpammers("justincase");
		location.hash="tutoring";
	}
	
	$( "a.button, a.internal" ).each(function(){
		var that=this;
		$(that).click(function(event)
		{
			//readyForHashchange=false;
			var hash=$(that).attr("href");
			gotoNewHash(hash);

			//setTimeout(gotoCurrentHash,2000);
			//readyForHashchange=true;
			
			secretFunctionHiddenFromSpammers("justincase");
			
			event.preventDefault();
		});
	});
	
	$(document).mousedown(function( event ) 
	{
		secretFunctionHiddenFromSpammers("justincase");
	});
	
	$(document).mousemove(function( event ) 
	{
		if((mousePosX!==null && mousePosX!==event.pageX) || (mousePosY!==null && mousePosY!==event.pageY))
		{
			secretFunctionHiddenFromSpammers("justincase");
		}
		else
		{
			mousePosX=event.pageX;
			mousePosY=event.pageY;
		}
	});
	$(document).keydown(function( event ) 
	{
		secretFunctionHiddenFromSpammers("justincase");
	});
	$(document).scroll(function( event ) 
	{
		secretFunctionHiddenFromSpammers("justincase");
	});

	//Swipe left/right
	var touchsurface = document;//document.getElementById('wrapper');
	touchsurface.addEventListener('touchstart', function(e) {
		if(scrollNames.length>0)
		{
			swipePosX=e.changedTouches[0].pageX;
			swipePosY=e.changedTouches[0].pageY;
			swipeStartTime = new Date();
		}
		secretFunctionHiddenFromSpammers("justincase");
	}, false);
	touchsurface.addEventListener('touchmove', function(e) {
		var x=e.changedTouches[0].pageX;
		var y=e.changedTouches[0].pageY;
		
		if(swipePosY!==null && Math.abs(y-swipePosY)>10)
		{
			swipePosX=null;
			swipePosY=null;
		}
		secretFunctionHiddenFromSpammers("justincase");
	}, false);
	touchsurface.addEventListener('touchend', function(e) {
		touchover(e);
		secretFunctionHiddenFromSpammers("justincase");
	}, false);
	touchsurface.addEventListener('touchcancel', function(e) {
		touchover(e);
		secretFunctionHiddenFromSpammers("justincase");
	}, false);
	

	//$(window).hashchange( function(){
	  
	$("div.scrollable").css("position","absolute");
	  
	//updateEventualElementPositions();
	
});

function touchover(e)
{
	var x=e.changedTouches[0].pageX;
	var y=e.changedTouches[0].pageY;
	var time = new Date();
	//alert(Math.abs(x-swipePosX)+"/"+(time-swipeStartTime));
	if(swipePosX!==null && Math.abs(x-swipePosX)>15 && scrollNames.length>0 && time-swipeStartTime<100)
	{
		var hashname = getHashName();
		if(hashname!==null)
		{
			var swipeDir = (x<swipePosX)?1:-1;
			var swipePos = scrollNames.indexOf(hashname);
			if(swipePos!==-1)
			{
				swipePos+=swipeDir;
				//if(swipePos<0)
				//	swipePos+=scrollNames.length;
				//if(swipePos>=scrollNames.length)
				//	swipePos-=scrollNames.length;
				if(swipePos>=0 && swipePos<scrollNames.length)
					gotoNewHash(scrollNames[swipePos]);
			}
		}
	}
	swipePosX=null;
	swipePosY=null;
}

function gotoNewHash(hash)
{
	ignoreHashChanges++;
	location.hash=hash;//+"_";
	gotoCurrentHash();
	setTimeout(function(){ignoreHashChanges--;},1000);
}

function gotoCurrentHash()
{
	//var anchor = getHashElement("div");
	//if(anchor && anchor.offset())
	var name = getHashName();
	if(name!==null)
	{
		$("#wrapper").scrollTop(0);
	
		//$(window).scrollTop(anchor.offset().top-$("#menu-wrapper").height());
		//destScrollPos = scrollPosByPage[name];
		var oldName = destScrollPosName;
		
		destScrollPosName=name;
		//hashchanged();
		
		modifiedScrollPos = {};
		modifiedScrollPos[oldName]=scrollPos/scrollDist;
		
		if(scrollPosByPage[destScrollPosName]<scrollPosByPage[oldName])
		{
			modifiedScrollPos[destScrollPosName]=scrollPos/scrollDist-1;
		}
		else if(scrollPosByPage[destScrollPosName]>scrollPosByPage[oldName])
		{
			modifiedScrollPos[destScrollPosName]=scrollPos/scrollDist+1;
		}
		else
		{
			modifiedScrollPos[destScrollPosName]=scrollPos/scrollDist;
		}
	}
}

window.onload=function()
{
	if(getHashName()==null)
	{
		location.hash="#intro";
	}



	resetScrollPosList();
	gotoCurrentHash();
	changedScreenDimensions();
	
	//#("body").hide();
	
	//setTimeout(function()
	//{
		destScrollPosName = getHashName();
		gotoCurrentHash();
		//scrollPos=scrollPosByPage[destScrollPosName];
		
		scrollPos=modifiedScrollPos[destScrollPosName]*scrollDist;
		
		//readyForHashchange=true; //finally the page is fully loaded
		//$("body").show();
		window.onhashchange = function()
		{
			if(ignoreHashChanges==0)
			{
				gotoCurrentHash();
			}
		};
		

		window.addEventListener("resize", changedScreenDimensions, false);
		setInterval(enterFrame,30);
	//},100);
	
};

//onlyAdjustWrapper defaults to false
function changedScreenDimensions(onlyAdjustWrapper)
{
	$("#wrapper").css('top',$("#menu-wrapper").height()+"px");
	$("#wrapper").css('height',($(window).height()-$("#menu-wrapper").height())+"px");
	if(onlyAdjustWrapper!==true)
	{
		resetScrollPosList();
		$("div.scrollable").css('width',($(window).width()*0.7)+"px");
		scrollPos=modifiedScrollPos[destScrollPosName]*scrollDist;
	}
}

function getHashName()
{
	var div = getHashElement("div");
	if(div!==null)
	{
		return div.attr("name");
	}
	return null;
}
function getHashElement(element)
{
	if(location.hash.length>1)
	{
		var hash = location.hash.replace(/_/g,"").substring(1); //remove dummy characters
		var div = $(element+"[name="+hash+"]");
		if(div)
		{
			return div;
		}
	}
	return null;
}

/*function hashchanged()
{
	var div = getHashElement("div");
	if(div)
	{
		div
		.animate({
			backgroundColor: "##C0A884",
		}, 300 )
		.animate({
			backgroundColor: "#FCFCFC" 
		}, 500 );
	}
}*/

/*$(window).scroll(function () {
	//updateEventualElementPositions();
	
});*/

function secretFunctionHiddenFromSpammers(secret, cookiesSetAlready)
{
	if(emailAddress!==null && secret=="justincase")
	{
		safeFromSpammers=true;
		var str="";
		for(var i=0;i<emailAddress.length;i++)
		{
			str+=String.fromCharCode(emailAddress[i]+1);
		}
		emailAddress=null;
		$(".safe-email").text(str);
		$(".safe-email").attr("href","mailto:"+str);
		
		$(".safe-link").each(function()
		{
			$(this).attr("href",reverse($(this).attr("data")));
		});
		
		if(cookiesSetAlready!==true)
		{
			docCookies.setItem("ishuman", secret, Infinity);
		}
	}
}

function resetScrollPosList()
{
	var pos=0;
	var MARGIN=50;
	scrollDist=$(window).width()+MARGIN;
	$( "div.scrollable" ).each(function(index)
	{
		scrollPosByPage[$(this).attr("name")]=pos;
		pos+=scrollDist;
	});
}

function openFileSafely(reversedFilename)
{
	if(safeFromSpammers)
	{
		document.location.href=reverse(reversedFilename);
	}
}

function reverse(rts)
{
	var str="";
	for(var i=0;i<rts.length;i++)
	{
		str=rts.charAt(i)+str;
	}
	return str;
}

function enterFrame()
{
	if(stillLoading)
	{
		$("#container").show();
		$("#loading").hide();
		changedScreenDimensions(true);
		$("#wrapper").scrollTop(0);
		stillLoading=false;
	}

	var FADE_RATE=0.2;
	
	//var destScrollPos=scrollPosByPage[destScrollPosName];
	var destScrollPos = modifiedScrollPos[destScrollPosName]*scrollDist;
	
	//if( modifiedScrollPos[destScrollPosName])
	//	destScrollPos=scrollPos;


	scrollPos = (scrollPos*(1-FADE_RATE)+destScrollPos*FADE_RATE);
	var windowWidth = $(window).width();
	
	var LEFT_MARGIN=$("#wrapper").width()*0.1;
	

	
	$("div.scrollable").each(function(index)
	{
		var name = $(this).attr("name");
		if(modifiedScrollPos[name]!==null)
		{
			var left = modifiedScrollPos[name]*scrollDist-scrollPos+LEFT_MARGIN;
			if(left<=windowWidth && left+$(this).width()>=0)
			{
				$(this).css("left",left);
				$(this).show();
			}
			else
			{
				$(this).hide();
			}
		}
		else
		{
			$(this).hide();
		}
	});
	
	if(Math.abs(scrollPos-destScrollPos)<1)
	{
		//modifiedScrollPos[destScrollPosName]=scrollPosByPage[destScrollPosName];
		scrollPos=modifiedScrollPos[destScrollPosName]*scrollDist;
	}
}

/*function enterFrame()
{
	var FADE_RATE=0.2;

	var parentOffset = $("#wrapper").offset();
	
	$("div.scrollable").each(function(index)
	{
		var oldLeft = $(this).offset().left-parentOffset.left;;
		var oldOpacity = $(this).css('opacity');
		
		var newOpacity = $(this).data( "opacity");
		var newLeft = $(this).data( "left" );
		
		
		var trans;
		if(newLeft!=oldLeft)
		{
			trans = (newLeft*FADE_RATE+oldLeft*(1-FADE_RATE));
			if(Math.abs(trans-newLeft)<1)
				trans=newLeft;
			$(this).css('left', trans+"px");
		}
		if(newOpacity!=oldOpacity)
		{
			trans = (newOpacity*FADE_RATE+oldOpacity*(1-FADE_RATE));
			if(Math.abs(trans-newOpacity)<0.01)
			{
				trans=newOpacity;
			}

			$(this).css('opacity', trans);
		}
		
	});
}*/

/*function updateEventualElementPositions()
{
	var windowHeight = $(window).height();
    var scrollPos = $(window).scrollTop();
	var SCROLL_DIST=$(window).width();
	var TOP_TRANSITION_DIST=200;
	var TOP_OFFSET_DIST=-200;//-230
	var BOTTOM_TRANSITION_DIST=150;
	var BOTTOM_OFFSET_DIST=20;
	
	var earliestFull=null;
	
	var parentOffset = $("#wrapper").offset();
	$("div.scrollable").each(function(index)
	{
		
		var position = $(this).offset();
		var newLeft = position.left-parentOffset.left;
		var newOpacity = 0;
		if(position.top-scrollPos+$(this).height()<TOP_TRANSITION_DIST+TOP_OFFSET_DIST)
		{
			if(position.top-scrollPos+$(this).height()<TOP_OFFSET_DIST)
			{
				newLeft = -SCROLL_DIST;
				newOpacity = 0;
			}
			else
			{
				var ratio = (position.top-scrollPos+$(this).height()-TOP_OFFSET_DIST)/TOP_TRANSITION_DIST;
				newLeft = -SCROLL_DIST*ratio;
				newOpacity=ratio*ratio*ratio*ratio;
			}
		}
		else if(position.top-scrollPos<windowHeight+BOTTOM_OFFSET_DIST)
		{
			if(position.top-scrollPos<windowHeight+BOTTOM_OFFSET_DIST-BOTTOM_TRANSITION_DIST)
			{
				newLeft = 0;
				newOpacity=1;
				if(earliestFull===null && position.top-scrollPos+$(this).height()-TOP_OFFSET_DIST-TOP_TRANSITION_DIST>$(this).height()*0.5)
				{
					earliestFull=this;
				}
			}
			else
			{
				var ratio = (windowHeight+BOTTOM_OFFSET_DIST-(position.top-scrollPos))/BOTTOM_TRANSITION_DIST;
				newLeft = -SCROLL_DIST*(1-ratio);//SCROLL_DIST*(1-ratio);
				newOpacity=ratio*ratio*ratio*ratio;
			}
		}
		else
		{
			newLeft=-SCROLL_DIST;
			newOpacity=0;
		}
		if(newLeft!=$(this).data( "left"))
		{
			$(this).data( "opacity", newOpacity );
			$(this).data( "left", newLeft );

			//$( this ).css({left:newLeft});
		}
	});
	
	if(earliestFull!==null && readyForHashchange)
	{
		var newHash = "#"+$(earliestFull).attr("name");
		if(location.hash!==newHash)
		{
			location.hash=newHash+"_";
		}
	}
}*/