import{r as p,q as P,v as T,j as s}from"./app-Dg0zn_4b.js";import{b as _,c as J,d as H,e as R,f as L}from"./Header-uRdT3SQM.js";let V={data:""},B=e=>typeof window=="object"?((e?e.querySelector("#_goober"):window._goober)||Object.assign((e||document.head).appendChild(document.createElement("style")),{innerHTML:" ",id:"_goober"})).firstChild:e||V,U=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,Y=/\/\*[^]*?\*\/|  +/g,S=/\n+/g,v=(e,t)=>{let r="",o="",l="";for(let a in e){let n=e[a];a[0]=="@"?a[1]=="i"?r=a+" "+n+";":o+=a[1]=="f"?v(n,a):a+"{"+v(n,a[1]=="k"?"":t)+"}":typeof n=="object"?o+=v(n,t?t.replace(/([^,])+/g,i=>a.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,c=>/&/.test(c)?c.replace(/&/g,i):i?i+" "+c:c)):a):n!=null&&(a=/^--/.test(a)?a:a.replace(/[A-Z]/g,"-$&").toLowerCase(),l+=v.p?v.p(a,n):a+":"+n+";")}return r+(t&&l?t+"{"+l+"}":l)+o},b={},q=e=>{if(typeof e=="object"){let t="";for(let r in e)t+=r+q(e[r]);return t}return e},Z=(e,t,r,o,l)=>{let a=q(e),n=b[a]||(b[a]=(c=>{let d=0,m=11;for(;d<c.length;)m=101*m+c.charCodeAt(d++)>>>0;return"go"+m})(a));if(!b[n]){let c=a!==e?e:(d=>{let m,h,x=[{}];for(;m=U.exec(d.replace(Y,""));)m[4]?x.shift():m[3]?(h=m[3].replace(S," ").trim(),x.unshift(x[0][h]=x[0][h]||{})):x[0][m[1]]=m[2].replace(S," ").trim();return x[0]})(e);b[n]=v(l?{["@keyframes "+n]:c}:c,r?"":"."+n)}let i=r&&b.g?b.g:null;return r&&(b.g=b[n]),((c,d,m,h)=>{h?d.data=d.data.replace(h,c):d.data.indexOf(c)===-1&&(d.data=m?c+d.data:d.data+c)})(b[n],t,o,i),n},G=(e,t,r)=>e.reduce((o,l,a)=>{let n=t[a];if(n&&n.call){let i=n(r),c=i&&i.props&&i.props.className||/^go/.test(i)&&i;n=c?"."+c:i&&typeof i=="object"?i.props?"":v(i,""):i===!1?"":i}return o+l+(n??"")},"");function D(e){let t=this||{},r=e.call?e(t.p):e;return Z(r.unshift?r.raw?G(r,[].slice.call(arguments,1),t.p):r.reduce((o,l)=>Object.assign(o,l&&l.call?l(t.p):l),{}):r,B(t.target),t.g,t.o,t.k)}let z,M,O;D.bind({g:1});let g=D.bind({k:1});function K(e,t,r,o){v.p=t,z=e,M=r,O=o}function y(e,t){let r=this||{};return function(){let o=arguments;function l(a,n){let i=Object.assign({},a),c=i.className||l.className;r.p=Object.assign({theme:M&&M()},i),r.o=/ *go\d+/.test(c),i.className=D.apply(r,o)+(c?" "+c:"");let d=e;return e[0]&&(d=i.as||e,delete i.as),O&&d[0]&&O(i),z(d,i)}return t?t(l):l}}var Q=e=>typeof e=="function",$=(e,t)=>Q(e)?e(t):e,W=(()=>{let e=0;return()=>(++e).toString()})(),A=(()=>{let e;return()=>{if(e===void 0&&typeof window<"u"){let t=matchMedia("(prefers-reduced-motion: reduce)");e=!t||t.matches}return e}})(),X=20,I=(e,t)=>{switch(t.type){case 0:return{...e,toasts:[t.toast,...e.toasts].slice(0,X)};case 1:return{...e,toasts:e.toasts.map(a=>a.id===t.toast.id?{...a,...t.toast}:a)};case 2:let{toast:r}=t;return I(e,{type:e.toasts.find(a=>a.id===r.id)?1:0,toast:r});case 3:let{toastId:o}=t;return{...e,toasts:e.toasts.map(a=>a.id===o||o===void 0?{...a,dismissed:!0,visible:!1}:a)};case 4:return t.toastId===void 0?{...e,toasts:[]}:{...e,toasts:e.toasts.filter(a=>a.id!==t.toastId)};case 5:return{...e,pausedAt:t.time};case 6:let l=t.time-(e.pausedAt||0);return{...e,pausedAt:void 0,toasts:e.toasts.map(a=>({...a,pauseDuration:a.pauseDuration+l}))}}},C=[],j={toasts:[],pausedAt:void 0},N=e=>{j=I(j,e),C.forEach(t=>{t(j)})},ee={blank:4e3,error:4e3,success:2e3,loading:1/0,custom:4e3},te=(e={})=>{let[t,r]=p.useState(j),o=p.useRef(j);p.useEffect(()=>(o.current!==j&&r(j),C.push(r),()=>{let a=C.indexOf(r);a>-1&&C.splice(a,1)}),[]);let l=t.toasts.map(a=>{var n,i,c;return{...e,...e[a.type],...a,removeDelay:a.removeDelay||((n=e[a.type])==null?void 0:n.removeDelay)||(e==null?void 0:e.removeDelay),duration:a.duration||((i=e[a.type])==null?void 0:i.duration)||(e==null?void 0:e.duration)||ee[a.type],style:{...e.style,...(c=e[a.type])==null?void 0:c.style,...a.style}}});return{...t,toasts:l}},se=(e,t="blank",r)=>({createdAt:Date.now(),visible:!0,dismissed:!1,type:t,ariaProps:{role:"status","aria-live":"polite"},message:e,pauseDuration:0,...r,id:(r==null?void 0:r.id)||W()}),E=e=>(t,r)=>{let o=se(t,e,r);return N({type:2,toast:o}),o.id},u=(e,t)=>E("blank")(e,t);u.error=E("error");u.success=E("success");u.loading=E("loading");u.custom=E("custom");u.dismiss=e=>{N({type:3,toastId:e})};u.remove=e=>N({type:4,toastId:e});u.promise=(e,t,r)=>{let o=u.loading(t.loading,{...r,...r==null?void 0:r.loading});return typeof e=="function"&&(e=e()),e.then(l=>{let a=t.success?$(t.success,l):void 0;return a?u.success(a,{id:o,...r,...r==null?void 0:r.success}):u.dismiss(o),l}).catch(l=>{let a=t.error?$(t.error,l):void 0;a?u.error(a,{id:o,...r,...r==null?void 0:r.error}):u.dismiss(o)}),e};var ae=(e,t)=>{N({type:1,toast:{id:e,height:t}})},re=()=>{N({type:5,time:Date.now()})},w=new Map,ie=1e3,oe=(e,t=ie)=>{if(w.has(e))return;let r=setTimeout(()=>{w.delete(e),N({type:4,toastId:e})},t);w.set(e,r)},ne=e=>{let{toasts:t,pausedAt:r}=te(e);p.useEffect(()=>{if(r)return;let a=Date.now(),n=t.map(i=>{if(i.duration===1/0)return;let c=(i.duration||0)+i.pauseDuration-(a-i.createdAt);if(c<0){i.visible&&u.dismiss(i.id);return}return setTimeout(()=>u.dismiss(i.id),c)});return()=>{n.forEach(i=>i&&clearTimeout(i))}},[t,r]);let o=p.useCallback(()=>{r&&N({type:6,time:Date.now()})},[r]),l=p.useCallback((a,n)=>{let{reverseOrder:i=!1,gutter:c=8,defaultPosition:d}=n||{},m=t.filter(f=>(f.position||d)===(a.position||d)&&f.height),h=m.findIndex(f=>f.id===a.id),x=m.filter((f,F)=>F<h&&f.visible).length;return m.filter(f=>f.visible).slice(...i?[x+1]:[0,x]).reduce((f,F)=>f+(F.height||0)+c,0)},[t]);return p.useEffect(()=>{t.forEach(a=>{if(a.dismissed)oe(a.id,a.removeDelay);else{let n=w.get(a.id);n&&(clearTimeout(n),w.delete(a.id))}})},[t]),{toasts:t,handlers:{updateHeight:ae,startPause:re,endPause:o,calculateOffset:l}}},le=g`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`,ce=g`
from {
  transform: scale(0);
  opacity: 0;
}
to {
  transform: scale(1);
  opacity: 1;
}`,de=g`
from {
  transform: scale(0) rotate(90deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(90deg);
	opacity: 1;
}`,me=y("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#ff4b4b"};
  position: relative;
  transform: rotate(45deg);

  animation: ${le} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;

  &:after,
  &:before {
    content: '';
    animation: ${ce} 0.15s ease-out forwards;
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
    animation: ${de} 0.15s ease-out forwards;
    animation-delay: 180ms;
    transform: rotate(90deg);
  }
`,pe=g`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`,ue=y("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${e=>e.secondary||"#e0e0e0"};
  border-right-color: ${e=>e.primary||"#616161"};
  animation: ${pe} 1s linear infinite;
`,xe=g`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(45deg);
	opacity: 1;
}`,he=g`
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
}`,fe=y("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#61d345"};
  position: relative;
  transform: rotate(45deg);

  animation: ${xe} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;
  &:after {
    content: '';
    box-sizing: border-box;
    animation: ${he} 0.2s ease-out forwards;
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
`,be=y("div")`
  position: absolute;
`,ge=y("div")`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 20px;
  min-height: 20px;
`,ve=g`
from {
  transform: scale(0.6);
  opacity: 0.4;
}
to {
  transform: scale(1);
  opacity: 1;
}`,ye=y("div")`
  position: relative;
  transform: scale(0.6);
  opacity: 0.4;
  min-width: 20px;
  animation: ${ve} 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
`,je=({toast:e})=>{let{icon:t,type:r,iconTheme:o}=e;return t!==void 0?typeof t=="string"?p.createElement(ye,null,t):t:r==="blank"?null:p.createElement(ge,null,p.createElement(ue,{...o}),r!=="loading"&&p.createElement(be,null,r==="error"?p.createElement(me,{...o}):p.createElement(fe,{...o})))},Ne=e=>`
0% {transform: translate3d(0,${e*-200}%,0) scale(.6); opacity:.5;}
100% {transform: translate3d(0,0,0) scale(1); opacity:1;}
`,we=e=>`
0% {transform: translate3d(0,0,-1px) scale(1); opacity:1;}
100% {transform: translate3d(0,${e*-150}%,-1px) scale(.6); opacity:0;}
`,Ee="0%{opacity:0;} 100%{opacity:1;}",ke="0%{opacity:1;} 100%{opacity:0;}",Ce=y("div")`
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
`,$e=y("div")`
  display: flex;
  justify-content: center;
  margin: 4px 10px;
  color: inherit;
  flex: 1 1 auto;
  white-space: pre-line;
`,De=(e,t)=>{let r=e.includes("top")?1:-1,[o,l]=A()?[Ee,ke]:[Ne(r),we(r)];return{animation:t?`${g(o)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${g(l)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}},Fe=p.memo(({toast:e,position:t,style:r,children:o})=>{let l=e.height?De(e.position||t||"top-center",e.visible):{opacity:0},a=p.createElement(je,{toast:e}),n=p.createElement($e,{...e.ariaProps},$(e.message,e));return p.createElement(Ce,{className:e.className,style:{...l,...r,...e.style}},typeof o=="function"?o({icon:a,message:n}):p.createElement(p.Fragment,null,a,n))});K(p.createElement);var Me=({id:e,className:t,style:r,onHeightUpdate:o,children:l})=>{let a=p.useCallback(n=>{if(n){let i=()=>{let c=n.getBoundingClientRect().height;o(e,c)};i(),new MutationObserver(i).observe(n,{subtree:!0,childList:!0,characterData:!0})}},[e,o]);return p.createElement("div",{ref:a,className:t,style:r},l)},Oe=(e,t)=>{let r=e.includes("top"),o=r?{top:0}:{bottom:0},l=e.includes("center")?{justifyContent:"center"}:e.includes("right")?{justifyContent:"flex-end"}:{};return{left:0,right:0,display:"flex",position:"absolute",transition:A()?void 0:"all 230ms cubic-bezier(.21,1.02,.73,1)",transform:`translateY(${t*(r?1:-1)}px)`,...o,...l}},Se=D`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`,k=16,Ie=({reverseOrder:e,position:t="top-center",toastOptions:r,gutter:o,children:l,containerStyle:a,containerClassName:n})=>{let{toasts:i,handlers:c}=ne(r);return p.createElement("div",{id:"_rht_toaster",style:{position:"fixed",zIndex:9999,top:k,left:k,right:k,bottom:k,pointerEvents:"none",...a},className:n,onMouseEnter:c.startPause,onMouseLeave:c.endPause},i.map(d=>{let m=d.position||t,h=c.calculateOffset(d,{reverseOrder:e,gutter:o,defaultPosition:t}),x=Oe(m,h);return p.createElement(Me,{id:d.id,key:d.id,onHeightUpdate:c.updateHeight,className:d.visible?Se:"",style:x},d.type==="custom"?$(d.message,d):l?l(d):p.createElement(Fe,{toast:d,position:m}))}))},qe=u;const Pe=()=>{const[e,t]=p.useState(!1),{csrf:r}=P().props,{data:o,setData:l,post:a,processing:n,errors:i,reset:c}=T({nom:"",email:"",message:""}),d=m=>{m.preventDefault(),a("/contact",{preserveScroll:!0,onSuccess:()=>{qe.success("Message envoyé avec succès !"),c()}})};return s.jsx("div",{className:"",children:s.jsxs("footer",{className:"bg-gradient-to-b from-base-200 to-base-100 py-16 border-t-4 border-primary",children:[s.jsx("div",{className:"container mx-auto px-4",children:s.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-12 gap-8",children:[s.jsx("div",{className:"md:col-span-5",children:s.jsxs("div",{className:"space-y-4",children:[s.jsxs("h3",{className:"text-primary font-bold flex items-center",children:[s.jsx("i",{className:"bi bi-info-circle mr-2"})," À propos"]}),s.jsxs("div",{className:"text-base-content",children:["Bienvenue sur ",s.jsx("a",{href:"/",className:"text-2xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary",children:"mon-site"})," !",s.jsx("p",{className:"mt-2",children:"Nous sommes une plateforme en ligne dédiée à fournir des réponses claires et précises à vos questions, quelle que soit leur domaine."})]}),s.jsx("button",{className:"btn btn-link text-primary hover:text-primary-focus no-underline",onClick:()=>t(!0),children:"En savoir plus →"})]})}),s.jsxs("dialog",{open:e,className:"modal",children:[s.jsxs("div",{className:"modal-box max-w-2xl max-h-[90vh] overflow-y-auto bg-base-200",children:[s.jsxs("div",{className:"flex justify-between items-center border-b border-base-300 pb-4",children:[s.jsxs("h5",{className:"text-xl font-bold text-primary",children:[s.jsx("i",{className:"bi bi-info-circle mr-2"})," À propos"]}),s.jsx("button",{onClick:()=>t(!1),className:"btn btn-sm btn-circle btn-ghost",children:"✕"})]}),s.jsxs("div",{className:"mt-6 text-base-content space-y-6",children:[s.jsxs("div",{children:[s.jsx("p",{className:"font-bold mb-2",children:"À propos de nous : Votre guichet unique pour les questions et les réponses"}),s.jsxs("p",{children:["Bienvenue sur ",s.jsx("span",{className:"text-2xl text-primary",children:"mon-site"})," !"]})]}),s.jsxs("div",{children:[s.jsx("p",{className:"font-bold mb-2",children:"Notre mission :"}),s.jsxs("ul",{className:"list-disc pl-5 space-y-2",children:[s.jsx("li",{children:"Offrir un espace ouvert et convivial où chacun peut poser des questions et obtenir des réponses de qualité."}),s.jsx("li",{children:"Favoriser le partage de connaissances et l'apprentissage continu dans une variété de domaines."}),s.jsx("li",{children:"Cultiver une communauté inclusive et respectueuse où chacun se sent à l'aise pour s'exprimer et apprendre."})]})]}),s.jsxs("div",{children:[s.jsx("p",{className:"font-bold mb-2",children:"Ce qui nous distingue :"}),s.jsxs("ul",{className:"list-disc pl-5 space-y-2",children:[s.jsxs("li",{children:[s.jsx("span",{className:"font-semibold",children:"Diversité des sujets:"})," Nous abordons un large éventail de sujets."]}),s.jsxs("li",{children:[s.jsx("span",{className:"font-semibold",children:"Expertise des contributeurs:"})," Notre communauté regroupe des experts et des passionnés."]}),s.jsxs("li",{children:[s.jsx("span",{className:"font-semibold",children:"Qualité des réponses:"})," Nous nous engageons à fournir des réponses claires et précises."]}),s.jsxs("li",{children:[s.jsx("span",{className:"font-semibold",children:"Approche collaborative:"})," Nous encourageons les interactions entre utilisateurs."]})]})]}),s.jsxs("div",{children:[s.jsx("a",{href:"/register",className:"text-primary hover:text-primary-focus font-bold",children:"Rejoignez-nous !"}),s.jsx("p",{className:"mt-4",children:"Ensemble, construisons un monde où la connaissance est accessible à tous !"})]})]})]}),s.jsx("form",{method:"dialog",className:"modal-backdrop",children:s.jsx("button",{onClick:()=>t(!1),children:"close"})})]}),s.jsx("div",{className:"md:col-span-7",children:s.jsxs("div",{className:"mt-8 pt-8 border-t-4 border-primary",children:[s.jsx("div",{className:"flex flex-wrap items-center justify-between ",children:s.jsxs("div",{className:"flex gap-4 mt-4 md:mt-0 ",children:[s.jsx("a",{href:"https://www.facebook.com/mascodeproduct",className:"btn btn-circle btn-ghost",title:"Constantin Masirika Jr.",children:s.jsx(_,{className:"text-blue-500 text-xl"})}),s.jsx("a",{href:"https://x.com/negroconstantin",className:"btn btn-circle btn-ghost",title:"Constantin Masirika Jr.",children:s.jsx(J,{className:"text-gray-500 text-xl"})}),s.jsx("a",{href:"https://www.instagram.com/mascodeproduct/",className:"btn btn-circle btn-ghost",title:"Constantin Masirika Jr.",children:s.jsx(H,{className:"text-pink-500 text-xl"})}),s.jsx("a",{href:"https://youtube.com/@masproduct360",className:"btn btn-circle btn-ghost",title:"Constantin Masirika Jr.",children:s.jsx(R,{className:"text-red-500 text-xl"})}),s.jsx("a",{href:"https://github.com/MasirikaConstantin",className:"btn btn-circle btn-ghost",title:"Constantin Masirika Jr.",children:s.jsx(L,{className:"text-gray-500 text-xl"})})]})}),s.jsxs("div",{className:"mt-8 ",children:[s.jsx("h3",{className:"text-primary font-bold mb-4",children:"Contactez-nous"}),s.jsxs("form",{onSubmit:d,className:"space-y-4",children:[s.jsx("input",{type:"hidden",name:"_token",value:r}),s.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-4",children:[s.jsxs("div",{children:[s.jsx("label",{htmlFor:"name",className:"label",children:s.jsx("span",{className:"label-text",children:"Nom"})}),s.jsx("input",{type:"text",id:"name",name:"nom",value:o.nom,onChange:m=>l("nom",m.target.value),className:"input input-bordered w-full"}),i.nom&&s.jsx("p",{className:"mt-1 text-sm text-error",children:i.nom})]}),s.jsxs("div",{children:[s.jsx("label",{htmlFor:"email",className:"label",children:s.jsx("span",{className:"label-text",children:"Email"})}),s.jsx("input",{type:"email",id:"email",name:"email",value:o.email,onChange:m=>l("email",m.target.value),className:"input input-bordered w-full"}),i.email&&s.jsx("p",{className:"mt-1 text-sm text-error",children:i.email})]})]}),s.jsxs("div",{children:[s.jsx("label",{htmlFor:"message",className:"label",children:s.jsx("span",{className:"label-text",children:"Message"})}),s.jsx("textarea",{id:"message",name:"message",rows:"4",value:o.message,onChange:m=>l("message",m.target.value),className:"textarea textarea-bordered w-full"}),i.message&&s.jsx("p",{className:"mt-1 text-sm text-error",children:i.message})]}),s.jsx("button",{type:"submit",className:"btn btn-primary",disabled:n,children:n?"Envoi en cours...":"Envoyer"})]})]})]})})]})}),s.jsxs("p",{className:"text-base-content text-center mt-6",children:["© 2023 - 2025 ",s.jsx("strong",{children:"Mas Code Product "}),"Company, Inc. Tout droit réservé."]})]})})};export{Pe as F,Ie as O,qe as V};
