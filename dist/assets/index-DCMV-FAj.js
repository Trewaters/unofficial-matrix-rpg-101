(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))n(i);new MutationObserver(i=>{for(const r of i)if(r.type==="childList")for(const c of r.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&n(c)}).observe(document,{childList:!0,subtree:!0});function a(i){const r={};return i.integrity&&(r.integrity=i.integrity),i.referrerPolicy&&(r.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?r.credentials="include":i.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(i){if(i.ep)return;i.ep=!0;const r=a(i);fetch(i.href,r)}})();function qe(e,t){e.indexOf(t)===-1&&e.push(t)}const $e=(e,t,a)=>Math.min(Math.max(a,e),t),w={duration:.3,delay:0,endDelay:0,repeat:0,easing:"ease"},V=e=>typeof e=="number",I=e=>Array.isArray(e)&&!V(e[0]),De=(e,t,a)=>{const n=t-e;return((a-e)%n+n)%n+e};function Me(e,t){return I(e)?e[De(0,e.length,t)]:e}const Te=(e,t,a)=>-a*e+a*t+e,ke=()=>{},N=e=>e,ce=(e,t,a)=>t-e===0?1:(a-e)/(t-e);function Ae(e,t){const a=e[e.length-1];for(let n=1;n<=t;n++){const i=ce(0,t,n);e.push(Te(a,1,i))}}function je(e){const t=[0];return Ae(t,e-1),t}function Ue(e,t=je(e.length),a=N){const n=e.length,i=n-t.length;return i>0&&Ae(t,i),r=>{let c=0;for(;c<n-2&&!(r<t[c+1]);c++);let l=$e(0,1,ce(t[c],t[c+1],r));return l=Me(a,c)(l),Te(e[c],e[c+1],l)}}const xe=e=>Array.isArray(e)&&V(e[0]),ie=e=>typeof e=="object"&&!!e.createAnimation,q=e=>typeof e=="function",He=e=>typeof e=="string",H={ms:e=>e*1e3,s:e=>e/1e3},Ne=(e,t,a)=>(((1-3*a+3*t)*e+(3*a-6*t))*e+3*t)*e,Ve=1e-7,ze=12;function Be(e,t,a,n,i){let r,c,l=0;do c=t+(a-t)/2,r=Ne(c,n,i)-e,r>0?a=c:t=c;while(Math.abs(r)>Ve&&++l<ze);return c}function j(e,t,a,n){if(e===t&&a===n)return N;const i=r=>Be(r,0,1,e,a);return r=>r===0||r===1?r:Ne(i(r),t,n)}const Je=(e,t="end")=>a=>{a=t==="end"?Math.min(a,.999):Math.max(a,.001);const n=a*e,i=t==="end"?Math.floor(n):Math.ceil(n);return $e(0,1,i/e)},We={ease:j(.25,.1,.25,1),"ease-in":j(.42,0,1,1),"ease-in-out":j(.42,0,.58,1),"ease-out":j(0,0,.58,1)},Ze=/\((.*?)\)/;function re(e){if(q(e))return e;if(xe(e))return j(...e);const t=We[e];if(t)return t;if(e.startsWith("steps")){const a=Ze.exec(e);if(a){const n=a[1].split(",");return Je(parseFloat(n[0]),n[1].trim())}}return N}class Ee{constructor(t,a=[0,1],{easing:n,duration:i=w.duration,delay:r=w.delay,endDelay:c=w.endDelay,repeat:l=w.repeat,offset:s,direction:d="normal",autoplay:h=!0}={}){if(this.startTime=null,this.rate=1,this.t=0,this.cancelTimestamp=null,this.easing=N,this.duration=0,this.totalDuration=0,this.repeat=0,this.playState="idle",this.finished=new Promise((u,E)=>{this.resolve=u,this.reject=E}),n=n||w.easing,ie(n)){const u=n.createAnimation(a);n=u.easing,a=u.keyframes||a,i=u.duration||i}this.repeat=l,this.easing=I(n)?N:re(n),this.updateDuration(i);const f=Ue(a,s,I(n)?n.map(re):N);this.tick=u=>{var E;r=r;let v=0;this.pauseTime!==void 0?v=this.pauseTime:v=(u-this.startTime)*this.rate,this.t=v,v/=1e3,v=Math.max(v-r,0),this.playState==="finished"&&this.pauseTime===void 0&&(v=this.totalDuration);const O=v/this.duration;let Z=Math.floor(O),k=O%1;!k&&O>=1&&(k=1),k===1&&Z--;const _=Z%2;(d==="reverse"||d==="alternate"&&_||d==="alternate-reverse"&&!_)&&(k=1-k);const D=v>=this.totalDuration?1:Math.min(k,1),F=f(this.easing(D));t(F),this.pauseTime===void 0&&(this.playState==="finished"||v>=this.totalDuration+c)?(this.playState="finished",(E=this.resolve)===null||E===void 0||E.call(this,F)):this.playState!=="idle"&&(this.frameRequestId=requestAnimationFrame(this.tick))},h&&this.play()}play(){const t=performance.now();this.playState="running",this.pauseTime!==void 0?this.startTime=t-this.pauseTime:this.startTime||(this.startTime=t),this.cancelTimestamp=this.startTime,this.pauseTime=void 0,this.frameRequestId=requestAnimationFrame(this.tick)}pause(){this.playState="paused",this.pauseTime=this.t}finish(){this.playState="finished",this.tick(0)}stop(){var t;this.playState="idle",this.frameRequestId!==void 0&&cancelAnimationFrame(this.frameRequestId),(t=this.reject)===null||t===void 0||t.call(this,!1)}cancel(){this.stop(),this.tick(this.cancelTimestamp)}reverse(){this.rate*=-1}commitStyles(){}updateDuration(t){this.duration=t,this.totalDuration=t*(this.repeat+1)}get currentTime(){return this.t}set currentTime(t){this.pauseTime!==void 0||this.rate===0?this.pauseTime=t:this.startTime=performance.now()-t/this.rate}get playbackRate(){return this.rate}set playbackRate(t){this.rate=t}}class _e{setAnimation(t){this.animation=t,t==null||t.finished.then(()=>this.clearAnimation()).catch(()=>{})}clearAnimation(){this.animation=this.generator=void 0}}const te=new WeakMap;function Ce(e){return te.has(e)||te.set(e,{transforms:[],values:new Map}),te.get(e)}function Ye(e,t){return e.has(t)||e.set(t,new _e),e.get(t)}const Ge=["","X","Y","Z"],Ke=["translate","scale","rotate","skew"],Q={x:"translateX",y:"translateY",z:"translateZ"},ge={syntax:"<angle>",initialValue:"0deg",toDefaultUnit:e=>e+"deg"},Xe={translate:{syntax:"<length-percentage>",initialValue:"0px",toDefaultUnit:e=>e+"px"},rotate:ge,scale:{syntax:"<number>",initialValue:1,toDefaultUnit:N},skew:ge},z=new Map,de=e=>`--motion-${e}`,ee=["x","y","z"];Ke.forEach(e=>{Ge.forEach(t=>{ee.push(e+t),z.set(de(e+t),Xe[e])})});const Qe=(e,t)=>ee.indexOf(e)-ee.indexOf(t),et=new Set(ee),Le=e=>et.has(e),tt=(e,t)=>{Q[t]&&(t=Q[t]);const{transforms:a}=Ce(e);qe(a,t),e.style.transform=at(a)},at=e=>e.sort(Qe).reduce(nt,"").trim(),nt=(e,t)=>`${e} ${t}(var(${de(t)}))`,se=e=>e.startsWith("--"),ye=new Set;function it(e){if(!ye.has(e)){ye.add(e);try{const{syntax:t,initialValue:a}=z.has(e)?z.get(e):{};CSS.registerProperty({name:e,inherits:!1,syntax:t,initialValue:a})}catch{}}}const ae=(e,t)=>document.createElement("div").animate(e,t),ve={cssRegisterProperty:()=>typeof CSS<"u"&&Object.hasOwnProperty.call(CSS,"registerProperty"),waapi:()=>Object.hasOwnProperty.call(Element.prototype,"animate"),partialKeyframes:()=>{try{ae({opacity:[1]})}catch{return!1}return!0},finished:()=>!!ae({opacity:[0,1]},{duration:.001}).finished,linearEasing:()=>{try{ae({opacity:0},{easing:"linear(0, 1)"})}catch{return!1}return!0}},ne={},R={};for(const e in ve)R[e]=()=>(ne[e]===void 0&&(ne[e]=ve[e]()),ne[e]);const rt=.015,st=(e,t)=>{let a="";const n=Math.round(t/rt);for(let i=0;i<n;i++)a+=e(ce(0,n-1,i))+", ";return a.substring(0,a.length-2)},we=(e,t)=>q(e)?R.linearEasing()?`linear(${st(e,t)})`:w.easing:xe(e)?ot(e):e,ot=([e,t,a,n])=>`cubic-bezier(${e}, ${t}, ${a}, ${n})`;function lt(e,t){for(let a=0;a<e.length;a++)e[a]===null&&(e[a]=a?e[a-1]:t());return e}const ct=e=>Array.isArray(e)?e:[e];function oe(e){return Q[e]&&(e=Q[e]),Le(e)?de(e):e}const K={get:(e,t)=>{t=oe(t);let a=se(t)?e.style.getPropertyValue(t):getComputedStyle(e)[t];if(!a&&a!==0){const n=z.get(t);n&&(a=n.initialValue)}return a},set:(e,t,a)=>{t=oe(t),se(t)?e.style.setProperty(t,a):e.style[t]=a}};function Oe(e,t=!0){if(!(!e||e.playState==="finished"))try{e.stop?e.stop():(t&&e.commitStyles(),e.cancel())}catch{}}function dt(e,t){var a;let n=(t==null?void 0:t.toDefaultUnit)||N;const i=e[e.length-1];if(He(i)){const r=((a=i.match(/(-?[\d.]+)([a-z%]*)/))===null||a===void 0?void 0:a[2])||"";r&&(n=c=>c+r)}return n}function ut(){return window.__MOTION_DEV_TOOLS_RECORD}function ht(e,t,a,n={},i){const r=ut(),c=n.record!==!1&&r;let l,{duration:s=w.duration,delay:d=w.delay,endDelay:h=w.endDelay,repeat:f=w.repeat,easing:u=w.easing,persist:E=!1,direction:v,offset:O,allowWebkitAcceleration:Z=!1,autoplay:k=!0}=n;const _=Ce(e),D=Le(t);let F=R.waapi();D&&tt(e,t);const S=oe(t),Y=Ye(_.values,S),A=z.get(S);return Oe(Y.animation,!(ie(u)&&Y.generator)&&n.record!==!1),()=>{const G=()=>{var p,M;return(M=(p=K.get(e,S))!==null&&p!==void 0?p:A==null?void 0:A.initialValue)!==null&&M!==void 0?M:0};let m=lt(ct(a),G);const be=dt(m,A);if(ie(u)){const p=u.createAnimation(m,t!=="opacity",G,S,Y);u=p.easing,m=p.keyframes||m,s=p.duration||s}if(se(S)&&(R.cssRegisterProperty()?it(S):F=!1),D&&!R.linearEasing()&&(q(u)||I(u)&&u.some(q))&&(F=!1),F){A&&(m=m.map(C=>V(C)?A.toDefaultUnit(C):C)),m.length===1&&(!R.partialKeyframes()||c)&&m.unshift(G());const p={delay:H.ms(d),duration:H.ms(s),endDelay:H.ms(h),easing:I(u)?void 0:we(u,s),direction:v,iterations:f+1,fill:"both"};l=e.animate({[S]:m,offset:O,easing:I(u)?u.map(C=>we(C,s)):void 0},p),l.finished||(l.finished=new Promise((C,Pe)=>{l.onfinish=C,l.oncancel=Pe}));const M=m[m.length-1];l.finished.then(()=>{E||(K.set(e,S,M),l.cancel())}).catch(ke),Z||(l.playbackRate=1.000001)}else if(i&&D)m=m.map(p=>typeof p=="string"?parseFloat(p):p),m.length===1&&m.unshift(parseFloat(G())),l=new i(p=>{K.set(e,S,be?be(p):p)},m,Object.assign(Object.assign({},n),{duration:s,easing:u}));else{const p=m[m.length-1];K.set(e,S,A&&V(p)?A.toDefaultUnit(p):p)}return c&&r(e,t,m,{duration:s,delay:d,easing:u,repeat:f,offset:O},"motion-one"),Y.setAnimation(l),l&&!k&&l.pause(),l}}const pt=(e,t)=>e[t]?Object.assign(Object.assign({},e),e[t]):Object.assign({},e);function mt(e,t){return typeof e=="string"?e=document.querySelectorAll(e):e instanceof Element&&(e=[e]),Array.from(e||[])}const ft=e=>e(),Fe=(e,t,a=w.duration)=>new Proxy({animations:e.map(ft).filter(Boolean),duration:a,options:t},gt),bt=e=>e.animations[0],gt={get:(e,t)=>{const a=bt(e);switch(t){case"duration":return e.duration;case"currentTime":return H.s((a==null?void 0:a[t])||0);case"playbackRate":case"playState":return a==null?void 0:a[t];case"finished":return e.finished||(e.finished=Promise.all(e.animations.map(yt)).catch(ke)),e.finished;case"stop":return()=>{e.animations.forEach(n=>Oe(n))};case"forEachNative":return n=>{e.animations.forEach(i=>n(i,e))};default:return typeof(a==null?void 0:a[t])>"u"?void 0:()=>e.animations.forEach(n=>n[t]())}},set:(e,t,a)=>{switch(t){case"currentTime":a=H.ms(a);case"playbackRate":for(let n=0;n<e.animations.length;n++)e.animations[n][t]=a;return!0}return!1}},yt=e=>e.finished;function W(e=.1,{start:t=0,from:a=0,easing:n}={}){return(i,r)=>{const c=V(a)?a:vt(a,r),l=Math.abs(c-i);let s=e*l;if(n){const d=r*e;s=re(n)(s/d)*d}return t+s}}function vt(e,t){if(e==="first")return 0;{const a=t-1;return e==="last"?a:a/2}}function wt(e,t,a){return q(e)?e(t,a):e}function St(e){return function(a,n,i={}){a=mt(a);const r=a.length,c=[];for(let l=0;l<r;l++){const s=a[l];for(const d in n){const h=pt(i,d);h.delay=wt(h.delay,l,r);const f=ht(s,d,n[d],h,e);c.push(f)}}return Fe(c,i,i.duration)}}const $t=St(Ee);function Tt(e,t={}){return Fe([()=>{const a=new Ee(e,[0,1],t);return a.finished.catch(()=>{}),a}],t,t.duration)}function y(e,t,a){return(q(e)?Tt:$t)(e,t,a)}function kt(){const e=document.querySelector(".view-shell");e&&y(e,{opacity:[0,1],transform:["scale(0.95) translateY(10px)","scale(1) translateY(0)"]},{duration:.5,easing:"cubic-bezier(0.34, 1.56, 0.64, 1)"})}function At(){const e=document.querySelector(".hero-panel");if(!e)return;const t=e.querySelector(".hero-copy"),a=e.querySelector(".hero-cta-row");t&&y(t,{opacity:[0,1],transform:["translateX(-20px)","translateX(0)"]},{duration:.6,delay:.1,easing:"ease-out"}),a&&y(a,{opacity:[0,1],transform:["translateY(20px)","translateY(0)"]},{duration:.5,delay:.3,easing:"ease-out"})}function xt(){const e=document.querySelectorAll(".hero-grid > section");e.length&&y(e,{opacity:[0,1],transform:["scale(0.9)","scale(1)"]},{duration:.5,delay:W(.1,{start:.2}),easing:"ease-out"})}function Nt(){const e=document.querySelectorAll(".timeline-card");e.length&&y(e,{opacity:[0,1],transform:["translateX(-30px)","translateX(0)"]},{duration:.5,delay:W(.15,{start:.2}),easing:"cubic-bezier(0.34, 1.56, 0.64, 1)"})}function Et(){const e=document.querySelector(".action-banner");e&&y(e,{opacity:[0,1],transform:["scale(0.95)","scale(1)"]},{duration:.6,delay:.4,easing:"ease-out"})}function Ct(){const e=document.querySelectorAll(".roster-card");e.length&&y(e,{opacity:[0,1],transform:["translateY(10px)","translateY(0)"]},{duration:.4,delay:W(.05,{start:.1}),easing:"ease-out"})}function Lt(){const e=document.querySelectorAll(".sheet-card");e.length&&y(e,{opacity:[0,1],transform:["translateY(20px)","translateY(0)"]},{duration:.5,delay:W(.08,{start:.15}),easing:"ease-out"})}function Ot(){const e=document.querySelectorAll(".sheet-tab");e.length&&y(e,{opacity:[0,1],scale:[.95,1]},{duration:.3,delay:W(.05),easing:"ease-out"})}function Ft(){document.querySelectorAll(".pill-button, .ghost-button, .solid-button, .danger-button, .route-link, .sheet-tab").forEach(t=>{t.addEventListener("mouseenter",()=>{y(t,{scale:[1,1.05]},{duration:.2,easing:"ease-out"})}),t.addEventListener("mouseleave",()=>{y(t,{scale:[1.05,1]},{duration:.2,easing:"ease-out"})})})}function Rt(){document.querySelectorAll(".roster-card, .sheet-card, .timeline-card, .hero-panel").forEach(t=>{t.addEventListener("mouseenter",()=>{y(t,{borderColor:"var(--line-strong)"},{duration:.2})}),t.addEventListener("mouseleave",()=>{y(t,{borderColor:"var(--line)"},{duration:.2})})})}function It(){kt(),document.querySelector(".hero-panel.hero-view")&&(At(),setTimeout(xt,200)),document.querySelector(".learn-view")&&(Nt(),setTimeout(Et,300)),document.querySelector(".jack-in-view")&&(Ot(),setTimeout(Lt,100)),setTimeout(Ct,50)}function Pt(){Ft(),Rt()}const le="matrix-rpg-characters-v1",ue=["home","learn","jack-in"],he=["identity","abilities","skills","loadout","notes"],qt=["Common Sense","Focus","Agility","Strength","Endurance","CyberZen"],Dt=["None","Light","Moderate","Serious","Critical","Incapacitated","Dead"],Mt=["RSI Hacker","Operator","Pilot","Captain","Crew","Nomad","Surface Human"],jt=["None","Temporary","Permanent"];function B(){return`char-${Date.now()}-${Math.random().toString(16).slice(2,8)}`}function pe(){return{id:B(),name:"",rating:0,attribute:"Agility",specialization:"",downloadType:"None",notes:""}}function me(){return{id:B(),name:"",rating:0,notes:""}}function P(){return{id:B(),profileName:"New Redpill",callSign:"",realName:"",path:"",role:"RSI Hacker",affiliation:"Zion Resistance",homeShip:"",origin:"",redPillChoice:"Red Pill",background:"",motivation:"",appearance:"",notes:"",attributes:{commonSense:1,focus:1,agility:1,strength:1,endurance:1,cyberZen:0,giftUnlocked:!1},damage:"None",experience:0,karma:0,hardlines:1,matrixFeats:[me()],skills:Array.from({length:6},()=>pe()),gear:{realWorld:"",matrixLoadout:"",contacts:"",vehicles:"",hardlineNotes:""},nft:{walletAddress:"",collectionNotes:""},updatedAt:new Date().toISOString()}}function fe(e={}){const t=P();return{...t,...e,id:e.id||t.id,profileName:e.profileName||t.profileName,attributes:{...t.attributes,...e.attributes},gear:{...t.gear,...e.gear},nft:{...t.nft,...e.nft},skills:Array.isArray(e.skills)&&e.skills.length?e.skills.map(a=>({...pe(),...a,id:a.id||B()})):t.skills,matrixFeats:Array.isArray(e.matrixFeats)&&e.matrixFeats.length?e.matrixFeats.map(a=>({...me(),...a,id:a.id||B()})):t.matrixFeats,updatedAt:e.updatedAt||t.updatedAt}}function Re(){const e=window.location.hash.replace("#","")||"home";return ue.includes(e)?e:"home"}function Ut(){try{const e=window.localStorage.getItem(le);if(!e){const a=P();return window.localStorage.setItem(le,JSON.stringify([a])),[a]}const t=JSON.parse(e);return!Array.isArray(t)||!t.length?[P()]:t.map(a=>fe(a))}catch{return[P()]}}function U(e){window.localStorage.setItem(le,JSON.stringify(e))}const o={characters:Ut(),selectedId:null,status:"Local storage ready.",route:Re(),sheetTab:"identity"};var Se;o.selectedId=((Se=o.characters[0])==null?void 0:Se.id)??null;window.addEventListener("hashchange",()=>{const e=Re();e!==o.route&&(o.route=e,T())});function Ie(){return o.characters.find(e=>e.id===o.selectedId)??o.characters[0]}function x(e){o.status=e}function X(e,t={}){ue.includes(e)&&(o.route=e,t.sheetTab&&he.includes(t.sheetTab)&&(o.sheetTab=t.sheetTab),window.location.hash!==`#${e}`&&(window.location.hash=e),T())}function Ht(e){he.includes(e)&&(o.sheetTab=e,T())}function L(e){o.characters=o.characters.map(t=>{if(t.id!==o.selectedId)return t;const a=e(structuredClone(t));return a.updatedAt=new Date().toISOString(),fe(a)}),U(o.characters),T()}function b({label:e,name:t,value:a,type:n="text",placeholder:i="",min:r=0,max:c=99}){return`
    <label class="field">
      <span>${e}</span>
      <input data-field="${t}" type="${n}" value="${g(String(a??""))}" placeholder="${g(i)}" ${n==="number"?`min="${r}" max="${c}"`:""} />
    </label>
  `}function $({label:e,name:t,value:a,placeholder:n="",rows:i=4}){return`
    <label class="field field-textarea">
      <span>${e}</span>
      <textarea data-field="${t}" rows="${i}" placeholder="${g(n)}">${g(a??"")}</textarea>
    </label>
  `}function J({label:e,name:t,value:a,options:n}){return`
    <label class="field">
      <span>${e}</span>
      <select data-field="${t}">
        ${n.map(i=>`<option value="${g(i)}" ${i===a?"selected":""}>${g(i)}</option>`).join("")}
      </select>
    </label>
  `}function g(e){return String(e).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;")}function Vt(e){const a=(Number(e.attributes.cyberZen)||0)*3,n=Math.floor(a/3),i=a-n,r=e.skills.filter(l=>l.downloadType==="Permanent").length,c=e.skills.filter(l=>l.downloadType==="Temporary").length;return{maxSlots:a,permanentSlots:n,temporarySlots:i,permanentUsed:r,temporaryUsed:c}}function zt(e){const t=new Blob([JSON.stringify(e,null,2)],{type:"application/json"}),a=URL.createObjectURL(t),n=document.createElement("a");n.href=a,n.download=`${(e.profileName||"matrix-character").replace(/\s+/g,"-").toLowerCase()}.json`,n.click(),URL.revokeObjectURL(a)}function Bt(){return ue.map(e=>{const t=e==="jack-in"?"Jack In":e[0].toUpperCase()+e.slice(1);return`<button class="route-link ${o.route===e?"is-active":""}" data-route="${e}">${t}</button>`}).join("")}function Jt(e){return`
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
        <h3>${g(e.profileName||"Unnamed Character")}</h3>
        <p>${g(e.role)} aligned with ${g(e.affiliation||"no faction yet")}.</p>
      </article>
      <article class="summary-card">
        <p class="eyebrow">Local Save</p>
        <h3>${o.characters.length} stored sheet${o.characters.length===1?"":"s"}</h3>
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
  `}function Wt(){return`
    <section class="view-heading">
      <div>
        <p class="eyebrow">Learn The Rules</p>
        <h1>Fast table reference for players</h1>
      </div>
      <p class="status-line">${g(o.status)}</p>
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
  `}function Zt(e){return`
    <aside class="save-rail">
      <div class="save-rail-header">
        <div>
          <p class="eyebrow">Crew Roster</p>
          <h2>Saved Characters</h2>
        </div>
        <button class="ghost-button" data-action="new-character">New Sheet</button>
      </div>

      <div class="roster-list">
        ${o.characters.map(t=>`
              <button class="roster-card ${t.id===e.id?"is-active":""}" data-character-id="${t.id}">
                <strong>${g(t.profileName||"Unnamed Character")}</strong>
                <span>${g(t.role||"Unassigned")}</span>
                <small>${new Date(t.updatedAt).toLocaleString()}</small>
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
  `}function _t(){const e={identity:"Identity",abilities:"Abilities",skills:"Skills",loadout:"Loadout",notes:"Notes"};return he.map(t=>`<button class="sheet-tab ${o.sheetTab===t?"is-active":""}" data-sheet-tab="${t}">${e[t]}</button>`).join("")}function Yt(e){return`
    <section class="sheet-card sheet-card-wide">
      <h3>Identity</h3>
      <div class="field-grid two-up">
        ${b({label:"Profile Name",name:"profileName",value:e.profileName,placeholder:"Neo, Switch, Ghost..."})}
        ${b({label:"Call Sign",name:"callSign",value:e.callSign,placeholder:"Operator tag or street handle"})}
        ${b({label:"Real Name",name:"realName",value:e.realName})}
        ${b({label:"Path",name:"path",value:e.path,placeholder:"Chosen path or archetype"})}
        ${J({label:"Role",name:"role",value:e.role,options:Mt})}
        ${b({label:"Affiliation",name:"affiliation",value:e.affiliation})}
        ${b({label:"Home Ship / Crew",name:"homeShip",value:e.homeShip,placeholder:"Nebuchadnezzar style crew name"})}
        ${b({label:"Origin",name:"origin",value:e.origin,placeholder:"Pod-born, surface-born, nomad..."})}
        ${J({label:"Choice",name:"redPillChoice",value:e.redPillChoice,options:["Red Pill","Blue Pill","Still Deciding"]})}
        ${b({label:"Motivation",name:"motivation",value:e.motivation,placeholder:"Why do they keep fighting?"})}
      </div>
      <div class="field-grid">
        ${$({label:"Background",name:"background",value:e.background,rows:5,placeholder:"How did this character end up here?"})}
        ${$({label:"Appearance / RSI Notes",name:"appearance",value:e.appearance,rows:4,placeholder:"Residual self image, style, tells..."})}
      </div>
    </section>
  `}function Gt(e,t){return`
    <section class="summary-grid builder-summary-grid">
      <article class="summary-card">
        <p class="eyebrow">Damage</p>
        <h3>${g(e.damage)}</h3>
        <p>Current wound state for threshold tracking at the table.</p>
      </article>
      <article class="summary-card">
        <p class="eyebrow">Downloads</p>
        <h3>${t.maxSlots} total slots</h3>
        <p>${t.permanentUsed}/${t.permanentSlots} permanent and ${t.temporaryUsed}/${t.temporarySlots} temporary slots in use.</p>
      </article>
      <article class="summary-card">
        <p class="eyebrow">Hardlines</p>
        <h3>${e.hardlines}</h3>
        <p>Secured connections ready for extraction, equipment, or emergency exit.</p>
      </article>
    </section>

    <section class="sheet-card sheet-card-wide">
      <h3>Attributes And Tracks</h3>
      <div class="attribute-grid">
        ${[["commonSense","Common Sense"],["focus","Focus"],["agility","Agility"],["strength","Strength"],["endurance","Endurance"],["cyberZen","CyberZen"]].map(([a,n])=>`
              <label class="attribute-tile">
                <span>${n}</span>
                <input data-attribute="${a}" type="number" min="0" max="6" value="${e.attributes[a]}" />
              </label>
            `).join("")}
      </div>

      <div class="field-grid four-up compact-grid">
        ${J({label:"Damage",name:"damage",value:e.damage,options:Dt})}
        ${b({label:"Experience",name:"experience",value:e.experience,type:"number",min:0,max:999})}
        ${b({label:"Karma",name:"karma",value:e.karma,type:"number",min:0,max:999})}
        ${b({label:"Secured Hardlines",name:"hardlines",value:e.hardlines,type:"number",min:0,max:20})}
      </div>

      <label class="toggle-row">
        <input data-attribute-toggle="giftUnlocked" type="checkbox" ${e.attributes.giftUnlocked?"checked":""} />
        <span>The Gift is unlocked</span>
      </label>
    </section>
  `}function Kt(e){return`
    <section class="sheet-card sheet-card-wide">
      <div class="section-heading-with-action">
        <h3>Skills</h3>
        <button class="ghost-button" data-action="add-skill">Add Skill</button>
      </div>
      <div class="repeatable-list">
        ${e.skills.map((t,a)=>`
              <article class="repeatable-card">
                <div class="repeatable-head">
                  <strong>Skill ${a+1}</strong>
                  <button class="mini-button" data-remove-skill="${t.id}">Remove</button>
                </div>
                <div class="field-grid four-up compact-grid">
                  ${b({label:"Skill Name",name:`skill.name.${t.id}`,value:t.name,placeholder:"Martial Arts, Programming..."})}
                  ${b({label:"Rating",name:`skill.rating.${t.id}`,value:t.rating,type:"number",min:0,max:6})}
                  ${J({label:"Default Attribute",name:`skill.attribute.${t.id}`,value:t.attribute,options:qt})}
                  ${b({label:"Specialization",name:`skill.specialization.${t.id}`,value:t.specialization,placeholder:"Aikido, Handguns, Stealth..."})}
                  ${J({label:"Download Type",name:`skill.downloadType.${t.id}`,value:t.downloadType,options:jt})}
                </div>
                ${$({label:"Skill Notes",name:`skill.notes.${t.id}`,value:t.notes,rows:2,placeholder:"Table reminders or source of training"})}
              </article>
            `).join("")}
      </div>
    </section>

    <section class="sheet-card sheet-card-wide">
      <div class="section-heading-with-action">
        <h3>Matrix Feats</h3>
        <button class="ghost-button" data-action="add-feat">Add Feat</button>
      </div>
      <div class="repeatable-list">
        ${e.matrixFeats.map((t,a)=>`
              <article class="repeatable-card">
                <div class="repeatable-head">
                  <strong>Feat ${a+1}</strong>
                  <button class="mini-button" data-remove-feat="${t.id}">Remove</button>
                </div>
                <div class="field-grid two-up compact-grid">
                  ${b({label:"Feat Name",name:`feat.name.${t.id}`,value:t.name,placeholder:"Bullet Time, Heal, Sonic Blast..."})}
                  ${b({label:"Rating",name:`feat.rating.${t.id}`,value:t.rating,type:"number",min:0,max:6})}
                </div>
                ${$({label:"Feat Notes",name:`feat.notes.${t.id}`,value:t.notes,rows:2,placeholder:"Rule-bending or rule-breaking effects"})}
              </article>
            `).join("")}
      </div>
    </section>
  `}function Xt(e){return`
    <section class="sheet-card sheet-card-wide">
      <h3>Loadout And Contacts</h3>
      <div class="field-grid two-up">
        ${$({label:"Real World Gear",name:"gear.realWorld",value:e.gear.realWorld,rows:4,placeholder:"Weapons, medkits, tools, hovercraft assets..."})}
        ${$({label:"Matrix Loadout",name:"gear.matrixLoadout",value:e.gear.matrixLoadout,rows:4,placeholder:"Downloaded weapons, fake IDs, clothes, vehicles..."})}
        ${$({label:"Contacts",name:"gear.contacts",value:e.gear.contacts,rows:3,placeholder:"Fixers, captains, operators, informants..."})}
        ${$({label:"Vehicles / Frames",name:"gear.vehicles",value:e.gear.vehicles,rows:3,placeholder:"Hovercraft, bikes, APCs, sentinels..."})}
      </div>
      ${$({label:"Hardline Notes",name:"gear.hardlineNotes",value:e.gear.hardlineNotes,rows:4,placeholder:"Exit points, backups, dangerous zones..."})}
    </section>
  `}function Qt(e){return`
    <section class="sheet-card sheet-card-wide">
      <h3>Campaign Notes And Future NFT Viewer</h3>
      <div class="field-grid two-up">
        ${$({label:"Session Notes",name:"notes",value:e.notes,rows:7,placeholder:"Mission goals, betrayals, unresolved hooks..."})}
        <div class="nft-card">
          <p class="eyebrow">Future ETH Hook</p>
          <h4>Matrix NFT viewing placeholder</h4>
          <p class="nft-copy">The app already reserves character-level wallet and collection metadata so a later update can plug in wallet connect and read-only NFT display without changing the saved character format.</p>
          ${b({label:"Wallet Address",name:"nft.walletAddress",value:e.nft.walletAddress,placeholder:"0x..."})}
          ${$({label:"Collection Notes",name:"nft.collectionNotes",value:e.nft.collectionNotes,rows:3,placeholder:"Collection name, token IDs, display preferences..."})}
          <button class="ghost-button" type="button" data-action="nft-placeholder">Prepare NFT Viewer Later</button>
        </div>
      </div>
    </section>
  `}function ea(e,t){return o.sheetTab==="identity"?Yt(e):o.sheetTab==="abilities"?Gt(e,t):o.sheetTab==="skills"?Kt(e):o.sheetTab==="loadout"?Xt(e):Qt(e)}function ta(e,t){return`
    <section class="builder-hero">
      <div>
        <p class="eyebrow">Jack In</p>
        <h1>${g(e.profileName||"Unnamed Character")}</h1>
        <p class="hero-text">Build the operative in stages instead of working through one giant page. Each tab focuses on one slice of the sheet.</p>
      </div>
      <div class="download-summary">
        <span>Download slots: ${t.maxSlots}</span>
        <span>Permanent: ${t.permanentUsed}/${t.permanentSlots}</span>
        <span>Temporary: ${t.temporaryUsed}/${t.temporarySlots}</span>
      </div>
    </section>

    <section class="builder-layout">
      ${Zt(e)}

      <section class="sheet-panel">
        <div class="sheet-toolbar">
          <div class="sheet-tab-bar">${_t()}</div>
          <p class="status-line">${g(o.status)}</p>
        </div>
        ${ea(e,t)}
      </section>
    </section>
  `}function T(){const e=Ie(),t=Vt(e);let a=Jt(e),n="hero-view";o.route==="learn"&&(a=Wt(),n="learn-view"),o.route==="jack-in"&&(a=ta(e,t),n="jack-in-view"),document.querySelector("#app").innerHTML=`
    <div class="page-shell">
      <header class="site-header">
        <a href="#home" class="brand">The Unofficial Matrix RPG</a>
        <nav class="route-nav">${Bt()}</nav>
      </header>
      <main class="view-shell" data-view="${n}">
        ${a}
      </main>
    </div>
  `,aa(),It(),Pt()}function aa(){var e,t,a,n,i,r,c,l;document.querySelectorAll("[data-route]").forEach(s=>{s.addEventListener("click",()=>{X(s.dataset.route,{sheetTab:s.dataset.sheetTab})})}),document.querySelectorAll("[data-sheet-tab]").forEach(s=>{s.addEventListener("click",()=>Ht(s.dataset.sheetTab))}),document.querySelectorAll("[data-character-id]").forEach(s=>{s.addEventListener("click",()=>{o.selectedId=s.dataset.characterId,x("Character loaded from local storage."),X("jack-in")})}),document.querySelectorAll("[data-field]").forEach(s=>{s.addEventListener("input",d=>na(d.currentTarget))}),document.querySelectorAll("[data-attribute]").forEach(s=>{s.addEventListener("input",d=>{const h=d.currentTarget;L(f=>(f.attributes[h.dataset.attribute]=Number(h.value)||0,f))})}),document.querySelectorAll("[data-attribute-toggle]").forEach(s=>{s.addEventListener("change",d=>{const h=d.currentTarget;L(f=>(f.attributes[h.dataset.attributeToggle]=h.checked,f))})}),(e=document.querySelector('[data-action="new-character"]'))==null||e.addEventListener("click",()=>{const s=P();o.characters=[s,...o.characters],o.selectedId=s.id,U(o.characters),o.sheetTab="identity",x("New blank sheet created locally."),X("jack-in")}),(t=document.querySelector('[data-action="save-status"]'))==null||t.addEventListener("click",()=>{U(o.characters),x("All character data saved to this browser on this device."),T()}),(a=document.querySelector('[data-action="export-character"]'))==null||a.addEventListener("click",()=>{zt(Ie()),x("Character exported as JSON."),T()}),(n=document.querySelector('[data-action="delete-character"]'))==null||n.addEventListener("click",()=>{o.characters.length===1?(o.characters=[P()],o.selectedId=o.characters[0].id):(o.characters=o.characters.filter(s=>s.id!==o.selectedId),o.selectedId=o.characters[0].id),U(o.characters),x("Character deleted from local storage."),T()}),(i=document.querySelector('[data-action="add-skill"]'))==null||i.addEventListener("click",()=>{L(s=>(s.skills.push(pe()),s))}),(r=document.querySelector('[data-action="add-feat"]'))==null||r.addEventListener("click",()=>{L(s=>(s.matrixFeats.push(me()),s))}),document.querySelectorAll("[data-remove-skill]").forEach(s=>{s.addEventListener("click",()=>{L(d=>(d.skills=d.skills.filter(h=>h.id!==s.dataset.removeSkill),d))})}),document.querySelectorAll("[data-remove-feat]").forEach(s=>{s.addEventListener("click",()=>{L(d=>(d.matrixFeats=d.matrixFeats.filter(h=>h.id!==s.dataset.removeFeat),d))})}),(c=document.querySelector("#import-json"))==null||c.addEventListener("change",async s=>{var h;const d=(h=s.target.files)==null?void 0:h[0];if(d)try{const f=fe(JSON.parse(await d.text()));f.updatedAt=new Date().toISOString(),o.characters=[f,...o.characters.filter(u=>u.id!==f.id)],o.selectedId=f.id,U(o.characters),x("Character imported successfully."),X("jack-in")}catch{x("Import failed. Please use a valid exported JSON character file."),T()}}),(l=document.querySelector('[data-action="nft-placeholder"]'))==null||l.addEventListener("click",()=>{x("NFT viewer placeholder saved. Wallet connect can be wired into this character schema later."),T()})}function na(e){const t=e.dataset.field,a=e.value;L(n=>{const[i,r,c]=t.split(".");return r?i==="gear"||i==="nft"?(n[i][r]=a,n):i==="skill"?(n.skills=n.skills.map(l=>l.id!==c?l:{...l,[r]:r==="rating"?Number(a)||0:a}),n):(i==="feat"&&(n.matrixFeats=n.matrixFeats.map(l=>l.id!==c?l:{...l,[r]:r==="rating"?Number(a)||0:a})),n):(n[t]=e.type==="number"?Number(a)||0:a,n)})}T();
