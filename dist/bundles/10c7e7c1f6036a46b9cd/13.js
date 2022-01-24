(window.webpackJsonp=window.webpackJsonp||[]).push([[13],{1169:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=m(a(63)),r=m(a(0)),l=m(a(1)),i=p(a(18)),s=p(a(603)),o=m(a(3)),u=a(2);function p(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var a in e)Object.prototype.hasOwnProperty.call(e,a)&&(t[a]=e[a]);return t.default=e,t}function m(e){return e&&e.__esModule?e:{default:e}}t.default=r.default.createClass({displayName:"ImportE2eKeysDialog",propTypes:{matrixClient:l.default.instanceOf(i.MatrixClient).isRequired,onFinished:l.default.func.isRequired},getInitialState:function(){return{enableSubmit:!1,phase:1,errStr:null}},componentWillMount:function(){this._unmounted=!1},componentWillUnmount:function(){this._unmounted=!0},_onFormChange:function(e){var t=this.refs.file.files||[];this.setState({enableSubmit:""!==this.refs.passphrase.value&&t.length>0})},_onFormSubmit:function(e){return e.preventDefault(),this._startImport(this.refs.file.files[0],this.refs.passphrase.value),!1},_startImport:function(e,t){var a=this;return this.setState({errStr:null,phase:2}),function(e){return new n.default((function(t,a){var n=new FileReader;n.onload=function(e){t(e.target.result)},n.onerror=a,n.readAsArrayBuffer(e)}))}(e).then((function(e){return s.decryptMegolmKeyFile(e,t)})).then((function(e){return a.props.matrixClient.importRoomKeys(JSON.parse(e))})).then((function(){a.props.onFinished(!0)})).catch((function(e){if(console.error("Error importing e2e keys:",e),!a._unmounted){var t=e.friendlyText||(0,u._t)("Unknown error");a.setState({errStr:t,phase:1})}}))},_onCancelClick:function(e){return e.preventDefault(),this.props.onFinished(!1),!1},render:function(){var e=o.default.getComponent("views.dialogs.BaseDialog"),t=1!==this.state.phase;return r.default.createElement(e,{className:"mx_importE2eKeysDialog",onFinished:this.props.onFinished,title:(0,u._t)("Import room keys")},r.default.createElement("form",{onSubmit:this._onFormSubmit},r.default.createElement("div",{className:"mx_Dialog_content"},r.default.createElement("p",null,(0,u._t)("This process allows you to import encryption keys that you had previously exported from another Matrix client. You will then be able to decrypt any messages that the other client could decrypt.")),r.default.createElement("p",null,(0,u._t)("The export file will be protected with a passphrase. You should enter the passphrase here, to decrypt the file.")),r.default.createElement("div",{className:"error"},this.state.errStr),r.default.createElement("div",{className:"mx_E2eKeysDialog_inputTable"},r.default.createElement("div",{className:"mx_E2eKeysDialog_inputRow"},r.default.createElement("div",{className:"mx_E2eKeysDialog_inputLabel"},r.default.createElement("label",{htmlFor:"importFile"},(0,u._t)("File to import"))),r.default.createElement("div",{className:"mx_E2eKeysDialog_inputCell"},r.default.createElement("input",{ref:"file",id:"importFile",type:"file",autoFocus:!0,onChange:this._onFormChange,disabled:t}))),r.default.createElement("div",{className:"mx_E2eKeysDialog_inputRow"},r.default.createElement("div",{className:"mx_E2eKeysDialog_inputLabel"},r.default.createElement("label",{htmlFor:"passphrase"},(0,u._t)("Enter passphrase"))),r.default.createElement("div",{className:"mx_E2eKeysDialog_inputCell"},r.default.createElement("input",{ref:"passphrase",id:"passphrase",size:"64",type:"password",onChange:this._onFormChange,disabled:t}))))),r.default.createElement("div",{className:"mx_Dialog_buttons"},r.default.createElement("input",{className:"mx_Dialog_primary",type:"submit",value:(0,u._t)("Import"),disabled:!this.state.enableSubmit||t}),r.default.createElement("button",{onClick:this._onCancelClick,disabled:t},(0,u._t)("Cancel")))))}}),e.exports=t.default}}]);
//# sourceMappingURL=13.js.map