var t=function(n,e){return this instanceof t?n instanceof t?n:((n="string"==typeof n?this.select(n,e):n)&&n.nodeName&&(n=[n]),void(this.nodes=this.slice(n))):new t(n,e)};t.prototype={get length(){return this.nodes.length}},t.prototype.nodes=[],t.prototype.addClass=function(){return this.eacharg(arguments,(function(t,n){t.classList.add(n)}))},t.prototype.adjacent=function(n,e,r){return"number"==typeof e&&(e=0===e?[]:new Array(e).join().split(",").map(Number.call,Number)),this.each((function(o,i){var s=document.createDocumentFragment();t(e||{}).map((function(e,r){return"string"==typeof(r="function"==typeof n?n.call(this,e,r,o,i):n)?this.generate(r):t(r)})).each((function(n){this.isInPage(n)?s.appendChild(t(n).clone().first()):s.appendChild(n)})),r.call(this,o,s)}))},t.prototype.after=function(t,n){return this.adjacent(t,n,(function(t,n){t.parentNode.insertBefore(n,t.nextSibling)}))},t.prototype.append=function(t,n){return this.adjacent(t,n,(function(t,n){t.appendChild(n)}))},t.prototype.args=function(t,n,e){return(t="string"!=typeof(t="function"==typeof t?t(n,e):t)?this.slice(t).map(this.str(n,e)):t).toString().split(/[\s,]+/).filter((function(t){return t.length}))},t.prototype.array=function(n){var e=this;return this.nodes.reduce((function(r,o,i){var s;return n?(s="string"==typeof(s=(s=n.call(e,o,i))||!1)?t(s):s)instanceof t&&(s=s.nodes):s=o.innerHTML,r.concat(!1!==s?s:[])}),[])},t.prototype.attr=function(t,n,e){return e=e?"data-":"",this.pairs(t,n,(function(t,n){return t.getAttribute(e+n)}),(function(t,n,r){r?t.setAttribute(e+n,r):t.removeAttribute(e+n)}))},t.prototype.before=function(t,n){return this.adjacent(t,n,(function(t,n){t.parentNode.insertBefore(n,t)}))},t.prototype.children=function(t){return this.map((function(t){return this.slice(t.children)})).filter(t)},t.prototype.clone=function(){return this.map((function(t,n){var e=t.cloneNode(!0),r=this.getAll(e);return this.getAll(t).each((function(t,n){for(var e in this.mirror)this.mirror[e]&&this.mirror[e](t,r.nodes[n])})),e}))},t.prototype.getAll=function(n){return t([n].concat(t("*",n).nodes))},t.prototype.mirror={},t.prototype.mirror.events=function(n,e){if(n._e)for(var r in n._e)n._e[r].forEach((function(n){t(e).on(r,n.callback)}))},t.prototype.mirror.select=function(n,e){t(n).is("select")&&(e.value=n.value)},t.prototype.mirror.textarea=function(n,e){t(n).is("textarea")&&(e.value=n.value)},t.prototype.closest=function(n){return this.map((function(e){do{if(t(e).is(n))return e}while((e=e.parentNode)&&e!==document)}))},t.prototype.data=function(t,n){return this.attr(t,n,!0)},t.prototype.each=function(t){return this.nodes.forEach(t.bind(this)),this},t.prototype.eacharg=function(t,n){return this.each((function(e,r){this.args(t,e,r).forEach((function(t){n.call(this,e,t)}),this)}))},t.prototype.empty=function(){return this.each((function(t){for(;t.firstChild;)t.removeChild(t.firstChild)}))},t.prototype.filter=function(n){var e=n instanceof t?function(t){return-1!==n.nodes.indexOf(t)}:"function"==typeof n?n:function(t){return t.matches=t.matches||t.msMatchesSelector||t.webkitMatchesSelector,t.matches(n||"*")};return t(this.nodes.filter(e))},t.prototype.find=function(n){return this.map((function(e){return t(n||"*",e)}))},t.prototype.first=function(){return this.nodes[0]||!1},t.prototype.generate=function(n){return/^\s*<tr[> ]/.test(n)?t(document.createElement("table")).html(n).children().children().nodes:/^\s*<t(h|d)[> ]/.test(n)?t(document.createElement("table")).html(n).children().children().children().nodes:/^\s*</.test(n)?t(document.createElement("div")).html(n).children().nodes:document.createTextNode(n)},t.prototype.handle=function(){var t=this.slice(arguments).map((function(t){return"function"==typeof t?function(n){n.preventDefault(),t.apply(this,arguments)}:t}),this);return this.on.apply(this,t)},t.prototype.hasClass=function(){return this.is("."+this.args(arguments).join("."))},t.prototype.html=function(t){return void 0===t?this.first().innerHTML||"":this.each((function(n){n.innerHTML=t}))},t.prototype.is=function(t){return 0<this.filter(t).length},t.prototype.isInPage=function(t){return t!==document.body&&document.body.contains(t)},t.prototype.last=function(){return this.nodes[this.length-1]||!1},t.prototype.map=function(n){return n?t(this.array(n)).unique():this},t.prototype.not=function(n){return this.filter((function(e){return!t(e).is(n||!0)}))},t.prototype.off=function(n,e,r){var o=null==e&&null==r,i=null,s=e;return"string"==typeof e&&(i=e,s=r),this.eacharg(n,(function(n,e){t(n._e?n._e[e]:[]).each((function(t){(o||t.orig_callback===s&&t.selector===i)&&n.removeEventListener(e,t.callback)}))}))},t.prototype.on=function(n,e,r){function o(t,n){try{Object.defineProperty(t,"currentTarget",{value:n,configurable:!0})}catch(e){}}var i=null,s=e;function c(t){return e.apply(this,[t].concat(t.detail||[]))}return"string"==typeof e&&(i=e,s=r,e=function(n){var e=arguments;t(n.currentTarget).find(i).each((function(t){var i;t.contains(n.target)&&(i=n.currentTarget,o(n,t),r.apply(t,e),o(n,i))}))}),this.eacharg(n,(function(t,n){t.addEventListener(n,c),t._e=t._e||{},t._e[n]=t._e[n]||[],t._e[n].push({callback:c,orig_callback:s,selector:i})}))},t.prototype.pairs=function(t,n,e,r){var o;return void 0!==n&&(o=t,(t={})[o]=n),"object"==typeof t?this.each((function(n,e){for(var o in t)"function"==typeof t[o]?r(n,o,t[o](n,e)):r(n,o,t[o])})):this.length?e(this.first(),t):""},t.prototype.param=function(t){return Object.keys(t).map(function(n){return this.uri(n)+"="+this.uri(t[n])}.bind(this)).join("&")},t.prototype.parent=function(t){return this.map((function(t){return t.parentNode})).filter(t)},t.prototype.prepend=function(t,n){return this.adjacent(t,n,(function(t,n){t.insertBefore(n,t.firstChild)}))},t.prototype.remove=function(){return this.each((function(t){t.parentNode&&t.parentNode.removeChild(t)}))},t.prototype.removeClass=function(){return this.eacharg(arguments,(function(t,n){t.classList.remove(n)}))},t.prototype.replace=function(n,e){var r=[];return this.adjacent(n,e,(function(t,n){r=r.concat(this.slice(n.children)),t.parentNode.replaceChild(n,t)})),t(r)},t.prototype.scroll=function(){return this.first().scrollIntoView({behavior:"smooth"}),this},t.prototype.select=function(n,e){return n=n.replace(/^\s*/,"").replace(/\s*$/,""),/^</.test(n)?t().generate(n):(e||document).querySelectorAll(n)},t.prototype.serialize=function(){var n=this;return this.slice(this.first().elements).reduce((function(e,r){return!r.name||r.disabled||"file"===r.type||/(checkbox|radio)/.test(r.type)&&!r.checked?e:"select-multiple"===r.type?(t(r.options).each((function(t){t.selected&&(e+="&"+n.uri(r.name)+"="+n.uri(t.value))})),e):e+"&"+n.uri(r.name)+"="+n.uri(r.value)}),"").slice(1)},t.prototype.siblings=function(t){return this.parent().children(t).not(this)},t.prototype.size=function(){return this.first().getBoundingClientRect()},t.prototype.slice=function(t){return t&&0!==t.length&&"string"!=typeof t&&"[object Function]"!==t.toString()?t.length?[].slice.call(t.nodes||t):[t]:[]},t.prototype.str=function(t,n){return function(e){return"function"==typeof e?e.call(this,t,n):e.toString()}},t.prototype.text=function(t){return void 0===t?this.first().textContent||"":this.each((function(n){n.textContent=t}))},t.prototype.toggleClass=function(t,n){return!!n===n?this[n?"addClass":"removeClass"](t):this.eacharg(t,(function(t,n){t.classList.toggle(n)}))},t.prototype.trigger=function(t){var n=this.slice(arguments).slice(1);return this.eacharg(t,(function(t,e){var r,o={bubbles:!0,cancelable:!0,detail:n};try{r=new window.CustomEvent(e,o)}catch(i){(r=document.createEvent("CustomEvent")).initCustomEvent(e,!0,!0,n)}t.dispatchEvent(r)}))},t.prototype.unique=function(){return t(this.nodes.reduce((function(t,n){return null!=n&&!1!==n&&-1===t.indexOf(n)?t.concat(n):t}),[]))},t.prototype.uri=function(t){return encodeURIComponent(t).replace(/!/g,"%21").replace(/'/g,"%27").replace(/\(/g,"%28").replace(/\)/g,"%29").replace(/\*/g,"%2A").replace(/%20/g,"+")},t.prototype.wrap=function(n){return this.map((function(e){return t(n).each((function(n){(function(n){for(;n.firstElementChild;)n=n.firstElementChild;return t(n)})(n).append(e.cloneNode(!0)),e.parentNode.replaceChild(n,e)}))}))},"object"==typeof module&&module.exports&&(module.exports=t,module.exports.u=t);const n={text:"Button",run:()=>{},cmd:"",criteria:()=>!0};class e{constructor(t){var e,r,o,i;this.options=null!=t?t:n,this.options.text=null!=(e=this.options.text)?e:n.text,this.options.run=null!=(r=this.options.run)?r:n.run,this.options.cmd=null!=(o=this.options.cmd)?o:n.cmd,this.options.criteria=null!=(i=this.options.criteria)?i:n.criteria,this.id=Math.ceil(1e5*Math.random())}elm(n,e){let r=t("<table>").attr("id",this.id).addClass("button");return r.append(t("<td>").addClass("text").text(this.options.text)),this.options.cmd&&r.append(t("<td>").addClass("text").text(this.options.cmd)),this.options.run&&r.on("click",(t=>{this.options.run(t,n),e.close(t)})),r}}const r={light:{background:"#FFFFFF",text:"#1c1c1c",cmd:"#828481",border:"#e3e5e8",shadow:"0 5px 10px 0 rgba(0, 0, 0, 0.2), 0 5px 10px 0 rgba(0, 0, 0, 0.2)",hover:{background:"#E8E8E9",text:"",cmd:"#1c1c1c"}},dark:{background:"#292A2D",text:"#e6e6e6",cmd:"#828481",border:"#373a3d",shadow:"0 5px 10px 0 rgba(0, 0, 0, 0.2), 0 5px 10px 0 rgba(0, 0, 0, 0.2)",hover:{background:"#3F4042",text:"",cmd:"#e6e6e6"}}};window.menu=new class{constructor(n){this.id=Math.ceil(1e5*Math.random()),this.buttons=[],this.menu=t("<iframe>").attr("id",`__context-menu_${this.id}__`).addClass("__context-menu_hidden__"),t("body").append(this.menu);let e=function(t,n){return Object.assign(n,r),{internal:`\n      :root {\n        --bg: ${n.light.background};\n        --bg-hover: ${n.light.hover.background};\n        --text: ${n.light.text};\n        --text-hover: ${n.light.hover.text};\n        --cmd: ${n.light.cmd};\n        --cmd-hover: ${n.light.hover.cmd};\n        --border: ${n.light.border};\n      }\n\n      @media (prefers-color-scheme: dark) {\n        :root {\n          --bg: ${n.dark.background};\n          --bg-hover: ${n.dark.hover.background};\n          --text: ${n.dark.text};\n          --text-hover: ${n.dark.hover.text};\n          --cmd: ${n.dark.cmd};\n          --cmd-hover: ${n.dark.hover.cmd};\n          --border: ${n.dark.border};\n        }\n      }\n\n      body {\n        margin: 0;\n        background: var(--bg);\n      }\n\n      .menu {\n \t      background: var(--bg);\n        position: fixed;\n        font-family: sans-serif;\n        padding: 10px 0 10px 0;\n        width: 250px;\n        user-select: none;\n      }\n\n      .menu .button {\n        font-size: 12px;\n        padding: 4px 15px 4px 15px;\n        width: 250px;\n      }\n\n      .menu .button td {\n        padding: 0;\n      }\n\n      .menu .button .text {\n        color: var(--text);\n        text-align: left;\n      }\n\n      .menu .button .cmd {\n        color: var(--cmd);\n        text-align: right;\n      }\n\n      ${n.light.hover.background||n.light.hover.background?"\n        .menu .button:hover {\n          background: var(--bg-hover);\n        }\n        ":""}\n\n      ${n.light.hover.text||n.light.hover.text?"\n        .menu .button:hover .text {\n          color: var(--text-hover);\n        }\n        ":""}\n\n      ${n.light.hover.cmd||n.light.hover.cmd?"\n        .menu .button:hover .cmd {\n          color: var(--cmd-hover);\n        }\n        ":""}\n\n      .separator {\n        border: 0;\n        border-bottom: 1px solid var(--border);\n        margin: 5px 0 5px 0;\n      }\n    `.replace(/(  |\n)/g,""),external:`\n      :root {\n        --shadow: ${n.light.shadow};\n      }\n\n      @media (prefers-color-scheme: dark) {\n        :root {\n          --shadow: ${n.dark.shadow};\n        }\n      }\n\n      #__context-menu_${t}__ {\n        box-shadow: var(--shadow);\n        border: 0;\n        position: fixed;\n        border-radius: 10px;\n      }\n\n      .__context-menu_hidden__ {\n        display: none;\n      }\n    `.replace(/(  |\n)/g,"")}}(this.id,n.style||{});this.style=t("<style>").html(e.internal),t(this.menu.first().contentDocument.head).append(this.style),t("head").append(t("<style>").html(e.external)),t("html").on("click",(t=>{t.preventDefault(),this.close(t)})),t("html").on("contextmenu",(t=>{t.preventDefault(),this.close(t),this.open(t)}))}addButton(t){this.buttons.push(t)}removeButton(t){this.buttons=this.buttons.filter((n=>n.id!==t.id))}getButton(t){return this.buttons.find((n=>n.id===t))}open(n){this.menu.removeClass("__context-menu_hidden__"),t(this.menu.first().contentDocument.body).append(t("<div>").addClass("menu"));let e=[];if(this.buttons.forEach((r=>{r.options.criteria(n)&&(e.push(r),t(this.menu.first().contentDocument.body).find(".menu").append(r.elm(n,this)))})),!e.length)return this.close(n);let r=n.clientX,o=n.clientY,i=t(this.menu.first().contentDocument.body).find(".menu").first().offsetWidth,s=t(this.menu.first().contentDocument.body).find(".menu").first().offsetHeight;r>window.innerWidth-i&&(r-=i),o>window.innerHeight-s&&(o-=s),this.menu.first().style.left=r+"px",this.menu.first().style.top=o+"px",this.menu.first().style.width=i+"px",this.menu.first().style.height=s+"px"}close(n){this.menu.addClass("__context-menu_hidden__"),t(this.menu.first().contentDocument.body).html("")}}({}),menu.addButton(new e({text:"Alert",run:(t,n)=>{alert()}})),menu.addButton(new e({text:"Console Log",run:(t,n)=>{console.log("Button Pressed!")}}));