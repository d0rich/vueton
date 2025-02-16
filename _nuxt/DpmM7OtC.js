import{_ as he}from"./DYzzHncb.js";import{e as b,o as l,g as v,w as m,b as P,r as _,i as u,A as Y,G as D,c as f,a as p,H as B,s as me,q as g,n as w,h as y,I as ge,J as ye,K as ve,M as be,F as W,d as R}from"./Bk4cXetx.js";import"https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.esm.min.mjs";const _e=(e,t)=>{const n=e.__vccOpts||e;for(const[o,r]of t)n[o]=r;return n},k=/^[a-z0-9]+(-[a-z0-9]+)*$/,ke=(e,t,n,o="")=>{const r=e.split(":");if(e.slice(0,1)==="@"){if(r.length<2||r.length>3)return null;o=r.shift().slice(1)}if(r.length>3||!r.length)return null;if(r.length>1){const a=r.pop(),c=r.pop(),d={provider:r.length>0?r[0]:o,prefix:c,name:a};return j(d)?d:null}const s=r[0],i=s.split("-");if(i.length>1){const a={provider:o,prefix:i.shift(),name:i.join("-")};return j(a)?a:null}if(n&&o===""){const a={provider:o,prefix:"",name:s};return j(a,n)?a:null}return null},j=(e,t)=>e?!!((e.provider===""||e.provider.match(k))&&(t&&e.prefix===""||e.prefix.match(k))&&e.name.match(k)):!1,ee=Object.freeze({left:0,top:0,width:16,height:16}),C=Object.freeze({rotate:0,vFlip:!1,hFlip:!1}),te=Object.freeze({...ee,...C}),I=Object.freeze({...te,body:"",hidden:!1});function xe(e,t){const n={};!e.hFlip!=!t.hFlip&&(n.hFlip=!0),!e.vFlip!=!t.vFlip&&(n.vFlip=!0);const o=((e.rotate||0)+(t.rotate||0))%4;return o&&(n.rotate=o),n}function $(e,t){const n=xe(e,t);for(const o in I)o in C?o in e&&!(o in n)&&(n[o]=C[o]):o in t?n[o]=t[o]:o in e&&(n[o]=e[o]);return n}function Se(e,t){const n=e.icons,o=e.aliases||Object.create(null),r=Object.create(null);function s(i){if(n[i])return r[i]=[];if(!(i in r)){r[i]=null;const a=o[i]&&o[i].parent,c=a&&s(a);c&&(r[i]=[a].concat(c))}return r[i]}return Object.keys(n).concat(Object.keys(o)).forEach(s),r}function je(e,t,n){const o=e.icons,r=e.aliases||Object.create(null);let s={};function i(a){s=$(o[a]||r[a],s)}return i(t),n.forEach(i),$(e,s)}function ne(e,t){const n=[];if(typeof e!="object"||typeof e.icons!="object")return n;e.not_found instanceof Array&&e.not_found.forEach(r=>{t(r,null),n.push(r)});const o=Se(e);for(const r in o){const s=o[r];s&&(t(r,je(e,r,s)),n.push(r))}return n}const we={provider:"",aliases:{},not_found:{},...ee};function T(e,t){for(const n in t)if(n in e&&typeof e[n]!=typeof t[n])return!1;return!0}function oe(e){if(typeof e!="object"||e===null)return null;const t=e;if(typeof t.prefix!="string"||!e.icons||typeof e.icons!="object"||!T(e,we))return null;const n=t.icons;for(const r in n){const s=n[r];if(!r.match(k)||typeof s.body!="string"||!T(s,I))return null}const o=t.aliases||Object.create(null);for(const r in o){const s=o[r],i=s.parent;if(!r.match(k)||typeof i!="string"||!n[i]&&!o[i]||!T(s,I))return null}return t}const U=Object.create(null);function Ce(e,t){return{provider:e,prefix:t,icons:Object.create(null),missing:new Set}}function z(e,t){const n=U[e]||(U[e]=Object.create(null));return n[t]||(n[t]=Ce(e,t))}function re(e,t){return oe(t)?ne(t,(n,o)=>{o?e.icons[n]=o:e.missing.add(n)}):[]}function Oe(e,t,n){try{if(typeof n.body=="string")return e.icons[t]={...n},!0}catch{}return!1}let O=!1;function Le(e){return O=e,O}function Pe(e,t){const n=ke(e,!0,O);if(!n)return!1;const o=z(n.provider,n.prefix);return Oe(o,n.name,t)}function De(e,t){if(typeof e!="object")return!1;if(typeof t!="string"&&(t=e.provider||""),O&&!t&&!e.prefix){let r=!1;return oe(e)&&(e.prefix="",ne(e,(s,i)=>{i&&Pe(s,i)&&(r=!0)})),r}const n=e.prefix;if(!j({provider:t,prefix:n,name:"a"}))return!1;const o=z(t,n);return!!re(o,e)}const Te=Object.freeze({width:null,height:null}),Ae=Object.freeze({...Te,...C});""+Date.now().toString(16)+(Math.random()*16777216|0).toString(16);const Ee=Object.create(null);function Be(e,t){Ee[e]=t}function se(e){let t;if(typeof e.resources=="string")t=[e.resources];else if(t=e.resources,!(t instanceof Array)||!t.length)return null;return{resources:t,path:e.path||"/",maxURL:e.maxURL||500,rotate:e.rotate||750,timeout:e.timeout||5e3,random:e.random===!0,index:e.index||0,dataAfterTimeout:e.dataAfterTimeout!==!1}}const M=Object.create(null),x=["https://api.simplesvg.com","https://api.unisvg.com"],N=[];for(;x.length>0;)x.length===1||Math.random()>.5?N.push(x.shift()):N.push(x.pop());M[""]=se({resources:["https://api.iconify.design"].concat(N)});function Ie(e,t){const n=se(t);return n===null?!1:(M[e]=n,!0)}function ie(e){return M[e]}const Ne=()=>{let e;try{if(e=fetch,typeof e=="function")return e}catch{}};let H=Ne();function Fe(e,t){const n=ie(e);if(!n)return 0;let o;if(!n.maxURL)o=0;else{let r=0;n.resources.forEach(i=>{r=Math.max(r,i.length)});const s=t+".json?icons=";o=n.maxURL-r-n.path.length-s.length}return o}function ze(e){return e===404}const Me=(e,t,n)=>{const o=[],r=Fe(e,t),s="icons";let i={type:s,provider:e,prefix:t,icons:[]},a=0;return n.forEach((c,d)=>{a+=c.length+1,a>=r&&d>0&&(o.push(i),i={type:s,provider:e,prefix:t,icons:[]},a=c.length),i.icons.push(c)}),o.push(i),o};function We(e){if(typeof e=="string"){const t=ie(e);if(t)return t.path}return"/"}const Re=(e,t,n)=>{if(!H){n("abort",424);return}let o=We(t.provider);switch(t.type){case"icons":{const s=t.prefix,i=t.icons.join(","),a=new URLSearchParams({icons:i});o+=s+".json?"+a.toString();break}case"custom":{const s=t.uri;o+=s.slice(0,1)==="/"?s.slice(1):s;break}default:n("abort",400);return}let r=503;H(e+o).then(s=>{const i=s.status;if(i!==200){setTimeout(()=>{n(ze(i)?"abort":"next",i)});return}return r=501,s.json()}).then(s=>{if(typeof s!="object"||s===null){setTimeout(()=>{s===404?n("abort",s):n("next",r)});return}setTimeout(()=>{n("success",s)})}).catch(()=>{n("next",r)})},$e={prepare:Me,send:Re},V="iconify2",L="iconify",ae=L+"-count",q=L+"-version",Ue=36e5,He=168;function F(e,t){try{return e.getItem(t)}catch{}}function le(e,t,n){try{return e.setItem(t,n),!0}catch{}}function G(e,t){try{e.removeItem(t)}catch{}}function Q(e,t){return le(e,ae,t.toString())}function Z(e){return parseInt(F(e,ae))||0}const ce={local:!0,session:!0},Ve={local:new Set,session:new Set};let fe=!1;function qe(e){fe=e}let S=typeof window>"u"?{}:window;function Ge(e){const t=e+"Storage";try{if(S&&S[t]&&typeof S[t].length=="number")return S[t]}catch{}ce[e]=!1}function Qe(e,t){const n=Ge(e);if(!n)return;const o=F(n,q);if(o!==V){if(o){const a=Z(n);for(let c=0;c<a;c++)G(n,L+c.toString())}le(n,q,V),Q(n,0);return}const r=Math.floor(Date.now()/Ue)-He,s=a=>{const c=L+a.toString(),d=F(n,c);if(typeof d=="string"){try{const h=JSON.parse(d);if(typeof h=="object"&&typeof h.cached=="number"&&h.cached>r&&typeof h.provider=="string"&&typeof h.data=="object"&&typeof h.data.prefix=="string"&&t(h,a))return!0}catch{}G(n,c)}};let i=Z(n);for(let a=i-1;a>=0;a--)s(a)||(a===i-1?(i--,Q(n,i)):Ve[e].add(a))}function Ze(){if(!fe){qe(!0);for(const e in ce)Qe(e,t=>{const n=t.data,o=t.provider,r=n.prefix,s=z(o,r);if(!re(s,n).length)return!1;const i=n.lastModified||-1;return s.lastModifiedCached=s.lastModifiedCached?Math.min(s.lastModifiedCached,i):i,!0})}}({...Ae});const K={backgroundColor:"currentColor"},Ke={backgroundColor:"transparent"},X={Image:"var(--svg)",Repeat:"no-repeat",Size:"100% 100%"},J={webkitMask:K,mask:K,background:Ke};for(const e in J){const t=J[e];for(const n in X)t[e+n]=X[n]}const A={};["horizontal","vertical"].forEach(e=>{const t=e.slice(0,1)+"Flip";A[e+"-flip"]=t,A[e.slice(0,1)+"-flip"]=t,A[e+"Flip"]=t});Le(!0);Be("",$e);if(typeof document<"u"&&typeof window<"u"){Ze();const e=window;if(e.IconifyPreload!==void 0){const t=e.IconifyPreload,n="Invalid IconifyPreload syntax.";typeof t=="object"&&t!==null&&(t instanceof Array?t:[t]).forEach(o=>{try{(typeof o!="object"||o===null||o instanceof Array||typeof o.icons!="object"||typeof o.prefix!="string"||!De(o))&&console.error(n)}catch{console.error(n)}})}if(e.IconifyProviders!==void 0){const t=e.IconifyProviders;if(typeof t=="object"&&t!==null)for(let n in t){const o="IconifyProviders["+n+"] is invalid.";try{const r=t[n];if(typeof r!="object"||!r||r.resources===void 0)continue;Ie(n,r)||console.error(o)}catch{console.error(o)}}}}({...te});const Xe={class:"d-shape"},Je={key:0,class:"d-shape__bg-wrapper"},ue=b({name:"DWrapShape",__name:"DWrapShape",props:{shapeClass:{},shapeStyle:{type:[Boolean,null,String,Object,Array]},filterClass:{},filterStyle:{type:[Boolean,null,String,Object,Array]},tag:{}},setup(e){const t=e,n=ge();function o(a){return a?typeof a=="string"?!a.trim():Object.keys(a).length===0:!0}function r(a){return typeof a=="string"?!a.trim():Array.isArray(a)?a.length===0:a==null?!0:Object.keys(a).length===0}const s=g(()=>n["shape-content"]||!o(t.shapeClass)?!0:!r(t.shapeStyle)),i=g(()=>o(t.filterClass)?!r(t.filterStyle):!0);return(a,c)=>(l(),v(D(a.tag??"div"),null,{default:m(()=>[p("div",Xe,[s.value||n["bg-overlay"]||i.value?(l(),f("div",{key:0,class:w(["d-shape__bg-filter",a.filterClass]),style:B(a.filterStyle)},[s.value||n["bg-overlay"]?(l(),f("div",Je,[s.value?(l(),f("div",{key:0,class:w(["d-shape__bg",a.shapeClass]),style:B(a.shapeStyle)},[_(a.$slots,"shape-content")],6)):y("",!0),_(a.$slots,"bg-overlay")])):y("",!0)],6)):y("",!0),_(a.$slots,"default")])]),_:3}))}}),Ye={key:0,class:"d-focus-hl__hl--negative-tile"},et={key:2,class:"d-focus-hl__hl--negative-list-item"},tt={key:4,class:"d-focus-hl__hl--negative-tile"},nt={key:5,class:"d-focus-hl__hl--negative-list-item"},ot={name:"DWrapFocusHighlight",components:{DWrapShape:ue}},pe=b({...ot,props:{linkExact:Boolean,noPassiveLink:Boolean,active:Boolean,variant:{type:String,default:"negative-tile"},tag:{type:String,default:"div"},colorClass:{type:[String,Object],default:"d-focus-hl--default-color"}},setup(e){const t=e,n=g(()=>t.to||t.href?resolveComponent("NuxtLink"):t.tag);return(o,r)=>(l(),v(ue,null,{default:m(()=>[(l(),v(D(n.value),Y(t,{class:["d-focus-hl d-focusable",{"d-focus-hl--exact":e.linkExact,"d-focus-hl--not-exact":!e.linkExact,"d-focus-hl--no-passive-link":e.noPassiveLink,"d-focus-hl--active":e.active}]}),{default:m(()=>[e.variant==="negative-tile"?(l(),f("div",Ye)):e.variant==="tile"||e.variant==="composite-tile"?(l(),f("div",{key:1,class:w(["d-focus-hl__hl--tile",e.colorClass])},null,2)):e.variant==="negative-list-item"?(l(),f("div",et)):e.variant==="list-item"||e.variant==="composite-list-item"?(l(),f("div",{key:3,class:w(["d-focus-hl__hl--list-item",e.colorClass])},null,2)):y("",!0),_(o.$slots,"default"),e.variant==="composite-tile"?(l(),f("div",tt)):e.variant==="composite-list-item"?(l(),f("div",nt)):y("",!0)]),_:3},16,["class"]))]),_:3}))}});function rt(e){const t=D("RouterLink"),n=typeof defineNuxtLink=="function"?defineNuxtLink({componentName:"DNuxtLink"}):void 0,o=g(()=>!!(e.href||e.to)),r=g(()=>{if(!e.href)return!1;const i=e.href;return i.startsWith("http")||i.startsWith("mailto:")||i.startsWith("tel:")||i.startsWith("#")}),s=g(()=>{const i={...e};return e.href&&e.to?delete i.href:e.href?delete i.to:e.to&&delete i.href,i});return o.value?r.value?{isLink:o,isExternalLink:r,linkComponent:"a",propsToProvide:s}:typeof n<"u"?{isLink:o,isExternalLink:r,linkComponent:n,propsToProvide:s}:typeof t!="string"?{isLink:o,isExternalLink:r,linkComponent:t,propsToProvide:s}:{isLink:o,isExternalLink:r,linkComponent:"a",propsToProvide:s}:{isLink:o,isExternalLink:r,linkComponent:e.tag||"span",propsToProvide:s}}const st={name:"DBtn",components:{DWrapFocusHighlight:pe}},it=b({...st,props:{to:{type:[String,Object],default:""},href:{type:String,default:void 0},exact:Boolean,noPassiveHighlight:Boolean,active:Boolean,noRotate:Boolean,tag:{type:String,default:"button"},highlight:{type:String,default:void 0},colorClass:{type:[String,Object],default:void 0},textTransform:{type:String,default:"uppercase"}},setup(e){const t=e,{linkComponent:n,isLink:o,isExternalLink:r,propsToProvide:s}=rt(t);return(i,a)=>(l(),v(D(u(n)),Y({class:["d-btn d-focusable",{"d-btn--rotated":!e.noRotate,"d-btn--uppercase":e.textTransform==="uppercase","d-btn--capitalize":e.textTransform==="capitalize","d-btn--lowercase":e.textTransform==="lowercase"}]},u(s)),{default:m(()=>[P(pe,{variant:e.highlight,"link-exact":e.exact,"no-passive-link":e.noPassiveHighlight||!u(o)||u(r),"color-class":e.colorClass,active:e.active},{default:m(()=>[_(i.$slots,"default")]),_:3},8,["variant","link-exact","no-passive-link","color-class","active"])]),_:3},16,["class"]))}}),at={name:"DAnimationDefLetterD"},lt={d:"M200.242,139.244l137.207,-0c66.136,-0 112.859,17.192 140.169,51.576c27.31,34.384 33.562,84.973 18.755,151.767c-22.045,98.711 -85.878,148.066 -191.498,148.066l-179.16,-0l74.527,-351.409Zm184.588,179.159c12.175,-57.581 -7.732,-86.372 -59.72,-86.372l-33.068,0l-35.042,165.834l44.42,0c23.69,0 42.034,-6.169 55.031,-18.508c12.997,-12.339 22.457,-32.657 28.379,-60.954Z"};function ct(e,t,n,o,r,s){return l(),f("path",lt)}const de=_e(at,[["render",ct]]),ft={name:"DAnimationSpinner",components:{DAnimationDefLetterD:de}},ut=b({...ft,props:{spinPeriod:{type:Number,default:10},bladeWigglePeriod:{type:Number,default:5}},setup(e){const t="315 315";return(n,o)=>(l(),f("svg",{class:"spinner",viewBox:"0 0 630 630",xmlns:"http://www.w3.org/2000/svg",style:B({"--d-spinner-spin-period":e.spinPeriod+"s","--d-spinner-blade-wiggle-period":e.bladeWigglePeriod+"s"})},[p("defs",null,[P(de,{id:"d-letter"}),p("use",{id:"d-spinner-blade",href:"#d-letter",class:"d-animation-spinner__blade","transform-origin":t}),p("g",{id:"spinner",class:"d-animation-spinner__spinner","transform-origin":t},[p("use",{href:"#d-spinner-blade",transform:"rotate(0)","transform-origin":t}),p("use",{href:"#d-spinner-blade",transform:"rotate(120)","transform-origin":t}),p("use",{href:"#d-spinner-blade",transform:"rotate(240)","transform-origin":t})])]),p("use",{href:"#spinner",transform:"translate( -20 20 )",class:"d-animation-spinner__background","transform-origin":t}),p("use",{href:"#spinner",class:"d-animation-spinner__foreground","transform-origin":t})],4))}});me("");var E=ye();const pt={style:{display:"flex","flex-direction":"column","align-items":"center",margin:"3rem 0"}},dt={key:0},ht=b({__name:"SendTipCore",setup(e){const{tonWallet:t,tonNetwork:n,sendTransaction:o}=ve(),{sendMessage:r,isFetching:s,success:i}=be({sendMessageFn:async({userAddress:a})=>{await o({to:E.Address.parse(n.value==="mainnet"?"UQBb1d6p29w8gwwt6tgY8S3G5_kQTNID_aoOA_Osp7mx_aZg":"0QBunvP4pxgNkbmQa9fFy-VyDnWjg6XBfOCkKXDsngMbRSHk"),value:E.toNano("0.5"),body:E.comment("Tip from reader")})}});return(a,c)=>(l(),f("div",pt,[P(u(it),{"no-rotate":"","text-transform":"capitalize",disabled:!u(t)||u(s),onClick:u(r)},{default:m(()=>[u(t)?u(s)?(l(),v(u(ut),{key:2,style:{height:"1rem",width:"1rem"}})):(l(),f(W,{key:1},[R(" Give 0.5 TON ")],64)):(l(),f(W,{key:0},[R(" Not Authorized ")],64))]),_:1},8,["disabled","onClick"]),u(i)?(l(),f("div",dt,"Thanks for your support!")):y("",!0)]))}}),vt=b({__name:"SendTip",setup(e){return(t,n)=>{const o=he;return l(),v(o,null,{default:m(()=>[P(ht)]),_:1})}}});export{vt as default};
