(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function n(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(s){if(s.ep)return;s.ep=!0;const r=n(s);fetch(s.href,r)}})();function Sa(t,e){t.indexOf(e)===-1&&t.push(e)}const Ar=(t,e,n)=>Math.min(Math.max(n,t),e),Q={duration:.3,delay:0,endDelay:0,repeat:0,easing:"ease"},St=t=>typeof t=="number",qe=t=>Array.isArray(t)&&!St(t[0]),Ea=(t,e,n)=>{const i=e-t;return((n-t)%i+i)%i+t};function ka(t,e){return qe(t)?t[Ea(0,t.length,e)]:t}const Nr=(t,e,n)=>-n*t+n*e+t,Rr=()=>{},ge=t=>t,Ti=(t,e,n)=>e-t===0?1:(n-t)/(e-t);function xr(t,e){const n=t[t.length-1];for(let i=1;i<=e;i++){const s=Ti(0,e,i);t.push(Nr(n,1,s))}}function Ta(t){const e=[0];return xr(e,t-1),e}function Ia(t,e=Ta(t.length),n=ge){const i=t.length,s=i-e.length;return s>0&&xr(e,s),r=>{let o=0;for(;o<i-2&&!(r<e[o+1]);o++);let a=Ar(0,1,Ti(e[o],e[o+1],r));return a=ka(n,o)(a),Nr(t[o],t[o+1],a)}}const Pr=t=>Array.isArray(t)&&St(t[0]),Qn=t=>typeof t=="object"&&!!t.createAnimation,Ye=t=>typeof t=="function",Aa=t=>typeof t=="string",_t={ms:t=>t*1e3,s:t=>t/1e3},Dr=(t,e,n)=>(((1-3*n+3*e)*t+(3*n-6*e))*t+3*e)*t,Na=1e-7,Ra=12;function xa(t,e,n,i,s){let r,o,a=0;do o=e+(n-e)/2,r=Dr(o,i,s)-t,r>0?n=o:e=o;while(Math.abs(r)>Na&&++a<Ra);return o}function pt(t,e,n,i){if(t===e&&n===i)return ge;const s=r=>xa(r,0,1,t,n);return r=>r===0||r===1?r:Dr(s(r),e,i)}const Pa=(t,e="end")=>n=>{n=e==="end"?Math.min(n,.999):Math.max(n,.001);const i=n*t,s=e==="end"?Math.floor(i):Math.ceil(i);return Ar(0,1,s/t)},Da={ease:pt(.25,.1,.25,1),"ease-in":pt(.42,0,1,1),"ease-in-out":pt(.42,0,.58,1),"ease-out":pt(0,0,.58,1)},Oa=/\((.*?)\)/;function Xn(t){if(Ye(t))return t;if(Pr(t))return pt(...t);const e=Da[t];if(e)return e;if(t.startsWith("steps")){const n=Oa.exec(t);if(n){const i=n[1].split(",");return Pa(parseFloat(i[0]),i[1].trim())}}return ge}class Or{constructor(e,n=[0,1],{easing:i,duration:s=Q.duration,delay:r=Q.delay,endDelay:o=Q.endDelay,repeat:a=Q.repeat,offset:l,direction:c="normal",autoplay:d=!0}={}){if(this.startTime=null,this.rate=1,this.t=0,this.cancelTimestamp=null,this.easing=ge,this.duration=0,this.totalDuration=0,this.repeat=0,this.playState="idle",this.finished=new Promise((f,g)=>{this.resolve=f,this.reject=g}),i=i||Q.easing,Qn(i)){const f=i.createAnimation(n);i=f.easing,n=f.keyframes||n,s=f.duration||s}this.repeat=a,this.easing=qe(i)?ge:Xn(i),this.updateDuration(s);const h=Ia(n,l,qe(i)?i.map(Xn):ge);this.tick=f=>{var g;r=r;let _=0;this.pauseTime!==void 0?_=this.pauseTime:_=(f-this.startTime)*this.rate,this.t=_,_/=1e3,_=Math.max(_-r,0),this.playState==="finished"&&this.pauseTime===void 0&&(_=this.totalDuration);const k=_/this.duration;let O=Math.floor(k),B=k%1;!B&&k>=1&&(B=1),B===1&&O--;const Y=O%2;(c==="reverse"||c==="alternate"&&Y||c==="alternate-reverse"&&!Y)&&(B=1-B);const Z=_>=this.totalDuration?1:Math.min(B,1),J=h(this.easing(Z));e(J),this.pauseTime===void 0&&(this.playState==="finished"||_>=this.totalDuration+o)?(this.playState="finished",(g=this.resolve)===null||g===void 0||g.call(this,J)):this.playState!=="idle"&&(this.frameRequestId=requestAnimationFrame(this.tick))},d&&this.play()}play(){const e=performance.now();this.playState="running",this.pauseTime!==void 0?this.startTime=e-this.pauseTime:this.startTime||(this.startTime=e),this.cancelTimestamp=this.startTime,this.pauseTime=void 0,this.frameRequestId=requestAnimationFrame(this.tick)}pause(){this.playState="paused",this.pauseTime=this.t}finish(){this.playState="finished",this.tick(0)}stop(){var e;this.playState="idle",this.frameRequestId!==void 0&&cancelAnimationFrame(this.frameRequestId),(e=this.reject)===null||e===void 0||e.call(this,!1)}cancel(){this.stop(),this.tick(this.cancelTimestamp)}reverse(){this.rate*=-1}commitStyles(){}updateDuration(e){this.duration=e,this.totalDuration=e*(this.repeat+1)}get currentTime(){return this.t}set currentTime(e){this.pauseTime!==void 0||this.rate===0?this.pauseTime=e:this.startTime=performance.now()-e/this.rate}get playbackRate(){return this.rate}set playbackRate(e){this.rate=e}}class Ma{setAnimation(e){this.animation=e,e==null||e.finished.then(()=>this.clearAnimation()).catch(()=>{})}clearAnimation(){this.animation=this.generator=void 0}}const Mn=new WeakMap;function Mr(t){return Mn.has(t)||Mn.set(t,{transforms:[],values:new Map}),Mn.get(t)}function La(t,e){return t.has(e)||t.set(e,new Ma),t.get(e)}const Fa=["","X","Y","Z"],$a=["translate","scale","rotate","skew"],tn={x:"translateX",y:"translateY",z:"translateZ"},bs={syntax:"<angle>",initialValue:"0deg",toDefaultUnit:t=>t+"deg"},Ba={translate:{syntax:"<length-percentage>",initialValue:"0px",toDefaultUnit:t=>t+"px"},rotate:bs,scale:{syntax:"<number>",initialValue:1,toDefaultUnit:ge},skew:bs},Et=new Map,Ii=t=>`--motion-${t}`,nn=["x","y","z"];$a.forEach(t=>{Fa.forEach(e=>{nn.push(t+e),Et.set(Ii(t+e),Ba[t])})});const Ha=(t,e)=>nn.indexOf(t)-nn.indexOf(e),Wa=new Set(nn),Lr=t=>Wa.has(t),Ua=(t,e)=>{tn[e]&&(e=tn[e]);const{transforms:n}=Mr(t);Sa(n,e),t.style.transform=qa(n)},qa=t=>t.sort(Ha).reduce(ja,"").trim(),ja=(t,e)=>`${t} ${e}(var(${Ii(e)}))`,Jn=t=>t.startsWith("--"),ws=new Set;function Ga(t){if(!ws.has(t)){ws.add(t);try{const{syntax:e,initialValue:n}=Et.has(t)?Et.get(t):{};CSS.registerProperty({name:t,inherits:!1,syntax:e,initialValue:n})}catch{}}}const Ln=(t,e)=>document.createElement("div").animate(t,e),Cs={cssRegisterProperty:()=>typeof CSS<"u"&&Object.hasOwnProperty.call(CSS,"registerProperty"),waapi:()=>Object.hasOwnProperty.call(Element.prototype,"animate"),partialKeyframes:()=>{try{Ln({opacity:[1]})}catch{return!1}return!0},finished:()=>!!Ln({opacity:[0,1]},{duration:.001}).finished,linearEasing:()=>{try{Ln({opacity:0},{easing:"linear(0, 1)"})}catch{return!1}return!0}},Fn={},He={};for(const t in Cs)He[t]=()=>(Fn[t]===void 0&&(Fn[t]=Cs[t]()),Fn[t]);const Va=.015,za=(t,e)=>{let n="";const i=Math.round(e/Va);for(let s=0;s<i;s++)n+=t(Ti(0,i-1,s))+", ";return n.substring(0,n.length-2)},Ss=(t,e)=>Ye(t)?He.linearEasing()?`linear(${za(t,e)})`:Q.easing:Pr(t)?Ka(t):t,Ka=([t,e,n,i])=>`cubic-bezier(${t}, ${e}, ${n}, ${i})`;function Ya(t,e){for(let n=0;n<t.length;n++)t[n]===null&&(t[n]=n?t[n-1]:e());return t}const Za=t=>Array.isArray(t)?t:[t];function ei(t){return tn[t]&&(t=tn[t]),Lr(t)?Ii(t):t}const Vt={get:(t,e)=>{e=ei(e);let n=Jn(e)?t.style.getPropertyValue(e):getComputedStyle(t)[e];if(!n&&n!==0){const i=Et.get(e);i&&(n=i.initialValue)}return n},set:(t,e,n)=>{e=ei(e),Jn(e)?t.style.setProperty(e,n):t.style[e]=n}};function Fr(t,e=!0){if(!(!t||t.playState==="finished"))try{t.stop?t.stop():(e&&t.commitStyles(),t.cancel())}catch{}}function Qa(t,e){var n;let i=(e==null?void 0:e.toDefaultUnit)||ge;const s=t[t.length-1];if(Aa(s)){const r=((n=s.match(/(-?[\d.]+)([a-z%]*)/))===null||n===void 0?void 0:n[2])||"";r&&(i=o=>o+r)}return i}function Xa(){return window.__MOTION_DEV_TOOLS_RECORD}function Ja(t,e,n,i={},s){const r=Xa(),o=i.record!==!1&&r;let a,{duration:l=Q.duration,delay:c=Q.delay,endDelay:d=Q.endDelay,repeat:h=Q.repeat,easing:f=Q.easing,persist:g=!1,direction:_,offset:k,allowWebkitAcceleration:O=!1,autoplay:B=!0}=i;const Y=Mr(t),Z=Lr(e);let J=He.waapi();Z&&Ua(t,e);const G=ei(e),Ce=La(Y.values,G),ee=Et.get(G);return Fr(Ce.animation,!(Qn(f)&&Ce.generator)&&i.record!==!1),()=>{const Se=()=>{var v,T;return(T=(v=Vt.get(t,G))!==null&&v!==void 0?v:ee==null?void 0:ee.initialValue)!==null&&T!==void 0?T:0};let p=Ya(Za(n),Se);const b=Qa(p,ee);if(Qn(f)){const v=f.createAnimation(p,e!=="opacity",Se,G,Ce);f=v.easing,p=v.keyframes||p,l=v.duration||l}if(Jn(G)&&(He.cssRegisterProperty()?Ga(G):J=!1),Z&&!He.linearEasing()&&(Ye(f)||qe(f)&&f.some(Ye))&&(J=!1),J){ee&&(p=p.map(F=>St(F)?ee.toDefaultUnit(F):F)),p.length===1&&(!He.partialKeyframes()||o)&&p.unshift(Se());const v={delay:_t.ms(c),duration:_t.ms(l),endDelay:_t.ms(d),easing:qe(f)?void 0:Ss(f,l),direction:_,iterations:h+1,fill:"both"};a=t.animate({[G]:p,offset:k,easing:qe(f)?f.map(F=>Ss(F,l)):void 0},v),a.finished||(a.finished=new Promise((F,ae)=>{a.onfinish=F,a.oncancel=ae}));const T=p[p.length-1];a.finished.then(()=>{g||(Vt.set(t,G,T),a.cancel())}).catch(Rr),O||(a.playbackRate=1.000001)}else if(s&&Z)p=p.map(v=>typeof v=="string"?parseFloat(v):v),p.length===1&&p.unshift(parseFloat(Se())),a=new s(v=>{Vt.set(t,G,b?b(v):v)},p,Object.assign(Object.assign({},i),{duration:l,easing:f}));else{const v=p[p.length-1];Vt.set(t,G,ee&&St(v)?ee.toDefaultUnit(v):v)}return o&&r(t,e,p,{duration:l,delay:c,easing:f,repeat:h,offset:k},"motion-one"),Ce.setAnimation(a),a&&!B&&a.pause(),a}}const el=(t,e)=>t[e]?Object.assign(Object.assign({},t),t[e]):Object.assign({},t);function tl(t,e){return typeof t=="string"?t=document.querySelectorAll(t):t instanceof Element&&(t=[t]),Array.from(t||[])}const nl=t=>t(),$r=(t,e,n=Q.duration)=>new Proxy({animations:t.map(nl).filter(Boolean),duration:n,options:e},sl),il=t=>t.animations[0],sl={get:(t,e)=>{const n=il(t);switch(e){case"duration":return t.duration;case"currentTime":return _t.s((n==null?void 0:n[e])||0);case"playbackRate":case"playState":return n==null?void 0:n[e];case"finished":return t.finished||(t.finished=Promise.all(t.animations.map(rl)).catch(Rr)),t.finished;case"stop":return()=>{t.animations.forEach(i=>Fr(i))};case"forEachNative":return i=>{t.animations.forEach(s=>i(s,t))};default:return typeof(n==null?void 0:n[e])>"u"?void 0:()=>t.animations.forEach(i=>i[e]())}},set:(t,e,n)=>{switch(e){case"currentTime":n=_t.ms(n);case"playbackRate":for(let i=0;i<t.animations.length;i++)t.animations[i][e]=n;return!0}return!1}},rl=t=>t.finished;function Bt(t=.1,{start:e=0,from:n=0,easing:i}={}){return(s,r)=>{const o=St(n)?n:ol(n,r),a=Math.abs(o-s);let l=t*a;if(i){const c=r*t;l=Xn(i)(l/c)*c}return e+l}}function ol(t,e){if(t==="first")return 0;{const n=e-1;return t==="last"?n:n/2}}function al(t,e,n){return Ye(t)?t(e,n):t}function ll(t){return function(n,i,s={}){n=tl(n);const r=n.length,o=[];for(let a=0;a<r;a++){const l=n[a];for(const c in i){const d=el(s,c);d.delay=al(d.delay,a,r);const h=Ja(l,c,i[c],d,t);o.push(h)}}return $r(o,s,s.duration)}}const cl=ll(Or);function hl(t,e={}){return $r([()=>{const n=new Or(t,[0,1],e);return n.finished.catch(()=>{}),n}],e,e.duration)}function P(t,e,n){return(Ye(t)?hl:cl)(t,e,n)}function dl(){const t=document.querySelector(".view-shell");t&&P(t,{opacity:[0,1],transform:["scale(0.95) translateY(10px)","scale(1) translateY(0)"]},{duration:.5,easing:"cubic-bezier(0.34, 1.56, 0.64, 1)"})}function ul(){const t=document.querySelector(".hero-panel");if(!t)return;const e=t.querySelector(".hero-copy"),n=t.querySelector(".hero-cta-row");e&&P(e,{opacity:[0,1],transform:["translateX(-20px)","translateX(0)"]},{duration:.6,delay:.1,easing:"ease-out"}),n&&P(n,{opacity:[0,1],transform:["translateY(20px)","translateY(0)"]},{duration:.5,delay:.3,easing:"ease-out"})}function fl(){const t=document.querySelectorAll(".hero-grid > section");t.length&&P(t,{opacity:[0,1],transform:["scale(0.9)","scale(1)"]},{duration:.5,delay:Bt(.1,{start:.2}),easing:"ease-out"})}function pl(){const t=document.querySelectorAll(".timeline-card");t.length&&P(t,{opacity:[0,1],transform:["translateX(-30px)","translateX(0)"]},{duration:.5,delay:Bt(.15,{start:.2}),easing:"cubic-bezier(0.34, 1.56, 0.64, 1)"})}function ml(){const t=document.querySelectorAll(".learn-card");t.length&&P(t,{opacity:[0,1],transform:["translateY(28px)","translateY(0)"]},{duration:.8,delay:Bt(.12,{start:.18}),easing:"cubic-bezier(0.22, 1, 0.36, 1)"})}function gl(){const t=document.querySelector(".action-banner");t&&P(t,{opacity:[0,1],transform:["scale(0.95)","scale(1)"]},{duration:.6,delay:.4,easing:"ease-out"})}function _l(){const t=document.querySelectorAll(".roster-card");t.length&&P(t,{opacity:[0,1],transform:["translateY(10px)","translateY(0)"]},{duration:.4,delay:Bt(.05,{start:.1}),easing:"ease-out"})}function yl(){const t=document.querySelectorAll(".sheet-tab");t.length&&P(t,{opacity:[0,1],scale:[.95,1]},{duration:.3,delay:Bt(.05),easing:"ease-out"})}function $n(t,e){t instanceof HTMLElement&&Object.assign(t.style,e)}function Es(t,e){t.forEach(n=>{n instanceof HTMLElement&&Object.assign(n.style,e)})}function vl(){const t=document.querySelector(".builder-hero"),e=document.querySelector(".sheet-panel"),n=document.querySelector(".save-rail"),i=document.querySelectorAll(".sheet-card"),s=document.querySelectorAll(".sheet-tab");$n(t,{opacity:"0",transform:"translateY(24px)"}),$n(e,{opacity:"0",transform:"translateY(24px)"}),$n(n,{opacity:"0",transform:"translateX(-24px)"}),Es(i,{opacity:"0"}),Es(s,{opacity:"0",transform:"scale(0.95)"}),t&&P(t,{opacity:[0,1],transform:["translateY(24px)","translateY(0)"]},{duration:.8,easing:"cubic-bezier(0.22, 1, 0.36, 1)"}),e&&P(e,{opacity:[0,1],transform:["translateY(24px)","translateY(0)"]},{duration:.85,delay:.12,easing:"cubic-bezier(0.22, 1, 0.36, 1)"}),n&&P(n,{opacity:[0,1],transform:["translateX(-24px)","translateX(0)"]},{duration:.75,delay:.08,easing:"cubic-bezier(0.22, 1, 0.36, 1)"})}function bl(){document.querySelectorAll(".pill-button, .ghost-button, .solid-button, .danger-button, .route-link, .sheet-tab").forEach(e=>{e.addEventListener("mouseenter",()=>P(e,{scale:[1,1.05]},{duration:.2,easing:"ease-out"})),e.addEventListener("mouseleave",()=>P(e,{scale:[1.05,1]},{duration:.2,easing:"ease-out"}))})}function wl(){document.querySelectorAll(".roster-card, .sheet-card, .timeline-card, .hero-panel").forEach(e=>{e.addEventListener("mouseenter",()=>P(e,{borderColor:"var(--line-strong)"},{duration:.2})),e.addEventListener("mouseleave",()=>P(e,{borderColor:"var(--line)"},{duration:.2}))})}const ks="アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789@#$%^&|<>[]ABCDEF";function Ts(t,e=900){const n=t.textContent||"",i=performance.now(),s=r=>{const o=Math.min((r-i)/e,1),a=Math.floor(o*n.length);t.textContent=n.split("").map((l,c)=>l===" "||l===`
`||c<a?l:ks[Math.floor(Math.random()*ks.length)]).join(""),o<1?requestAnimationFrame(s):t.textContent=n};requestAnimationFrame(s)}function Cl(t,e=0){const n=t instanceof Element?[t]:Array.from(t);n.length&&n.forEach((i,s)=>{const r=e+s*.08;P(i,{opacity:[0,.8,.2,1],transform:["translateX(-4px)","translateX(2px)","translateX(-1px)","translateX(0)"]},{duration:.45,delay:r,easing:"linear"}),P(i,{borderColor:["rgba(0,255,65,0.8)","var(--line)"]},{duration:1,delay:r+.1,easing:"ease-out"})})}function Sl(t){P(t,{opacity:[0,.5,.1,1,.7,1],filter:["brightness(4) contrast(2)","brightness(0.3)","brightness(3)","brightness(0.8)","brightness(1)"]},{duration:.55,easing:"ease-in-out"})}function El(t){P(t,{opacity:[0,1],backgroundColor:["rgba(0,255,65,0.22)","rgba(0,0,0,0)"]},{duration:1.1,easing:"ease-out"})}function Is(t){P(t,{opacity:[0,1],transform:["translateX(-12px)","translateX(0)"],backgroundColor:["rgba(0,255,65,0.18)","rgba(0,0,0,0)"]},{duration:.4,easing:[.34,1.56,.64,1]})}function kl(){const t=document.querySelector(".pill-button.red-pill"),e=document.querySelector(".pill-button.blue-pill");t&&(t.addEventListener("mouseenter",()=>P(t,{boxShadow:"0 0 28px rgba(220,38,38,0.75)",scale:1.07},{duration:.25})),t.addEventListener("mouseleave",()=>P(t,{boxShadow:"0 0 0px rgba(220,38,38,0)",scale:1},{duration:.25}))),e&&(e.addEventListener("mouseenter",()=>P(e,{boxShadow:"0 0 28px rgba(37,99,235,0.75)",scale:1.07},{duration:.25})),e.addEventListener("mouseleave",()=>P(e,{boxShadow:"0 0 0px rgba(37,99,235,0)",scale:1},{duration:.25})))}function As(t,e=12){const n=[];for(let i=0;i<e;i++)n.push({transform:`translateX(${(Math.random()-.5)*24}px)`,opacity:Math.random()>.2?1:.85});n.push({transform:"translateX(0)",opacity:1}),P(t,n,{duration:.3,easing:"ease-in-out"})}function Tl(){const t=document.querySelectorAll("h1");t.length&&t.forEach((e,n)=>{setTimeout(()=>{As(e,16),setTimeout(()=>As(e,12),350)},30+n*60)})}function Il(){if(dl(),Tl(),document.querySelector(".hero-panel.hero-view")){ul(),setTimeout(fl,200);const t=document.querySelector(".hero-copy h1");t&&setTimeout(()=>Ts(t,900),150)}if(document.querySelector(".learn-view")){ml(),pl(),setTimeout(gl,450);const t=document.querySelector(".learn-view h1");t&&setTimeout(()=>Ts(t,1200),260)}document.querySelector(".jack-in-view")&&(vl(),yl(),setTimeout(()=>Cl(document.querySelectorAll(".sheet-card")),220)),setTimeout(_l,50)}function Al(){bl(),wl(),kl()}const Nl=["Combat","Weapons","Vehicles","Infiltration","Social","Investigative","Physical","Technical","Knowledge","Medical","Survival","Operator"],Jt=[{name:"Aircraft Piloting",attribute:"Agility",category:"Vehicles",source:"general",description:"Piloting a hovercraft and other vehicles that stay airborne during operation. This includes landing, stopping, combat maneuvers, high speed control, etc."},{name:"Ambidextrous",attribute:"Agility",category:"Physical",source:"general",description:"Ability to use both hands equally well for anything."},{name:"Archery",attribute:"Agility",category:"Weapons",source:"general",description:"Propelling arrows with the use of a bow or crossbow. This will also allow the character to do fletching."},{name:"Balancing Feats",attribute:"Agility",category:"Physical",source:"general",description:"Walk tight ropes, juggle, stack plates, etc."},{name:"Dancing",attribute:"Agility",category:"Physical",source:"general",description:"Ballroom dancing, club dancing, ballet, stage performance, etc."},{name:"Driving",attribute:"Agility",category:"Vehicles",source:"general",description:"See Ground Craft Piloting."},{name:"Ground Craft Piloting",attribute:"Agility",category:"Vehicles",source:"general",description:"There are still some wheeled and tracked vehicles in use. This skill represents the ability to control and pilot such craft."},{name:"Gun Fighting",attribute:"Agility",category:"Combat",source:"general",description:"Weapons that use gunpowder, or explosives, to propel a metal slug at your target. Examples include Handguns, Rifles, Shotguns, Submachine Guns, Assault Rifles, Artillery Guns, and Machine Guns."},{name:"Knife Fighting",attribute:"Agility",category:"Combat",source:"general",description:"Fighting with knives using martial fighting skills like Eskrima, Esgrima Criolla, The Andalusian legacy, or Scherma di Stiletto Siciliano. This is an athletic, close combat form of fighting."},{name:"Martial Arts",attribute:"Agility",category:"Combat",source:"general",description:"Formal hand to hand combat techniques — Aikido, Karate, Ju Jitsu, Kendo, etc. Please pick individual styles as each of your fighting skills."},{name:"Polearm fighting",attribute:"Agility",category:"Combat",source:"general",description:"Fighting with close combat weapons in which the main fighting part of the weapon is on the end of a long shaft. Axes, maces, and morning stars are considered polearms."},{name:"Sleight of hand",attribute:"Agility",category:"Infiltration",source:"general",description:"Tricking the eye to see or not see a hand gesture through deception, magic tricks."},{name:"Blade Fighting",attribute:"Agility",category:"Combat",source:"general",description:"Using bladed weapons. Swords are very popular weapons against the Machines in the Real World, because they have been developed to cut through metal."},{name:"Thai Boxing",attribute:"Agility",category:"Combat",source:"general",description:"Thai boxing, a form of hand to hand combat."},{name:"Throwing Weapons",attribute:"Agility",category:"Weapons",source:"general",description:"The skill to aim, balance, and throw a weapon with deadly effectiveness. Throwing weapons include knives, spears, shurikens, and rocks."},{name:"Escape Bonds",attribute:"Agility",category:"Infiltration",source:"general",description:"The ability to get out of handcuffs, ropes, and avoid being held."},{name:"Sci Fi Weapons",attribute:"Agility",category:"Weapons",source:"general",description:"This skill is specific to the weapon the character is using, such as a Plasma Cannon or Laser Rifle. These types of weapons are so unique that a person has to learn each one individually."},{name:"Acrobatics",attribute:"Agility",category:"Physical",source:"general",description:"Flips, vaults, rolls, and tumbling."},{name:"Acting",attribute:"Common Sense",category:"Social",source:"general",description:"Pretending to be someone else, creating emotions at will."},{name:"Animal Training/Handling",attribute:"Common Sense",category:"Survival",source:"general",description:"Training animals to listen to commands, domesticating animals."},{name:"Bartering",attribute:"Common Sense",category:"Social",source:"general",description:"Used to levy better deals in trades. General knowledge of an item's value."},{name:"Blackmarket",attribute:"Common Sense",category:"Social",source:"general",description:"Locating and bargaining in the black market. The character knows who to talk to and what to say to find or sell on the black market."},{name:"Coercion",attribute:"Common Sense",category:"Social",source:"general",description:"Seduction, manipulation, scamming, intimidation, bluffing to get what they want."},{name:"Conceal",attribute:"Common Sense",category:"Infiltration",source:"general",description:"Hiding objects and self."},{name:"Diplomacy",attribute:"Common Sense",category:"Social",source:"general",description:"The ability to convince others of seeing another point of view, and to cut through red tape easier than others."},{name:"Disguises",attribute:"Common Sense",category:"Infiltration",source:"general",description:"Concealing identity with makeup, clothes, change of appearance."},{name:"Gambling",attribute:"Common Sense",category:"Social",source:"general",description:"Statistically improve chances of winning games."},{name:"Gather Information",attribute:"Common Sense",category:"Social",source:"general",description:"Conversing with others to collect information without notice."},{name:"Guerrilla Tactics",attribute:"Common Sense",category:"Knowledge",source:"general",description:"Irregular warfare with small groups of fighters who use tactics like ambushes, sabotage, element of surprise, and raids."},{name:"History of Zion",attribute:"Common Sense",category:"Knowledge",source:"general",description:"A general knowledge of the human history of Zion, or any city or area of choice."},{name:"Interrogate",attribute:"Common Sense",category:"Social",source:"general",description:"Using force and/or manipulation to obtain information."},{name:"Nomad Clan Customs",attribute:"Common Sense",category:"Knowledge",source:"general",description:"Every nomad clan has special customs and ways of doing things, rituals they must perform, etc. This is a knowledge every clansman must have for her clan."},{name:"Philosophy",attribute:"Common Sense",category:"Knowledge",source:"general",description:"Study of problems in the fields of knowledge, reality, values, morals, mind, and existence. Philosophers address these problems using critical thinking and logic."},{name:"Photography",attribute:"Common Sense",category:"Knowledge",source:"general",description:"Digital or film, journalistic, art, sports, picture composition, and modeling."},{name:"Religion",attribute:"Common Sense",category:"Knowledge",source:"general",description:"Study of religious beliefs, behaviors, holidays, traditions, and religious institutions of a specific religion."},{name:"Remote Piloting",attribute:"Common Sense",category:"Vehicles",source:"general",description:"Controlling anything mechanized with remote access controls. Vehicles can have remotes, sentinel frames can be augmented to have remote control capability also. Must have the skills for the vehicle type that is being piloted."},{name:"Snooping",attribute:"Common Sense",category:"Infiltration",source:"general",description:"Knowledge of how to set up bugging devices, detect hidden microphones, video cameras, etc."},{name:"Stalk",attribute:"Common Sense",category:"Investigative",source:"general",description:"To follow someone unnoticed, shadowing."},{name:"Stealth",attribute:"Common Sense",category:"Infiltration",source:"general",description:"Knowledge of how not to be detected. General camouflage and silence techniques. Hide while moving."},{name:"Surveillance",attribute:"Common Sense",category:"Investigative",source:"general",description:"Build and use security with cameras, motion sensors."},{name:"Thieving",attribute:"Common Sense",category:"Infiltration",source:"general",description:"Stealing, pickpocketing."},{name:"Track",attribute:"Common Sense",category:"Investigative",source:"general",description:"To follow someone who cannot be seen by following a trail or clues of his/her passage."},{name:"Linguist",attribute:"Common Sense",category:"Knowledge",source:"general",description:"Understand basic structure of languages, figure out words and phrases from similarly familiar languages."},{name:"Perception",attribute:"Common Sense",category:"Investigative",source:"general",description:"The ability to notice the common things, and pick out the details and the unexpected. Used by the GM to check whether a character notices something — as simple as seeing a canyon off in the distance, or as critical as noticing an ambush ahead."},{name:"PunkSmithing",attribute:"Common Sense",category:"Technical",source:"general",description:"Designing technology from other scavenged bits of machines and broken things."},{name:"Salvage",attribute:"Common Sense",category:"Survival",source:"general",description:"The ability to, with the right tools, remove and collect things of value from where they are. For example, a character who understands sentinel hardware can remove parts from the frame in a way that preserves their trade value."},{name:"Running",attribute:"Endurance",category:"Physical",source:"general",description:"The knowledge of how to pace oneself and increase running endurance. Most Desert clansmen can run for days with little to no rest."},{name:"Survival",attribute:"Endurance",category:"Survival",source:"general",description:"Knowledge of how to survive in a harsh environment such as the wilderness, jungle, mountains, plains, or desert."},{name:"Ice Desert Survival",attribute:"Endurance",category:"Survival",source:"general",description:"A general knowledge of surface arctic survival, foraging skills, flora & fauna, dangerous weather conditions, ice climbing, and other cold climate knowledge."},{name:"Rock climbing",attribute:"Endurance",category:"Physical",source:"general",description:"The knowledge of things like how to belay, climbing techniques, climbing cracks, lead climbing, placing gear, setting anchors, top rope climbing, climbing communication, self rescue and other essential skills."},{name:"Aiming",attribute:"Focus",category:"Combat",source:"general",description:"Aiming is done in game so the character can have a special effect. On a successful aiming task the PC can have a special roleplay event happen — something the player describes to add to the story."},{name:"Art",attribute:"Focus",category:"Knowledge",source:"general",description:"Creating works of art, drawing and painting, sculptures, airbrushing."},{name:"Biology",attribute:"Focus",category:"Knowledge",source:"general",description:"Knowledge of the science of biology and life forms. Covers genetics to ecosystems."},{name:"Chemistry",attribute:"Focus",category:"Knowledge",source:"general",description:"Knowledge of the science of understanding and mixing chemical elements."},{name:"City Speak",attribute:"Focus",category:"Knowledge",source:"general",description:"The knowledge of the tones, inflections, and general jargon that will get you around in the city. Specify the city that you can use City Speak in."},{name:"Demolitions",attribute:"Focus",category:"Technical",source:"general",description:"Knowledge of how to use demolitions, analyze and disarm bombs, set explosives, and make explosives."},{name:"Electronics",attribute:"Focus",category:"Technical",source:"general",description:"Knowledge of how to operate, analyze, repair, and build electronic devices. The character knows how to mess with do-dads and usually keeps things in general working order."},{name:"Encryption",attribute:"Focus",category:"Technical",source:"general",description:"Encode cryptographic information, crack codes."},{name:"First Aid",attribute:"Focus",category:"Medical",source:"general",description:"Stabilizing wounds, treating minor burns and cuts, CPR."},{name:"Forgery",attribute:"Focus",category:"Infiltration",source:"general",description:"Create duplicates of documents, fake IDs, counterfeiting, etc."},{name:"Geology",attribute:"Focus",category:"Knowledge",source:"general",description:"Science of studying solid earth. Geology gives humans insight into what makes up the earth around them and its origins."},{name:"Gunsmith",attribute:"Focus",category:"Weapons",source:"general",description:"A person who repairs, modifies, designs, or builds guns."},{name:"Hand signals",attribute:"Focus",category:"Knowledge",source:"general",description:"This skill is very specific to small groups. It is used in clans for communicating when the conversation is supposed to be private. Each group has its own set of hand signals."},{name:"Hypnotize",attribute:"Focus",category:"Social",source:"general",description:"Getting people into a mental state that makes them more susceptible to suggestions."},{name:"Law",attribute:"Focus",category:"Knowledge",source:"general",description:"Knowledge of the local laws and legal organizations."},{name:"Leadership",attribute:"Focus",category:"Social",source:"general",description:"Ability to gain the respect of a group of people and make them susceptible to influence."},{name:"Locksmithing",attribute:"Focus",category:"Infiltration",source:"general",description:"Understand locking mechanisms, ability to unlock doors, safes, combination, key, and electronic pads."},{name:"Medical Knowledge",attribute:"Focus",category:"Medical",source:"general",description:"Knowledge of how to stitch people up. An understanding of first aid, battlefield surgery, and proper sterilization techniques. At the teacher level, the character can perform surgery on people."},{name:"Navigate",attribute:"Focus",category:"Knowledge",source:"general",description:"Ability to use navigation equipment to plot and hold a course."},{name:"System Operations",attribute:"Focus",category:"Knowledge",source:"general",description:"The physical and theoretical knowledge of the Machines, sentinels, and frames. The understanding of how they tick, what they do, etc."},{name:"Vehicle Repair (by piloting type)",attribute:"Focus",category:"Vehicles",source:"general",description:"The character can rebuild an engine, set a hovercraft's anti-grav controls. Depending on what it is and the type of equipment one has, the character can fix whatever is in front of them."},{name:"Writing",attribute:"Focus",category:"Knowledge",source:"general",description:"The ability to write down spoken words in one's own language, to organize thoughts into written forms like poetry, prose, fiction, and non-fiction."},{name:"Blacksmith",attribute:"Focus",category:"Technical",source:"general",description:"Metallurgy, melting, and casting new objects from various metals and scraps."},{name:"Boxing",attribute:"Strength",category:"Combat",source:"general",description:"Trained fist fighting."},{name:"Brawling",attribute:"Strength",category:"Combat",source:"general",description:"Untrained street fighting."},{name:"Fitness",attribute:"Strength",category:"Physical",source:"general",description:"Ability to work out and keep physically active to improve health."},{name:"Parkor",attribute:"Strength",category:"Physical",source:"general",description:"A physical discipline which focuses on efficient movement around obstacles."},{name:"Swimming",attribute:"Strength",category:"Physical",source:"general",description:"Studying the mechanics of swimming for extra speed and strength. The knowledge of different swim strokes like freestyle, backstroke, breaststroke, and butterfly."},{name:"Programming",attribute:"Focus",category:"Operator",source:"operator",description:"Being able to read the Matrix code. Use Programming to create simulacra equipment for the Matrix. Operators use Programming Hacks to see the construct for what it is and help RSIs navigate the system."},{name:"Matrix Power Plant Hardware",attribute:"Focus",category:"Operator",source:"operator",description:"Understanding the actual hardware and tech that makes up any construct based technology."}],mt=[{name:"Acute Hearing",attribute:"CyberZen",ruleBender:"The ability to hear sounds that would normally be too low or too far off to hear with normal hearing.",ruleBreaker:"Character can hear any frequency even those that are normally inaudible to human ears."},{name:"Atmospheric Adaptation",attribute:"CyberZen",ruleBender:"Character can breathe noxious gases without any adverse effects. Even though characters can inhale noxious gases they are unable to breathe underwater.",ruleBreaker:"Character can breathe water, noxious fumes/gases, or go without oxygen completely."},{name:"Blindness",attribute:"CyberZen",ruleBender:"The characters must be able to touch their target. With a simple touch the character can make a RSI blind. They can affect a number of targets equal to their Matrix feat rating.",ruleBreaker:"Character can make a redpill RSI blind while they are plugged into the Matrix. The effect lasts as long as the targets stay in the Matrix."},{name:"Change Material",attribute:"CyberZen",ruleBender:"The character has the ability to change the weight, size, and the color of an item temporarily. The item retains its shape and possibly its original function depending on how it is altered (GM's discretion). The character can only affect one item at a time. The objects affected must be smaller than the character.",ruleBreaker:"The character has the ability to alter an object's molecular structure in the Matrix — changing a gun to butter, concrete to water, water to wine, etc. A single object of any size can be changed in this way."},{name:"Control Animal(s)",attribute:"CyberZen",ruleBender:"The character has the ability to lock gazes with an animal and make that particular animal follow his commands.",ruleBreaker:"The character can control more than one animal at a time. Characters are only able to control as many animals as their Matrix feat rating."},{name:"Control Gravity",attribute:"CyberZen",ruleBender:"Character can control how gravity works by increasing or decreasing it on one person or object. They have to touch the object.",ruleBreaker:"Character can control gravity in an area that they can see, equal to their Matrix feat rating in meters."},{name:"Control Plant(s)",attribute:"CyberZen",ruleBender:"Character can touch a plant and make it grow rapidly in a certain direction — like a plant reaching toward the sun, but instant.",ruleBreaker:"Character can make multiple plants grow or wither at will. GM discretion as to whether the character could affect an entire acre or farm of crops."},{name:"Control Weather",attribute:"CyberZen",ruleBender:"Make a rainstorm on a sunny day. The more abnormal or extreme the weather change the more difficult the task roll.",ruleBreaker:"Without changing the entire weather pattern the character can call lightning to strike any spot of their choosing, or call a tornado on a calm day."},{name:"Create Simple Objects",attribute:"CyberZen",ruleBender:"The character can restore simple objects that have been destroyed — for example restoring a burnt candle to its original state. They must touch the item.",ruleBreaker:"The character has the ability to make small simple objects from nothing. Simple objects don't have any moving parts. The character must touch the item being made."},{name:"Disguise",attribute:"CyberZen",ruleBender:"A player can disguise herself to agents and other people within the Matrix. RSI's don't see the character as she is, but rather as she would like to be seen.",ruleBreaker:"Player can change their height and weight, alter appendages, and mimic someone specifically down to the DNA — indiscernible from the original. Characters must stay human."},{name:"Dodging Bullets",attribute:"CyberZen",ruleBender:"Character has an uncanny ability to dodge non-ballistic speed objects. Character can easily dodge bows and arrows.",ruleBreaker:"The character can dodge ballistics and projectiles in the Matrix. When a character uses dodge they cannot perform any other actions that turn."},{name:"Eagle Eyes",attribute:"CyberZen",ruleBender:"Character can see long distances as though they were closer — reading a newspaper a block away as if held in hand. This feat gives extreme tunnel vision while active.",ruleBreaker:"Character's eyes can vary their magnification from normal to the power of an electron microscope. Tunnel vision still applies when using this feat."},{name:"Enhanced Smell",attribute:"CyberZen",ruleBender:"Character smells scents like a bloodhound. They can use this ability to track a person or object by its scent.",ruleBreaker:"A character can use smell to identify anyone they have smelled before, even in disguise. The character is so sensitive they can pick up pheromones similar to how ants follow each other."},{name:"Firestarter",attribute:"CyberZen",ruleBender:"Character is able to increase or decrease the intensity of fire that is already burning. Cannot create flame from nothing.",ruleBreaker:"Character can create fire from nothing. It is easier if they have something to set on fire."},{name:"Flight",attribute:"CyberZen",ruleBender:"Character can glide on air currents without the aid of wings. Gliders are not propelled so they don't move fast unless diving. The character can also turn off this feat to fall normally.",ruleBreaker:"The character can fly like superman."},{name:"Forcefield",attribute:"CyberZen",ruleBender:"The character can create a forcefield around their body that can repel objects, gases, or forces from touching the character. This field is on the surface of the character's body.",ruleBreaker:"Extend this forcefield to others or around a certain area. They only control one forcefield — if using it to protect someone else they are not protected themselves."},{name:"Grow Claws",attribute:"CyberZen",ruleBender:"Alter nails and teeth so they have a razor sharp edge. They can also make them hard as diamonds.",ruleBreaker:"Grow fingernails and toenails longer and stronger like cat claws. Character could even make bone poke through skin in desired areas."},{name:"Heal",attribute:"CyberZen",ruleBender:"Character can roll Endurance to reduce damage up to their CyberZen rating, once per day.",ruleBreaker:"Character can lay hands on another character and allow them to roll their Endurance score to reduce damage even if they have already rolled once in that 24-hour period."},{name:"Increased Attribute",attribute:"CyberZen",ruleBender:"Make a task roll. For each success increase that attribute's dice pool by one die for the remainder of the scene. Cannot increase CyberZen. Total adjustable points equal Matrix Feat rating, split across multiple attributes.",ruleBreaker:"Can also increase CyberZen. No limit to the amount of Attribute points the character can increase."},{name:"Increased Skill",attribute:"CyberZen",ruleBender:"Make a task roll. For each success increase that skill's dice pool by one die for the remainder of the scene. The amount of points that can be adjusted equals the feat's rating.",ruleBreaker:"No limit to the amount of Skill points that the character can increase."},{name:"Invisibility",attribute:"CyberZen",ruleBender:"The character becomes harder for people to see — they can only be spotted if someone is staring directly at them and focusing.",ruleBreaker:"A character can become completely translucent; light travels through them. Clothes and other items the character is wearing are unaffected by this feat."},{name:"Jump",attribute:"CyberZen",ruleBender:"Soften a deadly fall of twenty stories, or jump across extreme distances. You could jump across the Grand Canyon with this feat.",ruleBreaker:"They can jump as far as they want — even for miles — as long as they are moving up and down, not side to side. The difference from flying is they cannot move horizontally through the air."},{name:"Mimic",attribute:"CyberZen",ruleBender:"Character can turn their body into an element they have come in contact with. The body can move like normal but has all the other characteristics of the element copied.",ruleBreaker:"By touching an object, person, animal, or bug the character can become a copy of that thing down to the smallest detail. The character does not have to stay human."},{name:"Mind Control",attribute:"CyberZen",ruleBender:"Character can plant small one-word suggestions into a RSI's mind. Upon a successful roll the bluepill RSI will carry out that suggestion until its completion. The RSI will only follow suggestions that don't hurt them.",ruleBreaker:"The character can possess bluepill RSIs with a psychic link and tell them to do what they want. The character also has the ability to manipulate memories."},{name:"Negate Matrix Feats",attribute:"CyberZen",ruleBender:"Character can temporarily negate the Matrix Feat ability and effects of other RSI's or programs.",ruleBreaker:"The character can permanently negate the Matrix Feat ability and effects of other RSI's or programs."},{name:"Night Vision",attribute:"CyberZen",ruleBender:"Characters determine how night vision works for them: sonar, low light, or heat (infra-red).",ruleBreaker:"Character doesn't need to see. They are completely aware of what is around them as though it were daylight. The character can turn the feat off if they want."},{name:"Pass Through Objects",attribute:"CyberZen",ruleBender:"Character can pass through thick liquids and objects as though they were made of air. Using this in water allows the character to run and move as though on land.",ruleBreaker:"The character can walk through walls and pass through solid objects as though they were made of air."},{name:"Prehensile",attribute:"CyberZen",ruleBender:"Character can use their tongue, feet and ears to grab things as though they were using their hands. The character could use their feet to fire a handgun without difficulty.",ruleBreaker:"Character can grow extra prehensile appendages they can use just like hands — they could even grow an extra arm."},{name:"Psychometry",attribute:"CyberZen",ruleBender:"A character can learn about the past of an object, place, or person by touching it.",ruleBreaker:"A character can learn about the future of an object, place, or person by touching it."},{name:"Shapeshifting",attribute:"CyberZen",ruleBender:"A character can turn into an animal of their choice if they see it while they are shifting.",ruleBreaker:"Character can shapeshift into any animal it has ever seen before, even without the animal present while the character is shifting."},{name:"Sonic Blast",attribute:"CyberZen",ruleBender:"Create a sonic blast that can shatter brittle materials like glass. It can also damage human eardrums or be used to stun an opponent.",ruleBreaker:"Character can use their sonic blast to knock people over and hit things with force. A character could use the sonic blast to lift them up in the air or propel them along in the air."},{name:"Spatial Manipulation (Spatiokinesis)",attribute:"CyberZen",ruleBender:"Character can design a fixed area in the Matrix that allows them to control reality. This area does not change until it is destroyed or reformatted.",ruleBreaker:"Character can manipulate the spatial reality of their immediate area — warp, bend, flip, crush, and otherwise manipulate all physical aspects of space within an area of their choosing, wherever they are."},{name:"Telekinesis",attribute:"CyberZen",ruleBender:"Character has the ability to lift objects up to their own weight if they focus on it. They must see the object.",ruleBreaker:"Character has the ability to lift objects that weigh more than them with their minds, but they must be able to see it."},{name:"Telepathy",attribute:"CyberZen",ruleBender:"Character can read surface thoughts of other RSI's. People can notice when someone is reading their thoughts — it feels like someone is holding your head. Limited to one RSI at a time.",ruleBreaker:"Characters can read any thoughts, even those the RSI tries to hide. This is limited to as many RSIs as their Matrix Feat rating."},{name:"Teleportation",attribute:"CyberZen",ruleBender:"A character can teleport very limited distances. Basically if they can see it they can teleport there.",ruleBreaker:"Can teleport to any destination in the Matrix. Period."},{name:"Time Slow",attribute:"CyberZen",ruleBender:"For limited periods the character can slow down one object or person in the area. The object is slowed down for everyone, not just to the RSI with the Matrix Feat.",ruleBreaker:"The character can slow down the actions of everyone else around them, making the player appear to move faster. Limited to a number of objects not to exceed the Matrix Feat rating."},{name:"True Sight",attribute:"CyberZen",ruleBender:"The character can see random snippets of code. It is up to the GM as to what the character sees — it should be small bits of information.",ruleBreaker:"The character can see all of the simulacrum as Matrix code from within the Matrix."},{name:"Truth Sayer",attribute:"CyberZen",ruleBender:"The character can tell when someone is lying about anything, or when that person thinks they are lying about something.",ruleBreaker:"The character can force a RSI to only tell the truth as far as they know. They don't feel compelled to talk, but anything they say is true and they don't know why."},{name:"Wall Crawling",attribute:"CyberZen",ruleBender:"The character can cling to walls with hands and/or feet like a spider or climbing insect. Smooth or wet surfaces are more difficult. Being completely upside down requires concentration.",ruleBreaker:"The character can cling to ceilings and walls made of any material with any type of surface, slippery or not."},{name:"X-Ray Vision",attribute:"CyberZen",ruleBender:"Not literally using X-Rays. Character can see through thin walls and clothes as though they weren't there.",ruleBreaker:"Character can see through lead and thick concrete as though it were not there."}],Rl=[{category:"Equipment",items:["Desert Suit","Battle Suit (APU)","Thermal Wear (Light)","Thermal Wear (Medium)","Thermal Wear (Heavy)","Dig Dug","Canteen","Desert Tents","Nomad Stick","Climbing Gear","Land Mine","Plastic Explosive","TNT","Ration Packs","Infrared (IR) Goggles","Dark Particle Goggles","First Aid Gear","Punksmith Tools"]},{category:"Hardware",items:["Neural Interface","Skill Chips","Cyber Limbs","Skill Chip Processor","Operator's Broadcast Control Deck","Wifi Decoy"]},{category:"Weapons",items:["Bow","Crossbow","Chain Knife","Survival Knife","Chain Axe","Acid Gun","EMP Cannon","Laser Rifle","Net Gun","Plasma Cannon","Plasma Gun","Chain Sword","Cutter Sword","EMP Grenades","Throwing Knives","Gun Scopes",'Handgun "Fizbang"','Handgun "Gorilla Gun"','Handgun "Popper"','Handgun "Mini Grinder"','Rifle "Copperfield"','Rifle "Dragon Shroud II"','Shotgun "Peabody"','Shotgun "Xtrema"','Shotgun "Jackhammer"','SMG "Kommando"','SMG "Uzi"','Machine Gun "Skoda"','Machine Gun "Mauser Mini Gun"','Assault Rifle "AR-G3"','Assault Rifle "Chow Chat"','Assault Rifle "HK"']},{category:"Vehicles",items:["Speeder Hovercraft","Zion Military Hovercraft","Nomad Hovercraft","Torpedo Hovercraft","Squidi (Sentinel Frame)"]}],xl=[{category:"Equipment",items:["Cash & Credit Cards","Clothes","Phone","Fake IDs","Sunglasses","Extraction Apparatus","Bug Removal Tool","Beacon"]},{category:"Weapons",items:["Desert Eagle .50 cal","Beretta 92fs 9mm","S&W Revolver .38","H&K MP5","M-16","Mossberg Shotgun","Glock .45","Hand Grenade","RPG","M72 LAW Rocket","APS Machine Pistol","7mm Remington Sniper Rifle","Browning Hunting Rifle","Tanto Survival Knife","Throwing Knives","Ruger .22","Katana","Rapier"]},{category:"Vehicles",items:["Ducati Motorcycle","Harley Davidson Hog","Ferrari Sports Car","Subaru Sedan","Ford Compact Car","Mercedes Luxury Sedan","Jeep SUV","Toyota Mini Van","U-Move Small Truck (20')","Mac Truck (30')"]}],Pl=[{category:"Real World Vehicles",items:["Speeder Hovercraft","Zion Military Hovercraft","Nomad Hovercraft","Torpedo Hovercraft","Squidi (Sentinel Frame)"]},{category:"Simulacra Vehicles",items:["Ducati Motorcycle","Harley Davidson Hog","Ferrari Sports Car","Subaru Sedan","Ford Compact Car","Mercedes Luxury Sedan","Jeep SUV","Toyota Mini Van","U-Move Small Truck (20')","Mac Truck (30')"]}],Dl=["Captain","Operator","Fixer","Informant","Analyst","Smuggler","Medic","Mechanic","Resistance Fighter","Zion Council Member","Black Market Dealer","Bluepill Informant","Underground Hacker","Former Agent"],Ol=["RSI Hacker","Homegrown (Freeborn)","Matrix Operator","Mercenary","Hot Shot Pilot","Punksmith"],Ml=["Zion Resistance","Crystal Shard","Utopia","Nomad Clans"],Ll=["Pod-born","Surface-born","Freeborn","Nomad"],Fl=["Speeder Hovercraft","Zion Military Hovercraft","Nomad Hovercraft","Torpedo Hovercraft"],ti={apiKey:"AIzaSyDqcgJnjZGri2lr-9hYYqjEFcXu0m4o3OA",authDomain:"unmatrixrpg-101.firebaseapp.com",databaseURL:"https://unmatrixrpg-101-default-rtdb.firebaseio.com/",projectId:"unmatrixrpg-101",storageBucket:"unmatrixrpg-101.firebasestorage.app",messagingSenderId:"279940726263",appId:"1:279940726263:web:b1b1c4353b4f4323ccc2f2",measurementId:"G-8DZ3ZY25WG"},$l=()=>{};var Ns={};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Br={NODE_ADMIN:!1,SDK_VERSION:"${JSCORE_VERSION}"};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const m=function(t,e){if(!t)throw st(e)},st=function(t){return new Error("Firebase Database ("+Br.SDK_VERSION+") INTERNAL ASSERT FAILED: "+t)};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Hr=function(t){const e=[];let n=0;for(let i=0;i<t.length;i++){let s=t.charCodeAt(i);s<128?e[n++]=s:s<2048?(e[n++]=s>>6|192,e[n++]=s&63|128):(s&64512)===55296&&i+1<t.length&&(t.charCodeAt(i+1)&64512)===56320?(s=65536+((s&1023)<<10)+(t.charCodeAt(++i)&1023),e[n++]=s>>18|240,e[n++]=s>>12&63|128,e[n++]=s>>6&63|128,e[n++]=s&63|128):(e[n++]=s>>12|224,e[n++]=s>>6&63|128,e[n++]=s&63|128)}return e},Bl=function(t){const e=[];let n=0,i=0;for(;n<t.length;){const s=t[n++];if(s<128)e[i++]=String.fromCharCode(s);else if(s>191&&s<224){const r=t[n++];e[i++]=String.fromCharCode((s&31)<<6|r&63)}else if(s>239&&s<365){const r=t[n++],o=t[n++],a=t[n++],l=((s&7)<<18|(r&63)<<12|(o&63)<<6|a&63)-65536;e[i++]=String.fromCharCode(55296+(l>>10)),e[i++]=String.fromCharCode(56320+(l&1023))}else{const r=t[n++],o=t[n++];e[i++]=String.fromCharCode((s&15)<<12|(r&63)<<6|o&63)}}return e.join("")},Ai={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(t,e){if(!Array.isArray(t))throw Error("encodeByteArray takes an array as a parameter");this.init_();const n=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,i=[];for(let s=0;s<t.length;s+=3){const r=t[s],o=s+1<t.length,a=o?t[s+1]:0,l=s+2<t.length,c=l?t[s+2]:0,d=r>>2,h=(r&3)<<4|a>>4;let f=(a&15)<<2|c>>6,g=c&63;l||(g=64,o||(f=64)),i.push(n[d],n[h],n[f],n[g])}return i.join("")},encodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(t):this.encodeByteArray(Hr(t),e)},decodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(t):Bl(this.decodeStringToByteArray(t,e))},decodeStringToByteArray(t,e){this.init_();const n=e?this.charToByteMapWebSafe_:this.charToByteMap_,i=[];for(let s=0;s<t.length;){const r=n[t.charAt(s++)],a=s<t.length?n[t.charAt(s)]:0;++s;const c=s<t.length?n[t.charAt(s)]:64;++s;const h=s<t.length?n[t.charAt(s)]:64;if(++s,r==null||a==null||c==null||h==null)throw new Hl;const f=r<<2|a>>4;if(i.push(f),c!==64){const g=a<<4&240|c>>2;if(i.push(g),h!==64){const _=c<<6&192|h;i.push(_)}}}return i},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let t=0;t<this.ENCODED_VALS.length;t++)this.byteToCharMap_[t]=this.ENCODED_VALS.charAt(t),this.charToByteMap_[this.byteToCharMap_[t]]=t,this.byteToCharMapWebSafe_[t]=this.ENCODED_VALS_WEBSAFE.charAt(t),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[t]]=t,t>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(t)]=t,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(t)]=t)}}};class Hl extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const Wr=function(t){const e=Hr(t);return Ai.encodeByteArray(e,!0)},sn=function(t){return Wr(t).replace(/\./g,"")},ni=function(t){try{return Ai.decodeString(t,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Wl(t){return Ur(void 0,t)}function Ur(t,e){if(!(e instanceof Object))return e;switch(e.constructor){case Date:const n=e;return new Date(n.getTime());case Object:t===void 0&&(t={});break;case Array:t=[];break;default:return e}for(const n in e)!e.hasOwnProperty(n)||!Ul(n)||(t[n]=Ur(t[n],e[n]));return t}function Ul(t){return t!=="__proto__"}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ql(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const jl=()=>ql().__FIREBASE_DEFAULTS__,Gl=()=>{if(typeof process>"u"||typeof Ns>"u")return;const t=Ns.__FIREBASE_DEFAULTS__;if(t)return JSON.parse(t)},Vl=()=>{if(typeof document>"u")return;let t;try{t=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=t&&ni(t[1]);return e&&JSON.parse(e)},qr=()=>{try{return $l()||jl()||Gl()||Vl()}catch(t){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${t}`);return}},zl=t=>{var e,n;return(n=(e=qr())==null?void 0:e.emulatorHosts)==null?void 0:n[t]},Kl=t=>{const e=zl(t);if(!e)return;const n=e.lastIndexOf(":");if(n<=0||n+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);const i=parseInt(e.substring(n+1),10);return e[0]==="["?[e.substring(1,n-1),i]:[e.substring(0,n),i]},jr=()=>{var t;return(t=qr())==null?void 0:t.config};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ce{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,n)=>{this.resolve=e,this.reject=n})}wrapCallback(e){return(n,i)=>{n?this.reject(n):this.resolve(i),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(n):e(n,i))}}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Yl(t,e){if(t.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const n={alg:"none",type:"JWT"},i=e||"demo-project",s=t.iat||0,r=t.sub||t.user_id;if(!r)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const o={iss:`https://securetoken.google.com/${i}`,aud:i,iat:s,exp:s+3600,auth_time:s,sub:r,user_id:r,firebase:{sign_in_provider:"custom",identities:{}},...t};return[sn(JSON.stringify(n)),sn(JSON.stringify(o)),""].join(".")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Zl(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function Gr(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(Zl())}function Ql(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function Xl(){return Br.NODE_ADMIN===!0}function Jl(){try{return typeof indexedDB=="object"}catch{return!1}}function ec(){return new Promise((t,e)=>{try{let n=!0;const i="validate-browser-context-for-indexeddb-analytics-module",s=self.indexedDB.open(i);s.onsuccess=()=>{s.result.close(),n||self.indexedDB.deleteDatabase(i),t(!0)},s.onupgradeneeded=()=>{n=!1},s.onerror=()=>{var r;e(((r=s.error)==null?void 0:r.message)||"")}}catch(n){e(n)}})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const tc="FirebaseError";class Ht extends Error{constructor(e,n,i){super(n),this.code=e,this.customData=i,this.name=tc,Object.setPrototypeOf(this,Ht.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,Vr.prototype.create)}}class Vr{constructor(e,n,i){this.service=e,this.serviceName=n,this.errors=i}create(e,...n){const i=n[0]||{},s=`${this.service}/${e}`,r=this.errors[e],o=r?nc(r,i):"Error",a=`${this.serviceName}: ${o} (${s}).`;return new Ht(s,a,i)}}function nc(t,e){return t.replace(ic,(n,i)=>{const s=e[i];return s!=null?String(s):`<${i}?>`})}const ic=/\{\$([^}]+)}/g;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function kt(t){return JSON.parse(t)}function U(t){return JSON.stringify(t)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const zr=function(t){let e={},n={},i={},s="";try{const r=t.split(".");e=kt(ni(r[0])||""),n=kt(ni(r[1])||""),s=r[2],i=n.d||{},delete n.d}catch{}return{header:e,claims:n,data:i,signature:s}},sc=function(t){const e=zr(t),n=e.claims;return!!n&&typeof n=="object"&&n.hasOwnProperty("iat")},rc=function(t){const e=zr(t).claims;return typeof e=="object"&&e.admin===!0};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function oe(t,e){return Object.prototype.hasOwnProperty.call(t,e)}function Ze(t,e){if(Object.prototype.hasOwnProperty.call(t,e))return t[e]}function ii(t){for(const e in t)if(Object.prototype.hasOwnProperty.call(t,e))return!1;return!0}function rn(t,e,n){const i={};for(const s in t)Object.prototype.hasOwnProperty.call(t,s)&&(i[s]=e.call(n,t[s],s,t));return i}function on(t,e){if(t===e)return!0;const n=Object.keys(t),i=Object.keys(e);for(const s of n){if(!i.includes(s))return!1;const r=t[s],o=e[s];if(Rs(r)&&Rs(o)){if(!on(r,o))return!1}else if(r!==o)return!1}for(const s of i)if(!n.includes(s))return!1;return!0}function Rs(t){return t!==null&&typeof t=="object"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function oc(t){const e=[];for(const[n,i]of Object.entries(t))Array.isArray(i)?i.forEach(s=>{e.push(encodeURIComponent(n)+"="+encodeURIComponent(s))}):e.push(encodeURIComponent(n)+"="+encodeURIComponent(i));return e.length?"&"+e.join("&"):""}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ac{constructor(){this.chain_=[],this.buf_=[],this.W_=[],this.pad_=[],this.inbuf_=0,this.total_=0,this.blockSize=512/8,this.pad_[0]=128;for(let e=1;e<this.blockSize;++e)this.pad_[e]=0;this.reset()}reset(){this.chain_[0]=1732584193,this.chain_[1]=4023233417,this.chain_[2]=2562383102,this.chain_[3]=271733878,this.chain_[4]=3285377520,this.inbuf_=0,this.total_=0}compress_(e,n){n||(n=0);const i=this.W_;if(typeof e=="string")for(let h=0;h<16;h++)i[h]=e.charCodeAt(n)<<24|e.charCodeAt(n+1)<<16|e.charCodeAt(n+2)<<8|e.charCodeAt(n+3),n+=4;else for(let h=0;h<16;h++)i[h]=e[n]<<24|e[n+1]<<16|e[n+2]<<8|e[n+3],n+=4;for(let h=16;h<80;h++){const f=i[h-3]^i[h-8]^i[h-14]^i[h-16];i[h]=(f<<1|f>>>31)&4294967295}let s=this.chain_[0],r=this.chain_[1],o=this.chain_[2],a=this.chain_[3],l=this.chain_[4],c,d;for(let h=0;h<80;h++){h<40?h<20?(c=a^r&(o^a),d=1518500249):(c=r^o^a,d=1859775393):h<60?(c=r&o|a&(r|o),d=2400959708):(c=r^o^a,d=3395469782);const f=(s<<5|s>>>27)+c+l+d+i[h]&4294967295;l=a,a=o,o=(r<<30|r>>>2)&4294967295,r=s,s=f}this.chain_[0]=this.chain_[0]+s&4294967295,this.chain_[1]=this.chain_[1]+r&4294967295,this.chain_[2]=this.chain_[2]+o&4294967295,this.chain_[3]=this.chain_[3]+a&4294967295,this.chain_[4]=this.chain_[4]+l&4294967295}update(e,n){if(e==null)return;n===void 0&&(n=e.length);const i=n-this.blockSize;let s=0;const r=this.buf_;let o=this.inbuf_;for(;s<n;){if(o===0)for(;s<=i;)this.compress_(e,s),s+=this.blockSize;if(typeof e=="string"){for(;s<n;)if(r[o]=e.charCodeAt(s),++o,++s,o===this.blockSize){this.compress_(r),o=0;break}}else for(;s<n;)if(r[o]=e[s],++o,++s,o===this.blockSize){this.compress_(r),o=0;break}}this.inbuf_=o,this.total_+=n}digest(){const e=[];let n=this.total_*8;this.inbuf_<56?this.update(this.pad_,56-this.inbuf_):this.update(this.pad_,this.blockSize-(this.inbuf_-56));for(let s=this.blockSize-1;s>=56;s--)this.buf_[s]=n&255,n/=256;this.compress_(this.buf_);let i=0;for(let s=0;s<5;s++)for(let r=24;r>=0;r-=8)e[i]=this.chain_[s]>>r&255,++i;return e}}function Qe(t,e){return`${t} failed: ${e} argument `}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const lc=function(t){const e=[];let n=0;for(let i=0;i<t.length;i++){let s=t.charCodeAt(i);if(s>=55296&&s<=56319){const r=s-55296;i++,m(i<t.length,"Surrogate pair missing trail surrogate.");const o=t.charCodeAt(i)-56320;s=65536+(r<<10)+o}s<128?e[n++]=s:s<2048?(e[n++]=s>>6|192,e[n++]=s&63|128):s<65536?(e[n++]=s>>12|224,e[n++]=s>>6&63|128,e[n++]=s&63|128):(e[n++]=s>>18|240,e[n++]=s>>12&63|128,e[n++]=s>>6&63|128,e[n++]=s&63|128)}return e},Sn=function(t){let e=0;for(let n=0;n<t.length;n++){const i=t.charCodeAt(n);i<128?e++:i<2048?e+=2:i>=55296&&i<=56319?(e+=4,n++):e+=3}return e};/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function rt(t){return t&&t._delegate?t._delegate:t}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Kr(t){try{return(t.startsWith("http://")||t.startsWith("https://")?new URL(t).hostname:t).endsWith(".cloudworkstations.dev")}catch{return!1}}async function cc(t){return(await fetch(t,{credentials:"include"})).ok}class Tt{constructor(e,n,i){this.name=e,this.instanceFactory=n,this.type=i,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ke="[DEFAULT]";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hc{constructor(e,n){this.name=e,this.container=n,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const n=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(n)){const i=new ce;if(this.instancesDeferred.set(n,i),this.isInitialized(n)||this.shouldAutoInitialize())try{const s=this.getOrInitializeService({instanceIdentifier:n});s&&i.resolve(s)}catch{}}return this.instancesDeferred.get(n).promise}getImmediate(e){const n=this.normalizeInstanceIdentifier(e==null?void 0:e.identifier),i=(e==null?void 0:e.optional)??!1;if(this.isInitialized(n)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:n})}catch(s){if(i)return null;throw s}else{if(i)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(uc(e))try{this.getOrInitializeService({instanceIdentifier:ke})}catch{}for(const[n,i]of this.instancesDeferred.entries()){const s=this.normalizeInstanceIdentifier(n);try{const r=this.getOrInitializeService({instanceIdentifier:s});i.resolve(r)}catch{}}}}clearInstance(e=ke){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(n=>"INTERNAL"in n).map(n=>n.INTERNAL.delete()),...e.filter(n=>"_delete"in n).map(n=>n._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=ke){return this.instances.has(e)}getOptions(e=ke){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:n={}}=e,i=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(i))throw Error(`${this.name}(${i}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const s=this.getOrInitializeService({instanceIdentifier:i,options:n});for(const[r,o]of this.instancesDeferred.entries()){const a=this.normalizeInstanceIdentifier(r);i===a&&o.resolve(s)}return s}onInit(e,n){const i=this.normalizeInstanceIdentifier(n),s=this.onInitCallbacks.get(i)??new Set;s.add(e),this.onInitCallbacks.set(i,s);const r=this.instances.get(i);return r&&e(r,i),()=>{s.delete(e)}}invokeOnInitCallbacks(e,n){const i=this.onInitCallbacks.get(n);if(i)for(const s of i)try{s(e,n)}catch{}}getOrInitializeService({instanceIdentifier:e,options:n={}}){let i=this.instances.get(e);if(!i&&this.component&&(i=this.component.instanceFactory(this.container,{instanceIdentifier:dc(e),options:n}),this.instances.set(e,i),this.instancesOptions.set(e,n),this.invokeOnInitCallbacks(i,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,i)}catch{}return i||null}normalizeInstanceIdentifier(e=ke){return this.component?this.component.multipleInstances?e:ke:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function dc(t){return t===ke?void 0:t}function uc(t){return t.instantiationMode==="EAGER"}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fc{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const n=this.getProvider(e.name);if(n.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);n.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const n=new hc(e,this);return this.providers.set(e,n),n}getProviders(){return Array.from(this.providers.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var x;(function(t){t[t.DEBUG=0]="DEBUG",t[t.VERBOSE=1]="VERBOSE",t[t.INFO=2]="INFO",t[t.WARN=3]="WARN",t[t.ERROR=4]="ERROR",t[t.SILENT=5]="SILENT"})(x||(x={}));const pc={debug:x.DEBUG,verbose:x.VERBOSE,info:x.INFO,warn:x.WARN,error:x.ERROR,silent:x.SILENT},mc=x.INFO,gc={[x.DEBUG]:"log",[x.VERBOSE]:"log",[x.INFO]:"info",[x.WARN]:"warn",[x.ERROR]:"error"},_c=(t,e,...n)=>{if(e<t.logLevel)return;const i=new Date().toISOString(),s=gc[e];if(s)console[s](`[${i}]  ${t.name}:`,...n);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class Yr{constructor(e){this.name=e,this._logLevel=mc,this._logHandler=_c,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in x))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?pc[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,x.DEBUG,...e),this._logHandler(this,x.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,x.VERBOSE,...e),this._logHandler(this,x.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,x.INFO,...e),this._logHandler(this,x.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,x.WARN,...e),this._logHandler(this,x.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,x.ERROR,...e),this._logHandler(this,x.ERROR,...e)}}const yc=(t,e)=>e.some(n=>t instanceof n);let xs,Ps;function vc(){return xs||(xs=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function bc(){return Ps||(Ps=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const Zr=new WeakMap,si=new WeakMap,Qr=new WeakMap,Bn=new WeakMap,Ni=new WeakMap;function wc(t){const e=new Promise((n,i)=>{const s=()=>{t.removeEventListener("success",r),t.removeEventListener("error",o)},r=()=>{n(_e(t.result)),s()},o=()=>{i(t.error),s()};t.addEventListener("success",r),t.addEventListener("error",o)});return e.then(n=>{n instanceof IDBCursor&&Zr.set(n,t)}).catch(()=>{}),Ni.set(e,t),e}function Cc(t){if(si.has(t))return;const e=new Promise((n,i)=>{const s=()=>{t.removeEventListener("complete",r),t.removeEventListener("error",o),t.removeEventListener("abort",o)},r=()=>{n(),s()},o=()=>{i(t.error||new DOMException("AbortError","AbortError")),s()};t.addEventListener("complete",r),t.addEventListener("error",o),t.addEventListener("abort",o)});si.set(t,e)}let ri={get(t,e,n){if(t instanceof IDBTransaction){if(e==="done")return si.get(t);if(e==="objectStoreNames")return t.objectStoreNames||Qr.get(t);if(e==="store")return n.objectStoreNames[1]?void 0:n.objectStore(n.objectStoreNames[0])}return _e(t[e])},set(t,e,n){return t[e]=n,!0},has(t,e){return t instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in t}};function Sc(t){ri=t(ri)}function Ec(t){return t===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...n){const i=t.call(Hn(this),e,...n);return Qr.set(i,e.sort?e.sort():[e]),_e(i)}:bc().includes(t)?function(...e){return t.apply(Hn(this),e),_e(Zr.get(this))}:function(...e){return _e(t.apply(Hn(this),e))}}function kc(t){return typeof t=="function"?Ec(t):(t instanceof IDBTransaction&&Cc(t),yc(t,vc())?new Proxy(t,ri):t)}function _e(t){if(t instanceof IDBRequest)return wc(t);if(Bn.has(t))return Bn.get(t);const e=kc(t);return e!==t&&(Bn.set(t,e),Ni.set(e,t)),e}const Hn=t=>Ni.get(t);function Tc(t,e,{blocked:n,upgrade:i,blocking:s,terminated:r}={}){const o=indexedDB.open(t,e),a=_e(o);return i&&o.addEventListener("upgradeneeded",l=>{i(_e(o.result),l.oldVersion,l.newVersion,_e(o.transaction),l)}),n&&o.addEventListener("blocked",l=>n(l.oldVersion,l.newVersion,l)),a.then(l=>{r&&l.addEventListener("close",()=>r()),s&&l.addEventListener("versionchange",c=>s(c.oldVersion,c.newVersion,c))}).catch(()=>{}),a}const Ic=["get","getKey","getAll","getAllKeys","count"],Ac=["put","add","delete","clear"],Wn=new Map;function Ds(t,e){if(!(t instanceof IDBDatabase&&!(e in t)&&typeof e=="string"))return;if(Wn.get(e))return Wn.get(e);const n=e.replace(/FromIndex$/,""),i=e!==n,s=Ac.includes(n);if(!(n in(i?IDBIndex:IDBObjectStore).prototype)||!(s||Ic.includes(n)))return;const r=async function(o,...a){const l=this.transaction(o,s?"readwrite":"readonly");let c=l.store;return i&&(c=c.index(a.shift())),(await Promise.all([c[n](...a),s&&l.done]))[0]};return Wn.set(e,r),r}Sc(t=>({...t,get:(e,n,i)=>Ds(e,n)||t.get(e,n,i),has:(e,n)=>!!Ds(e,n)||t.has(e,n)}));/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Nc{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(n=>{if(Rc(n)){const i=n.getImmediate();return`${i.library}/${i.version}`}else return null}).filter(n=>n).join(" ")}}function Rc(t){const e=t.getComponent();return(e==null?void 0:e.type)==="VERSION"}const oi="@firebase/app",Os="0.14.12";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ue=new Yr("@firebase/app"),xc="@firebase/app-compat",Pc="@firebase/analytics-compat",Dc="@firebase/analytics",Oc="@firebase/app-check-compat",Mc="@firebase/app-check",Lc="@firebase/auth",Fc="@firebase/auth-compat",$c="@firebase/database",Bc="@firebase/data-connect",Hc="@firebase/database-compat",Wc="@firebase/functions",Uc="@firebase/functions-compat",qc="@firebase/installations",jc="@firebase/installations-compat",Gc="@firebase/messaging",Vc="@firebase/messaging-compat",zc="@firebase/performance",Kc="@firebase/performance-compat",Yc="@firebase/remote-config",Zc="@firebase/remote-config-compat",Qc="@firebase/storage",Xc="@firebase/storage-compat",Jc="@firebase/firestore",eh="@firebase/ai",th="@firebase/firestore-compat",nh="firebase",ih="12.13.0";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ai="[DEFAULT]",sh={[oi]:"fire-core",[xc]:"fire-core-compat",[Dc]:"fire-analytics",[Pc]:"fire-analytics-compat",[Mc]:"fire-app-check",[Oc]:"fire-app-check-compat",[Lc]:"fire-auth",[Fc]:"fire-auth-compat",[$c]:"fire-rtdb",[Bc]:"fire-data-connect",[Hc]:"fire-rtdb-compat",[Wc]:"fire-fn",[Uc]:"fire-fn-compat",[qc]:"fire-iid",[jc]:"fire-iid-compat",[Gc]:"fire-fcm",[Vc]:"fire-fcm-compat",[zc]:"fire-perf",[Kc]:"fire-perf-compat",[Yc]:"fire-rc",[Zc]:"fire-rc-compat",[Qc]:"fire-gcs",[Xc]:"fire-gcs-compat",[Jc]:"fire-fst",[th]:"fire-fst-compat",[eh]:"fire-vertex","fire-js":"fire-js",[nh]:"fire-js-all"};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const an=new Map,rh=new Map,li=new Map;function Ms(t,e){try{t.container.addComponent(e)}catch(n){ue.debug(`Component ${e.name} failed to register with FirebaseApp ${t.name}`,n)}}function ln(t){const e=t.name;if(li.has(e))return ue.debug(`There were multiple attempts to register component ${e}.`),!1;li.set(e,t);for(const n of an.values())Ms(n,t);for(const n of rh.values())Ms(n,t);return!0}function oh(t,e){const n=t.container.getProvider("heartbeat").getImmediate({optional:!0});return n&&n.triggerHeartbeat(),t.container.getProvider(e)}function ah(t){return t==null?!1:t.settings!==void 0}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const lh={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},ye=new Vr("app","Firebase",lh);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ch{constructor(e,n,i){this._isDeleted=!1,this._options={...e},this._config={...n},this._name=n.name,this._automaticDataCollectionEnabled=n.automaticDataCollectionEnabled,this._container=i,this.container.addComponent(new Tt("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw ye.create("app-deleted",{appName:this._name})}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const hh=ih;function Xr(t,e={}){let n=t;typeof e!="object"&&(e={name:e});const i={name:ai,automaticDataCollectionEnabled:!0,...e},s=i.name;if(typeof s!="string"||!s)throw ye.create("bad-app-name",{appName:String(s)});if(n||(n=jr()),!n)throw ye.create("no-options");const r=an.get(s);if(r){if(on(n,r.options)&&on(i,r.config))return r;throw ye.create("duplicate-app",{appName:s})}const o=new fc(s);for(const l of li.values())o.addComponent(l);const a=new ch(n,i,o);return an.set(s,a),a}function dh(t=ai){const e=an.get(t);if(!e&&t===ai&&jr())return Xr();if(!e)throw ye.create("no-app",{appName:t});return e}function je(t,e,n){let i=sh[t]??t;n&&(i+=`-${n}`);const s=i.match(/\s|\//),r=e.match(/\s|\//);if(s||r){const o=[`Unable to register library "${i}" with version "${e}":`];s&&o.push(`library name "${i}" contains illegal characters (whitespace or "/")`),s&&r&&o.push("and"),r&&o.push(`version name "${e}" contains illegal characters (whitespace or "/")`),ue.warn(o.join(" "));return}ln(new Tt(`${i}-version`,()=>({library:i,version:e}),"VERSION"))}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const uh="firebase-heartbeat-database",fh=1,It="firebase-heartbeat-store";let Un=null;function Jr(){return Un||(Un=Tc(uh,fh,{upgrade:(t,e)=>{switch(e){case 0:try{t.createObjectStore(It)}catch(n){console.warn(n)}}}}).catch(t=>{throw ye.create("idb-open",{originalErrorMessage:t.message})})),Un}async function ph(t){try{const n=(await Jr()).transaction(It),i=await n.objectStore(It).get(eo(t));return await n.done,i}catch(e){if(e instanceof Ht)ue.warn(e.message);else{const n=ye.create("idb-get",{originalErrorMessage:e==null?void 0:e.message});ue.warn(n.message)}}}async function Ls(t,e){try{const i=(await Jr()).transaction(It,"readwrite");await i.objectStore(It).put(e,eo(t)),await i.done}catch(n){if(n instanceof Ht)ue.warn(n.message);else{const i=ye.create("idb-set",{originalErrorMessage:n==null?void 0:n.message});ue.warn(i.message)}}}function eo(t){return`${t.name}!${t.options.appId}`}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const mh=1024,gh=30;class _h{constructor(e){this.container=e,this._heartbeatsCache=null;const n=this.container.getProvider("app").getImmediate();this._storage=new vh(n),this._heartbeatsCachePromise=this._storage.read().then(i=>(this._heartbeatsCache=i,i))}async triggerHeartbeat(){var e,n;try{const s=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),r=Fs();if(((e=this._heartbeatsCache)==null?void 0:e.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((n=this._heartbeatsCache)==null?void 0:n.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===r||this._heartbeatsCache.heartbeats.some(o=>o.date===r))return;if(this._heartbeatsCache.heartbeats.push({date:r,agent:s}),this._heartbeatsCache.heartbeats.length>gh){const o=bh(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(o,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(i){ue.warn(i)}}async getHeartbeatsHeader(){var e;try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((e=this._heartbeatsCache)==null?void 0:e.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";const n=Fs(),{heartbeatsToSend:i,unsentEntries:s}=yh(this._heartbeatsCache.heartbeats),r=sn(JSON.stringify({version:2,heartbeats:i}));return this._heartbeatsCache.lastSentHeartbeatDate=n,s.length>0?(this._heartbeatsCache.heartbeats=s,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),r}catch(n){return ue.warn(n),""}}}function Fs(){return new Date().toISOString().substring(0,10)}function yh(t,e=mh){const n=[];let i=t.slice();for(const s of t){const r=n.find(o=>o.agent===s.agent);if(r){if(r.dates.push(s.date),$s(n)>e){r.dates.pop();break}}else if(n.push({agent:s.agent,dates:[s.date]}),$s(n)>e){n.pop();break}i=i.slice(1)}return{heartbeatsToSend:n,unsentEntries:i}}class vh{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return Jl()?ec().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const n=await ph(this.app);return n!=null&&n.heartbeats?n:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){if(await this._canUseIndexedDBPromise){const i=await this.read();return Ls(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??i.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){if(await this._canUseIndexedDBPromise){const i=await this.read();return Ls(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??i.lastSentHeartbeatDate,heartbeats:[...i.heartbeats,...e.heartbeats]})}else return}}function $s(t){return sn(JSON.stringify({version:2,heartbeats:t})).length}function bh(t){if(t.length===0)return-1;let e=0,n=t[0].date;for(let i=1;i<t.length;i++)t[i].date<n&&(n=t[i].date,e=i);return e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function wh(t){ln(new Tt("platform-logger",e=>new Nc(e),"PRIVATE")),ln(new Tt("heartbeat",e=>new _h(e),"PRIVATE")),je(oi,Os,t),je(oi,Os,"esm2020"),je("fire-js","")}wh("");var Ch="firebase",Sh="12.13.0";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */je(Ch,Sh,"app");var Bs={};const Hs="@firebase/database",Ws="1.1.3";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let to="";function Eh(t){to=t}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class kh{constructor(e){this.domStorage_=e,this.prefix_="firebase:"}set(e,n){n==null?this.domStorage_.removeItem(this.prefixedName_(e)):this.domStorage_.setItem(this.prefixedName_(e),U(n))}get(e){const n=this.domStorage_.getItem(this.prefixedName_(e));return n==null?null:kt(n)}remove(e){this.domStorage_.removeItem(this.prefixedName_(e))}prefixedName_(e){return this.prefix_+e}toString(){return this.domStorage_.toString()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Th{constructor(){this.cache_={},this.isInMemoryStorage=!0}set(e,n){n==null?delete this.cache_[e]:this.cache_[e]=n}get(e){return oe(this.cache_,e)?this.cache_[e]:null}remove(e){delete this.cache_[e]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const no=function(t){try{if(typeof window<"u"&&typeof window[t]<"u"){const e=window[t];return e.setItem("firebase:sentinel","cache"),e.removeItem("firebase:sentinel"),new kh(e)}}catch{}return new Th},Ae=no("localStorage"),Ih=no("sessionStorage");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ge=new Yr("@firebase/database"),Ah=function(){let t=1;return function(){return t++}}(),io=function(t){const e=lc(t),n=new ac;n.update(e);const i=n.digest();return Ai.encodeByteArray(i)},Wt=function(...t){let e="";for(let n=0;n<t.length;n++){const i=t[n];Array.isArray(i)||i&&typeof i=="object"&&typeof i.length=="number"?e+=Wt.apply(null,i):typeof i=="object"?e+=U(i):e+=i,e+=" "}return e};let yt=null,Us=!0;const Nh=function(t,e){m(!0,"Can't turn on custom loggers persistently."),Ge.logLevel=x.VERBOSE,yt=Ge.log.bind(Ge)},q=function(...t){if(Us===!0&&(Us=!1,yt===null&&Ih.get("logging_enabled")===!0&&Nh()),yt){const e=Wt.apply(null,t);yt(e)}},Ut=function(t){return function(...e){q(t,...e)}},ci=function(...t){const e="FIREBASE INTERNAL ERROR: "+Wt(...t);Ge.error(e)},fe=function(...t){const e=`FIREBASE FATAL ERROR: ${Wt(...t)}`;throw Ge.error(e),new Error(e)},K=function(...t){const e="FIREBASE WARNING: "+Wt(...t);Ge.warn(e)},Rh=function(){typeof window<"u"&&window.location&&window.location.protocol&&window.location.protocol.indexOf("https:")!==-1&&K("Insecure Firebase access from a secure page. Please use https in calls to new Firebase().")},En=function(t){return typeof t=="number"&&(t!==t||t===Number.POSITIVE_INFINITY||t===Number.NEGATIVE_INFINITY)},xh=function(t){if(document.readyState==="complete")t();else{let e=!1;const n=function(){if(!document.body){setTimeout(n,Math.floor(10));return}e||(e=!0,t())};document.addEventListener?(document.addEventListener("DOMContentLoaded",n,!1),window.addEventListener("load",n,!1)):document.attachEvent&&(document.attachEvent("onreadystatechange",()=>{document.readyState==="complete"&&n()}),window.attachEvent("onload",n))}},Xe="[MIN_NAME]",xe="[MAX_NAME]",Fe=function(t,e){if(t===e)return 0;if(t===Xe||e===xe)return-1;if(e===Xe||t===xe)return 1;{const n=qs(t),i=qs(e);return n!==null?i!==null?n-i===0?t.length-e.length:n-i:-1:i!==null?1:t<e?-1:1}},Ph=function(t,e){return t===e?0:t<e?-1:1},ct=function(t,e){if(e&&t in e)return e[t];throw new Error("Missing required key ("+t+") in object: "+U(e))},Ri=function(t){if(typeof t!="object"||t===null)return U(t);const e=[];for(const i in t)e.push(i);e.sort();let n="{";for(let i=0;i<e.length;i++)i!==0&&(n+=","),n+=U(e[i]),n+=":",n+=Ri(t[e[i]]);return n+="}",n},so=function(t,e){const n=t.length;if(n<=e)return[t];const i=[];for(let s=0;s<n;s+=e)s+e>n?i.push(t.substring(s,n)):i.push(t.substring(s,s+e));return i};function j(t,e){for(const n in t)t.hasOwnProperty(n)&&e(n,t[n])}const ro=function(t){m(!En(t),"Invalid JSON number");const e=11,n=52,i=(1<<e-1)-1;let s,r,o,a,l;t===0?(r=0,o=0,s=1/t===-1/0?1:0):(s=t<0,t=Math.abs(t),t>=Math.pow(2,1-i)?(a=Math.min(Math.floor(Math.log(t)/Math.LN2),i),r=a+i,o=Math.round(t*Math.pow(2,n-a)-Math.pow(2,n))):(r=0,o=Math.round(t/Math.pow(2,1-i-n))));const c=[];for(l=n;l;l-=1)c.push(o%2?1:0),o=Math.floor(o/2);for(l=e;l;l-=1)c.push(r%2?1:0),r=Math.floor(r/2);c.push(s?1:0),c.reverse();const d=c.join("");let h="";for(l=0;l<64;l+=8){let f=parseInt(d.substr(l,8),2).toString(16);f.length===1&&(f="0"+f),h=h+f}return h.toLowerCase()},Dh=function(){return!!(typeof window=="object"&&window.chrome&&window.chrome.extension&&!/^chrome/.test(window.location.href))},Oh=function(){return typeof Windows=="object"&&typeof Windows.UI=="object"};function Mh(t,e){let n="Unknown Error";t==="too_big"?n="The data requested exceeds the maximum size that can be accessed with a single request.":t==="permission_denied"?n="Client doesn't have permission to access the desired data.":t==="unavailable"&&(n="The service is unavailable");const i=new Error(t+" at "+e._path.toString()+": "+n);return i.code=t.toUpperCase(),i}const Lh=new RegExp("^-?(0*)\\d{1,10}$"),Fh=-2147483648,$h=2147483647,qs=function(t){if(Lh.test(t)){const e=Number(t);if(e>=Fh&&e<=$h)return e}return null},ot=function(t){try{t()}catch(e){setTimeout(()=>{const n=e.stack||"";throw K("Exception was thrown by user callback.",n),e},Math.floor(0))}},Bh=function(){return(typeof window=="object"&&window.navigator&&window.navigator.userAgent||"").search(/googlebot|google webmaster tools|bingbot|yahoo! slurp|baiduspider|yandexbot|duckduckbot/i)>=0},vt=function(t,e){const n=setTimeout(t,e);return typeof n=="number"&&typeof Deno<"u"&&Deno.unrefTimer?Deno.unrefTimer(n):typeof n=="object"&&n.unref&&n.unref(),n};/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Hh{constructor(e,n){this.appCheckProvider=n,this.appName=e.name,ah(e)&&e.settings.appCheckToken&&(this.serverAppAppCheckToken=e.settings.appCheckToken),this.appCheck=n==null?void 0:n.getImmediate({optional:!0}),this.appCheck||n==null||n.get().then(i=>this.appCheck=i)}getToken(e){if(this.serverAppAppCheckToken){if(e)throw new Error("Attempted reuse of `FirebaseServerApp.appCheckToken` after previous usage failed.");return Promise.resolve({token:this.serverAppAppCheckToken})}return this.appCheck?this.appCheck.getToken(e):new Promise((n,i)=>{setTimeout(()=>{this.appCheck?this.getToken(e).then(n,i):n(null)},0)})}addTokenChangeListener(e){var n;(n=this.appCheckProvider)==null||n.get().then(i=>i.addTokenListener(e))}notifyForInvalidToken(){K(`Provided AppCheck credentials for the app named "${this.appName}" are invalid. This usually indicates your app was not initialized correctly.`)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Wh{constructor(e,n,i){this.appName_=e,this.firebaseOptions_=n,this.authProvider_=i,this.auth_=null,this.auth_=i.getImmediate({optional:!0}),this.auth_||i.onInit(s=>this.auth_=s)}getToken(e){return this.auth_?this.auth_.getToken(e).catch(n=>n&&n.code==="auth/token-not-initialized"?(q("Got auth/token-not-initialized error.  Treating as null token."),null):Promise.reject(n)):new Promise((n,i)=>{setTimeout(()=>{this.auth_?this.getToken(e).then(n,i):n(null)},0)})}addTokenChangeListener(e){this.auth_?this.auth_.addAuthTokenListener(e):this.authProvider_.get().then(n=>n.addAuthTokenListener(e))}removeTokenChangeListener(e){this.authProvider_.get().then(n=>n.removeAuthTokenListener(e))}notifyForInvalidToken(){let e='Provided authentication credentials for the app named "'+this.appName_+'" are invalid. This usually indicates your app was not initialized correctly. ';"credential"in this.firebaseOptions_?e+='Make sure the "credential" property provided to initializeApp() is authorized to access the specified "databaseURL" and is from the correct project.':"serviceAccount"in this.firebaseOptions_?e+='Make sure the "serviceAccount" property provided to initializeApp() is authorized to access the specified "databaseURL" and is from the correct project.':e+='Make sure the "apiKey" and "databaseURL" properties provided to initializeApp() match the values provided for your app at https://console.firebase.google.com/.',K(e)}}class en{constructor(e){this.accessToken=e}getToken(e){return Promise.resolve({accessToken:this.accessToken})}addTokenChangeListener(e){e(this.accessToken)}removeTokenChangeListener(e){}notifyForInvalidToken(){}}en.OWNER="owner";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const xi="5",oo="v",ao="s",lo="r",co="f",ho=/(console\.firebase|firebase-console-\w+\.corp|firebase\.corp)\.google\.com/,uo="ls",fo="p",hi="ac",po="websocket",mo="long_polling";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class go{constructor(e,n,i,s,r=!1,o="",a=!1,l=!1,c=null){this.secure=n,this.namespace=i,this.webSocketOnly=s,this.nodeAdmin=r,this.persistenceKey=o,this.includeNamespaceInQueryParams=a,this.isUsingEmulator=l,this.emulatorOptions=c,this._host=e.toLowerCase(),this._domain=this._host.substr(this._host.indexOf(".")+1),this.internalHost=Ae.get("host:"+e)||this._host}isCacheableHost(){return this.internalHost.substr(0,2)==="s-"}isCustomHost(){return this._domain!=="firebaseio.com"&&this._domain!=="firebaseio-demo.com"}get host(){return this._host}set host(e){e!==this.internalHost&&(this.internalHost=e,this.isCacheableHost()&&Ae.set("host:"+this._host,this.internalHost))}toString(){let e=this.toURLString();return this.persistenceKey&&(e+="<"+this.persistenceKey+">"),e}toURLString(){const e=this.secure?"https://":"http://",n=this.includeNamespaceInQueryParams?`?ns=${this.namespace}`:"";return`${e}${this.host}/${n}`}}function Uh(t){return t.host!==t.internalHost||t.isCustomHost()||t.includeNamespaceInQueryParams}function _o(t,e,n){m(typeof e=="string","typeof type must == string"),m(typeof n=="object","typeof params must == object");let i;if(e===po)i=(t.secure?"wss://":"ws://")+t.internalHost+"/.ws?";else if(e===mo)i=(t.secure?"https://":"http://")+t.internalHost+"/.lp?";else throw new Error("Unknown connection type: "+e);Uh(t)&&(n.ns=t.namespace);const s=[];return j(n,(r,o)=>{s.push(r+"="+o)}),i+s.join("&")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qh{constructor(){this.counters_={}}incrementCounter(e,n=1){oe(this.counters_,e)||(this.counters_[e]=0),this.counters_[e]+=n}get(){return Wl(this.counters_)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const qn={},jn={};function Pi(t){const e=t.toString();return qn[e]||(qn[e]=new qh),qn[e]}function jh(t,e){const n=t.toString();return jn[n]||(jn[n]=e()),jn[n]}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Gh{constructor(e){this.onMessage_=e,this.pendingResponses=[],this.currentResponseNum=0,this.closeAfterResponse=-1,this.onClose=null}closeAfter(e,n){this.closeAfterResponse=e,this.onClose=n,this.closeAfterResponse<this.currentResponseNum&&(this.onClose(),this.onClose=null)}handleResponse(e,n){for(this.pendingResponses[e]=n;this.pendingResponses[this.currentResponseNum];){const i=this.pendingResponses[this.currentResponseNum];delete this.pendingResponses[this.currentResponseNum];for(let s=0;s<i.length;++s)i[s]&&ot(()=>{this.onMessage_(i[s])});if(this.currentResponseNum===this.closeAfterResponse){this.onClose&&(this.onClose(),this.onClose=null);break}this.currentResponseNum++}}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const js="start",Vh="close",zh="pLPCommand",Kh="pRTLPCB",yo="id",vo="pw",bo="ser",Yh="cb",Zh="seg",Qh="ts",Xh="d",Jh="dframe",wo=1870,Co=30,ed=wo-Co,td=25e3,nd=3e4;class We{constructor(e,n,i,s,r,o,a){this.connId=e,this.repoInfo=n,this.applicationId=i,this.appCheckToken=s,this.authToken=r,this.transportSessionId=o,this.lastSessionId=a,this.bytesSent=0,this.bytesReceived=0,this.everConnected_=!1,this.log_=Ut(e),this.stats_=Pi(n),this.urlFn=l=>(this.appCheckToken&&(l[hi]=this.appCheckToken),_o(n,mo,l))}open(e,n){this.curSegmentNum=0,this.onDisconnect_=n,this.myPacketOrderer=new Gh(e),this.isClosed_=!1,this.connectTimeoutTimer_=setTimeout(()=>{this.log_("Timed out trying to connect."),this.onClosed_(),this.connectTimeoutTimer_=null},Math.floor(nd)),xh(()=>{if(this.isClosed_)return;this.scriptTagHolder=new Di((...r)=>{const[o,a,l,c,d]=r;if(this.incrementIncomingBytes_(r),!!this.scriptTagHolder)if(this.connectTimeoutTimer_&&(clearTimeout(this.connectTimeoutTimer_),this.connectTimeoutTimer_=null),this.everConnected_=!0,o===js)this.id=a,this.password=l;else if(o===Vh)a?(this.scriptTagHolder.sendNewPolls=!1,this.myPacketOrderer.closeAfter(a,()=>{this.onClosed_()})):this.onClosed_();else throw new Error("Unrecognized command received: "+o)},(...r)=>{const[o,a]=r;this.incrementIncomingBytes_(r),this.myPacketOrderer.handleResponse(o,a)},()=>{this.onClosed_()},this.urlFn);const i={};i[js]="t",i[bo]=Math.floor(Math.random()*1e8),this.scriptTagHolder.uniqueCallbackIdentifier&&(i[Yh]=this.scriptTagHolder.uniqueCallbackIdentifier),i[oo]=xi,this.transportSessionId&&(i[ao]=this.transportSessionId),this.lastSessionId&&(i[uo]=this.lastSessionId),this.applicationId&&(i[fo]=this.applicationId),this.appCheckToken&&(i[hi]=this.appCheckToken),typeof location<"u"&&location.hostname&&ho.test(location.hostname)&&(i[lo]=co);const s=this.urlFn(i);this.log_("Connecting via long-poll to "+s),this.scriptTagHolder.addTag(s,()=>{})})}start(){this.scriptTagHolder.startLongPoll(this.id,this.password),this.addDisconnectPingFrame(this.id,this.password)}static forceAllow(){We.forceAllow_=!0}static forceDisallow(){We.forceDisallow_=!0}static isAvailable(){return We.forceAllow_?!0:!We.forceDisallow_&&typeof document<"u"&&document.createElement!=null&&!Dh()&&!Oh()}markConnectionHealthy(){}shutdown_(){this.isClosed_=!0,this.scriptTagHolder&&(this.scriptTagHolder.close(),this.scriptTagHolder=null),this.myDisconnFrame&&(document.body.removeChild(this.myDisconnFrame),this.myDisconnFrame=null),this.connectTimeoutTimer_&&(clearTimeout(this.connectTimeoutTimer_),this.connectTimeoutTimer_=null)}onClosed_(){this.isClosed_||(this.log_("Longpoll is closing itself"),this.shutdown_(),this.onDisconnect_&&(this.onDisconnect_(this.everConnected_),this.onDisconnect_=null))}close(){this.isClosed_||(this.log_("Longpoll is being closed."),this.shutdown_())}send(e){const n=U(e);this.bytesSent+=n.length,this.stats_.incrementCounter("bytes_sent",n.length);const i=Wr(n),s=so(i,ed);for(let r=0;r<s.length;r++)this.scriptTagHolder.enqueueSegment(this.curSegmentNum,s.length,s[r]),this.curSegmentNum++}addDisconnectPingFrame(e,n){this.myDisconnFrame=document.createElement("iframe");const i={};i[Jh]="t",i[yo]=e,i[vo]=n,this.myDisconnFrame.src=this.urlFn(i),this.myDisconnFrame.style.display="none",document.body.appendChild(this.myDisconnFrame)}incrementIncomingBytes_(e){const n=U(e).length;this.bytesReceived+=n,this.stats_.incrementCounter("bytes_received",n)}}class Di{constructor(e,n,i,s){this.onDisconnect=i,this.urlFn=s,this.outstandingRequests=new Set,this.pendingSegs=[],this.currentSerial=Math.floor(Math.random()*1e8),this.sendNewPolls=!0;{this.uniqueCallbackIdentifier=Ah(),window[zh+this.uniqueCallbackIdentifier]=e,window[Kh+this.uniqueCallbackIdentifier]=n,this.myIFrame=Di.createIFrame_();let r="";this.myIFrame.src&&this.myIFrame.src.substr(0,11)==="javascript:"&&(r='<script>document.domain="'+document.domain+'";<\/script>');const o="<html><body>"+r+"</body></html>";try{this.myIFrame.doc.open(),this.myIFrame.doc.write(o),this.myIFrame.doc.close()}catch(a){q("frame writing exception"),a.stack&&q(a.stack),q(a)}}}static createIFrame_(){const e=document.createElement("iframe");if(e.style.display="none",document.body){document.body.appendChild(e);try{e.contentWindow.document||q("No IE domain setting required")}catch{const i=document.domain;e.src="javascript:void((function(){document.open();document.domain='"+i+"';document.close();})())"}}else throw"Document body has not initialized. Wait to initialize Firebase until after the document is ready.";return e.contentDocument?e.doc=e.contentDocument:e.contentWindow?e.doc=e.contentWindow.document:e.document&&(e.doc=e.document),e}close(){this.alive=!1,this.myIFrame&&(this.myIFrame.doc.body.textContent="",setTimeout(()=>{this.myIFrame!==null&&(document.body.removeChild(this.myIFrame),this.myIFrame=null)},Math.floor(0)));const e=this.onDisconnect;e&&(this.onDisconnect=null,e())}startLongPoll(e,n){for(this.myID=e,this.myPW=n,this.alive=!0;this.newRequest_(););}newRequest_(){if(this.alive&&this.sendNewPolls&&this.outstandingRequests.size<(this.pendingSegs.length>0?2:1)){this.currentSerial++;const e={};e[yo]=this.myID,e[vo]=this.myPW,e[bo]=this.currentSerial;let n=this.urlFn(e),i="",s=0;for(;this.pendingSegs.length>0&&this.pendingSegs[0].d.length+Co+i.length<=wo;){const o=this.pendingSegs.shift();i=i+"&"+Zh+s+"="+o.seg+"&"+Qh+s+"="+o.ts+"&"+Xh+s+"="+o.d,s++}return n=n+i,this.addLongPollTag_(n,this.currentSerial),!0}else return!1}enqueueSegment(e,n,i){this.pendingSegs.push({seg:e,ts:n,d:i}),this.alive&&this.newRequest_()}addLongPollTag_(e,n){this.outstandingRequests.add(n);const i=()=>{this.outstandingRequests.delete(n),this.newRequest_()},s=setTimeout(i,Math.floor(td)),r=()=>{clearTimeout(s),i()};this.addTag(e,r)}addTag(e,n){setTimeout(()=>{try{if(!this.sendNewPolls)return;const i=this.myIFrame.doc.createElement("script");i.type="text/javascript",i.async=!0,i.src=e,i.onload=i.onreadystatechange=function(){const s=i.readyState;(!s||s==="loaded"||s==="complete")&&(i.onload=i.onreadystatechange=null,i.parentNode&&i.parentNode.removeChild(i),n())},i.onerror=()=>{q("Long-poll script failed to load: "+e),this.sendNewPolls=!1,this.close()},this.myIFrame.doc.body.appendChild(i)}catch{}},Math.floor(1))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const id=16384,sd=45e3;let cn=null;typeof MozWebSocket<"u"?cn=MozWebSocket:typeof WebSocket<"u"&&(cn=WebSocket);class ne{constructor(e,n,i,s,r,o,a){this.connId=e,this.applicationId=i,this.appCheckToken=s,this.authToken=r,this.keepaliveTimer=null,this.frames=null,this.totalFrames=0,this.bytesSent=0,this.bytesReceived=0,this.log_=Ut(this.connId),this.stats_=Pi(n),this.connURL=ne.connectionURL_(n,o,a,s,i),this.nodeAdmin=n.nodeAdmin}static connectionURL_(e,n,i,s,r){const o={};return o[oo]=xi,typeof location<"u"&&location.hostname&&ho.test(location.hostname)&&(o[lo]=co),n&&(o[ao]=n),i&&(o[uo]=i),s&&(o[hi]=s),r&&(o[fo]=r),_o(e,po,o)}open(e,n){this.onDisconnect=n,this.onMessage=e,this.log_("Websocket connecting to "+this.connURL),this.everConnected_=!1,Ae.set("previous_websocket_failure",!0);try{let i;Xl(),this.mySock=new cn(this.connURL,[],i)}catch(i){this.log_("Error instantiating WebSocket.");const s=i.message||i.data;s&&this.log_(s),this.onClosed_();return}this.mySock.onopen=()=>{this.log_("Websocket connected."),this.everConnected_=!0},this.mySock.onclose=()=>{this.log_("Websocket connection was disconnected."),this.mySock=null,this.onClosed_()},this.mySock.onmessage=i=>{this.handleIncomingFrame(i)},this.mySock.onerror=i=>{this.log_("WebSocket error.  Closing connection.");const s=i.message||i.data;s&&this.log_(s),this.onClosed_()}}start(){}static forceDisallow(){ne.forceDisallow_=!0}static isAvailable(){let e=!1;if(typeof navigator<"u"&&navigator.userAgent){const n=/Android ([0-9]{0,}\.[0-9]{0,})/,i=navigator.userAgent.match(n);i&&i.length>1&&parseFloat(i[1])<4.4&&(e=!0)}return!e&&cn!==null&&!ne.forceDisallow_}static previouslyFailed(){return Ae.isInMemoryStorage||Ae.get("previous_websocket_failure")===!0}markConnectionHealthy(){Ae.remove("previous_websocket_failure")}appendFrame_(e){if(this.frames.push(e),this.frames.length===this.totalFrames){const n=this.frames.join("");this.frames=null;const i=kt(n);this.onMessage(i)}}handleNewFrameCount_(e){this.totalFrames=e,this.frames=[]}extractFrameCount_(e){if(m(this.frames===null,"We already have a frame buffer"),e.length<=6){const n=Number(e);if(!isNaN(n))return this.handleNewFrameCount_(n),null}return this.handleNewFrameCount_(1),e}handleIncomingFrame(e){if(this.mySock===null)return;const n=e.data;if(this.bytesReceived+=n.length,this.stats_.incrementCounter("bytes_received",n.length),this.resetKeepAlive(),this.frames!==null)this.appendFrame_(n);else{const i=this.extractFrameCount_(n);i!==null&&this.appendFrame_(i)}}send(e){this.resetKeepAlive();const n=U(e);this.bytesSent+=n.length,this.stats_.incrementCounter("bytes_sent",n.length);const i=so(n,id);i.length>1&&this.sendString_(String(i.length));for(let s=0;s<i.length;s++)this.sendString_(i[s])}shutdown_(){this.isClosed_=!0,this.keepaliveTimer&&(clearInterval(this.keepaliveTimer),this.keepaliveTimer=null),this.mySock&&(this.mySock.close(),this.mySock=null)}onClosed_(){this.isClosed_||(this.log_("WebSocket is closing itself"),this.shutdown_(),this.onDisconnect&&(this.onDisconnect(this.everConnected_),this.onDisconnect=null))}close(){this.isClosed_||(this.log_("WebSocket is being closed"),this.shutdown_())}resetKeepAlive(){clearInterval(this.keepaliveTimer),this.keepaliveTimer=setInterval(()=>{this.mySock&&this.sendString_("0"),this.resetKeepAlive()},Math.floor(sd))}sendString_(e){try{this.mySock.send(e)}catch(n){this.log_("Exception thrown from WebSocket.send():",n.message||n.data,"Closing connection."),setTimeout(this.onClosed_.bind(this),0)}}}ne.responsesRequiredToBeHealthy=2;ne.healthyTimeout=3e4;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class At{static get ALL_TRANSPORTS(){return[We,ne]}static get IS_TRANSPORT_INITIALIZED(){return this.globalTransportInitialized_}constructor(e){this.initTransports_(e)}initTransports_(e){const n=ne&&ne.isAvailable();let i=n&&!ne.previouslyFailed();if(e.webSocketOnly&&(n||K("wss:// URL used, but browser isn't known to support websockets.  Trying anyway."),i=!0),i)this.transports_=[ne];else{const s=this.transports_=[];for(const r of At.ALL_TRANSPORTS)r&&r.isAvailable()&&s.push(r);At.globalTransportInitialized_=!0}}initialTransport(){if(this.transports_.length>0)return this.transports_[0];throw new Error("No transports available")}upgradeTransport(){return this.transports_.length>1?this.transports_[1]:null}}At.globalTransportInitialized_=!1;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const rd=6e4,od=5e3,ad=10*1024,ld=100*1024,Gn="t",Gs="d",cd="s",Vs="r",hd="e",zs="o",Ks="a",Ys="n",Zs="p",dd="h";class ud{constructor(e,n,i,s,r,o,a,l,c,d){this.id=e,this.repoInfo_=n,this.applicationId_=i,this.appCheckToken_=s,this.authToken_=r,this.onMessage_=o,this.onReady_=a,this.onDisconnect_=l,this.onKill_=c,this.lastSessionId=d,this.connectionCount=0,this.pendingDataMessages=[],this.state_=0,this.log_=Ut("c:"+this.id+":"),this.transportManager_=new At(n),this.log_("Connection created"),this.start_()}start_(){const e=this.transportManager_.initialTransport();this.conn_=new e(this.nextTransportId_(),this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,null,this.lastSessionId),this.primaryResponsesRequired_=e.responsesRequiredToBeHealthy||0;const n=this.connReceiver_(this.conn_),i=this.disconnReceiver_(this.conn_);this.tx_=this.conn_,this.rx_=this.conn_,this.secondaryConn_=null,this.isHealthy_=!1,setTimeout(()=>{this.conn_&&this.conn_.open(n,i)},Math.floor(0));const s=e.healthyTimeout||0;s>0&&(this.healthyTimeout_=vt(()=>{this.healthyTimeout_=null,this.isHealthy_||(this.conn_&&this.conn_.bytesReceived>ld?(this.log_("Connection exceeded healthy timeout but has received "+this.conn_.bytesReceived+" bytes.  Marking connection healthy."),this.isHealthy_=!0,this.conn_.markConnectionHealthy()):this.conn_&&this.conn_.bytesSent>ad?this.log_("Connection exceeded healthy timeout but has sent "+this.conn_.bytesSent+" bytes.  Leaving connection alive."):(this.log_("Closing unhealthy connection after timeout."),this.close()))},Math.floor(s)))}nextTransportId_(){return"c:"+this.id+":"+this.connectionCount++}disconnReceiver_(e){return n=>{e===this.conn_?this.onConnectionLost_(n):e===this.secondaryConn_?(this.log_("Secondary connection lost."),this.onSecondaryConnectionLost_()):this.log_("closing an old connection")}}connReceiver_(e){return n=>{this.state_!==2&&(e===this.rx_?this.onPrimaryMessageReceived_(n):e===this.secondaryConn_?this.onSecondaryMessageReceived_(n):this.log_("message on old connection"))}}sendRequest(e){const n={t:"d",d:e};this.sendData_(n)}tryCleanupConnection(){this.tx_===this.secondaryConn_&&this.rx_===this.secondaryConn_&&(this.log_("cleaning up and promoting a connection: "+this.secondaryConn_.connId),this.conn_=this.secondaryConn_,this.secondaryConn_=null)}onSecondaryControl_(e){if(Gn in e){const n=e[Gn];n===Ks?this.upgradeIfSecondaryHealthy_():n===Vs?(this.log_("Got a reset on secondary, closing it"),this.secondaryConn_.close(),(this.tx_===this.secondaryConn_||this.rx_===this.secondaryConn_)&&this.close()):n===zs&&(this.log_("got pong on secondary."),this.secondaryResponsesRequired_--,this.upgradeIfSecondaryHealthy_())}}onSecondaryMessageReceived_(e){const n=ct("t",e),i=ct("d",e);if(n==="c")this.onSecondaryControl_(i);else if(n==="d")this.pendingDataMessages.push(i);else throw new Error("Unknown protocol layer: "+n)}upgradeIfSecondaryHealthy_(){this.secondaryResponsesRequired_<=0?(this.log_("Secondary connection is healthy."),this.isHealthy_=!0,this.secondaryConn_.markConnectionHealthy(),this.proceedWithUpgrade_()):(this.log_("sending ping on secondary."),this.secondaryConn_.send({t:"c",d:{t:Zs,d:{}}}))}proceedWithUpgrade_(){this.secondaryConn_.start(),this.log_("sending client ack on secondary"),this.secondaryConn_.send({t:"c",d:{t:Ks,d:{}}}),this.log_("Ending transmission on primary"),this.conn_.send({t:"c",d:{t:Ys,d:{}}}),this.tx_=this.secondaryConn_,this.tryCleanupConnection()}onPrimaryMessageReceived_(e){const n=ct("t",e),i=ct("d",e);n==="c"?this.onControl_(i):n==="d"&&this.onDataMessage_(i)}onDataMessage_(e){this.onPrimaryResponse_(),this.onMessage_(e)}onPrimaryResponse_(){this.isHealthy_||(this.primaryResponsesRequired_--,this.primaryResponsesRequired_<=0&&(this.log_("Primary connection is healthy."),this.isHealthy_=!0,this.conn_.markConnectionHealthy()))}onControl_(e){const n=ct(Gn,e);if(Gs in e){const i=e[Gs];if(n===dd){const s={...i};this.repoInfo_.isUsingEmulator&&(s.h=this.repoInfo_.host),this.onHandshake_(s)}else if(n===Ys){this.log_("recvd end transmission on primary"),this.rx_=this.secondaryConn_;for(let s=0;s<this.pendingDataMessages.length;++s)this.onDataMessage_(this.pendingDataMessages[s]);this.pendingDataMessages=[],this.tryCleanupConnection()}else n===cd?this.onConnectionShutdown_(i):n===Vs?this.onReset_(i):n===hd?ci("Server Error: "+i):n===zs?(this.log_("got pong on primary."),this.onPrimaryResponse_(),this.sendPingOnPrimaryIfNecessary_()):ci("Unknown control packet command: "+n)}}onHandshake_(e){const n=e.ts,i=e.v,s=e.h;this.sessionId=e.s,this.repoInfo_.host=s,this.state_===0&&(this.conn_.start(),this.onConnectionEstablished_(this.conn_,n),xi!==i&&K("Protocol version mismatch detected"),this.tryStartUpgrade_())}tryStartUpgrade_(){const e=this.transportManager_.upgradeTransport();e&&this.startUpgrade_(e)}startUpgrade_(e){this.secondaryConn_=new e(this.nextTransportId_(),this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,this.sessionId),this.secondaryResponsesRequired_=e.responsesRequiredToBeHealthy||0;const n=this.connReceiver_(this.secondaryConn_),i=this.disconnReceiver_(this.secondaryConn_);this.secondaryConn_.open(n,i),vt(()=>{this.secondaryConn_&&(this.log_("Timed out trying to upgrade."),this.secondaryConn_.close())},Math.floor(rd))}onReset_(e){this.log_("Reset packet received.  New host: "+e),this.repoInfo_.host=e,this.state_===1?this.close():(this.closeConnections_(),this.start_())}onConnectionEstablished_(e,n){this.log_("Realtime connection established."),this.conn_=e,this.state_=1,this.onReady_&&(this.onReady_(n,this.sessionId),this.onReady_=null),this.primaryResponsesRequired_===0?(this.log_("Primary connection is healthy."),this.isHealthy_=!0):vt(()=>{this.sendPingOnPrimaryIfNecessary_()},Math.floor(od))}sendPingOnPrimaryIfNecessary_(){!this.isHealthy_&&this.state_===1&&(this.log_("sending ping on primary."),this.sendData_({t:"c",d:{t:Zs,d:{}}}))}onSecondaryConnectionLost_(){const e=this.secondaryConn_;this.secondaryConn_=null,(this.tx_===e||this.rx_===e)&&this.close()}onConnectionLost_(e){this.conn_=null,!e&&this.state_===0?(this.log_("Realtime connection failed."),this.repoInfo_.isCacheableHost()&&(Ae.remove("host:"+this.repoInfo_.host),this.repoInfo_.internalHost=this.repoInfo_.host)):this.state_===1&&this.log_("Realtime connection lost."),this.close()}onConnectionShutdown_(e){this.log_("Connection shutdown command received. Shutting down..."),this.onKill_&&(this.onKill_(e),this.onKill_=null),this.onDisconnect_=null,this.close()}sendData_(e){if(this.state_!==1)throw"Connection is not connected";this.tx_.send(e)}close(){this.state_!==2&&(this.log_("Closing realtime connection."),this.state_=2,this.closeConnections_(),this.onDisconnect_&&(this.onDisconnect_(),this.onDisconnect_=null))}closeConnections_(){this.log_("Shutting down all connections"),this.conn_&&(this.conn_.close(),this.conn_=null),this.secondaryConn_&&(this.secondaryConn_.close(),this.secondaryConn_=null),this.healthyTimeout_&&(clearTimeout(this.healthyTimeout_),this.healthyTimeout_=null)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class So{put(e,n,i,s){}merge(e,n,i,s){}refreshAuthToken(e){}refreshAppCheckToken(e){}onDisconnectPut(e,n,i){}onDisconnectMerge(e,n,i){}onDisconnectCancel(e,n){}reportStats(e){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Eo{constructor(e){this.allowedEvents_=e,this.listeners_={},m(Array.isArray(e)&&e.length>0,"Requires a non-empty array")}trigger(e,...n){if(Array.isArray(this.listeners_[e])){const i=[...this.listeners_[e]];for(let s=0;s<i.length;s++)i[s].callback.apply(i[s].context,n)}}on(e,n,i){this.validateEventType_(e),this.listeners_[e]=this.listeners_[e]||[],this.listeners_[e].push({callback:n,context:i});const s=this.getInitialEvent(e);s&&n.apply(i,s)}off(e,n,i){this.validateEventType_(e);const s=this.listeners_[e]||[];for(let r=0;r<s.length;r++)if(s[r].callback===n&&(!i||i===s[r].context)){s.splice(r,1);return}}validateEventType_(e){m(this.allowedEvents_.find(n=>n===e),"Unknown event: "+e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hn extends Eo{static getInstance(){return new hn}constructor(){super(["online"]),this.online_=!0,typeof window<"u"&&typeof window.addEventListener<"u"&&!Gr()&&(window.addEventListener("online",()=>{this.online_||(this.online_=!0,this.trigger("online",!0))},!1),window.addEventListener("offline",()=>{this.online_&&(this.online_=!1,this.trigger("online",!1))},!1))}getInitialEvent(e){return m(e==="online","Unknown event type: "+e),[this.online_]}currentlyOnline(){return this.online_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Qs=32,Xs=768;class N{constructor(e,n){if(n===void 0){this.pieces_=e.split("/");let i=0;for(let s=0;s<this.pieces_.length;s++)this.pieces_[s].length>0&&(this.pieces_[i]=this.pieces_[s],i++);this.pieces_.length=i,this.pieceNum_=0}else this.pieces_=e,this.pieceNum_=n}toString(){let e="";for(let n=this.pieceNum_;n<this.pieces_.length;n++)this.pieces_[n]!==""&&(e+="/"+this.pieces_[n]);return e||"/"}}function I(){return new N("")}function C(t){return t.pieceNum_>=t.pieces_.length?null:t.pieces_[t.pieceNum_]}function be(t){return t.pieces_.length-t.pieceNum_}function R(t){let e=t.pieceNum_;return e<t.pieces_.length&&e++,new N(t.pieces_,e)}function Oi(t){return t.pieceNum_<t.pieces_.length?t.pieces_[t.pieces_.length-1]:null}function fd(t){let e="";for(let n=t.pieceNum_;n<t.pieces_.length;n++)t.pieces_[n]!==""&&(e+="/"+encodeURIComponent(String(t.pieces_[n])));return e||"/"}function Nt(t,e=0){return t.pieces_.slice(t.pieceNum_+e)}function ko(t){if(t.pieceNum_>=t.pieces_.length)return null;const e=[];for(let n=t.pieceNum_;n<t.pieces_.length-1;n++)e.push(t.pieces_[n]);return new N(e,0)}function L(t,e){const n=[];for(let i=t.pieceNum_;i<t.pieces_.length;i++)n.push(t.pieces_[i]);if(e instanceof N)for(let i=e.pieceNum_;i<e.pieces_.length;i++)n.push(e.pieces_[i]);else{const i=e.split("/");for(let s=0;s<i.length;s++)i[s].length>0&&n.push(i[s])}return new N(n,0)}function S(t){return t.pieceNum_>=t.pieces_.length}function V(t,e){const n=C(t),i=C(e);if(n===null)return e;if(n===i)return V(R(t),R(e));throw new Error("INTERNAL ERROR: innerPath ("+e+") is not within outerPath ("+t+")")}function pd(t,e){const n=Nt(t,0),i=Nt(e,0);for(let s=0;s<n.length&&s<i.length;s++){const r=Fe(n[s],i[s]);if(r!==0)return r}return n.length===i.length?0:n.length<i.length?-1:1}function Mi(t,e){if(be(t)!==be(e))return!1;for(let n=t.pieceNum_,i=e.pieceNum_;n<=t.pieces_.length;n++,i++)if(t.pieces_[n]!==e.pieces_[i])return!1;return!0}function X(t,e){let n=t.pieceNum_,i=e.pieceNum_;if(be(t)>be(e))return!1;for(;n<t.pieces_.length;){if(t.pieces_[n]!==e.pieces_[i])return!1;++n,++i}return!0}class md{constructor(e,n){this.errorPrefix_=n,this.parts_=Nt(e,0),this.byteLength_=Math.max(1,this.parts_.length);for(let i=0;i<this.parts_.length;i++)this.byteLength_+=Sn(this.parts_[i]);To(this)}}function gd(t,e){t.parts_.length>0&&(t.byteLength_+=1),t.parts_.push(e),t.byteLength_+=Sn(e),To(t)}function _d(t){const e=t.parts_.pop();t.byteLength_-=Sn(e),t.parts_.length>0&&(t.byteLength_-=1)}function To(t){if(t.byteLength_>Xs)throw new Error(t.errorPrefix_+"has a key path longer than "+Xs+" bytes ("+t.byteLength_+").");if(t.parts_.length>Qs)throw new Error(t.errorPrefix_+"path specified exceeds the maximum depth that can be written ("+Qs+") or object contains a cycle "+Te(t))}function Te(t){return t.parts_.length===0?"":"in property '"+t.parts_.join(".")+"'"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Li extends Eo{static getInstance(){return new Li}constructor(){super(["visible"]);let e,n;typeof document<"u"&&typeof document.addEventListener<"u"&&(typeof document.hidden<"u"?(n="visibilitychange",e="hidden"):typeof document.mozHidden<"u"?(n="mozvisibilitychange",e="mozHidden"):typeof document.msHidden<"u"?(n="msvisibilitychange",e="msHidden"):typeof document.webkitHidden<"u"&&(n="webkitvisibilitychange",e="webkitHidden")),this.visible_=!0,n&&document.addEventListener(n,()=>{const i=!document[e];i!==this.visible_&&(this.visible_=i,this.trigger("visible",i))},!1)}getInitialEvent(e){return m(e==="visible","Unknown event type: "+e),[this.visible_]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ht=1e3,yd=60*5*1e3,Js=30*1e3,vd=1.3,bd=3e4,wd="server_kill",er=3;class de extends So{constructor(e,n,i,s,r,o,a,l){if(super(),this.repoInfo_=e,this.applicationId_=n,this.onDataUpdate_=i,this.onConnectStatus_=s,this.onServerInfoUpdate_=r,this.authTokenProvider_=o,this.appCheckTokenProvider_=a,this.authOverride_=l,this.id=de.nextPersistentConnectionId_++,this.log_=Ut("p:"+this.id+":"),this.interruptReasons_={},this.listens=new Map,this.outstandingPuts_=[],this.outstandingGets_=[],this.outstandingPutCount_=0,this.outstandingGetCount_=0,this.onDisconnectRequestQueue_=[],this.connected_=!1,this.reconnectDelay_=ht,this.maxReconnectDelay_=yd,this.securityDebugCallback_=null,this.lastSessionId=null,this.establishConnectionTimer_=null,this.visible_=!1,this.requestCBHash_={},this.requestNumber_=0,this.realtime_=null,this.authToken_=null,this.appCheckToken_=null,this.forceTokenRefresh_=!1,this.invalidAuthTokenCount_=0,this.invalidAppCheckTokenCount_=0,this.firstConnection_=!0,this.lastConnectionAttemptTime_=null,this.lastConnectionEstablishedTime_=null,l)throw new Error("Auth override specified in options, but not supported on non Node.js platforms");Li.getInstance().on("visible",this.onVisible_,this),e.host.indexOf("fblocal")===-1&&hn.getInstance().on("online",this.onOnline_,this)}sendRequest(e,n,i){const s=++this.requestNumber_,r={r:s,a:e,b:n};this.log_(U(r)),m(this.connected_,"sendRequest call when we're not connected not allowed."),this.realtime_.sendRequest(r),i&&(this.requestCBHash_[s]=i)}get(e){this.initConnection_();const n=new ce,s={action:"g",request:{p:e._path.toString(),q:e._queryObject},onComplete:o=>{const a=o.d;o.s==="ok"?n.resolve(a):n.reject(a)}};this.outstandingGets_.push(s),this.outstandingGetCount_++;const r=this.outstandingGets_.length-1;return this.connected_&&this.sendGet_(r),n.promise}listen(e,n,i,s){this.initConnection_();const r=e._queryIdentifier,o=e._path.toString();this.log_("Listen called for "+o+" "+r),this.listens.has(o)||this.listens.set(o,new Map),m(e._queryParams.isDefault()||!e._queryParams.loadsAllData(),"listen() called for non-default but complete query"),m(!this.listens.get(o).has(r),"listen() called twice for same path/queryId.");const a={onComplete:s,hashFn:n,query:e,tag:i};this.listens.get(o).set(r,a),this.connected_&&this.sendListen_(a)}sendGet_(e){const n=this.outstandingGets_[e];this.sendRequest("g",n.request,i=>{delete this.outstandingGets_[e],this.outstandingGetCount_--,this.outstandingGetCount_===0&&(this.outstandingGets_=[]),n.onComplete&&n.onComplete(i)})}sendListen_(e){const n=e.query,i=n._path.toString(),s=n._queryIdentifier;this.log_("Listen on "+i+" for "+s);const r={p:i},o="q";e.tag&&(r.q=n._queryObject,r.t=e.tag),r.h=e.hashFn(),this.sendRequest(o,r,a=>{const l=a.d,c=a.s;de.warnOnListenWarnings_(l,n),(this.listens.get(i)&&this.listens.get(i).get(s))===e&&(this.log_("listen response",a),c!=="ok"&&this.removeListen_(i,s),e.onComplete&&e.onComplete(c,l))})}static warnOnListenWarnings_(e,n){if(e&&typeof e=="object"&&oe(e,"w")){const i=Ze(e,"w");if(Array.isArray(i)&&~i.indexOf("no_index")){const s='".indexOn": "'+n._queryParams.getIndex().toString()+'"',r=n._path.toString();K(`Using an unspecified index. Your data will be downloaded and filtered on the client. Consider adding ${s} at ${r} to your security rules for better performance.`)}}}refreshAuthToken(e){this.authToken_=e,this.log_("Auth token refreshed"),this.authToken_?this.tryAuth():this.connected_&&this.sendRequest("unauth",{},()=>{}),this.reduceReconnectDelayIfAdminCredential_(e)}reduceReconnectDelayIfAdminCredential_(e){(e&&e.length===40||rc(e))&&(this.log_("Admin auth credential detected.  Reducing max reconnect time."),this.maxReconnectDelay_=Js)}refreshAppCheckToken(e){this.appCheckToken_=e,this.log_("App check token refreshed"),this.appCheckToken_?this.tryAppCheck():this.connected_&&this.sendRequest("unappeck",{},()=>{})}tryAuth(){if(this.connected_&&this.authToken_){const e=this.authToken_,n=sc(e)?"auth":"gauth",i={cred:e};this.authOverride_===null?i.noauth=!0:typeof this.authOverride_=="object"&&(i.authvar=this.authOverride_),this.sendRequest(n,i,s=>{const r=s.s,o=s.d||"error";this.authToken_===e&&(r==="ok"?this.invalidAuthTokenCount_=0:this.onAuthRevoked_(r,o))})}}tryAppCheck(){this.connected_&&this.appCheckToken_&&this.sendRequest("appcheck",{token:this.appCheckToken_},e=>{const n=e.s,i=e.d||"error";n==="ok"?this.invalidAppCheckTokenCount_=0:this.onAppCheckRevoked_(n,i)})}unlisten(e,n){const i=e._path.toString(),s=e._queryIdentifier;this.log_("Unlisten called for "+i+" "+s),m(e._queryParams.isDefault()||!e._queryParams.loadsAllData(),"unlisten() called for non-default but complete query"),this.removeListen_(i,s)&&this.connected_&&this.sendUnlisten_(i,s,e._queryObject,n)}sendUnlisten_(e,n,i,s){this.log_("Unlisten on "+e+" for "+n);const r={p:e},o="n";s&&(r.q=i,r.t=s),this.sendRequest(o,r)}onDisconnectPut(e,n,i){this.initConnection_(),this.connected_?this.sendOnDisconnect_("o",e,n,i):this.onDisconnectRequestQueue_.push({pathString:e,action:"o",data:n,onComplete:i})}onDisconnectMerge(e,n,i){this.initConnection_(),this.connected_?this.sendOnDisconnect_("om",e,n,i):this.onDisconnectRequestQueue_.push({pathString:e,action:"om",data:n,onComplete:i})}onDisconnectCancel(e,n){this.initConnection_(),this.connected_?this.sendOnDisconnect_("oc",e,null,n):this.onDisconnectRequestQueue_.push({pathString:e,action:"oc",data:null,onComplete:n})}sendOnDisconnect_(e,n,i,s){const r={p:n,d:i};this.log_("onDisconnect "+e,r),this.sendRequest(e,r,o=>{s&&setTimeout(()=>{s(o.s,o.d)},Math.floor(0))})}put(e,n,i,s){this.putInternal("p",e,n,i,s)}merge(e,n,i,s){this.putInternal("m",e,n,i,s)}putInternal(e,n,i,s,r){this.initConnection_();const o={p:n,d:i};r!==void 0&&(o.h=r),this.outstandingPuts_.push({action:e,request:o,onComplete:s}),this.outstandingPutCount_++;const a=this.outstandingPuts_.length-1;this.connected_?this.sendPut_(a):this.log_("Buffering put: "+n)}sendPut_(e){const n=this.outstandingPuts_[e].action,i=this.outstandingPuts_[e].request,s=this.outstandingPuts_[e].onComplete;this.outstandingPuts_[e].queued=this.connected_,this.sendRequest(n,i,r=>{this.log_(n+" response",r),delete this.outstandingPuts_[e],this.outstandingPutCount_--,this.outstandingPutCount_===0&&(this.outstandingPuts_=[]),s&&s(r.s,r.d)})}reportStats(e){if(this.connected_){const n={c:e};this.log_("reportStats",n),this.sendRequest("s",n,i=>{if(i.s!=="ok"){const r=i.d;this.log_("reportStats","Error sending stats: "+r)}})}}onDataMessage_(e){if("r"in e){this.log_("from server: "+U(e));const n=e.r,i=this.requestCBHash_[n];i&&(delete this.requestCBHash_[n],i(e.b))}else{if("error"in e)throw"A server-side error has occurred: "+e.error;"a"in e&&this.onDataPush_(e.a,e.b)}}onDataPush_(e,n){this.log_("handleServerMessage",e,n),e==="d"?this.onDataUpdate_(n.p,n.d,!1,n.t):e==="m"?this.onDataUpdate_(n.p,n.d,!0,n.t):e==="c"?this.onListenRevoked_(n.p,n.q):e==="ac"?this.onAuthRevoked_(n.s,n.d):e==="apc"?this.onAppCheckRevoked_(n.s,n.d):e==="sd"?this.onSecurityDebugPacket_(n):ci("Unrecognized action received from server: "+U(e)+`
Are you using the latest client?`)}onReady_(e,n){this.log_("connection ready"),this.connected_=!0,this.lastConnectionEstablishedTime_=new Date().getTime(),this.handleTimestamp_(e),this.lastSessionId=n,this.firstConnection_&&this.sendConnectStats_(),this.restoreState_(),this.firstConnection_=!1,this.onConnectStatus_(!0)}scheduleConnect_(e){m(!this.realtime_,"Scheduling a connect when we're already connected/ing?"),this.establishConnectionTimer_&&clearTimeout(this.establishConnectionTimer_),this.establishConnectionTimer_=setTimeout(()=>{this.establishConnectionTimer_=null,this.establishConnection_()},Math.floor(e))}initConnection_(){!this.realtime_&&this.firstConnection_&&this.scheduleConnect_(0)}onVisible_(e){e&&!this.visible_&&this.reconnectDelay_===this.maxReconnectDelay_&&(this.log_("Window became visible.  Reducing delay."),this.reconnectDelay_=ht,this.realtime_||this.scheduleConnect_(0)),this.visible_=e}onOnline_(e){e?(this.log_("Browser went online."),this.reconnectDelay_=ht,this.realtime_||this.scheduleConnect_(0)):(this.log_("Browser went offline.  Killing connection."),this.realtime_&&this.realtime_.close())}onRealtimeDisconnect_(){if(this.log_("data client disconnected"),this.connected_=!1,this.realtime_=null,this.cancelSentTransactions_(),this.requestCBHash_={},this.shouldReconnect_()){this.visible_?this.lastConnectionEstablishedTime_&&(new Date().getTime()-this.lastConnectionEstablishedTime_>bd&&(this.reconnectDelay_=ht),this.lastConnectionEstablishedTime_=null):(this.log_("Window isn't visible.  Delaying reconnect."),this.reconnectDelay_=this.maxReconnectDelay_,this.lastConnectionAttemptTime_=new Date().getTime());const e=Math.max(0,new Date().getTime()-this.lastConnectionAttemptTime_);let n=Math.max(0,this.reconnectDelay_-e);n=Math.random()*n,this.log_("Trying to reconnect in "+n+"ms"),this.scheduleConnect_(n),this.reconnectDelay_=Math.min(this.maxReconnectDelay_,this.reconnectDelay_*vd)}this.onConnectStatus_(!1)}async establishConnection_(){if(this.shouldReconnect_()){this.log_("Making a connection attempt"),this.lastConnectionAttemptTime_=new Date().getTime(),this.lastConnectionEstablishedTime_=null;const e=this.onDataMessage_.bind(this),n=this.onReady_.bind(this),i=this.onRealtimeDisconnect_.bind(this),s=this.id+":"+de.nextConnectionId_++,r=this.lastSessionId;let o=!1,a=null;const l=function(){a?a.close():(o=!0,i())},c=function(h){m(a,"sendRequest call when we're not connected not allowed."),a.sendRequest(h)};this.realtime_={close:l,sendRequest:c};const d=this.forceTokenRefresh_;this.forceTokenRefresh_=!1;try{const[h,f]=await Promise.all([this.authTokenProvider_.getToken(d),this.appCheckTokenProvider_.getToken(d)]);o?q("getToken() completed but was canceled"):(q("getToken() completed. Creating connection."),this.authToken_=h&&h.accessToken,this.appCheckToken_=f&&f.token,a=new ud(s,this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,e,n,i,g=>{K(g+" ("+this.repoInfo_.toString()+")"),this.interrupt(wd)},r))}catch(h){this.log_("Failed to get token: "+h),o||(this.repoInfo_.nodeAdmin&&K(h),l())}}}interrupt(e){q("Interrupting connection for reason: "+e),this.interruptReasons_[e]=!0,this.realtime_?this.realtime_.close():(this.establishConnectionTimer_&&(clearTimeout(this.establishConnectionTimer_),this.establishConnectionTimer_=null),this.connected_&&this.onRealtimeDisconnect_())}resume(e){q("Resuming connection for reason: "+e),delete this.interruptReasons_[e],ii(this.interruptReasons_)&&(this.reconnectDelay_=ht,this.realtime_||this.scheduleConnect_(0))}handleTimestamp_(e){const n=e-new Date().getTime();this.onServerInfoUpdate_({serverTimeOffset:n})}cancelSentTransactions_(){for(let e=0;e<this.outstandingPuts_.length;e++){const n=this.outstandingPuts_[e];n&&"h"in n.request&&n.queued&&(n.onComplete&&n.onComplete("disconnect"),delete this.outstandingPuts_[e],this.outstandingPutCount_--)}this.outstandingPutCount_===0&&(this.outstandingPuts_=[])}onListenRevoked_(e,n){let i;n?i=n.map(r=>Ri(r)).join("$"):i="default";const s=this.removeListen_(e,i);s&&s.onComplete&&s.onComplete("permission_denied")}removeListen_(e,n){const i=new N(e).toString();let s;if(this.listens.has(i)){const r=this.listens.get(i);s=r.get(n),r.delete(n),r.size===0&&this.listens.delete(i)}else s=void 0;return s}onAuthRevoked_(e,n){q("Auth token revoked: "+e+"/"+n),this.authToken_=null,this.forceTokenRefresh_=!0,this.realtime_.close(),(e==="invalid_token"||e==="permission_denied")&&(this.invalidAuthTokenCount_++,this.invalidAuthTokenCount_>=er&&(this.reconnectDelay_=Js,this.authTokenProvider_.notifyForInvalidToken()))}onAppCheckRevoked_(e,n){q("App check token revoked: "+e+"/"+n),this.appCheckToken_=null,this.forceTokenRefresh_=!0,(e==="invalid_token"||e==="permission_denied")&&(this.invalidAppCheckTokenCount_++,this.invalidAppCheckTokenCount_>=er&&this.appCheckTokenProvider_.notifyForInvalidToken())}onSecurityDebugPacket_(e){this.securityDebugCallback_?this.securityDebugCallback_(e):"msg"in e&&console.log("FIREBASE: "+e.msg.replace(`
`,`
FIREBASE: `))}restoreState_(){this.tryAuth(),this.tryAppCheck();for(const e of this.listens.values())for(const n of e.values())this.sendListen_(n);for(let e=0;e<this.outstandingPuts_.length;e++)this.outstandingPuts_[e]&&this.sendPut_(e);for(;this.onDisconnectRequestQueue_.length;){const e=this.onDisconnectRequestQueue_.shift();this.sendOnDisconnect_(e.action,e.pathString,e.data,e.onComplete)}for(let e=0;e<this.outstandingGets_.length;e++)this.outstandingGets_[e]&&this.sendGet_(e)}sendConnectStats_(){const e={};let n="js";e["sdk."+n+"."+to.replace(/\./g,"-")]=1,Gr()?e["framework.cordova"]=1:Ql()&&(e["framework.reactnative"]=1),this.reportStats(e)}shouldReconnect_(){const e=hn.getInstance().currentlyOnline();return ii(this.interruptReasons_)&&e}}de.nextPersistentConnectionId_=0;de.nextConnectionId_=0;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class E{constructor(e,n){this.name=e,this.node=n}static Wrap(e,n){return new E(e,n)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class kn{getCompare(){return this.compare.bind(this)}indexedValueChanged(e,n){const i=new E(Xe,e),s=new E(Xe,n);return this.compare(i,s)!==0}minPost(){return E.MIN}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let zt;class Io extends kn{static get __EMPTY_NODE(){return zt}static set __EMPTY_NODE(e){zt=e}compare(e,n){return Fe(e.name,n.name)}isDefinedOn(e){throw st("KeyIndex.isDefinedOn not expected to be called.")}indexedValueChanged(e,n){return!1}minPost(){return E.MIN}maxPost(){return new E(xe,zt)}makePost(e,n){return m(typeof e=="string","KeyIndex indexValue must always be a string."),new E(e,zt)}toString(){return".key"}}const Ve=new Io;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Kt{constructor(e,n,i,s,r=null){this.isReverse_=s,this.resultGenerator_=r,this.nodeStack_=[];let o=1;for(;!e.isEmpty();)if(e=e,o=n?i(e.key,n):1,s&&(o*=-1),o<0)this.isReverse_?e=e.left:e=e.right;else if(o===0){this.nodeStack_.push(e);break}else this.nodeStack_.push(e),this.isReverse_?e=e.right:e=e.left}getNext(){if(this.nodeStack_.length===0)return null;let e=this.nodeStack_.pop(),n;if(this.resultGenerator_?n=this.resultGenerator_(e.key,e.value):n={key:e.key,value:e.value},this.isReverse_)for(e=e.left;!e.isEmpty();)this.nodeStack_.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack_.push(e),e=e.left;return n}hasNext(){return this.nodeStack_.length>0}peek(){if(this.nodeStack_.length===0)return null;const e=this.nodeStack_[this.nodeStack_.length-1];return this.resultGenerator_?this.resultGenerator_(e.key,e.value):{key:e.key,value:e.value}}}class W{constructor(e,n,i,s,r){this.key=e,this.value=n,this.color=i??W.RED,this.left=s??z.EMPTY_NODE,this.right=r??z.EMPTY_NODE}copy(e,n,i,s,r){return new W(e??this.key,n??this.value,i??this.color,s??this.left,r??this.right)}count(){return this.left.count()+1+this.right.count()}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||!!e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min_(){return this.left.isEmpty()?this:this.left.min_()}minKey(){return this.min_().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,n,i){let s=this;const r=i(e,s.key);return r<0?s=s.copy(null,null,null,s.left.insert(e,n,i),null):r===0?s=s.copy(null,n,null,null,null):s=s.copy(null,null,null,null,s.right.insert(e,n,i)),s.fixUp_()}removeMin_(){if(this.left.isEmpty())return z.EMPTY_NODE;let e=this;return!e.left.isRed_()&&!e.left.left.isRed_()&&(e=e.moveRedLeft_()),e=e.copy(null,null,null,e.left.removeMin_(),null),e.fixUp_()}remove(e,n){let i,s;if(i=this,n(e,i.key)<0)!i.left.isEmpty()&&!i.left.isRed_()&&!i.left.left.isRed_()&&(i=i.moveRedLeft_()),i=i.copy(null,null,null,i.left.remove(e,n),null);else{if(i.left.isRed_()&&(i=i.rotateRight_()),!i.right.isEmpty()&&!i.right.isRed_()&&!i.right.left.isRed_()&&(i=i.moveRedRight_()),n(e,i.key)===0){if(i.right.isEmpty())return z.EMPTY_NODE;s=i.right.min_(),i=i.copy(s.key,s.value,null,null,i.right.removeMin_())}i=i.copy(null,null,null,null,i.right.remove(e,n))}return i.fixUp_()}isRed_(){return this.color}fixUp_(){let e=this;return e.right.isRed_()&&!e.left.isRed_()&&(e=e.rotateLeft_()),e.left.isRed_()&&e.left.left.isRed_()&&(e=e.rotateRight_()),e.left.isRed_()&&e.right.isRed_()&&(e=e.colorFlip_()),e}moveRedLeft_(){let e=this.colorFlip_();return e.right.left.isRed_()&&(e=e.copy(null,null,null,null,e.right.rotateRight_()),e=e.rotateLeft_(),e=e.colorFlip_()),e}moveRedRight_(){let e=this.colorFlip_();return e.left.left.isRed_()&&(e=e.rotateRight_(),e=e.colorFlip_()),e}rotateLeft_(){const e=this.copy(null,null,W.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight_(){const e=this.copy(null,null,W.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip_(){const e=this.left.copy(null,null,!this.left.color,null,null),n=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,n)}checkMaxDepth_(){const e=this.check_();return Math.pow(2,e)<=this.count()+1}check_(){if(this.isRed_()&&this.left.isRed_())throw new Error("Red node has red child("+this.key+","+this.value+")");if(this.right.isRed_())throw new Error("Right child of ("+this.key+","+this.value+") is red");const e=this.left.check_();if(e!==this.right.check_())throw new Error("Black depths differ");return e+(this.isRed_()?0:1)}}W.RED=!0;W.BLACK=!1;class Cd{copy(e,n,i,s,r){return this}insert(e,n,i){return new W(e,n,null)}remove(e,n){return this}count(){return 0}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}check_(){return 0}isRed_(){return!1}}class z{constructor(e,n=z.EMPTY_NODE){this.comparator_=e,this.root_=n}insert(e,n){return new z(this.comparator_,this.root_.insert(e,n,this.comparator_).copy(null,null,W.BLACK,null,null))}remove(e){return new z(this.comparator_,this.root_.remove(e,this.comparator_).copy(null,null,W.BLACK,null,null))}get(e){let n,i=this.root_;for(;!i.isEmpty();){if(n=this.comparator_(e,i.key),n===0)return i.value;n<0?i=i.left:n>0&&(i=i.right)}return null}getPredecessorKey(e){let n,i=this.root_,s=null;for(;!i.isEmpty();)if(n=this.comparator_(e,i.key),n===0){if(i.left.isEmpty())return s?s.key:null;for(i=i.left;!i.right.isEmpty();)i=i.right;return i.key}else n<0?i=i.left:n>0&&(s=i,i=i.right);throw new Error("Attempted to find predecessor key for a nonexistent key.  What gives?")}isEmpty(){return this.root_.isEmpty()}count(){return this.root_.count()}minKey(){return this.root_.minKey()}maxKey(){return this.root_.maxKey()}inorderTraversal(e){return this.root_.inorderTraversal(e)}reverseTraversal(e){return this.root_.reverseTraversal(e)}getIterator(e){return new Kt(this.root_,null,this.comparator_,!1,e)}getIteratorFrom(e,n){return new Kt(this.root_,e,this.comparator_,!1,n)}getReverseIteratorFrom(e,n){return new Kt(this.root_,e,this.comparator_,!0,n)}getReverseIterator(e){return new Kt(this.root_,null,this.comparator_,!0,e)}}z.EMPTY_NODE=new Cd;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Sd(t,e){return Fe(t.name,e.name)}function Fi(t,e){return Fe(t,e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let di;function Ed(t){di=t}const Ao=function(t){return typeof t=="number"?"number:"+ro(t):"string:"+t},No=function(t){if(t.isLeafNode()){const e=t.val();m(typeof e=="string"||typeof e=="number"||typeof e=="object"&&oe(e,".sv"),"Priority must be a string or number.")}else m(t===di||t.isEmpty(),"priority of unexpected type.");m(t===di||t.getPriority().isEmpty(),"Priority nodes can't have a priority of their own.")};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let tr;class H{static set __childrenNodeConstructor(e){tr=e}static get __childrenNodeConstructor(){return tr}constructor(e,n=H.__childrenNodeConstructor.EMPTY_NODE){this.value_=e,this.priorityNode_=n,this.lazyHash_=null,m(this.value_!==void 0&&this.value_!==null,"LeafNode shouldn't be created with null/undefined value."),No(this.priorityNode_)}isLeafNode(){return!0}getPriority(){return this.priorityNode_}updatePriority(e){return new H(this.value_,e)}getImmediateChild(e){return e===".priority"?this.priorityNode_:H.__childrenNodeConstructor.EMPTY_NODE}getChild(e){return S(e)?this:C(e)===".priority"?this.priorityNode_:H.__childrenNodeConstructor.EMPTY_NODE}hasChild(){return!1}getPredecessorChildName(e,n){return null}updateImmediateChild(e,n){return e===".priority"?this.updatePriority(n):n.isEmpty()&&e!==".priority"?this:H.__childrenNodeConstructor.EMPTY_NODE.updateImmediateChild(e,n).updatePriority(this.priorityNode_)}updateChild(e,n){const i=C(e);return i===null?n:n.isEmpty()&&i!==".priority"?this:(m(i!==".priority"||be(e)===1,".priority must be the last token in a path"),this.updateImmediateChild(i,H.__childrenNodeConstructor.EMPTY_NODE.updateChild(R(e),n)))}isEmpty(){return!1}numChildren(){return 0}forEachChild(e,n){return!1}val(e){return e&&!this.getPriority().isEmpty()?{".value":this.getValue(),".priority":this.getPriority().val()}:this.getValue()}hash(){if(this.lazyHash_===null){let e="";this.priorityNode_.isEmpty()||(e+="priority:"+Ao(this.priorityNode_.val())+":");const n=typeof this.value_;e+=n+":",n==="number"?e+=ro(this.value_):e+=this.value_,this.lazyHash_=io(e)}return this.lazyHash_}getValue(){return this.value_}compareTo(e){return e===H.__childrenNodeConstructor.EMPTY_NODE?1:e instanceof H.__childrenNodeConstructor?-1:(m(e.isLeafNode(),"Unknown node type"),this.compareToLeafNode_(e))}compareToLeafNode_(e){const n=typeof e.value_,i=typeof this.value_,s=H.VALUE_TYPE_ORDER.indexOf(n),r=H.VALUE_TYPE_ORDER.indexOf(i);return m(s>=0,"Unknown leaf type: "+n),m(r>=0,"Unknown leaf type: "+i),s===r?i==="object"?0:this.value_<e.value_?-1:this.value_===e.value_?0:1:r-s}withIndex(){return this}isIndexed(){return!0}equals(e){if(e===this)return!0;if(e.isLeafNode()){const n=e;return this.value_===n.value_&&this.priorityNode_.equals(n.priorityNode_)}else return!1}}H.VALUE_TYPE_ORDER=["object","boolean","number","string"];/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Ro,xo;function kd(t){Ro=t}function Td(t){xo=t}class Id extends kn{compare(e,n){const i=e.node.getPriority(),s=n.node.getPriority(),r=i.compareTo(s);return r===0?Fe(e.name,n.name):r}isDefinedOn(e){return!e.getPriority().isEmpty()}indexedValueChanged(e,n){return!e.getPriority().equals(n.getPriority())}minPost(){return E.MIN}maxPost(){return new E(xe,new H("[PRIORITY-POST]",xo))}makePost(e,n){const i=Ro(e);return new E(n,new H("[PRIORITY-POST]",i))}toString(){return".priority"}}const M=new Id;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ad=Math.log(2);class Nd{constructor(e){const n=r=>parseInt(Math.log(r)/Ad,10),i=r=>parseInt(Array(r+1).join("1"),2);this.count=n(e+1),this.current_=this.count-1;const s=i(this.count);this.bits_=e+1&s}nextBitIsOne(){const e=!(this.bits_&1<<this.current_);return this.current_--,e}}const dn=function(t,e,n,i){t.sort(e);const s=function(l,c){const d=c-l;let h,f;if(d===0)return null;if(d===1)return h=t[l],f=n?n(h):h,new W(f,h.node,W.BLACK,null,null);{const g=parseInt(d/2,10)+l,_=s(l,g),k=s(g+1,c);return h=t[g],f=n?n(h):h,new W(f,h.node,W.BLACK,_,k)}},r=function(l){let c=null,d=null,h=t.length;const f=function(_,k){const O=h-_,B=h;h-=_;const Y=s(O+1,B),Z=t[O],J=n?n(Z):Z;g(new W(J,Z.node,k,null,Y))},g=function(_){c?(c.left=_,c=_):(d=_,c=_)};for(let _=0;_<l.count;++_){const k=l.nextBitIsOne(),O=Math.pow(2,l.count-(_+1));k?f(O,W.BLACK):(f(O,W.BLACK),f(O,W.RED))}return d},o=new Nd(t.length),a=r(o);return new z(i||e,a)};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Vn;const Be={};class he{static get Default(){return m(Be&&M,"ChildrenNode.ts has not been loaded"),Vn=Vn||new he({".priority":Be},{".priority":M}),Vn}constructor(e,n){this.indexes_=e,this.indexSet_=n}get(e){const n=Ze(this.indexes_,e);if(!n)throw new Error("No index defined for "+e);return n instanceof z?n:null}hasIndex(e){return oe(this.indexSet_,e.toString())}addIndex(e,n){m(e!==Ve,"KeyIndex always exists and isn't meant to be added to the IndexMap.");const i=[];let s=!1;const r=n.getIterator(E.Wrap);let o=r.getNext();for(;o;)s=s||e.isDefinedOn(o.node),i.push(o),o=r.getNext();let a;s?a=dn(i,e.getCompare()):a=Be;const l=e.toString(),c={...this.indexSet_};c[l]=e;const d={...this.indexes_};return d[l]=a,new he(d,c)}addToIndexes(e,n){const i=rn(this.indexes_,(s,r)=>{const o=Ze(this.indexSet_,r);if(m(o,"Missing index implementation for "+r),s===Be)if(o.isDefinedOn(e.node)){const a=[],l=n.getIterator(E.Wrap);let c=l.getNext();for(;c;)c.name!==e.name&&a.push(c),c=l.getNext();return a.push(e),dn(a,o.getCompare())}else return Be;else{const a=n.get(e.name);let l=s;return a&&(l=l.remove(new E(e.name,a))),l.insert(e,e.node)}});return new he(i,this.indexSet_)}removeFromIndexes(e,n){const i=rn(this.indexes_,s=>{if(s===Be)return s;{const r=n.get(e.name);return r?s.remove(new E(e.name,r)):s}});return new he(i,this.indexSet_)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let dt;class w{static get EMPTY_NODE(){return dt||(dt=new w(new z(Fi),null,he.Default))}constructor(e,n,i){this.children_=e,this.priorityNode_=n,this.indexMap_=i,this.lazyHash_=null,this.priorityNode_&&No(this.priorityNode_),this.children_.isEmpty()&&m(!this.priorityNode_||this.priorityNode_.isEmpty(),"An empty node cannot have a priority")}isLeafNode(){return!1}getPriority(){return this.priorityNode_||dt}updatePriority(e){return this.children_.isEmpty()?this:new w(this.children_,e,this.indexMap_)}getImmediateChild(e){if(e===".priority")return this.getPriority();{const n=this.children_.get(e);return n===null?dt:n}}getChild(e){const n=C(e);return n===null?this:this.getImmediateChild(n).getChild(R(e))}hasChild(e){return this.children_.get(e)!==null}updateImmediateChild(e,n){if(m(n,"We should always be passing snapshot nodes"),e===".priority")return this.updatePriority(n);{const i=new E(e,n);let s,r;n.isEmpty()?(s=this.children_.remove(e),r=this.indexMap_.removeFromIndexes(i,this.children_)):(s=this.children_.insert(e,n),r=this.indexMap_.addToIndexes(i,this.children_));const o=s.isEmpty()?dt:this.priorityNode_;return new w(s,o,r)}}updateChild(e,n){const i=C(e);if(i===null)return n;{m(C(e)!==".priority"||be(e)===1,".priority must be the last token in a path");const s=this.getImmediateChild(i).updateChild(R(e),n);return this.updateImmediateChild(i,s)}}isEmpty(){return this.children_.isEmpty()}numChildren(){return this.children_.count()}val(e){if(this.isEmpty())return null;const n={};let i=0,s=0,r=!0;if(this.forEachChild(M,(o,a)=>{n[o]=a.val(e),i++,r&&w.INTEGER_REGEXP_.test(o)?s=Math.max(s,Number(o)):r=!1}),!e&&r&&s<2*i){const o=[];for(const a in n)o[a]=n[a];return o}else return e&&!this.getPriority().isEmpty()&&(n[".priority"]=this.getPriority().val()),n}hash(){if(this.lazyHash_===null){let e="";this.getPriority().isEmpty()||(e+="priority:"+Ao(this.getPriority().val())+":"),this.forEachChild(M,(n,i)=>{const s=i.hash();s!==""&&(e+=":"+n+":"+s)}),this.lazyHash_=e===""?"":io(e)}return this.lazyHash_}getPredecessorChildName(e,n,i){const s=this.resolveIndex_(i);if(s){const r=s.getPredecessorKey(new E(e,n));return r?r.name:null}else return this.children_.getPredecessorKey(e)}getFirstChildName(e){const n=this.resolveIndex_(e);if(n){const i=n.minKey();return i&&i.name}else return this.children_.minKey()}getFirstChild(e){const n=this.getFirstChildName(e);return n?new E(n,this.children_.get(n)):null}getLastChildName(e){const n=this.resolveIndex_(e);if(n){const i=n.maxKey();return i&&i.name}else return this.children_.maxKey()}getLastChild(e){const n=this.getLastChildName(e);return n?new E(n,this.children_.get(n)):null}forEachChild(e,n){const i=this.resolveIndex_(e);return i?i.inorderTraversal(s=>n(s.name,s.node)):this.children_.inorderTraversal(n)}getIterator(e){return this.getIteratorFrom(e.minPost(),e)}getIteratorFrom(e,n){const i=this.resolveIndex_(n);if(i)return i.getIteratorFrom(e,s=>s);{const s=this.children_.getIteratorFrom(e.name,E.Wrap);let r=s.peek();for(;r!=null&&n.compare(r,e)<0;)s.getNext(),r=s.peek();return s}}getReverseIterator(e){return this.getReverseIteratorFrom(e.maxPost(),e)}getReverseIteratorFrom(e,n){const i=this.resolveIndex_(n);if(i)return i.getReverseIteratorFrom(e,s=>s);{const s=this.children_.getReverseIteratorFrom(e.name,E.Wrap);let r=s.peek();for(;r!=null&&n.compare(r,e)>0;)s.getNext(),r=s.peek();return s}}compareTo(e){return this.isEmpty()?e.isEmpty()?0:-1:e.isLeafNode()||e.isEmpty()?1:e===qt?-1:0}withIndex(e){if(e===Ve||this.indexMap_.hasIndex(e))return this;{const n=this.indexMap_.addIndex(e,this.children_);return new w(this.children_,this.priorityNode_,n)}}isIndexed(e){return e===Ve||this.indexMap_.hasIndex(e)}equals(e){if(e===this)return!0;if(e.isLeafNode())return!1;{const n=e;if(this.getPriority().equals(n.getPriority()))if(this.children_.count()===n.children_.count()){const i=this.getIterator(M),s=n.getIterator(M);let r=i.getNext(),o=s.getNext();for(;r&&o;){if(r.name!==o.name||!r.node.equals(o.node))return!1;r=i.getNext(),o=s.getNext()}return r===null&&o===null}else return!1;else return!1}}resolveIndex_(e){return e===Ve?null:this.indexMap_.get(e.toString())}}w.INTEGER_REGEXP_=/^(0|[1-9]\d*)$/;class Rd extends w{constructor(){super(new z(Fi),w.EMPTY_NODE,he.Default)}compareTo(e){return e===this?0:1}equals(e){return e===this}getPriority(){return this}getImmediateChild(e){return w.EMPTY_NODE}isEmpty(){return!1}}const qt=new Rd;Object.defineProperties(E,{MIN:{value:new E(Xe,w.EMPTY_NODE)},MAX:{value:new E(xe,qt)}});Io.__EMPTY_NODE=w.EMPTY_NODE;H.__childrenNodeConstructor=w;Ed(qt);Td(qt);/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const xd=!0;function $(t,e=null){if(t===null)return w.EMPTY_NODE;if(typeof t=="object"&&".priority"in t&&(e=t[".priority"]),m(e===null||typeof e=="string"||typeof e=="number"||typeof e=="object"&&".sv"in e,"Invalid priority type found: "+typeof e),typeof t=="object"&&".value"in t&&t[".value"]!==null&&(t=t[".value"]),typeof t!="object"||".sv"in t){const n=t;return new H(n,$(e))}if(!(t instanceof Array)&&xd){const n=[];let i=!1;if(j(t,(o,a)=>{if(o.substring(0,1)!=="."){const l=$(a);l.isEmpty()||(i=i||!l.getPriority().isEmpty(),n.push(new E(o,l)))}}),n.length===0)return w.EMPTY_NODE;const r=dn(n,Sd,o=>o.name,Fi);if(i){const o=dn(n,M.getCompare());return new w(r,$(e),new he({".priority":o},{".priority":M}))}else return new w(r,$(e),he.Default)}else{let n=w.EMPTY_NODE;return j(t,(i,s)=>{if(oe(t,i)&&i.substring(0,1)!=="."){const r=$(s);(r.isLeafNode()||!r.isEmpty())&&(n=n.updateImmediateChild(i,r))}}),n.updatePriority($(e))}}kd($);/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pd extends kn{constructor(e){super(),this.indexPath_=e,m(!S(e)&&C(e)!==".priority","Can't create PathIndex with empty path or .priority key")}extractChild(e){return e.getChild(this.indexPath_)}isDefinedOn(e){return!e.getChild(this.indexPath_).isEmpty()}compare(e,n){const i=this.extractChild(e.node),s=this.extractChild(n.node),r=i.compareTo(s);return r===0?Fe(e.name,n.name):r}makePost(e,n){const i=$(e),s=w.EMPTY_NODE.updateChild(this.indexPath_,i);return new E(n,s)}maxPost(){const e=w.EMPTY_NODE.updateChild(this.indexPath_,qt);return new E(xe,e)}toString(){return Nt(this.indexPath_,0).join("/")}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Dd extends kn{compare(e,n){const i=e.node.compareTo(n.node);return i===0?Fe(e.name,n.name):i}isDefinedOn(e){return!0}indexedValueChanged(e,n){return!e.equals(n)}minPost(){return E.MIN}maxPost(){return E.MAX}makePost(e,n){const i=$(e);return new E(n,i)}toString(){return".value"}}const Od=new Dd;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Po(t){return{type:"value",snapshotNode:t}}function Je(t,e){return{type:"child_added",snapshotNode:e,childName:t}}function Rt(t,e){return{type:"child_removed",snapshotNode:e,childName:t}}function xt(t,e,n){return{type:"child_changed",snapshotNode:e,childName:t,oldSnap:n}}function Md(t,e){return{type:"child_moved",snapshotNode:e,childName:t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $i{constructor(e){this.index_=e}updateChild(e,n,i,s,r,o){m(e.isIndexed(this.index_),"A node must be indexed if only a child is updated");const a=e.getImmediateChild(n);return a.getChild(s).equals(i.getChild(s))&&a.isEmpty()===i.isEmpty()||(o!=null&&(i.isEmpty()?e.hasChild(n)?o.trackChildChange(Rt(n,a)):m(e.isLeafNode(),"A child remove without an old child only makes sense on a leaf node"):a.isEmpty()?o.trackChildChange(Je(n,i)):o.trackChildChange(xt(n,i,a))),e.isLeafNode()&&i.isEmpty())?e:e.updateImmediateChild(n,i).withIndex(this.index_)}updateFullNode(e,n,i){return i!=null&&(e.isLeafNode()||e.forEachChild(M,(s,r)=>{n.hasChild(s)||i.trackChildChange(Rt(s,r))}),n.isLeafNode()||n.forEachChild(M,(s,r)=>{if(e.hasChild(s)){const o=e.getImmediateChild(s);o.equals(r)||i.trackChildChange(xt(s,r,o))}else i.trackChildChange(Je(s,r))})),n.withIndex(this.index_)}updatePriority(e,n){return e.isEmpty()?w.EMPTY_NODE:e.updatePriority(n)}filtersNodes(){return!1}getIndexedFilter(){return this}getIndex(){return this.index_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pt{constructor(e){this.indexedFilter_=new $i(e.getIndex()),this.index_=e.getIndex(),this.startPost_=Pt.getStartPost_(e),this.endPost_=Pt.getEndPost_(e),this.startIsInclusive_=!e.startAfterSet_,this.endIsInclusive_=!e.endBeforeSet_}getStartPost(){return this.startPost_}getEndPost(){return this.endPost_}matches(e){const n=this.startIsInclusive_?this.index_.compare(this.getStartPost(),e)<=0:this.index_.compare(this.getStartPost(),e)<0,i=this.endIsInclusive_?this.index_.compare(e,this.getEndPost())<=0:this.index_.compare(e,this.getEndPost())<0;return n&&i}updateChild(e,n,i,s,r,o){return this.matches(new E(n,i))||(i=w.EMPTY_NODE),this.indexedFilter_.updateChild(e,n,i,s,r,o)}updateFullNode(e,n,i){n.isLeafNode()&&(n=w.EMPTY_NODE);let s=n.withIndex(this.index_);s=s.updatePriority(w.EMPTY_NODE);const r=this;return n.forEachChild(M,(o,a)=>{r.matches(new E(o,a))||(s=s.updateImmediateChild(o,w.EMPTY_NODE))}),this.indexedFilter_.updateFullNode(e,s,i)}updatePriority(e,n){return e}filtersNodes(){return!0}getIndexedFilter(){return this.indexedFilter_}getIndex(){return this.index_}static getStartPost_(e){if(e.hasStart()){const n=e.getIndexStartName();return e.getIndex().makePost(e.getIndexStartValue(),n)}else return e.getIndex().minPost()}static getEndPost_(e){if(e.hasEnd()){const n=e.getIndexEndName();return e.getIndex().makePost(e.getIndexEndValue(),n)}else return e.getIndex().maxPost()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ld{constructor(e){this.withinDirectionalStart=n=>this.reverse_?this.withinEndPost(n):this.withinStartPost(n),this.withinDirectionalEnd=n=>this.reverse_?this.withinStartPost(n):this.withinEndPost(n),this.withinStartPost=n=>{const i=this.index_.compare(this.rangedFilter_.getStartPost(),n);return this.startIsInclusive_?i<=0:i<0},this.withinEndPost=n=>{const i=this.index_.compare(n,this.rangedFilter_.getEndPost());return this.endIsInclusive_?i<=0:i<0},this.rangedFilter_=new Pt(e),this.index_=e.getIndex(),this.limit_=e.getLimit(),this.reverse_=!e.isViewFromLeft(),this.startIsInclusive_=!e.startAfterSet_,this.endIsInclusive_=!e.endBeforeSet_}updateChild(e,n,i,s,r,o){return this.rangedFilter_.matches(new E(n,i))||(i=w.EMPTY_NODE),e.getImmediateChild(n).equals(i)?e:e.numChildren()<this.limit_?this.rangedFilter_.getIndexedFilter().updateChild(e,n,i,s,r,o):this.fullLimitUpdateChild_(e,n,i,r,o)}updateFullNode(e,n,i){let s;if(n.isLeafNode()||n.isEmpty())s=w.EMPTY_NODE.withIndex(this.index_);else if(this.limit_*2<n.numChildren()&&n.isIndexed(this.index_)){s=w.EMPTY_NODE.withIndex(this.index_);let r;this.reverse_?r=n.getReverseIteratorFrom(this.rangedFilter_.getEndPost(),this.index_):r=n.getIteratorFrom(this.rangedFilter_.getStartPost(),this.index_);let o=0;for(;r.hasNext()&&o<this.limit_;){const a=r.getNext();if(this.withinDirectionalStart(a))if(this.withinDirectionalEnd(a))s=s.updateImmediateChild(a.name,a.node),o++;else break;else continue}}else{s=n.withIndex(this.index_),s=s.updatePriority(w.EMPTY_NODE);let r;this.reverse_?r=s.getReverseIterator(this.index_):r=s.getIterator(this.index_);let o=0;for(;r.hasNext();){const a=r.getNext();o<this.limit_&&this.withinDirectionalStart(a)&&this.withinDirectionalEnd(a)?o++:s=s.updateImmediateChild(a.name,w.EMPTY_NODE)}}return this.rangedFilter_.getIndexedFilter().updateFullNode(e,s,i)}updatePriority(e,n){return e}filtersNodes(){return!0}getIndexedFilter(){return this.rangedFilter_.getIndexedFilter()}getIndex(){return this.index_}fullLimitUpdateChild_(e,n,i,s,r){let o;if(this.reverse_){const h=this.index_.getCompare();o=(f,g)=>h(g,f)}else o=this.index_.getCompare();const a=e;m(a.numChildren()===this.limit_,"");const l=new E(n,i),c=this.reverse_?a.getFirstChild(this.index_):a.getLastChild(this.index_),d=this.rangedFilter_.matches(l);if(a.hasChild(n)){const h=a.getImmediateChild(n);let f=s.getChildAfterChild(this.index_,c,this.reverse_);for(;f!=null&&(f.name===n||a.hasChild(f.name));)f=s.getChildAfterChild(this.index_,f,this.reverse_);const g=f==null?1:o(f,l);if(d&&!i.isEmpty()&&g>=0)return r!=null&&r.trackChildChange(xt(n,i,h)),a.updateImmediateChild(n,i);{r!=null&&r.trackChildChange(Rt(n,h));const k=a.updateImmediateChild(n,w.EMPTY_NODE);return f!=null&&this.rangedFilter_.matches(f)?(r!=null&&r.trackChildChange(Je(f.name,f.node)),k.updateImmediateChild(f.name,f.node)):k}}else return i.isEmpty()?e:d&&o(c,l)>=0?(r!=null&&(r.trackChildChange(Rt(c.name,c.node)),r.trackChildChange(Je(n,i))),a.updateImmediateChild(n,i).updateImmediateChild(c.name,w.EMPTY_NODE)):e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Bi{constructor(){this.limitSet_=!1,this.startSet_=!1,this.startNameSet_=!1,this.startAfterSet_=!1,this.endSet_=!1,this.endNameSet_=!1,this.endBeforeSet_=!1,this.limit_=0,this.viewFrom_="",this.indexStartValue_=null,this.indexStartName_="",this.indexEndValue_=null,this.indexEndName_="",this.index_=M}hasStart(){return this.startSet_}isViewFromLeft(){return this.viewFrom_===""?this.startSet_:this.viewFrom_==="l"}getIndexStartValue(){return m(this.startSet_,"Only valid if start has been set"),this.indexStartValue_}getIndexStartName(){return m(this.startSet_,"Only valid if start has been set"),this.startNameSet_?this.indexStartName_:Xe}hasEnd(){return this.endSet_}getIndexEndValue(){return m(this.endSet_,"Only valid if end has been set"),this.indexEndValue_}getIndexEndName(){return m(this.endSet_,"Only valid if end has been set"),this.endNameSet_?this.indexEndName_:xe}hasLimit(){return this.limitSet_}hasAnchoredLimit(){return this.limitSet_&&this.viewFrom_!==""}getLimit(){return m(this.limitSet_,"Only valid if limit has been set"),this.limit_}getIndex(){return this.index_}loadsAllData(){return!(this.startSet_||this.endSet_||this.limitSet_)}isDefault(){return this.loadsAllData()&&this.index_===M}copy(){const e=new Bi;return e.limitSet_=this.limitSet_,e.limit_=this.limit_,e.startSet_=this.startSet_,e.startAfterSet_=this.startAfterSet_,e.indexStartValue_=this.indexStartValue_,e.startNameSet_=this.startNameSet_,e.indexStartName_=this.indexStartName_,e.endSet_=this.endSet_,e.endBeforeSet_=this.endBeforeSet_,e.indexEndValue_=this.indexEndValue_,e.endNameSet_=this.endNameSet_,e.indexEndName_=this.indexEndName_,e.index_=this.index_,e.viewFrom_=this.viewFrom_,e}}function Fd(t){return t.loadsAllData()?new $i(t.getIndex()):t.hasLimit()?new Ld(t):new Pt(t)}function nr(t){const e={};if(t.isDefault())return e;let n;if(t.index_===M?n="$priority":t.index_===Od?n="$value":t.index_===Ve?n="$key":(m(t.index_ instanceof Pd,"Unrecognized index type!"),n=t.index_.toString()),e.orderBy=U(n),t.startSet_){const i=t.startAfterSet_?"startAfter":"startAt";e[i]=U(t.indexStartValue_),t.startNameSet_&&(e[i]+=","+U(t.indexStartName_))}if(t.endSet_){const i=t.endBeforeSet_?"endBefore":"endAt";e[i]=U(t.indexEndValue_),t.endNameSet_&&(e[i]+=","+U(t.indexEndName_))}return t.limitSet_&&(t.isViewFromLeft()?e.limitToFirst=t.limit_:e.limitToLast=t.limit_),e}function ir(t){const e={};if(t.startSet_&&(e.sp=t.indexStartValue_,t.startNameSet_&&(e.sn=t.indexStartName_),e.sin=!t.startAfterSet_),t.endSet_&&(e.ep=t.indexEndValue_,t.endNameSet_&&(e.en=t.indexEndName_),e.ein=!t.endBeforeSet_),t.limitSet_){e.l=t.limit_;let n=t.viewFrom_;n===""&&(t.isViewFromLeft()?n="l":n="r"),e.vf=n}return t.index_!==M&&(e.i=t.index_.toString()),e}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class un extends So{reportStats(e){throw new Error("Method not implemented.")}static getListenId_(e,n){return n!==void 0?"tag$"+n:(m(e._queryParams.isDefault(),"should have a tag if it's not a default query."),e._path.toString())}constructor(e,n,i,s){super(),this.repoInfo_=e,this.onDataUpdate_=n,this.authTokenProvider_=i,this.appCheckTokenProvider_=s,this.log_=Ut("p:rest:"),this.listens_={}}listen(e,n,i,s){const r=e._path.toString();this.log_("Listen called for "+r+" "+e._queryIdentifier);const o=un.getListenId_(e,i),a={};this.listens_[o]=a;const l=nr(e._queryParams);this.restRequest_(r+".json",l,(c,d)=>{let h=d;if(c===404&&(h=null,c=null),c===null&&this.onDataUpdate_(r,h,!1,i),Ze(this.listens_,o)===a){let f;c?c===401?f="permission_denied":f="rest_error:"+c:f="ok",s(f,null)}})}unlisten(e,n){const i=un.getListenId_(e,n);delete this.listens_[i]}get(e){const n=nr(e._queryParams),i=e._path.toString(),s=new ce;return this.restRequest_(i+".json",n,(r,o)=>{let a=o;r===404&&(a=null,r=null),r===null?(this.onDataUpdate_(i,a,!1,null),s.resolve(a)):s.reject(new Error(a))}),s.promise}refreshAuthToken(e){}restRequest_(e,n={},i){return n.format="export",Promise.all([this.authTokenProvider_.getToken(!1),this.appCheckTokenProvider_.getToken(!1)]).then(([s,r])=>{s&&s.accessToken&&(n.auth=s.accessToken),r&&r.token&&(n.ac=r.token);const o=(this.repoInfo_.secure?"https://":"http://")+this.repoInfo_.host+e+"?ns="+this.repoInfo_.namespace+oc(n);this.log_("Sending REST request for "+o);const a=new XMLHttpRequest;a.onreadystatechange=()=>{if(i&&a.readyState===4){this.log_("REST Response for "+o+" received. status:",a.status,"response:",a.responseText);let l=null;if(a.status>=200&&a.status<300){try{l=kt(a.responseText)}catch{K("Failed to parse JSON response for "+o+": "+a.responseText)}i(null,l)}else a.status!==401&&a.status!==404&&K("Got unsuccessful REST response for "+o+" Status: "+a.status),i(a.status);i=null}},a.open("GET",o,!0),a.send()})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $d{constructor(){this.rootNode_=w.EMPTY_NODE}getNode(e){return this.rootNode_.getChild(e)}updateSnapshot(e,n){this.rootNode_=this.rootNode_.updateChild(e,n)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function fn(){return{value:null,children:new Map}}function at(t,e,n){if(S(e))t.value=n,t.children.clear();else if(t.value!==null)t.value=t.value.updateChild(e,n);else{const i=C(e);t.children.has(i)||t.children.set(i,fn());const s=t.children.get(i);e=R(e),at(s,e,n)}}function ui(t,e){if(S(e))return t.value=null,t.children.clear(),!0;if(t.value!==null){if(t.value.isLeafNode())return!1;{const n=t.value;return t.value=null,n.forEachChild(M,(i,s)=>{at(t,new N(i),s)}),ui(t,e)}}else if(t.children.size>0){const n=C(e);return e=R(e),t.children.has(n)&&ui(t.children.get(n),e)&&t.children.delete(n),t.children.size===0}else return!0}function fi(t,e,n){t.value!==null?n(e,t.value):Bd(t,(i,s)=>{const r=new N(e.toString()+"/"+i);fi(s,r,n)})}function Bd(t,e){t.children.forEach((n,i)=>{e(i,n)})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Hd{constructor(e){this.collection_=e,this.last_=null}get(){const e=this.collection_.get(),n={...e};return this.last_&&j(this.last_,(i,s)=>{n[i]=n[i]-s}),this.last_=e,n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const sr=10*1e3,Wd=30*1e3,Ud=5*60*1e3;class qd{constructor(e,n){this.server_=n,this.statsToReport_={},this.statsListener_=new Hd(e);const i=sr+(Wd-sr)*Math.random();vt(this.reportStats_.bind(this),Math.floor(i))}reportStats_(){const e=this.statsListener_.get(),n={};let i=!1;j(e,(s,r)=>{r>0&&oe(this.statsToReport_,s)&&(n[s]=r,i=!0)}),i&&this.server_.reportStats(n),vt(this.reportStats_.bind(this),Math.floor(Math.random()*2*Ud))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var ie;(function(t){t[t.OVERWRITE=0]="OVERWRITE",t[t.MERGE=1]="MERGE",t[t.ACK_USER_WRITE=2]="ACK_USER_WRITE",t[t.LISTEN_COMPLETE=3]="LISTEN_COMPLETE"})(ie||(ie={}));function Do(){return{fromUser:!0,fromServer:!1,queryId:null,tagged:!1}}function Hi(){return{fromUser:!1,fromServer:!0,queryId:null,tagged:!1}}function Wi(t){return{fromUser:!1,fromServer:!0,queryId:t,tagged:!0}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pn{constructor(e,n,i){this.path=e,this.affectedTree=n,this.revert=i,this.type=ie.ACK_USER_WRITE,this.source=Do()}operationForChild(e){if(S(this.path)){if(this.affectedTree.value!=null)return m(this.affectedTree.children.isEmpty(),"affectedTree should not have overlapping affected paths."),this;{const n=this.affectedTree.subtree(new N(e));return new pn(I(),n,this.revert)}}else return m(C(this.path)===e,"operationForChild called for unrelated child."),new pn(R(this.path),this.affectedTree,this.revert)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Dt{constructor(e,n){this.source=e,this.path=n,this.type=ie.LISTEN_COMPLETE}operationForChild(e){return S(this.path)?new Dt(this.source,I()):new Dt(this.source,R(this.path))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pe{constructor(e,n,i){this.source=e,this.path=n,this.snap=i,this.type=ie.OVERWRITE}operationForChild(e){return S(this.path)?new Pe(this.source,I(),this.snap.getImmediateChild(e)):new Pe(this.source,R(this.path),this.snap)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ot{constructor(e,n,i){this.source=e,this.path=n,this.children=i,this.type=ie.MERGE}operationForChild(e){if(S(this.path)){const n=this.children.subtree(new N(e));return n.isEmpty()?null:n.value?new Pe(this.source,I(),n.value):new Ot(this.source,I(),n)}else return m(C(this.path)===e,"Can't get a merge for a child not on the path of the operation"),new Ot(this.source,R(this.path),this.children)}toString(){return"Operation("+this.path+": "+this.source.toString()+" merge: "+this.children.toString()+")"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class De{constructor(e,n,i){this.node_=e,this.fullyInitialized_=n,this.filtered_=i}isFullyInitialized(){return this.fullyInitialized_}isFiltered(){return this.filtered_}isCompleteForPath(e){if(S(e))return this.isFullyInitialized()&&!this.filtered_;const n=C(e);return this.isCompleteForChild(n)}isCompleteForChild(e){return this.isFullyInitialized()&&!this.filtered_||this.node_.hasChild(e)}getNode(){return this.node_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class jd{constructor(e){this.query_=e,this.index_=this.query_._queryParams.getIndex()}}function Gd(t,e,n,i){const s=[],r=[];return e.forEach(o=>{o.type==="child_changed"&&t.index_.indexedValueChanged(o.oldSnap,o.snapshotNode)&&r.push(Md(o.childName,o.snapshotNode))}),ut(t,s,"child_removed",e,i,n),ut(t,s,"child_added",e,i,n),ut(t,s,"child_moved",r,i,n),ut(t,s,"child_changed",e,i,n),ut(t,s,"value",e,i,n),s}function ut(t,e,n,i,s,r){const o=i.filter(a=>a.type===n);o.sort((a,l)=>zd(t,a,l)),o.forEach(a=>{const l=Vd(t,a,r);s.forEach(c=>{c.respondsTo(a.type)&&e.push(c.createEvent(l,t.query_))})})}function Vd(t,e,n){return e.type==="value"||e.type==="child_removed"||(e.prevName=n.getPredecessorChildName(e.childName,e.snapshotNode,t.index_)),e}function zd(t,e,n){if(e.childName==null||n.childName==null)throw st("Should only compare child_ events.");const i=new E(e.childName,e.snapshotNode),s=new E(n.childName,n.snapshotNode);return t.index_.compare(i,s)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Tn(t,e){return{eventCache:t,serverCache:e}}function bt(t,e,n,i){return Tn(new De(e,n,i),t.serverCache)}function Oo(t,e,n,i){return Tn(t.eventCache,new De(e,n,i))}function pi(t){return t.eventCache.isFullyInitialized()?t.eventCache.getNode():null}function Oe(t){return t.serverCache.isFullyInitialized()?t.serverCache.getNode():null}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let zn;const Kd=()=>(zn||(zn=new z(Ph)),zn);class D{static fromObject(e){let n=new D(null);return j(e,(i,s)=>{n=n.set(new N(i),s)}),n}constructor(e,n=Kd()){this.value=e,this.children=n}isEmpty(){return this.value===null&&this.children.isEmpty()}findRootMostMatchingPathAndValue(e,n){if(this.value!=null&&n(this.value))return{path:I(),value:this.value};if(S(e))return null;{const i=C(e),s=this.children.get(i);if(s!==null){const r=s.findRootMostMatchingPathAndValue(R(e),n);return r!=null?{path:L(new N(i),r.path),value:r.value}:null}else return null}}findRootMostValueAndPath(e){return this.findRootMostMatchingPathAndValue(e,()=>!0)}subtree(e){if(S(e))return this;{const n=C(e),i=this.children.get(n);return i!==null?i.subtree(R(e)):new D(null)}}set(e,n){if(S(e))return new D(n,this.children);{const i=C(e),r=(this.children.get(i)||new D(null)).set(R(e),n),o=this.children.insert(i,r);return new D(this.value,o)}}remove(e){if(S(e))return this.children.isEmpty()?new D(null):new D(null,this.children);{const n=C(e),i=this.children.get(n);if(i){const s=i.remove(R(e));let r;return s.isEmpty()?r=this.children.remove(n):r=this.children.insert(n,s),this.value===null&&r.isEmpty()?new D(null):new D(this.value,r)}else return this}}get(e){if(S(e))return this.value;{const n=C(e),i=this.children.get(n);return i?i.get(R(e)):null}}setTree(e,n){if(S(e))return n;{const i=C(e),r=(this.children.get(i)||new D(null)).setTree(R(e),n);let o;return r.isEmpty()?o=this.children.remove(i):o=this.children.insert(i,r),new D(this.value,o)}}fold(e){return this.fold_(I(),e)}fold_(e,n){const i={};return this.children.inorderTraversal((s,r)=>{i[s]=r.fold_(L(e,s),n)}),n(e,this.value,i)}findOnPath(e,n){return this.findOnPath_(e,I(),n)}findOnPath_(e,n,i){const s=this.value?i(n,this.value):!1;if(s)return s;if(S(e))return null;{const r=C(e),o=this.children.get(r);return o?o.findOnPath_(R(e),L(n,r),i):null}}foreachOnPath(e,n){return this.foreachOnPath_(e,I(),n)}foreachOnPath_(e,n,i){if(S(e))return this;{this.value&&i(n,this.value);const s=C(e),r=this.children.get(s);return r?r.foreachOnPath_(R(e),L(n,s),i):new D(null)}}foreach(e){this.foreach_(I(),e)}foreach_(e,n){this.children.inorderTraversal((i,s)=>{s.foreach_(L(e,i),n)}),this.value&&n(e,this.value)}foreachChild(e){this.children.inorderTraversal((n,i)=>{i.value&&e(n,i.value)})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class re{constructor(e){this.writeTree_=e}static empty(){return new re(new D(null))}}function wt(t,e,n){if(S(e))return new re(new D(n));{const i=t.writeTree_.findRootMostValueAndPath(e);if(i!=null){const s=i.path;let r=i.value;const o=V(s,e);return r=r.updateChild(o,n),new re(t.writeTree_.set(s,r))}else{const s=new D(n),r=t.writeTree_.setTree(e,s);return new re(r)}}}function rr(t,e,n){let i=t;return j(n,(s,r)=>{i=wt(i,L(e,s),r)}),i}function or(t,e){if(S(e))return re.empty();{const n=t.writeTree_.setTree(e,new D(null));return new re(n)}}function mi(t,e){return $e(t,e)!=null}function $e(t,e){const n=t.writeTree_.findRootMostValueAndPath(e);return n!=null?t.writeTree_.get(n.path).getChild(V(n.path,e)):null}function ar(t){const e=[],n=t.writeTree_.value;return n!=null?n.isLeafNode()||n.forEachChild(M,(i,s)=>{e.push(new E(i,s))}):t.writeTree_.children.inorderTraversal((i,s)=>{s.value!=null&&e.push(new E(i,s.value))}),e}function ve(t,e){if(S(e))return t;{const n=$e(t,e);return n!=null?new re(new D(n)):new re(t.writeTree_.subtree(e))}}function gi(t){return t.writeTree_.isEmpty()}function et(t,e){return Mo(I(),t.writeTree_,e)}function Mo(t,e,n){if(e.value!=null)return n.updateChild(t,e.value);{let i=null;return e.children.inorderTraversal((s,r)=>{s===".priority"?(m(r.value!==null,"Priority writes must always be leaf nodes"),i=r.value):n=Mo(L(t,s),r,n)}),!n.getChild(t).isEmpty()&&i!==null&&(n=n.updateChild(L(t,".priority"),i)),n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ui(t,e){return Bo(e,t)}function Yd(t,e,n,i,s){m(i>t.lastWriteId,"Stacking an older write on top of newer ones"),s===void 0&&(s=!0),t.allWrites.push({path:e,snap:n,writeId:i,visible:s}),s&&(t.visibleWrites=wt(t.visibleWrites,e,n)),t.lastWriteId=i}function Zd(t,e){for(let n=0;n<t.allWrites.length;n++){const i=t.allWrites[n];if(i.writeId===e)return i}return null}function Qd(t,e){const n=t.allWrites.findIndex(a=>a.writeId===e);m(n>=0,"removeWrite called with nonexistent writeId.");const i=t.allWrites[n];t.allWrites.splice(n,1);let s=i.visible,r=!1,o=t.allWrites.length-1;for(;s&&o>=0;){const a=t.allWrites[o];a.visible&&(o>=n&&Xd(a,i.path)?s=!1:X(i.path,a.path)&&(r=!0)),o--}if(s){if(r)return Jd(t),!0;if(i.snap)t.visibleWrites=or(t.visibleWrites,i.path);else{const a=i.children;j(a,l=>{t.visibleWrites=or(t.visibleWrites,L(i.path,l))})}return!0}else return!1}function Xd(t,e){if(t.snap)return X(t.path,e);for(const n in t.children)if(t.children.hasOwnProperty(n)&&X(L(t.path,n),e))return!0;return!1}function Jd(t){t.visibleWrites=Lo(t.allWrites,eu,I()),t.allWrites.length>0?t.lastWriteId=t.allWrites[t.allWrites.length-1].writeId:t.lastWriteId=-1}function eu(t){return t.visible}function Lo(t,e,n){let i=re.empty();for(let s=0;s<t.length;++s){const r=t[s];if(e(r)){const o=r.path;let a;if(r.snap)X(n,o)?(a=V(n,o),i=wt(i,a,r.snap)):X(o,n)&&(a=V(o,n),i=wt(i,I(),r.snap.getChild(a)));else if(r.children){if(X(n,o))a=V(n,o),i=rr(i,a,r.children);else if(X(o,n))if(a=V(o,n),S(a))i=rr(i,I(),r.children);else{const l=Ze(r.children,C(a));if(l){const c=l.getChild(R(a));i=wt(i,I(),c)}}}else throw st("WriteRecord should have .snap or .children")}}return i}function Fo(t,e,n,i,s){if(!i&&!s){const r=$e(t.visibleWrites,e);if(r!=null)return r;{const o=ve(t.visibleWrites,e);if(gi(o))return n;if(n==null&&!mi(o,I()))return null;{const a=n||w.EMPTY_NODE;return et(o,a)}}}else{const r=ve(t.visibleWrites,e);if(!s&&gi(r))return n;if(!s&&n==null&&!mi(r,I()))return null;{const o=function(c){return(c.visible||s)&&(!i||!~i.indexOf(c.writeId))&&(X(c.path,e)||X(e,c.path))},a=Lo(t.allWrites,o,e),l=n||w.EMPTY_NODE;return et(a,l)}}}function tu(t,e,n){let i=w.EMPTY_NODE;const s=$e(t.visibleWrites,e);if(s)return s.isLeafNode()||s.forEachChild(M,(r,o)=>{i=i.updateImmediateChild(r,o)}),i;if(n){const r=ve(t.visibleWrites,e);return n.forEachChild(M,(o,a)=>{const l=et(ve(r,new N(o)),a);i=i.updateImmediateChild(o,l)}),ar(r).forEach(o=>{i=i.updateImmediateChild(o.name,o.node)}),i}else{const r=ve(t.visibleWrites,e);return ar(r).forEach(o=>{i=i.updateImmediateChild(o.name,o.node)}),i}}function nu(t,e,n,i,s){m(i||s,"Either existingEventSnap or existingServerSnap must exist");const r=L(e,n);if(mi(t.visibleWrites,r))return null;{const o=ve(t.visibleWrites,r);return gi(o)?s.getChild(n):et(o,s.getChild(n))}}function iu(t,e,n,i){const s=L(e,n),r=$e(t.visibleWrites,s);if(r!=null)return r;if(i.isCompleteForChild(n)){const o=ve(t.visibleWrites,s);return et(o,i.getNode().getImmediateChild(n))}else return null}function su(t,e){return $e(t.visibleWrites,e)}function ru(t,e,n,i,s,r,o){let a;const l=ve(t.visibleWrites,e),c=$e(l,I());if(c!=null)a=c;else if(n!=null)a=et(l,n);else return[];if(a=a.withIndex(o),!a.isEmpty()&&!a.isLeafNode()){const d=[],h=o.getCompare(),f=r?a.getReverseIteratorFrom(i,o):a.getIteratorFrom(i,o);let g=f.getNext();for(;g&&d.length<s;)h(g,i)!==0&&d.push(g),g=f.getNext();return d}else return[]}function ou(){return{visibleWrites:re.empty(),allWrites:[],lastWriteId:-1}}function mn(t,e,n,i){return Fo(t.writeTree,t.treePath,e,n,i)}function qi(t,e){return tu(t.writeTree,t.treePath,e)}function lr(t,e,n,i){return nu(t.writeTree,t.treePath,e,n,i)}function gn(t,e){return su(t.writeTree,L(t.treePath,e))}function au(t,e,n,i,s,r){return ru(t.writeTree,t.treePath,e,n,i,s,r)}function ji(t,e,n){return iu(t.writeTree,t.treePath,e,n)}function $o(t,e){return Bo(L(t.treePath,e),t.writeTree)}function Bo(t,e){return{treePath:t,writeTree:e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class lu{constructor(){this.changeMap=new Map}trackChildChange(e){const n=e.type,i=e.childName;m(n==="child_added"||n==="child_changed"||n==="child_removed","Only child changes supported for tracking"),m(i!==".priority","Only non-priority child changes can be tracked.");const s=this.changeMap.get(i);if(s){const r=s.type;if(n==="child_added"&&r==="child_removed")this.changeMap.set(i,xt(i,e.snapshotNode,s.snapshotNode));else if(n==="child_removed"&&r==="child_added")this.changeMap.delete(i);else if(n==="child_removed"&&r==="child_changed")this.changeMap.set(i,Rt(i,s.oldSnap));else if(n==="child_changed"&&r==="child_added")this.changeMap.set(i,Je(i,e.snapshotNode));else if(n==="child_changed"&&r==="child_changed")this.changeMap.set(i,xt(i,e.snapshotNode,s.oldSnap));else throw st("Illegal combination of changes: "+e+" occurred after "+s)}else this.changeMap.set(i,e)}getChanges(){return Array.from(this.changeMap.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class cu{getCompleteChild(e){return null}getChildAfterChild(e,n,i){return null}}const Ho=new cu;class Gi{constructor(e,n,i=null){this.writes_=e,this.viewCache_=n,this.optCompleteServerCache_=i}getCompleteChild(e){const n=this.viewCache_.eventCache;if(n.isCompleteForChild(e))return n.getNode().getImmediateChild(e);{const i=this.optCompleteServerCache_!=null?new De(this.optCompleteServerCache_,!0,!1):this.viewCache_.serverCache;return ji(this.writes_,e,i)}}getChildAfterChild(e,n,i){const s=this.optCompleteServerCache_!=null?this.optCompleteServerCache_:Oe(this.viewCache_),r=au(this.writes_,s,n,1,i,e);return r.length===0?null:r[0]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function hu(t){return{filter:t}}function du(t,e){m(e.eventCache.getNode().isIndexed(t.filter.getIndex()),"Event snap not indexed"),m(e.serverCache.getNode().isIndexed(t.filter.getIndex()),"Server snap not indexed")}function uu(t,e,n,i,s){const r=new lu;let o,a;if(n.type===ie.OVERWRITE){const c=n;c.source.fromUser?o=_i(t,e,c.path,c.snap,i,s,r):(m(c.source.fromServer,"Unknown source."),a=c.source.tagged||e.serverCache.isFiltered()&&!S(c.path),o=_n(t,e,c.path,c.snap,i,s,a,r))}else if(n.type===ie.MERGE){const c=n;c.source.fromUser?o=pu(t,e,c.path,c.children,i,s,r):(m(c.source.fromServer,"Unknown source."),a=c.source.tagged||e.serverCache.isFiltered(),o=yi(t,e,c.path,c.children,i,s,a,r))}else if(n.type===ie.ACK_USER_WRITE){const c=n;c.revert?o=_u(t,e,c.path,i,s,r):o=mu(t,e,c.path,c.affectedTree,i,s,r)}else if(n.type===ie.LISTEN_COMPLETE)o=gu(t,e,n.path,i,r);else throw st("Unknown operation type: "+n.type);const l=r.getChanges();return fu(e,o,l),{viewCache:o,changes:l}}function fu(t,e,n){const i=e.eventCache;if(i.isFullyInitialized()){const s=i.getNode().isLeafNode()||i.getNode().isEmpty(),r=pi(t);(n.length>0||!t.eventCache.isFullyInitialized()||s&&!i.getNode().equals(r)||!i.getNode().getPriority().equals(r.getPriority()))&&n.push(Po(pi(e)))}}function Wo(t,e,n,i,s,r){const o=e.eventCache;if(gn(i,n)!=null)return e;{let a,l;if(S(n))if(m(e.serverCache.isFullyInitialized(),"If change path is empty, we must have complete server data"),e.serverCache.isFiltered()){const c=Oe(e),d=c instanceof w?c:w.EMPTY_NODE,h=qi(i,d);a=t.filter.updateFullNode(e.eventCache.getNode(),h,r)}else{const c=mn(i,Oe(e));a=t.filter.updateFullNode(e.eventCache.getNode(),c,r)}else{const c=C(n);if(c===".priority"){m(be(n)===1,"Can't have a priority with additional path components");const d=o.getNode();l=e.serverCache.getNode();const h=lr(i,n,d,l);h!=null?a=t.filter.updatePriority(d,h):a=o.getNode()}else{const d=R(n);let h;if(o.isCompleteForChild(c)){l=e.serverCache.getNode();const f=lr(i,n,o.getNode(),l);f!=null?h=o.getNode().getImmediateChild(c).updateChild(d,f):h=o.getNode().getImmediateChild(c)}else h=ji(i,c,e.serverCache);h!=null?a=t.filter.updateChild(o.getNode(),c,h,d,s,r):a=o.getNode()}}return bt(e,a,o.isFullyInitialized()||S(n),t.filter.filtersNodes())}}function _n(t,e,n,i,s,r,o,a){const l=e.serverCache;let c;const d=o?t.filter:t.filter.getIndexedFilter();if(S(n))c=d.updateFullNode(l.getNode(),i,null);else if(d.filtersNodes()&&!l.isFiltered()){const g=l.getNode().updateChild(n,i);c=d.updateFullNode(l.getNode(),g,null)}else{const g=C(n);if(!l.isCompleteForPath(n)&&be(n)>1)return e;const _=R(n),O=l.getNode().getImmediateChild(g).updateChild(_,i);g===".priority"?c=d.updatePriority(l.getNode(),O):c=d.updateChild(l.getNode(),g,O,_,Ho,null)}const h=Oo(e,c,l.isFullyInitialized()||S(n),d.filtersNodes()),f=new Gi(s,h,r);return Wo(t,h,n,s,f,a)}function _i(t,e,n,i,s,r,o){const a=e.eventCache;let l,c;const d=new Gi(s,e,r);if(S(n))c=t.filter.updateFullNode(e.eventCache.getNode(),i,o),l=bt(e,c,!0,t.filter.filtersNodes());else{const h=C(n);if(h===".priority")c=t.filter.updatePriority(e.eventCache.getNode(),i),l=bt(e,c,a.isFullyInitialized(),a.isFiltered());else{const f=R(n),g=a.getNode().getImmediateChild(h);let _;if(S(f))_=i;else{const k=d.getCompleteChild(h);k!=null?Oi(f)===".priority"&&k.getChild(ko(f)).isEmpty()?_=k:_=k.updateChild(f,i):_=w.EMPTY_NODE}if(g.equals(_))l=e;else{const k=t.filter.updateChild(a.getNode(),h,_,f,d,o);l=bt(e,k,a.isFullyInitialized(),t.filter.filtersNodes())}}}return l}function cr(t,e){return t.eventCache.isCompleteForChild(e)}function pu(t,e,n,i,s,r,o){let a=e;return i.foreach((l,c)=>{const d=L(n,l);cr(e,C(d))&&(a=_i(t,a,d,c,s,r,o))}),i.foreach((l,c)=>{const d=L(n,l);cr(e,C(d))||(a=_i(t,a,d,c,s,r,o))}),a}function hr(t,e,n){return n.foreach((i,s)=>{e=e.updateChild(i,s)}),e}function yi(t,e,n,i,s,r,o,a){if(e.serverCache.getNode().isEmpty()&&!e.serverCache.isFullyInitialized())return e;let l=e,c;S(n)?c=i:c=new D(null).setTree(n,i);const d=e.serverCache.getNode();return c.children.inorderTraversal((h,f)=>{if(d.hasChild(h)){const g=e.serverCache.getNode().getImmediateChild(h),_=hr(t,g,f);l=_n(t,l,new N(h),_,s,r,o,a)}}),c.children.inorderTraversal((h,f)=>{const g=!e.serverCache.isCompleteForChild(h)&&f.value===null;if(!d.hasChild(h)&&!g){const _=e.serverCache.getNode().getImmediateChild(h),k=hr(t,_,f);l=_n(t,l,new N(h),k,s,r,o,a)}}),l}function mu(t,e,n,i,s,r,o){if(gn(s,n)!=null)return e;const a=e.serverCache.isFiltered(),l=e.serverCache;if(i.value!=null){if(S(n)&&l.isFullyInitialized()||l.isCompleteForPath(n))return _n(t,e,n,l.getNode().getChild(n),s,r,a,o);if(S(n)){let c=new D(null);return l.getNode().forEachChild(Ve,(d,h)=>{c=c.set(new N(d),h)}),yi(t,e,n,c,s,r,a,o)}else return e}else{let c=new D(null);return i.foreach((d,h)=>{const f=L(n,d);l.isCompleteForPath(f)&&(c=c.set(d,l.getNode().getChild(f)))}),yi(t,e,n,c,s,r,a,o)}}function gu(t,e,n,i,s){const r=e.serverCache,o=Oo(e,r.getNode(),r.isFullyInitialized()||S(n),r.isFiltered());return Wo(t,o,n,i,Ho,s)}function _u(t,e,n,i,s,r){let o;if(gn(i,n)!=null)return e;{const a=new Gi(i,e,s),l=e.eventCache.getNode();let c;if(S(n)||C(n)===".priority"){let d;if(e.serverCache.isFullyInitialized())d=mn(i,Oe(e));else{const h=e.serverCache.getNode();m(h instanceof w,"serverChildren would be complete if leaf node"),d=qi(i,h)}d=d,c=t.filter.updateFullNode(l,d,r)}else{const d=C(n);let h=ji(i,d,e.serverCache);h==null&&e.serverCache.isCompleteForChild(d)&&(h=l.getImmediateChild(d)),h!=null?c=t.filter.updateChild(l,d,h,R(n),a,r):e.eventCache.getNode().hasChild(d)?c=t.filter.updateChild(l,d,w.EMPTY_NODE,R(n),a,r):c=l,c.isEmpty()&&e.serverCache.isFullyInitialized()&&(o=mn(i,Oe(e)),o.isLeafNode()&&(c=t.filter.updateFullNode(c,o,r)))}return o=e.serverCache.isFullyInitialized()||gn(i,I())!=null,bt(e,c,o,t.filter.filtersNodes())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yu{constructor(e,n){this.query_=e,this.eventRegistrations_=[];const i=this.query_._queryParams,s=new $i(i.getIndex()),r=Fd(i);this.processor_=hu(r);const o=n.serverCache,a=n.eventCache,l=s.updateFullNode(w.EMPTY_NODE,o.getNode(),null),c=r.updateFullNode(w.EMPTY_NODE,a.getNode(),null),d=new De(l,o.isFullyInitialized(),s.filtersNodes()),h=new De(c,a.isFullyInitialized(),r.filtersNodes());this.viewCache_=Tn(h,d),this.eventGenerator_=new jd(this.query_)}get query(){return this.query_}}function vu(t){return t.viewCache_.serverCache.getNode()}function bu(t,e){const n=Oe(t.viewCache_);return n&&(t.query._queryParams.loadsAllData()||!S(e)&&!n.getImmediateChild(C(e)).isEmpty())?n.getChild(e):null}function dr(t){return t.eventRegistrations_.length===0}function wu(t,e){t.eventRegistrations_.push(e)}function ur(t,e,n){const i=[];if(n){m(e==null,"A cancel should cancel all event registrations.");const s=t.query._path;t.eventRegistrations_.forEach(r=>{const o=r.createCancelEvent(n,s);o&&i.push(o)})}if(e){let s=[];for(let r=0;r<t.eventRegistrations_.length;++r){const o=t.eventRegistrations_[r];if(!o.matches(e))s.push(o);else if(e.hasAnyCallback()){s=s.concat(t.eventRegistrations_.slice(r+1));break}}t.eventRegistrations_=s}else t.eventRegistrations_=[];return i}function fr(t,e,n,i){e.type===ie.MERGE&&e.source.queryId!==null&&(m(Oe(t.viewCache_),"We should always have a full cache before handling merges"),m(pi(t.viewCache_),"Missing event cache, even though we have a server cache"));const s=t.viewCache_,r=uu(t.processor_,s,e,n,i);return du(t.processor_,r.viewCache),m(r.viewCache.serverCache.isFullyInitialized()||!s.serverCache.isFullyInitialized(),"Once a server snap is complete, it should never go back"),t.viewCache_=r.viewCache,Uo(t,r.changes,r.viewCache.eventCache.getNode(),null)}function Cu(t,e){const n=t.viewCache_.eventCache,i=[];return n.getNode().isLeafNode()||n.getNode().forEachChild(M,(r,o)=>{i.push(Je(r,o))}),n.isFullyInitialized()&&i.push(Po(n.getNode())),Uo(t,i,n.getNode(),e)}function Uo(t,e,n,i){const s=i?[i]:t.eventRegistrations_;return Gd(t.eventGenerator_,e,n,s)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let yn;class Su{constructor(){this.views=new Map}}function Eu(t){m(!yn,"__referenceConstructor has already been defined"),yn=t}function ku(){return m(yn,"Reference.ts has not been loaded"),yn}function Tu(t){return t.views.size===0}function Vi(t,e,n,i){const s=e.source.queryId;if(s!==null){const r=t.views.get(s);return m(r!=null,"SyncTree gave us an op for an invalid query."),fr(r,e,n,i)}else{let r=[];for(const o of t.views.values())r=r.concat(fr(o,e,n,i));return r}}function Iu(t,e,n,i,s){const r=e._queryIdentifier,o=t.views.get(r);if(!o){let a=mn(n,s?i:null),l=!1;a?l=!0:i instanceof w?(a=qi(n,i),l=!1):(a=w.EMPTY_NODE,l=!1);const c=Tn(new De(a,l,!1),new De(i,s,!1));return new yu(e,c)}return o}function Au(t,e,n,i,s,r){const o=Iu(t,e,i,s,r);return t.views.has(e._queryIdentifier)||t.views.set(e._queryIdentifier,o),wu(o,n),Cu(o,n)}function Nu(t,e,n,i){const s=e._queryIdentifier,r=[];let o=[];const a=we(t);if(s==="default")for(const[l,c]of t.views.entries())o=o.concat(ur(c,n,i)),dr(c)&&(t.views.delete(l),c.query._queryParams.loadsAllData()||r.push(c.query));else{const l=t.views.get(s);l&&(o=o.concat(ur(l,n,i)),dr(l)&&(t.views.delete(s),l.query._queryParams.loadsAllData()||r.push(l.query)))}return a&&!we(t)&&r.push(new(ku())(e._repo,e._path)),{removed:r,events:o}}function qo(t){const e=[];for(const n of t.views.values())n.query._queryParams.loadsAllData()||e.push(n);return e}function ze(t,e){let n=null;for(const i of t.views.values())n=n||bu(i,e);return n}function jo(t,e){if(e._queryParams.loadsAllData())return In(t);{const i=e._queryIdentifier;return t.views.get(i)}}function Go(t,e){return jo(t,e)!=null}function we(t){return In(t)!=null}function In(t){for(const e of t.views.values())if(e.query._queryParams.loadsAllData())return e;return null}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let vn;function Ru(t){m(!vn,"__referenceConstructor has already been defined"),vn=t}function xu(){return m(vn,"Reference.ts has not been loaded"),vn}let Pu=1;class pr{constructor(e){this.listenProvider_=e,this.syncPointTree_=new D(null),this.pendingWriteTree_=ou(),this.tagToQueryMap=new Map,this.queryToTagMap=new Map}}function Vo(t,e,n,i,s){return Yd(t.pendingWriteTree_,e,n,i,s),s?jt(t,new Pe(Do(),e,n)):[]}function Ne(t,e,n=!1){const i=Zd(t.pendingWriteTree_,e);if(Qd(t.pendingWriteTree_,e)){let r=new D(null);return i.snap!=null?r=r.set(I(),!0):j(i.children,o=>{r=r.set(new N(o),!0)}),jt(t,new pn(i.path,r,n))}else return[]}function An(t,e,n){return jt(t,new Pe(Hi(),e,n))}function Du(t,e,n){const i=D.fromObject(n);return jt(t,new Ot(Hi(),e,i))}function Ou(t,e){return jt(t,new Dt(Hi(),e))}function Mu(t,e,n){const i=Ki(t,n);if(i){const s=Yi(i),r=s.path,o=s.queryId,a=V(r,e),l=new Dt(Wi(o),a);return Zi(t,r,l)}else return[]}function vi(t,e,n,i,s=!1){const r=e._path,o=t.syncPointTree_.get(r);let a=[];if(o&&(e._queryIdentifier==="default"||Go(o,e))){const l=Nu(o,e,n,i);Tu(o)&&(t.syncPointTree_=t.syncPointTree_.remove(r));const c=l.removed;if(a=l.events,!s){const d=c.findIndex(f=>f._queryParams.loadsAllData())!==-1,h=t.syncPointTree_.findOnPath(r,(f,g)=>we(g));if(d&&!h){const f=t.syncPointTree_.subtree(r);if(!f.isEmpty()){const g=$u(f);for(let _=0;_<g.length;++_){const k=g[_],O=k.query,B=Yo(t,k);t.listenProvider_.startListening(Ct(O),bn(t,O),B.hashFn,B.onComplete)}}}!h&&c.length>0&&!i&&(d?t.listenProvider_.stopListening(Ct(e),null):c.forEach(f=>{const g=t.queryToTagMap.get(Nn(f));t.listenProvider_.stopListening(Ct(f),g)}))}Bu(t,c)}return a}function Lu(t,e,n,i){const s=Ki(t,i);if(s!=null){const r=Yi(s),o=r.path,a=r.queryId,l=V(o,e),c=new Pe(Wi(a),l,n);return Zi(t,o,c)}else return[]}function Fu(t,e,n,i){const s=Ki(t,i);if(s){const r=Yi(s),o=r.path,a=r.queryId,l=V(o,e),c=D.fromObject(n),d=new Ot(Wi(a),l,c);return Zi(t,o,d)}else return[]}function mr(t,e,n,i=!1){const s=e._path;let r=null,o=!1;t.syncPointTree_.foreachOnPath(s,(f,g)=>{const _=V(f,s);r=r||ze(g,_),o=o||we(g)});let a=t.syncPointTree_.get(s);a?(o=o||we(a),r=r||ze(a,I())):(a=new Su,t.syncPointTree_=t.syncPointTree_.set(s,a));let l;r!=null?l=!0:(l=!1,r=w.EMPTY_NODE,t.syncPointTree_.subtree(s).foreachChild((g,_)=>{const k=ze(_,I());k&&(r=r.updateImmediateChild(g,k))}));const c=Go(a,e);if(!c&&!e._queryParams.loadsAllData()){const f=Nn(e);m(!t.queryToTagMap.has(f),"View does not exist, but we have a tag");const g=Hu();t.queryToTagMap.set(f,g),t.tagToQueryMap.set(g,f)}const d=Ui(t.pendingWriteTree_,s);let h=Au(a,e,n,d,r,l);if(!c&&!o&&!i){const f=jo(a,e);h=h.concat(Wu(t,e,f))}return h}function zi(t,e,n){const s=t.pendingWriteTree_,r=t.syncPointTree_.findOnPath(e,(o,a)=>{const l=V(o,e),c=ze(a,l);if(c)return c});return Fo(s,e,r,n,!0)}function jt(t,e){return zo(e,t.syncPointTree_,null,Ui(t.pendingWriteTree_,I()))}function zo(t,e,n,i){if(S(t.path))return Ko(t,e,n,i);{const s=e.get(I());n==null&&s!=null&&(n=ze(s,I()));let r=[];const o=C(t.path),a=t.operationForChild(o),l=e.children.get(o);if(l&&a){const c=n?n.getImmediateChild(o):null,d=$o(i,o);r=r.concat(zo(a,l,c,d))}return s&&(r=r.concat(Vi(s,t,i,n))),r}}function Ko(t,e,n,i){const s=e.get(I());n==null&&s!=null&&(n=ze(s,I()));let r=[];return e.children.inorderTraversal((o,a)=>{const l=n?n.getImmediateChild(o):null,c=$o(i,o),d=t.operationForChild(o);d&&(r=r.concat(Ko(d,a,l,c)))}),s&&(r=r.concat(Vi(s,t,i,n))),r}function Yo(t,e){const n=e.query,i=bn(t,n);return{hashFn:()=>(vu(e)||w.EMPTY_NODE).hash(),onComplete:s=>{if(s==="ok")return i?Mu(t,n._path,i):Ou(t,n._path);{const r=Mh(s,n);return vi(t,n,null,r)}}}}function bn(t,e){const n=Nn(e);return t.queryToTagMap.get(n)}function Nn(t){return t._path.toString()+"$"+t._queryIdentifier}function Ki(t,e){return t.tagToQueryMap.get(e)}function Yi(t){const e=t.indexOf("$");return m(e!==-1&&e<t.length-1,"Bad queryKey."),{queryId:t.substr(e+1),path:new N(t.substr(0,e))}}function Zi(t,e,n){const i=t.syncPointTree_.get(e);m(i,"Missing sync point for query tag that we're tracking");const s=Ui(t.pendingWriteTree_,e);return Vi(i,n,s,null)}function $u(t){return t.fold((e,n,i)=>{if(n&&we(n))return[In(n)];{let s=[];return n&&(s=qo(n)),j(i,(r,o)=>{s=s.concat(o)}),s}})}function Ct(t){return t._queryParams.loadsAllData()&&!t._queryParams.isDefault()?new(xu())(t._repo,t._path):t}function Bu(t,e){for(let n=0;n<e.length;++n){const i=e[n];if(!i._queryParams.loadsAllData()){const s=Nn(i),r=t.queryToTagMap.get(s);t.queryToTagMap.delete(s),t.tagToQueryMap.delete(r)}}}function Hu(){return Pu++}function Wu(t,e,n){const i=e._path,s=bn(t,e),r=Yo(t,n),o=t.listenProvider_.startListening(Ct(e),s,r.hashFn,r.onComplete),a=t.syncPointTree_.subtree(i);if(s)m(!we(a.value),"If we're adding a query, it shouldn't be shadowed");else{const l=a.fold((c,d,h)=>{if(!S(c)&&d&&we(d))return[In(d).query];{let f=[];return d&&(f=f.concat(qo(d).map(g=>g.query))),j(h,(g,_)=>{f=f.concat(_)}),f}});for(let c=0;c<l.length;++c){const d=l[c];t.listenProvider_.stopListening(Ct(d),bn(t,d))}}return o}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qi{constructor(e){this.node_=e}getImmediateChild(e){const n=this.node_.getImmediateChild(e);return new Qi(n)}node(){return this.node_}}class Xi{constructor(e,n){this.syncTree_=e,this.path_=n}getImmediateChild(e){const n=L(this.path_,e);return new Xi(this.syncTree_,n)}node(){return zi(this.syncTree_,this.path_)}}const Uu=function(t){return t=t||{},t.timestamp=t.timestamp||new Date().getTime(),t},gr=function(t,e,n){if(!t||typeof t!="object")return t;if(m(".sv"in t,"Unexpected leaf node or priority contents"),typeof t[".sv"]=="string")return qu(t[".sv"],e,n);if(typeof t[".sv"]=="object")return ju(t[".sv"],e);m(!1,"Unexpected server value: "+JSON.stringify(t,null,2))},qu=function(t,e,n){switch(t){case"timestamp":return n.timestamp;default:m(!1,"Unexpected server value: "+t)}},ju=function(t,e,n){t.hasOwnProperty("increment")||m(!1,"Unexpected server value: "+JSON.stringify(t,null,2));const i=t.increment;typeof i!="number"&&m(!1,"Unexpected increment value: "+i);const s=e.node();if(m(s!==null&&typeof s<"u","Expected ChildrenNode.EMPTY_NODE for nulls"),!s.isLeafNode())return i;const o=s.getValue();return typeof o!="number"?i:o+i},Gu=function(t,e,n,i){return Ji(e,new Xi(n,t),i)},Zo=function(t,e,n){return Ji(t,new Qi(e),n)};function Ji(t,e,n){const i=t.getPriority().val(),s=gr(i,e.getImmediateChild(".priority"),n);let r;if(t.isLeafNode()){const o=t,a=gr(o.getValue(),e,n);return a!==o.getValue()||s!==o.getPriority().val()?new H(a,$(s)):t}else{const o=t;return r=o,s!==o.getPriority().val()&&(r=r.updatePriority(new H(s))),o.forEachChild(M,(a,l)=>{const c=Ji(l,e.getImmediateChild(a),n);c!==l&&(r=r.updateImmediateChild(a,c))}),r}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class es{constructor(e="",n=null,i={children:{},childCount:0}){this.name=e,this.parent=n,this.node=i}}function ts(t,e){let n=e instanceof N?e:new N(e),i=t,s=C(n);for(;s!==null;){const r=Ze(i.node.children,s)||{children:{},childCount:0};i=new es(s,i,r),n=R(n),s=C(n)}return i}function lt(t){return t.node.value}function Qo(t,e){t.node.value=e,bi(t)}function Xo(t){return t.node.childCount>0}function Vu(t){return lt(t)===void 0&&!Xo(t)}function Rn(t,e){j(t.node.children,(n,i)=>{e(new es(n,t,i))})}function Jo(t,e,n,i){n&&e(t),Rn(t,s=>{Jo(s,e,!0)})}function zu(t,e,n){let i=t.parent;for(;i!==null;){if(e(i))return!0;i=i.parent}return!1}function Gt(t){return new N(t.parent===null?t.name:Gt(t.parent)+"/"+t.name)}function bi(t){t.parent!==null&&Ku(t.parent,t.name,t)}function Ku(t,e,n){const i=Vu(n),s=oe(t.node.children,e);i&&s?(delete t.node.children[e],t.node.childCount--,bi(t)):!i&&!s&&(t.node.children[e]=n.node,t.node.childCount++,bi(t))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Yu=/[\[\].#$\/\u0000-\u001F\u007F]/,Zu=/[\[\].#$\u0000-\u001F\u007F]/,Kn=10*1024*1024,ns=function(t){return typeof t=="string"&&t.length!==0&&!Yu.test(t)},ea=function(t){return typeof t=="string"&&t.length!==0&&!Zu.test(t)},Qu=function(t){return t&&(t=t.replace(/^\/*\.info(\/|$)/,"/")),ea(t)},ta=function(t){return t===null||typeof t=="string"||typeof t=="number"&&!En(t)||t&&typeof t=="object"&&oe(t,".sv")},wi=function(t,e,n,i){xn(Qe(t,"value"),e,n)},xn=function(t,e,n){const i=n instanceof N?new md(n,t):n;if(e===void 0)throw new Error(t+"contains undefined "+Te(i));if(typeof e=="function")throw new Error(t+"contains a function "+Te(i)+" with contents = "+e.toString());if(En(e))throw new Error(t+"contains "+e.toString()+" "+Te(i));if(typeof e=="string"&&e.length>Kn/3&&Sn(e)>Kn)throw new Error(t+"contains a string greater than "+Kn+" utf8 bytes "+Te(i)+" ('"+e.substring(0,50)+"...')");if(e&&typeof e=="object"){let s=!1,r=!1;if(j(e,(o,a)=>{if(o===".value")s=!0;else if(o!==".priority"&&o!==".sv"&&(r=!0,!ns(o)))throw new Error(t+" contains an invalid key ("+o+") "+Te(i)+`.  Keys must be non-empty strings and can't contain ".", "#", "$", "/", "[", or "]"`);gd(i,o),xn(t,a,i),_d(i)}),s&&r)throw new Error(t+' contains ".value" child '+Te(i)+" in addition to actual children.")}},Xu=function(t,e){let n,i;for(n=0;n<e.length;n++){i=e[n];const r=Nt(i);for(let o=0;o<r.length;o++)if(!(r[o]===".priority"&&o===r.length-1)){if(!ns(r[o]))throw new Error(t+"contains an invalid key ("+r[o]+") in path "+i.toString()+`. Keys must be non-empty strings and can't contain ".", "#", "$", "/", "[", or "]"`)}}e.sort(pd);let s=null;for(n=0;n<e.length;n++){if(i=e[n],s!==null&&X(s,i))throw new Error(t+"contains a path "+s.toString()+" that is ancestor of another path "+i.toString());s=i}},Ju=function(t,e,n,i){const s=Qe(t,"values");if(!(e&&typeof e=="object")||Array.isArray(e))throw new Error(s+" must be an object containing the children to replace.");const r=[];j(e,(o,a)=>{const l=new N(o);if(xn(s,a,L(n,l)),Oi(l)===".priority"&&!ta(a))throw new Error(s+"contains an invalid value for '"+l.toString()+"', which must be a valid Firebase priority (a string, finite number, server value, or null).");r.push(l)}),Xu(s,r)},ef=function(t,e,n){if(En(e))throw new Error(Qe(t,"priority")+"is "+e.toString()+", but must be a valid Firebase priority (a string, finite number, server value, or null).");if(!ta(e))throw new Error(Qe(t,"priority")+"must be a valid Firebase priority (a string, finite number, server value, or null).")},na=function(t,e,n,i){if(!ea(n))throw new Error(Qe(t,e)+'was an invalid path = "'+n+`". Paths must be non-empty strings and can't contain ".", "#", "$", "[", or "]"`)},tf=function(t,e,n,i){n&&(n=n.replace(/^\/*\.info(\/|$)/,"/")),na(t,e,n)},gt=function(t,e){if(C(e)===".info")throw new Error(t+" failed = Can't modify data under /.info/")},nf=function(t,e){const n=e.path.toString();if(typeof e.repoInfo.host!="string"||e.repoInfo.host.length===0||!ns(e.repoInfo.namespace)&&e.repoInfo.host.split(":")[0]!=="localhost"||n.length!==0&&!Qu(n))throw new Error(Qe(t,"url")+`must be a valid firebase URL and the path can't contain ".", "#", "$", "[", or "]".`)};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sf{constructor(){this.eventLists_=[],this.recursionDepth_=0}}function is(t,e){let n=null;for(let i=0;i<e.length;i++){const s=e[i],r=s.getPath();n!==null&&!Mi(r,n.path)&&(t.eventLists_.push(n),n=null),n===null&&(n={events:[],path:r}),n.events.push(s)}n&&t.eventLists_.push(n)}function ia(t,e,n){is(t,n),sa(t,i=>Mi(i,e))}function pe(t,e,n){is(t,n),sa(t,i=>X(i,e)||X(e,i))}function sa(t,e){t.recursionDepth_++;let n=!0;for(let i=0;i<t.eventLists_.length;i++){const s=t.eventLists_[i];if(s){const r=s.path;e(r)?(rf(t.eventLists_[i]),t.eventLists_[i]=null):n=!1}}n&&(t.eventLists_=[]),t.recursionDepth_--}function rf(t){for(let e=0;e<t.events.length;e++){const n=t.events[e];if(n!==null){t.events[e]=null;const i=n.getEventRunner();yt&&q("event: "+n.toString()),ot(i)}}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const of="repo_interrupt",af=25;class lf{constructor(e,n,i,s){this.repoInfo_=e,this.forceRestClient_=n,this.authTokenProvider_=i,this.appCheckProvider_=s,this.dataUpdateCount=0,this.statsListener_=null,this.eventQueue_=new sf,this.nextWriteId_=1,this.interceptServerDataCallback_=null,this.onDisconnect_=fn(),this.transactionQueueTree_=new es,this.persistentConnection_=null,this.key=this.repoInfo_.toURLString()}toString(){return(this.repoInfo_.secure?"https://":"http://")+this.repoInfo_.host}}function cf(t,e,n){if(t.stats_=Pi(t.repoInfo_),t.forceRestClient_||Bh())t.server_=new un(t.repoInfo_,(i,s,r,o)=>{_r(t,i,s,r,o)},t.authTokenProvider_,t.appCheckProvider_),setTimeout(()=>yr(t,!0),0);else{if(typeof n<"u"&&n!==null){if(typeof n!="object")throw new Error("Only objects are supported for option databaseAuthVariableOverride");try{U(n)}catch(i){throw new Error("Invalid authOverride provided: "+i)}}t.persistentConnection_=new de(t.repoInfo_,e,(i,s,r,o)=>{_r(t,i,s,r,o)},i=>{yr(t,i)},i=>{df(t,i)},t.authTokenProvider_,t.appCheckProvider_,n),t.server_=t.persistentConnection_}t.authTokenProvider_.addTokenChangeListener(i=>{t.server_.refreshAuthToken(i)}),t.appCheckProvider_.addTokenChangeListener(i=>{t.server_.refreshAppCheckToken(i.token)}),t.statsReporter_=jh(t.repoInfo_,()=>new qd(t.stats_,t.server_)),t.infoData_=new $d,t.infoSyncTree_=new pr({startListening:(i,s,r,o)=>{let a=[];const l=t.infoData_.getNode(i._path);return l.isEmpty()||(a=An(t.infoSyncTree_,i._path,l),setTimeout(()=>{o("ok")},0)),a},stopListening:()=>{}}),rs(t,"connected",!1),t.serverSyncTree_=new pr({startListening:(i,s,r,o)=>(t.server_.listen(i,r,s,(a,l)=>{const c=o(a,l);pe(t.eventQueue_,i._path,c)}),[]),stopListening:(i,s)=>{t.server_.unlisten(i,s)}})}function hf(t){const n=t.infoData_.getNode(new N(".info/serverTimeOffset")).val()||0;return new Date().getTime()+n}function ss(t){return Uu({timestamp:hf(t)})}function _r(t,e,n,i,s){t.dataUpdateCount++;const r=new N(e);n=t.interceptServerDataCallback_?t.interceptServerDataCallback_(e,n):n;let o=[];if(s)if(i){const l=rn(n,c=>$(c));o=Fu(t.serverSyncTree_,r,l,s)}else{const l=$(n);o=Lu(t.serverSyncTree_,r,l,s)}else if(i){const l=rn(n,c=>$(c));o=Du(t.serverSyncTree_,r,l)}else{const l=$(n);o=An(t.serverSyncTree_,r,l)}let a=r;o.length>0&&(a=Pn(t,r)),pe(t.eventQueue_,a,o)}function yr(t,e){rs(t,"connected",e),e===!1&&ff(t)}function df(t,e){j(e,(n,i)=>{rs(t,n,i)})}function rs(t,e,n){const i=new N("/.info/"+e),s=$(n);t.infoData_.updateSnapshot(i,s);const r=An(t.infoSyncTree_,i,s);pe(t.eventQueue_,i,r)}function ra(t){return t.nextWriteId_++}function uf(t,e,n,i,s){os(t,"set",{path:e.toString(),value:n,priority:i});const r=ss(t),o=$(n,i),a=zi(t.serverSyncTree_,e),l=Zo(o,a,r),c=ra(t),d=Vo(t.serverSyncTree_,e,l,c,!0);is(t.eventQueue_,d),t.server_.put(e.toString(),o.val(!0),(f,g)=>{const _=f==="ok";_||K("set at "+e+" failed: "+f);const k=Ne(t.serverSyncTree_,c,!_);pe(t.eventQueue_,e,k),tt(t,s,f,g)});const h=ha(t,e);Pn(t,h),pe(t.eventQueue_,h,[])}function ff(t){os(t,"onDisconnectEvents");const e=ss(t),n=fn();fi(t.onDisconnect_,I(),(s,r)=>{const o=Gu(s,r,t.serverSyncTree_,e);at(n,s,o)});let i=[];fi(n,I(),(s,r)=>{i=i.concat(An(t.serverSyncTree_,s,r));const o=ha(t,s);Pn(t,o)}),t.onDisconnect_=fn(),pe(t.eventQueue_,I(),i)}function pf(t,e,n){t.server_.onDisconnectCancel(e.toString(),(i,s)=>{i==="ok"&&ui(t.onDisconnect_,e),tt(t,n,i,s)})}function vr(t,e,n,i){const s=$(n);t.server_.onDisconnectPut(e.toString(),s.val(!0),(r,o)=>{r==="ok"&&at(t.onDisconnect_,e,s),tt(t,i,r,o)})}function mf(t,e,n,i,s){const r=$(n,i);t.server_.onDisconnectPut(e.toString(),r.val(!0),(o,a)=>{o==="ok"&&at(t.onDisconnect_,e,r),tt(t,s,o,a)})}function gf(t,e,n,i){if(ii(n)){q("onDisconnect().update() called with empty data.  Don't do anything."),tt(t,i,"ok",void 0);return}t.server_.onDisconnectMerge(e.toString(),n,(s,r)=>{s==="ok"&&j(n,(o,a)=>{const l=$(a);at(t.onDisconnect_,L(e,o),l)}),tt(t,i,s,r)})}function _f(t,e,n){let i;C(e._path)===".info"?i=mr(t.infoSyncTree_,e,n):i=mr(t.serverSyncTree_,e,n),ia(t.eventQueue_,e._path,i)}function br(t,e,n){let i;C(e._path)===".info"?i=vi(t.infoSyncTree_,e,n):i=vi(t.serverSyncTree_,e,n),ia(t.eventQueue_,e._path,i)}function yf(t){t.persistentConnection_&&t.persistentConnection_.interrupt(of)}function os(t,...e){let n="";t.persistentConnection_&&(n=t.persistentConnection_.id+":"),q(n,...e)}function tt(t,e,n,i){e&&ot(()=>{if(n==="ok")e(null);else{const s=(n||"error").toUpperCase();let r=s;i&&(r+=": "+i);const o=new Error(r);o.code=s,e(o)}})}function oa(t,e,n){return zi(t.serverSyncTree_,e,n)||w.EMPTY_NODE}function as(t,e=t.transactionQueueTree_){if(e||Dn(t,e),lt(e)){const n=la(t,e);m(n.length>0,"Sending zero length transaction queue"),n.every(s=>s.status===0)&&vf(t,Gt(e),n)}else Xo(e)&&Rn(e,n=>{as(t,n)})}function vf(t,e,n){const i=n.map(c=>c.currentWriteId),s=oa(t,e,i);let r=s;const o=s.hash();for(let c=0;c<n.length;c++){const d=n[c];m(d.status===0,"tryToSendTransactionQueue_: items in queue should all be run."),d.status=1,d.retryCount++;const h=V(e,d.path);r=r.updateChild(h,d.currentOutputSnapshotRaw)}const a=r.val(!0),l=e;t.server_.put(l.toString(),a,c=>{os(t,"transaction put response",{path:l.toString(),status:c});let d=[];if(c==="ok"){const h=[];for(let f=0;f<n.length;f++)n[f].status=2,d=d.concat(Ne(t.serverSyncTree_,n[f].currentWriteId)),n[f].onComplete&&h.push(()=>n[f].onComplete(null,!0,n[f].currentOutputSnapshotResolved)),n[f].unwatcher();Dn(t,ts(t.transactionQueueTree_,e)),as(t,t.transactionQueueTree_),pe(t.eventQueue_,e,d);for(let f=0;f<h.length;f++)ot(h[f])}else{if(c==="datastale")for(let h=0;h<n.length;h++)n[h].status===3?n[h].status=4:n[h].status=0;else{K("transaction at "+l.toString()+" failed: "+c);for(let h=0;h<n.length;h++)n[h].status=4,n[h].abortReason=c}Pn(t,e)}},o)}function Pn(t,e){const n=aa(t,e),i=Gt(n),s=la(t,n);return bf(t,s,i),i}function bf(t,e,n){if(e.length===0)return;const i=[];let s=[];const o=e.filter(a=>a.status===0).map(a=>a.currentWriteId);for(let a=0;a<e.length;a++){const l=e[a],c=V(n,l.path);let d=!1,h;if(m(c!==null,"rerunTransactionsUnderNode_: relativePath should not be null."),l.status===4)d=!0,h=l.abortReason,s=s.concat(Ne(t.serverSyncTree_,l.currentWriteId,!0));else if(l.status===0)if(l.retryCount>=af)d=!0,h="maxretry",s=s.concat(Ne(t.serverSyncTree_,l.currentWriteId,!0));else{const f=oa(t,l.path,o);l.currentInputSnapshot=f;const g=e[a].update(f.val());if(g!==void 0){xn("transaction failed: Data returned ",g,l.path);let _=$(g);typeof g=="object"&&g!=null&&oe(g,".priority")||(_=_.updatePriority(f.getPriority()));const O=l.currentWriteId,B=ss(t),Y=Zo(_,f,B);l.currentOutputSnapshotRaw=_,l.currentOutputSnapshotResolved=Y,l.currentWriteId=ra(t),o.splice(o.indexOf(O),1),s=s.concat(Vo(t.serverSyncTree_,l.path,Y,l.currentWriteId,l.applyLocally)),s=s.concat(Ne(t.serverSyncTree_,O,!0))}else d=!0,h="nodata",s=s.concat(Ne(t.serverSyncTree_,l.currentWriteId,!0))}pe(t.eventQueue_,n,s),s=[],d&&(e[a].status=2,function(f){setTimeout(f,Math.floor(0))}(e[a].unwatcher),e[a].onComplete&&(h==="nodata"?i.push(()=>e[a].onComplete(null,!1,e[a].currentInputSnapshot)):i.push(()=>e[a].onComplete(new Error(h),!1,null))))}Dn(t,t.transactionQueueTree_);for(let a=0;a<i.length;a++)ot(i[a]);as(t,t.transactionQueueTree_)}function aa(t,e){let n,i=t.transactionQueueTree_;for(n=C(e);n!==null&&lt(i)===void 0;)i=ts(i,n),e=R(e),n=C(e);return i}function la(t,e){const n=[];return ca(t,e,n),n.sort((i,s)=>i.order-s.order),n}function ca(t,e,n){const i=lt(e);if(i)for(let s=0;s<i.length;s++)n.push(i[s]);Rn(e,s=>{ca(t,s,n)})}function Dn(t,e){const n=lt(e);if(n){let i=0;for(let s=0;s<n.length;s++)n[s].status!==2&&(n[i]=n[s],i++);n.length=i,Qo(e,n.length>0?n:void 0)}Rn(e,i=>{Dn(t,i)})}function ha(t,e){const n=Gt(aa(t,e)),i=ts(t.transactionQueueTree_,e);return zu(i,s=>{Yn(t,s)}),Yn(t,i),Jo(i,s=>{Yn(t,s)}),n}function Yn(t,e){const n=lt(e);if(n){const i=[];let s=[],r=-1;for(let o=0;o<n.length;o++)n[o].status===3||(n[o].status===1?(m(r===o-1,"All SENT items should be at beginning of queue."),r=o,n[o].status=3,n[o].abortReason="set"):(m(n[o].status===0,"Unexpected transaction status in abort"),n[o].unwatcher(),s=s.concat(Ne(t.serverSyncTree_,n[o].currentWriteId,!0)),n[o].onComplete&&i.push(n[o].onComplete.bind(null,new Error("set"),!1,null))));r===-1?Qo(e,void 0):n.length=r+1,pe(t.eventQueue_,Gt(e),s);for(let o=0;o<i.length;o++)ot(i[o])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function wf(t){let e="";const n=t.split("/");for(let i=0;i<n.length;i++)if(n[i].length>0){let s=n[i];try{s=decodeURIComponent(s.replace(/\+/g," "))}catch{}e+="/"+s}return e}function Cf(t){const e={};t.charAt(0)==="?"&&(t=t.substring(1));for(const n of t.split("&")){if(n.length===0)continue;const i=n.split("=");i.length===2?e[decodeURIComponent(i[0])]=decodeURIComponent(i[1]):K(`Invalid query segment '${n}' in query '${t}'`)}return e}const wr=function(t,e){const n=Sf(t),i=n.namespace;n.domain==="firebase.com"&&fe(n.host+" is no longer supported. Please use <YOUR FIREBASE>.firebaseio.com instead"),(!i||i==="undefined")&&n.domain!=="localhost"&&fe("Cannot parse Firebase url. Please use https://<YOUR FIREBASE>.firebaseio.com"),n.secure||Rh();const s=n.scheme==="ws"||n.scheme==="wss";return{repoInfo:new go(n.host,n.secure,i,s,e,"",i!==n.subdomain),path:new N(n.pathString)}},Sf=function(t){let e="",n="",i="",s="",r="",o=!0,a="https",l=443;if(typeof t=="string"){let c=t.indexOf("//");c>=0&&(a=t.substring(0,c-1),t=t.substring(c+2));let d=t.indexOf("/");d===-1&&(d=t.length);let h=t.indexOf("?");h===-1&&(h=t.length),e=t.substring(0,Math.min(d,h)),d<h&&(s=wf(t.substring(d,h)));const f=Cf(t.substring(Math.min(t.length,h)));c=e.indexOf(":"),c>=0?(o=a==="https"||a==="wss",l=parseInt(e.substring(c+1),10)):c=e.length;const g=e.slice(0,c);if(g.toLowerCase()==="localhost")n="localhost";else if(g.split(".").length<=2)n=g;else{const _=e.indexOf(".");i=e.substring(0,_).toLowerCase(),n=e.substring(_+1),r=i}"ns"in f&&(r=f.ns)}return{host:e,port:l,domain:n,subdomain:i,secure:o,scheme:a,pathString:s,namespace:r}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class da{constructor(e,n,i,s){this.eventType=e,this.eventRegistration=n,this.snapshot=i,this.prevName=s}getPath(){const e=this.snapshot.ref;return this.eventType==="value"?e._path:e.parent._path}getEventType(){return this.eventType}getEventRunner(){return this.eventRegistration.getEventRunner(this)}toString(){return this.getPath().toString()+":"+this.eventType+":"+U(this.snapshot.exportVal())}}class ua{constructor(e,n,i){this.eventRegistration=e,this.error=n,this.path=i}getPath(){return this.path}getEventType(){return"cancel"}getEventRunner(){return this.eventRegistration.getEventRunner(this)}toString(){return this.path.toString()+":cancel"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ef{constructor(e,n){this.snapshotCallback=e,this.cancelCallback=n}onValue(e,n){this.snapshotCallback.call(null,e,n)}onCancel(e){return m(this.hasCancelCallback,"Raising a cancel event on a listener with no cancel callback"),this.cancelCallback.call(null,e)}get hasCancelCallback(){return!!this.cancelCallback}matches(e){return this.snapshotCallback===e.snapshotCallback||this.snapshotCallback.userCallback!==void 0&&this.snapshotCallback.userCallback===e.snapshotCallback.userCallback&&this.snapshotCallback.context===e.snapshotCallback.context}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class kf{constructor(e,n){this._repo=e,this._path=n}cancel(){const e=new ce;return pf(this._repo,this._path,e.wrapCallback(()=>{})),e.promise}remove(){gt("OnDisconnect.remove",this._path);const e=new ce;return vr(this._repo,this._path,null,e.wrapCallback(()=>{})),e.promise}set(e){gt("OnDisconnect.set",this._path),wi("OnDisconnect.set",e,this._path);const n=new ce;return vr(this._repo,this._path,e,n.wrapCallback(()=>{})),n.promise}setWithPriority(e,n){gt("OnDisconnect.setWithPriority",this._path),wi("OnDisconnect.setWithPriority",e,this._path),ef("OnDisconnect.setWithPriority",n);const i=new ce;return mf(this._repo,this._path,e,n,i.wrapCallback(()=>{})),i.promise}update(e){gt("OnDisconnect.update",this._path),Ju("OnDisconnect.update",e,this._path);const n=new ce;return gf(this._repo,this._path,e,n.wrapCallback(()=>{})),n.promise}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ls{constructor(e,n,i,s){this._repo=e,this._path=n,this._queryParams=i,this._orderByCalled=s}get key(){return S(this._path)?null:Oi(this._path)}get ref(){return new me(this._repo,this._path)}get _queryIdentifier(){const e=ir(this._queryParams),n=Ri(e);return n==="{}"?"default":n}get _queryObject(){return ir(this._queryParams)}isEqual(e){if(e=rt(e),!(e instanceof ls))return!1;const n=this._repo===e._repo,i=Mi(this._path,e._path),s=this._queryIdentifier===e._queryIdentifier;return n&&i&&s}toJSON(){return this.toString()}toString(){return this._repo.toString()+fd(this._path)}}class me extends ls{constructor(e,n){super(e,n,new Bi,!1)}get parent(){const e=ko(this._path);return e===null?null:new me(this._repo,e)}get root(){let e=this;for(;e.parent!==null;)e=e.parent;return e}}class Mt{constructor(e,n,i){this._node=e,this.ref=n,this._index=i}get priority(){return this._node.getPriority().val()}get key(){return this.ref.key}get size(){return this._node.numChildren()}child(e){const n=new N(e),i=wn(this.ref,e);return new Mt(this._node.getChild(n),i,M)}exists(){return!this._node.isEmpty()}exportVal(){return this._node.val(!0)}forEach(e){return this._node.isLeafNode()?!1:!!this._node.forEachChild(this._index,(i,s)=>e(new Mt(s,wn(this.ref,i),M)))}hasChild(e){const n=new N(e);return!this._node.getChild(n).isEmpty()}hasChildren(){return this._node.isLeafNode()?!1:!this._node.isEmpty()}toJSON(){return this.exportVal()}val(){return this._node.val()}}function Ie(t,e){return t=rt(t),t._checkNotDeleted("ref"),e!==void 0?wn(t._root,e):t._root}function wn(t,e){return t=rt(t),C(t._path)===null?tf("child","path",e):na("child","path",e),new me(t._repo,L(t._path,e))}function Tf(t){return t=rt(t),new kf(t._repo,t._path)}function fa(t,e){t=rt(t),gt("set",t._path),wi("set",e,t._path);const n=new ce;return uf(t._repo,t._path,e,null,n.wrapCallback(()=>{})),n.promise}class cs{constructor(e){this.callbackContext=e}respondsTo(e){return e==="value"}createEvent(e,n){const i=n._queryParams.getIndex();return new da("value",this,new Mt(e.snapshotNode,new me(n._repo,n._path),i))}getEventRunner(e){return e.getEventType()==="cancel"?()=>this.callbackContext.onCancel(e.error):()=>this.callbackContext.onValue(e.snapshot,null)}createCancelEvent(e,n){return this.callbackContext.hasCancelCallback?new ua(this,e,n):null}matches(e){return e instanceof cs?!e.callbackContext||!this.callbackContext?!0:e.callbackContext.matches(this.callbackContext):!1}hasAnyCallback(){return this.callbackContext!==null}}class hs{constructor(e,n){this.eventType=e,this.callbackContext=n}respondsTo(e){let n=e==="children_added"?"child_added":e;return n=n==="children_removed"?"child_removed":n,this.eventType===n}createCancelEvent(e,n){return this.callbackContext.hasCancelCallback?new ua(this,e,n):null}createEvent(e,n){m(e.childName!=null,"Child events should have a childName.");const i=wn(new me(n._repo,n._path),e.childName),s=n._queryParams.getIndex();return new da(e.type,this,new Mt(e.snapshotNode,i,s),e.prevName)}getEventRunner(e){return e.getEventType()==="cancel"?()=>this.callbackContext.onCancel(e.error):()=>this.callbackContext.onValue(e.snapshot,e.prevName)}matches(e){return e instanceof hs?this.eventType===e.eventType&&(!this.callbackContext||!e.callbackContext||this.callbackContext.matches(e.callbackContext)):!1}hasAnyCallback(){return!!this.callbackContext}}function On(t,e,n,i,s){let r;if(typeof i=="object"&&(r=void 0,s=i),typeof i=="function"&&(r=i),s&&s.onlyOnce){const l=n,c=(d,h)=>{br(t._repo,t,a),l(d,h)};c.userCallback=n.userCallback,c.context=n.context,n=c}const o=new Ef(n,r||void 0),a=e==="value"?new cs(o):new hs(e,o);return _f(t._repo,t,a),()=>br(t._repo,t,a)}function If(t,e,n,i){return On(t,"value",e,n,i)}function Cr(t,e,n,i){return On(t,"child_added",e,n,i)}function Af(t,e,n,i){return On(t,"child_changed",e,n,i)}function Nf(t,e,n,i){return On(t,"child_removed",e,n,i)}Eu(me);Ru(me);/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Rf="FIREBASE_DATABASE_EMULATOR_HOST",Ci={};let xf=!1;function Pf(t,e,n,i){const s=e.lastIndexOf(":"),r=e.substring(0,s),o=Kr(r);t.repoInfo_=new go(e,o,t.repoInfo_.namespace,t.repoInfo_.webSocketOnly,t.repoInfo_.nodeAdmin,t.repoInfo_.persistenceKey,t.repoInfo_.includeNamespaceInQueryParams,!0,n),i&&(t.authTokenProvider_=i)}function Df(t,e,n,i,s){let r=i||t.options.databaseURL;r===void 0&&(t.options.projectId||fe("Can't determine Firebase Database URL. Be sure to include  a Project ID when calling firebase.initializeApp()."),q("Using default host for project ",t.options.projectId),r=`${t.options.projectId}-default-rtdb.firebaseio.com`);let o=wr(r,s),a=o.repoInfo,l;typeof process<"u"&&Bs&&(l=Bs[Rf]),l?(r=`http://${l}?ns=${a.namespace}`,o=wr(r,s),a=o.repoInfo):o.repoInfo.secure;const c=new Wh(t.name,t.options,e);nf("Invalid Firebase Database URL",o),S(o.path)||fe("Database URL must point to the root of a Firebase Database (not including a child path).");const d=Mf(a,t,c,new Hh(t,n));return new Lf(d,t)}function Of(t,e){const n=Ci[e];(!n||n[t.key]!==t)&&fe(`Database ${e}(${t.repoInfo_}) has already been deleted.`),yf(t),delete n[t.key]}function Mf(t,e,n,i){let s=Ci[e.name];s||(s={},Ci[e.name]=s);let r=s[t.toURLString()];return r&&fe("Database initialized multiple times. Please make sure the format of the database URL matches with each database() call."),r=new lf(t,xf,n,i),s[t.toURLString()]=r,r}class Lf{constructor(e,n){this._repoInternal=e,this.app=n,this.type="database",this._instanceStarted=!1}get _repo(){return this._instanceStarted||(cf(this._repoInternal,this.app.options.appId,this.app.options.databaseAuthVariableOverride),this._instanceStarted=!0),this._repoInternal}get _root(){return this._rootInternal||(this._rootInternal=new me(this._repo,I())),this._rootInternal}_delete(){return this._rootInternal!==null&&(Of(this._repo,this.app.name),this._repoInternal=null,this._rootInternal=null),Promise.resolve()}_checkNotDeleted(e){this._rootInternal===null&&fe("Cannot call "+e+" on a deleted database.")}}function Ff(t=dh(),e){const n=oh(t,"database").getImmediate({identifier:e});if(!n._instanceStarted){const i=Kl("database");i&&$f(n,...i)}return n}function $f(t,e,n,i={}){t=rt(t),t._checkNotDeleted("useEmulator");const s=`${e}:${n}`,r=t._repoInternal;if(t._instanceStarted){if(s===t._repoInternal.repoInfo_.host&&on(i,r.repoInfo_.emulatorOptions))return;fe("connectDatabaseEmulator() cannot initialize or alter the emulator configuration after the database instance has started.")}let o;if(r.repoInfo_.nodeAdmin)i.mockUserToken&&fe('mockUserToken is not supported by the Admin SDK. For client access with mock users, please use the "firebase" package instead of "firebase-admin".'),o=new en(en.OWNER);else if(i.mockUserToken){const a=typeof i.mockUserToken=="string"?i.mockUserToken:Yl(i.mockUserToken,t.app.options.projectId);o=new en(a)}Kr(e)&&cc(e),Pf(r,s,i,o)}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Bf(t){Eh(hh),ln(new Tt("database",(e,{instanceIdentifier:n})=>{const i=e.getProvider("app").getImmediate(),s=e.getProvider("auth-internal"),r=e.getProvider("app-check-internal");return Df(i,s,r,n)},"PUBLIC").setMultipleInstances(!0)),je(Hs,Ws,t),je(Hs,Ws,"esm2020")}de.prototype.simpleListen=function(t,e){this.sendRequest("q",{p:t},e)};de.prototype.echo=function(t,e){this.sendRequest("echo",{d:t},e)};Bf();const Me=!!(ti.apiKey&&ti.databaseURL);let te=null;if(Me){const t=Xr(ti);te=Ff(t)}const Cn="matrix-rpg-characters-v1",ds=["home","learn","jack-in"],us=["identity","abilities","skills","loadout","notes","comms"],Hf=["Common Sense","Focus","Agility","Strength","Endurance","CyberZen"],Wf=["None","Light","Moderate","Serious","Critical","Incapacitated","Dead"],Uf=["RSI Hacker","Operator","Pilot","Captain","Crew","Nomad","Surface Human"],qf=["None","Temporary","Permanent"],Si="matrix-rpg-opensea-key-v1",pa=[{slug:"the-matrix-avatars-red-polygon",chain:"polygon",filter:"red",label:"Red Pill"},{slug:"the-matrix-avatars-blue-polygon",chain:"polygon",filter:"blue",label:"Blue Pill"},{slug:"the-matrix-avatars",chain:"ethereum",filter:"base",label:"Base Avatar"}],jf={"0xc37d61ad831dbc979469dc48a7f55141e2e27f03":"red","0xcc16d5f112d2d6b7d4572eb191a59f22aaf87d02":"blue","0x495f947276749ce646f68ac8c248420045cb7b5e":"base"},ma="matrix-rpg-nft-bookmarks-v1",fs="matrix-rpg-messages-v1";function Ei(){return localStorage.getItem(Si)||""}function Sr(t){t?localStorage.setItem(Si,t):localStorage.removeItem(Si)}function Gf(){try{return JSON.parse(localStorage.getItem(ma)||"[]")}catch{return[]}}function Vf(){localStorage.setItem(ma,JSON.stringify(u.nftBookmarks))}function ga(){try{return JSON.parse(localStorage.getItem(fs)||"[]")}catch{return[]}}function Lt(){localStorage.setItem(fs,JSON.stringify(u.messages)),zf()}function zf(){let t=!1;u.characters=u.characters.map(e=>{const n=e.homeShip||"",i=u.messages.filter(o=>(o.shipName||"")!==n?!1:e.role==="Operator"?!0:o.to==="__all__"||o.to===e.id||o.fromCharId===e.id),s=e.messageLog||[],r=i.filter(o=>!s.find(a=>a.id===o.id));return r.length?(t=!0,{...e,messageLog:[...s,...r]}):e}),t&&Ue(u.characters)}function nt(t){return`${t.contract||""}:${t.identifier}`}function Kf(t){return u.nftBookmarks.some(e=>nt(e)===nt(t))}function _a(t){var e;return((e=u.characters.find(n=>n.id===t))==null?void 0:e.role)==="Operator"}function ya(t){const e=u.characters.find(i=>i.id===t),n=(e==null?void 0:e.homeShip)||"";return _a(t)?u.messages.filter(i=>(i.to==="__operator__"||i.to===t)&&(i.shipName||"")===n):u.messages.filter(i=>(i.to==="__all__"||i.to===t)&&(i.shipName||"")===n)}function va(t){return ya(t).filter(e=>!e.readBy.includes(t)).length}function Yf(t){let e=!1;const n=_a(t);u.messages=u.messages.map(i=>(n?i.to==="__operator__"||i.to===t:i.to==="__all__"||i.to===t)&&!i.readBy.includes(t)?(e=!0,{...i,readBy:[...i.readBy,t]}):i),e&&Lt()}function Er(t,e,n,i,s=""){const r={id:`msg-${Date.now()}-${Math.random().toString(16).slice(2,6)}`,from:t,fromCharId:e,to:n,shipName:s,body:i,sentAt:new Date().toISOString(),readBy:[]};Me&&te?(u.messages=[...u.messages,r],A(),fa(Ie(te,`matrix-rpg/messages/${r.id}`),{...r,readBy:{}}).catch(o=>{console.error("Firebase write failed:",o),u.status="Transmission failed — check your connection.",A()}),Lt()):(u.messages=[...u.messages,r],Lt(),A())}function ba(t){if(!Me||!te)return;const e={id:t.id,profileName:t.profileName||"Unknown",callSign:t.callSign||"",role:t.role||"",homeShip:t.homeShip||"",phoneOn:u.phoneOn,lastSeen:Date.now()},n=Ie(te,`matrix-rpg/sessions/${t.id}`);Tf(n).remove(),fa(n,e).catch(i=>{console.error("Session register failed:",i),String(i).includes("PERMISSION_DENIED")&&(u.status='Firebase rules block sessions — add "sessions" to your Realtime Database rules (see README).',A())})}function Zf(t){const e=nt(t),n=u.nftBookmarks.findIndex(i=>nt(i)===e);n>=0?u.nftBookmarks=[...u.nftBookmarks.slice(0,n),...u.nftBookmarks.slice(n+1)]:u.nftBookmarks=[...u.nftBookmarks,{...t,bookmarkedAt:new Date().toISOString()}],Vf(),A()}function Ft(){return`char-${Date.now()}-${Math.random().toString(16).slice(2,8)}`}function ps(){return{id:Ft(),name:"",rating:0,attribute:"Agility",specialization:"",downloadType:"None",notes:""}}function ms(){return{id:Ft(),name:"",rating:0,notes:""}}function Ke(){return{id:Ft(),profileName:"New Redpill",callSign:"",realName:"",path:"",role:"RSI Hacker",affiliation:"Zion Resistance",homeShip:"",origin:"",redPillChoice:"Red Pill",background:"",motivation:"",appearance:"",notes:"",attributes:{commonSense:1,focus:1,agility:1,strength:1,endurance:1,cyberZen:0,giftUnlocked:!1},damage:"None",experience:0,karma:0,hardlines:1,matrixFeats:[ms()],skills:Array.from({length:6},()=>ps()),gear:{realWorld:"",matrixLoadout:"",contacts:"",vehicles:"",hardlineNotes:""},nft:{walletAddress:"",collectionNotes:""},messageLog:[],updatedAt:new Date().toISOString()}}function gs(t={}){const e=Ke();return{...e,...t,id:t.id||e.id,profileName:t.profileName||e.profileName,attributes:{...e.attributes,...t.attributes},gear:{...e.gear,...t.gear},nft:{...e.nft,...t.nft},skills:Array.isArray(t.skills)&&t.skills.length?t.skills.map(n=>({...ps(),...n,id:n.id||Ft()})):e.skills,matrixFeats:Array.isArray(t.matrixFeats)&&t.matrixFeats.length?t.matrixFeats.map(n=>({...ms(),...n,id:n.id||Ft()})):e.matrixFeats,messageLog:Array.isArray(t.messageLog)?t.messageLog:[],updatedAt:t.updatedAt||e.updatedAt}}function wa(){const t=window.location.hash.replace("#","")||"home";return ds.includes(t)?t:"home"}function Ca(){try{const t=window.localStorage.getItem(Cn);if(!t){const n=Ke();return window.localStorage.setItem(Cn,JSON.stringify([n])),[n]}const e=JSON.parse(t);return!Array.isArray(e)||!e.length?[Ke()]:e.map(n=>gs(n))}catch{return[Ke()]}}function Ue(t){window.localStorage.setItem(Cn,JSON.stringify(t))}const u={characters:Ca(),selectedId:null,status:"Local storage ready.",route:wa(),sheetTab:"identity",nftLoading:!1,nftItems:[],nftError:null,nftFilter:"all",nftMode:"wallet",nftContractItems:[],nftContractNext:null,nftContractAddress:"",nftBookmarks:Gf(),phoneOn:!1,messages:ga(),firebaseConnected:!1,sessionChars:{}};var Ir;u.selectedId=((Ir=u.characters[0])==null?void 0:Ir.id)??null;window.addEventListener("hashchange",()=>{const t=wa();t!==u.route&&(u.route=t,A(!0))});let Zn=!1;function ft(t=!1){Zn||(Zn=!0,requestAnimationFrame(()=>{if(Zn=!1,A(),t&&u.phoneOn){const e=document.getElementById("phone-screen");e&&(e.scrollTop=e.scrollHeight)}}))}if(Me&&te){If(Ie(te,".info/connected"),e=>{const n=u.firebaseConnected;u.firebaseConnected=e.val()===!0,A(),u.firebaseConnected&&!n&&requestAnimationFrame(()=>{const i=document.querySelector(".comms-conn-banner");i&&El(i)})}),Cr(Ie(te,"matrix-rpg/messages"),e=>{const n=e.val();if(!n)return;const i=n.readBy?Object.keys(n.readBy):[],s={...n,id:e.key,readBy:i};u.messages.find(r=>r.id===s.id)||(u.messages=[...u.messages,s],Lt(),ft(u.sheetTab==="comms"))});const t=e=>{console.error("Sessions listener denied:",e),u.status='Firebase rules block sessions — add "sessions" to your Realtime Database rules (see README).',A()};Cr(Ie(te,"matrix-rpg/sessions"),e=>{e.key&&e.val()&&(u.sessionChars[e.key]=e.val(),ft())},t),Af(Ie(te,"matrix-rpg/sessions"),e=>{e.key&&e.val()&&(u.sessionChars[e.key]=e.val(),ft())},t),Nf(Ie(te,"matrix-rpg/sessions"),e=>{e.key&&(delete u.sessionChars[e.key],ft())},t)}else window.addEventListener("storage",t=>{t.key===fs&&(u.messages=ga(),ft(u.sheetTab==="comms")),t.key===Cn&&(u.characters=Ca(),A())});function Re(){return u.characters.find(t=>t.id===u.selectedId)??u.characters[0]}function Ee(t){u.status=t}function Yt(t,e={}){ds.includes(t)&&(u.route=t,e.sheetTab&&us.includes(e.sheetTab)&&(u.sheetTab=e.sheetTab),window.location.hash!==`#${t}`&&(window.location.hash=t),A(!0))}function Qf(t){us.includes(t)&&(u.sheetTab=t,t==="comms"&&ba(Re()),A(!0))}function le(t,e=!0){u.characters=u.characters.map(n=>{if(n.id!==u.selectedId)return n;const i=t(structuredClone(n));return i.updatedAt=new Date().toISOString(),gs(i)}),Ue(u.characters),e&&A()}function se({label:t,name:e,value:n,type:i="text",placeholder:s="",min:r=0,max:o=99}){return`
    <label class="field">
      <span>${t}</span>
      <input data-field="${e}" type="${i}" value="${y(String(n??""))}" placeholder="${y(s)}" ${i==="number"?`min="${r}" max="${o}"`:""} />
    </label>
  `}function Xf(t,e){return`
    <div class="skill-name-wrapper">
      <label class="field">
        <span>Feat Name</span>
        <input data-field="feat.name.${t}" type="text" value="${y(e)}" placeholder="Flight, Telepathy, Heal..." autocomplete="off" />
      </label>
      <div class="skill-suggestions" hidden data-feat-suggestions="${t}"></div>
    </div>
  `}function Jf(t,e){return`
    <div class="skill-name-wrapper">
      <label class="field">
        <span>Skill Name</span>
        <input data-field="skill.name.${t}" type="text" value="${y(e)}" placeholder="Martial Arts, Programming..." autocomplete="off" />
      </label>
      <div class="skill-suggestions" hidden data-skill-suggestions="${t}"></div>
    </div>
  `}function Zt({label:t,name:e,value:n,placeholder:i=""}){return`
    <div class="skill-name-wrapper">
      <label class="field">
        <span>${t}</span>
        <input data-field="${e}" type="text" value="${y(n)}" placeholder="${y(i)}" autocomplete="off" />
      </label>
      <div class="skill-suggestions" hidden data-simple-suggestions="${e}"></div>
    </div>
  `}function Qt({label:t,name:e,value:n,placeholder:i="",rows:s=4}){const r=e.split(".").pop();return`
    <div class="gear-picker-wrapper">
      <label class="field field-textarea">
        <span>${t}</span>
        <textarea data-field="${e}" rows="${s}" placeholder="${y(i)}">${y(n??"")}</textarea>
      </label>
      <div class="gear-picker-bar">
        <button class="gear-add-btn" type="button" data-gear-add="${r}">+ Add from list</button>
        <div class="skill-suggestions" hidden data-gear-panel="${r}"></div>
      </div>
    </div>
  `}function Le({label:t,name:e,value:n,placeholder:i="",rows:s=4}){return`
    <label class="field field-textarea">
      <span>${t}</span>
      <textarea data-field="${e}" rows="${s}" placeholder="${y(i)}">${y(n??"")}</textarea>
    </label>
  `}function $t({label:t,name:e,value:n,options:i}){return`
    <label class="field">
      <span>${t}</span>
      <select data-field="${e}">
        ${i.map(s=>`<option value="${y(s)}" ${s===n?"selected":""}>${y(s)}</option>`).join("")}
      </select>
    </label>
  `}function y(t){return String(t).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;")}function ep(t){const n=(Number(t.attributes.cyberZen)||0)*3,i=Math.floor(n/3),s=n-i,r=t.skills.filter(a=>a.downloadType==="Permanent").length,o=t.skills.filter(a=>a.downloadType==="Temporary").length;return{maxSlots:n,permanentSlots:i,temporarySlots:s,permanentUsed:r,temporaryUsed:o}}function tp(t){const e=new Blob([JSON.stringify(t,null,2)],{type:"application/json"}),n=URL.createObjectURL(e),i=document.createElement("a");i.href=n,i.download=`${(t.profileName||"matrix-character").replace(/\s+/g,"-").toLowerCase()}.json`,i.click(),URL.revokeObjectURL(n)}function np(){return ds.map(t=>{const e=t==="jack-in"?"Jack In":t[0].toUpperCase()+t.slice(1);return`<button class="route-link ${u.route===t?"is-active":""}" data-route="${t}">${e}</button>`}).join("")}function ip(t){return`
    <section class="hero-panel hero-view">
      <div class="hero-grid hero-grid-home">
        <section class="hero-copy">
          <p class="eyebrow">Wake up. Choose your path.</p>
          <h1>Start in the construct. Learn the world. Then jack in.</h1>
          <div class="hero-cta-row">
            <button class="pill-button red-pill" data-route="jack-in" data-sheet-tab="identity">Take The Red Pill</button>
            <button class="pill-button blue-pill" data-route="learn">Take The Blue Pill</button>
          </div>
        </section>

        <aside class="choice-panel">
          <article class="choice-card choice-card-red interactive-card">
            <p class="eyebrow">Play</p>
            <h2>Build your operative</h2>
            <p>Split the character sheet into guided tabs: identity, abilities, skills, loadout, and mission notes.</p>
            <button class="ghost-button" data-route="jack-in" data-sheet-tab="identity">Open Character Builder</button>
          </article>
          <article class="choice-card choice-card-blue interactive-card">
            <p class="eyebrow">Learn</p>
            <h2>Read the signal</h2>
            <p>Players can read the fast-start summary before they start filling fields or making choices.</p>
            <button class="ghost-button" data-route="learn">Open Learn View</button>
          </article>
        </aside>
      </div>
    </section>

    <section class="summary-grid">
      <article class="summary-card">
        <p class="eyebrow">Current Operative</p>
        <h3>${y(t.profileName||"Unnamed Character")}</h3>
        <p>${y(t.role)} aligned with ${y(t.affiliation||"no faction yet")}.</p>
      </article>
      <article class="summary-card">
        <p class="eyebrow">Local Save</p>
        <h3>${u.characters.length} stored sheet${u.characters.length===1?"":"s"}</h3>
        <p>Characters persist on this device and can be exported as JSON when you need backups or transfers.</p>
      </article>
      <article class="summary-card">
        <p class="eyebrow">Future Hook</p>
        <h3>ETH NFT ready later</h3>
        <p>The saved character schema still carries wallet and collection notes for a future read-only Matrix NFT viewer.</p>
      </article>
    </section>

    <section class="mission-grid">
      <article class="mission-card">
        <p class="eyebrow">Step 1</p>
        <h3>Choose the pill</h3>
        <p>Guide new players to Learn or Jack In instead of forcing them through the entire site immediately.</p>
      </article>
      <article class="mission-card">
        <p class="eyebrow">Step 2</p>
        <h3>Build in stages</h3>
        <p>Identity and attributes happen first, then Matrix powers, then equipment and session notes.</p>
      </article>
      <article class="mission-card">
        <p class="eyebrow">Step 3</p>
        <h3>Save and return</h3>
        <p>Players can keep updating the same operative across sessions without needing a separate account system.</p>
      </article>
    </section>
  `}function sp(){return`
    <section class="view-heading learn-view">
      <div>
        <p class="eyebrow">Learn The Rules</p>
        <h1>Fast table reference for players</h1>
      </div>
      <p class="status-line">${y(u.status)}</p>
    </section>

    <section class="learn-grid">
      <article class="learn-card">
        <h3>Core Premise</h3>
        <p>Your crew moves between the real world and the Matrix, identifies people ready to question reality, and offers them a choice to wake up.</p>
      </article>
      <article class="learn-card">
        <h3>Attributes</h3>
        <p>Common Sense, Focus, Agility, Strength, and Endurance drive human action. RSI hackers may also grow CyberZen and eventually awaken the Gift.</p>
      </article>
      <article class="learn-card">
        <h3>Skills And Feats</h3>
        <p>Standard skills pair with an attribute. Matrix feats sit apart and let characters bend or break simulation rules through CyberZen.</p>
      </article>
      <article class="learn-card">
        <h3>Damage</h3>
        <p>Wounds escalate from None to Dead, and each wound tier makes actions harder. That is why the builder keeps damage visible in the abilities tab.</p>
      </article>
      <article class="learn-card">
        <h3>Downloaded Skills</h3>
        <p>CyberZen defines how many temporary and permanent downloads an RSI can carry, so the builder calculates those slot totals for the player.</p>
      </article>
      <article class="learn-card">
        <h3>Hardlines</h3>
        <p>Operators secure exit points into and out of the Matrix. Those mission-critical notes sit with the loadout tab instead of being buried in the full sheet.</p>
      </article>
    </section>

    <section class="timeline-card">
      <div class="timeline-step">
        <strong>Find the target</strong>
        <p>Use signals, traps, and intuition to locate people who are ready to see the world for what it is.</p>
      </div>
      <div class="timeline-step">
        <strong>Offer the choice</strong>
        <p>Red pill or blue pill is part of the fiction, and now also part of the onboarding structure in the app.</p>
      </div>
      <div class="timeline-step">
        <strong>Prepare the mission</strong>
        <p>Secure hardlines, assign downloaded skills, pack loadouts, and move the crew into the construct.</p>
      </div>
      <div class="timeline-step">
        <strong>Track the fallout</strong>
        <p>Damage, experience, karma, and session notes all stay with the operative for the next game.</p>
      </div>
    </section>

    <section class="action-banner">
      <div>
        <p class="eyebrow">Next Move</p>
        <h2>Ready to build an operative?</h2>
      </div>
      <button class="pill-button red-pill" data-route="jack-in" data-sheet-tab="identity">Open The Builder</button>
    </section>
  `}function rp(t){return`
    <aside class="save-rail">
      <div class="save-rail-header">
        <div>
          <p class="eyebrow">Crew Roster</p>
          <h2>Saved Characters</h2>
        </div>
        <button class="ghost-button" data-action="new-character">New Sheet</button>
      </div>

      <div class="roster-list">
        ${u.characters.map(e=>`
              <button class="roster-card ${e.id===t.id?"is-active":""}" data-character-id="${e.id}">
                <strong>${y(e.profileName||"Unnamed Character")}</strong>
                <span>${y(e.role||"Unassigned")}</span>
                <small>${new Date(e.updatedAt).toLocaleString()}</small>
              </button>
            `).join("")}
      </div>

      <div class="save-actions">
        <button class="solid-button" data-action="save-status">Save Locally</button>
        <button class="ghost-button" data-action="export-character">Export JSON</button>
        <label class="ghost-button import-label">
          <input type="file" id="import-json" accept="application/json" hidden />
          Import JSON
        </label>
        <button class="danger-button" data-action="delete-character">Delete</button>
      </div>
    </aside>
  `}function op(){const t=Re(),e=va(t.id),n={identity:"Identity",abilities:"Abilities",skills:"Skills",loadout:"Loadout",notes:"Notes",comms:`Comms${!u.phoneOn&&e>0?` <span class="tab-badge">${e}</span>`:""}`};return us.map(i=>`<button class="sheet-tab ${u.sheetTab===i?"is-active":""}" data-sheet-tab="${i}">${n[i]}</button>`).join("")}function ap(t){return`
    <section class="sheet-card sheet-card-wide">
      <h3>Identity</h3>
      <div class="field-grid two-up">
        ${se({label:"Profile Name",name:"profileName",value:t.profileName,placeholder:"Neo, Switch, Ghost..."})}
        ${se({label:"Call Sign",name:"callSign",value:t.callSign,placeholder:"Operator tag or street handle"})}
        ${se({label:"Real Name",name:"realName",value:t.realName})}
        ${Zt({label:"Path",name:"path",value:t.path,placeholder:"RSI Hacker, Mercenary, Punksmith..."})}
        ${$t({label:"Role",name:"role",value:t.role,options:Uf})}
        ${Zt({label:"Affiliation",name:"affiliation",value:t.affiliation,placeholder:"Zion Resistance, Crystal Shard..."})}
        ${Zt({label:"Hovership / Crew",name:"homeShip",value:t.homeShip,placeholder:"Speeder Hovercraft, Nomad Hovercraft..."})}
        ${Zt({label:"Origin",name:"origin",value:t.origin,placeholder:"Pod-born, Surface-born, Freeborn..."})}
        ${$t({label:"Choice",name:"redPillChoice",value:t.redPillChoice,options:["Red Pill","Blue Pill","Still Deciding"]})}
        ${se({label:"Motivation",name:"motivation",value:t.motivation,placeholder:"Why do they keep fighting?"})}
      </div>
      <div class="field-grid">
        ${Le({label:"Background",name:"background",value:t.background,rows:5,placeholder:"How did this character end up here?"})}
        ${Le({label:"Appearance / RSI Notes",name:"appearance",value:t.appearance,rows:4,placeholder:"Residual self image, style, tells..."})}
      </div>
    </section>
  `}function lp(t,e){return`
    <section class="summary-grid builder-summary-grid">
      <article class="summary-card">
        <p class="eyebrow">Damage</p>
        <h3>${y(t.damage)}</h3>
        <p>Current wound state for threshold tracking at the table.</p>
      </article>
      <article class="summary-card">
        <p class="eyebrow">Downloads</p>
        <h3>${e.maxSlots} total slots</h3>
        <p>${e.permanentUsed}/${e.permanentSlots} permanent and ${e.temporaryUsed}/${e.temporarySlots} temporary slots in use.</p>
      </article>
      <article class="summary-card">
        <p class="eyebrow">Hardlines</p>
        <h3>${t.hardlines}</h3>
        <p>Secured connections ready for extraction, equipment, or emergency exit.</p>
      </article>
    </section>

    <section class="sheet-card sheet-card-wide">
      <h3>Attributes And Tracks</h3>
      <div class="attribute-grid">
        ${[["commonSense","Common Sense"],["focus","Focus"],["agility","Agility"],["strength","Strength"],["endurance","Endurance"],["cyberZen","CyberZen"]].map(([n,i])=>`
              <label class="attribute-tile">
                <span>${i}</span>
                <input data-attribute="${n}" type="number" min="0" max="6" value="${t.attributes[n]}" />
              </label>
            `).join("")}
      </div>

      <div class="field-grid four-up compact-grid">
        ${$t({label:"Damage",name:"damage",value:t.damage,options:Wf})}
        ${se({label:"Experience",name:"experience",value:t.experience,type:"number",min:0,max:999})}
        ${se({label:"Karma",name:"karma",value:t.karma,type:"number",min:0,max:999})}
        ${se({label:"Secured Hardlines",name:"hardlines",value:t.hardlines,type:"number",min:0,max:20})}
      </div>

      <label class="toggle-row">
        <input data-attribute-toggle="giftUnlocked" type="checkbox" ${t.attributes.giftUnlocked?"checked":""} />
        <span>The Gift is unlocked</span>
      </label>
    </section>
  `}function cp(t){return`
    <section class="sheet-card sheet-card-wide">
      <div class="section-heading-with-action">
        <h3>Skills</h3>
        <button class="ghost-button" data-action="add-skill">Add Skill</button>
      </div>
      <div class="repeatable-list">
        ${t.skills.map((e,n)=>{var s;const i=((s=Jt.find(r=>r.name===e.name))==null?void 0:s.description)??"";return`
              <article class="repeatable-card">
                <div class="repeatable-head">
                  <strong>Skill ${n+1}</strong>
                  <button class="mini-button" data-remove-skill="${e.id}">Remove</button>
                </div>
                <div class="field-grid four-up compact-grid">
                  ${Jf(e.id,e.name)}
                  ${se({label:"Rating",name:`skill.rating.${e.id}`,value:e.rating,type:"number",min:0,max:6})}
                  ${$t({label:"Default Attribute",name:`skill.attribute.${e.id}`,value:e.attribute,options:Hf})}
                  ${se({label:"Specialization",name:`skill.specialization.${e.id}`,value:e.specialization,placeholder:"Aikido, Handguns, Stealth..."})}
                  ${$t({label:"Download Type",name:`skill.downloadType.${e.id}`,value:e.downloadType,options:qf})}
                </div>
                <p class="skill-description" data-skill-description="${e.id}"${i?"":" hidden"}>${y(i)}</p>
                ${Le({label:"Skill Notes",name:`skill.notes.${e.id}`,value:e.notes,rows:2,placeholder:"Table reminders or source of training"})}
              </article>
            `}).join("")}
      </div>
    </section>

    <section class="sheet-card sheet-card-wide">
      <div class="section-heading-with-action">
        <h3>Matrix Feats</h3>
        <button class="ghost-button" data-action="add-feat">Add Feat</button>
      </div>
      <div class="repeatable-list">
        ${t.matrixFeats.map((e,n)=>{const i=mt.find(r=>r.name===e.name),s=i?`<strong>Rule Bender:</strong> ${y(i.ruleBender)}<br><strong>Rule Breaker:</strong> ${y(i.ruleBreaker)}`:"";return`
              <article class="repeatable-card">
                <div class="repeatable-head">
                  <strong>Feat ${n+1}</strong>
                  <button class="mini-button" data-remove-feat="${e.id}">Remove</button>
                </div>
                <div class="field-grid two-up compact-grid">
                  ${Xf(e.id,e.name)}
                  ${se({label:"Rating",name:`feat.rating.${e.id}`,value:e.rating,type:"number",min:0,max:6})}
                </div>
                <div class="skill-description" data-feat-description="${e.id}"${i?"":" hidden"}>${s}</div>
                ${Le({label:"Feat Notes",name:`feat.notes.${e.id}`,value:e.notes,rows:2,placeholder:"Rule-bending or rule-breaking effects"})}
              </article>
            `}).join("")}
      </div>
    </section>
  `}function hp(t){return`
    <section class="sheet-card sheet-card-wide">
      <h3>Loadout And Contacts</h3>
      <div class="field-grid two-up">
        ${Qt({label:"Real World Gear",name:"gear.realWorld",value:t.gear.realWorld,rows:4,placeholder:"Weapons, medkits, tools, hovercraft assets..."})}
        ${Qt({label:"Matrix Loadout",name:"gear.matrixLoadout",value:t.gear.matrixLoadout,rows:4,placeholder:"Downloaded weapons, fake IDs, clothes, vehicles..."})}
        ${Qt({label:"Contacts",name:"gear.contacts",value:t.gear.contacts,rows:3,placeholder:"Fixers, captains, operators, informants..."})}
        ${Qt({label:"Vehicles / Frames",name:"gear.vehicles",value:t.gear.vehicles,rows:3,placeholder:"Hovercraft, bikes, APCs, sentinels..."})}
      </div>
      ${Le({label:"Hardline Notes",name:"gear.hardlineNotes",value:t.gear.hardlineNotes,rows:4,placeholder:"Exit points, backups, dangerous zones..."})}
    </section>
  `}function dp(t){return`
    <section class="sheet-card sheet-card-wide">
      <h3>Campaign Notes</h3>
      ${Le({label:"Session Notes",name:"notes",value:t.notes,rows:7,placeholder:"Mission goals, betrayals, unresolved hooks..."})}
    </section>

    <section class="sheet-card sheet-card-wide nft-viewer-section">
      <div class="nft-viewer-head">
        <div>
          <p class="eyebrow">Ethereum + Polygon · Warner Bros × Nifty's</p>
          <h3>Matrix Avatar NFT Viewer</h3>
        </div>
        <div class="nft-viewer-links">
          <a class="ghost-button nft-link-btn" href="https://opensea.io/collection/the-matrix-avatars-red-polygon" target="_blank" rel="noopener">Red Pill ↗</a>
          <a class="ghost-button nft-link-btn" href="https://opensea.io/collection/the-matrix-avatars-blue-polygon" target="_blank" rel="noopener">Blue Pill ↗</a>
          <a class="ghost-button nft-link-btn" href="https://opensea.io/collection/the-matrix-avatars" target="_blank" rel="noopener">Base ↗</a>
        </div>
      </div>

      <div class="nft-mode-tabs">
        <button class="nft-mode-btn${u.nftMode==="wallet"?" is-active":""}" data-nft-mode="wallet">My Wallet</button>
        <button class="nft-mode-btn${u.nftMode==="contract"?" is-active":""}" data-nft-mode="contract">Browse Contract</button>
        <button class="nft-mode-btn${u.nftMode==="bookmarks"?" is-active":""}" data-nft-mode="bookmarks">Bookmarks${u.nftBookmarks.length?` (${u.nftBookmarks.length})`:""}</button>
      </div>

      ${u.nftMode==="wallet"?`
        <div class="field-grid two-up nft-viewer-inputs">
          ${se({label:"Wallet Address",name:"nft.walletAddress",value:t.nft.walletAddress,placeholder:"0x..."})}
          <label class="field">
            <span>OpenSea API Key</span>
            <input id="nft-api-key" type="password" value="${y(Ei())}" placeholder="Free key at opensea.io/developers" autocomplete="off" />
          </label>
        </div>
        <div class="nft-controls-row">
          <div class="nft-filter-bar">
            ${["all","red","blue","base"].map(e=>`
              <button class="nft-filter-btn${u.nftFilter===e?" is-active":""}" data-nft-filter="${e}">
                ${e==="all"?"All":e==="red"?"Red Pill":e==="blue"?"Blue Pill":"Base"}
              </button>
            `).join("")}
          </div>
          <button class="solid-button" data-action="load-nfts"${u.nftLoading?" disabled":""}>
            ${u.nftLoading?"Loading…":"Load NFTs"}
          </button>
        </div>
      `:""}

      ${u.nftMode==="contract"?`
        <div class="field-grid two-up nft-viewer-inputs">
          <label class="field">
            <span>Contract Address</span>
            <input id="nft-contract-address" type="text" value="${y(u.nftContractAddress)}" placeholder="0x..." autocomplete="off" />
          </label>
          <label class="field">
            <span>OpenSea API Key</span>
            <input id="nft-api-key" type="password" value="${y(Ei())}" placeholder="Free key at opensea.io/developers" autocomplete="off" />
          </label>
        </div>
        <div class="nft-controls-row">
          <button class="solid-button" data-action="browse-contract"${u.nftLoading?" disabled":""}>
            ${u.nftLoading?"Loading…":"Browse Contract"}
          </button>
        </div>
      `:""}

      ${wp()}

      ${Le({label:"Collection Notes",name:"nft.collectionNotes",value:t.nft.collectionNotes,rows:3,placeholder:"Token IDs, display preferences, trades..."})}
    </section>
  `}function up(t,e){return u.sheetTab==="identity"?ap(t):u.sheetTab==="abilities"?lp(t,e):u.sheetTab==="skills"?cp(t):u.sheetTab==="loadout"?hp(t):u.sheetTab==="comms"?Rp(t):dp(t)}function fp(t,e){return`
    <section class="builder-hero jack-in-view">
      <div>
        <p class="eyebrow">Jack In</p>
        <h1>${y(t.profileName||"Unnamed Character")}</h1>
        <p class="hero-text">Build the operative in stages instead of working through one giant page. Each tab focuses on one slice of the sheet.</p>
      </div>
      <div class="download-summary">
        <span>Download slots: ${e.maxSlots}</span>
        <span>Permanent: ${e.permanentUsed}/${e.permanentSlots}</span>
        <span>Temporary: ${e.temporaryUsed}/${e.temporarySlots}</span>
      </div>
    </section>

    <section class="builder-layout">
      ${rp(t)}

      <section class="sheet-panel">
        <div class="sheet-toolbar">
          <div class="sheet-tab-bar">${op()}</div>
          <p class="status-line">${y(u.status)}</p>
        </div>
        ${up(t,e)}
      </section>
    </section>
  `}function Xt(t,e){var o;const n=(o=t.closest(".skill-name-wrapper"))==null?void 0:o.querySelector(".skill-suggestions");if(!n)return;const i=a=>`<button class="skill-suggestion" data-suggest-value="${y(a)}">
      <span class="skill-suggestion-name">${y(a)}</span>
    </button>`,s=()=>{const a=[];for(const l of e)a.push(`<div class="skill-suggestion-header">${y(l.category)}</div>`),l.items.forEach(c=>a.push(i(c)));n.innerHTML=a.join(""),n.hidden=!1},r=a=>{if(!a){s();return}const l=a.toLowerCase(),d=e.flatMap(h=>[...h.items]).filter(h=>h.toLowerCase().includes(l)).slice(0,14);if(d.length===0){n.hidden=!0;return}n.innerHTML=d.map(i).join(""),n.hidden=!1};t.addEventListener("input",()=>r(t.value.trim())),t.addEventListener("focus",()=>r(t.value.trim())),t.addEventListener("blur",()=>{n.hidden=!0}),t.addEventListener("keydown",a=>{a.key==="Escape"&&(n.hidden=!0)}),n.addEventListener("mousedown",a=>{const l=a.target.closest(".skill-suggestion");l&&(a.preventDefault(),t.value=l.dataset.suggestValue,it(t),n.hidden=!0)})}function pp(t,e,n){const i=t.dataset.gearAdd,s=t.parentElement,r=s==null?void 0:s.querySelector(`[data-gear-panel="${i}"]`);if(!r||!s)return;const o=l=>`<button class="skill-suggestion" data-gear-item="${y(l)}">
      <span class="skill-suggestion-name">${y(l)}</span>
    </button>`,a=()=>{const l=[];for(const c of n)l.push(`<div class="skill-suggestion-header">${y(c.category)}</div>`),c.items.forEach(d=>l.push(o(d)));r.innerHTML=l.join("")};t.addEventListener("click",()=>{if(!r.hidden){r.hidden=!0;return}a(),r.hidden=!1}),t.addEventListener("blur",()=>{r.hidden=!0}),r.addEventListener("mousedown",l=>{const c=l.target.closest(".skill-suggestion");if(!c)return;l.preventDefault();const d=c.dataset.gearItem,h=e.value;e.value=h?`${h}
${d}`:d,it(e),r.hidden=!0,t.focus()})}function mp(t,e){var a;const n=(a=t.closest(".skill-name-wrapper"))==null?void 0:a.querySelector("[data-skill-suggestions]");if(!n)return;const i=document.querySelector(`[data-skill-description="${e}"]`),s=l=>`<button class="skill-suggestion"
      data-skill-name="${y(l.name)}"
      data-skill-attr="${y(l.attribute)}"
      data-skill-desc="${y(l.description)}">
      <span class="skill-suggestion-name">${y(l.name)}</span>
      <span class="skill-suggestion-meta">${y(l.attribute)} · ${y(l.category)}</span>
    </button>`,r=()=>{const l=[];for(const c of Nl){const d=Jt.filter(h=>h.category===c);d.length!==0&&(l.push(`<div class="skill-suggestion-header">${y(c)}</div>`),d.forEach(h=>l.push(s(h))))}n.innerHTML=l.join(""),n.hidden=!1},o=l=>{if(!l){r();return}const c=l.toLowerCase(),d=Jt.filter(f=>f.name.toLowerCase().includes(c)||f.category.toLowerCase().includes(c)).slice(0,12);if(d.length===0){n.hidden=!0;return}const h=Jt.find(f=>f.name.toLowerCase()===c);h&&i&&(i.textContent=h.description,i.hidden=!1),n.innerHTML=d.map(s).join(""),n.hidden=!1};t.addEventListener("input",()=>o(t.value.trim())),t.addEventListener("focus",()=>o(t.value.trim())),t.addEventListener("blur",()=>{n.hidden=!0}),t.addEventListener("keydown",l=>{l.key==="Escape"&&(n.hidden=!0)}),n.addEventListener("mousedown",l=>{const c=l.target.closest(".skill-suggestion");if(!c)return;l.preventDefault(),t.value=c.dataset.skillName,it(t);const d=document.querySelector(`[data-field="skill.attribute.${e}"]`);d&&c.dataset.skillAttr&&(d.value=c.dataset.skillAttr,it(d)),i&&c.dataset.skillDesc&&(i.textContent=c.dataset.skillDesc,i.hidden=!1),n.hidden=!0})}function gp(t,e){var l;const n=(l=t.closest(".skill-name-wrapper"))==null?void 0:l.querySelector("[data-feat-suggestions]");if(!n)return;const i=document.querySelector(`[data-feat-description="${e}"]`),s=c=>`<button class="skill-suggestion" data-feat-name="${y(c.name)}">
      <span class="skill-suggestion-name">${y(c.name)}</span>
      <span class="skill-suggestion-meta">CyberZen</span>
    </button>`,r=c=>{i&&(i.innerHTML=`<strong>Rule Bender:</strong> ${y(c.ruleBender)}<br><strong>Rule Breaker:</strong> ${y(c.ruleBreaker)}`,i.hidden=!1)},o=()=>{n.innerHTML='<div class="skill-suggestion-header">Matrix Feats</div>'+mt.map(s).join(""),n.hidden=!1},a=c=>{if(!c){o();return}const d=c.toLowerCase(),h=mt.filter(g=>g.name.toLowerCase().includes(d)).slice(0,12);if(h.length===0){n.hidden=!0;return}const f=mt.find(g=>g.name.toLowerCase()===d);f&&r(f),n.innerHTML=h.map(s).join(""),n.hidden=!1};t.addEventListener("input",()=>a(t.value.trim())),t.addEventListener("focus",()=>a(t.value.trim())),t.addEventListener("blur",()=>{n.hidden=!0}),t.addEventListener("keydown",c=>{c.key==="Escape"&&(n.hidden=!0)}),n.addEventListener("mousedown",c=>{const d=c.target.closest(".skill-suggestion");if(!d)return;c.preventDefault();const h=d.dataset.featName;t.value=h,it(t);const f=mt.find(g=>g.name===h);f&&r(f),n.hidden=!0})}async function _p(t,e){u.nftLoading=!0,u.nftError=null,u.nftItems=[],A();try{const n=pa.map(({slug:s,chain:r,filter:o})=>fetch(`https://api.opensea.io/api/v2/chain/${r}/account/${encodeURIComponent(t)}/nfts?collection=${s}&limit=50`,{headers:{"x-api-key":e,accept:"application/json"}}).then(a=>{if(a.status===401)throw new Error("Invalid API key — get a free key at opensea.io/developers");if(a.status===400)throw new Error("Invalid wallet address format");return a.ok?a.json():Promise.reject(new Error(`OpenSea error ${a.status}`))}).then(a=>(a.nfts||[]).map(l=>({...l,_filter:o}))).catch(a=>(u.nftError=a.message,[]))),i=await Promise.all(n);u.nftItems=i.flat(),u.nftItems.length===0&&!u.nftError&&(u.nftError="No Matrix Avatar NFTs found for this wallet.")}catch(n){u.nftError=(n==null?void 0:n.message)??"Failed to load. Check API key and wallet address."}u.nftLoading=!1,A()}async function kr(t,e,n){u.nftLoading=!0,u.nftError=null,n||(u.nftContractItems=[],u.nftContractNext=null),A();const i=jf[t.toLowerCase()];let s="";try{for(const c of["polygon","ethereum"])if((await fetch(`https://api.opensea.io/api/v2/chain/${c}/contract/${t}`,{headers:{"x-api-key":e,accept:"application/json"}})).ok){s=c;break}if(!s)throw new Error("Contract not found on Polygon or Ethereum.");const r=new URL(`https://api.opensea.io/api/v2/chain/${s}/contract/${t}/nfts`);r.searchParams.set("limit","50"),n&&r.searchParams.set("next",n);const o=await fetch(r.toString(),{headers:{"x-api-key":e,accept:"application/json"}});if(o.status===401)throw new Error("Invalid API key");if(!o.ok)throw new Error(`OpenSea error ${o.status}`);const a=await o.json(),l=(a.nfts||[]).map(c=>({...c,contract:t,_filter:i??"contract",_chain:s}));u.nftContractItems=n?[...u.nftContractItems,...l]:l,u.nftContractNext=a.next||null,u.nftContractAddress=t,u.nftContractItems.length===0&&(u.nftError=`No NFTs found for that contract on ${s}.`)}catch(r){u.nftError=(r==null?void 0:r.message)??"Failed to load contract NFTs."}u.nftLoading=!1,A()}function yp(t){return t==="red"?'<span class="nft-badge nft-badge-red">Red Pill</span>':t==="blue"?'<span class="nft-badge nft-badge-blue">Blue Pill</span>':t==="base"?'<span class="nft-badge nft-badge-base">Base</span>':""}function vp(t){return t&&(t.includes("seadn.io")?`${t}?w=600`:t)}function ki(t){const e=y(t.name||`#${t.identifier}`),n=vp(t.display_image_url||t.image_url),i=Kf(t),s=y(nt(t));return`
    <div class="nft-token-card">
      <a class="nft-token-link" href="${y(t.opensea_url||"https://opensea.io")}" target="_blank" rel="noopener noreferrer">
        <div class="nft-token-img">
          ${n?`<img src="${y(n)}" alt="${e}" loading="lazy" />`:'<span class="nft-no-img">No Image</span>'}
        </div>
      </a>
      <div class="nft-token-meta">
        <span class="nft-token-name">${e}</span>
        <div class="nft-token-foot">
          ${yp(t._filter)}
          <button class="nft-bookmark-btn${i?" is-bookmarked":""}"
            data-bookmark-key="${s}"
            title="${i?"Remove bookmark":"Bookmark"}">
            ${i?"★":"☆"}
          </button>
        </div>
      </div>
    </div>
  `}function bp(t,e){return u.nftLoading?'<div class="nft-status-msg">Fetching from OpenSea…</div>':u.nftError&&!t.length?`<div class="nft-status-msg nft-status-error">${y(u.nftError)}</div>`:t.length?`<div class="nft-token-grid">${t.map(ki).join("")}</div>`:`<div class="nft-status-msg">${y(e)}</div>`}function wp(){var e;if(u.nftMode==="bookmarks")return u.nftBookmarks.length?`<div class="nft-token-grid">${u.nftBookmarks.map(ki).join("")}</div>`:'<div class="nft-status-msg">No bookmarks yet. Browse your wallet or a contract and click ☆ to save NFTs here.</div>';if(u.nftMode==="contract"){const n=bp(u.nftContractItems,"Enter a contract address and click Browse."),i=u.nftContractNext&&!u.nftLoading?`<div class="nft-load-more-row">
           <button class="ghost-button" data-action="load-more-nfts">Load 50 more</button>
           <span class="nft-count">${u.nftContractItems.length} loaded</span>
         </div>`:u.nftContractItems.length>0?`<div class="nft-count-row"><span class="nft-count">${u.nftContractItems.length} NFTs loaded</span></div>`:"";return n+i}const t=u.nftFilter==="all"?u.nftItems:u.nftItems.filter(n=>n._filter===u.nftFilter);return u.nftLoading?'<div class="nft-status-msg">Fetching wallet NFTs from OpenSea…</div>':u.nftError&&!u.nftItems.length?`<div class="nft-status-msg nft-status-error">${y(u.nftError)}</div>`:u.nftItems.length?t.length?`<div class="nft-token-grid">${t.map(ki).join("")}</div>`:`<div class="nft-status-msg">No ${((e=pa.find(i=>i.filter===u.nftFilter))==null?void 0:e.label)??"this collection"} NFTs in this wallet.</div>`:""}function Cp(t){const e=va(t);return`
    <div class="phone-screen-off">
      <span class="phone-power-icon">⏻</span>
      <span class="phone-off-label">POWERED OFF</span>
      ${e>0?`<span class="phone-unread-badge">${e} MSG WAITING</span>`:""}
    </div>
  `}function Sp(t){const e=ya(t);return e.length===0?`
      <div class="phone-screen-on-empty">
        <span>NO MESSAGES</span>
        <span>STANDING BY</span>
      </div>
    `:e.map((n,i)=>{const s=new Date(n.sentAt).toLocaleTimeString("en-US",{hour:"2-digit",minute:"2-digit",hour12:!1}),r=!n.readBy.includes(t);return`${i>0?'<div class="phone-msg-divider">───────────</div>':""}
      <div class="phone-msg${r?" phone-msg-new":""}">
        <div class="phone-msg-from">FROM:${y(n.from.toUpperCase())}<span class="phone-msg-time">${s}</span></div>
        <div class="phone-msg-body">&gt;${y(n.body)}</div>
      </div>`}).join("")}const Ep=[{top:"1",sub:""},{top:"2",sub:"ABC"},{top:"3",sub:"DEF"},{top:"4",sub:"GHI"},{top:"5",sub:"JKL"},{top:"6",sub:"MNO"},{top:"7",sub:"PRS"},{top:"8",sub:"TUV"},{top:"9",sub:"WXY"},{top:"*",sub:""},{top:"0",sub:"+"},{top:"#",sub:""}];function kp(t){const e=u.phoneOn,n=e?Sp(t.id):Cp(t.id);return`
    <div class="phone-wrap">
      <div class="phone-device${e?" phone-is-on":""}">
        <div class="phone-antenna"></div>
        <div class="phone-earpiece"></div>
        <div class="phone-screen-bezel">
          <div class="phone-screen">
            <div class="phone-screen-content" id="phone-screen">
              ${n}
            </div>
          </div>
        </div>
        <div class="phone-brand">Z · I · O · N</div>
        <div class="phone-nav-row">
          <div class="phone-softkey"></div>
          <div class="phone-nav-center"><div class="phone-nav-dot"></div></div>
          <div class="phone-softkey"></div>
        </div>
        <div class="phone-keypad">
          ${Ep.map(i=>`<button class="phone-key" tabindex="-1">${i.top}${i.sub?`<span class="phone-key-sub">${i.sub}</span>`:""}</button>`).join("")}
        </div>
        <div class="phone-bottom-row">
          <button class="phone-power-btn" data-action="phone-toggle" title="${e?"Power off":"Power on"}">⏻</button>
        </div>
      </div>
      <p class="phone-status-label">${e?"ONLINE · ZION MESH":"PRESS ⏻ TO POWER ON"}</p>
    </div>
  `}function Tp(){const t=[{size:"sm",type:"orange"},{size:"sm",type:"blue"},{size:"sm",type:"green"},{size:"sm",type:"red"},{size:"sm",type:"blue"},{size:"sm",type:"green"},{size:"sm",type:"orange"},{size:"md",type:"blue"},{size:"lg",type:"green"},{size:"xl",type:"orange"},{size:"lg",type:"green"},{size:"md",type:"teal"}],e=t.slice(0,7),n=t.slice(7),i=({size:s,type:r})=>`<div class="op-mon ${s}"><div class="op-mon-screen op-scr-${r}"></div></div>`;return`
    <div class="op-rig-display" aria-hidden="true">
      <div class="op-rig-monitor-wall">
        <div class="op-rig-row">${e.map(i).join("")}</div>
        <div class="op-rig-row">${n.map(i).join("")}</div>
      </div>
    </div>
    <p class="op-rig-caption">OPERATOR STATION · ZION BROADCAST SYSTEM</p>
  `}function Ip(t){const e=t.homeShip||"",n=Me?Object.values(u.sessionChars).filter(l=>l.role!=="Operator"&&(l.homeShip||"")===e):u.characters.filter(l=>l.role!=="Operator"&&(l.homeShip||"")===e),i=y(t.callSign||t.profileName||"Operator"),s=l=>u.messages.filter(c=>c.to==="__operator__"&&c.fromCharId===l&&!c.readBy.includes(t.id)).length,r=l=>u.messages.filter(c=>(c.to===l||c.to==="__all__")&&!c.readBy.includes(l)).length,o=[...t.messageLog||[]].reverse().slice(0,30),a=e?y(e):"unassigned hovership";return`
    <div class="op-monitor">
      ${Tp()}
      <div class="op-monitor-head">
        <p class="eyebrow">Operator · Mission Control</p>
        <h3>Operator's Console</h3>
        <p class="comms-phone-desc">Broadcasting on <strong>${a}</strong>. Only crew assigned to the same hovership will receive your transmissions.</p>
      </div>

      <div class="op-monitor-body">
        <div class="op-crew-panel">
          <p class="op-section-label">Crew Status</p>
          ${n.length===0?`<p class="op-no-crew">No crew on <em>${a}</em>. ${Me?"Crew members must open their Comms tab to appear here.":"Create characters with a matching Hovership name to connect them to this console."}</p>`:n.map(l=>{const c=s(l.id),d=r(l.id),h=l.phoneOn;return`
                  <div class="op-crew-row">
                    <div class="op-crew-info">
                      <span class="op-crew-online ${h?"is-online":"is-offline"}" title="${h?"Phone on":"Phone off"}">${h?"◉":"○"}</span>
                      <span class="op-crew-name">${y(l.profileName||"Unnamed")}</span>
                      <span class="op-crew-role">${y(l.role||"")}</span>
                    </div>
                    <div class="op-crew-status">
                      ${c>0?`<span class="op-crew-badge op-crew-badge-reply" title="${c} unread repl${c===1?"y":"ies"}">${c} ←</span>`:""}
                      ${d>0?`<span class="op-crew-badge op-crew-badge-pending" title="${d} message${d===1?"":"s"} unread">${d} !</span>`:""}
                      ${c===0&&d===0?'<span class="op-crew-idle">—</span>':""}
                    </div>
                  </div>`}).join("")}
        </div>

        <div class="op-compose-panel">
          <p class="op-section-label">Compose Transmission</p>
          <div class="field-grid two-up">
            <label class="field">
              <span>From (Handle)</span>
              <input id="op-from" type="text" value="${i}" placeholder="Tank, Morpheus…" maxlength="24" />
            </label>
            <label class="field">
              <span>To</span>
              <select id="op-recipient">
                <option value="__all__">— ALL CREW —</option>
                ${n.map(l=>`<option value="${l.id}">${y(l.profileName||"Unnamed")}${l.callSign?` · ${y(l.callSign)}`:""}</option>`).join("")}
              </select>
            </label>
          </div>
          <label class="field">
            <span>Message <span class="op-char-count" id="op-count">0 / 501</span></span>
            <textarea id="op-message" rows="3" maxlength="501" placeholder="Transmit a message to connected operatives…"></textarea>
          </label>
          <div class="operator-form-actions">
            <button class="solid-button" data-action="send-operator-message">▶ TRANSMIT</button>
            ${o.length?'<button class="ghost-button" data-action="clear-message-log">Clear Log</button>':""}
          </div>
        </div>
      </div>

      ${o.length?`
        <div class="op-log">
          <p class="op-section-label">Full Transmission Log</p>
          ${o.map(l=>{var f;const c=new Date(l.sentAt).toLocaleTimeString("en-US",{hour:"2-digit",minute:"2-digit",hour12:!1}),d=l.to==="__operator__",h=d?"→ OPERATOR":l.to==="__all__"?"→ ALL CREW":`→ ${y(String(((f=u.characters.find(g=>g.id===l.to))==null?void 0:f.profileName)??l.to))}`;return`<div class="op-log-entry${d?" op-log-incoming":""}">
              <div class="op-log-header">
                <span class="op-log-from">[${y(l.from)}]</span>
                <span class="op-log-meta">${c} ${h}</span>
              </div>
              <span class="op-log-body">${y(l.body)}</span>
            </div>`}).join("")}
        </div>
      `:""}
    </div>
  `}function Ap(t){return`
    <div class="crew-reply-panel">
      <p class="op-section-label">Reply to Operator</p>
      <p class="comms-phone-desc">Send a message directly to your Operator. They will see it on their console.</p>
      <label class="field">
        <span>Message <span class="op-char-count" id="crew-reply-count">0 / 501</span></span>
        <textarea id="crew-reply-msg" rows="3" maxlength="501" placeholder="Operator, I'm at the hardline…"></textarea>
      </label>
      <button class="solid-button" data-action="send-crew-reply" data-char-id="${t.id}">▶ SEND TO OPERATOR</button>
    </div>
  `}function Np(t){const e=[...t.messageLog||[]].reverse().slice(0,30);return e.length?`
    <div class="op-log crew-log">
      <div class="crew-log-header">
        <p class="op-section-label">Transmission Log</p>
        <button class="ghost-button ghost-button-sm" data-action="clear-crew-log">Clear Log</button>
      </div>
      ${e.map(n=>{const i=new Date(n.sentAt).toLocaleTimeString("en-US",{hour:"2-digit",minute:"2-digit",hour12:!1}),s=n.fromCharId===t.id,r=s?"→ OPERATOR":n.to==="__all__"?"← ALL CREW":"← YOU";return`<div class="op-log-entry${s?"":" op-log-incoming"}">
          <div class="op-log-header">
            <span class="op-log-from">[${y(n.from)}]</span>
            <span class="op-log-meta">${i} ${r}</span>
          </div>
          <span class="op-log-body">${y(n.body)}</span>
        </div>`}).join("")}
    </div>
  `:""}function Tr(){return Me?u.firebaseConnected?'<div class="comms-conn-banner comms-conn-online">◉ ZION MESH ONLINE — real-time sync active</div>':'<div class="comms-conn-banner comms-conn-connecting">◎ Connecting to Zion Mesh…</div>':`<div class="comms-conn-banner comms-conn-local">
    ◌ LOCAL MODE — messages stay in this browser only.
    <a href="https://console.firebase.google.com" target="_blank" rel="noopener" class="comms-conn-link">Set up Firebase</a> and fill in <code>src/firebase-config.ts</code> to enable cross-device play.
  </div>`}function Rp(t){return t.role==="Operator"?`
      <section class="sheet-card">
        ${Tr()}
        ${Ip(t)}
      </section>`:`
    <section class="sheet-card">
      ${Tr()}
      <div class="comms-layout">
        <div class="comms-phone-col">
          <p class="eyebrow">Hardline Communications</p>
          <h3>Field Phone</h3>
          <p class="comms-phone-desc">Your connection to the Operator. Power on to receive transmissions.</p>
          ${kp(t)}
        </div>
        <div class="comms-operator-col">
          ${Ap(t)}
          ${Np(t)}
        </div>
      </div>
    </section>
  `}function A(t=!1){const e=Re(),n=ep(e);let i=ip(e),s="hero-view";u.route==="learn"&&(i=sp(),s="learn-view"),u.route==="jack-in"&&(i=fp(e,n),s="jack-in-view"),document.querySelector("#app").innerHTML=`
    <div class="page-shell">
      <header class="site-header">
        <a href="#home" class="brand">The Unofficial Matrix RPG</a>
        <nav class="route-nav">${np()}</nav>
      </header>
      <main class="view-shell" data-view="${s}">
        ${i}
      </main>
    </div>
  `,xp(),t&&requestAnimationFrame(()=>requestAnimationFrame(()=>Il())),Al()}function xp(){var d,h,f,g,_,k,O,B,Y,Z,J,G,Ce,ee,Se;document.querySelectorAll("[data-route]").forEach(p=>{p.addEventListener("click",()=>{Yt(p.dataset.route,{sheetTab:p.dataset.sheetTab})})}),document.querySelectorAll("[data-sheet-tab]").forEach(p=>{p.addEventListener("click",()=>Qf(p.dataset.sheetTab))}),document.querySelectorAll("[data-character-id]").forEach(p=>{p.addEventListener("click",()=>{u.selectedId=p.dataset.characterId,Ee("Character loaded from local storage."),Yt("jack-in")})}),document.querySelectorAll("[data-field]").forEach(p=>{p.addEventListener("input",b=>it(b.currentTarget))}),document.querySelectorAll("[data-attribute]").forEach(p=>{p.addEventListener("input",b=>{const v=b.currentTarget;le(T=>(T.attributes[v.dataset.attribute]=Number(v.value)||0,T))})}),document.querySelectorAll("[data-attribute-toggle]").forEach(p=>{p.addEventListener("change",b=>{const v=b.currentTarget;le(T=>(T.attributes[v.dataset.attributeToggle]=v.checked,T))})}),(d=document.querySelector('[data-action="new-character"]'))==null||d.addEventListener("click",()=>{const p=Ke();u.characters=[p,...u.characters],u.selectedId=p.id,Ue(u.characters),u.sheetTab="identity",Ee("New blank sheet created locally."),Yt("jack-in")}),(h=document.querySelector('[data-action="save-status"]'))==null||h.addEventListener("click",()=>{Ue(u.characters),Ee("All character data saved to this browser on this device."),A()}),(f=document.querySelector('[data-action="export-character"]'))==null||f.addEventListener("click",()=>{tp(Re()),Ee("Character exported as JSON."),A()}),(g=document.querySelector('[data-action="delete-character"]'))==null||g.addEventListener("click",()=>{u.characters.length===1?(u.characters=[Ke()],u.selectedId=u.characters[0].id):(u.characters=u.characters.filter(p=>p.id!==u.selectedId),u.selectedId=u.characters[0].id),Ue(u.characters),Ee("Character deleted from local storage."),A()}),(_=document.querySelector('[data-action="add-skill"]'))==null||_.addEventListener("click",()=>{le(p=>(p.skills.push(ps()),p))}),document.querySelectorAll('input[data-field*="skill.name"]').forEach(p=>{const b=p.dataset.field.split(".")[2];mp(p,b)}),document.querySelectorAll('input[data-field*="feat.name"]').forEach(p=>{const b=p.dataset.field.split(".")[2];gp(p,b)});const t=document.querySelector('[data-field="path"]');t&&Xt(t,[{category:"Paths",items:Ol}]);const e=document.querySelector('[data-field="affiliation"]');e&&Xt(e,[{category:"Affiliations",items:Ml}]);const n=document.querySelector('[data-field="origin"]');n&&Xt(n,[{category:"Origins",items:Ll}]);const i=document.querySelector('[data-field="homeShip"]');i&&Xt(i,[{category:"Ship Types",items:Fl}]);const s={realWorld:[...Rl],matrixLoadout:[...xl],vehicles:[...Pl],contacts:[{category:"Contact Types",items:Dl}]};document.querySelectorAll("[data-gear-add]").forEach(p=>{const b=p.dataset.gearAdd,v=p.closest(".gear-picker-wrapper"),T=v==null?void 0:v.querySelector(`[data-field="gear.${b}"]`),F=s[b];T&&F&&pp(p,T,F)}),(k=document.querySelector('[data-action="add-feat"]'))==null||k.addEventListener("click",()=>{le(p=>(p.matrixFeats.push(ms()),p))}),document.querySelectorAll("[data-remove-skill]").forEach(p=>{p.addEventListener("click",()=>{le(b=>(b.skills=b.skills.filter(v=>v.id!==p.dataset.removeSkill),b))})}),document.querySelectorAll("[data-remove-feat]").forEach(p=>{p.addEventListener("click",()=>{le(b=>(b.matrixFeats=b.matrixFeats.filter(v=>v.id!==p.dataset.removeFeat),b))})}),(O=document.querySelector("#import-json"))==null||O.addEventListener("change",async p=>{var v;const b=(v=p.target.files)==null?void 0:v[0];if(b)try{const T=gs(JSON.parse(await b.text()));T.updatedAt=new Date().toISOString(),u.characters=[T,...u.characters.filter(F=>F.id!==T.id)],u.selectedId=T.id,Ue(u.characters),Ee("Character imported successfully."),Yt("jack-in")}catch{Ee("Import failed. Please use a valid exported JSON character file."),A()}}),document.querySelectorAll("[data-nft-filter]").forEach(p=>{p.addEventListener("click",()=>{u.nftFilter=p.dataset.nftFilter,A()})}),document.querySelectorAll("[data-nft-mode]").forEach(p=>{p.addEventListener("click",()=>{u.nftMode=p.dataset.nftMode,A()})}),(B=document.querySelector('[data-action="load-nfts"]'))==null||B.addEventListener("click",async()=>{const p=document.querySelector('[data-field="nft.walletAddress"]'),b=document.getElementById("nft-api-key"),v=(p==null?void 0:p.value.trim())??"",T=(b==null?void 0:b.value.trim())??"";if(!v){u.nftError="Enter a Polygon wallet address first.",A();return}if(!T){u.nftError="Enter your OpenSea API key. Get a free one at opensea.io/developers.",A();return}Sr(T),await _p(v,T)}),(Y=document.querySelector('[data-action="browse-contract"]'))==null||Y.addEventListener("click",async()=>{const p=document.getElementById("nft-contract-address"),b=document.getElementById("nft-api-key"),v=(p==null?void 0:p.value.trim())??"",T=(b==null?void 0:b.value.trim())??"";if(!v){u.nftError="Enter a contract address first.",A();return}if(!T){u.nftError="Enter your OpenSea API key. Get a free one at opensea.io/developers.",A();return}Sr(T),await kr(v,T)}),(Z=document.querySelector('[data-action="load-more-nfts"]'))==null||Z.addEventListener("click",async()=>{const p=Ei();!p||!u.nftContractAddress||!u.nftContractNext||await kr(u.nftContractAddress,p,u.nftContractNext)}),document.querySelectorAll("[data-bookmark-key]").forEach(p=>{p.addEventListener("click",b=>{b.preventDefault(),b.stopPropagation();const v=p.dataset.bookmarkKey,F=[...u.nftItems,...u.nftContractItems,...u.nftBookmarks].find(ae=>nt(ae)===v);F&&Zf(F)})}),(J=document.querySelector('[data-action="phone-toggle"]'))==null||J.addEventListener("click",()=>{const p=Re();if(u.phoneOn=!u.phoneOn,u.phoneOn&&Yf(p.id),ba(p),A(),u.phoneOn){const b=document.getElementById("phone-screen");b&&(b.scrollTop=b.scrollHeight,Sl(b))}}),(G=document.querySelector('[data-action="send-operator-message"]'))==null||G.addEventListener("click",()=>{const p=document.getElementById("op-from"),b=document.getElementById("op-recipient"),v=document.getElementById("op-message"),T=(p==null?void 0:p.value.trim())||"Operator",F=(b==null?void 0:b.value)||"__all__",ae=(v==null?void 0:v.value.trim())||"";if(!ae)return;const _s=Re();Er(T,_s.id,F,ae,_s.homeShip||""),v&&(v.value="");const ys=document.getElementById("op-count");ys&&(ys.textContent="0 / 501"),requestAnimationFrame(()=>{const vs=document.querySelector(".op-log .op-log-entry");vs&&Is(vs)})}),(Ce=document.querySelector('[data-action="send-crew-reply"]'))==null||Ce.addEventListener("click",()=>{const p=Re(),b=document.getElementById("crew-reply-msg"),v=(b==null?void 0:b.value.trim())||"";if(!v)return;const T=p.callSign||p.profileName||"Unknown";Er(T,p.id,"__operator__",v,p.homeShip||""),b&&(b.value="");const F=document.getElementById("crew-reply-count");F&&(F.textContent="0 / 501"),requestAnimationFrame(()=>{const ae=document.querySelector(".crew-log .op-log-entry");ae&&Is(ae)})}),(ee=document.querySelector('[data-action="clear-message-log"]'))==null||ee.addEventListener("click",()=>{confirm("Delete all transmissions from the Operator log?")&&(u.messages=[],Lt(),le(p=>({...p,messageLog:[]})))}),(Se=document.querySelector('[data-action="clear-crew-log"]'))==null||Se.addEventListener("click",()=>{confirm("Clear your transmission log?")&&le(p=>({...p,messageLog:[]}))});const r=document.getElementById("op-message"),o=document.getElementById("op-count");r&&o&&r.addEventListener("input",()=>{o.textContent=`${r.value.length} / 501`});const a=document.getElementById("crew-reply-msg"),l=document.getElementById("crew-reply-count");a&&l&&a.addEventListener("input",()=>{l.textContent=`${a.value.length} / 501`});const c=document.getElementById("phone-screen");c&&u.phoneOn&&(c.scrollTop=c.scrollHeight)}function it(t){const e=t.dataset.field,n=t.value;le(i=>{const[s,r,o]=e.split(".");return r?s==="gear"||s==="nft"?(i[s][r]=n,i):s==="skill"?(i.skills=i.skills.map(a=>a.id!==o?a:{...a,[r]:r==="rating"?Number(n)||0:n}),i):(s==="feat"&&(i.matrixFeats=i.matrixFeats.map(a=>a.id!==o?a:{...a,[r]:r==="rating"?Number(n)||0:n})),i):(i[e]=t.type==="number"?Number(n)||0:n,i)},!1)}A(!0);
