(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))n(r);new MutationObserver(r=>{for(const i of r)if(i.type==="childList")for(const d of i.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&n(d)}).observe(document,{childList:!0,subtree:!0});function a(r){const i={};return r.integrity&&(i.integrity=r.integrity),r.referrerPolicy&&(i.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?i.credentials="include":r.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function n(r){if(r.ep)return;r.ep=!0;const i=a(r);fetch(r.href,i)}})();function Ze(e,t){e.indexOf(t)===-1&&e.push(t)}const Ee=(e,t,a)=>Math.min(Math.max(a,e),t),C={duration:.3,delay:0,endDelay:0,repeat:0,easing:"ease"},U=e=>typeof e=="number",P=e=>Array.isArray(e)&&!U(e[0]),Ge=(e,t,a)=>{const n=t-e;return((a-e)%n+n)%n+e};function Ke(e,t){return P(e)?e[Ge(0,e.length,t)]:e}const Be=(e,t,a)=>-a*e+a*t+e,Fe=()=>{},B=e=>e,pe=(e,t,a)=>t-e===0?1:(a-e)/(t-e);function Me(e,t){const a=e[e.length-1];for(let n=1;n<=t;n++){const r=pe(0,t,n);e.push(Be(a,1,r))}}function Ue(e){const t=[0];return Me(t,e-1),t}function Ve(e,t=Ue(e.length),a=B){const n=e.length,r=n-t.length;return r>0&&Me(t,r),i=>{let d=0;for(;d<n-2&&!(i<t[d+1]);d++);let o=Ee(0,1,pe(t[d],t[d+1],i));return o=Ke(a,d)(o),Be(e[d],e[d+1],o)}}const Ie=e=>Array.isArray(e)&&U(e[0]),de=e=>typeof e=="object"&&!!e.createAnimation,D=e=>typeof e=="function",We=e=>typeof e=="string",K={ms:e=>e*1e3,s:e=>e/1e3},Le=(e,t,a)=>(((1-3*a+3*t)*e+(3*a-6*t))*e+3*t)*e,ze=1e-7,Je=12;function _e(e,t,a,n,r){let i,d,o=0;do d=t+(a-t)/2,i=Le(d,n,r)-e,i>0?a=d:t=d;while(Math.abs(i)>ze&&++o<Je);return d}function O(e,t,a,n){if(e===t&&a===n)return B;const r=i=>_e(i,0,1,e,a);return i=>i===0||i===1?i:Le(r(i),t,n)}const Ye=(e,t="end")=>a=>{a=t==="end"?Math.min(a,.999):Math.max(a,.001);const n=a*e,r=t==="end"?Math.floor(n):Math.ceil(n);return Ee(0,1,r/e)},Xe={ease:O(.25,.1,.25,1),"ease-in":O(.42,0,1,1),"ease-in-out":O(.42,0,.58,1),"ease-out":O(0,0,.58,1)},Qe=/\((.*?)\)/;function ue(e){if(D(e))return e;if(Ie(e))return O(...e);const t=Xe[e];if(t)return t;if(e.startsWith("steps")){const a=Qe.exec(e);if(a){const n=a[1].split(",");return Ye(parseFloat(n[0]),n[1].trim())}}return B}class Re{constructor(t,a=[0,1],{easing:n,duration:r=C.duration,delay:i=C.delay,endDelay:d=C.endDelay,repeat:o=C.repeat,offset:s,direction:c="normal",autoplay:g=!0}={}){if(this.startTime=null,this.rate=1,this.t=0,this.cancelTimestamp=null,this.easing=B,this.duration=0,this.totalDuration=0,this.repeat=0,this.playState="idle",this.finished=new Promise((p,l)=>{this.resolve=p,this.reject=l}),n=n||C.easing,de(n)){const p=n.createAnimation(a);n=p.easing,a=p.keyframes||a,r=p.duration||r}this.repeat=o,this.easing=P(n)?B:ue(n),this.updateDuration(r);const f=Ve(a,s,P(n)?n.map(ue):B);this.tick=p=>{var l;i=i;let m=0;this.pauseTime!==void 0?m=this.pauseTime:m=(p-this.startTime)*this.rate,this.t=m,m/=1e3,m=Math.max(m-i,0),this.playState==="finished"&&this.pauseTime===void 0&&(m=this.totalDuration);const y=m/this.duration;let w=Math.floor(y),k=y%1;!k&&y>=1&&(k=1),k===1&&w--;const _=w%2;(c==="reverse"||c==="alternate"&&_||c==="alternate-reverse"&&!_)&&(k=1-k);const q=m>=this.totalDuration?1:Math.min(k,1),L=f(this.easing(q));t(L),this.pauseTime===void 0&&(this.playState==="finished"||m>=this.totalDuration+d)?(this.playState="finished",(l=this.resolve)===null||l===void 0||l.call(this,L)):this.playState!=="idle"&&(this.frameRequestId=requestAnimationFrame(this.tick))},g&&this.play()}play(){const t=performance.now();this.playState="running",this.pauseTime!==void 0?this.startTime=t-this.pauseTime:this.startTime||(this.startTime=t),this.cancelTimestamp=this.startTime,this.pauseTime=void 0,this.frameRequestId=requestAnimationFrame(this.tick)}pause(){this.playState="paused",this.pauseTime=this.t}finish(){this.playState="finished",this.tick(0)}stop(){var t;this.playState="idle",this.frameRequestId!==void 0&&cancelAnimationFrame(this.frameRequestId),(t=this.reject)===null||t===void 0||t.call(this,!1)}cancel(){this.stop(),this.tick(this.cancelTimestamp)}reverse(){this.rate*=-1}commitStyles(){}updateDuration(t){this.duration=t,this.totalDuration=t*(this.repeat+1)}get currentTime(){return this.t}set currentTime(t){this.pauseTime!==void 0||this.rate===0?this.pauseTime=t:this.startTime=performance.now()-t/this.rate}get playbackRate(){return this.rate}set playbackRate(t){this.rate=t}}class et{setAnimation(t){this.animation=t,t==null||t.finished.then(()=>this.clearAnimation()).catch(()=>{})}clearAnimation(){this.animation=this.generator=void 0}}const se=new WeakMap;function Pe(e){return se.has(e)||se.set(e,{transforms:[],values:new Map}),se.get(e)}function tt(e,t){return e.has(t)||e.set(t,new et),e.get(t)}const at=["","X","Y","Z"],nt=["translate","scale","rotate","skew"],ie={x:"translateX",y:"translateY",z:"translateZ"},Ce={syntax:"<angle>",initialValue:"0deg",toDefaultUnit:e=>e+"deg"},rt={translate:{syntax:"<length-percentage>",initialValue:"0px",toDefaultUnit:e=>e+"px"},rotate:Ce,scale:{syntax:"<number>",initialValue:1,toDefaultUnit:B},skew:Ce},V=new Map,fe=e=>`--motion-${e}`,oe=["x","y","z"];nt.forEach(e=>{at.forEach(t=>{oe.push(e+t),V.set(fe(e+t),rt[e])})});const it=(e,t)=>oe.indexOf(e)-oe.indexOf(t),ot=new Set(oe),Ne=e=>ot.has(e),st=(e,t)=>{ie[t]&&(t=ie[t]);const{transforms:a}=Pe(e);Ze(a,t),e.style.transform=lt(a)},lt=e=>e.sort(it).reduce(ct,"").trim(),ct=(e,t)=>`${e} ${t}(var(${fe(t)}))`,he=e=>e.startsWith("--"),Te=new Set;function dt(e){if(!Te.has(e)){Te.add(e);try{const{syntax:t,initialValue:a}=V.has(e)?V.get(e):{};CSS.registerProperty({name:e,inherits:!1,syntax:t,initialValue:a})}catch{}}}const le=(e,t)=>document.createElement("div").animate(e,t),Ae={cssRegisterProperty:()=>typeof CSS<"u"&&Object.hasOwnProperty.call(CSS,"registerProperty"),waapi:()=>Object.hasOwnProperty.call(Element.prototype,"animate"),partialKeyframes:()=>{try{le({opacity:[1]})}catch{return!1}return!0},finished:()=>!!le({opacity:[0,1]},{duration:.001}).finished,linearEasing:()=>{try{le({opacity:0},{easing:"linear(0, 1)"})}catch{return!1}return!0}},ce={},R={};for(const e in Ae)R[e]=()=>(ce[e]===void 0&&(ce[e]=Ae[e]()),ce[e]);const ut=.015,ht=(e,t)=>{let a="";const n=Math.round(t/ut);for(let r=0;r<n;r++)a+=e(pe(0,n-1,r))+", ";return a.substring(0,a.length-2)},$e=(e,t)=>D(e)?R.linearEasing()?`linear(${ht(e,t)})`:C.easing:Ie(e)?mt(e):e,mt=([e,t,a,n])=>`cubic-bezier(${e}, ${t}, ${a}, ${n})`;function gt(e,t){for(let a=0;a<e.length;a++)e[a]===null&&(e[a]=a?e[a-1]:t());return e}const pt=e=>Array.isArray(e)?e:[e];function me(e){return ie[e]&&(e=ie[e]),Ne(e)?fe(e):e}const Q={get:(e,t)=>{t=me(t);let a=he(t)?e.style.getPropertyValue(t):getComputedStyle(e)[t];if(!a&&a!==0){const n=V.get(t);n&&(a=n.initialValue)}return a},set:(e,t,a)=>{t=me(t),he(t)?e.style.setProperty(t,a):e.style[t]=a}};function De(e,t=!0){if(!(!e||e.playState==="finished"))try{e.stop?e.stop():(t&&e.commitStyles(),e.cancel())}catch{}}function ft(e,t){var a;let n=(t==null?void 0:t.toDefaultUnit)||B;const r=e[e.length-1];if(We(r)){const i=((a=r.match(/(-?[\d.]+)([a-z%]*)/))===null||a===void 0?void 0:a[2])||"";i&&(n=d=>d+i)}return n}function yt(){return window.__MOTION_DEV_TOOLS_RECORD}function bt(e,t,a,n={},r){const i=yt(),d=n.record!==!1&&i;let o,{duration:s=C.duration,delay:c=C.delay,endDelay:g=C.endDelay,repeat:f=C.repeat,easing:p=C.easing,persist:l=!1,direction:m,offset:y,allowWebkitAcceleration:w=!1,autoplay:k=!0}=n;const _=Pe(e),q=Ne(t);let L=R.waapi();q&&st(e,t);const T=me(t),Y=tt(_.values,T),x=V.get(T);return De(Y.animation,!(de(p)&&Y.generator)&&n.record!==!1),()=>{const X=()=>{var b,H;return(H=(b=Q.get(e,T))!==null&&b!==void 0?b:x==null?void 0:x.initialValue)!==null&&H!==void 0?H:0};let v=gt(pt(a),X);const Se=ft(v,x);if(de(p)){const b=p.createAnimation(v,t!=="opacity",X,T,Y);p=b.easing,v=b.keyframes||v,s=b.duration||s}if(he(T)&&(R.cssRegisterProperty()?dt(T):L=!1),q&&!R.linearEasing()&&(D(p)||P(p)&&p.some(D))&&(L=!1),L){x&&(v=v.map(F=>U(F)?x.toDefaultUnit(F):F)),v.length===1&&(!R.partialKeyframes()||d)&&v.unshift(X());const b={delay:K.ms(c),duration:K.ms(s),endDelay:K.ms(g),easing:P(p)?void 0:$e(p,s),direction:m,iterations:f+1,fill:"both"};o=e.animate({[T]:v,offset:y,easing:P(p)?p.map(F=>$e(F,s)):void 0},b),o.finished||(o.finished=new Promise((F,Oe)=>{o.onfinish=F,o.oncancel=Oe}));const H=v[v.length-1];o.finished.then(()=>{l||(Q.set(e,T,H),o.cancel())}).catch(Fe),w||(o.playbackRate=1.000001)}else if(r&&q)v=v.map(b=>typeof b=="string"?parseFloat(b):b),v.length===1&&v.unshift(parseFloat(X())),o=new r(b=>{Q.set(e,T,Se?Se(b):b)},v,Object.assign(Object.assign({},n),{duration:s,easing:p}));else{const b=v[v.length-1];Q.set(e,T,x&&U(b)?x.toDefaultUnit(b):b)}return d&&i(e,t,v,{duration:s,delay:c,easing:p,repeat:f,offset:y},"motion-one"),Y.setAnimation(o),o&&!k&&o.pause(),o}}const vt=(e,t)=>e[t]?Object.assign(Object.assign({},e),e[t]):Object.assign({},e);function wt(e,t){return typeof e=="string"?e=document.querySelectorAll(e):e instanceof Element&&(e=[e]),Array.from(e||[])}const kt=e=>e(),je=(e,t,a=C.duration)=>new Proxy({animations:e.map(kt).filter(Boolean),duration:a,options:t},Ct),St=e=>e.animations[0],Ct={get:(e,t)=>{const a=St(e);switch(t){case"duration":return e.duration;case"currentTime":return K.s((a==null?void 0:a[t])||0);case"playbackRate":case"playState":return a==null?void 0:a[t];case"finished":return e.finished||(e.finished=Promise.all(e.animations.map(Tt)).catch(Fe)),e.finished;case"stop":return()=>{e.animations.forEach(n=>De(n))};case"forEachNative":return n=>{e.animations.forEach(r=>n(r,e))};default:return typeof(a==null?void 0:a[t])>"u"?void 0:()=>e.animations.forEach(n=>n[t]())}},set:(e,t,a)=>{switch(t){case"currentTime":a=K.ms(a);case"playbackRate":for(let n=0;n<e.animations.length;n++)e.animations[n][t]=a;return!0}return!1}},Tt=e=>e.finished;function J(e=.1,{start:t=0,from:a=0,easing:n}={}){return(r,i)=>{const d=U(a)?a:At(a,i),o=Math.abs(d-r);let s=e*o;if(n){const c=i*e;s=ue(n)(s/c)*c}return t+s}}function At(e,t){if(e==="first")return 0;{const a=t-1;return e==="last"?a:a/2}}function $t(e,t,a){return D(e)?e(t,a):e}function xt(e){return function(a,n,r={}){a=wt(a);const i=a.length,d=[];for(let o=0;o<i;o++){const s=a[o];for(const c in n){const g=vt(r,c);g.delay=$t(g.delay,o,i);const f=bt(s,c,n[c],g,e);d.push(f)}}return je(d,r,r.duration)}}const Et=xt(Re);function Bt(e,t={}){return je([()=>{const a=new Re(e,[0,1],t);return a.finished.catch(()=>{}),a}],t,t.duration)}function S(e,t,a){return(D(e)?Bt:Et)(e,t,a)}function Ft(){const e=document.querySelector(".view-shell");e&&S(e,{opacity:[0,1],transform:["scale(0.95) translateY(10px)","scale(1) translateY(0)"]},{duration:.5,easing:"cubic-bezier(0.34, 1.56, 0.64, 1)"})}function Mt(){const e=document.querySelector(".hero-panel");if(!e)return;const t=e.querySelector(".hero-copy"),a=e.querySelector(".hero-cta-row");t&&S(t,{opacity:[0,1],transform:["translateX(-20px)","translateX(0)"]},{duration:.6,delay:.1,easing:"ease-out"}),a&&S(a,{opacity:[0,1],transform:["translateY(20px)","translateY(0)"]},{duration:.5,delay:.3,easing:"ease-out"})}function It(){const e=document.querySelectorAll(".hero-grid > section");e.length&&S(e,{opacity:[0,1],transform:["scale(0.9)","scale(1)"]},{duration:.5,delay:J(.1,{start:.2}),easing:"ease-out"})}function Lt(){const e=document.querySelectorAll(".timeline-card");e.length&&S(e,{opacity:[0,1],transform:["translateX(-30px)","translateX(0)"]},{duration:.5,delay:J(.15,{start:.2}),easing:"cubic-bezier(0.34, 1.56, 0.64, 1)"})}function Rt(){const e=document.querySelector(".action-banner");e&&S(e,{opacity:[0,1],transform:["scale(0.95)","scale(1)"]},{duration:.6,delay:.4,easing:"ease-out"})}function Pt(){const e=document.querySelectorAll(".roster-card");e.length&&S(e,{opacity:[0,1],transform:["translateY(10px)","translateY(0)"]},{duration:.4,delay:J(.05,{start:.1}),easing:"ease-out"})}function Nt(){const e=document.querySelectorAll(".sheet-card");e.length&&S(e,{opacity:[0,1],transform:["translateY(20px)","translateY(0)"]},{duration:.5,delay:J(.08,{start:.15}),easing:"ease-out"})}function Dt(){const e=document.querySelectorAll(".sheet-tab");e.length&&S(e,{opacity:[0,1],scale:[.95,1]},{duration:.3,delay:J(.05),easing:"ease-out"})}function jt(){document.querySelectorAll(".pill-button, .ghost-button, .solid-button, .danger-button, .route-link, .sheet-tab").forEach(t=>{t.addEventListener("mouseenter",()=>{S(t,{scale:[1,1.05]},{duration:.2,easing:"ease-out"})}),t.addEventListener("mouseleave",()=>{S(t,{scale:[1.05,1]},{duration:.2,easing:"ease-out"})})})}function qt(){document.querySelectorAll(".roster-card, .sheet-card, .timeline-card, .hero-panel").forEach(t=>{t.addEventListener("mouseenter",()=>{S(t,{borderColor:"var(--line-strong)"},{duration:.2})}),t.addEventListener("mouseleave",()=>{S(t,{borderColor:"var(--line)"},{duration:.2})})})}function Ht(){Ft(),document.querySelector(".hero-panel.hero-view")&&(Mt(),setTimeout(It,200)),document.querySelector(".learn-view")&&(Lt(),setTimeout(Rt,300)),document.querySelector(".jack-in-view")&&(Dt(),setTimeout(Nt,100)),setTimeout(Pt,50)}function Ot(){jt(),qt()}const Zt=["Combat","Weapons","Vehicles","Infiltration","Social","Investigative","Physical","Technical","Knowledge","Medical","Survival","Operator"],re=[{name:"Aircraft Piloting",attribute:"Agility",category:"Vehicles",source:"general",description:"Piloting a hovercraft and other vehicles that stay airborne during operation. This includes landing, stopping, combat maneuvers, high speed control, etc."},{name:"Ambidextrous",attribute:"Agility",category:"Physical",source:"general",description:"Ability to use both hands equally well for anything."},{name:"Archery",attribute:"Agility",category:"Weapons",source:"general",description:"Propelling arrows with the use of a bow or crossbow. This will also allow the character to do fletching."},{name:"Balancing Feats",attribute:"Agility",category:"Physical",source:"general",description:"Walk tight ropes, juggle, stack plates, etc."},{name:"Dancing",attribute:"Agility",category:"Physical",source:"general",description:"Ballroom dancing, club dancing, ballet, stage performance, etc."},{name:"Driving",attribute:"Agility",category:"Vehicles",source:"general",description:"See Ground Craft Piloting."},{name:"Ground Craft Piloting",attribute:"Agility",category:"Vehicles",source:"general",description:"There are still some wheeled and tracked vehicles in use. This skill represents the ability to control and pilot such craft."},{name:"Gun Fighting",attribute:"Agility",category:"Combat",source:"general",description:"Weapons that use gunpowder, or explosives, to propel a metal slug at your target. Examples include Handguns, Rifles, Shotguns, Submachine Guns, Assault Rifles, Artillery Guns, and Machine Guns."},{name:"Knife Fighting",attribute:"Agility",category:"Combat",source:"general",description:"Fighting with knives using martial fighting skills like Eskrima, Esgrima Criolla, The Andalusian legacy, or Scherma di Stiletto Siciliano. This is an athletic, close combat form of fighting."},{name:"Martial Arts",attribute:"Agility",category:"Combat",source:"general",description:"Formal hand to hand combat techniques — Aikido, Karate, Ju Jitsu, Kendo, etc. Please pick individual styles as each of your fighting skills."},{name:"Polearm fighting",attribute:"Agility",category:"Combat",source:"general",description:"Fighting with close combat weapons in which the main fighting part of the weapon is on the end of a long shaft. Axes, maces, and morning stars are considered polearms."},{name:"Sleight of hand",attribute:"Agility",category:"Infiltration",source:"general",description:"Tricking the eye to see or not see a hand gesture through deception, magic tricks."},{name:"Blade Fighting",attribute:"Agility",category:"Combat",source:"general",description:"Using bladed weapons. Swords are very popular weapons against the Machines in the Real World, because they have been developed to cut through metal."},{name:"Thai Boxing",attribute:"Agility",category:"Combat",source:"general",description:"Thai boxing, a form of hand to hand combat."},{name:"Throwing Weapons",attribute:"Agility",category:"Weapons",source:"general",description:"The skill to aim, balance, and throw a weapon with deadly effectiveness. Throwing weapons include knives, spears, shurikens, and rocks."},{name:"Escape Bonds",attribute:"Agility",category:"Infiltration",source:"general",description:"The ability to get out of handcuffs, ropes, and avoid being held."},{name:"Sci Fi Weapons",attribute:"Agility",category:"Weapons",source:"general",description:"This skill is specific to the weapon the character is using, such as a Plasma Cannon or Laser Rifle. These types of weapons are so unique that a person has to learn each one individually."},{name:"Acrobatics",attribute:"Agility",category:"Physical",source:"general",description:"Flips, vaults, rolls, and tumbling."},{name:"Acting",attribute:"Common Sense",category:"Social",source:"general",description:"Pretending to be someone else, creating emotions at will."},{name:"Animal Training/Handling",attribute:"Common Sense",category:"Survival",source:"general",description:"Training animals to listen to commands, domesticating animals."},{name:"Bartering",attribute:"Common Sense",category:"Social",source:"general",description:"Used to levy better deals in trades. General knowledge of an item's value."},{name:"Blackmarket",attribute:"Common Sense",category:"Social",source:"general",description:"Locating and bargaining in the black market. The character knows who to talk to and what to say to find or sell on the black market."},{name:"Coercion",attribute:"Common Sense",category:"Social",source:"general",description:"Seduction, manipulation, scamming, intimidation, bluffing to get what they want."},{name:"Conceal",attribute:"Common Sense",category:"Infiltration",source:"general",description:"Hiding objects and self."},{name:"Diplomacy",attribute:"Common Sense",category:"Social",source:"general",description:"The ability to convince others of seeing another point of view, and to cut through red tape easier than others."},{name:"Disguises",attribute:"Common Sense",category:"Infiltration",source:"general",description:"Concealing identity with makeup, clothes, change of appearance."},{name:"Gambling",attribute:"Common Sense",category:"Social",source:"general",description:"Statistically improve chances of winning games."},{name:"Gather Information",attribute:"Common Sense",category:"Social",source:"general",description:"Conversing with others to collect information without notice."},{name:"Guerrilla Tactics",attribute:"Common Sense",category:"Knowledge",source:"general",description:"Irregular warfare with small groups of fighters who use tactics like ambushes, sabotage, element of surprise, and raids."},{name:"History of Zion",attribute:"Common Sense",category:"Knowledge",source:"general",description:"A general knowledge of the human history of Zion, or any city or area of choice."},{name:"Interrogate",attribute:"Common Sense",category:"Social",source:"general",description:"Using force and/or manipulation to obtain information."},{name:"Nomad Clan Customs",attribute:"Common Sense",category:"Knowledge",source:"general",description:"Every nomad clan has special customs and ways of doing things, rituals they must perform, etc. This is a knowledge every clansman must have for her clan."},{name:"Philosophy",attribute:"Common Sense",category:"Knowledge",source:"general",description:"Study of problems in the fields of knowledge, reality, values, morals, mind, and existence. Philosophers address these problems using critical thinking and logic."},{name:"Photography",attribute:"Common Sense",category:"Knowledge",source:"general",description:"Digital or film, journalistic, art, sports, picture composition, and modeling."},{name:"Religion",attribute:"Common Sense",category:"Knowledge",source:"general",description:"Study of religious beliefs, behaviors, holidays, traditions, and religious institutions of a specific religion."},{name:"Remote Piloting",attribute:"Common Sense",category:"Vehicles",source:"general",description:"Controlling anything mechanized with remote access controls. Vehicles can have remotes, sentinel frames can be augmented to have remote control capability also. Must have the skills for the vehicle type that is being piloted."},{name:"Snooping",attribute:"Common Sense",category:"Infiltration",source:"general",description:"Knowledge of how to set up bugging devices, detect hidden microphones, video cameras, etc."},{name:"Stalk",attribute:"Common Sense",category:"Investigative",source:"general",description:"To follow someone unnoticed, shadowing."},{name:"Stealth",attribute:"Common Sense",category:"Infiltration",source:"general",description:"Knowledge of how not to be detected. General camouflage and silence techniques. Hide while moving."},{name:"Surveillance",attribute:"Common Sense",category:"Investigative",source:"general",description:"Build and use security with cameras, motion sensors."},{name:"Thieving",attribute:"Common Sense",category:"Infiltration",source:"general",description:"Stealing, pickpocketing."},{name:"Track",attribute:"Common Sense",category:"Investigative",source:"general",description:"To follow someone who cannot be seen by following a trail or clues of his/her passage."},{name:"Linguist",attribute:"Common Sense",category:"Knowledge",source:"general",description:"Understand basic structure of languages, figure out words and phrases from similarly familiar languages."},{name:"Perception",attribute:"Common Sense",category:"Investigative",source:"general",description:"The ability to notice the common things, and pick out the details and the unexpected. Used by the GM to check whether a character notices something — as simple as seeing a canyon off in the distance, or as critical as noticing an ambush ahead."},{name:"PunkSmithing",attribute:"Common Sense",category:"Technical",source:"general",description:"Designing technology from other scavenged bits of machines and broken things."},{name:"Salvage",attribute:"Common Sense",category:"Survival",source:"general",description:"The ability to, with the right tools, remove and collect things of value from where they are. For example, a character who understands sentinel hardware can remove parts from the frame in a way that preserves their trade value."},{name:"Running",attribute:"Endurance",category:"Physical",source:"general",description:"The knowledge of how to pace oneself and increase running endurance. Most Desert clansmen can run for days with little to no rest."},{name:"Survival",attribute:"Endurance",category:"Survival",source:"general",description:"Knowledge of how to survive in a harsh environment such as the wilderness, jungle, mountains, plains, or desert."},{name:"Ice Desert Survival",attribute:"Endurance",category:"Survival",source:"general",description:"A general knowledge of surface arctic survival, foraging skills, flora & fauna, dangerous weather conditions, ice climbing, and other cold climate knowledge."},{name:"Rock climbing",attribute:"Endurance",category:"Physical",source:"general",description:"The knowledge of things like how to belay, climbing techniques, climbing cracks, lead climbing, placing gear, setting anchors, top rope climbing, climbing communication, self rescue and other essential skills."},{name:"Aiming",attribute:"Focus",category:"Combat",source:"general",description:"Aiming is done in game so the character can have a special effect. On a successful aiming task the PC can have a special roleplay event happen — something the player describes to add to the story."},{name:"Art",attribute:"Focus",category:"Knowledge",source:"general",description:"Creating works of art, drawing and painting, sculptures, airbrushing."},{name:"Biology",attribute:"Focus",category:"Knowledge",source:"general",description:"Knowledge of the science of biology and life forms. Covers genetics to ecosystems."},{name:"Chemistry",attribute:"Focus",category:"Knowledge",source:"general",description:"Knowledge of the science of understanding and mixing chemical elements."},{name:"City Speak",attribute:"Focus",category:"Knowledge",source:"general",description:"The knowledge of the tones, inflections, and general jargon that will get you around in the city. Specify the city that you can use City Speak in."},{name:"Demolitions",attribute:"Focus",category:"Technical",source:"general",description:"Knowledge of how to use demolitions, analyze and disarm bombs, set explosives, and make explosives."},{name:"Electronics",attribute:"Focus",category:"Technical",source:"general",description:"Knowledge of how to operate, analyze, repair, and build electronic devices. The character knows how to mess with do-dads and usually keeps things in general working order."},{name:"Encryption",attribute:"Focus",category:"Technical",source:"general",description:"Encode cryptographic information, crack codes."},{name:"First Aid",attribute:"Focus",category:"Medical",source:"general",description:"Stabilizing wounds, treating minor burns and cuts, CPR."},{name:"Forgery",attribute:"Focus",category:"Infiltration",source:"general",description:"Create duplicates of documents, fake IDs, counterfeiting, etc."},{name:"Geology",attribute:"Focus",category:"Knowledge",source:"general",description:"Science of studying solid earth. Geology gives humans insight into what makes up the earth around them and its origins."},{name:"Gunsmith",attribute:"Focus",category:"Weapons",source:"general",description:"A person who repairs, modifies, designs, or builds guns."},{name:"Hand signals",attribute:"Focus",category:"Knowledge",source:"general",description:"This skill is very specific to small groups. It is used in clans for communicating when the conversation is supposed to be private. Each group has its own set of hand signals."},{name:"Hypnotize",attribute:"Focus",category:"Social",source:"general",description:"Getting people into a mental state that makes them more susceptible to suggestions."},{name:"Law",attribute:"Focus",category:"Knowledge",source:"general",description:"Knowledge of the local laws and legal organizations."},{name:"Leadership",attribute:"Focus",category:"Social",source:"general",description:"Ability to gain the respect of a group of people and make them susceptible to influence."},{name:"Locksmithing",attribute:"Focus",category:"Infiltration",source:"general",description:"Understand locking mechanisms, ability to unlock doors, safes, combination, key, and electronic pads."},{name:"Medical Knowledge",attribute:"Focus",category:"Medical",source:"general",description:"Knowledge of how to stitch people up. An understanding of first aid, battlefield surgery, and proper sterilization techniques. At the teacher level, the character can perform surgery on people."},{name:"Navigate",attribute:"Focus",category:"Knowledge",source:"general",description:"Ability to use navigation equipment to plot and hold a course."},{name:"System Operations",attribute:"Focus",category:"Knowledge",source:"general",description:"The physical and theoretical knowledge of the Machines, sentinels, and frames. The understanding of how they tick, what they do, etc."},{name:"Vehicle Repair (by piloting type)",attribute:"Focus",category:"Vehicles",source:"general",description:"The character can rebuild an engine, set a hovercraft's anti-grav controls. Depending on what it is and the type of equipment one has, the character can fix whatever is in front of them."},{name:"Writing",attribute:"Focus",category:"Knowledge",source:"general",description:"The ability to write down spoken words in one's own language, to organize thoughts into written forms like poetry, prose, fiction, and non-fiction."},{name:"Blacksmith",attribute:"Focus",category:"Technical",source:"general",description:"Metallurgy, melting, and casting new objects from various metals and scraps."},{name:"Boxing",attribute:"Strength",category:"Combat",source:"general",description:"Trained fist fighting."},{name:"Brawling",attribute:"Strength",category:"Combat",source:"general",description:"Untrained street fighting."},{name:"Fitness",attribute:"Strength",category:"Physical",source:"general",description:"Ability to work out and keep physically active to improve health."},{name:"Parkor",attribute:"Strength",category:"Physical",source:"general",description:"A physical discipline which focuses on efficient movement around obstacles."},{name:"Swimming",attribute:"Strength",category:"Physical",source:"general",description:"Studying the mechanics of swimming for extra speed and strength. The knowledge of different swim strokes like freestyle, backstroke, breaststroke, and butterfly."},{name:"Programming",attribute:"Focus",category:"Operator",source:"operator",description:"Being able to read the Matrix code. Use Programming to create simulacra equipment for the Matrix. Operators use Programming Hacks to see the construct for what it is and help RSIs navigate the system."},{name:"Matrix Power Plant Hardware",attribute:"Focus",category:"Operator",source:"operator",description:"Understanding the actual hardware and tech that makes up any construct based technology."}],Z=[{name:"Acute Hearing",attribute:"CyberZen",ruleBender:"The ability to hear sounds that would normally be too low or too far off to hear with normal hearing.",ruleBreaker:"Character can hear any frequency even those that are normally inaudible to human ears."},{name:"Atmospheric Adaptation",attribute:"CyberZen",ruleBender:"Character can breathe noxious gases without any adverse effects. Even though characters can inhale noxious gases they are unable to breathe underwater.",ruleBreaker:"Character can breathe water, noxious fumes/gases, or go without oxygen completely."},{name:"Blindness",attribute:"CyberZen",ruleBender:"The characters must be able to touch their target. With a simple touch the character can make a RSI blind. They can affect a number of targets equal to their Matrix feat rating.",ruleBreaker:"Character can make a redpill RSI blind while they are plugged into the Matrix. The effect lasts as long as the targets stay in the Matrix."},{name:"Change Material",attribute:"CyberZen",ruleBender:"The character has the ability to change the weight, size, and the color of an item temporarily. The item retains its shape and possibly its original function depending on how it is altered (GM's discretion). The character can only affect one item at a time. The objects affected must be smaller than the character.",ruleBreaker:"The character has the ability to alter an object's molecular structure in the Matrix — changing a gun to butter, concrete to water, water to wine, etc. A single object of any size can be changed in this way."},{name:"Control Animal(s)",attribute:"CyberZen",ruleBender:"The character has the ability to lock gazes with an animal and make that particular animal follow his commands.",ruleBreaker:"The character can control more than one animal at a time. Characters are only able to control as many animals as their Matrix feat rating."},{name:"Control Gravity",attribute:"CyberZen",ruleBender:"Character can control how gravity works by increasing or decreasing it on one person or object. They have to touch the object.",ruleBreaker:"Character can control gravity in an area that they can see, equal to their Matrix feat rating in meters."},{name:"Control Plant(s)",attribute:"CyberZen",ruleBender:"Character can touch a plant and make it grow rapidly in a certain direction — like a plant reaching toward the sun, but instant.",ruleBreaker:"Character can make multiple plants grow or wither at will. GM discretion as to whether the character could affect an entire acre or farm of crops."},{name:"Control Weather",attribute:"CyberZen",ruleBender:"Make a rainstorm on a sunny day. The more abnormal or extreme the weather change the more difficult the task roll.",ruleBreaker:"Without changing the entire weather pattern the character can call lightning to strike any spot of their choosing, or call a tornado on a calm day."},{name:"Create Simple Objects",attribute:"CyberZen",ruleBender:"The character can restore simple objects that have been destroyed — for example restoring a burnt candle to its original state. They must touch the item.",ruleBreaker:"The character has the ability to make small simple objects from nothing. Simple objects don't have any moving parts. The character must touch the item being made."},{name:"Disguise",attribute:"CyberZen",ruleBender:"A player can disguise herself to agents and other people within the Matrix. RSI's don't see the character as she is, but rather as she would like to be seen.",ruleBreaker:"Player can change their height and weight, alter appendages, and mimic someone specifically down to the DNA — indiscernible from the original. Characters must stay human."},{name:"Dodging Bullets",attribute:"CyberZen",ruleBender:"Character has an uncanny ability to dodge non-ballistic speed objects. Character can easily dodge bows and arrows.",ruleBreaker:"The character can dodge ballistics and projectiles in the Matrix. When a character uses dodge they cannot perform any other actions that turn."},{name:"Eagle Eyes",attribute:"CyberZen",ruleBender:"Character can see long distances as though they were closer — reading a newspaper a block away as if held in hand. This feat gives extreme tunnel vision while active.",ruleBreaker:"Character's eyes can vary their magnification from normal to the power of an electron microscope. Tunnel vision still applies when using this feat."},{name:"Enhanced Smell",attribute:"CyberZen",ruleBender:"Character smells scents like a bloodhound. They can use this ability to track a person or object by its scent.",ruleBreaker:"A character can use smell to identify anyone they have smelled before, even in disguise. The character is so sensitive they can pick up pheromones similar to how ants follow each other."},{name:"Firestarter",attribute:"CyberZen",ruleBender:"Character is able to increase or decrease the intensity of fire that is already burning. Cannot create flame from nothing.",ruleBreaker:"Character can create fire from nothing. It is easier if they have something to set on fire."},{name:"Flight",attribute:"CyberZen",ruleBender:"Character can glide on air currents without the aid of wings. Gliders are not propelled so they don't move fast unless diving. The character can also turn off this feat to fall normally.",ruleBreaker:"The character can fly like superman."},{name:"Forcefield",attribute:"CyberZen",ruleBender:"The character can create a forcefield around their body that can repel objects, gases, or forces from touching the character. This field is on the surface of the character's body.",ruleBreaker:"Extend this forcefield to others or around a certain area. They only control one forcefield — if using it to protect someone else they are not protected themselves."},{name:"Grow Claws",attribute:"CyberZen",ruleBender:"Alter nails and teeth so they have a razor sharp edge. They can also make them hard as diamonds.",ruleBreaker:"Grow fingernails and toenails longer and stronger like cat claws. Character could even make bone poke through skin in desired areas."},{name:"Heal",attribute:"CyberZen",ruleBender:"Character can roll Endurance to reduce damage up to their CyberZen rating, once per day.",ruleBreaker:"Character can lay hands on another character and allow them to roll their Endurance score to reduce damage even if they have already rolled once in that 24-hour period."},{name:"Increased Attribute",attribute:"CyberZen",ruleBender:"Make a task roll. For each success increase that attribute's dice pool by one die for the remainder of the scene. Cannot increase CyberZen. Total adjustable points equal Matrix Feat rating, split across multiple attributes.",ruleBreaker:"Can also increase CyberZen. No limit to the amount of Attribute points the character can increase."},{name:"Increased Skill",attribute:"CyberZen",ruleBender:"Make a task roll. For each success increase that skill's dice pool by one die for the remainder of the scene. The amount of points that can be adjusted equals the feat's rating.",ruleBreaker:"No limit to the amount of Skill points that the character can increase."},{name:"Invisibility",attribute:"CyberZen",ruleBender:"The character becomes harder for people to see — they can only be spotted if someone is staring directly at them and focusing.",ruleBreaker:"A character can become completely translucent; light travels through them. Clothes and other items the character is wearing are unaffected by this feat."},{name:"Jump",attribute:"CyberZen",ruleBender:"Soften a deadly fall of twenty stories, or jump across extreme distances. You could jump across the Grand Canyon with this feat.",ruleBreaker:"They can jump as far as they want — even for miles — as long as they are moving up and down, not side to side. The difference from flying is they cannot move horizontally through the air."},{name:"Mimic",attribute:"CyberZen",ruleBender:"Character can turn their body into an element they have come in contact with. The body can move like normal but has all the other characteristics of the element copied.",ruleBreaker:"By touching an object, person, animal, or bug the character can become a copy of that thing down to the smallest detail. The character does not have to stay human."},{name:"Mind Control",attribute:"CyberZen",ruleBender:"Character can plant small one-word suggestions into a RSI's mind. Upon a successful roll the bluepill RSI will carry out that suggestion until its completion. The RSI will only follow suggestions that don't hurt them.",ruleBreaker:"The character can possess bluepill RSIs with a psychic link and tell them to do what they want. The character also has the ability to manipulate memories."},{name:"Negate Matrix Feats",attribute:"CyberZen",ruleBender:"Character can temporarily negate the Matrix Feat ability and effects of other RSI's or programs.",ruleBreaker:"The character can permanently negate the Matrix Feat ability and effects of other RSI's or programs."},{name:"Night Vision",attribute:"CyberZen",ruleBender:"Characters determine how night vision works for them: sonar, low light, or heat (infra-red).",ruleBreaker:"Character doesn't need to see. They are completely aware of what is around them as though it were daylight. The character can turn the feat off if they want."},{name:"Pass Through Objects",attribute:"CyberZen",ruleBender:"Character can pass through thick liquids and objects as though they were made of air. Using this in water allows the character to run and move as though on land.",ruleBreaker:"The character can walk through walls and pass through solid objects as though they were made of air."},{name:"Prehensile",attribute:"CyberZen",ruleBender:"Character can use their tongue, feet and ears to grab things as though they were using their hands. The character could use their feet to fire a handgun without difficulty.",ruleBreaker:"Character can grow extra prehensile appendages they can use just like hands — they could even grow an extra arm."},{name:"Psychometry",attribute:"CyberZen",ruleBender:"A character can learn about the past of an object, place, or person by touching it.",ruleBreaker:"A character can learn about the future of an object, place, or person by touching it."},{name:"Shapeshifting",attribute:"CyberZen",ruleBender:"A character can turn into an animal of their choice if they see it while they are shifting.",ruleBreaker:"Character can shapeshift into any animal it has ever seen before, even without the animal present while the character is shifting."},{name:"Sonic Blast",attribute:"CyberZen",ruleBender:"Create a sonic blast that can shatter brittle materials like glass. It can also damage human eardrums or be used to stun an opponent.",ruleBreaker:"Character can use their sonic blast to knock people over and hit things with force. A character could use the sonic blast to lift them up in the air or propel them along in the air."},{name:"Spatial Manipulation (Spatiokinesis)",attribute:"CyberZen",ruleBender:"Character can design a fixed area in the Matrix that allows them to control reality. This area does not change until it is destroyed or reformatted.",ruleBreaker:"Character can manipulate the spatial reality of their immediate area — warp, bend, flip, crush, and otherwise manipulate all physical aspects of space within an area of their choosing, wherever they are."},{name:"Telekinesis",attribute:"CyberZen",ruleBender:"Character has the ability to lift objects up to their own weight if they focus on it. They must see the object.",ruleBreaker:"Character has the ability to lift objects that weigh more than them with their minds, but they must be able to see it."},{name:"Telepathy",attribute:"CyberZen",ruleBender:"Character can read surface thoughts of other RSI's. People can notice when someone is reading their thoughts — it feels like someone is holding your head. Limited to one RSI at a time.",ruleBreaker:"Characters can read any thoughts, even those the RSI tries to hide. This is limited to as many RSIs as their Matrix Feat rating."},{name:"Teleportation",attribute:"CyberZen",ruleBender:"A character can teleport very limited distances. Basically if they can see it they can teleport there.",ruleBreaker:"Can teleport to any destination in the Matrix. Period."},{name:"Time Slow",attribute:"CyberZen",ruleBender:"For limited periods the character can slow down one object or person in the area. The object is slowed down for everyone, not just to the RSI with the Matrix Feat.",ruleBreaker:"The character can slow down the actions of everyone else around them, making the player appear to move faster. Limited to a number of objects not to exceed the Matrix Feat rating."},{name:"True Sight",attribute:"CyberZen",ruleBender:"The character can see random snippets of code. It is up to the GM as to what the character sees — it should be small bits of information.",ruleBreaker:"The character can see all of the simulacrum as Matrix code from within the Matrix."},{name:"Truth Sayer",attribute:"CyberZen",ruleBender:"The character can tell when someone is lying about anything, or when that person thinks they are lying about something.",ruleBreaker:"The character can force a RSI to only tell the truth as far as they know. They don't feel compelled to talk, but anything they say is true and they don't know why."},{name:"Wall Crawling",attribute:"CyberZen",ruleBender:"The character can cling to walls with hands and/or feet like a spider or climbing insect. Smooth or wet surfaces are more difficult. Being completely upside down requires concentration.",ruleBreaker:"The character can cling to ceilings and walls made of any material with any type of surface, slippery or not."},{name:"X-Ray Vision",attribute:"CyberZen",ruleBender:"Not literally using X-Rays. Character can see through thin walls and clothes as though they weren't there.",ruleBreaker:"Character can see through lead and thick concrete as though it were not there."}],Gt=[{category:"Equipment",items:["Desert Suit","Battle Suit (APU)","Thermal Wear (Light)","Thermal Wear (Medium)","Thermal Wear (Heavy)","Dig Dug","Canteen","Desert Tents","Nomad Stick","Climbing Gear","Land Mine","Plastic Explosive","TNT","Ration Packs","Infrared (IR) Goggles","Dark Particle Goggles","First Aid Gear","Punksmith Tools"]},{category:"Hardware",items:["Neural Interface","Skill Chips","Cyber Limbs","Skill Chip Processor","Operator's Broadcast Control Deck","Wifi Decoy"]},{category:"Weapons",items:["Bow","Crossbow","Chain Knife","Survival Knife","Chain Axe","Acid Gun","EMP Cannon","Laser Rifle","Net Gun","Plasma Cannon","Plasma Gun","Chain Sword","Cutter Sword","EMP Grenades","Throwing Knives","Gun Scopes",'Handgun "Fizbang"','Handgun "Gorilla Gun"','Handgun "Popper"','Handgun "Mini Grinder"','Rifle "Copperfield"','Rifle "Dragon Shroud II"','Shotgun "Peabody"','Shotgun "Xtrema"','Shotgun "Jackhammer"','SMG "Kommando"','SMG "Uzi"','Machine Gun "Skoda"','Machine Gun "Mauser Mini Gun"','Assault Rifle "AR-G3"','Assault Rifle "Chow Chat"','Assault Rifle "HK"']},{category:"Vehicles",items:["Speeder Hovercraft","Zion Military Hovercraft","Nomad Hovercraft","Torpedo Hovercraft","Squidi (Sentinel Frame)"]}],Kt=[{category:"Equipment",items:["Cash & Credit Cards","Clothes","Phone","Fake IDs","Sunglasses","Extraction Apparatus","Bug Removal Tool","Beacon"]},{category:"Weapons",items:["Desert Eagle .50 cal","Beretta 92fs 9mm","S&W Revolver .38","H&K MP5","M-16","Mossberg Shotgun","Glock .45","Hand Grenade","RPG","M72 LAW Rocket","APS Machine Pistol","7mm Remington Sniper Rifle","Browning Hunting Rifle","Tanto Survival Knife","Throwing Knives","Ruger .22","Katana","Rapier"]},{category:"Vehicles",items:["Ducati Motorcycle","Harley Davidson Hog","Ferrari Sports Car","Subaru Sedan","Ford Compact Car","Mercedes Luxury Sedan","Jeep SUV","Toyota Mini Van","U-Move Small Truck (20')","Mac Truck (30')"]}],Ut=[{category:"Real World Vehicles",items:["Speeder Hovercraft","Zion Military Hovercraft","Nomad Hovercraft","Torpedo Hovercraft","Squidi (Sentinel Frame)"]},{category:"Simulacra Vehicles",items:["Ducati Motorcycle","Harley Davidson Hog","Ferrari Sports Car","Subaru Sedan","Ford Compact Car","Mercedes Luxury Sedan","Jeep SUV","Toyota Mini Van","U-Move Small Truck (20')","Mac Truck (30')"]}],Vt=["Captain","Operator","Fixer","Informant","Analyst","Smuggler","Medic","Mechanic","Resistance Fighter","Zion Council Member","Black Market Dealer","Bluepill Informant","Underground Hacker","Former Agent"],Wt=["RSI Hacker","Homegrown (Freeborn)","Matrix Operator","Mercenary","Hot Shot Pilot","Punksmith"],zt=["Zion Resistance","Crystal Shard","Utopia","Nomad Clans"],Jt=["Pod-born","Surface-born","Freeborn","Nomad"],_t=["Speeder Hovercraft","Zion Military Hovercraft","Nomad Hovercraft","Torpedo Hovercraft"],ge="matrix-rpg-characters-v1",ye=["home","learn","jack-in"],be=["identity","abilities","skills","loadout","notes"],Yt=["Common Sense","Focus","Agility","Strength","Endurance","CyberZen"],Xt=["None","Light","Moderate","Serious","Critical","Incapacitated","Dead"],Qt=["RSI Hacker","Operator","Pilot","Captain","Crew","Nomad","Surface Human"],ea=["None","Temporary","Permanent"];function W(){return`char-${Date.now()}-${Math.random().toString(16).slice(2,8)}`}function ve(){return{id:W(),name:"",rating:0,attribute:"Agility",specialization:"",downloadType:"None",notes:""}}function we(){return{id:W(),name:"",rating:0,notes:""}}function N(){return{id:W(),profileName:"New Redpill",callSign:"",realName:"",path:"",role:"RSI Hacker",affiliation:"Zion Resistance",homeShip:"",origin:"",redPillChoice:"Red Pill",background:"",motivation:"",appearance:"",notes:"",attributes:{commonSense:1,focus:1,agility:1,strength:1,endurance:1,cyberZen:0,giftUnlocked:!1},damage:"None",experience:0,karma:0,hardlines:1,matrixFeats:[we()],skills:Array.from({length:6},()=>ve()),gear:{realWorld:"",matrixLoadout:"",contacts:"",vehicles:"",hardlineNotes:""},nft:{walletAddress:"",collectionNotes:""},updatedAt:new Date().toISOString()}}function ke(e={}){const t=N();return{...t,...e,id:e.id||t.id,profileName:e.profileName||t.profileName,attributes:{...t.attributes,...e.attributes},gear:{...t.gear,...e.gear},nft:{...t.nft,...e.nft},skills:Array.isArray(e.skills)&&e.skills.length?e.skills.map(a=>({...ve(),...a,id:a.id||W()})):t.skills,matrixFeats:Array.isArray(e.matrixFeats)&&e.matrixFeats.length?e.matrixFeats.map(a=>({...we(),...a,id:a.id||W()})):t.matrixFeats,updatedAt:e.updatedAt||t.updatedAt}}function qe(){const e=window.location.hash.replace("#","")||"home";return ye.includes(e)?e:"home"}function ta(){try{const e=window.localStorage.getItem(ge);if(!e){const a=N();return window.localStorage.setItem(ge,JSON.stringify([a])),[a]}const t=JSON.parse(e);return!Array.isArray(t)||!t.length?[N()]:t.map(a=>ke(a))}catch{return[N()]}}function G(e){window.localStorage.setItem(ge,JSON.stringify(e))}const u={characters:ta(),selectedId:null,status:"Local storage ready.",route:qe(),sheetTab:"identity"};var xe;u.selectedId=((xe=u.characters[0])==null?void 0:xe.id)??null;window.addEventListener("hashchange",()=>{const e=qe();e!==u.route&&(u.route=e,$())});function He(){return u.characters.find(e=>e.id===u.selectedId)??u.characters[0]}function E(e){u.status=e}function ee(e,t={}){ye.includes(e)&&(u.route=e,t.sheetTab&&be.includes(t.sheetTab)&&(u.sheetTab=t.sheetTab),window.location.hash!==`#${e}`&&(window.location.hash=e),$())}function aa(e){be.includes(e)&&(u.sheetTab=e,$())}function M(e,t=!0){u.characters=u.characters.map(a=>{if(a.id!==u.selectedId)return a;const n=e(structuredClone(a));return n.updatedAt=new Date().toISOString(),ke(n)}),G(u.characters),t&&$()}function A({label:e,name:t,value:a,type:n="text",placeholder:r="",min:i=0,max:d=99}){return`
    <label class="field">
      <span>${e}</span>
      <input data-field="${t}" type="${n}" value="${h(String(a??""))}" placeholder="${h(r)}" ${n==="number"?`min="${i}" max="${d}"`:""} />
    </label>
  `}function na(e,t){return`
    <div class="skill-name-wrapper">
      <label class="field">
        <span>Feat Name</span>
        <input data-field="feat.name.${e}" type="text" value="${h(t)}" placeholder="Flight, Telepathy, Heal..." autocomplete="off" />
      </label>
      <div class="skill-suggestions" hidden data-feat-suggestions="${e}"></div>
    </div>
  `}function ra(e,t){return`
    <div class="skill-name-wrapper">
      <label class="field">
        <span>Skill Name</span>
        <input data-field="skill.name.${e}" type="text" value="${h(t)}" placeholder="Martial Arts, Programming..." autocomplete="off" />
      </label>
      <div class="skill-suggestions" hidden data-skill-suggestions="${e}"></div>
    </div>
  `}function te({label:e,name:t,value:a,placeholder:n=""}){return`
    <div class="skill-name-wrapper">
      <label class="field">
        <span>${e}</span>
        <input data-field="${t}" type="text" value="${h(a)}" placeholder="${h(n)}" autocomplete="off" />
      </label>
      <div class="skill-suggestions" hidden data-simple-suggestions="${t}"></div>
    </div>
  `}function ae({label:e,name:t,value:a,placeholder:n="",rows:r=4}){const i=t.split(".").pop();return`
    <div class="gear-picker-wrapper">
      <label class="field field-textarea">
        <span>${e}</span>
        <textarea data-field="${t}" rows="${r}" placeholder="${h(n)}">${h(a??"")}</textarea>
      </label>
      <div class="gear-picker-bar">
        <button class="gear-add-btn" type="button" data-gear-add="${i}">+ Add from list</button>
        <div class="skill-suggestions" hidden data-gear-panel="${i}"></div>
      </div>
    </div>
  `}function I({label:e,name:t,value:a,placeholder:n="",rows:r=4}){return`
    <label class="field field-textarea">
      <span>${e}</span>
      <textarea data-field="${t}" rows="${r}" placeholder="${h(n)}">${h(a??"")}</textarea>
    </label>
  `}function z({label:e,name:t,value:a,options:n}){return`
    <label class="field">
      <span>${e}</span>
      <select data-field="${t}">
        ${n.map(r=>`<option value="${h(r)}" ${r===a?"selected":""}>${h(r)}</option>`).join("")}
      </select>
    </label>
  `}function h(e){return String(e).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;")}function ia(e){const a=(Number(e.attributes.cyberZen)||0)*3,n=Math.floor(a/3),r=a-n,i=e.skills.filter(o=>o.downloadType==="Permanent").length,d=e.skills.filter(o=>o.downloadType==="Temporary").length;return{maxSlots:a,permanentSlots:n,temporarySlots:r,permanentUsed:i,temporaryUsed:d}}function oa(e){const t=new Blob([JSON.stringify(e,null,2)],{type:"application/json"}),a=URL.createObjectURL(t),n=document.createElement("a");n.href=a,n.download=`${(e.profileName||"matrix-character").replace(/\s+/g,"-").toLowerCase()}.json`,n.click(),URL.revokeObjectURL(a)}function sa(){return ye.map(e=>{const t=e==="jack-in"?"Jack In":e[0].toUpperCase()+e.slice(1);return`<button class="route-link ${u.route===e?"is-active":""}" data-route="${e}">${t}</button>`}).join("")}function la(e){return`
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
        <h3>${h(e.profileName||"Unnamed Character")}</h3>
        <p>${h(e.role)} aligned with ${h(e.affiliation||"no faction yet")}.</p>
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
  `}function ca(){return`
    <section class="view-heading">
      <div>
        <p class="eyebrow">Learn The Rules</p>
        <h1>Fast table reference for players</h1>
      </div>
      <p class="status-line">${h(u.status)}</p>
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
  `}function da(e){return`
    <aside class="save-rail">
      <div class="save-rail-header">
        <div>
          <p class="eyebrow">Crew Roster</p>
          <h2>Saved Characters</h2>
        </div>
        <button class="ghost-button" data-action="new-character">New Sheet</button>
      </div>

      <div class="roster-list">
        ${u.characters.map(t=>`
              <button class="roster-card ${t.id===e.id?"is-active":""}" data-character-id="${t.id}">
                <strong>${h(t.profileName||"Unnamed Character")}</strong>
                <span>${h(t.role||"Unassigned")}</span>
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
  `}function ua(){const e={identity:"Identity",abilities:"Abilities",skills:"Skills",loadout:"Loadout",notes:"Notes"};return be.map(t=>`<button class="sheet-tab ${u.sheetTab===t?"is-active":""}" data-sheet-tab="${t}">${e[t]}</button>`).join("")}function ha(e){return`
    <section class="sheet-card sheet-card-wide">
      <h3>Identity</h3>
      <div class="field-grid two-up">
        ${A({label:"Profile Name",name:"profileName",value:e.profileName,placeholder:"Neo, Switch, Ghost..."})}
        ${A({label:"Call Sign",name:"callSign",value:e.callSign,placeholder:"Operator tag or street handle"})}
        ${A({label:"Real Name",name:"realName",value:e.realName})}
        ${te({label:"Path",name:"path",value:e.path,placeholder:"RSI Hacker, Mercenary, Punksmith..."})}
        ${z({label:"Role",name:"role",value:e.role,options:Qt})}
        ${te({label:"Affiliation",name:"affiliation",value:e.affiliation,placeholder:"Zion Resistance, Crystal Shard..."})}
        ${te({label:"Home Ship / Crew",name:"homeShip",value:e.homeShip,placeholder:"Speeder Hovercraft, Nomad Hovercraft..."})}
        ${te({label:"Origin",name:"origin",value:e.origin,placeholder:"Pod-born, Surface-born, Freeborn..."})}
        ${z({label:"Choice",name:"redPillChoice",value:e.redPillChoice,options:["Red Pill","Blue Pill","Still Deciding"]})}
        ${A({label:"Motivation",name:"motivation",value:e.motivation,placeholder:"Why do they keep fighting?"})}
      </div>
      <div class="field-grid">
        ${I({label:"Background",name:"background",value:e.background,rows:5,placeholder:"How did this character end up here?"})}
        ${I({label:"Appearance / RSI Notes",name:"appearance",value:e.appearance,rows:4,placeholder:"Residual self image, style, tells..."})}
      </div>
    </section>
  `}function ma(e,t){return`
    <section class="summary-grid builder-summary-grid">
      <article class="summary-card">
        <p class="eyebrow">Damage</p>
        <h3>${h(e.damage)}</h3>
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
        ${z({label:"Damage",name:"damage",value:e.damage,options:Xt})}
        ${A({label:"Experience",name:"experience",value:e.experience,type:"number",min:0,max:999})}
        ${A({label:"Karma",name:"karma",value:e.karma,type:"number",min:0,max:999})}
        ${A({label:"Secured Hardlines",name:"hardlines",value:e.hardlines,type:"number",min:0,max:20})}
      </div>

      <label class="toggle-row">
        <input data-attribute-toggle="giftUnlocked" type="checkbox" ${e.attributes.giftUnlocked?"checked":""} />
        <span>The Gift is unlocked</span>
      </label>
    </section>
  `}function ga(e){return`
    <section class="sheet-card sheet-card-wide">
      <div class="section-heading-with-action">
        <h3>Skills</h3>
        <button class="ghost-button" data-action="add-skill">Add Skill</button>
      </div>
      <div class="repeatable-list">
        ${e.skills.map((t,a)=>{var r;const n=((r=re.find(i=>i.name===t.name))==null?void 0:r.description)??"";return`
              <article class="repeatable-card">
                <div class="repeatable-head">
                  <strong>Skill ${a+1}</strong>
                  <button class="mini-button" data-remove-skill="${t.id}">Remove</button>
                </div>
                <div class="field-grid four-up compact-grid">
                  ${ra(t.id,t.name)}
                  ${A({label:"Rating",name:`skill.rating.${t.id}`,value:t.rating,type:"number",min:0,max:6})}
                  ${z({label:"Default Attribute",name:`skill.attribute.${t.id}`,value:t.attribute,options:Yt})}
                  ${A({label:"Specialization",name:`skill.specialization.${t.id}`,value:t.specialization,placeholder:"Aikido, Handguns, Stealth..."})}
                  ${z({label:"Download Type",name:`skill.downloadType.${t.id}`,value:t.downloadType,options:ea})}
                </div>
                <p class="skill-description" data-skill-description="${t.id}"${n?"":" hidden"}>${h(n)}</p>
                ${I({label:"Skill Notes",name:`skill.notes.${t.id}`,value:t.notes,rows:2,placeholder:"Table reminders or source of training"})}
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
        ${e.matrixFeats.map((t,a)=>{const n=Z.find(i=>i.name===t.name),r=n?`<strong>Rule Bender:</strong> ${h(n.ruleBender)}<br><strong>Rule Breaker:</strong> ${h(n.ruleBreaker)}`:"";return`
              <article class="repeatable-card">
                <div class="repeatable-head">
                  <strong>Feat ${a+1}</strong>
                  <button class="mini-button" data-remove-feat="${t.id}">Remove</button>
                </div>
                <div class="field-grid two-up compact-grid">
                  ${na(t.id,t.name)}
                  ${A({label:"Rating",name:`feat.rating.${t.id}`,value:t.rating,type:"number",min:0,max:6})}
                </div>
                <div class="skill-description" data-feat-description="${t.id}"${n?"":" hidden"}>${r}</div>
                ${I({label:"Feat Notes",name:`feat.notes.${t.id}`,value:t.notes,rows:2,placeholder:"Rule-bending or rule-breaking effects"})}
              </article>
            `}).join("")}
      </div>
    </section>
  `}function pa(e){return`
    <section class="sheet-card sheet-card-wide">
      <h3>Loadout And Contacts</h3>
      <div class="field-grid two-up">
        ${ae({label:"Real World Gear",name:"gear.realWorld",value:e.gear.realWorld,rows:4,placeholder:"Weapons, medkits, tools, hovercraft assets..."})}
        ${ae({label:"Matrix Loadout",name:"gear.matrixLoadout",value:e.gear.matrixLoadout,rows:4,placeholder:"Downloaded weapons, fake IDs, clothes, vehicles..."})}
        ${ae({label:"Contacts",name:"gear.contacts",value:e.gear.contacts,rows:3,placeholder:"Fixers, captains, operators, informants..."})}
        ${ae({label:"Vehicles / Frames",name:"gear.vehicles",value:e.gear.vehicles,rows:3,placeholder:"Hovercraft, bikes, APCs, sentinels..."})}
      </div>
      ${I({label:"Hardline Notes",name:"gear.hardlineNotes",value:e.gear.hardlineNotes,rows:4,placeholder:"Exit points, backups, dangerous zones..."})}
    </section>
  `}function fa(e){return`
    <section class="sheet-card sheet-card-wide">
      <h3>Campaign Notes And Future NFT Viewer</h3>
      <div class="field-grid two-up">
        ${I({label:"Session Notes",name:"notes",value:e.notes,rows:7,placeholder:"Mission goals, betrayals, unresolved hooks..."})}
        <div class="nft-card">
          <p class="eyebrow">Future ETH Hook</p>
          <h4>Matrix NFT viewing placeholder</h4>
          <p class="nft-copy">The app already reserves character-level wallet and collection metadata so a later update can plug in wallet connect and read-only NFT display without changing the saved character format.</p>
          ${A({label:"Wallet Address",name:"nft.walletAddress",value:e.nft.walletAddress,placeholder:"0x..."})}
          ${I({label:"Collection Notes",name:"nft.collectionNotes",value:e.nft.collectionNotes,rows:3,placeholder:"Collection name, token IDs, display preferences..."})}
          <button class="ghost-button" type="button" data-action="nft-placeholder">Prepare NFT Viewer Later</button>
        </div>
      </div>
    </section>
  `}function ya(e,t){return u.sheetTab==="identity"?ha(e):u.sheetTab==="abilities"?ma(e,t):u.sheetTab==="skills"?ga(e):u.sheetTab==="loadout"?pa(e):fa(e)}function ba(e,t){return`
    <section class="builder-hero">
      <div>
        <p class="eyebrow">Jack In</p>
        <h1>${h(e.profileName||"Unnamed Character")}</h1>
        <p class="hero-text">Build the operative in stages instead of working through one giant page. Each tab focuses on one slice of the sheet.</p>
      </div>
      <div class="download-summary">
        <span>Download slots: ${t.maxSlots}</span>
        <span>Permanent: ${t.permanentUsed}/${t.permanentSlots}</span>
        <span>Temporary: ${t.temporaryUsed}/${t.temporarySlots}</span>
      </div>
    </section>

    <section class="builder-layout">
      ${da(e)}

      <section class="sheet-panel">
        <div class="sheet-toolbar">
          <div class="sheet-tab-bar">${ua()}</div>
          <p class="status-line">${h(u.status)}</p>
        </div>
        ${ya(e,t)}
      </section>
    </section>
  `}function ne(e,t){var d;const a=(d=e.closest(".skill-name-wrapper"))==null?void 0:d.querySelector(".skill-suggestions");if(!a)return;const n=o=>`<button class="skill-suggestion" data-suggest-value="${h(o)}">
      <span class="skill-suggestion-name">${h(o)}</span>
    </button>`,r=()=>{const o=[];for(const s of t)o.push(`<div class="skill-suggestion-header">${h(s.category)}</div>`),s.items.forEach(c=>o.push(n(c)));a.innerHTML=o.join(""),a.hidden=!1},i=o=>{if(!o){r();return}const s=o.toLowerCase(),g=t.flatMap(f=>[...f.items]).filter(f=>f.toLowerCase().includes(s)).slice(0,14);if(g.length===0){a.hidden=!0;return}a.innerHTML=g.map(n).join(""),a.hidden=!1};e.addEventListener("input",()=>i(e.value.trim())),e.addEventListener("focus",()=>i(e.value.trim())),e.addEventListener("blur",()=>{a.hidden=!0}),e.addEventListener("keydown",o=>{o.key==="Escape"&&(a.hidden=!0)}),a.addEventListener("mousedown",o=>{const s=o.target.closest(".skill-suggestion");s&&(o.preventDefault(),e.value=s.dataset.suggestValue,j(e),a.hidden=!0)})}function va(e,t,a){const n=e.dataset.gearAdd,r=e.parentElement,i=r==null?void 0:r.querySelector(`[data-gear-panel="${n}"]`);if(!i||!r)return;const d=s=>`<button class="skill-suggestion" data-gear-item="${h(s)}">
      <span class="skill-suggestion-name">${h(s)}</span>
    </button>`,o=()=>{const s=[];for(const c of a)s.push(`<div class="skill-suggestion-header">${h(c.category)}</div>`),c.items.forEach(g=>s.push(d(g)));i.innerHTML=s.join("")};e.addEventListener("click",()=>{if(!i.hidden){i.hidden=!0;return}o(),i.hidden=!1}),e.addEventListener("blur",()=>{i.hidden=!0}),i.addEventListener("mousedown",s=>{const c=s.target.closest(".skill-suggestion");if(!c)return;s.preventDefault();const g=c.dataset.gearItem,f=t.value;t.value=f?`${f}
${g}`:g,j(t),i.hidden=!0,e.focus()})}function wa(e,t){var o;const a=(o=e.closest(".skill-name-wrapper"))==null?void 0:o.querySelector("[data-skill-suggestions]");if(!a)return;const n=document.querySelector(`[data-skill-description="${t}"]`),r=s=>`<button class="skill-suggestion"
      data-skill-name="${h(s.name)}"
      data-skill-attr="${h(s.attribute)}"
      data-skill-desc="${h(s.description)}">
      <span class="skill-suggestion-name">${h(s.name)}</span>
      <span class="skill-suggestion-meta">${h(s.attribute)} · ${h(s.category)}</span>
    </button>`,i=()=>{const s=[];for(const c of Zt){const g=re.filter(f=>f.category===c);g.length!==0&&(s.push(`<div class="skill-suggestion-header">${h(c)}</div>`),g.forEach(f=>s.push(r(f))))}a.innerHTML=s.join(""),a.hidden=!1},d=s=>{if(!s){i();return}const c=s.toLowerCase(),g=re.filter(p=>p.name.toLowerCase().includes(c)||p.category.toLowerCase().includes(c)).slice(0,12);if(g.length===0){a.hidden=!0;return}const f=re.find(p=>p.name.toLowerCase()===c);f&&n&&(n.textContent=f.description,n.hidden=!1),a.innerHTML=g.map(r).join(""),a.hidden=!1};e.addEventListener("input",()=>d(e.value.trim())),e.addEventListener("focus",()=>d(e.value.trim())),e.addEventListener("blur",()=>{a.hidden=!0}),e.addEventListener("keydown",s=>{s.key==="Escape"&&(a.hidden=!0)}),a.addEventListener("mousedown",s=>{const c=s.target.closest(".skill-suggestion");if(!c)return;s.preventDefault(),e.value=c.dataset.skillName,j(e);const g=document.querySelector(`[data-field="skill.attribute.${t}"]`);g&&c.dataset.skillAttr&&(g.value=c.dataset.skillAttr,j(g)),n&&c.dataset.skillDesc&&(n.textContent=c.dataset.skillDesc,n.hidden=!1),a.hidden=!0})}function ka(e,t){var s;const a=(s=e.closest(".skill-name-wrapper"))==null?void 0:s.querySelector("[data-feat-suggestions]");if(!a)return;const n=document.querySelector(`[data-feat-description="${t}"]`),r=c=>`<button class="skill-suggestion" data-feat-name="${h(c.name)}">
      <span class="skill-suggestion-name">${h(c.name)}</span>
      <span class="skill-suggestion-meta">CyberZen</span>
    </button>`,i=c=>{n&&(n.innerHTML=`<strong>Rule Bender:</strong> ${h(c.ruleBender)}<br><strong>Rule Breaker:</strong> ${h(c.ruleBreaker)}`,n.hidden=!1)},d=()=>{a.innerHTML='<div class="skill-suggestion-header">Matrix Feats</div>'+Z.map(r).join(""),a.hidden=!1},o=c=>{if(!c){d();return}const g=c.toLowerCase(),f=Z.filter(l=>l.name.toLowerCase().includes(g)).slice(0,12);if(f.length===0){a.hidden=!0;return}const p=Z.find(l=>l.name.toLowerCase()===g);p&&i(p),a.innerHTML=f.map(r).join(""),a.hidden=!1};e.addEventListener("input",()=>o(e.value.trim())),e.addEventListener("focus",()=>o(e.value.trim())),e.addEventListener("blur",()=>{a.hidden=!0}),e.addEventListener("keydown",c=>{c.key==="Escape"&&(a.hidden=!0)}),a.addEventListener("mousedown",c=>{const g=c.target.closest(".skill-suggestion");if(!g)return;c.preventDefault();const f=g.dataset.featName;e.value=f,j(e);const p=Z.find(l=>l.name===f);p&&i(p),a.hidden=!0})}function $(){const e=He(),t=ia(e);let a=la(e),n="hero-view";u.route==="learn"&&(a=ca(),n="learn-view"),u.route==="jack-in"&&(a=ba(e,t),n="jack-in-view"),document.querySelector("#app").innerHTML=`
    <div class="page-shell">
      <header class="site-header">
        <a href="#home" class="brand">The Unofficial Matrix RPG</a>
        <nav class="route-nav">${sa()}</nav>
      </header>
      <main class="view-shell" data-view="${n}">
        ${a}
      </main>
    </div>
  `,Sa(),Ht(),Ot()}function Sa(){var i,d,o,s,c,g,f,p;document.querySelectorAll("[data-route]").forEach(l=>{l.addEventListener("click",()=>{ee(l.dataset.route,{sheetTab:l.dataset.sheetTab})})}),document.querySelectorAll("[data-sheet-tab]").forEach(l=>{l.addEventListener("click",()=>aa(l.dataset.sheetTab))}),document.querySelectorAll("[data-character-id]").forEach(l=>{l.addEventListener("click",()=>{u.selectedId=l.dataset.characterId,E("Character loaded from local storage."),ee("jack-in")})}),document.querySelectorAll("[data-field]").forEach(l=>{l.addEventListener("input",m=>j(m.currentTarget))}),document.querySelectorAll("[data-attribute]").forEach(l=>{l.addEventListener("input",m=>{const y=m.currentTarget;M(w=>(w.attributes[y.dataset.attribute]=Number(y.value)||0,w))})}),document.querySelectorAll("[data-attribute-toggle]").forEach(l=>{l.addEventListener("change",m=>{const y=m.currentTarget;M(w=>(w.attributes[y.dataset.attributeToggle]=y.checked,w))})}),(i=document.querySelector('[data-action="new-character"]'))==null||i.addEventListener("click",()=>{const l=N();u.characters=[l,...u.characters],u.selectedId=l.id,G(u.characters),u.sheetTab="identity",E("New blank sheet created locally."),ee("jack-in")}),(d=document.querySelector('[data-action="save-status"]'))==null||d.addEventListener("click",()=>{G(u.characters),E("All character data saved to this browser on this device."),$()}),(o=document.querySelector('[data-action="export-character"]'))==null||o.addEventListener("click",()=>{oa(He()),E("Character exported as JSON."),$()}),(s=document.querySelector('[data-action="delete-character"]'))==null||s.addEventListener("click",()=>{u.characters.length===1?(u.characters=[N()],u.selectedId=u.characters[0].id):(u.characters=u.characters.filter(l=>l.id!==u.selectedId),u.selectedId=u.characters[0].id),G(u.characters),E("Character deleted from local storage."),$()}),(c=document.querySelector('[data-action="add-skill"]'))==null||c.addEventListener("click",()=>{M(l=>(l.skills.push(ve()),l))}),document.querySelectorAll('input[data-field*="skill.name"]').forEach(l=>{const m=l.dataset.field.split(".")[2];wa(l,m)}),document.querySelectorAll('input[data-field*="feat.name"]').forEach(l=>{const m=l.dataset.field.split(".")[2];ka(l,m)});const e=document.querySelector('[data-field="path"]');e&&ne(e,[{category:"Paths",items:Wt}]);const t=document.querySelector('[data-field="affiliation"]');t&&ne(t,[{category:"Affiliations",items:zt}]);const a=document.querySelector('[data-field="origin"]');a&&ne(a,[{category:"Origins",items:Jt}]);const n=document.querySelector('[data-field="homeShip"]');n&&ne(n,[{category:"Ship Types",items:_t}]);const r={realWorld:[...Gt],matrixLoadout:[...Kt],vehicles:[...Ut],contacts:[{category:"Contact Types",items:Vt}]};document.querySelectorAll("[data-gear-add]").forEach(l=>{const m=l.dataset.gearAdd,y=l.closest(".gear-picker-wrapper"),w=y==null?void 0:y.querySelector(`[data-field="gear.${m}"]`),k=r[m];w&&k&&va(l,w,k)}),(g=document.querySelector('[data-action="add-feat"]'))==null||g.addEventListener("click",()=>{M(l=>(l.matrixFeats.push(we()),l))}),document.querySelectorAll("[data-remove-skill]").forEach(l=>{l.addEventListener("click",()=>{M(m=>(m.skills=m.skills.filter(y=>y.id!==l.dataset.removeSkill),m))})}),document.querySelectorAll("[data-remove-feat]").forEach(l=>{l.addEventListener("click",()=>{M(m=>(m.matrixFeats=m.matrixFeats.filter(y=>y.id!==l.dataset.removeFeat),m))})}),(f=document.querySelector("#import-json"))==null||f.addEventListener("change",async l=>{var y;const m=(y=l.target.files)==null?void 0:y[0];if(m)try{const w=ke(JSON.parse(await m.text()));w.updatedAt=new Date().toISOString(),u.characters=[w,...u.characters.filter(k=>k.id!==w.id)],u.selectedId=w.id,G(u.characters),E("Character imported successfully."),ee("jack-in")}catch{E("Import failed. Please use a valid exported JSON character file."),$()}}),(p=document.querySelector('[data-action="nft-placeholder"]'))==null||p.addEventListener("click",()=>{E("NFT viewer placeholder saved. Wallet connect can be wired into this character schema later."),$()})}function j(e){const t=e.dataset.field,a=e.value;M(n=>{const[r,i,d]=t.split(".");return i?r==="gear"||r==="nft"?(n[r][i]=a,n):r==="skill"?(n.skills=n.skills.map(o=>o.id!==d?o:{...o,[i]:i==="rating"?Number(a)||0:a}),n):(r==="feat"&&(n.matrixFeats=n.matrixFeats.map(o=>o.id!==d?o:{...o,[i]:i==="rating"?Number(a)||0:a})),n):(n[t]=e.type==="number"?Number(a)||0:a,n)},!1)}$();
