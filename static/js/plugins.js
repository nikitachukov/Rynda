// usage: log('inside coolFunc', this, arguments);
// paulirish.com/2009/log-a-lightweight-wrapper-for-consolelog/
window.log = function f(){ log.history = log.history || []; log.history.push(arguments); if(this.console) { var args = arguments, newarr; args.callee = args.callee.caller; newarr = [].slice.call(args); if (typeof console.log === 'object') log.apply.call(console.log, console, newarr); else console.log.apply(console, newarr);}};

// make it safe to use console.log always
(function(a){function b(){}for(var c="assert,count,debug,dir,dirxml,error,exception,group,groupCollapsed,groupEnd,info,log,markTimeline,profile,profileEnd,time,timeEnd,trace,warn".split(","),d;!!(d=c.pop());){a[d]=a[d]||b;}})
(function(){try{console.log();return window.console;}catch(a){return (window.console={});}}());


// place any jQuery/helper plugins in here, instead of separate, slower script files.
//Autocomplete
(function(n){"use strict";function t(i,r){var u=this,f={serviceUrl:null,lookup:null,onSelect:null,width:"auto",minChars:1,maxHeight:300,deferRequestBy:0,params:{},formatResult:t.formatResult,delimiter:null,zIndex:9999,type:"GET",noCache:!1};u.element=i,u.el=n(i),u.suggestions=[],u.badQueries=[],u.selectedIndex=-1,u.currentValue=u.element.value,u.intervalId=0,u.cachedResponse=[],u.onChangeInterval=null,u.onChange=null,u.ignoreValueChange=!1,u.isLocal=!1,u.suggestionsContainer=null,u.options=f,u.classes={selected:"autocomplete-selected",suggestion:"autocomplete-suggestion"},u.initialize(),u.setOptions(r)}var i=function(){return{extend:function(t,i){return n.extend(t,i)},addEvent:function(n,t,i){if(n.addEventListener)n.addEventListener(t,i,!1);else if(n.attachEvent)n.attachEvent("on"+t,i);else throw new Error("Browser doesn't support addEventListener or attachEvent");},removeEvent:function(n,t,i){n.removeEventListener?n.removeEventListener(t,i,!1):n.detachEvent&&n.detachEvent("on"+t,i)},createNode:function(n){var t=document.createElement("div");return t.innerHTML=n,t.firstChild}}}();t.utils=i,n.Autocomplete=t,t.formatResult=function(n,t){var i=new RegExp("(\\/|\\.|\\*|\\+|\\?|\\||\\(|\\)|\\[|\\]|\\{|\\}|\\\\)","g"),r="("+t.replace(i,"\\$1")+")";return n.value.replace(new RegExp(r,"gi"),"<strong>$1<\/strong>")},t.prototype={killerFn:null,initialize:function(){var i=this,u="."+i.classes.suggestion,r;this.element.setAttribute("autocomplete","off"),this.killerFn=function(t){n(t.target).closest(".autocomplete").length===0&&(i.killSuggestions(),i.disableKillerFn())},this.options.width&&this.options.width!=="auto"||(this.options.width=this.el.outerWidth()),this.suggestionsContainer=t.utils.createNode('<div class="autocomplete-suggestions" style="position: absolute; display: none;"><\/div>'),r=n(this.suggestionsContainer),r.appendTo("body").width(this.options.width);r.on("mouseover",u,function(){i.activate(n(this).data("index"))});r.on("click",u,function(){i.select(n(this).data("index"))});if(this.fixPosition(),window.opera)this.el.on("keypress",function(n){i.onKeyPress(n)});else this.el.on("keydown",function(n){i.onKeyPress(n)});this.el.on("keyup",function(n){i.onKeyUp(n)});this.el.on("blur",function(){i.onBlur()});this.el.on("focus",function(){i.fixPosition()})},onBlur:function(){this.enableKillerFn()},setOptions:function(t){var r=this.options;i.extend(r,t),this.isLocal=n.isArray(r.lookup),this.isLocal&&(r.lookup=this.verifySuggestionsFormat(r.lookup)),n(this.suggestionsContainer).css({"max-height":r.maxHeight+"px",width:r.width+"px","z-index":r.zIndex})},clearCache:function(){this.cachedResponse=[],this.badQueries=[]},disable:function(){this.disabled=!0},enable:function(){this.disabled=!1},fixPosition:function(){var t=this.el.offset();n(this.suggestionsContainer).css({top:t.top+this.el.outerHeight()+"px",left:t.left+"px"})},enableKillerFn:function(){var t=this;n(document).on("click",t.killerFn)},disableKillerFn:function(){var t=this;n(document).off("click",t.killerFn)},killSuggestions:function(){var n=this;n.stopKillSuggestions(),n.intervalId=window.setInterval(function(){n.hide(),n.stopKillSuggestions()},300)},stopKillSuggestions:function(){window.clearInterval(this.intervalId)},onKeyPress:function(n){if(!this.disabled&&!this.visible&&n.keyCode===40&&this.currentValue){this.suggest();return}if(!this.disabled&&this.visible){switch(n.keyCode){case 27:this.el.val(this.currentValue),this.hide();break;case 9:case 13:if(this.selectedIndex===-1){this.hide();return}if(this.select(this.selectedIndex),n.keyCode===9)return;break;case 38:this.moveUp();break;case 40:this.moveDown();break;default:return}n.stopImmediatePropagation(),n.preventDefault()}},onKeyUp:function(n){if(!this.disabled){switch(n.keyCode){case 38:case 40:return}var t=this;clearInterval(t.onChangeInterval),t.currentValue!==t.el.val()&&(t.options.deferRequestBy>0?t.onChangeInterval=setInterval(function(){t.onValueChange()},t.options.deferRequestBy):t.onValueChange())}},onValueChange:function(){clearInterval(this.onChangeInterval),this.currentValue=this.element.value;var n=this.getQuery(this.currentValue);if(this.selectedIndex=-1,this.ignoreValueChange){this.ignoreValueChange=!1;return}n===""||n.length<this.options.minChars?this.hide():this.getSuggestions(n)},getQuery:function(t){var r=this.options.delimiter,i;return r?(i=t.split(r),n.trim(i[i.length-1])):n.trim(t)},getSuggestionsLocal:function(t){return t=t.toLowerCase(),{suggestions:n.grep(this.options.lookup,function(n){return n.value.toLowerCase().indexOf(t)!==-1})}},getSuggestions:function(t){var r,i=this,u=i.options;r=i.isLocal?i.getSuggestionsLocal(t):i.cachedResponse[t],r&&n.isArray(r.suggestions)?(i.suggestions=r.suggestions,i.suggest()):i.isBadQuery(t)||(i.options.params.query=t,n.ajax({url:u.serviceUrl,data:u.params,type:u.type,dataType:"text"}).done(function(n){i.processResponse(n)}))},isBadQuery:function(n){for(var t=this.badQueries,i=t.length;i--;)if(n.indexOf(t[i])===0)return!0;return!1},hide:function(){this.visible=!1,this.selectedIndex=-1,n(this.suggestionsContainer).hide()},suggest:function(){if(this.suggestions.length===0){this.hide();return}var r=this.options.formatResult,u=this.getQuery(this.currentValue),f=this.classes.suggestion,e=this.classes.selected,t=n(this.suggestionsContainer),i="";n.each(this.suggestions,function(n,t){i+='<div class="'+f+'" data-index="'+n+'">'+r(t,u)+"<\/div>"}),t.html(i).show(),this.visible=!0,this.selectedIndex=0,t.children().first().addClass(e)},verifySuggestionsFormat:function(t){return t.length&&typeof t[0]=="string"?n.map(t,function(n){return{value:n,data:null}}):t},processResponse:function(t){var i=n.parseJSON(t);i.suggestions=this.verifySuggestionsFormat(i.suggestions),this.options.noCache||(this.cachedResponse[i.query]=i,i.suggestions.length===0&&this.badQueries.push(i.query)),i.query===this.getQuery(this.currentValue)&&(this.suggestions=i.suggestions,this.suggest())},activate:function(t){var i,r=this.classes.selected,u=n(this.suggestionsContainer),f=u.children();return(u.children("."+r).removeClass(r),this.selectedIndex=t,this.selectedIndex!==-1&&f.length>this.selectedIndex)?(i=f.get(this.selectedIndex),n(i).addClass(r),i):null},select:function(n){var t=this.suggestions[n];if(t){this.el.val(t),this.ignoreValueChange=!0,this.hide();this.onSelect(n)}},moveUp:function(){if(this.selectedIndex!==-1){if(this.selectedIndex===0){n(this.suggestionsContainer).children().first().removeClass(this.classes.selected),this.selectedIndex=-1,this.el.val(this.currentValue);return}this.adjustScroll(this.selectedIndex-1)}},moveDown:function(){this.selectedIndex!==this.suggestions.length-1&&this.adjustScroll(this.selectedIndex+1)},adjustScroll:function(t){var u=this.activate(t),i,r,f,e=25;u&&(i=u.offsetTop,r=n(this.suggestionsContainer).scrollTop(),f=r+this.options.maxHeight-e,i<r?n(this.suggestionsContainer).scrollTop(i):i>f&&n(this.suggestionsContainer).scrollTop(i-this.options.maxHeight+e),this.el.val(this.getValue(this.suggestions[t].value)))},onSelect:function(t){var i=this,r=i.options.onSelect,u=i.suggestions[t];i.el.val(i.getValue(u.value)),n.isFunction(r)&&r.call(i.element,u)},getValue:function(n){var r=this,u=r.options.delimiter,t,i;return u?(t=r.currentValue,i=t.split(u),i.length===1)?n:t.substr(0,t.length-i[i.length-1].length)+n:n}},n.fn.autocomplete=function(i,r){return this.each(function(){var f="autocomplete",e=n(this),u;typeof i=="string"?(u=e.data(f),typeof u[i]=="function"&&u[i](r)):(u=new t(this,i),e.data(f,u))})}})(jQuery);

