$(document).ready(function(){$("#toggle-switcher").click(function(){$(this).hasClass("opened")?($(this).removeClass("opened"),$("#style-switcher").animate({right:"-175px"})):($(this).addClass("opened"),$("#style-switcher").animate({right:"-15px"}))}),$("#style-switcher li").click(function(s){s.preventDefault();var e="styles-"+($(this).index()+1)+".css";$("link#theme").attr("href","assets/css/"+e),$(".navbar-brand img").attr("src","assets/images/logo-"+($(this).index()+1)+".png");var t=$(this).css("backgroundColor");$("#toggle-switcher .fa").css({color:t}),$(".row.skills").empty().html('			<div class="col-sm-6 col-md-3 text-center">				<span class="chart plus-symbol" data-percent="90"><span class="percent">90</span></span>				<h2 class="text-center">Front End</h2>			</div>			<div class="col-sm-6 col-md-3 text-center">				<span class="chart plus-symbol" data-percent="80"><span class="percent">80</span></span>				<h2 class="text-center">Back End</h2>			</div>			<div class="col-sm-6 col-md-3 text-center">				<span class="chart equal-symbol" data-percent="95"><span class="percent">95</span></span>				<h2 class="text-center">Support</h2>			</div>			<div class="col-sm-6 col-md-3 text-center">				<span class="chart" data-percent="90"><span class="percent">90</span></span>				<h2 class="text-center main-color">High Score</h2>			</div>'),$(".chart").each(function(){$(this).easyPieChart({size:200,animate:2e3,lineCap:"butt",scaleColor:!1,trackColor:"transparent",barColor:t,lineWidth:5,easing:"easeOutQuad"})}),$("link#theme").load(function(){})})});