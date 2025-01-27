/*!
 * jQuery UI Spinner 1.13.2
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */
!function(t){"use strict";"function"==typeof define&&define.amd?define(["jquery","./button","../version","../keycode","../safe-active-element","../widget"],t):t(jQuery)}((function(t){"use strict";function i(t){return function(){var i=this.element.val();t.apply(this,arguments),this._refresh(),i!==this.element.val()&&this._trigger("change")}}return t.widget("ui.spinner",{version:"1.13.2",defaultElement:"<input>",widgetEventPrefix:"spin",options:{classes:{"ui-spinner":"ui-corner-all","ui-spinner-down":"ui-corner-br","ui-spinner-up":"ui-corner-tr"},culture:null,icons:{down:"ui-icon-triangle-1-s",up:"ui-icon-triangle-1-n"},incremental:!0,max:null,min:null,numberFormat:null,page:10,step:1,change:null,spin:null,start:null,stop:null},_create:function(){this._setOption("max",this.options.max),this._setOption("min",this.options.min),this._setOption("step",this.options.step),""!==this.value()&&this._value(this.element.val(),!0),this._draw(),this._on(this._events),this._refresh(),this._on(this.window,{beforeunload:function(){this.element.removeAttr("autocomplete")}})},_getCreateOptions:function(){var i=this._super(),n=this.element;return t.each(["min","max","step"],(function(t,e){var s=n.attr(e);null!=s&&s.length&&(i[e]=s)})),i},_events:{keydown:function(t){this._start(t)&&this._keydown(t)&&t.preventDefault()},keyup:"_stop",focus:function(){this.previous=this.element.val()},blur:function(t){this.cancelBlur?delete this.cancelBlur:(this._stop(),this._refresh(),this.previous!==this.element.val()&&this._trigger("change",t))},mousewheel:function(i,n){var e=t.ui.safeActiveElement(this.document[0]);if(this.element[0]===e&&n){if(!this.spinning&&!this._start(i))return!1;this._spin((n>0?1:-1)*this.options.step,i),clearTimeout(this.mousewheelTimer),this.mousewheelTimer=this._delay((function(){this.spinning&&this._stop(i)}),100),i.preventDefault()}},"mousedown .ui-spinner-button":function(i){var n;function e(){this.element[0]===t.ui.safeActiveElement(this.document[0])||(this.element.trigger("focus"),this.previous=n,this._delay((function(){this.previous=n})))}n=this.element[0]===t.ui.safeActiveElement(this.document[0])?this.previous:this.element.val(),i.preventDefault(),e.call(this),this.cancelBlur=!0,this._delay((function(){delete this.cancelBlur,e.call(this)})),!1!==this._start(i)&&this._repeat(null,t(i.currentTarget).hasClass("ui-spinner-up")?1:-1,i)},"mouseup .ui-spinner-button":"_stop","mouseenter .ui-spinner-button":function(i){if(t(i.currentTarget).hasClass("ui-state-active"))return!1!==this._start(i)&&void this._repeat(null,t(i.currentTarget).hasClass("ui-spinner-up")?1:-1,i)},"mouseleave .ui-spinner-button":"_stop"},_enhance:function(){this.uiSpinner=this.element.attr("autocomplete","off").wrap("<span>").parent().append("<a></a><a></a>")},_draw:function(){this._enhance(),this._addClass(this.uiSpinner,"ui-spinner","ui-widget ui-widget-content"),this._addClass("ui-spinner-input"),this.element.attr("role","spinbutton"),this.buttons=this.uiSpinner.children("a").attr("tabIndex",-1).attr("aria-hidden",!0).button({classes:{"ui-button":""}}),this._removeClass(this.buttons,"ui-corner-all"),this._addClass(this.buttons.first(),"ui-spinner-button ui-spinner-up"),this._addClass(this.buttons.last(),"ui-spinner-button ui-spinner-down"),this.buttons.first().button({icon:this.options.icons.up,showLabel:!1}),this.buttons.last().button({icon:this.options.icons.down,showLabel:!1}),this.buttons.height()>Math.ceil(.5*this.uiSpinner.height())&&this.uiSpinner.height()>0&&this.uiSpinner.height(this.uiSpinner.height())},_keydown:function(i){var n=this.options,e=t.ui.keyCode;switch(i.keyCode){case e.UP:return this._repeat(null,1,i),!0;case e.DOWN:return this._repeat(null,-1,i),!0;case e.PAGE_UP:return this._repeat(null,n.page,i),!0;case e.PAGE_DOWN:return this._repeat(null,-n.page,i),!0}return!1},_start:function(t){return!(!this.spinning&&!1===this._trigger("start",t))&&(this.counter||(this.counter=1),this.spinning=!0,!0)},_repeat:function(t,i,n){t=t||500,clearTimeout(this.timer),this.timer=this._delay((function(){this._repeat(40,i,n)}),t),this._spin(i*this.options.step,n)},_spin:function(t,i){var n=this.value()||0;this.counter||(this.counter=1),n=this._adjustValue(n+t*this._increment(this.counter)),this.spinning&&!1===this._trigger("spin",i,{value:n})||(this._value(n),this.counter++)},_increment:function(t){var i=this.options.incremental;return i?"function"==typeof i?i(t):Math.floor(t*t*t/5e4-t*t/500+17*t/200+1):1},_precision:function(){var t=this._precisionOf(this.options.step);return null!==this.options.min&&(t=Math.max(t,this._precisionOf(this.options.min))),t},_precisionOf:function(t){var i=t.toString(),n=i.indexOf(".");return-1===n?0:i.length-n-1},_adjustValue:function(t){var i,n,e=this.options;return n=t-(i=null!==e.min?e.min:0),t=i+(n=Math.round(n/e.step)*e.step),t=parseFloat(t.toFixed(this._precision())),null!==e.max&&t>e.max?e.max:null!==e.min&&t<e.min?e.min:t},_stop:function(t){this.spinning&&(clearTimeout(this.timer),clearTimeout(this.mousewheelTimer),this.counter=0,this.spinning=!1,this._trigger("stop",t))},_setOption:function(t,i){var n,e,s;if("culture"===t||"numberFormat"===t)return n=this._parse(this.element.val()),this.options[t]=i,void this.element.val(this._format(n));"max"!==t&&"min"!==t&&"step"!==t||"string"==typeof i&&(i=this._parse(i)),"icons"===t&&(e=this.buttons.first().find(".ui-icon"),this._removeClass(e,null,this.options.icons.up),this._addClass(e,null,i.up),s=this.buttons.last().find(".ui-icon"),this._removeClass(s,null,this.options.icons.down),this._addClass(s,null,i.down)),this._super(t,i)},_setOptionDisabled:function(t){this._super(t),this._toggleClass(this.uiSpinner,null,"ui-state-disabled",!!t),this.element.prop("disabled",!!t),this.buttons.button(t?"disable":"enable")},_setOptions:i((function(t){this._super(t)})),_parse:function(t){return"string"==typeof t&&""!==t&&(t=window.Globalize&&this.options.numberFormat?Globalize.parseFloat(t,10,this.options.culture):+t),""===t||isNaN(t)?null:t},_format:function(t){return""===t?"":window.Globalize&&this.options.numberFormat?Globalize.format(t,this.options.numberFormat,this.options.culture):t},_refresh:function(){this.element.attr({"aria-valuemin":this.options.min,"aria-valuemax":this.options.max,"aria-valuenow":this._parse(this.element.val())})},isValid:function(){var t=this.value();return null!==t&&t===this._adjustValue(t)},_value:function(t,i){var n;""!==t&&null!==(n=this._parse(t))&&(i||(n=this._adjustValue(n)),t=this._format(n)),this.element.val(t),this._refresh()},_destroy:function(){this.element.prop("disabled",!1).removeAttr("autocomplete role aria-valuemin aria-valuemax aria-valuenow"),this.uiSpinner.replaceWith(this.element)},stepUp:i((function(t){this._stepUp(t)})),_stepUp:function(t){this._start()&&(this._spin((t||1)*this.options.step),this._stop())},stepDown:i((function(t){this._stepDown(t)})),_stepDown:function(t){this._start()&&(this._spin((t||1)*-this.options.step),this._stop())},pageUp:i((function(t){this._stepUp((t||1)*this.options.page)})),pageDown:i((function(t){this._stepDown((t||1)*this.options.page)})),value:function(t){if(!arguments.length)return this._parse(this.element.val());i(this._value).call(this,t)},widget:function(){return this.uiSpinner}}),!1!==t.uiBackCompat&&t.widget("ui.spinner",t.ui.spinner,{_enhance:function(){this.uiSpinner=this.element.attr("autocomplete","off").wrap(this._uiSpinnerHtml()).parent().append(this._buttonHtml())},_uiSpinnerHtml:function(){return"<span>"},_buttonHtml:function(){return"<a></a><a></a>"}}),t.ui.spinner}));
//# sourceMappingURL=spinner-min.js.map