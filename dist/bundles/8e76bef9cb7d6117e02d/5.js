(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{445:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=f(r(17)),a=f(r(22)),o=r(13),s=f(o),i=f(r(1262)),u=f(r(9)),p=f(r(86)),d=r(2),c=f(r(444)),l=function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&(t[r]=e[r]);return t.default=e,t}(r(672));function f(e){return e&&e.__esModule?e:{default:e}}var v,w=window.TextEncoder;function g(e,t,r){var n=s.default.defer(),a=new XMLHttpRequest;return a.open("POST",e),a.timeout=3e5,a.onreadystatechange=function(){a.readyState===XMLHttpRequest.LOADING?r((0,d._t)("Waiting for response from server")):a.readyState===XMLHttpRequest.DONE&&function(){if(a.status<200||a.status>=400)return void n.reject(new Error("HTTP "+a.status));n.resolve()}()},a.send(t),n.promise}w||(w=l.TextEncoder),t.default=(v=(0,o.coroutine)(n.default.mark((function e(t,r){var s,l,f,v,x,b,h,_,k,y,N,O,m,L;return n.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t){e.next=2;break}throw new Error("No bug report endpoint has been set.");case 2:return(s=(r=r||{}).progressCallback||function(){})((0,d._t)("Collecting app version information")),l="UNKNOWN",e.prev=6,e.next=9,(0,o.resolve)(p.default.get().getAppVersion());case 9:l=e.sent,e.next=14;break;case 12:e.prev=12,e.t0=e.catch(6);case 14:if(f="UNKNOWN",window.navigator&&window.navigator.userAgent&&(f=window.navigator.userAgent),v=u.default.get(),console.log("Sending bug report."),(x=new FormData).append("text",r.userText||"User did not supply any additional text."),x.append("app","riot-web"),x.append("version",l),x.append("user_agent",f),v&&(x.append("user_id",v.credentials.userId),x.append("device_id",v.deviceId)),!r.sendLogs){e.next=48;break}return s((0,d._t)("Collecting logs")),e.next=28,(0,o.resolve)(c.default.getLogsForReport());case 28:for(b=e.sent,h=!0,_=!1,k=void 0,e.prev=32,y=(0,a.default)(b);!(h=(N=y.next()).done);h=!0)O=N.value,m=(new w).encode(O.lines),L=i.default.gzip(m),x.append("compressed-log",new Blob([L]),O.id);e.next=40;break;case 36:e.prev=36,e.t1=e.catch(32),_=!0,k=e.t1;case 40:e.prev=40,e.prev=41,!h&&y.return&&y.return();case 43:if(e.prev=43,!_){e.next=46;break}throw k;case 46:return e.finish(43);case 47:return e.finish(40);case 48:return s((0,d._t)("Uploading report")),e.next=51,(0,o.resolve)(g(t,x,s));case 51:case"end":return e.stop()}}),e,this,[[6,12],[32,36,40,48],[41,,43,47]])}))),function(e,t){return v.apply(this,arguments)}),e.exports=t.default}}]);
//# sourceMappingURL=5.js.map