(window.webpackJsonp=window.webpackJsonp||[]).push([[1,17],{1151:function(e,t){e.exports=function(){throw new Error("define cannot be used indirect")}},258:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var s=h(a(63)),n=h(a(17)),r=a(13),o=h(a(0)),i=h(a(3)),l=h(a(9)),u=a(604),c=h(a(597)),d=a(2);function h(e){return e&&e.__esModule?e:{default:e}}var p,f,m,y,_=0,v=5;t.default=o.default.createClass({displayName:"CreateKeyBackupDialog",getInitialState:function(){return{phase:_,passPhrase:"",passPhraseConfirm:"",copied:!1,downloaded:!1,zxcvbnResult:null,setPassPhrase:!1}},componentWillMount:function(){this._recoveryKeyNode=null,this._keyBackupInfo=null,this._setZxcvbnResultTimeout=null},componentWillUnmount:function(){null!==this._setZxcvbnResultTimeout&&clearTimeout(this._setZxcvbnResultTimeout)},_collectRecoveryKeyNode:function(e){this._recoveryKeyNode=e},_onCopyClick:function(){!function(e){var t=document.createRange();t.selectNodeContents(e);var a=window.getSelection();a.removeAllRanges(),a.addRange(t)}(this._recoveryKeyNode),document.execCommand("copy")&&this.setState({copied:!0,phase:3})},_onDownloadClick:function(){var e=new Blob([this._keyBackupInfo.recovery_key],{type:"text/plain;charset=us-ascii"});c.default.saveAs(e,"recovery-key.txt"),this.setState({downloaded:!0,phase:3})},_createBackup:(y=(0,r.coroutine)(n.default.mark((function e(){var t;return n.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return this.setState({phase:4,error:null}),t=void 0,e.prev=2,e.next=5,(0,r.resolve)(l.default.get().createKeyBackupVersion(this._keyBackupInfo));case 5:return t=e.sent,e.next=8,(0,r.resolve)(l.default.get().scheduleAllGroupSessionsForBackup());case 8:this.setState({phase:v}),e.next=16;break;case 11:e.prev=11,e.t0=e.catch(2),console.log("Error creating key backup",e.t0),t&&l.default.get().deleteKeyBackupVersion(t.version),this.setState({error:e.t0});case 16:case"end":return e.stop()}}),e,this,[[2,11]])}))),function(){return y.apply(this,arguments)}),_onCancel:function(){this.props.onFinished(!1)},_onDone:function(){this.props.onFinished(!0)},_onOptOutClick:function(){this.setState({phase:6})},_onSetUpClick:function(){this.setState({phase:_})},_onSkipPassPhraseClick:(m=(0,r.coroutine)(n.default.mark((function e(){return n.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,(0,r.resolve)(l.default.get().prepareKeyBackupVersion());case 2:this._keyBackupInfo=e.sent,this.setState({copied:!1,downloaded:!1,phase:2});case 4:case"end":return e.stop()}}),e,this)}))),function(){return m.apply(this,arguments)}),_onPassPhraseNextClick:function(){this.setState({phase:1})},_onPassPhraseKeyPress:(f=(0,r.coroutine)(n.default.mark((function e(t){var a=this;return n.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if("Enter"!==t.key){e.next=7;break}if(null===this._setZxcvbnResultTimeout){e.next=6;break}return clearTimeout(this._setZxcvbnResultTimeout),this._setZxcvbnResultTimeout=null,e.next=6,(0,r.resolve)(new s.default((function(e){a.setState({zxcvbnResult:(0,u.scorePassword)(a.state.passPhrase)},e)})));case 6:this._passPhraseIsValid()&&this._onPassPhraseNextClick();case 7:case"end":return e.stop()}}),e,this)}))),function(e){return f.apply(this,arguments)}),_onPassPhraseConfirmNextClick:(p=(0,r.coroutine)(n.default.mark((function e(){return n.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,(0,r.resolve)(l.default.get().prepareKeyBackupVersion(this.state.passPhrase));case 2:this._keyBackupInfo=e.sent,this.setState({setPassPhrase:!0,copied:!1,downloaded:!1,phase:2});case 4:case"end":return e.stop()}}),e,this)}))),function(){return p.apply(this,arguments)}),_onPassPhraseConfirmKeyPress:function(e){"Enter"===e.key&&this.state.passPhrase===this.state.passPhraseConfirm&&this._onPassPhraseConfirmNextClick()},_onSetAgainClick:function(){this.setState({passPhrase:"",passPhraseConfirm:"",phase:_,zxcvbnResult:null})},_onKeepItSafeBackClick:function(){this.setState({phase:2})},_onPassPhraseChange:function(e){var t=this;this.setState({passPhrase:e.target.value}),null!==this._setZxcvbnResultTimeout&&clearTimeout(this._setZxcvbnResultTimeout),this._setZxcvbnResultTimeout=setTimeout((function(){t._setZxcvbnResultTimeout=null,t.setState({zxcvbnResult:(0,u.scorePassword)(t.state.passPhrase)})}),500)},_onPassPhraseConfirmChange:function(e){this.setState({passPhraseConfirm:e.target.value})},_passPhraseIsValid:function(){return this.state.zxcvbnResult&&this.state.zxcvbnResult.score>=4},_renderPhasePassPhrase:function(){var e=i.default.getComponent("views.elements.DialogButtons"),t=void 0,a=void 0;if(this.state.zxcvbnResult){if(this.state.zxcvbnResult.score>=4)a=(0,d._t)("Great! This passphrase looks strong enough.");else{for(var s=[],n=0;n<this.state.zxcvbnResult.feedback.suggestions.length;++n)s.push(o.default.createElement("div",{key:n},this.state.zxcvbnResult.feedback.suggestions[n]));var r=o.default.createElement("div",null,s.length>0?s:(0,d._t)("Keep going..."));a=o.default.createElement("div",null,this.state.zxcvbnResult.feedback.warning,r)}t=o.default.createElement("div",null,o.default.createElement("progress",{max:4,value:this.state.zxcvbnResult.score}))}return o.default.createElement("div",null,o.default.createElement("p",null,(0,d._t)("<b>Warning</b>: you should only set up key backup from a trusted computer.",{},{b:function(e){return o.default.createElement("b",null,e)}})),o.default.createElement("p",null,(0,d._t)("We'll store an encrypted copy of your keys on our server. Protect your backup with a passphrase to keep it secure.")),o.default.createElement("p",null,(0,d._t)("For maximum security, this should be different from your account password.")),o.default.createElement("div",{className:"mx_CreateKeyBackupDialog_primaryContainer"},o.default.createElement("div",{className:"mx_CreateKeyBackupDialog_passPhraseContainer"},o.default.createElement("input",{type:"password",onChange:this._onPassPhraseChange,onKeyPress:this._onPassPhraseKeyPress,value:this.state.passPhrase,className:"mx_CreateKeyBackupDialog_passPhraseInput",placeholder:(0,d._t)("Enter a passphrase..."),autoFocus:!0}),o.default.createElement("div",{className:"mx_CreateKeyBackupDialog_passPhraseHelp"},t,a))),o.default.createElement(e,{primaryButton:(0,d._t)("Next"),onPrimaryButtonClick:this._onPassPhraseNextClick,hasCancel:!1,disabled:!this._passPhraseIsValid()}),o.default.createElement("details",null,o.default.createElement("summary",null,(0,d._t)("Advanced")),o.default.createElement("p",null,o.default.createElement("button",{onClick:this._onSkipPassPhraseClick},(0,d._t)("Set up with a Recovery Key")))))},_renderPhasePassPhraseConfirm:function(){var e=i.default.getComponent("elements.AccessibleButton"),t=void 0;this.state.passPhraseConfirm===this.state.passPhrase?t=(0,d._t)("That matches!"):this.state.passPhrase.startsWith(this.state.passPhraseConfirm)||(t=(0,d._t)("That doesn't match."));var a=null;t&&(a=o.default.createElement("div",{className:"mx_CreateKeyBackupDialog_passPhraseMatch"},o.default.createElement("div",null,t),o.default.createElement("div",null,o.default.createElement(e,{element:"span",className:"mx_linkButton",onClick:this._onSetAgainClick},(0,d._t)("Go back to set it again.")))));var s=i.default.getComponent("views.elements.DialogButtons");return o.default.createElement("div",null,o.default.createElement("p",null,(0,d._t)("Please enter your passphrase a second time to confirm.")),o.default.createElement("div",{className:"mx_CreateKeyBackupDialog_primaryContainer"},o.default.createElement("div",{className:"mx_CreateKeyBackupDialog_passPhraseContainer"},o.default.createElement("div",null,o.default.createElement("input",{type:"password",onChange:this._onPassPhraseConfirmChange,onKeyPress:this._onPassPhraseConfirmKeyPress,value:this.state.passPhraseConfirm,className:"mx_CreateKeyBackupDialog_passPhraseInput",placeholder:(0,d._t)("Repeat your passphrase..."),autoFocus:!0})),a)),o.default.createElement(s,{primaryButton:(0,d._t)("Next"),onPrimaryButtonClick:this._onPassPhraseConfirmNextClick,hasCancel:!1,disabled:this.state.passPhrase!==this.state.passPhraseConfirm}))},_renderPhaseShowKey:function(){var e=void 0;return e=this.state.setPassPhrase?(0,d._t)("As a safety net, you can use it to restore your encrypted message history if you forget your Recovery Passphrase."):(0,d._t)("As a safety net, you can use it to restore your encrypted message history."),o.default.createElement("div",null,o.default.createElement("p",null,(0,d._t)("Your recovery key is a safety net - you can use it to restore access to your encrypted messages if you forget your passphrase.")),o.default.createElement("p",null,(0,d._t)("Keep your recovery key somewhere very secure, like a password manager (or a safe)")),o.default.createElement("p",null,e),o.default.createElement("div",{className:"mx_CreateKeyBackupDialog_primaryContainer"},o.default.createElement("div",{className:"mx_CreateKeyBackupDialog_recoveryKeyHeader"},(0,d._t)("Your Recovery Key")),o.default.createElement("div",{className:"mx_CreateKeyBackupDialog_recoveryKeyContainer"},o.default.createElement("div",{className:"mx_CreateKeyBackupDialog_recoveryKey"},o.default.createElement("code",{ref:this._collectRecoveryKeyNode},this._keyBackupInfo.recovery_key)),o.default.createElement("div",{className:"mx_CreateKeyBackupDialog_recoveryKeyButtons"},o.default.createElement("button",{className:"mx_Dialog_primary",onClick:this._onCopyClick},(0,d._t)("Copy to clipboard")),o.default.createElement("button",{className:"mx_Dialog_primary",onClick:this._onDownloadClick},(0,d._t)("Download"))))))},_renderPhaseKeepItSafe:function(){var e=void 0;this.state.copied?e=(0,d._t)("Your Recovery Key has been <b>copied to your clipboard</b>, paste it to:",{},{b:function(e){return o.default.createElement("b",null,e)}}):this.state.downloaded&&(e=(0,d._t)("Your Recovery Key is in your <b>Downloads</b> folder.",{},{b:function(e){return o.default.createElement("b",null,e)}}));var t=i.default.getComponent("views.elements.DialogButtons");return o.default.createElement("div",null,e,o.default.createElement("ul",null,o.default.createElement("li",null,(0,d._t)("<b>Print it</b> and store it somewhere safe",{},{b:function(e){return o.default.createElement("b",null,e)}})),o.default.createElement("li",null,(0,d._t)("<b>Save it</b> on a USB key or backup drive",{},{b:function(e){return o.default.createElement("b",null,e)}})),o.default.createElement("li",null,(0,d._t)("<b>Copy it</b> to your personal cloud storage",{},{b:function(e){return o.default.createElement("b",null,e)}}))),o.default.createElement(t,{primaryButton:(0,d._t)("OK"),onPrimaryButtonClick:this._createBackup,hasCancel:!1},o.default.createElement("button",{onClick:this._onKeepItSafeBackClick},(0,d._t)("Back"))))},_renderBusyPhase:function(e){var t=i.default.getComponent("views.elements.Spinner");return o.default.createElement("div",null,o.default.createElement(t,null))},_renderPhaseDone:function(){var e=i.default.getComponent("views.elements.DialogButtons");return o.default.createElement("div",null,o.default.createElement("p",null,(0,d._t)("Your keys are being backed up (the first backup could take a few minutes).")),o.default.createElement(e,{primaryButton:(0,d._t)("Okay"),onPrimaryButtonClick:this._onDone,hasCancel:!1}))},_renderPhaseOptOutConfirm:function(){var e=i.default.getComponent("views.elements.DialogButtons");return o.default.createElement("div",null,(0,d._t)("Without setting up Secure Message Recovery, you won't be able to restore your encrypted message history if you log out or use another device."),o.default.createElement(e,{primaryButton:(0,d._t)("Set up Secure Message Recovery"),onPrimaryButtonClick:this._onSetUpClick,hasCancel:!1},o.default.createElement("button",{onClick:this._onCancel},"I understand, continue without")))},_titleForPhase:function(e){switch(e){case _:return(0,d._t)("Secure your backup with a passphrase");case 1:return(0,d._t)("Confirm your passphrase");case 6:return(0,d._t)("Warning!");case 2:return(0,d._t)("Recovery key");case 3:return(0,d._t)("Keep it safe");case 4:return(0,d._t)("Starting backup...");case v:return(0,d._t)("Success!");default:return(0,d._t)("Create Key Backup")}},render:function(){var e=i.default.getComponent("views.dialogs.BaseDialog"),t=void 0;if(this.state.error){var a=i.default.getComponent("views.elements.DialogButtons");t=o.default.createElement("div",null,o.default.createElement("p",null,(0,d._t)("Unable to create key backup")),o.default.createElement("div",{className:"mx_Dialog_buttons"},o.default.createElement(a,{primaryButton:(0,d._t)("Retry"),onPrimaryButtonClick:this._createBackup,hasCancel:!0,onCancel:this._onCancel})))}else switch(this.state.phase){case _:t=this._renderPhasePassPhrase();break;case 1:t=this._renderPhasePassPhraseConfirm();break;case 2:t=this._renderPhaseShowKey();break;case 3:t=this._renderPhaseKeepItSafe();break;case 4:t=this._renderBusyPhase();break;case v:t=this._renderPhaseDone();break;case 6:t=this._renderPhaseOptOutConfirm()}return o.default.createElement(e,{className:"mx_CreateKeyBackupDialog",onFinished:this.props.onFinished,title:this._titleForPhase(this.state.phase),hasCancel:[_,v].includes(this.state.phase)},o.default.createElement("div",null,t))}}),e.exports=t.default},597:function(e,t,a){var s,n=n||function(e){"use strict";if(!(void 0===e||"undefined"!=typeof navigator&&/MSIE [1-9]\./.test(navigator.userAgent))){var t=e.document,a=function(){return e.URL||e.webkitURL||e},s=t.createElementNS("http://www.w3.org/1999/xhtml","a"),n="download"in s,r=/constructor/i.test(e.HTMLElement)||e.safari,o=/CriOS\/[\d]+/.test(navigator.userAgent),i=function(t){(e.setImmediate||e.setTimeout)((function(){throw t}),0)},l=function(e){setTimeout((function(){"string"==typeof e?a().revokeObjectURL(e):e.remove()}),4e4)},u=function(e){return/^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(e.type)?new Blob([String.fromCharCode(65279),e],{type:e.type}):e},c=function(t,c,d){d||(t=u(t));var h,p=this,f="application/octet-stream"===t.type,m=function(){!function(e,t,a){for(var s=(t=[].concat(t)).length;s--;){var n=e["on"+t[s]];if("function"==typeof n)try{n.call(e,a||e)}catch(e){i(e)}}}(p,"writestart progress write writeend".split(" "))};if(p.readyState=p.INIT,n)return h=a().createObjectURL(t),void setTimeout((function(){var e,t;s.href=h,s.download=c,e=s,t=new MouseEvent("click"),e.dispatchEvent(t),m(),l(h),p.readyState=p.DONE}));!function(){if((o||f&&r)&&e.FileReader){var s=new FileReader;return s.onloadend=function(){var t=o?s.result:s.result.replace(/^data:[^;]*;/,"data:attachment/file;");e.open(t,"_blank")||(e.location.href=t),t=void 0,p.readyState=p.DONE,m()},s.readAsDataURL(t),void(p.readyState=p.INIT)}(h||(h=a().createObjectURL(t)),f)?e.location.href=h:e.open(h,"_blank")||(e.location.href=h);p.readyState=p.DONE,m(),l(h)}()},d=c.prototype;return"undefined"!=typeof navigator&&navigator.msSaveOrOpenBlob?function(e,t,a){return t=t||e.name||"download",a||(e=u(e)),navigator.msSaveOrOpenBlob(e,t)}:(d.abort=function(){},d.readyState=d.INIT=0,d.WRITING=1,d.DONE=2,d.error=d.onwritestart=d.onprogress=d.onwrite=d.onabort=d.onerror=d.onwriteend=null,function(e,t,a){return new c(e,t||e.name||"download",a)})}}("undefined"!=typeof self&&self||"undefined"!=typeof window&&window||this.content);
/*! @source http://purl.eligrey.com/github/FileSaver.js/blob/master/FileSaver.js */e.exports?e.exports.saveAs=n:null!==a(1151)&&null!==a(606)&&(void 0===(s=function(){return n}.call(t,a,t,e))||(e.exports=s))},604:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.scorePassword=function(e){if(0===e.length)return null;var t=i.slice();n.default.get()&&t.push(n.default.get().getUserIdLocalpart());var a=(0,s.default)(e,t);if(e.includes(" ")){var o=(0,s.default)(e.replace(/ /g,""),t);o.score<a.score&&(a=o)}for(var l=0;l<a.feedback.suggestions.length;++l)a.feedback.suggestions[l]=(0,r._t)(a.feedback.suggestions[l]);a.feedback.warning&&(a.feedback.warning=(0,r._t)(a.feedback.warning));return a};var s=o(a(1152)),n=o(a(9)),r=a(2);function o(e){return e&&e.__esModule?e:{default:e}}var i=["riot","matrix"];(0,r._td)("Use a few words, avoid common phrases"),(0,r._td)("No need for symbols, digits, or uppercase letters"),(0,r._td)("Use a longer keyboard pattern with more turns"),(0,r._td)("Avoid repeated words and characters"),(0,r._td)("Avoid sequences"),(0,r._td)("Avoid recent years"),(0,r._td)("Avoid years that are associated with you"),(0,r._td)("Avoid dates and years that are associated with you"),(0,r._td)("Capitalization doesn't help very much"),(0,r._td)("All-uppercase is almost as easy to guess as all-lowercase"),(0,r._td)("Reversed words aren't much harder to guess"),(0,r._td)("Predictable substitutions like '@' instead of 'a' don't help very much"),(0,r._td)("Add another word or two. Uncommon words are better."),(0,r._td)('Repeats like "aaa" are easy to guess'),(0,r._td)('Repeats like "abcabcabc" are only slightly harder to guess than "abc"'),(0,r._td)("Sequences like abc or 6543 are easy to guess"),(0,r._td)("Recent years are easy to guess"),(0,r._td)("Dates are often easy to guess"),(0,r._td)("This is a top-10 common password"),(0,r._td)("This is a top-100 common password"),(0,r._td)("This is a very common password"),(0,r._td)("This is similar to a commonly used password"),(0,r._td)("A word by itself is easy to guess"),(0,r._td)("Names and surnames by themselves are easy to guess"),(0,r._td)("Common names and surnames are easy to guess"),(0,r._td)("Straight rows of keys are easy to guess"),(0,r._td)("Short keyboard patterns are easy to guess")}}]);
//# sourceMappingURL=1.js.map