<!--
.. title: 理解iOS中的touch事件
.. slug: how-mobile-safari-touch-event-works
.. date: 2012/03/13 09:22:03
.. tags: chrome, 插件, 下载, 安装
.. link: http://hellohtml5.blogspot.com/2010/10/how-mobile-safari-touch-event-works.html
-->

touch事件是iOS中最重要的事件。

## 一、简介

Apple的官方文档[Handling Events](http://17.254.2.129/library/safari/#documentation/AppleApplications/Reference/SafariWebContent/HandlingEvents/HandlingEvents.html)和 [Safari CSS Visual Effects Guide](http://developer.apple.com/library/safari/#documentation/InternetWeb/Conceptual/SafariVisualEffectsProgGuide/Introduction/Introduction.html)是很好的开发指南，但是里面的内容显然是针对初学者的，我在这里补充一下。

另外，Apple开发者中心有很多不错的HTML5教程与资源，例如HTML5离线存储，CSS动画，CSS 3D变换等，有兴趣的可以了解一下。 [http://developer.apple.com/library/safari/navigation/](http://developer.apple.com/library/safari/navigation/)

<!-- TEASER_END -->

## 二、监听touch事件

最简单的办法就是，使用`element.addEventListener(touchevent,handler,usercapture)`来捕捉事件。touch事件的类型有`touchstart` , `touchmove` , `touchend` , `touchcancel`。在实际使用中，如果你比较习惯模块式开发，你可以使用如下方式捕捉事件，显得更"优雅"。

## 三、touch事件的属性

touch事件的重要属性有以下几个:

- `clientX`:X轴坐标，相对于viewport，除去滚动。
- `clientY`:轴坐标，相对于viewport，除去滚动。
- `screenX`:X轴坐标，相对于显示器屏幕。
- `screenY`:Y轴坐标，相对于显示器屏幕。
- `pageX`:X轴坐标，相对于HTML文档，包括滚动。
- `pageY`:Y轴坐标，相对于HTML文档，包括滚动。
- `target`:导致此事件发生的元素。
- `identifier`:事件的唯一内部ID。

## 四、多点触摸的奥秘

本文的重点在于此，虽然iOS中提供了`gesture event`，但是如果我们需要定制自己的手势，还要深入进行研究。touchevent有如下三个属性，记录了从手指接触屏幕，到离开屏幕的全部过程。

- `e.touches`:保存你每一个手指落到屏幕上导致的touch事件的信息。
- `e.targetTouches`:只保存手指落到同一个元素上导致的touch事件的信息。
- `e.changedTouches`:保存导致touch事件发生改变的touch事件信息

## 五、实例操作

看到这里你可能完全迷糊了，没关系，亲手体验一下下面的例子就明白这三个属性是如何协同工作的了，如果你使用iOS系统，可以使用手指操作下面的白色区域，仔细观察一下，就明白了。

<div id="toucheventsample" style="position:relative;width:100%;height:400px;background:white;border:1px solid #CCC;">
<div id="tracer" style="font-family:Helvetica;font-size:12px;position:absolute;top:15px;left:15px;color:red;"></div>
</div>
<script type="text/javascript">
        (function(){
            
            var uid = 0;
            
            function imageViewer( el ){
                var self = this;
                this.uid = ++uid;
                
                this.scale = 1.0;
                this.rotation = 0;
                this.element = el;
                this.wrapper = this.element.parentNode;
                this.element.addEventListener("touchstart",this,false);
                this.element.addEventListener("touchmove",this,false);
                this.element.addEventListener("touchend",this,false);
            }
            
            function toStr( e ){
                var s = '';
                for( var i=0,l=e.touches.length;i<l;i++ ){
                    s = s + "e.touches["+i+"](clientX,clientY)"+"("+e.touches[i].clientX+","+e.touches[i].clientY+")";
                    s = s + "<br/>";
                }
                s += "<hr/>"
                for( var i=0,l=e.targetTouches.length;i<l;i++ ){
                    s = s + "e.targetTouches["+i+"](clientX,clientY)"+"("+e.targetTouches[i].clientX+","+e.targetTouches[i].clientY+")";
                    s = s + "<br/>";
                }
                s += "<hr/>"
                for( var i=0,l=e.changedTouches.length;i<l;i++ ){
                    s = s + "e.changedTouches["+i+"](clientX,clientY)"+"("+e.changedTouches[i].clientX+","+e.changedTouches[i].clientY+")";
                    s = s + "<br/>";
                }
                return s;
            }
            function trace( e ){
                document.getElementById("tracer").innerHTML = "<b>"+e.type+"</b><hr/>"+toStr(e);
            }
            
            imageViewer.prototype = {
                handleEvent : function(e){
                    switch(e.type){
                        case "touchstart":
                            e.preventDefault();
                            trace(e);
                        break;
                        case "touchmove":
                            trace(e);
                        break;
                        case "touchend":
                            trace(e);
                        break;
                    }
                }
            }
            
            new imageViewer(document.getElementById('toucheventsample'));
        })();
        
        </script>
</div>
