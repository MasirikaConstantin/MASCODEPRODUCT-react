import{R as N,r as u,q as L,v as W,j as a}from"./app-BE9Df22n.js";var T={color:void 0,size:void 0,className:void 0,style:void 0,attr:void 0},I=N.createContext&&N.createContext(T),U=["attr","size","title"];function Y(e,t){if(e==null)return{};var s=G(e,t),i,o;if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(o=0;o<r.length;o++)i=r[o],!(t.indexOf(i)>=0)&&Object.prototype.propertyIsEnumerable.call(e,i)&&(s[i]=e[i])}return s}function G(e,t){if(e==null)return{};var s={};for(var i in e)if(Object.prototype.hasOwnProperty.call(e,i)){if(t.indexOf(i)>=0)continue;s[i]=e[i]}return s}function k(){return k=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var s=arguments[t];for(var i in s)Object.prototype.hasOwnProperty.call(s,i)&&(e[i]=s[i])}return e},k.apply(this,arguments)}function q(e,t){var s=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);t&&(i=i.filter(function(o){return Object.getOwnPropertyDescriptor(e,o).enumerable})),s.push.apply(s,i)}return s}function M(e){for(var t=1;t<arguments.length;t++){var s=arguments[t]!=null?arguments[t]:{};t%2?q(Object(s),!0).forEach(function(i){K(e,i,s[i])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(s)):q(Object(s)).forEach(function(i){Object.defineProperty(e,i,Object.getOwnPropertyDescriptor(s,i))})}return e}function K(e,t,s){return t=Z(t),t in e?Object.defineProperty(e,t,{value:s,enumerable:!0,configurable:!0,writable:!0}):e[t]=s,e}function Z(e){var t=Q(e,"string");return typeof t=="symbol"?t:t+""}function Q(e,t){if(typeof e!="object"||!e)return e;var s=e[Symbol.toPrimitive];if(s!==void 0){var i=s.call(e,t);if(typeof i!="object")return i;throw new TypeError("@@toPrimitive must return a primitive value.")}return(t==="string"?String:Number)(e)}function B(e){return e&&e.map((t,s)=>N.createElement(t.tag,M({key:s},t.attr),B(t.child)))}function E(e){return t=>N.createElement(X,k({attr:M({},e.attr)},t),B(e.child))}function X(e){var t=s=>{var{attr:i,size:o,title:r}=e,l=Y(e,U),n=o||s.size||"1em",c;return s.className&&(c=s.className),e.className&&(c=(c?c+" ":"")+e.className),N.createElement("svg",k({stroke:"currentColor",fill:"currentColor",strokeWidth:"0"},s.attr,i,l,{className:c,style:M(M({color:e.color||s.color},s.style),e.style),height:n,width:n,xmlns:"http://www.w3.org/2000/svg"}),r&&N.createElement("title",null,r),e.children)};return I!==void 0?N.createElement(I.Consumer,null,s=>t(s)):t(T)}function ee(e){return E({attr:{viewBox:"0 0 512 512"},child:[{tag:"path",attr:{d:"M504 256C504 119 393 8 256 8S8 119 8 256c0 123.78 90.69 226.38 209.25 245V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.28c-30.8 0-40.41 19.12-40.41 38.73V256h68.78l-11 71.69h-57.78V501C413.31 482.38 504 379.78 504 256z"},child:[]}]})(e)}function te(e){return E({attr:{viewBox:"0 0 496 512"},child:[{tag:"path",attr:{d:"M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"},child:[]}]})(e)}function se(e){return E({attr:{viewBox:"0 0 448 512"},child:[{tag:"path",attr:{d:"M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"},child:[]}]})(e)}function re(e){return E({attr:{viewBox:"0 0 512 512"},child:[{tag:"path",attr:{d:"M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z"},child:[]}]})(e)}function ae(e){return E({attr:{viewBox:"0 0 576 512"},child:[{tag:"path",attr:{d:"M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z"},child:[]}]})(e)}let ie={data:""},ne=e=>typeof window=="object"?((e?e.querySelector("#_goober"):window._goober)||Object.assign((e||document.head).appendChild(document.createElement("style")),{innerHTML:" ",id:"_goober"})).firstChild:e||ie,oe=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,le=/\/\*[^]*?\*\/|  +/g,A=/\n+/g,v=(e,t)=>{let s="",i="",o="";for(let r in e){let l=e[r];r[0]=="@"?r[1]=="i"?s=r+" "+l+";":i+=r[1]=="f"?v(l,r):r+"{"+v(l,r[1]=="k"?"":t)+"}":typeof l=="object"?i+=v(l,t?t.replace(/([^,])+/g,n=>r.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,c=>/&/.test(c)?c.replace(/&/g,n):n?n+" "+c:c)):r):l!=null&&(r=/^--/.test(r)?r:r.replace(/[A-Z]/g,"-$&").toLowerCase(),o+=v.p?v.p(r,l):r+":"+l+";")}return s+(t&&o?t+"{"+o+"}":o)+i},b={},V=e=>{if(typeof e=="object"){let t="";for(let s in e)t+=s+V(e[s]);return t}return e},ce=(e,t,s,i,o)=>{let r=V(e),l=b[r]||(b[r]=(c=>{let d=0,m=11;for(;d<c.length;)m=101*m+c.charCodeAt(d++)>>>0;return"go"+m})(r));if(!b[l]){let c=r!==e?e:(d=>{let m,h,f=[{}];for(;m=oe.exec(d.replace(le,""));)m[4]?f.shift():m[3]?(h=m[3].replace(A," ").trim(),f.unshift(f[0][h]=f[0][h]||{})):f[0][m[1]]=m[2].replace(A," ").trim();return f[0]})(e);b[l]=v(o?{["@keyframes "+l]:c}:c,s?"":"."+l)}let n=s&&b.g?b.g:null;return s&&(b.g=b[l]),((c,d,m,h)=>{h?d.data=d.data.replace(h,c):d.data.indexOf(c)===-1&&(d.data=m?c+d.data:d.data+c)})(b[l],t,i,n),l},de=(e,t,s)=>e.reduce((i,o,r)=>{let l=t[r];if(l&&l.call){let n=l(s),c=n&&n.props&&n.props.className||/^go/.test(n)&&n;l=c?"."+c:n&&typeof n=="object"?n.props?"":v(n,""):n===!1?"":n}return i+o+(l??"")},"");function S(e){let t=this||{},s=e.call?e(t.p):e;return ce(s.unshift?s.raw?de(s,[].slice.call(arguments,1),t.p):s.reduce((i,o)=>Object.assign(i,o&&o.call?o(t.p):o),{}):s,ne(t.target),t.g,t.o,t.k)}let R,F,_;S.bind({g:1});let g=S.bind({k:1});function me(e,t,s,i){v.p=t,R=e,F=s,_=i}function y(e,t){let s=this||{};return function(){let i=arguments;function o(r,l){let n=Object.assign({},r),c=n.className||o.className;s.p=Object.assign({theme:F&&F()},n),s.o=/ *go\d+/.test(c),n.className=S.apply(s,i)+(c?" "+c:"");let d=e;return e[0]&&(d=n.as||e,delete n.as),_&&d[0]&&_(n),R(d,n)}return t?t(o):o}}var ue=e=>typeof e=="function",D=(e,t)=>ue(e)?e(t):e,pe=(()=>{let e=0;return()=>(++e).toString()})(),J=(()=>{let e;return()=>{if(e===void 0&&typeof window<"u"){let t=matchMedia("(prefers-reduced-motion: reduce)");e=!t||t.matches}return e}})(),fe=20,H=(e,t)=>{switch(t.type){case 0:return{...e,toasts:[t.toast,...e.toasts].slice(0,fe)};case 1:return{...e,toasts:e.toasts.map(r=>r.id===t.toast.id?{...r,...t.toast}:r)};case 2:let{toast:s}=t;return H(e,{type:e.toasts.find(r=>r.id===s.id)?1:0,toast:s});case 3:let{toastId:i}=t;return{...e,toasts:e.toasts.map(r=>r.id===i||i===void 0?{...r,dismissed:!0,visible:!1}:r)};case 4:return t.toastId===void 0?{...e,toasts:[]}:{...e,toasts:e.toasts.filter(r=>r.id!==t.toastId)};case 5:return{...e,pausedAt:t.time};case 6:let o=t.time-(e.pausedAt||0);return{...e,pausedAt:void 0,toasts:e.toasts.map(r=>({...r,pauseDuration:r.pauseDuration+o}))}}},P=[],j={toasts:[],pausedAt:void 0},w=e=>{j=H(j,e),P.forEach(t=>{t(j)})},he={blank:4e3,error:4e3,success:2e3,loading:1/0,custom:4e3},xe=(e={})=>{let[t,s]=u.useState(j),i=u.useRef(j);u.useEffect(()=>(i.current!==j&&s(j),P.push(s),()=>{let r=P.indexOf(s);r>-1&&P.splice(r,1)}),[]);let o=t.toasts.map(r=>{var l,n,c;return{...e,...e[r.type],...r,removeDelay:r.removeDelay||((l=e[r.type])==null?void 0:l.removeDelay)||(e==null?void 0:e.removeDelay),duration:r.duration||((n=e[r.type])==null?void 0:n.duration)||(e==null?void 0:e.duration)||he[r.type],style:{...e.style,...(c=e[r.type])==null?void 0:c.style,...r.style}}});return{...t,toasts:o}},be=(e,t="blank",s)=>({createdAt:Date.now(),visible:!0,dismissed:!1,type:t,ariaProps:{role:"status","aria-live":"polite"},message:e,pauseDuration:0,...s,id:(s==null?void 0:s.id)||pe()}),C=e=>(t,s)=>{let i=be(t,e,s);return w({type:2,toast:i}),i.id},p=(e,t)=>C("blank")(e,t);p.error=C("error");p.success=C("success");p.loading=C("loading");p.custom=C("custom");p.dismiss=e=>{w({type:3,toastId:e})};p.remove=e=>w({type:4,toastId:e});p.promise=(e,t,s)=>{let i=p.loading(t.loading,{...s,...s==null?void 0:s.loading});return typeof e=="function"&&(e=e()),e.then(o=>{let r=t.success?D(t.success,o):void 0;return r?p.success(r,{id:i,...s,...s==null?void 0:s.success}):p.dismiss(i),o}).catch(o=>{let r=t.error?D(t.error,o):void 0;r?p.error(r,{id:i,...s,...s==null?void 0:s.error}):p.dismiss(i)}),e};var ge=(e,t)=>{w({type:1,toast:{id:e,height:t}})},ve=()=>{w({type:5,time:Date.now()})},O=new Map,ye=1e3,je=(e,t=ye)=>{if(O.has(e))return;let s=setTimeout(()=>{O.delete(e),w({type:4,toastId:e})},t);O.set(e,s)},Ne=e=>{let{toasts:t,pausedAt:s}=xe(e);u.useEffect(()=>{if(s)return;let r=Date.now(),l=t.map(n=>{if(n.duration===1/0)return;let c=(n.duration||0)+n.pauseDuration-(r-n.createdAt);if(c<0){n.visible&&p.dismiss(n.id);return}return setTimeout(()=>p.dismiss(n.id),c)});return()=>{l.forEach(n=>n&&clearTimeout(n))}},[t,s]);let i=u.useCallback(()=>{s&&w({type:6,time:Date.now()})},[s]),o=u.useCallback((r,l)=>{let{reverseOrder:n=!1,gutter:c=8,defaultPosition:d}=l||{},m=t.filter(x=>(x.position||d)===(r.position||d)&&x.height),h=m.findIndex(x=>x.id===r.id),f=m.filter((x,$)=>$<h&&x.visible).length;return m.filter(x=>x.visible).slice(...n?[f+1]:[0,f]).reduce((x,$)=>x+($.height||0)+c,0)},[t]);return u.useEffect(()=>{t.forEach(r=>{if(r.dismissed)je(r.id,r.removeDelay);else{let l=O.get(r.id);l&&(clearTimeout(l),O.delete(r.id))}})},[t]),{toasts:t,handlers:{updateHeight:ge,startPause:ve,endPause:i,calculateOffset:o}}},we=g`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`,Oe=g`
from {
  transform: scale(0);
  opacity: 0;
}
to {
  transform: scale(1);
  opacity: 1;
}`,Ee=g`
from {
  transform: scale(0) rotate(90deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(90deg);
	opacity: 1;
}`,Ce=y("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#ff4b4b"};
  position: relative;
  transform: rotate(45deg);

  animation: ${we} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;

  &:after,
  &:before {
    content: '';
    animation: ${Oe} 0.15s ease-out forwards;
    animation-delay: 150ms;
    position: absolute;
    border-radius: 3px;
    opacity: 0;
    background: ${e=>e.secondary||"#fff"};
    bottom: 9px;
    left: 4px;
    height: 2px;
    width: 12px;
  }

  &:before {
    animation: ${Ee} 0.15s ease-out forwards;
    animation-delay: 180ms;
    transform: rotate(90deg);
  }
`,ze=g`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`,Pe=y("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${e=>e.secondary||"#e0e0e0"};
  border-right-color: ${e=>e.primary||"#616161"};
  animation: ${ze} 1s linear infinite;
`,ke=g`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(45deg);
	opacity: 1;
}`,Me=g`
0% {
	height: 0;
	width: 0;
	opacity: 0;
}
40% {
  height: 0;
	width: 6px;
	opacity: 1;
}
100% {
  opacity: 1;
  height: 10px;
}`,De=y("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#61d345"};
  position: relative;
  transform: rotate(45deg);

  animation: ${ke} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;
  &:after {
    content: '';
    box-sizing: border-box;
    animation: ${Me} 0.2s ease-out forwards;
    opacity: 0;
    animation-delay: 200ms;
    position: absolute;
    border-right: 2px solid;
    border-bottom: 2px solid;
    border-color: ${e=>e.secondary||"#fff"};
    bottom: 6px;
    left: 6px;
    height: 10px;
    width: 6px;
  }
`,Se=y("div")`
  position: absolute;
`,$e=y("div")`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 20px;
  min-height: 20px;
`,Fe=g`
from {
  transform: scale(0.6);
  opacity: 0.4;
}
to {
  transform: scale(1);
  opacity: 1;
}`,_e=y("div")`
  position: relative;
  transform: scale(0.6);
  opacity: 0.4;
  min-width: 20px;
  animation: ${Fe} 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
`,Ie=({toast:e})=>{let{icon:t,type:s,iconTheme:i}=e;return t!==void 0?typeof t=="string"?u.createElement(_e,null,t):t:s==="blank"?null:u.createElement($e,null,u.createElement(Pe,{...i}),s!=="loading"&&u.createElement(Se,null,s==="error"?u.createElement(Ce,{...i}):u.createElement(De,{...i})))},qe=e=>`
0% {transform: translate3d(0,${e*-200}%,0) scale(.6); opacity:.5;}
100% {transform: translate3d(0,0,0) scale(1); opacity:1;}
`,Ae=e=>`
0% {transform: translate3d(0,0,-1px) scale(1); opacity:1;}
100% {transform: translate3d(0,${e*-150}%,-1px) scale(.6); opacity:0;}
`,Te="0%{opacity:0;} 100%{opacity:1;}",Be="0%{opacity:1;} 100%{opacity:0;}",Ve=y("div")`
  display: flex;
  align-items: center;
  background: #fff;
  color: #363636;
  line-height: 1.3;
  will-change: transform;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1), 0 3px 3px rgba(0, 0, 0, 0.05);
  max-width: 350px;
  pointer-events: auto;
  padding: 8px 10px;
  border-radius: 8px;
`,Re=y("div")`
  display: flex;
  justify-content: center;
  margin: 4px 10px;
  color: inherit;
  flex: 1 1 auto;
  white-space: pre-line;
`,Je=(e,t)=>{let s=e.includes("top")?1:-1,[i,o]=J()?[Te,Be]:[qe(s),Ae(s)];return{animation:t?`${g(i)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${g(o)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}},He=u.memo(({toast:e,position:t,style:s,children:i})=>{let o=e.height?Je(e.position||t||"top-center",e.visible):{opacity:0},r=u.createElement(Ie,{toast:e}),l=u.createElement(Re,{...e.ariaProps},D(e.message,e));return u.createElement(Ve,{className:e.className,style:{...o,...s,...e.style}},typeof i=="function"?i({icon:r,message:l}):u.createElement(u.Fragment,null,r,l))});me(u.createElement);var Le=({id:e,className:t,style:s,onHeightUpdate:i,children:o})=>{let r=u.useCallback(l=>{if(l){let n=()=>{let c=l.getBoundingClientRect().height;i(e,c)};n(),new MutationObserver(n).observe(l,{subtree:!0,childList:!0,characterData:!0})}},[e,i]);return u.createElement("div",{ref:r,className:t,style:s},o)},We=(e,t)=>{let s=e.includes("top"),i=s?{top:0}:{bottom:0},o=e.includes("center")?{justifyContent:"center"}:e.includes("right")?{justifyContent:"flex-end"}:{};return{left:0,right:0,display:"flex",position:"absolute",transition:J()?void 0:"all 230ms cubic-bezier(.21,1.02,.73,1)",transform:`translateY(${t*(s?1:-1)}px)`,...i,...o}},Ue=S`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`,z=16,Ke=({reverseOrder:e,position:t="top-center",toastOptions:s,gutter:i,children:o,containerStyle:r,containerClassName:l})=>{let{toasts:n,handlers:c}=Ne(s);return u.createElement("div",{id:"_rht_toaster",style:{position:"fixed",zIndex:9999,top:z,left:z,right:z,bottom:z,pointerEvents:"none",...r},className:l,onMouseEnter:c.startPause,onMouseLeave:c.endPause},n.map(d=>{let m=d.position||t,h=c.calculateOffset(d,{reverseOrder:e,gutter:i,defaultPosition:t}),f=We(m,h);return u.createElement(Le,{id:d.id,key:d.id,onHeightUpdate:c.updateHeight,className:d.visible?Ue:"",style:f},d.type==="custom"?D(d.message,d):o?o(d):u.createElement(He,{toast:d,position:m}))}))},Ye=p;const Ze=()=>{const[e,t]=u.useState(!1),{csrf:s}=L().props,{data:i,setData:o,post:r,processing:l,errors:n,reset:c}=W({nom:"",email:"",message:""}),d=m=>{m.preventDefault(),r("/contact",{preserveScroll:!0,onSuccess:()=>{Ye.success("Message envoyé avec succès !"),c()}})};return a.jsx("div",{className:"",children:a.jsxs("footer",{className:"bg-gradient-to-b from-base-200 to-base-100 py-16 border-t-4 border-primary",children:[a.jsx("div",{className:"container mx-auto px-4",children:a.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-12 gap-8",children:[a.jsx("div",{className:"md:col-span-5",children:a.jsxs("div",{className:"space-y-4",children:[a.jsxs("h3",{className:"text-primary font-bold flex items-center",children:[a.jsx("i",{className:"bi bi-info-circle mr-2"})," À propos"]}),a.jsxs("div",{className:"text-base-content",children:["Bienvenue sur ",a.jsx("a",{href:"/",className:"text-2xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary",children:"mon-site"})," !",a.jsx("p",{className:"mt-2",children:"Nous sommes une plateforme en ligne dédiée à fournir des réponses claires et précises à vos questions, quelle que soit leur domaine."})]}),a.jsx("button",{className:"btn btn-link text-primary hover:text-primary-focus no-underline",onClick:()=>t(!0),children:"En savoir plus →"})]})}),a.jsxs("dialog",{open:e,className:"modal",children:[a.jsxs("div",{className:"modal-box max-w-2xl max-h-[90vh] overflow-y-auto bg-base-200",children:[a.jsxs("div",{className:"flex justify-between items-center border-b border-base-300 pb-4",children:[a.jsxs("h5",{className:"text-xl font-bold text-primary",children:[a.jsx("i",{className:"bi bi-info-circle mr-2"})," À propos"]}),a.jsx("button",{onClick:()=>t(!1),className:"btn btn-sm btn-circle btn-ghost",children:"✕"})]}),a.jsxs("div",{className:"mt-6 text-base-content space-y-6",children:[a.jsxs("div",{children:[a.jsx("p",{className:"font-bold mb-2",children:"À propos de nous : Votre guichet unique pour les questions et les réponses"}),a.jsxs("p",{children:["Bienvenue sur ",a.jsx("span",{className:"text-2xl text-primary",children:"mon-site"})," !"]})]}),a.jsxs("div",{children:[a.jsx("p",{className:"font-bold mb-2",children:"Notre mission :"}),a.jsxs("ul",{className:"list-disc pl-5 space-y-2",children:[a.jsx("li",{children:"Offrir un espace ouvert et convivial où chacun peut poser des questions et obtenir des réponses de qualité."}),a.jsx("li",{children:"Favoriser le partage de connaissances et l'apprentissage continu dans une variété de domaines."}),a.jsx("li",{children:"Cultiver une communauté inclusive et respectueuse où chacun se sent à l'aise pour s'exprimer et apprendre."})]})]}),a.jsxs("div",{children:[a.jsx("p",{className:"font-bold mb-2",children:"Ce qui nous distingue :"}),a.jsxs("ul",{className:"list-disc pl-5 space-y-2",children:[a.jsxs("li",{children:[a.jsx("span",{className:"font-semibold",children:"Diversité des sujets:"})," Nous abordons un large éventail de sujets."]}),a.jsxs("li",{children:[a.jsx("span",{className:"font-semibold",children:"Expertise des contributeurs:"})," Notre communauté regroupe des experts et des passionnés."]}),a.jsxs("li",{children:[a.jsx("span",{className:"font-semibold",children:"Qualité des réponses:"})," Nous nous engageons à fournir des réponses claires et précises."]}),a.jsxs("li",{children:[a.jsx("span",{className:"font-semibold",children:"Approche collaborative:"})," Nous encourageons les interactions entre utilisateurs."]})]})]}),a.jsxs("div",{children:[a.jsx("a",{href:"/register",className:"text-primary hover:text-primary-focus font-bold",children:"Rejoignez-nous !"}),a.jsx("p",{className:"mt-4",children:"Ensemble, construisons un monde où la connaissance est accessible à tous !"})]})]})]}),a.jsx("form",{method:"dialog",className:"modal-backdrop",children:a.jsx("button",{onClick:()=>t(!1),children:"close"})})]}),a.jsx("div",{className:"md:col-span-7",children:a.jsxs("div",{className:"mt-8 pt-8 border-t-4 border-primary",children:[a.jsx("div",{className:"flex flex-wrap items-center justify-between ",children:a.jsxs("div",{className:"flex gap-4 mt-4 md:mt-0 ",children:[a.jsx("a",{href:"https://www.facebook.com/mascodeproduct",className:"btn btn-circle btn-ghost",title:"Constantin Masirika Jr.",children:a.jsx(ee,{className:"text-blue-500 text-xl"})}),a.jsx("a",{href:"https://x.com/negroconstantin",className:"btn btn-circle btn-ghost",title:"Constantin Masirika Jr.",children:a.jsx(re,{className:"text-gray-500 text-xl"})}),a.jsx("a",{href:"https://www.instagram.com/mascodeproduct/",className:"btn btn-circle btn-ghost",title:"Constantin Masirika Jr.",children:a.jsx(se,{className:"text-pink-500 text-xl"})}),a.jsx("a",{href:"https://youtube.com/@masproduct360",className:"btn btn-circle btn-ghost",title:"Constantin Masirika Jr.",children:a.jsx(ae,{className:"text-red-500 text-xl"})}),a.jsx("a",{href:"https://github.com/MasirikaConstantin",className:"btn btn-circle btn-ghost",title:"Constantin Masirika Jr.",children:a.jsx(te,{className:"text-gray-500 text-xl"})})]})}),a.jsxs("div",{className:"mt-8 ",children:[a.jsx("h3",{className:"text-primary font-bold mb-4",children:"Contactez-nous"}),a.jsxs("form",{onSubmit:d,className:"space-y-4",children:[a.jsx("input",{type:"hidden",name:"_token",value:s}),a.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-4",children:[a.jsxs("div",{children:[a.jsx("label",{htmlFor:"name",className:"label",children:a.jsx("span",{className:"label-text",children:"Nom"})}),a.jsx("input",{type:"text",id:"name",name:"nom",value:i.nom,onChange:m=>o("nom",m.target.value),className:"input input-bordered w-full"}),n.nom&&a.jsx("p",{className:"mt-1 text-sm text-error",children:n.nom})]}),a.jsxs("div",{children:[a.jsx("label",{htmlFor:"email",className:"label",children:a.jsx("span",{className:"label-text",children:"Email"})}),a.jsx("input",{type:"email",id:"email",name:"email",value:i.email,onChange:m=>o("email",m.target.value),className:"input input-bordered w-full"}),n.email&&a.jsx("p",{className:"mt-1 text-sm text-error",children:n.email})]})]}),a.jsxs("div",{children:[a.jsx("label",{htmlFor:"message",className:"label",children:a.jsx("span",{className:"label-text",children:"Message"})}),a.jsx("textarea",{id:"message",name:"message",rows:"4",value:i.message,onChange:m=>o("message",m.target.value),className:"textarea textarea-bordered w-full"}),n.message&&a.jsx("p",{className:"mt-1 text-sm text-error",children:n.message})]}),a.jsx("button",{type:"submit",className:"btn btn-primary",disabled:l,children:l?"Envoi en cours...":"Envoyer"})]})]})]})})]})}),a.jsxs("p",{className:"text-base-content text-center mt-6",children:["© 2023 - 2025 ",a.jsx("strong",{children:"Mas Code Product "}),"Company, Inc. Tout droit réservé."]})]})})};export{Ze as F,Ke as O,Ye as V};
