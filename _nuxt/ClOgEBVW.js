import{e as d,I as m,q as p,o as r,g,w as S,a as C,c as n,n as f,H as h,r as l,h as o,G as v}from"./Bk4cXetx.js";const b={class:"d-shape"},_={key:0,class:"d-shape__bg-wrapper"},j=d({name:"DWrapShape",__name:"DWrapShape",props:{shapeClass:{},shapeStyle:{type:[Boolean,null,String,Object,Array]},filterClass:{},filterStyle:{type:[Boolean,null,String,Object,Array]},tag:{}},setup(y){const t=y,s=m();function i(e){return e?typeof e=="string"?!e.trim():Object.keys(e).length===0:!0}function u(e){return typeof e=="string"?!e.trim():Array.isArray(e)?e.length===0:e===null||e===void 0?!0:Object.keys(e).length===0}const a=p(()=>s["shape-content"]||!i(t.shapeClass)?!0:!u(t.shapeStyle)),c=p(()=>i(t.filterClass)?!u(t.filterStyle):!0);return(e,k)=>(r(),g(v(e.tag??"div"),null,{default:S(()=>[C("div",b,[a.value||s["bg-overlay"]||c.value?(r(),n("div",{key:0,class:f(["d-shape__bg-filter",e.filterClass]),style:h(e.filterStyle)},[a.value||s["bg-overlay"]?(r(),n("div",_,[a.value?(r(),n("div",{key:0,class:f(["d-shape__bg",e.shapeClass]),style:h(e.shapeStyle)},[l(e.$slots,"shape-content")],6)):o("",!0),l(e.$slots,"bg-overlay")])):o("",!0)],6)):o("",!0),l(e.$slots,"default")])]),_:3}))}});export{j as _};
