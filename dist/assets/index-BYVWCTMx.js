(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))s(i);new MutationObserver(i=>{for(const r of i)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&s(o)}).observe(document,{childList:!0,subtree:!0});function n(i){const r={};return i.integrity&&(r.integrity=i.integrity),i.referrerPolicy&&(r.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?r.credentials="include":i.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function s(i){if(i.ep)return;i.ep=!0;const r=n(i);fetch(i.href,r)}})();function ga(t,e){t.indexOf(e)===-1&&t.push(e)}const wr=(t,e,n)=>Math.min(Math.max(n,t),e),Q={duration:.3,delay:0,endDelay:0,repeat:0,easing:"ease"},St=t=>typeof t=="number",qe=t=>Array.isArray(t)&&!St(t[0]),_a=(t,e,n)=>{const s=e-t;return((n-t)%s+s)%s+t};function ya(t,e){return qe(t)?t[_a(0,t.length,e)]:t}const Cr=(t,e,n)=>-n*t+n*e+t,Sr=()=>{},me=t=>t,ks=(t,e,n)=>e-t===0?1:(n-t)/(e-t);function Er(t,e){const n=t[t.length-1];for(let s=1;s<=e;s++){const i=ks(0,e,s);t.push(Cr(n,1,i))}}function va(t){const e=[0];return Er(e,t-1),e}function ba(t,e=va(t.length),n=me){const s=t.length,i=s-e.length;return i>0&&Er(e,i),r=>{let o=0;for(;o<s-2&&!(r<e[o+1]);o++);let a=wr(0,1,ks(e[o],e[o+1],r));return a=ya(n,o)(a),Cr(t[o],t[o+1],a)}}const kr=t=>Array.isArray(t)&&St(t[0]),Zn=t=>typeof t=="object"&&!!t.createAnimation,Ye=t=>typeof t=="function",wa=t=>typeof t=="string",_t={ms:t=>t*1e3,s:t=>t/1e3},Tr=(t,e,n)=>(((1-3*n+3*e)*t+(3*n-6*e))*t+3*e)*t,Ca=1e-7,Sa=12;function Ea(t,e,n,s,i){let r,o,a=0;do o=e+(n-e)/2,r=Tr(o,s,i)-t,r>0?n=o:e=o;while(Math.abs(r)>Ca&&++a<Sa);return o}function pt(t,e,n,s){if(t===e&&n===s)return me;const i=r=>Ea(r,0,1,t,n);return r=>r===0||r===1?r:Tr(i(r),e,s)}const ka=(t,e="end")=>n=>{n=e==="end"?Math.min(n,.999):Math.max(n,.001);const s=n*t,i=e==="end"?Math.floor(s):Math.ceil(s);return wr(0,1,i/t)},Ta={ease:pt(.25,.1,.25,1),"ease-in":pt(.42,0,1,1),"ease-in-out":pt(.42,0,.58,1),"ease-out":pt(0,0,.58,1)},Ia=/\((.*?)\)/;function Qn(t){if(Ye(t))return t;if(kr(t))return pt(...t);const e=Ta[t];if(e)return e;if(t.startsWith("steps")){const n=Ia.exec(t);if(n){const s=n[1].split(",");return ka(parseFloat(s[0]),s[1].trim())}}return me}class Ir{constructor(e,n=[0,1],{easing:s,duration:i=Q.duration,delay:r=Q.delay,endDelay:o=Q.endDelay,repeat:a=Q.repeat,offset:l,direction:c="normal",autoplay:d=!0}={}){if(this.startTime=null,this.rate=1,this.t=0,this.cancelTimestamp=null,this.easing=me,this.duration=0,this.totalDuration=0,this.repeat=0,this.playState="idle",this.finished=new Promise((f,g)=>{this.resolve=f,this.reject=g}),s=s||Q.easing,Zn(s)){const f=s.createAnimation(n);s=f.easing,n=f.keyframes||n,i=f.duration||i}this.repeat=a,this.easing=qe(s)?me:Qn(s),this.updateDuration(i);const h=ba(n,l,qe(s)?s.map(Qn):me);this.tick=f=>{var g;r=r;let _=0;this.pauseTime!==void 0?_=this.pauseTime:_=(f-this.startTime)*this.rate,this.t=_,_/=1e3,_=Math.max(_-r,0),this.playState==="finished"&&this.pauseTime===void 0&&(_=this.totalDuration);const k=_/this.duration;let D=Math.floor(k),$=k%1;!$&&k>=1&&($=1),$===1&&D--;const Y=D%2;(c==="reverse"||c==="alternate"&&Y||c==="alternate-reverse"&&!Y)&&($=1-$);const Z=_>=this.totalDuration?1:Math.min($,1),X=h(this.easing(Z));e(X),this.pauseTime===void 0&&(this.playState==="finished"||_>=this.totalDuration+o)?(this.playState="finished",(g=this.resolve)===null||g===void 0||g.call(this,X)):this.playState!=="idle"&&(this.frameRequestId=requestAnimationFrame(this.tick))},d&&this.play()}play(){const e=performance.now();this.playState="running",this.pauseTime!==void 0?this.startTime=e-this.pauseTime:this.startTime||(this.startTime=e),this.cancelTimestamp=this.startTime,this.pauseTime=void 0,this.frameRequestId=requestAnimationFrame(this.tick)}pause(){this.playState="paused",this.pauseTime=this.t}finish(){this.playState="finished",this.tick(0)}stop(){var e;this.playState="idle",this.frameRequestId!==void 0&&cancelAnimationFrame(this.frameRequestId),(e=this.reject)===null||e===void 0||e.call(this,!1)}cancel(){this.stop(),this.tick(this.cancelTimestamp)}reverse(){this.rate*=-1}commitStyles(){}updateDuration(e){this.duration=e,this.totalDuration=e*(this.repeat+1)}get currentTime(){return this.t}set currentTime(e){this.pauseTime!==void 0||this.rate===0?this.pauseTime=e:this.startTime=performance.now()-e/this.rate}get playbackRate(){return this.rate}set playbackRate(e){this.rate=e}}class Na{setAnimation(e){this.animation=e,e==null||e.finished.then(()=>this.clearAnimation()).catch(()=>{})}clearAnimation(){this.animation=this.generator=void 0}}const Mn=new WeakMap;function Nr(t){return Mn.has(t)||Mn.set(t,{transforms:[],values:new Map}),Mn.get(t)}function Aa(t,e){return t.has(e)||t.set(e,new Na),t.get(e)}const Ra=["","X","Y","Z"],xa=["translate","scale","rotate","skew"],tn={x:"translateX",y:"translateY",z:"translateZ"},yi={syntax:"<angle>",initialValue:"0deg",toDefaultUnit:t=>t+"deg"},Pa={translate:{syntax:"<length-percentage>",initialValue:"0px",toDefaultUnit:t=>t+"px"},rotate:yi,scale:{syntax:"<number>",initialValue:1,toDefaultUnit:me},skew:yi},Et=new Map,Ts=t=>`--motion-${t}`,nn=["x","y","z"];xa.forEach(t=>{Ra.forEach(e=>{nn.push(t+e),Et.set(Ts(t+e),Pa[t])})});const Da=(t,e)=>nn.indexOf(t)-nn.indexOf(e),Oa=new Set(nn),Ar=t=>Oa.has(t),Ma=(t,e)=>{tn[e]&&(e=tn[e]);const{transforms:n}=Nr(t);ga(n,e),t.style.transform=La(n)},La=t=>t.sort(Da).reduce(Fa,"").trim(),Fa=(t,e)=>`${t} ${e}(var(${Ts(e)}))`,Jn=t=>t.startsWith("--"),vi=new Set;function $a(t){if(!vi.has(t)){vi.add(t);try{const{syntax:e,initialValue:n}=Et.has(t)?Et.get(t):{};CSS.registerProperty({name:t,inherits:!1,syntax:e,initialValue:n})}catch{}}}const Ln=(t,e)=>document.createElement("div").animate(t,e),bi={cssRegisterProperty:()=>typeof CSS<"u"&&Object.hasOwnProperty.call(CSS,"registerProperty"),waapi:()=>Object.hasOwnProperty.call(Element.prototype,"animate"),partialKeyframes:()=>{try{Ln({opacity:[1]})}catch{return!1}return!0},finished:()=>!!Ln({opacity:[0,1]},{duration:.001}).finished,linearEasing:()=>{try{Ln({opacity:0},{easing:"linear(0, 1)"})}catch{return!1}return!0}},Fn={},We={};for(const t in bi)We[t]=()=>(Fn[t]===void 0&&(Fn[t]=bi[t]()),Fn[t]);const Ba=.015,Wa=(t,e)=>{let n="";const s=Math.round(e/Ba);for(let i=0;i<s;i++)n+=t(ks(0,s-1,i))+", ";return n.substring(0,n.length-2)},wi=(t,e)=>Ye(t)?We.linearEasing()?`linear(${Wa(t,e)})`:Q.easing:kr(t)?Ha(t):t,Ha=([t,e,n,s])=>`cubic-bezier(${t}, ${e}, ${n}, ${s})`;function Ua(t,e){for(let n=0;n<t.length;n++)t[n]===null&&(t[n]=n?t[n-1]:e());return t}const qa=t=>Array.isArray(t)?t:[t];function Xn(t){return tn[t]&&(t=tn[t]),Ar(t)?Ts(t):t}const Vt={get:(t,e)=>{e=Xn(e);let n=Jn(e)?t.style.getPropertyValue(e):getComputedStyle(t)[e];if(!n&&n!==0){const s=Et.get(e);s&&(n=s.initialValue)}return n},set:(t,e,n)=>{e=Xn(e),Jn(e)?t.style.setProperty(e,n):t.style[e]=n}};function Rr(t,e=!0){if(!(!t||t.playState==="finished"))try{t.stop?t.stop():(e&&t.commitStyles(),t.cancel())}catch{}}function ja(t,e){var n;let s=(e==null?void 0:e.toDefaultUnit)||me;const i=t[t.length-1];if(wa(i)){const r=((n=i.match(/(-?[\d.]+)([a-z%]*)/))===null||n===void 0?void 0:n[2])||"";r&&(s=o=>o+r)}return s}function Ga(){return window.__MOTION_DEV_TOOLS_RECORD}function Va(t,e,n,s={},i){const r=Ga(),o=s.record!==!1&&r;let a,{duration:l=Q.duration,delay:c=Q.delay,endDelay:d=Q.endDelay,repeat:h=Q.repeat,easing:f=Q.easing,persist:g=!1,direction:_,offset:k,allowWebkitAcceleration:D=!1,autoplay:$=!0}=s;const Y=Nr(t),Z=Ar(e);let X=We.waapi();Z&&Ma(t,e);const j=Xn(e),we=Aa(Y.values,j),ee=Et.get(j);return Rr(we.animation,!(Zn(f)&&we.generator)&&s.record!==!1),()=>{const Ce=()=>{var v,T;return(T=(v=Vt.get(t,j))!==null&&v!==void 0?v:ee==null?void 0:ee.initialValue)!==null&&T!==void 0?T:0};let p=Ua(qa(n),Ce);const b=ja(p,ee);if(Zn(f)){const v=f.createAnimation(p,e!=="opacity",Ce,j,we);f=v.easing,p=v.keyframes||p,l=v.duration||l}if(Jn(j)&&(We.cssRegisterProperty()?$a(j):X=!1),Z&&!We.linearEasing()&&(Ye(f)||qe(f)&&f.some(Ye))&&(X=!1),X){ee&&(p=p.map(L=>St(L)?ee.toDefaultUnit(L):L)),p.length===1&&(!We.partialKeyframes()||o)&&p.unshift(Ce());const v={delay:_t.ms(c),duration:_t.ms(l),endDelay:_t.ms(d),easing:qe(f)?void 0:wi(f,l),direction:_,iterations:h+1,fill:"both"};a=t.animate({[j]:p,offset:k,easing:qe(f)?f.map(L=>wi(L,l)):void 0},v),a.finished||(a.finished=new Promise((L,$e)=>{a.onfinish=L,a.oncancel=$e}));const T=p[p.length-1];a.finished.then(()=>{g||(Vt.set(t,j,T),a.cancel())}).catch(Sr),D||(a.playbackRate=1.000001)}else if(i&&Z)p=p.map(v=>typeof v=="string"?parseFloat(v):v),p.length===1&&p.unshift(parseFloat(Ce())),a=new i(v=>{Vt.set(t,j,b?b(v):v)},p,Object.assign(Object.assign({},s),{duration:l,easing:f}));else{const v=p[p.length-1];Vt.set(t,j,ee&&St(v)?ee.toDefaultUnit(v):v)}return o&&r(t,e,p,{duration:l,delay:c,easing:f,repeat:h,offset:k},"motion-one"),we.setAnimation(a),a&&!$&&a.pause(),a}}const za=(t,e)=>t[e]?Object.assign(Object.assign({},t),t[e]):Object.assign({},t);function Ka(t,e){return typeof t=="string"?t=document.querySelectorAll(t):t instanceof Element&&(t=[t]),Array.from(t||[])}const Ya=t=>t(),xr=(t,e,n=Q.duration)=>new Proxy({animations:t.map(Ya).filter(Boolean),duration:n,options:e},Qa),Za=t=>t.animations[0],Qa={get:(t,e)=>{const n=Za(t);switch(e){case"duration":return t.duration;case"currentTime":return _t.s((n==null?void 0:n[e])||0);case"playbackRate":case"playState":return n==null?void 0:n[e];case"finished":return t.finished||(t.finished=Promise.all(t.animations.map(Ja)).catch(Sr)),t.finished;case"stop":return()=>{t.animations.forEach(s=>Rr(s))};case"forEachNative":return s=>{t.animations.forEach(i=>s(i,t))};default:return typeof(n==null?void 0:n[e])>"u"?void 0:()=>t.animations.forEach(s=>s[e]())}},set:(t,e,n)=>{switch(e){case"currentTime":n=_t.ms(n);case"playbackRate":for(let s=0;s<t.animations.length;s++)t.animations[s][e]=n;return!0}return!1}},Ja=t=>t.finished;function Bt(t=.1,{start:e=0,from:n=0,easing:s}={}){return(i,r)=>{const o=St(n)?n:Xa(n,r),a=Math.abs(o-i);let l=t*a;if(s){const c=r*t;l=Qn(s)(l/c)*c}return e+l}}function Xa(t,e){if(t==="first")return 0;{const n=e-1;return t==="last"?n:n/2}}function el(t,e,n){return Ye(t)?t(e,n):t}function tl(t){return function(n,s,i={}){n=Ka(n);const r=n.length,o=[];for(let a=0;a<r;a++){const l=n[a];for(const c in s){const d=za(i,c);d.delay=el(d.delay,a,r);const h=Va(l,c,s[c],d,t);o.push(h)}}return xr(o,i,i.duration)}}const nl=tl(Ir);function sl(t,e={}){return xr([()=>{const n=new Ir(t,[0,1],e);return n.finished.catch(()=>{}),n}],e,e.duration)}function K(t,e,n){return(Ye(t)?sl:nl)(t,e,n)}function il(){const t=document.querySelector(".view-shell");t&&K(t,{opacity:[0,1],transform:["scale(0.95) translateY(10px)","scale(1) translateY(0)"]},{duration:.5,easing:"cubic-bezier(0.34, 1.56, 0.64, 1)"})}function rl(){const t=document.querySelector(".hero-panel");if(!t)return;const e=t.querySelector(".hero-copy"),n=t.querySelector(".hero-cta-row");e&&K(e,{opacity:[0,1],transform:["translateX(-20px)","translateX(0)"]},{duration:.6,delay:.1,easing:"ease-out"}),n&&K(n,{opacity:[0,1],transform:["translateY(20px)","translateY(0)"]},{duration:.5,delay:.3,easing:"ease-out"})}function ol(){const t=document.querySelectorAll(".hero-grid > section");t.length&&K(t,{opacity:[0,1],transform:["scale(0.9)","scale(1)"]},{duration:.5,delay:Bt(.1,{start:.2}),easing:"ease-out"})}function al(){const t=document.querySelectorAll(".timeline-card");t.length&&K(t,{opacity:[0,1],transform:["translateX(-30px)","translateX(0)"]},{duration:.5,delay:Bt(.15,{start:.2}),easing:"cubic-bezier(0.34, 1.56, 0.64, 1)"})}function ll(){const t=document.querySelector(".action-banner");t&&K(t,{opacity:[0,1],transform:["scale(0.95)","scale(1)"]},{duration:.6,delay:.4,easing:"ease-out"})}function cl(){const t=document.querySelectorAll(".roster-card");t.length&&K(t,{opacity:[0,1],transform:["translateY(10px)","translateY(0)"]},{duration:.4,delay:Bt(.05,{start:.1}),easing:"ease-out"})}function hl(){const t=document.querySelectorAll(".sheet-card");t.length&&K(t,{opacity:[0,1],transform:["translateY(20px)","translateY(0)"]},{duration:.5,delay:Bt(.08,{start:.15}),easing:"ease-out"})}function dl(){const t=document.querySelectorAll(".sheet-tab");t.length&&K(t,{opacity:[0,1],scale:[.95,1]},{duration:.3,delay:Bt(.05),easing:"ease-out"})}function ul(){document.querySelectorAll(".pill-button, .ghost-button, .solid-button, .danger-button, .route-link, .sheet-tab").forEach(e=>{e.addEventListener("mouseenter",()=>{K(e,{scale:[1,1.05]},{duration:.2,easing:"ease-out"})}),e.addEventListener("mouseleave",()=>{K(e,{scale:[1.05,1]},{duration:.2,easing:"ease-out"})})})}function fl(){document.querySelectorAll(".roster-card, .sheet-card, .timeline-card, .hero-panel").forEach(e=>{e.addEventListener("mouseenter",()=>{K(e,{borderColor:"var(--line-strong)"},{duration:.2})}),e.addEventListener("mouseleave",()=>{K(e,{borderColor:"var(--line)"},{duration:.2})})})}function pl(){il(),document.querySelector(".hero-panel.hero-view")&&(rl(),setTimeout(ol,200)),document.querySelector(".learn-view")&&(al(),setTimeout(ll,300)),document.querySelector(".jack-in-view")&&(dl(),setTimeout(hl,100)),setTimeout(cl,50)}function ml(){ul(),fl()}const gl=["Combat","Weapons","Vehicles","Infiltration","Social","Investigative","Physical","Technical","Knowledge","Medical","Survival","Operator"],Xt=[{name:"Aircraft Piloting",attribute:"Agility",category:"Vehicles",source:"general",description:"Piloting a hovercraft and other vehicles that stay airborne during operation. This includes landing, stopping, combat maneuvers, high speed control, etc."},{name:"Ambidextrous",attribute:"Agility",category:"Physical",source:"general",description:"Ability to use both hands equally well for anything."},{name:"Archery",attribute:"Agility",category:"Weapons",source:"general",description:"Propelling arrows with the use of a bow or crossbow. This will also allow the character to do fletching."},{name:"Balancing Feats",attribute:"Agility",category:"Physical",source:"general",description:"Walk tight ropes, juggle, stack plates, etc."},{name:"Dancing",attribute:"Agility",category:"Physical",source:"general",description:"Ballroom dancing, club dancing, ballet, stage performance, etc."},{name:"Driving",attribute:"Agility",category:"Vehicles",source:"general",description:"See Ground Craft Piloting."},{name:"Ground Craft Piloting",attribute:"Agility",category:"Vehicles",source:"general",description:"There are still some wheeled and tracked vehicles in use. This skill represents the ability to control and pilot such craft."},{name:"Gun Fighting",attribute:"Agility",category:"Combat",source:"general",description:"Weapons that use gunpowder, or explosives, to propel a metal slug at your target. Examples include Handguns, Rifles, Shotguns, Submachine Guns, Assault Rifles, Artillery Guns, and Machine Guns."},{name:"Knife Fighting",attribute:"Agility",category:"Combat",source:"general",description:"Fighting with knives using martial fighting skills like Eskrima, Esgrima Criolla, The Andalusian legacy, or Scherma di Stiletto Siciliano. This is an athletic, close combat form of fighting."},{name:"Martial Arts",attribute:"Agility",category:"Combat",source:"general",description:"Formal hand to hand combat techniques — Aikido, Karate, Ju Jitsu, Kendo, etc. Please pick individual styles as each of your fighting skills."},{name:"Polearm fighting",attribute:"Agility",category:"Combat",source:"general",description:"Fighting with close combat weapons in which the main fighting part of the weapon is on the end of a long shaft. Axes, maces, and morning stars are considered polearms."},{name:"Sleight of hand",attribute:"Agility",category:"Infiltration",source:"general",description:"Tricking the eye to see or not see a hand gesture through deception, magic tricks."},{name:"Blade Fighting",attribute:"Agility",category:"Combat",source:"general",description:"Using bladed weapons. Swords are very popular weapons against the Machines in the Real World, because they have been developed to cut through metal."},{name:"Thai Boxing",attribute:"Agility",category:"Combat",source:"general",description:"Thai boxing, a form of hand to hand combat."},{name:"Throwing Weapons",attribute:"Agility",category:"Weapons",source:"general",description:"The skill to aim, balance, and throw a weapon with deadly effectiveness. Throwing weapons include knives, spears, shurikens, and rocks."},{name:"Escape Bonds",attribute:"Agility",category:"Infiltration",source:"general",description:"The ability to get out of handcuffs, ropes, and avoid being held."},{name:"Sci Fi Weapons",attribute:"Agility",category:"Weapons",source:"general",description:"This skill is specific to the weapon the character is using, such as a Plasma Cannon or Laser Rifle. These types of weapons are so unique that a person has to learn each one individually."},{name:"Acrobatics",attribute:"Agility",category:"Physical",source:"general",description:"Flips, vaults, rolls, and tumbling."},{name:"Acting",attribute:"Common Sense",category:"Social",source:"general",description:"Pretending to be someone else, creating emotions at will."},{name:"Animal Training/Handling",attribute:"Common Sense",category:"Survival",source:"general",description:"Training animals to listen to commands, domesticating animals."},{name:"Bartering",attribute:"Common Sense",category:"Social",source:"general",description:"Used to levy better deals in trades. General knowledge of an item's value."},{name:"Blackmarket",attribute:"Common Sense",category:"Social",source:"general",description:"Locating and bargaining in the black market. The character knows who to talk to and what to say to find or sell on the black market."},{name:"Coercion",attribute:"Common Sense",category:"Social",source:"general",description:"Seduction, manipulation, scamming, intimidation, bluffing to get what they want."},{name:"Conceal",attribute:"Common Sense",category:"Infiltration",source:"general",description:"Hiding objects and self."},{name:"Diplomacy",attribute:"Common Sense",category:"Social",source:"general",description:"The ability to convince others of seeing another point of view, and to cut through red tape easier than others."},{name:"Disguises",attribute:"Common Sense",category:"Infiltration",source:"general",description:"Concealing identity with makeup, clothes, change of appearance."},{name:"Gambling",attribute:"Common Sense",category:"Social",source:"general",description:"Statistically improve chances of winning games."},{name:"Gather Information",attribute:"Common Sense",category:"Social",source:"general",description:"Conversing with others to collect information without notice."},{name:"Guerrilla Tactics",attribute:"Common Sense",category:"Knowledge",source:"general",description:"Irregular warfare with small groups of fighters who use tactics like ambushes, sabotage, element of surprise, and raids."},{name:"History of Zion",attribute:"Common Sense",category:"Knowledge",source:"general",description:"A general knowledge of the human history of Zion, or any city or area of choice."},{name:"Interrogate",attribute:"Common Sense",category:"Social",source:"general",description:"Using force and/or manipulation to obtain information."},{name:"Nomad Clan Customs",attribute:"Common Sense",category:"Knowledge",source:"general",description:"Every nomad clan has special customs and ways of doing things, rituals they must perform, etc. This is a knowledge every clansman must have for her clan."},{name:"Philosophy",attribute:"Common Sense",category:"Knowledge",source:"general",description:"Study of problems in the fields of knowledge, reality, values, morals, mind, and existence. Philosophers address these problems using critical thinking and logic."},{name:"Photography",attribute:"Common Sense",category:"Knowledge",source:"general",description:"Digital or film, journalistic, art, sports, picture composition, and modeling."},{name:"Religion",attribute:"Common Sense",category:"Knowledge",source:"general",description:"Study of religious beliefs, behaviors, holidays, traditions, and religious institutions of a specific religion."},{name:"Remote Piloting",attribute:"Common Sense",category:"Vehicles",source:"general",description:"Controlling anything mechanized with remote access controls. Vehicles can have remotes, sentinel frames can be augmented to have remote control capability also. Must have the skills for the vehicle type that is being piloted."},{name:"Snooping",attribute:"Common Sense",category:"Infiltration",source:"general",description:"Knowledge of how to set up bugging devices, detect hidden microphones, video cameras, etc."},{name:"Stalk",attribute:"Common Sense",category:"Investigative",source:"general",description:"To follow someone unnoticed, shadowing."},{name:"Stealth",attribute:"Common Sense",category:"Infiltration",source:"general",description:"Knowledge of how not to be detected. General camouflage and silence techniques. Hide while moving."},{name:"Surveillance",attribute:"Common Sense",category:"Investigative",source:"general",description:"Build and use security with cameras, motion sensors."},{name:"Thieving",attribute:"Common Sense",category:"Infiltration",source:"general",description:"Stealing, pickpocketing."},{name:"Track",attribute:"Common Sense",category:"Investigative",source:"general",description:"To follow someone who cannot be seen by following a trail or clues of his/her passage."},{name:"Linguist",attribute:"Common Sense",category:"Knowledge",source:"general",description:"Understand basic structure of languages, figure out words and phrases from similarly familiar languages."},{name:"Perception",attribute:"Common Sense",category:"Investigative",source:"general",description:"The ability to notice the common things, and pick out the details and the unexpected. Used by the GM to check whether a character notices something — as simple as seeing a canyon off in the distance, or as critical as noticing an ambush ahead."},{name:"PunkSmithing",attribute:"Common Sense",category:"Technical",source:"general",description:"Designing technology from other scavenged bits of machines and broken things."},{name:"Salvage",attribute:"Common Sense",category:"Survival",source:"general",description:"The ability to, with the right tools, remove and collect things of value from where they are. For example, a character who understands sentinel hardware can remove parts from the frame in a way that preserves their trade value."},{name:"Running",attribute:"Endurance",category:"Physical",source:"general",description:"The knowledge of how to pace oneself and increase running endurance. Most Desert clansmen can run for days with little to no rest."},{name:"Survival",attribute:"Endurance",category:"Survival",source:"general",description:"Knowledge of how to survive in a harsh environment such as the wilderness, jungle, mountains, plains, or desert."},{name:"Ice Desert Survival",attribute:"Endurance",category:"Survival",source:"general",description:"A general knowledge of surface arctic survival, foraging skills, flora & fauna, dangerous weather conditions, ice climbing, and other cold climate knowledge."},{name:"Rock climbing",attribute:"Endurance",category:"Physical",source:"general",description:"The knowledge of things like how to belay, climbing techniques, climbing cracks, lead climbing, placing gear, setting anchors, top rope climbing, climbing communication, self rescue and other essential skills."},{name:"Aiming",attribute:"Focus",category:"Combat",source:"general",description:"Aiming is done in game so the character can have a special effect. On a successful aiming task the PC can have a special roleplay event happen — something the player describes to add to the story."},{name:"Art",attribute:"Focus",category:"Knowledge",source:"general",description:"Creating works of art, drawing and painting, sculptures, airbrushing."},{name:"Biology",attribute:"Focus",category:"Knowledge",source:"general",description:"Knowledge of the science of biology and life forms. Covers genetics to ecosystems."},{name:"Chemistry",attribute:"Focus",category:"Knowledge",source:"general",description:"Knowledge of the science of understanding and mixing chemical elements."},{name:"City Speak",attribute:"Focus",category:"Knowledge",source:"general",description:"The knowledge of the tones, inflections, and general jargon that will get you around in the city. Specify the city that you can use City Speak in."},{name:"Demolitions",attribute:"Focus",category:"Technical",source:"general",description:"Knowledge of how to use demolitions, analyze and disarm bombs, set explosives, and make explosives."},{name:"Electronics",attribute:"Focus",category:"Technical",source:"general",description:"Knowledge of how to operate, analyze, repair, and build electronic devices. The character knows how to mess with do-dads and usually keeps things in general working order."},{name:"Encryption",attribute:"Focus",category:"Technical",source:"general",description:"Encode cryptographic information, crack codes."},{name:"First Aid",attribute:"Focus",category:"Medical",source:"general",description:"Stabilizing wounds, treating minor burns and cuts, CPR."},{name:"Forgery",attribute:"Focus",category:"Infiltration",source:"general",description:"Create duplicates of documents, fake IDs, counterfeiting, etc."},{name:"Geology",attribute:"Focus",category:"Knowledge",source:"general",description:"Science of studying solid earth. Geology gives humans insight into what makes up the earth around them and its origins."},{name:"Gunsmith",attribute:"Focus",category:"Weapons",source:"general",description:"A person who repairs, modifies, designs, or builds guns."},{name:"Hand signals",attribute:"Focus",category:"Knowledge",source:"general",description:"This skill is very specific to small groups. It is used in clans for communicating when the conversation is supposed to be private. Each group has its own set of hand signals."},{name:"Hypnotize",attribute:"Focus",category:"Social",source:"general",description:"Getting people into a mental state that makes them more susceptible to suggestions."},{name:"Law",attribute:"Focus",category:"Knowledge",source:"general",description:"Knowledge of the local laws and legal organizations."},{name:"Leadership",attribute:"Focus",category:"Social",source:"general",description:"Ability to gain the respect of a group of people and make them susceptible to influence."},{name:"Locksmithing",attribute:"Focus",category:"Infiltration",source:"general",description:"Understand locking mechanisms, ability to unlock doors, safes, combination, key, and electronic pads."},{name:"Medical Knowledge",attribute:"Focus",category:"Medical",source:"general",description:"Knowledge of how to stitch people up. An understanding of first aid, battlefield surgery, and proper sterilization techniques. At the teacher level, the character can perform surgery on people."},{name:"Navigate",attribute:"Focus",category:"Knowledge",source:"general",description:"Ability to use navigation equipment to plot and hold a course."},{name:"System Operations",attribute:"Focus",category:"Knowledge",source:"general",description:"The physical and theoretical knowledge of the Machines, sentinels, and frames. The understanding of how they tick, what they do, etc."},{name:"Vehicle Repair (by piloting type)",attribute:"Focus",category:"Vehicles",source:"general",description:"The character can rebuild an engine, set a hovercraft's anti-grav controls. Depending on what it is and the type of equipment one has, the character can fix whatever is in front of them."},{name:"Writing",attribute:"Focus",category:"Knowledge",source:"general",description:"The ability to write down spoken words in one's own language, to organize thoughts into written forms like poetry, prose, fiction, and non-fiction."},{name:"Blacksmith",attribute:"Focus",category:"Technical",source:"general",description:"Metallurgy, melting, and casting new objects from various metals and scraps."},{name:"Boxing",attribute:"Strength",category:"Combat",source:"general",description:"Trained fist fighting."},{name:"Brawling",attribute:"Strength",category:"Combat",source:"general",description:"Untrained street fighting."},{name:"Fitness",attribute:"Strength",category:"Physical",source:"general",description:"Ability to work out and keep physically active to improve health."},{name:"Parkor",attribute:"Strength",category:"Physical",source:"general",description:"A physical discipline which focuses on efficient movement around obstacles."},{name:"Swimming",attribute:"Strength",category:"Physical",source:"general",description:"Studying the mechanics of swimming for extra speed and strength. The knowledge of different swim strokes like freestyle, backstroke, breaststroke, and butterfly."},{name:"Programming",attribute:"Focus",category:"Operator",source:"operator",description:"Being able to read the Matrix code. Use Programming to create simulacra equipment for the Matrix. Operators use Programming Hacks to see the construct for what it is and help RSIs navigate the system."},{name:"Matrix Power Plant Hardware",attribute:"Focus",category:"Operator",source:"operator",description:"Understanding the actual hardware and tech that makes up any construct based technology."}],mt=[{name:"Acute Hearing",attribute:"CyberZen",ruleBender:"The ability to hear sounds that would normally be too low or too far off to hear with normal hearing.",ruleBreaker:"Character can hear any frequency even those that are normally inaudible to human ears."},{name:"Atmospheric Adaptation",attribute:"CyberZen",ruleBender:"Character can breathe noxious gases without any adverse effects. Even though characters can inhale noxious gases they are unable to breathe underwater.",ruleBreaker:"Character can breathe water, noxious fumes/gases, or go without oxygen completely."},{name:"Blindness",attribute:"CyberZen",ruleBender:"The characters must be able to touch their target. With a simple touch the character can make a RSI blind. They can affect a number of targets equal to their Matrix feat rating.",ruleBreaker:"Character can make a redpill RSI blind while they are plugged into the Matrix. The effect lasts as long as the targets stay in the Matrix."},{name:"Change Material",attribute:"CyberZen",ruleBender:"The character has the ability to change the weight, size, and the color of an item temporarily. The item retains its shape and possibly its original function depending on how it is altered (GM's discretion). The character can only affect one item at a time. The objects affected must be smaller than the character.",ruleBreaker:"The character has the ability to alter an object's molecular structure in the Matrix — changing a gun to butter, concrete to water, water to wine, etc. A single object of any size can be changed in this way."},{name:"Control Animal(s)",attribute:"CyberZen",ruleBender:"The character has the ability to lock gazes with an animal and make that particular animal follow his commands.",ruleBreaker:"The character can control more than one animal at a time. Characters are only able to control as many animals as their Matrix feat rating."},{name:"Control Gravity",attribute:"CyberZen",ruleBender:"Character can control how gravity works by increasing or decreasing it on one person or object. They have to touch the object.",ruleBreaker:"Character can control gravity in an area that they can see, equal to their Matrix feat rating in meters."},{name:"Control Plant(s)",attribute:"CyberZen",ruleBender:"Character can touch a plant and make it grow rapidly in a certain direction — like a plant reaching toward the sun, but instant.",ruleBreaker:"Character can make multiple plants grow or wither at will. GM discretion as to whether the character could affect an entire acre or farm of crops."},{name:"Control Weather",attribute:"CyberZen",ruleBender:"Make a rainstorm on a sunny day. The more abnormal or extreme the weather change the more difficult the task roll.",ruleBreaker:"Without changing the entire weather pattern the character can call lightning to strike any spot of their choosing, or call a tornado on a calm day."},{name:"Create Simple Objects",attribute:"CyberZen",ruleBender:"The character can restore simple objects that have been destroyed — for example restoring a burnt candle to its original state. They must touch the item.",ruleBreaker:"The character has the ability to make small simple objects from nothing. Simple objects don't have any moving parts. The character must touch the item being made."},{name:"Disguise",attribute:"CyberZen",ruleBender:"A player can disguise herself to agents and other people within the Matrix. RSI's don't see the character as she is, but rather as she would like to be seen.",ruleBreaker:"Player can change their height and weight, alter appendages, and mimic someone specifically down to the DNA — indiscernible from the original. Characters must stay human."},{name:"Dodging Bullets",attribute:"CyberZen",ruleBender:"Character has an uncanny ability to dodge non-ballistic speed objects. Character can easily dodge bows and arrows.",ruleBreaker:"The character can dodge ballistics and projectiles in the Matrix. When a character uses dodge they cannot perform any other actions that turn."},{name:"Eagle Eyes",attribute:"CyberZen",ruleBender:"Character can see long distances as though they were closer — reading a newspaper a block away as if held in hand. This feat gives extreme tunnel vision while active.",ruleBreaker:"Character's eyes can vary their magnification from normal to the power of an electron microscope. Tunnel vision still applies when using this feat."},{name:"Enhanced Smell",attribute:"CyberZen",ruleBender:"Character smells scents like a bloodhound. They can use this ability to track a person or object by its scent.",ruleBreaker:"A character can use smell to identify anyone they have smelled before, even in disguise. The character is so sensitive they can pick up pheromones similar to how ants follow each other."},{name:"Firestarter",attribute:"CyberZen",ruleBender:"Character is able to increase or decrease the intensity of fire that is already burning. Cannot create flame from nothing.",ruleBreaker:"Character can create fire from nothing. It is easier if they have something to set on fire."},{name:"Flight",attribute:"CyberZen",ruleBender:"Character can glide on air currents without the aid of wings. Gliders are not propelled so they don't move fast unless diving. The character can also turn off this feat to fall normally.",ruleBreaker:"The character can fly like superman."},{name:"Forcefield",attribute:"CyberZen",ruleBender:"The character can create a forcefield around their body that can repel objects, gases, or forces from touching the character. This field is on the surface of the character's body.",ruleBreaker:"Extend this forcefield to others or around a certain area. They only control one forcefield — if using it to protect someone else they are not protected themselves."},{name:"Grow Claws",attribute:"CyberZen",ruleBender:"Alter nails and teeth so they have a razor sharp edge. They can also make them hard as diamonds.",ruleBreaker:"Grow fingernails and toenails longer and stronger like cat claws. Character could even make bone poke through skin in desired areas."},{name:"Heal",attribute:"CyberZen",ruleBender:"Character can roll Endurance to reduce damage up to their CyberZen rating, once per day.",ruleBreaker:"Character can lay hands on another character and allow them to roll their Endurance score to reduce damage even if they have already rolled once in that 24-hour period."},{name:"Increased Attribute",attribute:"CyberZen",ruleBender:"Make a task roll. For each success increase that attribute's dice pool by one die for the remainder of the scene. Cannot increase CyberZen. Total adjustable points equal Matrix Feat rating, split across multiple attributes.",ruleBreaker:"Can also increase CyberZen. No limit to the amount of Attribute points the character can increase."},{name:"Increased Skill",attribute:"CyberZen",ruleBender:"Make a task roll. For each success increase that skill's dice pool by one die for the remainder of the scene. The amount of points that can be adjusted equals the feat's rating.",ruleBreaker:"No limit to the amount of Skill points that the character can increase."},{name:"Invisibility",attribute:"CyberZen",ruleBender:"The character becomes harder for people to see — they can only be spotted if someone is staring directly at them and focusing.",ruleBreaker:"A character can become completely translucent; light travels through them. Clothes and other items the character is wearing are unaffected by this feat."},{name:"Jump",attribute:"CyberZen",ruleBender:"Soften a deadly fall of twenty stories, or jump across extreme distances. You could jump across the Grand Canyon with this feat.",ruleBreaker:"They can jump as far as they want — even for miles — as long as they are moving up and down, not side to side. The difference from flying is they cannot move horizontally through the air."},{name:"Mimic",attribute:"CyberZen",ruleBender:"Character can turn their body into an element they have come in contact with. The body can move like normal but has all the other characteristics of the element copied.",ruleBreaker:"By touching an object, person, animal, or bug the character can become a copy of that thing down to the smallest detail. The character does not have to stay human."},{name:"Mind Control",attribute:"CyberZen",ruleBender:"Character can plant small one-word suggestions into a RSI's mind. Upon a successful roll the bluepill RSI will carry out that suggestion until its completion. The RSI will only follow suggestions that don't hurt them.",ruleBreaker:"The character can possess bluepill RSIs with a psychic link and tell them to do what they want. The character also has the ability to manipulate memories."},{name:"Negate Matrix Feats",attribute:"CyberZen",ruleBender:"Character can temporarily negate the Matrix Feat ability and effects of other RSI's or programs.",ruleBreaker:"The character can permanently negate the Matrix Feat ability and effects of other RSI's or programs."},{name:"Night Vision",attribute:"CyberZen",ruleBender:"Characters determine how night vision works for them: sonar, low light, or heat (infra-red).",ruleBreaker:"Character doesn't need to see. They are completely aware of what is around them as though it were daylight. The character can turn the feat off if they want."},{name:"Pass Through Objects",attribute:"CyberZen",ruleBender:"Character can pass through thick liquids and objects as though they were made of air. Using this in water allows the character to run and move as though on land.",ruleBreaker:"The character can walk through walls and pass through solid objects as though they were made of air."},{name:"Prehensile",attribute:"CyberZen",ruleBender:"Character can use their tongue, feet and ears to grab things as though they were using their hands. The character could use their feet to fire a handgun without difficulty.",ruleBreaker:"Character can grow extra prehensile appendages they can use just like hands — they could even grow an extra arm."},{name:"Psychometry",attribute:"CyberZen",ruleBender:"A character can learn about the past of an object, place, or person by touching it.",ruleBreaker:"A character can learn about the future of an object, place, or person by touching it."},{name:"Shapeshifting",attribute:"CyberZen",ruleBender:"A character can turn into an animal of their choice if they see it while they are shifting.",ruleBreaker:"Character can shapeshift into any animal it has ever seen before, even without the animal present while the character is shifting."},{name:"Sonic Blast",attribute:"CyberZen",ruleBender:"Create a sonic blast that can shatter brittle materials like glass. It can also damage human eardrums or be used to stun an opponent.",ruleBreaker:"Character can use their sonic blast to knock people over and hit things with force. A character could use the sonic blast to lift them up in the air or propel them along in the air."},{name:"Spatial Manipulation (Spatiokinesis)",attribute:"CyberZen",ruleBender:"Character can design a fixed area in the Matrix that allows them to control reality. This area does not change until it is destroyed or reformatted.",ruleBreaker:"Character can manipulate the spatial reality of their immediate area — warp, bend, flip, crush, and otherwise manipulate all physical aspects of space within an area of their choosing, wherever they are."},{name:"Telekinesis",attribute:"CyberZen",ruleBender:"Character has the ability to lift objects up to their own weight if they focus on it. They must see the object.",ruleBreaker:"Character has the ability to lift objects that weigh more than them with their minds, but they must be able to see it."},{name:"Telepathy",attribute:"CyberZen",ruleBender:"Character can read surface thoughts of other RSI's. People can notice when someone is reading their thoughts — it feels like someone is holding your head. Limited to one RSI at a time.",ruleBreaker:"Characters can read any thoughts, even those the RSI tries to hide. This is limited to as many RSIs as their Matrix Feat rating."},{name:"Teleportation",attribute:"CyberZen",ruleBender:"A character can teleport very limited distances. Basically if they can see it they can teleport there.",ruleBreaker:"Can teleport to any destination in the Matrix. Period."},{name:"Time Slow",attribute:"CyberZen",ruleBender:"For limited periods the character can slow down one object or person in the area. The object is slowed down for everyone, not just to the RSI with the Matrix Feat.",ruleBreaker:"The character can slow down the actions of everyone else around them, making the player appear to move faster. Limited to a number of objects not to exceed the Matrix Feat rating."},{name:"True Sight",attribute:"CyberZen",ruleBender:"The character can see random snippets of code. It is up to the GM as to what the character sees — it should be small bits of information.",ruleBreaker:"The character can see all of the simulacrum as Matrix code from within the Matrix."},{name:"Truth Sayer",attribute:"CyberZen",ruleBender:"The character can tell when someone is lying about anything, or when that person thinks they are lying about something.",ruleBreaker:"The character can force a RSI to only tell the truth as far as they know. They don't feel compelled to talk, but anything they say is true and they don't know why."},{name:"Wall Crawling",attribute:"CyberZen",ruleBender:"The character can cling to walls with hands and/or feet like a spider or climbing insect. Smooth or wet surfaces are more difficult. Being completely upside down requires concentration.",ruleBreaker:"The character can cling to ceilings and walls made of any material with any type of surface, slippery or not."},{name:"X-Ray Vision",attribute:"CyberZen",ruleBender:"Not literally using X-Rays. Character can see through thin walls and clothes as though they weren't there.",ruleBreaker:"Character can see through lead and thick concrete as though it were not there."}],_l=[{category:"Equipment",items:["Desert Suit","Battle Suit (APU)","Thermal Wear (Light)","Thermal Wear (Medium)","Thermal Wear (Heavy)","Dig Dug","Canteen","Desert Tents","Nomad Stick","Climbing Gear","Land Mine","Plastic Explosive","TNT","Ration Packs","Infrared (IR) Goggles","Dark Particle Goggles","First Aid Gear","Punksmith Tools"]},{category:"Hardware",items:["Neural Interface","Skill Chips","Cyber Limbs","Skill Chip Processor","Operator's Broadcast Control Deck","Wifi Decoy"]},{category:"Weapons",items:["Bow","Crossbow","Chain Knife","Survival Knife","Chain Axe","Acid Gun","EMP Cannon","Laser Rifle","Net Gun","Plasma Cannon","Plasma Gun","Chain Sword","Cutter Sword","EMP Grenades","Throwing Knives","Gun Scopes",'Handgun "Fizbang"','Handgun "Gorilla Gun"','Handgun "Popper"','Handgun "Mini Grinder"','Rifle "Copperfield"','Rifle "Dragon Shroud II"','Shotgun "Peabody"','Shotgun "Xtrema"','Shotgun "Jackhammer"','SMG "Kommando"','SMG "Uzi"','Machine Gun "Skoda"','Machine Gun "Mauser Mini Gun"','Assault Rifle "AR-G3"','Assault Rifle "Chow Chat"','Assault Rifle "HK"']},{category:"Vehicles",items:["Speeder Hovercraft","Zion Military Hovercraft","Nomad Hovercraft","Torpedo Hovercraft","Squidi (Sentinel Frame)"]}],yl=[{category:"Equipment",items:["Cash & Credit Cards","Clothes","Phone","Fake IDs","Sunglasses","Extraction Apparatus","Bug Removal Tool","Beacon"]},{category:"Weapons",items:["Desert Eagle .50 cal","Beretta 92fs 9mm","S&W Revolver .38","H&K MP5","M-16","Mossberg Shotgun","Glock .45","Hand Grenade","RPG","M72 LAW Rocket","APS Machine Pistol","7mm Remington Sniper Rifle","Browning Hunting Rifle","Tanto Survival Knife","Throwing Knives","Ruger .22","Katana","Rapier"]},{category:"Vehicles",items:["Ducati Motorcycle","Harley Davidson Hog","Ferrari Sports Car","Subaru Sedan","Ford Compact Car","Mercedes Luxury Sedan","Jeep SUV","Toyota Mini Van","U-Move Small Truck (20')","Mac Truck (30')"]}],vl=[{category:"Real World Vehicles",items:["Speeder Hovercraft","Zion Military Hovercraft","Nomad Hovercraft","Torpedo Hovercraft","Squidi (Sentinel Frame)"]},{category:"Simulacra Vehicles",items:["Ducati Motorcycle","Harley Davidson Hog","Ferrari Sports Car","Subaru Sedan","Ford Compact Car","Mercedes Luxury Sedan","Jeep SUV","Toyota Mini Van","U-Move Small Truck (20')","Mac Truck (30')"]}],bl=["Captain","Operator","Fixer","Informant","Analyst","Smuggler","Medic","Mechanic","Resistance Fighter","Zion Council Member","Black Market Dealer","Bluepill Informant","Underground Hacker","Former Agent"],wl=["RSI Hacker","Homegrown (Freeborn)","Matrix Operator","Mercenary","Hot Shot Pilot","Punksmith"],Cl=["Zion Resistance","Crystal Shard","Utopia","Nomad Clans"],Sl=["Pod-born","Surface-born","Freeborn","Nomad"],El=["Speeder Hovercraft","Zion Military Hovercraft","Nomad Hovercraft","Torpedo Hovercraft"],es={apiKey:"AIzaSyDqcgJnjZGri2lr-9hYYqjEFcXu0m4o3OA",authDomain:"unmatrixrpg-101.firebaseapp.com",databaseURL:"https://unmatrixrpg-101-default-rtdb.firebaseio.com/",projectId:"unmatrixrpg-101",storageBucket:"unmatrixrpg-101.firebasestorage.app",messagingSenderId:"279940726263",appId:"1:279940726263:web:b1b1c4353b4f4323ccc2f2",measurementId:"G-8DZ3ZY25WG"},kl=()=>{};var Ci={};/**
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
 */const Pr={NODE_ADMIN:!1,SDK_VERSION:"${JSCORE_VERSION}"};/**
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
 */const m=function(t,e){if(!t)throw it(e)},it=function(t){return new Error("Firebase Database ("+Pr.SDK_VERSION+") INTERNAL ASSERT FAILED: "+t)};/**
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
 */const Dr=function(t){const e=[];let n=0;for(let s=0;s<t.length;s++){let i=t.charCodeAt(s);i<128?e[n++]=i:i<2048?(e[n++]=i>>6|192,e[n++]=i&63|128):(i&64512)===55296&&s+1<t.length&&(t.charCodeAt(s+1)&64512)===56320?(i=65536+((i&1023)<<10)+(t.charCodeAt(++s)&1023),e[n++]=i>>18|240,e[n++]=i>>12&63|128,e[n++]=i>>6&63|128,e[n++]=i&63|128):(e[n++]=i>>12|224,e[n++]=i>>6&63|128,e[n++]=i&63|128)}return e},Tl=function(t){const e=[];let n=0,s=0;for(;n<t.length;){const i=t[n++];if(i<128)e[s++]=String.fromCharCode(i);else if(i>191&&i<224){const r=t[n++];e[s++]=String.fromCharCode((i&31)<<6|r&63)}else if(i>239&&i<365){const r=t[n++],o=t[n++],a=t[n++],l=((i&7)<<18|(r&63)<<12|(o&63)<<6|a&63)-65536;e[s++]=String.fromCharCode(55296+(l>>10)),e[s++]=String.fromCharCode(56320+(l&1023))}else{const r=t[n++],o=t[n++];e[s++]=String.fromCharCode((i&15)<<12|(r&63)<<6|o&63)}}return e.join("")},Is={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(t,e){if(!Array.isArray(t))throw Error("encodeByteArray takes an array as a parameter");this.init_();const n=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,s=[];for(let i=0;i<t.length;i+=3){const r=t[i],o=i+1<t.length,a=o?t[i+1]:0,l=i+2<t.length,c=l?t[i+2]:0,d=r>>2,h=(r&3)<<4|a>>4;let f=(a&15)<<2|c>>6,g=c&63;l||(g=64,o||(f=64)),s.push(n[d],n[h],n[f],n[g])}return s.join("")},encodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(t):this.encodeByteArray(Dr(t),e)},decodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(t):Tl(this.decodeStringToByteArray(t,e))},decodeStringToByteArray(t,e){this.init_();const n=e?this.charToByteMapWebSafe_:this.charToByteMap_,s=[];for(let i=0;i<t.length;){const r=n[t.charAt(i++)],a=i<t.length?n[t.charAt(i)]:0;++i;const c=i<t.length?n[t.charAt(i)]:64;++i;const h=i<t.length?n[t.charAt(i)]:64;if(++i,r==null||a==null||c==null||h==null)throw new Il;const f=r<<2|a>>4;if(s.push(f),c!==64){const g=a<<4&240|c>>2;if(s.push(g),h!==64){const _=c<<6&192|h;s.push(_)}}}return s},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let t=0;t<this.ENCODED_VALS.length;t++)this.byteToCharMap_[t]=this.ENCODED_VALS.charAt(t),this.charToByteMap_[this.byteToCharMap_[t]]=t,this.byteToCharMapWebSafe_[t]=this.ENCODED_VALS_WEBSAFE.charAt(t),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[t]]=t,t>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(t)]=t,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(t)]=t)}}};class Il extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const Or=function(t){const e=Dr(t);return Is.encodeByteArray(e,!0)},sn=function(t){return Or(t).replace(/\./g,"")},ts=function(t){try{return Is.decodeString(t,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
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
 */function Nl(t){return Mr(void 0,t)}function Mr(t,e){if(!(e instanceof Object))return e;switch(e.constructor){case Date:const n=e;return new Date(n.getTime());case Object:t===void 0&&(t={});break;case Array:t=[];break;default:return e}for(const n in e)!e.hasOwnProperty(n)||!Al(n)||(t[n]=Mr(t[n],e[n]));return t}function Al(t){return t!=="__proto__"}/**
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
 */function Rl(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
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
 */const xl=()=>Rl().__FIREBASE_DEFAULTS__,Pl=()=>{if(typeof process>"u"||typeof Ci>"u")return;const t=Ci.__FIREBASE_DEFAULTS__;if(t)return JSON.parse(t)},Dl=()=>{if(typeof document>"u")return;let t;try{t=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=t&&ts(t[1]);return e&&JSON.parse(e)},Lr=()=>{try{return kl()||xl()||Pl()||Dl()}catch(t){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${t}`);return}},Ol=t=>{var e,n;return(n=(e=Lr())==null?void 0:e.emulatorHosts)==null?void 0:n[t]},Ml=t=>{const e=Ol(t);if(!e)return;const n=e.lastIndexOf(":");if(n<=0||n+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);const s=parseInt(e.substring(n+1),10);return e[0]==="["?[e.substring(1,n-1),s]:[e.substring(0,n),s]},Fr=()=>{var t;return(t=Lr())==null?void 0:t.config};/**
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
 */class le{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,n)=>{this.resolve=e,this.reject=n})}wrapCallback(e){return(n,s)=>{n?this.reject(n):this.resolve(s),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(n):e(n,s))}}}/**
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
 */function Ll(t,e){if(t.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const n={alg:"none",type:"JWT"},s=e||"demo-project",i=t.iat||0,r=t.sub||t.user_id;if(!r)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const o={iss:`https://securetoken.google.com/${s}`,aud:s,iat:i,exp:i+3600,auth_time:i,sub:r,user_id:r,firebase:{sign_in_provider:"custom",identities:{}},...t};return[sn(JSON.stringify(n)),sn(JSON.stringify(o)),""].join(".")}/**
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
 */function Fl(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function $r(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(Fl())}function $l(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function Bl(){return Pr.NODE_ADMIN===!0}function Wl(){try{return typeof indexedDB=="object"}catch{return!1}}function Hl(){return new Promise((t,e)=>{try{let n=!0;const s="validate-browser-context-for-indexeddb-analytics-module",i=self.indexedDB.open(s);i.onsuccess=()=>{i.result.close(),n||self.indexedDB.deleteDatabase(s),t(!0)},i.onupgradeneeded=()=>{n=!1},i.onerror=()=>{var r;e(((r=i.error)==null?void 0:r.message)||"")}}catch(n){e(n)}})}/**
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
 */const Ul="FirebaseError";class Wt extends Error{constructor(e,n,s){super(n),this.code=e,this.customData=s,this.name=Ul,Object.setPrototypeOf(this,Wt.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,Br.prototype.create)}}class Br{constructor(e,n,s){this.service=e,this.serviceName=n,this.errors=s}create(e,...n){const s=n[0]||{},i=`${this.service}/${e}`,r=this.errors[e],o=r?ql(r,s):"Error",a=`${this.serviceName}: ${o} (${i}).`;return new Wt(i,a,s)}}function ql(t,e){return t.replace(jl,(n,s)=>{const i=e[s];return i!=null?String(i):`<${s}?>`})}const jl=/\{\$([^}]+)}/g;/**
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
 */function kt(t){return JSON.parse(t)}function H(t){return JSON.stringify(t)}/**
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
 */const Wr=function(t){let e={},n={},s={},i="";try{const r=t.split(".");e=kt(ts(r[0])||""),n=kt(ts(r[1])||""),i=r[2],s=n.d||{},delete n.d}catch{}return{header:e,claims:n,data:s,signature:i}},Gl=function(t){const e=Wr(t),n=e.claims;return!!n&&typeof n=="object"&&n.hasOwnProperty("iat")},Vl=function(t){const e=Wr(t).claims;return typeof e=="object"&&e.admin===!0};/**
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
 */function oe(t,e){return Object.prototype.hasOwnProperty.call(t,e)}function Ze(t,e){if(Object.prototype.hasOwnProperty.call(t,e))return t[e]}function ns(t){for(const e in t)if(Object.prototype.hasOwnProperty.call(t,e))return!1;return!0}function rn(t,e,n){const s={};for(const i in t)Object.prototype.hasOwnProperty.call(t,i)&&(s[i]=e.call(n,t[i],i,t));return s}function on(t,e){if(t===e)return!0;const n=Object.keys(t),s=Object.keys(e);for(const i of n){if(!s.includes(i))return!1;const r=t[i],o=e[i];if(Si(r)&&Si(o)){if(!on(r,o))return!1}else if(r!==o)return!1}for(const i of s)if(!n.includes(i))return!1;return!0}function Si(t){return t!==null&&typeof t=="object"}/**
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
 */function zl(t){const e=[];for(const[n,s]of Object.entries(t))Array.isArray(s)?s.forEach(i=>{e.push(encodeURIComponent(n)+"="+encodeURIComponent(i))}):e.push(encodeURIComponent(n)+"="+encodeURIComponent(s));return e.length?"&"+e.join("&"):""}/**
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
 */class Kl{constructor(){this.chain_=[],this.buf_=[],this.W_=[],this.pad_=[],this.inbuf_=0,this.total_=0,this.blockSize=512/8,this.pad_[0]=128;for(let e=1;e<this.blockSize;++e)this.pad_[e]=0;this.reset()}reset(){this.chain_[0]=1732584193,this.chain_[1]=4023233417,this.chain_[2]=2562383102,this.chain_[3]=271733878,this.chain_[4]=3285377520,this.inbuf_=0,this.total_=0}compress_(e,n){n||(n=0);const s=this.W_;if(typeof e=="string")for(let h=0;h<16;h++)s[h]=e.charCodeAt(n)<<24|e.charCodeAt(n+1)<<16|e.charCodeAt(n+2)<<8|e.charCodeAt(n+3),n+=4;else for(let h=0;h<16;h++)s[h]=e[n]<<24|e[n+1]<<16|e[n+2]<<8|e[n+3],n+=4;for(let h=16;h<80;h++){const f=s[h-3]^s[h-8]^s[h-14]^s[h-16];s[h]=(f<<1|f>>>31)&4294967295}let i=this.chain_[0],r=this.chain_[1],o=this.chain_[2],a=this.chain_[3],l=this.chain_[4],c,d;for(let h=0;h<80;h++){h<40?h<20?(c=a^r&(o^a),d=1518500249):(c=r^o^a,d=1859775393):h<60?(c=r&o|a&(r|o),d=2400959708):(c=r^o^a,d=3395469782);const f=(i<<5|i>>>27)+c+l+d+s[h]&4294967295;l=a,a=o,o=(r<<30|r>>>2)&4294967295,r=i,i=f}this.chain_[0]=this.chain_[0]+i&4294967295,this.chain_[1]=this.chain_[1]+r&4294967295,this.chain_[2]=this.chain_[2]+o&4294967295,this.chain_[3]=this.chain_[3]+a&4294967295,this.chain_[4]=this.chain_[4]+l&4294967295}update(e,n){if(e==null)return;n===void 0&&(n=e.length);const s=n-this.blockSize;let i=0;const r=this.buf_;let o=this.inbuf_;for(;i<n;){if(o===0)for(;i<=s;)this.compress_(e,i),i+=this.blockSize;if(typeof e=="string"){for(;i<n;)if(r[o]=e.charCodeAt(i),++o,++i,o===this.blockSize){this.compress_(r),o=0;break}}else for(;i<n;)if(r[o]=e[i],++o,++i,o===this.blockSize){this.compress_(r),o=0;break}}this.inbuf_=o,this.total_+=n}digest(){const e=[];let n=this.total_*8;this.inbuf_<56?this.update(this.pad_,56-this.inbuf_):this.update(this.pad_,this.blockSize-(this.inbuf_-56));for(let i=this.blockSize-1;i>=56;i--)this.buf_[i]=n&255,n/=256;this.compress_(this.buf_);let s=0;for(let i=0;i<5;i++)for(let r=24;r>=0;r-=8)e[s]=this.chain_[i]>>r&255,++s;return e}}function Qe(t,e){return`${t} failed: ${e} argument `}/**
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
 */const Yl=function(t){const e=[];let n=0;for(let s=0;s<t.length;s++){let i=t.charCodeAt(s);if(i>=55296&&i<=56319){const r=i-55296;s++,m(s<t.length,"Surrogate pair missing trail surrogate.");const o=t.charCodeAt(s)-56320;i=65536+(r<<10)+o}i<128?e[n++]=i:i<2048?(e[n++]=i>>6|192,e[n++]=i&63|128):i<65536?(e[n++]=i>>12|224,e[n++]=i>>6&63|128,e[n++]=i&63|128):(e[n++]=i>>18|240,e[n++]=i>>12&63|128,e[n++]=i>>6&63|128,e[n++]=i&63|128)}return e},Sn=function(t){let e=0;for(let n=0;n<t.length;n++){const s=t.charCodeAt(n);s<128?e++:s<2048?e+=2:s>=55296&&s<=56319?(e+=4,n++):e+=3}return e};/**
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
 */function Hr(t){try{return(t.startsWith("http://")||t.startsWith("https://")?new URL(t).hostname:t).endsWith(".cloudworkstations.dev")}catch{return!1}}async function Zl(t){return(await fetch(t,{credentials:"include"})).ok}class Tt{constructor(e,n,s){this.name=e,this.instanceFactory=n,this.type=s,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
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
 */const Ee="[DEFAULT]";/**
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
 */class Ql{constructor(e,n){this.name=e,this.container=n,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const n=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(n)){const s=new le;if(this.instancesDeferred.set(n,s),this.isInitialized(n)||this.shouldAutoInitialize())try{const i=this.getOrInitializeService({instanceIdentifier:n});i&&s.resolve(i)}catch{}}return this.instancesDeferred.get(n).promise}getImmediate(e){const n=this.normalizeInstanceIdentifier(e==null?void 0:e.identifier),s=(e==null?void 0:e.optional)??!1;if(this.isInitialized(n)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:n})}catch(i){if(s)return null;throw i}else{if(s)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(Xl(e))try{this.getOrInitializeService({instanceIdentifier:Ee})}catch{}for(const[n,s]of this.instancesDeferred.entries()){const i=this.normalizeInstanceIdentifier(n);try{const r=this.getOrInitializeService({instanceIdentifier:i});s.resolve(r)}catch{}}}}clearInstance(e=Ee){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(n=>"INTERNAL"in n).map(n=>n.INTERNAL.delete()),...e.filter(n=>"_delete"in n).map(n=>n._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=Ee){return this.instances.has(e)}getOptions(e=Ee){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:n={}}=e,s=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(s))throw Error(`${this.name}(${s}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const i=this.getOrInitializeService({instanceIdentifier:s,options:n});for(const[r,o]of this.instancesDeferred.entries()){const a=this.normalizeInstanceIdentifier(r);s===a&&o.resolve(i)}return i}onInit(e,n){const s=this.normalizeInstanceIdentifier(n),i=this.onInitCallbacks.get(s)??new Set;i.add(e),this.onInitCallbacks.set(s,i);const r=this.instances.get(s);return r&&e(r,s),()=>{i.delete(e)}}invokeOnInitCallbacks(e,n){const s=this.onInitCallbacks.get(n);if(s)for(const i of s)try{i(e,n)}catch{}}getOrInitializeService({instanceIdentifier:e,options:n={}}){let s=this.instances.get(e);if(!s&&this.component&&(s=this.component.instanceFactory(this.container,{instanceIdentifier:Jl(e),options:n}),this.instances.set(e,s),this.instancesOptions.set(e,n),this.invokeOnInitCallbacks(s,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,s)}catch{}return s||null}normalizeInstanceIdentifier(e=Ee){return this.component?this.component.multipleInstances?e:Ee:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function Jl(t){return t===Ee?void 0:t}function Xl(t){return t.instantiationMode==="EAGER"}/**
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
 */class ec{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const n=this.getProvider(e.name);if(n.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);n.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const n=new Ql(e,this);return this.providers.set(e,n),n}getProviders(){return Array.from(this.providers.values())}}/**
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
 */var x;(function(t){t[t.DEBUG=0]="DEBUG",t[t.VERBOSE=1]="VERBOSE",t[t.INFO=2]="INFO",t[t.WARN=3]="WARN",t[t.ERROR=4]="ERROR",t[t.SILENT=5]="SILENT"})(x||(x={}));const tc={debug:x.DEBUG,verbose:x.VERBOSE,info:x.INFO,warn:x.WARN,error:x.ERROR,silent:x.SILENT},nc=x.INFO,sc={[x.DEBUG]:"log",[x.VERBOSE]:"log",[x.INFO]:"info",[x.WARN]:"warn",[x.ERROR]:"error"},ic=(t,e,...n)=>{if(e<t.logLevel)return;const s=new Date().toISOString(),i=sc[e];if(i)console[i](`[${s}]  ${t.name}:`,...n);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class Ur{constructor(e){this.name=e,this._logLevel=nc,this._logHandler=ic,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in x))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?tc[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,x.DEBUG,...e),this._logHandler(this,x.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,x.VERBOSE,...e),this._logHandler(this,x.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,x.INFO,...e),this._logHandler(this,x.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,x.WARN,...e),this._logHandler(this,x.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,x.ERROR,...e),this._logHandler(this,x.ERROR,...e)}}const rc=(t,e)=>e.some(n=>t instanceof n);let Ei,ki;function oc(){return Ei||(Ei=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function ac(){return ki||(ki=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const qr=new WeakMap,ss=new WeakMap,jr=new WeakMap,$n=new WeakMap,Ns=new WeakMap;function lc(t){const e=new Promise((n,s)=>{const i=()=>{t.removeEventListener("success",r),t.removeEventListener("error",o)},r=()=>{n(ge(t.result)),i()},o=()=>{s(t.error),i()};t.addEventListener("success",r),t.addEventListener("error",o)});return e.then(n=>{n instanceof IDBCursor&&qr.set(n,t)}).catch(()=>{}),Ns.set(e,t),e}function cc(t){if(ss.has(t))return;const e=new Promise((n,s)=>{const i=()=>{t.removeEventListener("complete",r),t.removeEventListener("error",o),t.removeEventListener("abort",o)},r=()=>{n(),i()},o=()=>{s(t.error||new DOMException("AbortError","AbortError")),i()};t.addEventListener("complete",r),t.addEventListener("error",o),t.addEventListener("abort",o)});ss.set(t,e)}let is={get(t,e,n){if(t instanceof IDBTransaction){if(e==="done")return ss.get(t);if(e==="objectStoreNames")return t.objectStoreNames||jr.get(t);if(e==="store")return n.objectStoreNames[1]?void 0:n.objectStore(n.objectStoreNames[0])}return ge(t[e])},set(t,e,n){return t[e]=n,!0},has(t,e){return t instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in t}};function hc(t){is=t(is)}function dc(t){return t===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...n){const s=t.call(Bn(this),e,...n);return jr.set(s,e.sort?e.sort():[e]),ge(s)}:ac().includes(t)?function(...e){return t.apply(Bn(this),e),ge(qr.get(this))}:function(...e){return ge(t.apply(Bn(this),e))}}function uc(t){return typeof t=="function"?dc(t):(t instanceof IDBTransaction&&cc(t),rc(t,oc())?new Proxy(t,is):t)}function ge(t){if(t instanceof IDBRequest)return lc(t);if($n.has(t))return $n.get(t);const e=uc(t);return e!==t&&($n.set(t,e),Ns.set(e,t)),e}const Bn=t=>Ns.get(t);function fc(t,e,{blocked:n,upgrade:s,blocking:i,terminated:r}={}){const o=indexedDB.open(t,e),a=ge(o);return s&&o.addEventListener("upgradeneeded",l=>{s(ge(o.result),l.oldVersion,l.newVersion,ge(o.transaction),l)}),n&&o.addEventListener("blocked",l=>n(l.oldVersion,l.newVersion,l)),a.then(l=>{r&&l.addEventListener("close",()=>r()),i&&l.addEventListener("versionchange",c=>i(c.oldVersion,c.newVersion,c))}).catch(()=>{}),a}const pc=["get","getKey","getAll","getAllKeys","count"],mc=["put","add","delete","clear"],Wn=new Map;function Ti(t,e){if(!(t instanceof IDBDatabase&&!(e in t)&&typeof e=="string"))return;if(Wn.get(e))return Wn.get(e);const n=e.replace(/FromIndex$/,""),s=e!==n,i=mc.includes(n);if(!(n in(s?IDBIndex:IDBObjectStore).prototype)||!(i||pc.includes(n)))return;const r=async function(o,...a){const l=this.transaction(o,i?"readwrite":"readonly");let c=l.store;return s&&(c=c.index(a.shift())),(await Promise.all([c[n](...a),i&&l.done]))[0]};return Wn.set(e,r),r}hc(t=>({...t,get:(e,n,s)=>Ti(e,n)||t.get(e,n,s),has:(e,n)=>!!Ti(e,n)||t.has(e,n)}));/**
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
 */class gc{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(n=>{if(_c(n)){const s=n.getImmediate();return`${s.library}/${s.version}`}else return null}).filter(n=>n).join(" ")}}function _c(t){const e=t.getComponent();return(e==null?void 0:e.type)==="VERSION"}const rs="@firebase/app",Ii="0.14.12";/**
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
 */const de=new Ur("@firebase/app"),yc="@firebase/app-compat",vc="@firebase/analytics-compat",bc="@firebase/analytics",wc="@firebase/app-check-compat",Cc="@firebase/app-check",Sc="@firebase/auth",Ec="@firebase/auth-compat",kc="@firebase/database",Tc="@firebase/data-connect",Ic="@firebase/database-compat",Nc="@firebase/functions",Ac="@firebase/functions-compat",Rc="@firebase/installations",xc="@firebase/installations-compat",Pc="@firebase/messaging",Dc="@firebase/messaging-compat",Oc="@firebase/performance",Mc="@firebase/performance-compat",Lc="@firebase/remote-config",Fc="@firebase/remote-config-compat",$c="@firebase/storage",Bc="@firebase/storage-compat",Wc="@firebase/firestore",Hc="@firebase/ai",Uc="@firebase/firestore-compat",qc="firebase",jc="12.13.0";/**
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
 */const os="[DEFAULT]",Gc={[rs]:"fire-core",[yc]:"fire-core-compat",[bc]:"fire-analytics",[vc]:"fire-analytics-compat",[Cc]:"fire-app-check",[wc]:"fire-app-check-compat",[Sc]:"fire-auth",[Ec]:"fire-auth-compat",[kc]:"fire-rtdb",[Tc]:"fire-data-connect",[Ic]:"fire-rtdb-compat",[Nc]:"fire-fn",[Ac]:"fire-fn-compat",[Rc]:"fire-iid",[xc]:"fire-iid-compat",[Pc]:"fire-fcm",[Dc]:"fire-fcm-compat",[Oc]:"fire-perf",[Mc]:"fire-perf-compat",[Lc]:"fire-rc",[Fc]:"fire-rc-compat",[$c]:"fire-gcs",[Bc]:"fire-gcs-compat",[Wc]:"fire-fst",[Uc]:"fire-fst-compat",[Hc]:"fire-vertex","fire-js":"fire-js",[qc]:"fire-js-all"};/**
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
 */const an=new Map,Vc=new Map,as=new Map;function Ni(t,e){try{t.container.addComponent(e)}catch(n){de.debug(`Component ${e.name} failed to register with FirebaseApp ${t.name}`,n)}}function ln(t){const e=t.name;if(as.has(e))return de.debug(`There were multiple attempts to register component ${e}.`),!1;as.set(e,t);for(const n of an.values())Ni(n,t);for(const n of Vc.values())Ni(n,t);return!0}function zc(t,e){const n=t.container.getProvider("heartbeat").getImmediate({optional:!0});return n&&n.triggerHeartbeat(),t.container.getProvider(e)}function Kc(t){return t==null?!1:t.settings!==void 0}/**
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
 */const Yc={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},_e=new Br("app","Firebase",Yc);/**
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
 */class Zc{constructor(e,n,s){this._isDeleted=!1,this._options={...e},this._config={...n},this._name=n.name,this._automaticDataCollectionEnabled=n.automaticDataCollectionEnabled,this._container=s,this.container.addComponent(new Tt("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw _e.create("app-deleted",{appName:this._name})}}/**
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
 */const Qc=jc;function Gr(t,e={}){let n=t;typeof e!="object"&&(e={name:e});const s={name:os,automaticDataCollectionEnabled:!0,...e},i=s.name;if(typeof i!="string"||!i)throw _e.create("bad-app-name",{appName:String(i)});if(n||(n=Fr()),!n)throw _e.create("no-options");const r=an.get(i);if(r){if(on(n,r.options)&&on(s,r.config))return r;throw _e.create("duplicate-app",{appName:i})}const o=new ec(i);for(const l of as.values())o.addComponent(l);const a=new Zc(n,s,o);return an.set(i,a),a}function Jc(t=os){const e=an.get(t);if(!e&&t===os&&Fr())return Gr();if(!e)throw _e.create("no-app",{appName:t});return e}function je(t,e,n){let s=Gc[t]??t;n&&(s+=`-${n}`);const i=s.match(/\s|\//),r=e.match(/\s|\//);if(i||r){const o=[`Unable to register library "${s}" with version "${e}":`];i&&o.push(`library name "${s}" contains illegal characters (whitespace or "/")`),i&&r&&o.push("and"),r&&o.push(`version name "${e}" contains illegal characters (whitespace or "/")`),de.warn(o.join(" "));return}ln(new Tt(`${s}-version`,()=>({library:s,version:e}),"VERSION"))}/**
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
 */const Xc="firebase-heartbeat-database",eh=1,It="firebase-heartbeat-store";let Hn=null;function Vr(){return Hn||(Hn=fc(Xc,eh,{upgrade:(t,e)=>{switch(e){case 0:try{t.createObjectStore(It)}catch(n){console.warn(n)}}}}).catch(t=>{throw _e.create("idb-open",{originalErrorMessage:t.message})})),Hn}async function th(t){try{const n=(await Vr()).transaction(It),s=await n.objectStore(It).get(zr(t));return await n.done,s}catch(e){if(e instanceof Wt)de.warn(e.message);else{const n=_e.create("idb-get",{originalErrorMessage:e==null?void 0:e.message});de.warn(n.message)}}}async function Ai(t,e){try{const s=(await Vr()).transaction(It,"readwrite");await s.objectStore(It).put(e,zr(t)),await s.done}catch(n){if(n instanceof Wt)de.warn(n.message);else{const s=_e.create("idb-set",{originalErrorMessage:n==null?void 0:n.message});de.warn(s.message)}}}function zr(t){return`${t.name}!${t.options.appId}`}/**
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
 */const nh=1024,sh=30;class ih{constructor(e){this.container=e,this._heartbeatsCache=null;const n=this.container.getProvider("app").getImmediate();this._storage=new oh(n),this._heartbeatsCachePromise=this._storage.read().then(s=>(this._heartbeatsCache=s,s))}async triggerHeartbeat(){var e,n;try{const i=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),r=Ri();if(((e=this._heartbeatsCache)==null?void 0:e.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((n=this._heartbeatsCache)==null?void 0:n.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===r||this._heartbeatsCache.heartbeats.some(o=>o.date===r))return;if(this._heartbeatsCache.heartbeats.push({date:r,agent:i}),this._heartbeatsCache.heartbeats.length>sh){const o=ah(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(o,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(s){de.warn(s)}}async getHeartbeatsHeader(){var e;try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((e=this._heartbeatsCache)==null?void 0:e.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";const n=Ri(),{heartbeatsToSend:s,unsentEntries:i}=rh(this._heartbeatsCache.heartbeats),r=sn(JSON.stringify({version:2,heartbeats:s}));return this._heartbeatsCache.lastSentHeartbeatDate=n,i.length>0?(this._heartbeatsCache.heartbeats=i,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),r}catch(n){return de.warn(n),""}}}function Ri(){return new Date().toISOString().substring(0,10)}function rh(t,e=nh){const n=[];let s=t.slice();for(const i of t){const r=n.find(o=>o.agent===i.agent);if(r){if(r.dates.push(i.date),xi(n)>e){r.dates.pop();break}}else if(n.push({agent:i.agent,dates:[i.date]}),xi(n)>e){n.pop();break}s=s.slice(1)}return{heartbeatsToSend:n,unsentEntries:s}}class oh{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return Wl()?Hl().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const n=await th(this.app);return n!=null&&n.heartbeats?n:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){if(await this._canUseIndexedDBPromise){const s=await this.read();return Ai(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??s.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){if(await this._canUseIndexedDBPromise){const s=await this.read();return Ai(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??s.lastSentHeartbeatDate,heartbeats:[...s.heartbeats,...e.heartbeats]})}else return}}function xi(t){return sn(JSON.stringify({version:2,heartbeats:t})).length}function ah(t){if(t.length===0)return-1;let e=0,n=t[0].date;for(let s=1;s<t.length;s++)t[s].date<n&&(n=t[s].date,e=s);return e}/**
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
 */function lh(t){ln(new Tt("platform-logger",e=>new gc(e),"PRIVATE")),ln(new Tt("heartbeat",e=>new ih(e),"PRIVATE")),je(rs,Ii,t),je(rs,Ii,"esm2020"),je("fire-js","")}lh("");var ch="firebase",hh="12.13.0";/**
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
 */je(ch,hh,"app");var Pi={};const Di="@firebase/database",Oi="1.1.3";/**
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
 */let Kr="";function dh(t){Kr=t}/**
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
 */class uh{constructor(e){this.domStorage_=e,this.prefix_="firebase:"}set(e,n){n==null?this.domStorage_.removeItem(this.prefixedName_(e)):this.domStorage_.setItem(this.prefixedName_(e),H(n))}get(e){const n=this.domStorage_.getItem(this.prefixedName_(e));return n==null?null:kt(n)}remove(e){this.domStorage_.removeItem(this.prefixedName_(e))}prefixedName_(e){return this.prefix_+e}toString(){return this.domStorage_.toString()}}/**
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
 */class fh{constructor(){this.cache_={},this.isInMemoryStorage=!0}set(e,n){n==null?delete this.cache_[e]:this.cache_[e]=n}get(e){return oe(this.cache_,e)?this.cache_[e]:null}remove(e){delete this.cache_[e]}}/**
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
 */const Yr=function(t){try{if(typeof window<"u"&&typeof window[t]<"u"){const e=window[t];return e.setItem("firebase:sentinel","cache"),e.removeItem("firebase:sentinel"),new uh(e)}}catch{}return new fh},Ie=Yr("localStorage"),ph=Yr("sessionStorage");/**
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
 */const Ge=new Ur("@firebase/database"),mh=function(){let t=1;return function(){return t++}}(),Zr=function(t){const e=Yl(t),n=new Kl;n.update(e);const s=n.digest();return Is.encodeByteArray(s)},Ht=function(...t){let e="";for(let n=0;n<t.length;n++){const s=t[n];Array.isArray(s)||s&&typeof s=="object"&&typeof s.length=="number"?e+=Ht.apply(null,s):typeof s=="object"?e+=H(s):e+=s,e+=" "}return e};let yt=null,Mi=!0;const gh=function(t,e){m(!0,"Can't turn on custom loggers persistently."),Ge.logLevel=x.VERBOSE,yt=Ge.log.bind(Ge)},U=function(...t){if(Mi===!0&&(Mi=!1,yt===null&&ph.get("logging_enabled")===!0&&gh()),yt){const e=Ht.apply(null,t);yt(e)}},Ut=function(t){return function(...e){U(t,...e)}},ls=function(...t){const e="FIREBASE INTERNAL ERROR: "+Ht(...t);Ge.error(e)},ue=function(...t){const e=`FIREBASE FATAL ERROR: ${Ht(...t)}`;throw Ge.error(e),new Error(e)},z=function(...t){const e="FIREBASE WARNING: "+Ht(...t);Ge.warn(e)},_h=function(){typeof window<"u"&&window.location&&window.location.protocol&&window.location.protocol.indexOf("https:")!==-1&&z("Insecure Firebase access from a secure page. Please use https in calls to new Firebase().")},En=function(t){return typeof t=="number"&&(t!==t||t===Number.POSITIVE_INFINITY||t===Number.NEGATIVE_INFINITY)},yh=function(t){if(document.readyState==="complete")t();else{let e=!1;const n=function(){if(!document.body){setTimeout(n,Math.floor(10));return}e||(e=!0,t())};document.addEventListener?(document.addEventListener("DOMContentLoaded",n,!1),window.addEventListener("load",n,!1)):document.attachEvent&&(document.attachEvent("onreadystatechange",()=>{document.readyState==="complete"&&n()}),window.attachEvent("onload",n))}},Je="[MIN_NAME]",Re="[MAX_NAME]",Le=function(t,e){if(t===e)return 0;if(t===Je||e===Re)return-1;if(e===Je||t===Re)return 1;{const n=Li(t),s=Li(e);return n!==null?s!==null?n-s===0?t.length-e.length:n-s:-1:s!==null?1:t<e?-1:1}},vh=function(t,e){return t===e?0:t<e?-1:1},ct=function(t,e){if(e&&t in e)return e[t];throw new Error("Missing required key ("+t+") in object: "+H(e))},As=function(t){if(typeof t!="object"||t===null)return H(t);const e=[];for(const s in t)e.push(s);e.sort();let n="{";for(let s=0;s<e.length;s++)s!==0&&(n+=","),n+=H(e[s]),n+=":",n+=As(t[e[s]]);return n+="}",n},Qr=function(t,e){const n=t.length;if(n<=e)return[t];const s=[];for(let i=0;i<n;i+=e)i+e>n?s.push(t.substring(i,n)):s.push(t.substring(i,i+e));return s};function q(t,e){for(const n in t)t.hasOwnProperty(n)&&e(n,t[n])}const Jr=function(t){m(!En(t),"Invalid JSON number");const e=11,n=52,s=(1<<e-1)-1;let i,r,o,a,l;t===0?(r=0,o=0,i=1/t===-1/0?1:0):(i=t<0,t=Math.abs(t),t>=Math.pow(2,1-s)?(a=Math.min(Math.floor(Math.log(t)/Math.LN2),s),r=a+s,o=Math.round(t*Math.pow(2,n-a)-Math.pow(2,n))):(r=0,o=Math.round(t/Math.pow(2,1-s-n))));const c=[];for(l=n;l;l-=1)c.push(o%2?1:0),o=Math.floor(o/2);for(l=e;l;l-=1)c.push(r%2?1:0),r=Math.floor(r/2);c.push(i?1:0),c.reverse();const d=c.join("");let h="";for(l=0;l<64;l+=8){let f=parseInt(d.substr(l,8),2).toString(16);f.length===1&&(f="0"+f),h=h+f}return h.toLowerCase()},bh=function(){return!!(typeof window=="object"&&window.chrome&&window.chrome.extension&&!/^chrome/.test(window.location.href))},wh=function(){return typeof Windows=="object"&&typeof Windows.UI=="object"};function Ch(t,e){let n="Unknown Error";t==="too_big"?n="The data requested exceeds the maximum size that can be accessed with a single request.":t==="permission_denied"?n="Client doesn't have permission to access the desired data.":t==="unavailable"&&(n="The service is unavailable");const s=new Error(t+" at "+e._path.toString()+": "+n);return s.code=t.toUpperCase(),s}const Sh=new RegExp("^-?(0*)\\d{1,10}$"),Eh=-2147483648,kh=2147483647,Li=function(t){if(Sh.test(t)){const e=Number(t);if(e>=Eh&&e<=kh)return e}return null},ot=function(t){try{t()}catch(e){setTimeout(()=>{const n=e.stack||"";throw z("Exception was thrown by user callback.",n),e},Math.floor(0))}},Th=function(){return(typeof window=="object"&&window.navigator&&window.navigator.userAgent||"").search(/googlebot|google webmaster tools|bingbot|yahoo! slurp|baiduspider|yandexbot|duckduckbot/i)>=0},vt=function(t,e){const n=setTimeout(t,e);return typeof n=="number"&&typeof Deno<"u"&&Deno.unrefTimer?Deno.unrefTimer(n):typeof n=="object"&&n.unref&&n.unref(),n};/**
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
 */class Ih{constructor(e,n){this.appCheckProvider=n,this.appName=e.name,Kc(e)&&e.settings.appCheckToken&&(this.serverAppAppCheckToken=e.settings.appCheckToken),this.appCheck=n==null?void 0:n.getImmediate({optional:!0}),this.appCheck||n==null||n.get().then(s=>this.appCheck=s)}getToken(e){if(this.serverAppAppCheckToken){if(e)throw new Error("Attempted reuse of `FirebaseServerApp.appCheckToken` after previous usage failed.");return Promise.resolve({token:this.serverAppAppCheckToken})}return this.appCheck?this.appCheck.getToken(e):new Promise((n,s)=>{setTimeout(()=>{this.appCheck?this.getToken(e).then(n,s):n(null)},0)})}addTokenChangeListener(e){var n;(n=this.appCheckProvider)==null||n.get().then(s=>s.addTokenListener(e))}notifyForInvalidToken(){z(`Provided AppCheck credentials for the app named "${this.appName}" are invalid. This usually indicates your app was not initialized correctly.`)}}/**
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
 */class Nh{constructor(e,n,s){this.appName_=e,this.firebaseOptions_=n,this.authProvider_=s,this.auth_=null,this.auth_=s.getImmediate({optional:!0}),this.auth_||s.onInit(i=>this.auth_=i)}getToken(e){return this.auth_?this.auth_.getToken(e).catch(n=>n&&n.code==="auth/token-not-initialized"?(U("Got auth/token-not-initialized error.  Treating as null token."),null):Promise.reject(n)):new Promise((n,s)=>{setTimeout(()=>{this.auth_?this.getToken(e).then(n,s):n(null)},0)})}addTokenChangeListener(e){this.auth_?this.auth_.addAuthTokenListener(e):this.authProvider_.get().then(n=>n.addAuthTokenListener(e))}removeTokenChangeListener(e){this.authProvider_.get().then(n=>n.removeAuthTokenListener(e))}notifyForInvalidToken(){let e='Provided authentication credentials for the app named "'+this.appName_+'" are invalid. This usually indicates your app was not initialized correctly. ';"credential"in this.firebaseOptions_?e+='Make sure the "credential" property provided to initializeApp() is authorized to access the specified "databaseURL" and is from the correct project.':"serviceAccount"in this.firebaseOptions_?e+='Make sure the "serviceAccount" property provided to initializeApp() is authorized to access the specified "databaseURL" and is from the correct project.':e+='Make sure the "apiKey" and "databaseURL" properties provided to initializeApp() match the values provided for your app at https://console.firebase.google.com/.',z(e)}}class en{constructor(e){this.accessToken=e}getToken(e){return Promise.resolve({accessToken:this.accessToken})}addTokenChangeListener(e){e(this.accessToken)}removeTokenChangeListener(e){}notifyForInvalidToken(){}}en.OWNER="owner";/**
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
 */const Rs="5",Xr="v",eo="s",to="r",no="f",so=/(console\.firebase|firebase-console-\w+\.corp|firebase\.corp)\.google\.com/,io="ls",ro="p",cs="ac",oo="websocket",ao="long_polling";/**
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
 */class lo{constructor(e,n,s,i,r=!1,o="",a=!1,l=!1,c=null){this.secure=n,this.namespace=s,this.webSocketOnly=i,this.nodeAdmin=r,this.persistenceKey=o,this.includeNamespaceInQueryParams=a,this.isUsingEmulator=l,this.emulatorOptions=c,this._host=e.toLowerCase(),this._domain=this._host.substr(this._host.indexOf(".")+1),this.internalHost=Ie.get("host:"+e)||this._host}isCacheableHost(){return this.internalHost.substr(0,2)==="s-"}isCustomHost(){return this._domain!=="firebaseio.com"&&this._domain!=="firebaseio-demo.com"}get host(){return this._host}set host(e){e!==this.internalHost&&(this.internalHost=e,this.isCacheableHost()&&Ie.set("host:"+this._host,this.internalHost))}toString(){let e=this.toURLString();return this.persistenceKey&&(e+="<"+this.persistenceKey+">"),e}toURLString(){const e=this.secure?"https://":"http://",n=this.includeNamespaceInQueryParams?`?ns=${this.namespace}`:"";return`${e}${this.host}/${n}`}}function Ah(t){return t.host!==t.internalHost||t.isCustomHost()||t.includeNamespaceInQueryParams}function co(t,e,n){m(typeof e=="string","typeof type must == string"),m(typeof n=="object","typeof params must == object");let s;if(e===oo)s=(t.secure?"wss://":"ws://")+t.internalHost+"/.ws?";else if(e===ao)s=(t.secure?"https://":"http://")+t.internalHost+"/.lp?";else throw new Error("Unknown connection type: "+e);Ah(t)&&(n.ns=t.namespace);const i=[];return q(n,(r,o)=>{i.push(r+"="+o)}),s+i.join("&")}/**
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
 */class Rh{constructor(){this.counters_={}}incrementCounter(e,n=1){oe(this.counters_,e)||(this.counters_[e]=0),this.counters_[e]+=n}get(){return Nl(this.counters_)}}/**
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
 */const Un={},qn={};function xs(t){const e=t.toString();return Un[e]||(Un[e]=new Rh),Un[e]}function xh(t,e){const n=t.toString();return qn[n]||(qn[n]=e()),qn[n]}/**
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
 */class Ph{constructor(e){this.onMessage_=e,this.pendingResponses=[],this.currentResponseNum=0,this.closeAfterResponse=-1,this.onClose=null}closeAfter(e,n){this.closeAfterResponse=e,this.onClose=n,this.closeAfterResponse<this.currentResponseNum&&(this.onClose(),this.onClose=null)}handleResponse(e,n){for(this.pendingResponses[e]=n;this.pendingResponses[this.currentResponseNum];){const s=this.pendingResponses[this.currentResponseNum];delete this.pendingResponses[this.currentResponseNum];for(let i=0;i<s.length;++i)s[i]&&ot(()=>{this.onMessage_(s[i])});if(this.currentResponseNum===this.closeAfterResponse){this.onClose&&(this.onClose(),this.onClose=null);break}this.currentResponseNum++}}}/**
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
 */const Fi="start",Dh="close",Oh="pLPCommand",Mh="pRTLPCB",ho="id",uo="pw",fo="ser",Lh="cb",Fh="seg",$h="ts",Bh="d",Wh="dframe",po=1870,mo=30,Hh=po-mo,Uh=25e3,qh=3e4;class He{constructor(e,n,s,i,r,o,a){this.connId=e,this.repoInfo=n,this.applicationId=s,this.appCheckToken=i,this.authToken=r,this.transportSessionId=o,this.lastSessionId=a,this.bytesSent=0,this.bytesReceived=0,this.everConnected_=!1,this.log_=Ut(e),this.stats_=xs(n),this.urlFn=l=>(this.appCheckToken&&(l[cs]=this.appCheckToken),co(n,ao,l))}open(e,n){this.curSegmentNum=0,this.onDisconnect_=n,this.myPacketOrderer=new Ph(e),this.isClosed_=!1,this.connectTimeoutTimer_=setTimeout(()=>{this.log_("Timed out trying to connect."),this.onClosed_(),this.connectTimeoutTimer_=null},Math.floor(qh)),yh(()=>{if(this.isClosed_)return;this.scriptTagHolder=new Ps((...r)=>{const[o,a,l,c,d]=r;if(this.incrementIncomingBytes_(r),!!this.scriptTagHolder)if(this.connectTimeoutTimer_&&(clearTimeout(this.connectTimeoutTimer_),this.connectTimeoutTimer_=null),this.everConnected_=!0,o===Fi)this.id=a,this.password=l;else if(o===Dh)a?(this.scriptTagHolder.sendNewPolls=!1,this.myPacketOrderer.closeAfter(a,()=>{this.onClosed_()})):this.onClosed_();else throw new Error("Unrecognized command received: "+o)},(...r)=>{const[o,a]=r;this.incrementIncomingBytes_(r),this.myPacketOrderer.handleResponse(o,a)},()=>{this.onClosed_()},this.urlFn);const s={};s[Fi]="t",s[fo]=Math.floor(Math.random()*1e8),this.scriptTagHolder.uniqueCallbackIdentifier&&(s[Lh]=this.scriptTagHolder.uniqueCallbackIdentifier),s[Xr]=Rs,this.transportSessionId&&(s[eo]=this.transportSessionId),this.lastSessionId&&(s[io]=this.lastSessionId),this.applicationId&&(s[ro]=this.applicationId),this.appCheckToken&&(s[cs]=this.appCheckToken),typeof location<"u"&&location.hostname&&so.test(location.hostname)&&(s[to]=no);const i=this.urlFn(s);this.log_("Connecting via long-poll to "+i),this.scriptTagHolder.addTag(i,()=>{})})}start(){this.scriptTagHolder.startLongPoll(this.id,this.password),this.addDisconnectPingFrame(this.id,this.password)}static forceAllow(){He.forceAllow_=!0}static forceDisallow(){He.forceDisallow_=!0}static isAvailable(){return He.forceAllow_?!0:!He.forceDisallow_&&typeof document<"u"&&document.createElement!=null&&!bh()&&!wh()}markConnectionHealthy(){}shutdown_(){this.isClosed_=!0,this.scriptTagHolder&&(this.scriptTagHolder.close(),this.scriptTagHolder=null),this.myDisconnFrame&&(document.body.removeChild(this.myDisconnFrame),this.myDisconnFrame=null),this.connectTimeoutTimer_&&(clearTimeout(this.connectTimeoutTimer_),this.connectTimeoutTimer_=null)}onClosed_(){this.isClosed_||(this.log_("Longpoll is closing itself"),this.shutdown_(),this.onDisconnect_&&(this.onDisconnect_(this.everConnected_),this.onDisconnect_=null))}close(){this.isClosed_||(this.log_("Longpoll is being closed."),this.shutdown_())}send(e){const n=H(e);this.bytesSent+=n.length,this.stats_.incrementCounter("bytes_sent",n.length);const s=Or(n),i=Qr(s,Hh);for(let r=0;r<i.length;r++)this.scriptTagHolder.enqueueSegment(this.curSegmentNum,i.length,i[r]),this.curSegmentNum++}addDisconnectPingFrame(e,n){this.myDisconnFrame=document.createElement("iframe");const s={};s[Wh]="t",s[ho]=e,s[uo]=n,this.myDisconnFrame.src=this.urlFn(s),this.myDisconnFrame.style.display="none",document.body.appendChild(this.myDisconnFrame)}incrementIncomingBytes_(e){const n=H(e).length;this.bytesReceived+=n,this.stats_.incrementCounter("bytes_received",n)}}class Ps{constructor(e,n,s,i){this.onDisconnect=s,this.urlFn=i,this.outstandingRequests=new Set,this.pendingSegs=[],this.currentSerial=Math.floor(Math.random()*1e8),this.sendNewPolls=!0;{this.uniqueCallbackIdentifier=mh(),window[Oh+this.uniqueCallbackIdentifier]=e,window[Mh+this.uniqueCallbackIdentifier]=n,this.myIFrame=Ps.createIFrame_();let r="";this.myIFrame.src&&this.myIFrame.src.substr(0,11)==="javascript:"&&(r='<script>document.domain="'+document.domain+'";<\/script>');const o="<html><body>"+r+"</body></html>";try{this.myIFrame.doc.open(),this.myIFrame.doc.write(o),this.myIFrame.doc.close()}catch(a){U("frame writing exception"),a.stack&&U(a.stack),U(a)}}}static createIFrame_(){const e=document.createElement("iframe");if(e.style.display="none",document.body){document.body.appendChild(e);try{e.contentWindow.document||U("No IE domain setting required")}catch{const s=document.domain;e.src="javascript:void((function(){document.open();document.domain='"+s+"';document.close();})())"}}else throw"Document body has not initialized. Wait to initialize Firebase until after the document is ready.";return e.contentDocument?e.doc=e.contentDocument:e.contentWindow?e.doc=e.contentWindow.document:e.document&&(e.doc=e.document),e}close(){this.alive=!1,this.myIFrame&&(this.myIFrame.doc.body.textContent="",setTimeout(()=>{this.myIFrame!==null&&(document.body.removeChild(this.myIFrame),this.myIFrame=null)},Math.floor(0)));const e=this.onDisconnect;e&&(this.onDisconnect=null,e())}startLongPoll(e,n){for(this.myID=e,this.myPW=n,this.alive=!0;this.newRequest_(););}newRequest_(){if(this.alive&&this.sendNewPolls&&this.outstandingRequests.size<(this.pendingSegs.length>0?2:1)){this.currentSerial++;const e={};e[ho]=this.myID,e[uo]=this.myPW,e[fo]=this.currentSerial;let n=this.urlFn(e),s="",i=0;for(;this.pendingSegs.length>0&&this.pendingSegs[0].d.length+mo+s.length<=po;){const o=this.pendingSegs.shift();s=s+"&"+Fh+i+"="+o.seg+"&"+$h+i+"="+o.ts+"&"+Bh+i+"="+o.d,i++}return n=n+s,this.addLongPollTag_(n,this.currentSerial),!0}else return!1}enqueueSegment(e,n,s){this.pendingSegs.push({seg:e,ts:n,d:s}),this.alive&&this.newRequest_()}addLongPollTag_(e,n){this.outstandingRequests.add(n);const s=()=>{this.outstandingRequests.delete(n),this.newRequest_()},i=setTimeout(s,Math.floor(Uh)),r=()=>{clearTimeout(i),s()};this.addTag(e,r)}addTag(e,n){setTimeout(()=>{try{if(!this.sendNewPolls)return;const s=this.myIFrame.doc.createElement("script");s.type="text/javascript",s.async=!0,s.src=e,s.onload=s.onreadystatechange=function(){const i=s.readyState;(!i||i==="loaded"||i==="complete")&&(s.onload=s.onreadystatechange=null,s.parentNode&&s.parentNode.removeChild(s),n())},s.onerror=()=>{U("Long-poll script failed to load: "+e),this.sendNewPolls=!1,this.close()},this.myIFrame.doc.body.appendChild(s)}catch{}},Math.floor(1))}}/**
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
 */const jh=16384,Gh=45e3;let cn=null;typeof MozWebSocket<"u"?cn=MozWebSocket:typeof WebSocket<"u"&&(cn=WebSocket);class ne{constructor(e,n,s,i,r,o,a){this.connId=e,this.applicationId=s,this.appCheckToken=i,this.authToken=r,this.keepaliveTimer=null,this.frames=null,this.totalFrames=0,this.bytesSent=0,this.bytesReceived=0,this.log_=Ut(this.connId),this.stats_=xs(n),this.connURL=ne.connectionURL_(n,o,a,i,s),this.nodeAdmin=n.nodeAdmin}static connectionURL_(e,n,s,i,r){const o={};return o[Xr]=Rs,typeof location<"u"&&location.hostname&&so.test(location.hostname)&&(o[to]=no),n&&(o[eo]=n),s&&(o[io]=s),i&&(o[cs]=i),r&&(o[ro]=r),co(e,oo,o)}open(e,n){this.onDisconnect=n,this.onMessage=e,this.log_("Websocket connecting to "+this.connURL),this.everConnected_=!1,Ie.set("previous_websocket_failure",!0);try{let s;Bl(),this.mySock=new cn(this.connURL,[],s)}catch(s){this.log_("Error instantiating WebSocket.");const i=s.message||s.data;i&&this.log_(i),this.onClosed_();return}this.mySock.onopen=()=>{this.log_("Websocket connected."),this.everConnected_=!0},this.mySock.onclose=()=>{this.log_("Websocket connection was disconnected."),this.mySock=null,this.onClosed_()},this.mySock.onmessage=s=>{this.handleIncomingFrame(s)},this.mySock.onerror=s=>{this.log_("WebSocket error.  Closing connection.");const i=s.message||s.data;i&&this.log_(i),this.onClosed_()}}start(){}static forceDisallow(){ne.forceDisallow_=!0}static isAvailable(){let e=!1;if(typeof navigator<"u"&&navigator.userAgent){const n=/Android ([0-9]{0,}\.[0-9]{0,})/,s=navigator.userAgent.match(n);s&&s.length>1&&parseFloat(s[1])<4.4&&(e=!0)}return!e&&cn!==null&&!ne.forceDisallow_}static previouslyFailed(){return Ie.isInMemoryStorage||Ie.get("previous_websocket_failure")===!0}markConnectionHealthy(){Ie.remove("previous_websocket_failure")}appendFrame_(e){if(this.frames.push(e),this.frames.length===this.totalFrames){const n=this.frames.join("");this.frames=null;const s=kt(n);this.onMessage(s)}}handleNewFrameCount_(e){this.totalFrames=e,this.frames=[]}extractFrameCount_(e){if(m(this.frames===null,"We already have a frame buffer"),e.length<=6){const n=Number(e);if(!isNaN(n))return this.handleNewFrameCount_(n),null}return this.handleNewFrameCount_(1),e}handleIncomingFrame(e){if(this.mySock===null)return;const n=e.data;if(this.bytesReceived+=n.length,this.stats_.incrementCounter("bytes_received",n.length),this.resetKeepAlive(),this.frames!==null)this.appendFrame_(n);else{const s=this.extractFrameCount_(n);s!==null&&this.appendFrame_(s)}}send(e){this.resetKeepAlive();const n=H(e);this.bytesSent+=n.length,this.stats_.incrementCounter("bytes_sent",n.length);const s=Qr(n,jh);s.length>1&&this.sendString_(String(s.length));for(let i=0;i<s.length;i++)this.sendString_(s[i])}shutdown_(){this.isClosed_=!0,this.keepaliveTimer&&(clearInterval(this.keepaliveTimer),this.keepaliveTimer=null),this.mySock&&(this.mySock.close(),this.mySock=null)}onClosed_(){this.isClosed_||(this.log_("WebSocket is closing itself"),this.shutdown_(),this.onDisconnect&&(this.onDisconnect(this.everConnected_),this.onDisconnect=null))}close(){this.isClosed_||(this.log_("WebSocket is being closed"),this.shutdown_())}resetKeepAlive(){clearInterval(this.keepaliveTimer),this.keepaliveTimer=setInterval(()=>{this.mySock&&this.sendString_("0"),this.resetKeepAlive()},Math.floor(Gh))}sendString_(e){try{this.mySock.send(e)}catch(n){this.log_("Exception thrown from WebSocket.send():",n.message||n.data,"Closing connection."),setTimeout(this.onClosed_.bind(this),0)}}}ne.responsesRequiredToBeHealthy=2;ne.healthyTimeout=3e4;/**
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
 */class Nt{static get ALL_TRANSPORTS(){return[He,ne]}static get IS_TRANSPORT_INITIALIZED(){return this.globalTransportInitialized_}constructor(e){this.initTransports_(e)}initTransports_(e){const n=ne&&ne.isAvailable();let s=n&&!ne.previouslyFailed();if(e.webSocketOnly&&(n||z("wss:// URL used, but browser isn't known to support websockets.  Trying anyway."),s=!0),s)this.transports_=[ne];else{const i=this.transports_=[];for(const r of Nt.ALL_TRANSPORTS)r&&r.isAvailable()&&i.push(r);Nt.globalTransportInitialized_=!0}}initialTransport(){if(this.transports_.length>0)return this.transports_[0];throw new Error("No transports available")}upgradeTransport(){return this.transports_.length>1?this.transports_[1]:null}}Nt.globalTransportInitialized_=!1;/**
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
 */const Vh=6e4,zh=5e3,Kh=10*1024,Yh=100*1024,jn="t",$i="d",Zh="s",Bi="r",Qh="e",Wi="o",Hi="a",Ui="n",qi="p",Jh="h";class Xh{constructor(e,n,s,i,r,o,a,l,c,d){this.id=e,this.repoInfo_=n,this.applicationId_=s,this.appCheckToken_=i,this.authToken_=r,this.onMessage_=o,this.onReady_=a,this.onDisconnect_=l,this.onKill_=c,this.lastSessionId=d,this.connectionCount=0,this.pendingDataMessages=[],this.state_=0,this.log_=Ut("c:"+this.id+":"),this.transportManager_=new Nt(n),this.log_("Connection created"),this.start_()}start_(){const e=this.transportManager_.initialTransport();this.conn_=new e(this.nextTransportId_(),this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,null,this.lastSessionId),this.primaryResponsesRequired_=e.responsesRequiredToBeHealthy||0;const n=this.connReceiver_(this.conn_),s=this.disconnReceiver_(this.conn_);this.tx_=this.conn_,this.rx_=this.conn_,this.secondaryConn_=null,this.isHealthy_=!1,setTimeout(()=>{this.conn_&&this.conn_.open(n,s)},Math.floor(0));const i=e.healthyTimeout||0;i>0&&(this.healthyTimeout_=vt(()=>{this.healthyTimeout_=null,this.isHealthy_||(this.conn_&&this.conn_.bytesReceived>Yh?(this.log_("Connection exceeded healthy timeout but has received "+this.conn_.bytesReceived+" bytes.  Marking connection healthy."),this.isHealthy_=!0,this.conn_.markConnectionHealthy()):this.conn_&&this.conn_.bytesSent>Kh?this.log_("Connection exceeded healthy timeout but has sent "+this.conn_.bytesSent+" bytes.  Leaving connection alive."):(this.log_("Closing unhealthy connection after timeout."),this.close()))},Math.floor(i)))}nextTransportId_(){return"c:"+this.id+":"+this.connectionCount++}disconnReceiver_(e){return n=>{e===this.conn_?this.onConnectionLost_(n):e===this.secondaryConn_?(this.log_("Secondary connection lost."),this.onSecondaryConnectionLost_()):this.log_("closing an old connection")}}connReceiver_(e){return n=>{this.state_!==2&&(e===this.rx_?this.onPrimaryMessageReceived_(n):e===this.secondaryConn_?this.onSecondaryMessageReceived_(n):this.log_("message on old connection"))}}sendRequest(e){const n={t:"d",d:e};this.sendData_(n)}tryCleanupConnection(){this.tx_===this.secondaryConn_&&this.rx_===this.secondaryConn_&&(this.log_("cleaning up and promoting a connection: "+this.secondaryConn_.connId),this.conn_=this.secondaryConn_,this.secondaryConn_=null)}onSecondaryControl_(e){if(jn in e){const n=e[jn];n===Hi?this.upgradeIfSecondaryHealthy_():n===Bi?(this.log_("Got a reset on secondary, closing it"),this.secondaryConn_.close(),(this.tx_===this.secondaryConn_||this.rx_===this.secondaryConn_)&&this.close()):n===Wi&&(this.log_("got pong on secondary."),this.secondaryResponsesRequired_--,this.upgradeIfSecondaryHealthy_())}}onSecondaryMessageReceived_(e){const n=ct("t",e),s=ct("d",e);if(n==="c")this.onSecondaryControl_(s);else if(n==="d")this.pendingDataMessages.push(s);else throw new Error("Unknown protocol layer: "+n)}upgradeIfSecondaryHealthy_(){this.secondaryResponsesRequired_<=0?(this.log_("Secondary connection is healthy."),this.isHealthy_=!0,this.secondaryConn_.markConnectionHealthy(),this.proceedWithUpgrade_()):(this.log_("sending ping on secondary."),this.secondaryConn_.send({t:"c",d:{t:qi,d:{}}}))}proceedWithUpgrade_(){this.secondaryConn_.start(),this.log_("sending client ack on secondary"),this.secondaryConn_.send({t:"c",d:{t:Hi,d:{}}}),this.log_("Ending transmission on primary"),this.conn_.send({t:"c",d:{t:Ui,d:{}}}),this.tx_=this.secondaryConn_,this.tryCleanupConnection()}onPrimaryMessageReceived_(e){const n=ct("t",e),s=ct("d",e);n==="c"?this.onControl_(s):n==="d"&&this.onDataMessage_(s)}onDataMessage_(e){this.onPrimaryResponse_(),this.onMessage_(e)}onPrimaryResponse_(){this.isHealthy_||(this.primaryResponsesRequired_--,this.primaryResponsesRequired_<=0&&(this.log_("Primary connection is healthy."),this.isHealthy_=!0,this.conn_.markConnectionHealthy()))}onControl_(e){const n=ct(jn,e);if($i in e){const s=e[$i];if(n===Jh){const i={...s};this.repoInfo_.isUsingEmulator&&(i.h=this.repoInfo_.host),this.onHandshake_(i)}else if(n===Ui){this.log_("recvd end transmission on primary"),this.rx_=this.secondaryConn_;for(let i=0;i<this.pendingDataMessages.length;++i)this.onDataMessage_(this.pendingDataMessages[i]);this.pendingDataMessages=[],this.tryCleanupConnection()}else n===Zh?this.onConnectionShutdown_(s):n===Bi?this.onReset_(s):n===Qh?ls("Server Error: "+s):n===Wi?(this.log_("got pong on primary."),this.onPrimaryResponse_(),this.sendPingOnPrimaryIfNecessary_()):ls("Unknown control packet command: "+n)}}onHandshake_(e){const n=e.ts,s=e.v,i=e.h;this.sessionId=e.s,this.repoInfo_.host=i,this.state_===0&&(this.conn_.start(),this.onConnectionEstablished_(this.conn_,n),Rs!==s&&z("Protocol version mismatch detected"),this.tryStartUpgrade_())}tryStartUpgrade_(){const e=this.transportManager_.upgradeTransport();e&&this.startUpgrade_(e)}startUpgrade_(e){this.secondaryConn_=new e(this.nextTransportId_(),this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,this.sessionId),this.secondaryResponsesRequired_=e.responsesRequiredToBeHealthy||0;const n=this.connReceiver_(this.secondaryConn_),s=this.disconnReceiver_(this.secondaryConn_);this.secondaryConn_.open(n,s),vt(()=>{this.secondaryConn_&&(this.log_("Timed out trying to upgrade."),this.secondaryConn_.close())},Math.floor(Vh))}onReset_(e){this.log_("Reset packet received.  New host: "+e),this.repoInfo_.host=e,this.state_===1?this.close():(this.closeConnections_(),this.start_())}onConnectionEstablished_(e,n){this.log_("Realtime connection established."),this.conn_=e,this.state_=1,this.onReady_&&(this.onReady_(n,this.sessionId),this.onReady_=null),this.primaryResponsesRequired_===0?(this.log_("Primary connection is healthy."),this.isHealthy_=!0):vt(()=>{this.sendPingOnPrimaryIfNecessary_()},Math.floor(zh))}sendPingOnPrimaryIfNecessary_(){!this.isHealthy_&&this.state_===1&&(this.log_("sending ping on primary."),this.sendData_({t:"c",d:{t:qi,d:{}}}))}onSecondaryConnectionLost_(){const e=this.secondaryConn_;this.secondaryConn_=null,(this.tx_===e||this.rx_===e)&&this.close()}onConnectionLost_(e){this.conn_=null,!e&&this.state_===0?(this.log_("Realtime connection failed."),this.repoInfo_.isCacheableHost()&&(Ie.remove("host:"+this.repoInfo_.host),this.repoInfo_.internalHost=this.repoInfo_.host)):this.state_===1&&this.log_("Realtime connection lost."),this.close()}onConnectionShutdown_(e){this.log_("Connection shutdown command received. Shutting down..."),this.onKill_&&(this.onKill_(e),this.onKill_=null),this.onDisconnect_=null,this.close()}sendData_(e){if(this.state_!==1)throw"Connection is not connected";this.tx_.send(e)}close(){this.state_!==2&&(this.log_("Closing realtime connection."),this.state_=2,this.closeConnections_(),this.onDisconnect_&&(this.onDisconnect_(),this.onDisconnect_=null))}closeConnections_(){this.log_("Shutting down all connections"),this.conn_&&(this.conn_.close(),this.conn_=null),this.secondaryConn_&&(this.secondaryConn_.close(),this.secondaryConn_=null),this.healthyTimeout_&&(clearTimeout(this.healthyTimeout_),this.healthyTimeout_=null)}}/**
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
 */class go{put(e,n,s,i){}merge(e,n,s,i){}refreshAuthToken(e){}refreshAppCheckToken(e){}onDisconnectPut(e,n,s){}onDisconnectMerge(e,n,s){}onDisconnectCancel(e,n){}reportStats(e){}}/**
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
 */class _o{constructor(e){this.allowedEvents_=e,this.listeners_={},m(Array.isArray(e)&&e.length>0,"Requires a non-empty array")}trigger(e,...n){if(Array.isArray(this.listeners_[e])){const s=[...this.listeners_[e]];for(let i=0;i<s.length;i++)s[i].callback.apply(s[i].context,n)}}on(e,n,s){this.validateEventType_(e),this.listeners_[e]=this.listeners_[e]||[],this.listeners_[e].push({callback:n,context:s});const i=this.getInitialEvent(e);i&&n.apply(s,i)}off(e,n,s){this.validateEventType_(e);const i=this.listeners_[e]||[];for(let r=0;r<i.length;r++)if(i[r].callback===n&&(!s||s===i[r].context)){i.splice(r,1);return}}validateEventType_(e){m(this.allowedEvents_.find(n=>n===e),"Unknown event: "+e)}}/**
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
 */class hn extends _o{static getInstance(){return new hn}constructor(){super(["online"]),this.online_=!0,typeof window<"u"&&typeof window.addEventListener<"u"&&!$r()&&(window.addEventListener("online",()=>{this.online_||(this.online_=!0,this.trigger("online",!0))},!1),window.addEventListener("offline",()=>{this.online_&&(this.online_=!1,this.trigger("online",!1))},!1))}getInitialEvent(e){return m(e==="online","Unknown event type: "+e),[this.online_]}currentlyOnline(){return this.online_}}/**
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
 */const ji=32,Gi=768;class A{constructor(e,n){if(n===void 0){this.pieces_=e.split("/");let s=0;for(let i=0;i<this.pieces_.length;i++)this.pieces_[i].length>0&&(this.pieces_[s]=this.pieces_[i],s++);this.pieces_.length=s,this.pieceNum_=0}else this.pieces_=e,this.pieceNum_=n}toString(){let e="";for(let n=this.pieceNum_;n<this.pieces_.length;n++)this.pieces_[n]!==""&&(e+="/"+this.pieces_[n]);return e||"/"}}function I(){return new A("")}function C(t){return t.pieceNum_>=t.pieces_.length?null:t.pieces_[t.pieceNum_]}function ve(t){return t.pieces_.length-t.pieceNum_}function R(t){let e=t.pieceNum_;return e<t.pieces_.length&&e++,new A(t.pieces_,e)}function Ds(t){return t.pieceNum_<t.pieces_.length?t.pieces_[t.pieces_.length-1]:null}function ed(t){let e="";for(let n=t.pieceNum_;n<t.pieces_.length;n++)t.pieces_[n]!==""&&(e+="/"+encodeURIComponent(String(t.pieces_[n])));return e||"/"}function At(t,e=0){return t.pieces_.slice(t.pieceNum_+e)}function yo(t){if(t.pieceNum_>=t.pieces_.length)return null;const e=[];for(let n=t.pieceNum_;n<t.pieces_.length-1;n++)e.push(t.pieces_[n]);return new A(e,0)}function M(t,e){const n=[];for(let s=t.pieceNum_;s<t.pieces_.length;s++)n.push(t.pieces_[s]);if(e instanceof A)for(let s=e.pieceNum_;s<e.pieces_.length;s++)n.push(e.pieces_[s]);else{const s=e.split("/");for(let i=0;i<s.length;i++)s[i].length>0&&n.push(s[i])}return new A(n,0)}function S(t){return t.pieceNum_>=t.pieces_.length}function G(t,e){const n=C(t),s=C(e);if(n===null)return e;if(n===s)return G(R(t),R(e));throw new Error("INTERNAL ERROR: innerPath ("+e+") is not within outerPath ("+t+")")}function td(t,e){const n=At(t,0),s=At(e,0);for(let i=0;i<n.length&&i<s.length;i++){const r=Le(n[i],s[i]);if(r!==0)return r}return n.length===s.length?0:n.length<s.length?-1:1}function Os(t,e){if(ve(t)!==ve(e))return!1;for(let n=t.pieceNum_,s=e.pieceNum_;n<=t.pieces_.length;n++,s++)if(t.pieces_[n]!==e.pieces_[s])return!1;return!0}function J(t,e){let n=t.pieceNum_,s=e.pieceNum_;if(ve(t)>ve(e))return!1;for(;n<t.pieces_.length;){if(t.pieces_[n]!==e.pieces_[s])return!1;++n,++s}return!0}class nd{constructor(e,n){this.errorPrefix_=n,this.parts_=At(e,0),this.byteLength_=Math.max(1,this.parts_.length);for(let s=0;s<this.parts_.length;s++)this.byteLength_+=Sn(this.parts_[s]);vo(this)}}function sd(t,e){t.parts_.length>0&&(t.byteLength_+=1),t.parts_.push(e),t.byteLength_+=Sn(e),vo(t)}function id(t){const e=t.parts_.pop();t.byteLength_-=Sn(e),t.parts_.length>0&&(t.byteLength_-=1)}function vo(t){if(t.byteLength_>Gi)throw new Error(t.errorPrefix_+"has a key path longer than "+Gi+" bytes ("+t.byteLength_+").");if(t.parts_.length>ji)throw new Error(t.errorPrefix_+"path specified exceeds the maximum depth that can be written ("+ji+") or object contains a cycle "+ke(t))}function ke(t){return t.parts_.length===0?"":"in property '"+t.parts_.join(".")+"'"}/**
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
 */class Ms extends _o{static getInstance(){return new Ms}constructor(){super(["visible"]);let e,n;typeof document<"u"&&typeof document.addEventListener<"u"&&(typeof document.hidden<"u"?(n="visibilitychange",e="hidden"):typeof document.mozHidden<"u"?(n="mozvisibilitychange",e="mozHidden"):typeof document.msHidden<"u"?(n="msvisibilitychange",e="msHidden"):typeof document.webkitHidden<"u"&&(n="webkitvisibilitychange",e="webkitHidden")),this.visible_=!0,n&&document.addEventListener(n,()=>{const s=!document[e];s!==this.visible_&&(this.visible_=s,this.trigger("visible",s))},!1)}getInitialEvent(e){return m(e==="visible","Unknown event type: "+e),[this.visible_]}}/**
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
 */const ht=1e3,rd=60*5*1e3,Vi=30*1e3,od=1.3,ad=3e4,ld="server_kill",zi=3;class he extends go{constructor(e,n,s,i,r,o,a,l){if(super(),this.repoInfo_=e,this.applicationId_=n,this.onDataUpdate_=s,this.onConnectStatus_=i,this.onServerInfoUpdate_=r,this.authTokenProvider_=o,this.appCheckTokenProvider_=a,this.authOverride_=l,this.id=he.nextPersistentConnectionId_++,this.log_=Ut("p:"+this.id+":"),this.interruptReasons_={},this.listens=new Map,this.outstandingPuts_=[],this.outstandingGets_=[],this.outstandingPutCount_=0,this.outstandingGetCount_=0,this.onDisconnectRequestQueue_=[],this.connected_=!1,this.reconnectDelay_=ht,this.maxReconnectDelay_=rd,this.securityDebugCallback_=null,this.lastSessionId=null,this.establishConnectionTimer_=null,this.visible_=!1,this.requestCBHash_={},this.requestNumber_=0,this.realtime_=null,this.authToken_=null,this.appCheckToken_=null,this.forceTokenRefresh_=!1,this.invalidAuthTokenCount_=0,this.invalidAppCheckTokenCount_=0,this.firstConnection_=!0,this.lastConnectionAttemptTime_=null,this.lastConnectionEstablishedTime_=null,l)throw new Error("Auth override specified in options, but not supported on non Node.js platforms");Ms.getInstance().on("visible",this.onVisible_,this),e.host.indexOf("fblocal")===-1&&hn.getInstance().on("online",this.onOnline_,this)}sendRequest(e,n,s){const i=++this.requestNumber_,r={r:i,a:e,b:n};this.log_(H(r)),m(this.connected_,"sendRequest call when we're not connected not allowed."),this.realtime_.sendRequest(r),s&&(this.requestCBHash_[i]=s)}get(e){this.initConnection_();const n=new le,i={action:"g",request:{p:e._path.toString(),q:e._queryObject},onComplete:o=>{const a=o.d;o.s==="ok"?n.resolve(a):n.reject(a)}};this.outstandingGets_.push(i),this.outstandingGetCount_++;const r=this.outstandingGets_.length-1;return this.connected_&&this.sendGet_(r),n.promise}listen(e,n,s,i){this.initConnection_();const r=e._queryIdentifier,o=e._path.toString();this.log_("Listen called for "+o+" "+r),this.listens.has(o)||this.listens.set(o,new Map),m(e._queryParams.isDefault()||!e._queryParams.loadsAllData(),"listen() called for non-default but complete query"),m(!this.listens.get(o).has(r),"listen() called twice for same path/queryId.");const a={onComplete:i,hashFn:n,query:e,tag:s};this.listens.get(o).set(r,a),this.connected_&&this.sendListen_(a)}sendGet_(e){const n=this.outstandingGets_[e];this.sendRequest("g",n.request,s=>{delete this.outstandingGets_[e],this.outstandingGetCount_--,this.outstandingGetCount_===0&&(this.outstandingGets_=[]),n.onComplete&&n.onComplete(s)})}sendListen_(e){const n=e.query,s=n._path.toString(),i=n._queryIdentifier;this.log_("Listen on "+s+" for "+i);const r={p:s},o="q";e.tag&&(r.q=n._queryObject,r.t=e.tag),r.h=e.hashFn(),this.sendRequest(o,r,a=>{const l=a.d,c=a.s;he.warnOnListenWarnings_(l,n),(this.listens.get(s)&&this.listens.get(s).get(i))===e&&(this.log_("listen response",a),c!=="ok"&&this.removeListen_(s,i),e.onComplete&&e.onComplete(c,l))})}static warnOnListenWarnings_(e,n){if(e&&typeof e=="object"&&oe(e,"w")){const s=Ze(e,"w");if(Array.isArray(s)&&~s.indexOf("no_index")){const i='".indexOn": "'+n._queryParams.getIndex().toString()+'"',r=n._path.toString();z(`Using an unspecified index. Your data will be downloaded and filtered on the client. Consider adding ${i} at ${r} to your security rules for better performance.`)}}}refreshAuthToken(e){this.authToken_=e,this.log_("Auth token refreshed"),this.authToken_?this.tryAuth():this.connected_&&this.sendRequest("unauth",{},()=>{}),this.reduceReconnectDelayIfAdminCredential_(e)}reduceReconnectDelayIfAdminCredential_(e){(e&&e.length===40||Vl(e))&&(this.log_("Admin auth credential detected.  Reducing max reconnect time."),this.maxReconnectDelay_=Vi)}refreshAppCheckToken(e){this.appCheckToken_=e,this.log_("App check token refreshed"),this.appCheckToken_?this.tryAppCheck():this.connected_&&this.sendRequest("unappeck",{},()=>{})}tryAuth(){if(this.connected_&&this.authToken_){const e=this.authToken_,n=Gl(e)?"auth":"gauth",s={cred:e};this.authOverride_===null?s.noauth=!0:typeof this.authOverride_=="object"&&(s.authvar=this.authOverride_),this.sendRequest(n,s,i=>{const r=i.s,o=i.d||"error";this.authToken_===e&&(r==="ok"?this.invalidAuthTokenCount_=0:this.onAuthRevoked_(r,o))})}}tryAppCheck(){this.connected_&&this.appCheckToken_&&this.sendRequest("appcheck",{token:this.appCheckToken_},e=>{const n=e.s,s=e.d||"error";n==="ok"?this.invalidAppCheckTokenCount_=0:this.onAppCheckRevoked_(n,s)})}unlisten(e,n){const s=e._path.toString(),i=e._queryIdentifier;this.log_("Unlisten called for "+s+" "+i),m(e._queryParams.isDefault()||!e._queryParams.loadsAllData(),"unlisten() called for non-default but complete query"),this.removeListen_(s,i)&&this.connected_&&this.sendUnlisten_(s,i,e._queryObject,n)}sendUnlisten_(e,n,s,i){this.log_("Unlisten on "+e+" for "+n);const r={p:e},o="n";i&&(r.q=s,r.t=i),this.sendRequest(o,r)}onDisconnectPut(e,n,s){this.initConnection_(),this.connected_?this.sendOnDisconnect_("o",e,n,s):this.onDisconnectRequestQueue_.push({pathString:e,action:"o",data:n,onComplete:s})}onDisconnectMerge(e,n,s){this.initConnection_(),this.connected_?this.sendOnDisconnect_("om",e,n,s):this.onDisconnectRequestQueue_.push({pathString:e,action:"om",data:n,onComplete:s})}onDisconnectCancel(e,n){this.initConnection_(),this.connected_?this.sendOnDisconnect_("oc",e,null,n):this.onDisconnectRequestQueue_.push({pathString:e,action:"oc",data:null,onComplete:n})}sendOnDisconnect_(e,n,s,i){const r={p:n,d:s};this.log_("onDisconnect "+e,r),this.sendRequest(e,r,o=>{i&&setTimeout(()=>{i(o.s,o.d)},Math.floor(0))})}put(e,n,s,i){this.putInternal("p",e,n,s,i)}merge(e,n,s,i){this.putInternal("m",e,n,s,i)}putInternal(e,n,s,i,r){this.initConnection_();const o={p:n,d:s};r!==void 0&&(o.h=r),this.outstandingPuts_.push({action:e,request:o,onComplete:i}),this.outstandingPutCount_++;const a=this.outstandingPuts_.length-1;this.connected_?this.sendPut_(a):this.log_("Buffering put: "+n)}sendPut_(e){const n=this.outstandingPuts_[e].action,s=this.outstandingPuts_[e].request,i=this.outstandingPuts_[e].onComplete;this.outstandingPuts_[e].queued=this.connected_,this.sendRequest(n,s,r=>{this.log_(n+" response",r),delete this.outstandingPuts_[e],this.outstandingPutCount_--,this.outstandingPutCount_===0&&(this.outstandingPuts_=[]),i&&i(r.s,r.d)})}reportStats(e){if(this.connected_){const n={c:e};this.log_("reportStats",n),this.sendRequest("s",n,s=>{if(s.s!=="ok"){const r=s.d;this.log_("reportStats","Error sending stats: "+r)}})}}onDataMessage_(e){if("r"in e){this.log_("from server: "+H(e));const n=e.r,s=this.requestCBHash_[n];s&&(delete this.requestCBHash_[n],s(e.b))}else{if("error"in e)throw"A server-side error has occurred: "+e.error;"a"in e&&this.onDataPush_(e.a,e.b)}}onDataPush_(e,n){this.log_("handleServerMessage",e,n),e==="d"?this.onDataUpdate_(n.p,n.d,!1,n.t):e==="m"?this.onDataUpdate_(n.p,n.d,!0,n.t):e==="c"?this.onListenRevoked_(n.p,n.q):e==="ac"?this.onAuthRevoked_(n.s,n.d):e==="apc"?this.onAppCheckRevoked_(n.s,n.d):e==="sd"?this.onSecurityDebugPacket_(n):ls("Unrecognized action received from server: "+H(e)+`
Are you using the latest client?`)}onReady_(e,n){this.log_("connection ready"),this.connected_=!0,this.lastConnectionEstablishedTime_=new Date().getTime(),this.handleTimestamp_(e),this.lastSessionId=n,this.firstConnection_&&this.sendConnectStats_(),this.restoreState_(),this.firstConnection_=!1,this.onConnectStatus_(!0)}scheduleConnect_(e){m(!this.realtime_,"Scheduling a connect when we're already connected/ing?"),this.establishConnectionTimer_&&clearTimeout(this.establishConnectionTimer_),this.establishConnectionTimer_=setTimeout(()=>{this.establishConnectionTimer_=null,this.establishConnection_()},Math.floor(e))}initConnection_(){!this.realtime_&&this.firstConnection_&&this.scheduleConnect_(0)}onVisible_(e){e&&!this.visible_&&this.reconnectDelay_===this.maxReconnectDelay_&&(this.log_("Window became visible.  Reducing delay."),this.reconnectDelay_=ht,this.realtime_||this.scheduleConnect_(0)),this.visible_=e}onOnline_(e){e?(this.log_("Browser went online."),this.reconnectDelay_=ht,this.realtime_||this.scheduleConnect_(0)):(this.log_("Browser went offline.  Killing connection."),this.realtime_&&this.realtime_.close())}onRealtimeDisconnect_(){if(this.log_("data client disconnected"),this.connected_=!1,this.realtime_=null,this.cancelSentTransactions_(),this.requestCBHash_={},this.shouldReconnect_()){this.visible_?this.lastConnectionEstablishedTime_&&(new Date().getTime()-this.lastConnectionEstablishedTime_>ad&&(this.reconnectDelay_=ht),this.lastConnectionEstablishedTime_=null):(this.log_("Window isn't visible.  Delaying reconnect."),this.reconnectDelay_=this.maxReconnectDelay_,this.lastConnectionAttemptTime_=new Date().getTime());const e=Math.max(0,new Date().getTime()-this.lastConnectionAttemptTime_);let n=Math.max(0,this.reconnectDelay_-e);n=Math.random()*n,this.log_("Trying to reconnect in "+n+"ms"),this.scheduleConnect_(n),this.reconnectDelay_=Math.min(this.maxReconnectDelay_,this.reconnectDelay_*od)}this.onConnectStatus_(!1)}async establishConnection_(){if(this.shouldReconnect_()){this.log_("Making a connection attempt"),this.lastConnectionAttemptTime_=new Date().getTime(),this.lastConnectionEstablishedTime_=null;const e=this.onDataMessage_.bind(this),n=this.onReady_.bind(this),s=this.onRealtimeDisconnect_.bind(this),i=this.id+":"+he.nextConnectionId_++,r=this.lastSessionId;let o=!1,a=null;const l=function(){a?a.close():(o=!0,s())},c=function(h){m(a,"sendRequest call when we're not connected not allowed."),a.sendRequest(h)};this.realtime_={close:l,sendRequest:c};const d=this.forceTokenRefresh_;this.forceTokenRefresh_=!1;try{const[h,f]=await Promise.all([this.authTokenProvider_.getToken(d),this.appCheckTokenProvider_.getToken(d)]);o?U("getToken() completed but was canceled"):(U("getToken() completed. Creating connection."),this.authToken_=h&&h.accessToken,this.appCheckToken_=f&&f.token,a=new Xh(i,this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,e,n,s,g=>{z(g+" ("+this.repoInfo_.toString()+")"),this.interrupt(ld)},r))}catch(h){this.log_("Failed to get token: "+h),o||(this.repoInfo_.nodeAdmin&&z(h),l())}}}interrupt(e){U("Interrupting connection for reason: "+e),this.interruptReasons_[e]=!0,this.realtime_?this.realtime_.close():(this.establishConnectionTimer_&&(clearTimeout(this.establishConnectionTimer_),this.establishConnectionTimer_=null),this.connected_&&this.onRealtimeDisconnect_())}resume(e){U("Resuming connection for reason: "+e),delete this.interruptReasons_[e],ns(this.interruptReasons_)&&(this.reconnectDelay_=ht,this.realtime_||this.scheduleConnect_(0))}handleTimestamp_(e){const n=e-new Date().getTime();this.onServerInfoUpdate_({serverTimeOffset:n})}cancelSentTransactions_(){for(let e=0;e<this.outstandingPuts_.length;e++){const n=this.outstandingPuts_[e];n&&"h"in n.request&&n.queued&&(n.onComplete&&n.onComplete("disconnect"),delete this.outstandingPuts_[e],this.outstandingPutCount_--)}this.outstandingPutCount_===0&&(this.outstandingPuts_=[])}onListenRevoked_(e,n){let s;n?s=n.map(r=>As(r)).join("$"):s="default";const i=this.removeListen_(e,s);i&&i.onComplete&&i.onComplete("permission_denied")}removeListen_(e,n){const s=new A(e).toString();let i;if(this.listens.has(s)){const r=this.listens.get(s);i=r.get(n),r.delete(n),r.size===0&&this.listens.delete(s)}else i=void 0;return i}onAuthRevoked_(e,n){U("Auth token revoked: "+e+"/"+n),this.authToken_=null,this.forceTokenRefresh_=!0,this.realtime_.close(),(e==="invalid_token"||e==="permission_denied")&&(this.invalidAuthTokenCount_++,this.invalidAuthTokenCount_>=zi&&(this.reconnectDelay_=Vi,this.authTokenProvider_.notifyForInvalidToken()))}onAppCheckRevoked_(e,n){U("App check token revoked: "+e+"/"+n),this.appCheckToken_=null,this.forceTokenRefresh_=!0,(e==="invalid_token"||e==="permission_denied")&&(this.invalidAppCheckTokenCount_++,this.invalidAppCheckTokenCount_>=zi&&this.appCheckTokenProvider_.notifyForInvalidToken())}onSecurityDebugPacket_(e){this.securityDebugCallback_?this.securityDebugCallback_(e):"msg"in e&&console.log("FIREBASE: "+e.msg.replace(`
`,`
FIREBASE: `))}restoreState_(){this.tryAuth(),this.tryAppCheck();for(const e of this.listens.values())for(const n of e.values())this.sendListen_(n);for(let e=0;e<this.outstandingPuts_.length;e++)this.outstandingPuts_[e]&&this.sendPut_(e);for(;this.onDisconnectRequestQueue_.length;){const e=this.onDisconnectRequestQueue_.shift();this.sendOnDisconnect_(e.action,e.pathString,e.data,e.onComplete)}for(let e=0;e<this.outstandingGets_.length;e++)this.outstandingGets_[e]&&this.sendGet_(e)}sendConnectStats_(){const e={};let n="js";e["sdk."+n+"."+Kr.replace(/\./g,"-")]=1,$r()?e["framework.cordova"]=1:$l()&&(e["framework.reactnative"]=1),this.reportStats(e)}shouldReconnect_(){const e=hn.getInstance().currentlyOnline();return ns(this.interruptReasons_)&&e}}he.nextPersistentConnectionId_=0;he.nextConnectionId_=0;/**
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
 */class kn{getCompare(){return this.compare.bind(this)}indexedValueChanged(e,n){const s=new E(Je,e),i=new E(Je,n);return this.compare(s,i)!==0}minPost(){return E.MIN}}/**
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
 */let zt;class bo extends kn{static get __EMPTY_NODE(){return zt}static set __EMPTY_NODE(e){zt=e}compare(e,n){return Le(e.name,n.name)}isDefinedOn(e){throw it("KeyIndex.isDefinedOn not expected to be called.")}indexedValueChanged(e,n){return!1}minPost(){return E.MIN}maxPost(){return new E(Re,zt)}makePost(e,n){return m(typeof e=="string","KeyIndex indexValue must always be a string."),new E(e,zt)}toString(){return".key"}}const Ve=new bo;/**
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
 */class Kt{constructor(e,n,s,i,r=null){this.isReverse_=i,this.resultGenerator_=r,this.nodeStack_=[];let o=1;for(;!e.isEmpty();)if(e=e,o=n?s(e.key,n):1,i&&(o*=-1),o<0)this.isReverse_?e=e.left:e=e.right;else if(o===0){this.nodeStack_.push(e);break}else this.nodeStack_.push(e),this.isReverse_?e=e.right:e=e.left}getNext(){if(this.nodeStack_.length===0)return null;let e=this.nodeStack_.pop(),n;if(this.resultGenerator_?n=this.resultGenerator_(e.key,e.value):n={key:e.key,value:e.value},this.isReverse_)for(e=e.left;!e.isEmpty();)this.nodeStack_.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack_.push(e),e=e.left;return n}hasNext(){return this.nodeStack_.length>0}peek(){if(this.nodeStack_.length===0)return null;const e=this.nodeStack_[this.nodeStack_.length-1];return this.resultGenerator_?this.resultGenerator_(e.key,e.value):{key:e.key,value:e.value}}}class W{constructor(e,n,s,i,r){this.key=e,this.value=n,this.color=s??W.RED,this.left=i??V.EMPTY_NODE,this.right=r??V.EMPTY_NODE}copy(e,n,s,i,r){return new W(e??this.key,n??this.value,s??this.color,i??this.left,r??this.right)}count(){return this.left.count()+1+this.right.count()}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||!!e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min_(){return this.left.isEmpty()?this:this.left.min_()}minKey(){return this.min_().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,n,s){let i=this;const r=s(e,i.key);return r<0?i=i.copy(null,null,null,i.left.insert(e,n,s),null):r===0?i=i.copy(null,n,null,null,null):i=i.copy(null,null,null,null,i.right.insert(e,n,s)),i.fixUp_()}removeMin_(){if(this.left.isEmpty())return V.EMPTY_NODE;let e=this;return!e.left.isRed_()&&!e.left.left.isRed_()&&(e=e.moveRedLeft_()),e=e.copy(null,null,null,e.left.removeMin_(),null),e.fixUp_()}remove(e,n){let s,i;if(s=this,n(e,s.key)<0)!s.left.isEmpty()&&!s.left.isRed_()&&!s.left.left.isRed_()&&(s=s.moveRedLeft_()),s=s.copy(null,null,null,s.left.remove(e,n),null);else{if(s.left.isRed_()&&(s=s.rotateRight_()),!s.right.isEmpty()&&!s.right.isRed_()&&!s.right.left.isRed_()&&(s=s.moveRedRight_()),n(e,s.key)===0){if(s.right.isEmpty())return V.EMPTY_NODE;i=s.right.min_(),s=s.copy(i.key,i.value,null,null,s.right.removeMin_())}s=s.copy(null,null,null,null,s.right.remove(e,n))}return s.fixUp_()}isRed_(){return this.color}fixUp_(){let e=this;return e.right.isRed_()&&!e.left.isRed_()&&(e=e.rotateLeft_()),e.left.isRed_()&&e.left.left.isRed_()&&(e=e.rotateRight_()),e.left.isRed_()&&e.right.isRed_()&&(e=e.colorFlip_()),e}moveRedLeft_(){let e=this.colorFlip_();return e.right.left.isRed_()&&(e=e.copy(null,null,null,null,e.right.rotateRight_()),e=e.rotateLeft_(),e=e.colorFlip_()),e}moveRedRight_(){let e=this.colorFlip_();return e.left.left.isRed_()&&(e=e.rotateRight_(),e=e.colorFlip_()),e}rotateLeft_(){const e=this.copy(null,null,W.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight_(){const e=this.copy(null,null,W.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip_(){const e=this.left.copy(null,null,!this.left.color,null,null),n=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,n)}checkMaxDepth_(){const e=this.check_();return Math.pow(2,e)<=this.count()+1}check_(){if(this.isRed_()&&this.left.isRed_())throw new Error("Red node has red child("+this.key+","+this.value+")");if(this.right.isRed_())throw new Error("Right child of ("+this.key+","+this.value+") is red");const e=this.left.check_();if(e!==this.right.check_())throw new Error("Black depths differ");return e+(this.isRed_()?0:1)}}W.RED=!0;W.BLACK=!1;class cd{copy(e,n,s,i,r){return this}insert(e,n,s){return new W(e,n,null)}remove(e,n){return this}count(){return 0}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}check_(){return 0}isRed_(){return!1}}class V{constructor(e,n=V.EMPTY_NODE){this.comparator_=e,this.root_=n}insert(e,n){return new V(this.comparator_,this.root_.insert(e,n,this.comparator_).copy(null,null,W.BLACK,null,null))}remove(e){return new V(this.comparator_,this.root_.remove(e,this.comparator_).copy(null,null,W.BLACK,null,null))}get(e){let n,s=this.root_;for(;!s.isEmpty();){if(n=this.comparator_(e,s.key),n===0)return s.value;n<0?s=s.left:n>0&&(s=s.right)}return null}getPredecessorKey(e){let n,s=this.root_,i=null;for(;!s.isEmpty();)if(n=this.comparator_(e,s.key),n===0){if(s.left.isEmpty())return i?i.key:null;for(s=s.left;!s.right.isEmpty();)s=s.right;return s.key}else n<0?s=s.left:n>0&&(i=s,s=s.right);throw new Error("Attempted to find predecessor key for a nonexistent key.  What gives?")}isEmpty(){return this.root_.isEmpty()}count(){return this.root_.count()}minKey(){return this.root_.minKey()}maxKey(){return this.root_.maxKey()}inorderTraversal(e){return this.root_.inorderTraversal(e)}reverseTraversal(e){return this.root_.reverseTraversal(e)}getIterator(e){return new Kt(this.root_,null,this.comparator_,!1,e)}getIteratorFrom(e,n){return new Kt(this.root_,e,this.comparator_,!1,n)}getReverseIteratorFrom(e,n){return new Kt(this.root_,e,this.comparator_,!0,n)}getReverseIterator(e){return new Kt(this.root_,null,this.comparator_,!0,e)}}V.EMPTY_NODE=new cd;/**
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
 */function hd(t,e){return Le(t.name,e.name)}function Ls(t,e){return Le(t,e)}/**
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
 */let hs;function dd(t){hs=t}const wo=function(t){return typeof t=="number"?"number:"+Jr(t):"string:"+t},Co=function(t){if(t.isLeafNode()){const e=t.val();m(typeof e=="string"||typeof e=="number"||typeof e=="object"&&oe(e,".sv"),"Priority must be a string or number.")}else m(t===hs||t.isEmpty(),"priority of unexpected type.");m(t===hs||t.getPriority().isEmpty(),"Priority nodes can't have a priority of their own.")};/**
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
 */let Ki;class B{static set __childrenNodeConstructor(e){Ki=e}static get __childrenNodeConstructor(){return Ki}constructor(e,n=B.__childrenNodeConstructor.EMPTY_NODE){this.value_=e,this.priorityNode_=n,this.lazyHash_=null,m(this.value_!==void 0&&this.value_!==null,"LeafNode shouldn't be created with null/undefined value."),Co(this.priorityNode_)}isLeafNode(){return!0}getPriority(){return this.priorityNode_}updatePriority(e){return new B(this.value_,e)}getImmediateChild(e){return e===".priority"?this.priorityNode_:B.__childrenNodeConstructor.EMPTY_NODE}getChild(e){return S(e)?this:C(e)===".priority"?this.priorityNode_:B.__childrenNodeConstructor.EMPTY_NODE}hasChild(){return!1}getPredecessorChildName(e,n){return null}updateImmediateChild(e,n){return e===".priority"?this.updatePriority(n):n.isEmpty()&&e!==".priority"?this:B.__childrenNodeConstructor.EMPTY_NODE.updateImmediateChild(e,n).updatePriority(this.priorityNode_)}updateChild(e,n){const s=C(e);return s===null?n:n.isEmpty()&&s!==".priority"?this:(m(s!==".priority"||ve(e)===1,".priority must be the last token in a path"),this.updateImmediateChild(s,B.__childrenNodeConstructor.EMPTY_NODE.updateChild(R(e),n)))}isEmpty(){return!1}numChildren(){return 0}forEachChild(e,n){return!1}val(e){return e&&!this.getPriority().isEmpty()?{".value":this.getValue(),".priority":this.getPriority().val()}:this.getValue()}hash(){if(this.lazyHash_===null){let e="";this.priorityNode_.isEmpty()||(e+="priority:"+wo(this.priorityNode_.val())+":");const n=typeof this.value_;e+=n+":",n==="number"?e+=Jr(this.value_):e+=this.value_,this.lazyHash_=Zr(e)}return this.lazyHash_}getValue(){return this.value_}compareTo(e){return e===B.__childrenNodeConstructor.EMPTY_NODE?1:e instanceof B.__childrenNodeConstructor?-1:(m(e.isLeafNode(),"Unknown node type"),this.compareToLeafNode_(e))}compareToLeafNode_(e){const n=typeof e.value_,s=typeof this.value_,i=B.VALUE_TYPE_ORDER.indexOf(n),r=B.VALUE_TYPE_ORDER.indexOf(s);return m(i>=0,"Unknown leaf type: "+n),m(r>=0,"Unknown leaf type: "+s),i===r?s==="object"?0:this.value_<e.value_?-1:this.value_===e.value_?0:1:r-i}withIndex(){return this}isIndexed(){return!0}equals(e){if(e===this)return!0;if(e.isLeafNode()){const n=e;return this.value_===n.value_&&this.priorityNode_.equals(n.priorityNode_)}else return!1}}B.VALUE_TYPE_ORDER=["object","boolean","number","string"];/**
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
 */let So,Eo;function ud(t){So=t}function fd(t){Eo=t}class pd extends kn{compare(e,n){const s=e.node.getPriority(),i=n.node.getPriority(),r=s.compareTo(i);return r===0?Le(e.name,n.name):r}isDefinedOn(e){return!e.getPriority().isEmpty()}indexedValueChanged(e,n){return!e.getPriority().equals(n.getPriority())}minPost(){return E.MIN}maxPost(){return new E(Re,new B("[PRIORITY-POST]",Eo))}makePost(e,n){const s=So(e);return new E(n,new B("[PRIORITY-POST]",s))}toString(){return".priority"}}const O=new pd;/**
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
 */const md=Math.log(2);class gd{constructor(e){const n=r=>parseInt(Math.log(r)/md,10),s=r=>parseInt(Array(r+1).join("1"),2);this.count=n(e+1),this.current_=this.count-1;const i=s(this.count);this.bits_=e+1&i}nextBitIsOne(){const e=!(this.bits_&1<<this.current_);return this.current_--,e}}const dn=function(t,e,n,s){t.sort(e);const i=function(l,c){const d=c-l;let h,f;if(d===0)return null;if(d===1)return h=t[l],f=n?n(h):h,new W(f,h.node,W.BLACK,null,null);{const g=parseInt(d/2,10)+l,_=i(l,g),k=i(g+1,c);return h=t[g],f=n?n(h):h,new W(f,h.node,W.BLACK,_,k)}},r=function(l){let c=null,d=null,h=t.length;const f=function(_,k){const D=h-_,$=h;h-=_;const Y=i(D+1,$),Z=t[D],X=n?n(Z):Z;g(new W(X,Z.node,k,null,Y))},g=function(_){c?(c.left=_,c=_):(d=_,c=_)};for(let _=0;_<l.count;++_){const k=l.nextBitIsOne(),D=Math.pow(2,l.count-(_+1));k?f(D,W.BLACK):(f(D,W.BLACK),f(D,W.RED))}return d},o=new gd(t.length),a=r(o);return new V(s||e,a)};/**
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
 */let Gn;const Be={};class ce{static get Default(){return m(Be&&O,"ChildrenNode.ts has not been loaded"),Gn=Gn||new ce({".priority":Be},{".priority":O}),Gn}constructor(e,n){this.indexes_=e,this.indexSet_=n}get(e){const n=Ze(this.indexes_,e);if(!n)throw new Error("No index defined for "+e);return n instanceof V?n:null}hasIndex(e){return oe(this.indexSet_,e.toString())}addIndex(e,n){m(e!==Ve,"KeyIndex always exists and isn't meant to be added to the IndexMap.");const s=[];let i=!1;const r=n.getIterator(E.Wrap);let o=r.getNext();for(;o;)i=i||e.isDefinedOn(o.node),s.push(o),o=r.getNext();let a;i?a=dn(s,e.getCompare()):a=Be;const l=e.toString(),c={...this.indexSet_};c[l]=e;const d={...this.indexes_};return d[l]=a,new ce(d,c)}addToIndexes(e,n){const s=rn(this.indexes_,(i,r)=>{const o=Ze(this.indexSet_,r);if(m(o,"Missing index implementation for "+r),i===Be)if(o.isDefinedOn(e.node)){const a=[],l=n.getIterator(E.Wrap);let c=l.getNext();for(;c;)c.name!==e.name&&a.push(c),c=l.getNext();return a.push(e),dn(a,o.getCompare())}else return Be;else{const a=n.get(e.name);let l=i;return a&&(l=l.remove(new E(e.name,a))),l.insert(e,e.node)}});return new ce(s,this.indexSet_)}removeFromIndexes(e,n){const s=rn(this.indexes_,i=>{if(i===Be)return i;{const r=n.get(e.name);return r?i.remove(new E(e.name,r)):i}});return new ce(s,this.indexSet_)}}/**
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
 */let dt;class w{static get EMPTY_NODE(){return dt||(dt=new w(new V(Ls),null,ce.Default))}constructor(e,n,s){this.children_=e,this.priorityNode_=n,this.indexMap_=s,this.lazyHash_=null,this.priorityNode_&&Co(this.priorityNode_),this.children_.isEmpty()&&m(!this.priorityNode_||this.priorityNode_.isEmpty(),"An empty node cannot have a priority")}isLeafNode(){return!1}getPriority(){return this.priorityNode_||dt}updatePriority(e){return this.children_.isEmpty()?this:new w(this.children_,e,this.indexMap_)}getImmediateChild(e){if(e===".priority")return this.getPriority();{const n=this.children_.get(e);return n===null?dt:n}}getChild(e){const n=C(e);return n===null?this:this.getImmediateChild(n).getChild(R(e))}hasChild(e){return this.children_.get(e)!==null}updateImmediateChild(e,n){if(m(n,"We should always be passing snapshot nodes"),e===".priority")return this.updatePriority(n);{const s=new E(e,n);let i,r;n.isEmpty()?(i=this.children_.remove(e),r=this.indexMap_.removeFromIndexes(s,this.children_)):(i=this.children_.insert(e,n),r=this.indexMap_.addToIndexes(s,this.children_));const o=i.isEmpty()?dt:this.priorityNode_;return new w(i,o,r)}}updateChild(e,n){const s=C(e);if(s===null)return n;{m(C(e)!==".priority"||ve(e)===1,".priority must be the last token in a path");const i=this.getImmediateChild(s).updateChild(R(e),n);return this.updateImmediateChild(s,i)}}isEmpty(){return this.children_.isEmpty()}numChildren(){return this.children_.count()}val(e){if(this.isEmpty())return null;const n={};let s=0,i=0,r=!0;if(this.forEachChild(O,(o,a)=>{n[o]=a.val(e),s++,r&&w.INTEGER_REGEXP_.test(o)?i=Math.max(i,Number(o)):r=!1}),!e&&r&&i<2*s){const o=[];for(const a in n)o[a]=n[a];return o}else return e&&!this.getPriority().isEmpty()&&(n[".priority"]=this.getPriority().val()),n}hash(){if(this.lazyHash_===null){let e="";this.getPriority().isEmpty()||(e+="priority:"+wo(this.getPriority().val())+":"),this.forEachChild(O,(n,s)=>{const i=s.hash();i!==""&&(e+=":"+n+":"+i)}),this.lazyHash_=e===""?"":Zr(e)}return this.lazyHash_}getPredecessorChildName(e,n,s){const i=this.resolveIndex_(s);if(i){const r=i.getPredecessorKey(new E(e,n));return r?r.name:null}else return this.children_.getPredecessorKey(e)}getFirstChildName(e){const n=this.resolveIndex_(e);if(n){const s=n.minKey();return s&&s.name}else return this.children_.minKey()}getFirstChild(e){const n=this.getFirstChildName(e);return n?new E(n,this.children_.get(n)):null}getLastChildName(e){const n=this.resolveIndex_(e);if(n){const s=n.maxKey();return s&&s.name}else return this.children_.maxKey()}getLastChild(e){const n=this.getLastChildName(e);return n?new E(n,this.children_.get(n)):null}forEachChild(e,n){const s=this.resolveIndex_(e);return s?s.inorderTraversal(i=>n(i.name,i.node)):this.children_.inorderTraversal(n)}getIterator(e){return this.getIteratorFrom(e.minPost(),e)}getIteratorFrom(e,n){const s=this.resolveIndex_(n);if(s)return s.getIteratorFrom(e,i=>i);{const i=this.children_.getIteratorFrom(e.name,E.Wrap);let r=i.peek();for(;r!=null&&n.compare(r,e)<0;)i.getNext(),r=i.peek();return i}}getReverseIterator(e){return this.getReverseIteratorFrom(e.maxPost(),e)}getReverseIteratorFrom(e,n){const s=this.resolveIndex_(n);if(s)return s.getReverseIteratorFrom(e,i=>i);{const i=this.children_.getReverseIteratorFrom(e.name,E.Wrap);let r=i.peek();for(;r!=null&&n.compare(r,e)>0;)i.getNext(),r=i.peek();return i}}compareTo(e){return this.isEmpty()?e.isEmpty()?0:-1:e.isLeafNode()||e.isEmpty()?1:e===qt?-1:0}withIndex(e){if(e===Ve||this.indexMap_.hasIndex(e))return this;{const n=this.indexMap_.addIndex(e,this.children_);return new w(this.children_,this.priorityNode_,n)}}isIndexed(e){return e===Ve||this.indexMap_.hasIndex(e)}equals(e){if(e===this)return!0;if(e.isLeafNode())return!1;{const n=e;if(this.getPriority().equals(n.getPriority()))if(this.children_.count()===n.children_.count()){const s=this.getIterator(O),i=n.getIterator(O);let r=s.getNext(),o=i.getNext();for(;r&&o;){if(r.name!==o.name||!r.node.equals(o.node))return!1;r=s.getNext(),o=i.getNext()}return r===null&&o===null}else return!1;else return!1}}resolveIndex_(e){return e===Ve?null:this.indexMap_.get(e.toString())}}w.INTEGER_REGEXP_=/^(0|[1-9]\d*)$/;class _d extends w{constructor(){super(new V(Ls),w.EMPTY_NODE,ce.Default)}compareTo(e){return e===this?0:1}equals(e){return e===this}getPriority(){return this}getImmediateChild(e){return w.EMPTY_NODE}isEmpty(){return!1}}const qt=new _d;Object.defineProperties(E,{MIN:{value:new E(Je,w.EMPTY_NODE)},MAX:{value:new E(Re,qt)}});bo.__EMPTY_NODE=w.EMPTY_NODE;B.__childrenNodeConstructor=w;dd(qt);fd(qt);/**
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
 */const yd=!0;function F(t,e=null){if(t===null)return w.EMPTY_NODE;if(typeof t=="object"&&".priority"in t&&(e=t[".priority"]),m(e===null||typeof e=="string"||typeof e=="number"||typeof e=="object"&&".sv"in e,"Invalid priority type found: "+typeof e),typeof t=="object"&&".value"in t&&t[".value"]!==null&&(t=t[".value"]),typeof t!="object"||".sv"in t){const n=t;return new B(n,F(e))}if(!(t instanceof Array)&&yd){const n=[];let s=!1;if(q(t,(o,a)=>{if(o.substring(0,1)!=="."){const l=F(a);l.isEmpty()||(s=s||!l.getPriority().isEmpty(),n.push(new E(o,l)))}}),n.length===0)return w.EMPTY_NODE;const r=dn(n,hd,o=>o.name,Ls);if(s){const o=dn(n,O.getCompare());return new w(r,F(e),new ce({".priority":o},{".priority":O}))}else return new w(r,F(e),ce.Default)}else{let n=w.EMPTY_NODE;return q(t,(s,i)=>{if(oe(t,s)&&s.substring(0,1)!=="."){const r=F(i);(r.isLeafNode()||!r.isEmpty())&&(n=n.updateImmediateChild(s,r))}}),n.updatePriority(F(e))}}ud(F);/**
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
 */class vd extends kn{constructor(e){super(),this.indexPath_=e,m(!S(e)&&C(e)!==".priority","Can't create PathIndex with empty path or .priority key")}extractChild(e){return e.getChild(this.indexPath_)}isDefinedOn(e){return!e.getChild(this.indexPath_).isEmpty()}compare(e,n){const s=this.extractChild(e.node),i=this.extractChild(n.node),r=s.compareTo(i);return r===0?Le(e.name,n.name):r}makePost(e,n){const s=F(e),i=w.EMPTY_NODE.updateChild(this.indexPath_,s);return new E(n,i)}maxPost(){const e=w.EMPTY_NODE.updateChild(this.indexPath_,qt);return new E(Re,e)}toString(){return At(this.indexPath_,0).join("/")}}/**
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
 */class bd extends kn{compare(e,n){const s=e.node.compareTo(n.node);return s===0?Le(e.name,n.name):s}isDefinedOn(e){return!0}indexedValueChanged(e,n){return!e.equals(n)}minPost(){return E.MIN}maxPost(){return E.MAX}makePost(e,n){const s=F(e);return new E(n,s)}toString(){return".value"}}const wd=new bd;/**
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
 */function ko(t){return{type:"value",snapshotNode:t}}function Xe(t,e){return{type:"child_added",snapshotNode:e,childName:t}}function Rt(t,e){return{type:"child_removed",snapshotNode:e,childName:t}}function xt(t,e,n){return{type:"child_changed",snapshotNode:e,childName:t,oldSnap:n}}function Cd(t,e){return{type:"child_moved",snapshotNode:e,childName:t}}/**
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
 */class Fs{constructor(e){this.index_=e}updateChild(e,n,s,i,r,o){m(e.isIndexed(this.index_),"A node must be indexed if only a child is updated");const a=e.getImmediateChild(n);return a.getChild(i).equals(s.getChild(i))&&a.isEmpty()===s.isEmpty()||(o!=null&&(s.isEmpty()?e.hasChild(n)?o.trackChildChange(Rt(n,a)):m(e.isLeafNode(),"A child remove without an old child only makes sense on a leaf node"):a.isEmpty()?o.trackChildChange(Xe(n,s)):o.trackChildChange(xt(n,s,a))),e.isLeafNode()&&s.isEmpty())?e:e.updateImmediateChild(n,s).withIndex(this.index_)}updateFullNode(e,n,s){return s!=null&&(e.isLeafNode()||e.forEachChild(O,(i,r)=>{n.hasChild(i)||s.trackChildChange(Rt(i,r))}),n.isLeafNode()||n.forEachChild(O,(i,r)=>{if(e.hasChild(i)){const o=e.getImmediateChild(i);o.equals(r)||s.trackChildChange(xt(i,r,o))}else s.trackChildChange(Xe(i,r))})),n.withIndex(this.index_)}updatePriority(e,n){return e.isEmpty()?w.EMPTY_NODE:e.updatePriority(n)}filtersNodes(){return!1}getIndexedFilter(){return this}getIndex(){return this.index_}}/**
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
 */class Pt{constructor(e){this.indexedFilter_=new Fs(e.getIndex()),this.index_=e.getIndex(),this.startPost_=Pt.getStartPost_(e),this.endPost_=Pt.getEndPost_(e),this.startIsInclusive_=!e.startAfterSet_,this.endIsInclusive_=!e.endBeforeSet_}getStartPost(){return this.startPost_}getEndPost(){return this.endPost_}matches(e){const n=this.startIsInclusive_?this.index_.compare(this.getStartPost(),e)<=0:this.index_.compare(this.getStartPost(),e)<0,s=this.endIsInclusive_?this.index_.compare(e,this.getEndPost())<=0:this.index_.compare(e,this.getEndPost())<0;return n&&s}updateChild(e,n,s,i,r,o){return this.matches(new E(n,s))||(s=w.EMPTY_NODE),this.indexedFilter_.updateChild(e,n,s,i,r,o)}updateFullNode(e,n,s){n.isLeafNode()&&(n=w.EMPTY_NODE);let i=n.withIndex(this.index_);i=i.updatePriority(w.EMPTY_NODE);const r=this;return n.forEachChild(O,(o,a)=>{r.matches(new E(o,a))||(i=i.updateImmediateChild(o,w.EMPTY_NODE))}),this.indexedFilter_.updateFullNode(e,i,s)}updatePriority(e,n){return e}filtersNodes(){return!0}getIndexedFilter(){return this.indexedFilter_}getIndex(){return this.index_}static getStartPost_(e){if(e.hasStart()){const n=e.getIndexStartName();return e.getIndex().makePost(e.getIndexStartValue(),n)}else return e.getIndex().minPost()}static getEndPost_(e){if(e.hasEnd()){const n=e.getIndexEndName();return e.getIndex().makePost(e.getIndexEndValue(),n)}else return e.getIndex().maxPost()}}/**
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
 */class Sd{constructor(e){this.withinDirectionalStart=n=>this.reverse_?this.withinEndPost(n):this.withinStartPost(n),this.withinDirectionalEnd=n=>this.reverse_?this.withinStartPost(n):this.withinEndPost(n),this.withinStartPost=n=>{const s=this.index_.compare(this.rangedFilter_.getStartPost(),n);return this.startIsInclusive_?s<=0:s<0},this.withinEndPost=n=>{const s=this.index_.compare(n,this.rangedFilter_.getEndPost());return this.endIsInclusive_?s<=0:s<0},this.rangedFilter_=new Pt(e),this.index_=e.getIndex(),this.limit_=e.getLimit(),this.reverse_=!e.isViewFromLeft(),this.startIsInclusive_=!e.startAfterSet_,this.endIsInclusive_=!e.endBeforeSet_}updateChild(e,n,s,i,r,o){return this.rangedFilter_.matches(new E(n,s))||(s=w.EMPTY_NODE),e.getImmediateChild(n).equals(s)?e:e.numChildren()<this.limit_?this.rangedFilter_.getIndexedFilter().updateChild(e,n,s,i,r,o):this.fullLimitUpdateChild_(e,n,s,r,o)}updateFullNode(e,n,s){let i;if(n.isLeafNode()||n.isEmpty())i=w.EMPTY_NODE.withIndex(this.index_);else if(this.limit_*2<n.numChildren()&&n.isIndexed(this.index_)){i=w.EMPTY_NODE.withIndex(this.index_);let r;this.reverse_?r=n.getReverseIteratorFrom(this.rangedFilter_.getEndPost(),this.index_):r=n.getIteratorFrom(this.rangedFilter_.getStartPost(),this.index_);let o=0;for(;r.hasNext()&&o<this.limit_;){const a=r.getNext();if(this.withinDirectionalStart(a))if(this.withinDirectionalEnd(a))i=i.updateImmediateChild(a.name,a.node),o++;else break;else continue}}else{i=n.withIndex(this.index_),i=i.updatePriority(w.EMPTY_NODE);let r;this.reverse_?r=i.getReverseIterator(this.index_):r=i.getIterator(this.index_);let o=0;for(;r.hasNext();){const a=r.getNext();o<this.limit_&&this.withinDirectionalStart(a)&&this.withinDirectionalEnd(a)?o++:i=i.updateImmediateChild(a.name,w.EMPTY_NODE)}}return this.rangedFilter_.getIndexedFilter().updateFullNode(e,i,s)}updatePriority(e,n){return e}filtersNodes(){return!0}getIndexedFilter(){return this.rangedFilter_.getIndexedFilter()}getIndex(){return this.index_}fullLimitUpdateChild_(e,n,s,i,r){let o;if(this.reverse_){const h=this.index_.getCompare();o=(f,g)=>h(g,f)}else o=this.index_.getCompare();const a=e;m(a.numChildren()===this.limit_,"");const l=new E(n,s),c=this.reverse_?a.getFirstChild(this.index_):a.getLastChild(this.index_),d=this.rangedFilter_.matches(l);if(a.hasChild(n)){const h=a.getImmediateChild(n);let f=i.getChildAfterChild(this.index_,c,this.reverse_);for(;f!=null&&(f.name===n||a.hasChild(f.name));)f=i.getChildAfterChild(this.index_,f,this.reverse_);const g=f==null?1:o(f,l);if(d&&!s.isEmpty()&&g>=0)return r!=null&&r.trackChildChange(xt(n,s,h)),a.updateImmediateChild(n,s);{r!=null&&r.trackChildChange(Rt(n,h));const k=a.updateImmediateChild(n,w.EMPTY_NODE);return f!=null&&this.rangedFilter_.matches(f)?(r!=null&&r.trackChildChange(Xe(f.name,f.node)),k.updateImmediateChild(f.name,f.node)):k}}else return s.isEmpty()?e:d&&o(c,l)>=0?(r!=null&&(r.trackChildChange(Rt(c.name,c.node)),r.trackChildChange(Xe(n,s))),a.updateImmediateChild(n,s).updateImmediateChild(c.name,w.EMPTY_NODE)):e}}/**
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
 */class $s{constructor(){this.limitSet_=!1,this.startSet_=!1,this.startNameSet_=!1,this.startAfterSet_=!1,this.endSet_=!1,this.endNameSet_=!1,this.endBeforeSet_=!1,this.limit_=0,this.viewFrom_="",this.indexStartValue_=null,this.indexStartName_="",this.indexEndValue_=null,this.indexEndName_="",this.index_=O}hasStart(){return this.startSet_}isViewFromLeft(){return this.viewFrom_===""?this.startSet_:this.viewFrom_==="l"}getIndexStartValue(){return m(this.startSet_,"Only valid if start has been set"),this.indexStartValue_}getIndexStartName(){return m(this.startSet_,"Only valid if start has been set"),this.startNameSet_?this.indexStartName_:Je}hasEnd(){return this.endSet_}getIndexEndValue(){return m(this.endSet_,"Only valid if end has been set"),this.indexEndValue_}getIndexEndName(){return m(this.endSet_,"Only valid if end has been set"),this.endNameSet_?this.indexEndName_:Re}hasLimit(){return this.limitSet_}hasAnchoredLimit(){return this.limitSet_&&this.viewFrom_!==""}getLimit(){return m(this.limitSet_,"Only valid if limit has been set"),this.limit_}getIndex(){return this.index_}loadsAllData(){return!(this.startSet_||this.endSet_||this.limitSet_)}isDefault(){return this.loadsAllData()&&this.index_===O}copy(){const e=new $s;return e.limitSet_=this.limitSet_,e.limit_=this.limit_,e.startSet_=this.startSet_,e.startAfterSet_=this.startAfterSet_,e.indexStartValue_=this.indexStartValue_,e.startNameSet_=this.startNameSet_,e.indexStartName_=this.indexStartName_,e.endSet_=this.endSet_,e.endBeforeSet_=this.endBeforeSet_,e.indexEndValue_=this.indexEndValue_,e.endNameSet_=this.endNameSet_,e.indexEndName_=this.indexEndName_,e.index_=this.index_,e.viewFrom_=this.viewFrom_,e}}function Ed(t){return t.loadsAllData()?new Fs(t.getIndex()):t.hasLimit()?new Sd(t):new Pt(t)}function Yi(t){const e={};if(t.isDefault())return e;let n;if(t.index_===O?n="$priority":t.index_===wd?n="$value":t.index_===Ve?n="$key":(m(t.index_ instanceof vd,"Unrecognized index type!"),n=t.index_.toString()),e.orderBy=H(n),t.startSet_){const s=t.startAfterSet_?"startAfter":"startAt";e[s]=H(t.indexStartValue_),t.startNameSet_&&(e[s]+=","+H(t.indexStartName_))}if(t.endSet_){const s=t.endBeforeSet_?"endBefore":"endAt";e[s]=H(t.indexEndValue_),t.endNameSet_&&(e[s]+=","+H(t.indexEndName_))}return t.limitSet_&&(t.isViewFromLeft()?e.limitToFirst=t.limit_:e.limitToLast=t.limit_),e}function Zi(t){const e={};if(t.startSet_&&(e.sp=t.indexStartValue_,t.startNameSet_&&(e.sn=t.indexStartName_),e.sin=!t.startAfterSet_),t.endSet_&&(e.ep=t.indexEndValue_,t.endNameSet_&&(e.en=t.indexEndName_),e.ein=!t.endBeforeSet_),t.limitSet_){e.l=t.limit_;let n=t.viewFrom_;n===""&&(t.isViewFromLeft()?n="l":n="r"),e.vf=n}return t.index_!==O&&(e.i=t.index_.toString()),e}/**
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
 */class un extends go{reportStats(e){throw new Error("Method not implemented.")}static getListenId_(e,n){return n!==void 0?"tag$"+n:(m(e._queryParams.isDefault(),"should have a tag if it's not a default query."),e._path.toString())}constructor(e,n,s,i){super(),this.repoInfo_=e,this.onDataUpdate_=n,this.authTokenProvider_=s,this.appCheckTokenProvider_=i,this.log_=Ut("p:rest:"),this.listens_={}}listen(e,n,s,i){const r=e._path.toString();this.log_("Listen called for "+r+" "+e._queryIdentifier);const o=un.getListenId_(e,s),a={};this.listens_[o]=a;const l=Yi(e._queryParams);this.restRequest_(r+".json",l,(c,d)=>{let h=d;if(c===404&&(h=null,c=null),c===null&&this.onDataUpdate_(r,h,!1,s),Ze(this.listens_,o)===a){let f;c?c===401?f="permission_denied":f="rest_error:"+c:f="ok",i(f,null)}})}unlisten(e,n){const s=un.getListenId_(e,n);delete this.listens_[s]}get(e){const n=Yi(e._queryParams),s=e._path.toString(),i=new le;return this.restRequest_(s+".json",n,(r,o)=>{let a=o;r===404&&(a=null,r=null),r===null?(this.onDataUpdate_(s,a,!1,null),i.resolve(a)):i.reject(new Error(a))}),i.promise}refreshAuthToken(e){}restRequest_(e,n={},s){return n.format="export",Promise.all([this.authTokenProvider_.getToken(!1),this.appCheckTokenProvider_.getToken(!1)]).then(([i,r])=>{i&&i.accessToken&&(n.auth=i.accessToken),r&&r.token&&(n.ac=r.token);const o=(this.repoInfo_.secure?"https://":"http://")+this.repoInfo_.host+e+"?ns="+this.repoInfo_.namespace+zl(n);this.log_("Sending REST request for "+o);const a=new XMLHttpRequest;a.onreadystatechange=()=>{if(s&&a.readyState===4){this.log_("REST Response for "+o+" received. status:",a.status,"response:",a.responseText);let l=null;if(a.status>=200&&a.status<300){try{l=kt(a.responseText)}catch{z("Failed to parse JSON response for "+o+": "+a.responseText)}s(null,l)}else a.status!==401&&a.status!==404&&z("Got unsuccessful REST response for "+o+" Status: "+a.status),s(a.status);s=null}},a.open("GET",o,!0),a.send()})}}/**
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
 */class kd{constructor(){this.rootNode_=w.EMPTY_NODE}getNode(e){return this.rootNode_.getChild(e)}updateSnapshot(e,n){this.rootNode_=this.rootNode_.updateChild(e,n)}}/**
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
 */function fn(){return{value:null,children:new Map}}function at(t,e,n){if(S(e))t.value=n,t.children.clear();else if(t.value!==null)t.value=t.value.updateChild(e,n);else{const s=C(e);t.children.has(s)||t.children.set(s,fn());const i=t.children.get(s);e=R(e),at(i,e,n)}}function ds(t,e){if(S(e))return t.value=null,t.children.clear(),!0;if(t.value!==null){if(t.value.isLeafNode())return!1;{const n=t.value;return t.value=null,n.forEachChild(O,(s,i)=>{at(t,new A(s),i)}),ds(t,e)}}else if(t.children.size>0){const n=C(e);return e=R(e),t.children.has(n)&&ds(t.children.get(n),e)&&t.children.delete(n),t.children.size===0}else return!0}function us(t,e,n){t.value!==null?n(e,t.value):Td(t,(s,i)=>{const r=new A(e.toString()+"/"+s);us(i,r,n)})}function Td(t,e){t.children.forEach((n,s)=>{e(s,n)})}/**
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
 */class Id{constructor(e){this.collection_=e,this.last_=null}get(){const e=this.collection_.get(),n={...e};return this.last_&&q(this.last_,(s,i)=>{n[s]=n[s]-i}),this.last_=e,n}}/**
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
 */const Qi=10*1e3,Nd=30*1e3,Ad=5*60*1e3;class Rd{constructor(e,n){this.server_=n,this.statsToReport_={},this.statsListener_=new Id(e);const s=Qi+(Nd-Qi)*Math.random();vt(this.reportStats_.bind(this),Math.floor(s))}reportStats_(){const e=this.statsListener_.get(),n={};let s=!1;q(e,(i,r)=>{r>0&&oe(this.statsToReport_,i)&&(n[i]=r,s=!0)}),s&&this.server_.reportStats(n),vt(this.reportStats_.bind(this),Math.floor(Math.random()*2*Ad))}}/**
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
 */var se;(function(t){t[t.OVERWRITE=0]="OVERWRITE",t[t.MERGE=1]="MERGE",t[t.ACK_USER_WRITE=2]="ACK_USER_WRITE",t[t.LISTEN_COMPLETE=3]="LISTEN_COMPLETE"})(se||(se={}));function To(){return{fromUser:!0,fromServer:!1,queryId:null,tagged:!1}}function Bs(){return{fromUser:!1,fromServer:!0,queryId:null,tagged:!1}}function Ws(t){return{fromUser:!1,fromServer:!0,queryId:t,tagged:!0}}/**
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
 */class pn{constructor(e,n,s){this.path=e,this.affectedTree=n,this.revert=s,this.type=se.ACK_USER_WRITE,this.source=To()}operationForChild(e){if(S(this.path)){if(this.affectedTree.value!=null)return m(this.affectedTree.children.isEmpty(),"affectedTree should not have overlapping affected paths."),this;{const n=this.affectedTree.subtree(new A(e));return new pn(I(),n,this.revert)}}else return m(C(this.path)===e,"operationForChild called for unrelated child."),new pn(R(this.path),this.affectedTree,this.revert)}}/**
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
 */class Dt{constructor(e,n){this.source=e,this.path=n,this.type=se.LISTEN_COMPLETE}operationForChild(e){return S(this.path)?new Dt(this.source,I()):new Dt(this.source,R(this.path))}}/**
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
 */class xe{constructor(e,n,s){this.source=e,this.path=n,this.snap=s,this.type=se.OVERWRITE}operationForChild(e){return S(this.path)?new xe(this.source,I(),this.snap.getImmediateChild(e)):new xe(this.source,R(this.path),this.snap)}}/**
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
 */class Ot{constructor(e,n,s){this.source=e,this.path=n,this.children=s,this.type=se.MERGE}operationForChild(e){if(S(this.path)){const n=this.children.subtree(new A(e));return n.isEmpty()?null:n.value?new xe(this.source,I(),n.value):new Ot(this.source,I(),n)}else return m(C(this.path)===e,"Can't get a merge for a child not on the path of the operation"),new Ot(this.source,R(this.path),this.children)}toString(){return"Operation("+this.path+": "+this.source.toString()+" merge: "+this.children.toString()+")"}}/**
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
 */class Pe{constructor(e,n,s){this.node_=e,this.fullyInitialized_=n,this.filtered_=s}isFullyInitialized(){return this.fullyInitialized_}isFiltered(){return this.filtered_}isCompleteForPath(e){if(S(e))return this.isFullyInitialized()&&!this.filtered_;const n=C(e);return this.isCompleteForChild(n)}isCompleteForChild(e){return this.isFullyInitialized()&&!this.filtered_||this.node_.hasChild(e)}getNode(){return this.node_}}/**
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
 */class xd{constructor(e){this.query_=e,this.index_=this.query_._queryParams.getIndex()}}function Pd(t,e,n,s){const i=[],r=[];return e.forEach(o=>{o.type==="child_changed"&&t.index_.indexedValueChanged(o.oldSnap,o.snapshotNode)&&r.push(Cd(o.childName,o.snapshotNode))}),ut(t,i,"child_removed",e,s,n),ut(t,i,"child_added",e,s,n),ut(t,i,"child_moved",r,s,n),ut(t,i,"child_changed",e,s,n),ut(t,i,"value",e,s,n),i}function ut(t,e,n,s,i,r){const o=s.filter(a=>a.type===n);o.sort((a,l)=>Od(t,a,l)),o.forEach(a=>{const l=Dd(t,a,r);i.forEach(c=>{c.respondsTo(a.type)&&e.push(c.createEvent(l,t.query_))})})}function Dd(t,e,n){return e.type==="value"||e.type==="child_removed"||(e.prevName=n.getPredecessorChildName(e.childName,e.snapshotNode,t.index_)),e}function Od(t,e,n){if(e.childName==null||n.childName==null)throw it("Should only compare child_ events.");const s=new E(e.childName,e.snapshotNode),i=new E(n.childName,n.snapshotNode);return t.index_.compare(s,i)}/**
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
 */function Tn(t,e){return{eventCache:t,serverCache:e}}function bt(t,e,n,s){return Tn(new Pe(e,n,s),t.serverCache)}function Io(t,e,n,s){return Tn(t.eventCache,new Pe(e,n,s))}function fs(t){return t.eventCache.isFullyInitialized()?t.eventCache.getNode():null}function De(t){return t.serverCache.isFullyInitialized()?t.serverCache.getNode():null}/**
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
 */let Vn;const Md=()=>(Vn||(Vn=new V(vh)),Vn);class P{static fromObject(e){let n=new P(null);return q(e,(s,i)=>{n=n.set(new A(s),i)}),n}constructor(e,n=Md()){this.value=e,this.children=n}isEmpty(){return this.value===null&&this.children.isEmpty()}findRootMostMatchingPathAndValue(e,n){if(this.value!=null&&n(this.value))return{path:I(),value:this.value};if(S(e))return null;{const s=C(e),i=this.children.get(s);if(i!==null){const r=i.findRootMostMatchingPathAndValue(R(e),n);return r!=null?{path:M(new A(s),r.path),value:r.value}:null}else return null}}findRootMostValueAndPath(e){return this.findRootMostMatchingPathAndValue(e,()=>!0)}subtree(e){if(S(e))return this;{const n=C(e),s=this.children.get(n);return s!==null?s.subtree(R(e)):new P(null)}}set(e,n){if(S(e))return new P(n,this.children);{const s=C(e),r=(this.children.get(s)||new P(null)).set(R(e),n),o=this.children.insert(s,r);return new P(this.value,o)}}remove(e){if(S(e))return this.children.isEmpty()?new P(null):new P(null,this.children);{const n=C(e),s=this.children.get(n);if(s){const i=s.remove(R(e));let r;return i.isEmpty()?r=this.children.remove(n):r=this.children.insert(n,i),this.value===null&&r.isEmpty()?new P(null):new P(this.value,r)}else return this}}get(e){if(S(e))return this.value;{const n=C(e),s=this.children.get(n);return s?s.get(R(e)):null}}setTree(e,n){if(S(e))return n;{const s=C(e),r=(this.children.get(s)||new P(null)).setTree(R(e),n);let o;return r.isEmpty()?o=this.children.remove(s):o=this.children.insert(s,r),new P(this.value,o)}}fold(e){return this.fold_(I(),e)}fold_(e,n){const s={};return this.children.inorderTraversal((i,r)=>{s[i]=r.fold_(M(e,i),n)}),n(e,this.value,s)}findOnPath(e,n){return this.findOnPath_(e,I(),n)}findOnPath_(e,n,s){const i=this.value?s(n,this.value):!1;if(i)return i;if(S(e))return null;{const r=C(e),o=this.children.get(r);return o?o.findOnPath_(R(e),M(n,r),s):null}}foreachOnPath(e,n){return this.foreachOnPath_(e,I(),n)}foreachOnPath_(e,n,s){if(S(e))return this;{this.value&&s(n,this.value);const i=C(e),r=this.children.get(i);return r?r.foreachOnPath_(R(e),M(n,i),s):new P(null)}}foreach(e){this.foreach_(I(),e)}foreach_(e,n){this.children.inorderTraversal((s,i)=>{i.foreach_(M(e,s),n)}),this.value&&n(e,this.value)}foreachChild(e){this.children.inorderTraversal((n,s)=>{s.value&&e(n,s.value)})}}/**
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
 */class re{constructor(e){this.writeTree_=e}static empty(){return new re(new P(null))}}function wt(t,e,n){if(S(e))return new re(new P(n));{const s=t.writeTree_.findRootMostValueAndPath(e);if(s!=null){const i=s.path;let r=s.value;const o=G(i,e);return r=r.updateChild(o,n),new re(t.writeTree_.set(i,r))}else{const i=new P(n),r=t.writeTree_.setTree(e,i);return new re(r)}}}function Ji(t,e,n){let s=t;return q(n,(i,r)=>{s=wt(s,M(e,i),r)}),s}function Xi(t,e){if(S(e))return re.empty();{const n=t.writeTree_.setTree(e,new P(null));return new re(n)}}function ps(t,e){return Fe(t,e)!=null}function Fe(t,e){const n=t.writeTree_.findRootMostValueAndPath(e);return n!=null?t.writeTree_.get(n.path).getChild(G(n.path,e)):null}function er(t){const e=[],n=t.writeTree_.value;return n!=null?n.isLeafNode()||n.forEachChild(O,(s,i)=>{e.push(new E(s,i))}):t.writeTree_.children.inorderTraversal((s,i)=>{i.value!=null&&e.push(new E(s,i.value))}),e}function ye(t,e){if(S(e))return t;{const n=Fe(t,e);return n!=null?new re(new P(n)):new re(t.writeTree_.subtree(e))}}function ms(t){return t.writeTree_.isEmpty()}function et(t,e){return No(I(),t.writeTree_,e)}function No(t,e,n){if(e.value!=null)return n.updateChild(t,e.value);{let s=null;return e.children.inorderTraversal((i,r)=>{i===".priority"?(m(r.value!==null,"Priority writes must always be leaf nodes"),s=r.value):n=No(M(t,i),r,n)}),!n.getChild(t).isEmpty()&&s!==null&&(n=n.updateChild(M(t,".priority"),s)),n}}/**
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
 */function Hs(t,e){return Po(e,t)}function Ld(t,e,n,s,i){m(s>t.lastWriteId,"Stacking an older write on top of newer ones"),i===void 0&&(i=!0),t.allWrites.push({path:e,snap:n,writeId:s,visible:i}),i&&(t.visibleWrites=wt(t.visibleWrites,e,n)),t.lastWriteId=s}function Fd(t,e){for(let n=0;n<t.allWrites.length;n++){const s=t.allWrites[n];if(s.writeId===e)return s}return null}function $d(t,e){const n=t.allWrites.findIndex(a=>a.writeId===e);m(n>=0,"removeWrite called with nonexistent writeId.");const s=t.allWrites[n];t.allWrites.splice(n,1);let i=s.visible,r=!1,o=t.allWrites.length-1;for(;i&&o>=0;){const a=t.allWrites[o];a.visible&&(o>=n&&Bd(a,s.path)?i=!1:J(s.path,a.path)&&(r=!0)),o--}if(i){if(r)return Wd(t),!0;if(s.snap)t.visibleWrites=Xi(t.visibleWrites,s.path);else{const a=s.children;q(a,l=>{t.visibleWrites=Xi(t.visibleWrites,M(s.path,l))})}return!0}else return!1}function Bd(t,e){if(t.snap)return J(t.path,e);for(const n in t.children)if(t.children.hasOwnProperty(n)&&J(M(t.path,n),e))return!0;return!1}function Wd(t){t.visibleWrites=Ao(t.allWrites,Hd,I()),t.allWrites.length>0?t.lastWriteId=t.allWrites[t.allWrites.length-1].writeId:t.lastWriteId=-1}function Hd(t){return t.visible}function Ao(t,e,n){let s=re.empty();for(let i=0;i<t.length;++i){const r=t[i];if(e(r)){const o=r.path;let a;if(r.snap)J(n,o)?(a=G(n,o),s=wt(s,a,r.snap)):J(o,n)&&(a=G(o,n),s=wt(s,I(),r.snap.getChild(a)));else if(r.children){if(J(n,o))a=G(n,o),s=Ji(s,a,r.children);else if(J(o,n))if(a=G(o,n),S(a))s=Ji(s,I(),r.children);else{const l=Ze(r.children,C(a));if(l){const c=l.getChild(R(a));s=wt(s,I(),c)}}}else throw it("WriteRecord should have .snap or .children")}}return s}function Ro(t,e,n,s,i){if(!s&&!i){const r=Fe(t.visibleWrites,e);if(r!=null)return r;{const o=ye(t.visibleWrites,e);if(ms(o))return n;if(n==null&&!ps(o,I()))return null;{const a=n||w.EMPTY_NODE;return et(o,a)}}}else{const r=ye(t.visibleWrites,e);if(!i&&ms(r))return n;if(!i&&n==null&&!ps(r,I()))return null;{const o=function(c){return(c.visible||i)&&(!s||!~s.indexOf(c.writeId))&&(J(c.path,e)||J(e,c.path))},a=Ao(t.allWrites,o,e),l=n||w.EMPTY_NODE;return et(a,l)}}}function Ud(t,e,n){let s=w.EMPTY_NODE;const i=Fe(t.visibleWrites,e);if(i)return i.isLeafNode()||i.forEachChild(O,(r,o)=>{s=s.updateImmediateChild(r,o)}),s;if(n){const r=ye(t.visibleWrites,e);return n.forEachChild(O,(o,a)=>{const l=et(ye(r,new A(o)),a);s=s.updateImmediateChild(o,l)}),er(r).forEach(o=>{s=s.updateImmediateChild(o.name,o.node)}),s}else{const r=ye(t.visibleWrites,e);return er(r).forEach(o=>{s=s.updateImmediateChild(o.name,o.node)}),s}}function qd(t,e,n,s,i){m(s||i,"Either existingEventSnap or existingServerSnap must exist");const r=M(e,n);if(ps(t.visibleWrites,r))return null;{const o=ye(t.visibleWrites,r);return ms(o)?i.getChild(n):et(o,i.getChild(n))}}function jd(t,e,n,s){const i=M(e,n),r=Fe(t.visibleWrites,i);if(r!=null)return r;if(s.isCompleteForChild(n)){const o=ye(t.visibleWrites,i);return et(o,s.getNode().getImmediateChild(n))}else return null}function Gd(t,e){return Fe(t.visibleWrites,e)}function Vd(t,e,n,s,i,r,o){let a;const l=ye(t.visibleWrites,e),c=Fe(l,I());if(c!=null)a=c;else if(n!=null)a=et(l,n);else return[];if(a=a.withIndex(o),!a.isEmpty()&&!a.isLeafNode()){const d=[],h=o.getCompare(),f=r?a.getReverseIteratorFrom(s,o):a.getIteratorFrom(s,o);let g=f.getNext();for(;g&&d.length<i;)h(g,s)!==0&&d.push(g),g=f.getNext();return d}else return[]}function zd(){return{visibleWrites:re.empty(),allWrites:[],lastWriteId:-1}}function mn(t,e,n,s){return Ro(t.writeTree,t.treePath,e,n,s)}function Us(t,e){return Ud(t.writeTree,t.treePath,e)}function tr(t,e,n,s){return qd(t.writeTree,t.treePath,e,n,s)}function gn(t,e){return Gd(t.writeTree,M(t.treePath,e))}function Kd(t,e,n,s,i,r){return Vd(t.writeTree,t.treePath,e,n,s,i,r)}function qs(t,e,n){return jd(t.writeTree,t.treePath,e,n)}function xo(t,e){return Po(M(t.treePath,e),t.writeTree)}function Po(t,e){return{treePath:t,writeTree:e}}/**
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
 */class Yd{constructor(){this.changeMap=new Map}trackChildChange(e){const n=e.type,s=e.childName;m(n==="child_added"||n==="child_changed"||n==="child_removed","Only child changes supported for tracking"),m(s!==".priority","Only non-priority child changes can be tracked.");const i=this.changeMap.get(s);if(i){const r=i.type;if(n==="child_added"&&r==="child_removed")this.changeMap.set(s,xt(s,e.snapshotNode,i.snapshotNode));else if(n==="child_removed"&&r==="child_added")this.changeMap.delete(s);else if(n==="child_removed"&&r==="child_changed")this.changeMap.set(s,Rt(s,i.oldSnap));else if(n==="child_changed"&&r==="child_added")this.changeMap.set(s,Xe(s,e.snapshotNode));else if(n==="child_changed"&&r==="child_changed")this.changeMap.set(s,xt(s,e.snapshotNode,i.oldSnap));else throw it("Illegal combination of changes: "+e+" occurred after "+i)}else this.changeMap.set(s,e)}getChanges(){return Array.from(this.changeMap.values())}}/**
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
 */class Zd{getCompleteChild(e){return null}getChildAfterChild(e,n,s){return null}}const Do=new Zd;class js{constructor(e,n,s=null){this.writes_=e,this.viewCache_=n,this.optCompleteServerCache_=s}getCompleteChild(e){const n=this.viewCache_.eventCache;if(n.isCompleteForChild(e))return n.getNode().getImmediateChild(e);{const s=this.optCompleteServerCache_!=null?new Pe(this.optCompleteServerCache_,!0,!1):this.viewCache_.serverCache;return qs(this.writes_,e,s)}}getChildAfterChild(e,n,s){const i=this.optCompleteServerCache_!=null?this.optCompleteServerCache_:De(this.viewCache_),r=Kd(this.writes_,i,n,1,s,e);return r.length===0?null:r[0]}}/**
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
 */function Qd(t){return{filter:t}}function Jd(t,e){m(e.eventCache.getNode().isIndexed(t.filter.getIndex()),"Event snap not indexed"),m(e.serverCache.getNode().isIndexed(t.filter.getIndex()),"Server snap not indexed")}function Xd(t,e,n,s,i){const r=new Yd;let o,a;if(n.type===se.OVERWRITE){const c=n;c.source.fromUser?o=gs(t,e,c.path,c.snap,s,i,r):(m(c.source.fromServer,"Unknown source."),a=c.source.tagged||e.serverCache.isFiltered()&&!S(c.path),o=_n(t,e,c.path,c.snap,s,i,a,r))}else if(n.type===se.MERGE){const c=n;c.source.fromUser?o=tu(t,e,c.path,c.children,s,i,r):(m(c.source.fromServer,"Unknown source."),a=c.source.tagged||e.serverCache.isFiltered(),o=_s(t,e,c.path,c.children,s,i,a,r))}else if(n.type===se.ACK_USER_WRITE){const c=n;c.revert?o=iu(t,e,c.path,s,i,r):o=nu(t,e,c.path,c.affectedTree,s,i,r)}else if(n.type===se.LISTEN_COMPLETE)o=su(t,e,n.path,s,r);else throw it("Unknown operation type: "+n.type);const l=r.getChanges();return eu(e,o,l),{viewCache:o,changes:l}}function eu(t,e,n){const s=e.eventCache;if(s.isFullyInitialized()){const i=s.getNode().isLeafNode()||s.getNode().isEmpty(),r=fs(t);(n.length>0||!t.eventCache.isFullyInitialized()||i&&!s.getNode().equals(r)||!s.getNode().getPriority().equals(r.getPriority()))&&n.push(ko(fs(e)))}}function Oo(t,e,n,s,i,r){const o=e.eventCache;if(gn(s,n)!=null)return e;{let a,l;if(S(n))if(m(e.serverCache.isFullyInitialized(),"If change path is empty, we must have complete server data"),e.serverCache.isFiltered()){const c=De(e),d=c instanceof w?c:w.EMPTY_NODE,h=Us(s,d);a=t.filter.updateFullNode(e.eventCache.getNode(),h,r)}else{const c=mn(s,De(e));a=t.filter.updateFullNode(e.eventCache.getNode(),c,r)}else{const c=C(n);if(c===".priority"){m(ve(n)===1,"Can't have a priority with additional path components");const d=o.getNode();l=e.serverCache.getNode();const h=tr(s,n,d,l);h!=null?a=t.filter.updatePriority(d,h):a=o.getNode()}else{const d=R(n);let h;if(o.isCompleteForChild(c)){l=e.serverCache.getNode();const f=tr(s,n,o.getNode(),l);f!=null?h=o.getNode().getImmediateChild(c).updateChild(d,f):h=o.getNode().getImmediateChild(c)}else h=qs(s,c,e.serverCache);h!=null?a=t.filter.updateChild(o.getNode(),c,h,d,i,r):a=o.getNode()}}return bt(e,a,o.isFullyInitialized()||S(n),t.filter.filtersNodes())}}function _n(t,e,n,s,i,r,o,a){const l=e.serverCache;let c;const d=o?t.filter:t.filter.getIndexedFilter();if(S(n))c=d.updateFullNode(l.getNode(),s,null);else if(d.filtersNodes()&&!l.isFiltered()){const g=l.getNode().updateChild(n,s);c=d.updateFullNode(l.getNode(),g,null)}else{const g=C(n);if(!l.isCompleteForPath(n)&&ve(n)>1)return e;const _=R(n),D=l.getNode().getImmediateChild(g).updateChild(_,s);g===".priority"?c=d.updatePriority(l.getNode(),D):c=d.updateChild(l.getNode(),g,D,_,Do,null)}const h=Io(e,c,l.isFullyInitialized()||S(n),d.filtersNodes()),f=new js(i,h,r);return Oo(t,h,n,i,f,a)}function gs(t,e,n,s,i,r,o){const a=e.eventCache;let l,c;const d=new js(i,e,r);if(S(n))c=t.filter.updateFullNode(e.eventCache.getNode(),s,o),l=bt(e,c,!0,t.filter.filtersNodes());else{const h=C(n);if(h===".priority")c=t.filter.updatePriority(e.eventCache.getNode(),s),l=bt(e,c,a.isFullyInitialized(),a.isFiltered());else{const f=R(n),g=a.getNode().getImmediateChild(h);let _;if(S(f))_=s;else{const k=d.getCompleteChild(h);k!=null?Ds(f)===".priority"&&k.getChild(yo(f)).isEmpty()?_=k:_=k.updateChild(f,s):_=w.EMPTY_NODE}if(g.equals(_))l=e;else{const k=t.filter.updateChild(a.getNode(),h,_,f,d,o);l=bt(e,k,a.isFullyInitialized(),t.filter.filtersNodes())}}}return l}function nr(t,e){return t.eventCache.isCompleteForChild(e)}function tu(t,e,n,s,i,r,o){let a=e;return s.foreach((l,c)=>{const d=M(n,l);nr(e,C(d))&&(a=gs(t,a,d,c,i,r,o))}),s.foreach((l,c)=>{const d=M(n,l);nr(e,C(d))||(a=gs(t,a,d,c,i,r,o))}),a}function sr(t,e,n){return n.foreach((s,i)=>{e=e.updateChild(s,i)}),e}function _s(t,e,n,s,i,r,o,a){if(e.serverCache.getNode().isEmpty()&&!e.serverCache.isFullyInitialized())return e;let l=e,c;S(n)?c=s:c=new P(null).setTree(n,s);const d=e.serverCache.getNode();return c.children.inorderTraversal((h,f)=>{if(d.hasChild(h)){const g=e.serverCache.getNode().getImmediateChild(h),_=sr(t,g,f);l=_n(t,l,new A(h),_,i,r,o,a)}}),c.children.inorderTraversal((h,f)=>{const g=!e.serverCache.isCompleteForChild(h)&&f.value===null;if(!d.hasChild(h)&&!g){const _=e.serverCache.getNode().getImmediateChild(h),k=sr(t,_,f);l=_n(t,l,new A(h),k,i,r,o,a)}}),l}function nu(t,e,n,s,i,r,o){if(gn(i,n)!=null)return e;const a=e.serverCache.isFiltered(),l=e.serverCache;if(s.value!=null){if(S(n)&&l.isFullyInitialized()||l.isCompleteForPath(n))return _n(t,e,n,l.getNode().getChild(n),i,r,a,o);if(S(n)){let c=new P(null);return l.getNode().forEachChild(Ve,(d,h)=>{c=c.set(new A(d),h)}),_s(t,e,n,c,i,r,a,o)}else return e}else{let c=new P(null);return s.foreach((d,h)=>{const f=M(n,d);l.isCompleteForPath(f)&&(c=c.set(d,l.getNode().getChild(f)))}),_s(t,e,n,c,i,r,a,o)}}function su(t,e,n,s,i){const r=e.serverCache,o=Io(e,r.getNode(),r.isFullyInitialized()||S(n),r.isFiltered());return Oo(t,o,n,s,Do,i)}function iu(t,e,n,s,i,r){let o;if(gn(s,n)!=null)return e;{const a=new js(s,e,i),l=e.eventCache.getNode();let c;if(S(n)||C(n)===".priority"){let d;if(e.serverCache.isFullyInitialized())d=mn(s,De(e));else{const h=e.serverCache.getNode();m(h instanceof w,"serverChildren would be complete if leaf node"),d=Us(s,h)}d=d,c=t.filter.updateFullNode(l,d,r)}else{const d=C(n);let h=qs(s,d,e.serverCache);h==null&&e.serverCache.isCompleteForChild(d)&&(h=l.getImmediateChild(d)),h!=null?c=t.filter.updateChild(l,d,h,R(n),a,r):e.eventCache.getNode().hasChild(d)?c=t.filter.updateChild(l,d,w.EMPTY_NODE,R(n),a,r):c=l,c.isEmpty()&&e.serverCache.isFullyInitialized()&&(o=mn(s,De(e)),o.isLeafNode()&&(c=t.filter.updateFullNode(c,o,r)))}return o=e.serverCache.isFullyInitialized()||gn(s,I())!=null,bt(e,c,o,t.filter.filtersNodes())}}/**
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
 */class ru{constructor(e,n){this.query_=e,this.eventRegistrations_=[];const s=this.query_._queryParams,i=new Fs(s.getIndex()),r=Ed(s);this.processor_=Qd(r);const o=n.serverCache,a=n.eventCache,l=i.updateFullNode(w.EMPTY_NODE,o.getNode(),null),c=r.updateFullNode(w.EMPTY_NODE,a.getNode(),null),d=new Pe(l,o.isFullyInitialized(),i.filtersNodes()),h=new Pe(c,a.isFullyInitialized(),r.filtersNodes());this.viewCache_=Tn(h,d),this.eventGenerator_=new xd(this.query_)}get query(){return this.query_}}function ou(t){return t.viewCache_.serverCache.getNode()}function au(t,e){const n=De(t.viewCache_);return n&&(t.query._queryParams.loadsAllData()||!S(e)&&!n.getImmediateChild(C(e)).isEmpty())?n.getChild(e):null}function ir(t){return t.eventRegistrations_.length===0}function lu(t,e){t.eventRegistrations_.push(e)}function rr(t,e,n){const s=[];if(n){m(e==null,"A cancel should cancel all event registrations.");const i=t.query._path;t.eventRegistrations_.forEach(r=>{const o=r.createCancelEvent(n,i);o&&s.push(o)})}if(e){let i=[];for(let r=0;r<t.eventRegistrations_.length;++r){const o=t.eventRegistrations_[r];if(!o.matches(e))i.push(o);else if(e.hasAnyCallback()){i=i.concat(t.eventRegistrations_.slice(r+1));break}}t.eventRegistrations_=i}else t.eventRegistrations_=[];return s}function or(t,e,n,s){e.type===se.MERGE&&e.source.queryId!==null&&(m(De(t.viewCache_),"We should always have a full cache before handling merges"),m(fs(t.viewCache_),"Missing event cache, even though we have a server cache"));const i=t.viewCache_,r=Xd(t.processor_,i,e,n,s);return Jd(t.processor_,r.viewCache),m(r.viewCache.serverCache.isFullyInitialized()||!i.serverCache.isFullyInitialized(),"Once a server snap is complete, it should never go back"),t.viewCache_=r.viewCache,Mo(t,r.changes,r.viewCache.eventCache.getNode(),null)}function cu(t,e){const n=t.viewCache_.eventCache,s=[];return n.getNode().isLeafNode()||n.getNode().forEachChild(O,(r,o)=>{s.push(Xe(r,o))}),n.isFullyInitialized()&&s.push(ko(n.getNode())),Mo(t,s,n.getNode(),e)}function Mo(t,e,n,s){const i=s?[s]:t.eventRegistrations_;return Pd(t.eventGenerator_,e,n,i)}/**
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
 */let yn;class hu{constructor(){this.views=new Map}}function du(t){m(!yn,"__referenceConstructor has already been defined"),yn=t}function uu(){return m(yn,"Reference.ts has not been loaded"),yn}function fu(t){return t.views.size===0}function Gs(t,e,n,s){const i=e.source.queryId;if(i!==null){const r=t.views.get(i);return m(r!=null,"SyncTree gave us an op for an invalid query."),or(r,e,n,s)}else{let r=[];for(const o of t.views.values())r=r.concat(or(o,e,n,s));return r}}function pu(t,e,n,s,i){const r=e._queryIdentifier,o=t.views.get(r);if(!o){let a=mn(n,i?s:null),l=!1;a?l=!0:s instanceof w?(a=Us(n,s),l=!1):(a=w.EMPTY_NODE,l=!1);const c=Tn(new Pe(a,l,!1),new Pe(s,i,!1));return new ru(e,c)}return o}function mu(t,e,n,s,i,r){const o=pu(t,e,s,i,r);return t.views.has(e._queryIdentifier)||t.views.set(e._queryIdentifier,o),lu(o,n),cu(o,n)}function gu(t,e,n,s){const i=e._queryIdentifier,r=[];let o=[];const a=be(t);if(i==="default")for(const[l,c]of t.views.entries())o=o.concat(rr(c,n,s)),ir(c)&&(t.views.delete(l),c.query._queryParams.loadsAllData()||r.push(c.query));else{const l=t.views.get(i);l&&(o=o.concat(rr(l,n,s)),ir(l)&&(t.views.delete(i),l.query._queryParams.loadsAllData()||r.push(l.query)))}return a&&!be(t)&&r.push(new(uu())(e._repo,e._path)),{removed:r,events:o}}function Lo(t){const e=[];for(const n of t.views.values())n.query._queryParams.loadsAllData()||e.push(n);return e}function ze(t,e){let n=null;for(const s of t.views.values())n=n||au(s,e);return n}function Fo(t,e){if(e._queryParams.loadsAllData())return In(t);{const s=e._queryIdentifier;return t.views.get(s)}}function $o(t,e){return Fo(t,e)!=null}function be(t){return In(t)!=null}function In(t){for(const e of t.views.values())if(e.query._queryParams.loadsAllData())return e;return null}/**
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
 */let vn;function _u(t){m(!vn,"__referenceConstructor has already been defined"),vn=t}function yu(){return m(vn,"Reference.ts has not been loaded"),vn}let vu=1;class ar{constructor(e){this.listenProvider_=e,this.syncPointTree_=new P(null),this.pendingWriteTree_=zd(),this.tagToQueryMap=new Map,this.queryToTagMap=new Map}}function Bo(t,e,n,s,i){return Ld(t.pendingWriteTree_,e,n,s,i),i?jt(t,new xe(To(),e,n)):[]}function Ne(t,e,n=!1){const s=Fd(t.pendingWriteTree_,e);if($d(t.pendingWriteTree_,e)){let r=new P(null);return s.snap!=null?r=r.set(I(),!0):q(s.children,o=>{r=r.set(new A(o),!0)}),jt(t,new pn(s.path,r,n))}else return[]}function Nn(t,e,n){return jt(t,new xe(Bs(),e,n))}function bu(t,e,n){const s=P.fromObject(n);return jt(t,new Ot(Bs(),e,s))}function wu(t,e){return jt(t,new Dt(Bs(),e))}function Cu(t,e,n){const s=zs(t,n);if(s){const i=Ks(s),r=i.path,o=i.queryId,a=G(r,e),l=new Dt(Ws(o),a);return Ys(t,r,l)}else return[]}function ys(t,e,n,s,i=!1){const r=e._path,o=t.syncPointTree_.get(r);let a=[];if(o&&(e._queryIdentifier==="default"||$o(o,e))){const l=gu(o,e,n,s);fu(o)&&(t.syncPointTree_=t.syncPointTree_.remove(r));const c=l.removed;if(a=l.events,!i){const d=c.findIndex(f=>f._queryParams.loadsAllData())!==-1,h=t.syncPointTree_.findOnPath(r,(f,g)=>be(g));if(d&&!h){const f=t.syncPointTree_.subtree(r);if(!f.isEmpty()){const g=ku(f);for(let _=0;_<g.length;++_){const k=g[_],D=k.query,$=Uo(t,k);t.listenProvider_.startListening(Ct(D),bn(t,D),$.hashFn,$.onComplete)}}}!h&&c.length>0&&!s&&(d?t.listenProvider_.stopListening(Ct(e),null):c.forEach(f=>{const g=t.queryToTagMap.get(An(f));t.listenProvider_.stopListening(Ct(f),g)}))}Tu(t,c)}return a}function Su(t,e,n,s){const i=zs(t,s);if(i!=null){const r=Ks(i),o=r.path,a=r.queryId,l=G(o,e),c=new xe(Ws(a),l,n);return Ys(t,o,c)}else return[]}function Eu(t,e,n,s){const i=zs(t,s);if(i){const r=Ks(i),o=r.path,a=r.queryId,l=G(o,e),c=P.fromObject(n),d=new Ot(Ws(a),l,c);return Ys(t,o,d)}else return[]}function lr(t,e,n,s=!1){const i=e._path;let r=null,o=!1;t.syncPointTree_.foreachOnPath(i,(f,g)=>{const _=G(f,i);r=r||ze(g,_),o=o||be(g)});let a=t.syncPointTree_.get(i);a?(o=o||be(a),r=r||ze(a,I())):(a=new hu,t.syncPointTree_=t.syncPointTree_.set(i,a));let l;r!=null?l=!0:(l=!1,r=w.EMPTY_NODE,t.syncPointTree_.subtree(i).foreachChild((g,_)=>{const k=ze(_,I());k&&(r=r.updateImmediateChild(g,k))}));const c=$o(a,e);if(!c&&!e._queryParams.loadsAllData()){const f=An(e);m(!t.queryToTagMap.has(f),"View does not exist, but we have a tag");const g=Iu();t.queryToTagMap.set(f,g),t.tagToQueryMap.set(g,f)}const d=Hs(t.pendingWriteTree_,i);let h=mu(a,e,n,d,r,l);if(!c&&!o&&!s){const f=Fo(a,e);h=h.concat(Nu(t,e,f))}return h}function Vs(t,e,n){const i=t.pendingWriteTree_,r=t.syncPointTree_.findOnPath(e,(o,a)=>{const l=G(o,e),c=ze(a,l);if(c)return c});return Ro(i,e,r,n,!0)}function jt(t,e){return Wo(e,t.syncPointTree_,null,Hs(t.pendingWriteTree_,I()))}function Wo(t,e,n,s){if(S(t.path))return Ho(t,e,n,s);{const i=e.get(I());n==null&&i!=null&&(n=ze(i,I()));let r=[];const o=C(t.path),a=t.operationForChild(o),l=e.children.get(o);if(l&&a){const c=n?n.getImmediateChild(o):null,d=xo(s,o);r=r.concat(Wo(a,l,c,d))}return i&&(r=r.concat(Gs(i,t,s,n))),r}}function Ho(t,e,n,s){const i=e.get(I());n==null&&i!=null&&(n=ze(i,I()));let r=[];return e.children.inorderTraversal((o,a)=>{const l=n?n.getImmediateChild(o):null,c=xo(s,o),d=t.operationForChild(o);d&&(r=r.concat(Ho(d,a,l,c)))}),i&&(r=r.concat(Gs(i,t,s,n))),r}function Uo(t,e){const n=e.query,s=bn(t,n);return{hashFn:()=>(ou(e)||w.EMPTY_NODE).hash(),onComplete:i=>{if(i==="ok")return s?Cu(t,n._path,s):wu(t,n._path);{const r=Ch(i,n);return ys(t,n,null,r)}}}}function bn(t,e){const n=An(e);return t.queryToTagMap.get(n)}function An(t){return t._path.toString()+"$"+t._queryIdentifier}function zs(t,e){return t.tagToQueryMap.get(e)}function Ks(t){const e=t.indexOf("$");return m(e!==-1&&e<t.length-1,"Bad queryKey."),{queryId:t.substr(e+1),path:new A(t.substr(0,e))}}function Ys(t,e,n){const s=t.syncPointTree_.get(e);m(s,"Missing sync point for query tag that we're tracking");const i=Hs(t.pendingWriteTree_,e);return Gs(s,n,i,null)}function ku(t){return t.fold((e,n,s)=>{if(n&&be(n))return[In(n)];{let i=[];return n&&(i=Lo(n)),q(s,(r,o)=>{i=i.concat(o)}),i}})}function Ct(t){return t._queryParams.loadsAllData()&&!t._queryParams.isDefault()?new(yu())(t._repo,t._path):t}function Tu(t,e){for(let n=0;n<e.length;++n){const s=e[n];if(!s._queryParams.loadsAllData()){const i=An(s),r=t.queryToTagMap.get(i);t.queryToTagMap.delete(i),t.tagToQueryMap.delete(r)}}}function Iu(){return vu++}function Nu(t,e,n){const s=e._path,i=bn(t,e),r=Uo(t,n),o=t.listenProvider_.startListening(Ct(e),i,r.hashFn,r.onComplete),a=t.syncPointTree_.subtree(s);if(i)m(!be(a.value),"If we're adding a query, it shouldn't be shadowed");else{const l=a.fold((c,d,h)=>{if(!S(c)&&d&&be(d))return[In(d).query];{let f=[];return d&&(f=f.concat(Lo(d).map(g=>g.query))),q(h,(g,_)=>{f=f.concat(_)}),f}});for(let c=0;c<l.length;++c){const d=l[c];t.listenProvider_.stopListening(Ct(d),bn(t,d))}}return o}/**
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
 */class Zs{constructor(e){this.node_=e}getImmediateChild(e){const n=this.node_.getImmediateChild(e);return new Zs(n)}node(){return this.node_}}class Qs{constructor(e,n){this.syncTree_=e,this.path_=n}getImmediateChild(e){const n=M(this.path_,e);return new Qs(this.syncTree_,n)}node(){return Vs(this.syncTree_,this.path_)}}const Au=function(t){return t=t||{},t.timestamp=t.timestamp||new Date().getTime(),t},cr=function(t,e,n){if(!t||typeof t!="object")return t;if(m(".sv"in t,"Unexpected leaf node or priority contents"),typeof t[".sv"]=="string")return Ru(t[".sv"],e,n);if(typeof t[".sv"]=="object")return xu(t[".sv"],e);m(!1,"Unexpected server value: "+JSON.stringify(t,null,2))},Ru=function(t,e,n){switch(t){case"timestamp":return n.timestamp;default:m(!1,"Unexpected server value: "+t)}},xu=function(t,e,n){t.hasOwnProperty("increment")||m(!1,"Unexpected server value: "+JSON.stringify(t,null,2));const s=t.increment;typeof s!="number"&&m(!1,"Unexpected increment value: "+s);const i=e.node();if(m(i!==null&&typeof i<"u","Expected ChildrenNode.EMPTY_NODE for nulls"),!i.isLeafNode())return s;const o=i.getValue();return typeof o!="number"?s:o+s},Pu=function(t,e,n,s){return Js(e,new Qs(n,t),s)},qo=function(t,e,n){return Js(t,new Zs(e),n)};function Js(t,e,n){const s=t.getPriority().val(),i=cr(s,e.getImmediateChild(".priority"),n);let r;if(t.isLeafNode()){const o=t,a=cr(o.getValue(),e,n);return a!==o.getValue()||i!==o.getPriority().val()?new B(a,F(i)):t}else{const o=t;return r=o,i!==o.getPriority().val()&&(r=r.updatePriority(new B(i))),o.forEachChild(O,(a,l)=>{const c=Js(l,e.getImmediateChild(a),n);c!==l&&(r=r.updateImmediateChild(a,c))}),r}}/**
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
 */class Xs{constructor(e="",n=null,s={children:{},childCount:0}){this.name=e,this.parent=n,this.node=s}}function ei(t,e){let n=e instanceof A?e:new A(e),s=t,i=C(n);for(;i!==null;){const r=Ze(s.node.children,i)||{children:{},childCount:0};s=new Xs(i,s,r),n=R(n),i=C(n)}return s}function lt(t){return t.node.value}function jo(t,e){t.node.value=e,vs(t)}function Go(t){return t.node.childCount>0}function Du(t){return lt(t)===void 0&&!Go(t)}function Rn(t,e){q(t.node.children,(n,s)=>{e(new Xs(n,t,s))})}function Vo(t,e,n,s){n&&e(t),Rn(t,i=>{Vo(i,e,!0)})}function Ou(t,e,n){let s=t.parent;for(;s!==null;){if(e(s))return!0;s=s.parent}return!1}function Gt(t){return new A(t.parent===null?t.name:Gt(t.parent)+"/"+t.name)}function vs(t){t.parent!==null&&Mu(t.parent,t.name,t)}function Mu(t,e,n){const s=Du(n),i=oe(t.node.children,e);s&&i?(delete t.node.children[e],t.node.childCount--,vs(t)):!s&&!i&&(t.node.children[e]=n.node,t.node.childCount++,vs(t))}/**
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
 */const Lu=/[\[\].#$\/\u0000-\u001F\u007F]/,Fu=/[\[\].#$\u0000-\u001F\u007F]/,zn=10*1024*1024,ti=function(t){return typeof t=="string"&&t.length!==0&&!Lu.test(t)},zo=function(t){return typeof t=="string"&&t.length!==0&&!Fu.test(t)},$u=function(t){return t&&(t=t.replace(/^\/*\.info(\/|$)/,"/")),zo(t)},Ko=function(t){return t===null||typeof t=="string"||typeof t=="number"&&!En(t)||t&&typeof t=="object"&&oe(t,".sv")},bs=function(t,e,n,s){xn(Qe(t,"value"),e,n)},xn=function(t,e,n){const s=n instanceof A?new nd(n,t):n;if(e===void 0)throw new Error(t+"contains undefined "+ke(s));if(typeof e=="function")throw new Error(t+"contains a function "+ke(s)+" with contents = "+e.toString());if(En(e))throw new Error(t+"contains "+e.toString()+" "+ke(s));if(typeof e=="string"&&e.length>zn/3&&Sn(e)>zn)throw new Error(t+"contains a string greater than "+zn+" utf8 bytes "+ke(s)+" ('"+e.substring(0,50)+"...')");if(e&&typeof e=="object"){let i=!1,r=!1;if(q(e,(o,a)=>{if(o===".value")i=!0;else if(o!==".priority"&&o!==".sv"&&(r=!0,!ti(o)))throw new Error(t+" contains an invalid key ("+o+") "+ke(s)+`.  Keys must be non-empty strings and can't contain ".", "#", "$", "/", "[", or "]"`);sd(s,o),xn(t,a,s),id(s)}),i&&r)throw new Error(t+' contains ".value" child '+ke(s)+" in addition to actual children.")}},Bu=function(t,e){let n,s;for(n=0;n<e.length;n++){s=e[n];const r=At(s);for(let o=0;o<r.length;o++)if(!(r[o]===".priority"&&o===r.length-1)){if(!ti(r[o]))throw new Error(t+"contains an invalid key ("+r[o]+") in path "+s.toString()+`. Keys must be non-empty strings and can't contain ".", "#", "$", "/", "[", or "]"`)}}e.sort(td);let i=null;for(n=0;n<e.length;n++){if(s=e[n],i!==null&&J(i,s))throw new Error(t+"contains a path "+i.toString()+" that is ancestor of another path "+s.toString());i=s}},Wu=function(t,e,n,s){const i=Qe(t,"values");if(!(e&&typeof e=="object")||Array.isArray(e))throw new Error(i+" must be an object containing the children to replace.");const r=[];q(e,(o,a)=>{const l=new A(o);if(xn(i,a,M(n,l)),Ds(l)===".priority"&&!Ko(a))throw new Error(i+"contains an invalid value for '"+l.toString()+"', which must be a valid Firebase priority (a string, finite number, server value, or null).");r.push(l)}),Bu(i,r)},Hu=function(t,e,n){if(En(e))throw new Error(Qe(t,"priority")+"is "+e.toString()+", but must be a valid Firebase priority (a string, finite number, server value, or null).");if(!Ko(e))throw new Error(Qe(t,"priority")+"must be a valid Firebase priority (a string, finite number, server value, or null).")},Yo=function(t,e,n,s){if(!zo(n))throw new Error(Qe(t,e)+'was an invalid path = "'+n+`". Paths must be non-empty strings and can't contain ".", "#", "$", "[", or "]"`)},Uu=function(t,e,n,s){n&&(n=n.replace(/^\/*\.info(\/|$)/,"/")),Yo(t,e,n)},gt=function(t,e){if(C(e)===".info")throw new Error(t+" failed = Can't modify data under /.info/")},qu=function(t,e){const n=e.path.toString();if(typeof e.repoInfo.host!="string"||e.repoInfo.host.length===0||!ti(e.repoInfo.namespace)&&e.repoInfo.host.split(":")[0]!=="localhost"||n.length!==0&&!$u(n))throw new Error(Qe(t,"url")+`must be a valid firebase URL and the path can't contain ".", "#", "$", "[", or "]".`)};/**
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
 */class ju{constructor(){this.eventLists_=[],this.recursionDepth_=0}}function ni(t,e){let n=null;for(let s=0;s<e.length;s++){const i=e[s],r=i.getPath();n!==null&&!Os(r,n.path)&&(t.eventLists_.push(n),n=null),n===null&&(n={events:[],path:r}),n.events.push(i)}n&&t.eventLists_.push(n)}function Zo(t,e,n){ni(t,n),Qo(t,s=>Os(s,e))}function fe(t,e,n){ni(t,n),Qo(t,s=>J(s,e)||J(e,s))}function Qo(t,e){t.recursionDepth_++;let n=!0;for(let s=0;s<t.eventLists_.length;s++){const i=t.eventLists_[s];if(i){const r=i.path;e(r)?(Gu(t.eventLists_[s]),t.eventLists_[s]=null):n=!1}}n&&(t.eventLists_=[]),t.recursionDepth_--}function Gu(t){for(let e=0;e<t.events.length;e++){const n=t.events[e];if(n!==null){t.events[e]=null;const s=n.getEventRunner();yt&&U("event: "+n.toString()),ot(s)}}}/**
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
 */const Vu="repo_interrupt",zu=25;class Ku{constructor(e,n,s,i){this.repoInfo_=e,this.forceRestClient_=n,this.authTokenProvider_=s,this.appCheckProvider_=i,this.dataUpdateCount=0,this.statsListener_=null,this.eventQueue_=new ju,this.nextWriteId_=1,this.interceptServerDataCallback_=null,this.onDisconnect_=fn(),this.transactionQueueTree_=new Xs,this.persistentConnection_=null,this.key=this.repoInfo_.toURLString()}toString(){return(this.repoInfo_.secure?"https://":"http://")+this.repoInfo_.host}}function Yu(t,e,n){if(t.stats_=xs(t.repoInfo_),t.forceRestClient_||Th())t.server_=new un(t.repoInfo_,(s,i,r,o)=>{hr(t,s,i,r,o)},t.authTokenProvider_,t.appCheckProvider_),setTimeout(()=>dr(t,!0),0);else{if(typeof n<"u"&&n!==null){if(typeof n!="object")throw new Error("Only objects are supported for option databaseAuthVariableOverride");try{H(n)}catch(s){throw new Error("Invalid authOverride provided: "+s)}}t.persistentConnection_=new he(t.repoInfo_,e,(s,i,r,o)=>{hr(t,s,i,r,o)},s=>{dr(t,s)},s=>{Qu(t,s)},t.authTokenProvider_,t.appCheckProvider_,n),t.server_=t.persistentConnection_}t.authTokenProvider_.addTokenChangeListener(s=>{t.server_.refreshAuthToken(s)}),t.appCheckProvider_.addTokenChangeListener(s=>{t.server_.refreshAppCheckToken(s.token)}),t.statsReporter_=xh(t.repoInfo_,()=>new Rd(t.stats_,t.server_)),t.infoData_=new kd,t.infoSyncTree_=new ar({startListening:(s,i,r,o)=>{let a=[];const l=t.infoData_.getNode(s._path);return l.isEmpty()||(a=Nn(t.infoSyncTree_,s._path,l),setTimeout(()=>{o("ok")},0)),a},stopListening:()=>{}}),ii(t,"connected",!1),t.serverSyncTree_=new ar({startListening:(s,i,r,o)=>(t.server_.listen(s,r,i,(a,l)=>{const c=o(a,l);fe(t.eventQueue_,s._path,c)}),[]),stopListening:(s,i)=>{t.server_.unlisten(s,i)}})}function Zu(t){const n=t.infoData_.getNode(new A(".info/serverTimeOffset")).val()||0;return new Date().getTime()+n}function si(t){return Au({timestamp:Zu(t)})}function hr(t,e,n,s,i){t.dataUpdateCount++;const r=new A(e);n=t.interceptServerDataCallback_?t.interceptServerDataCallback_(e,n):n;let o=[];if(i)if(s){const l=rn(n,c=>F(c));o=Eu(t.serverSyncTree_,r,l,i)}else{const l=F(n);o=Su(t.serverSyncTree_,r,l,i)}else if(s){const l=rn(n,c=>F(c));o=bu(t.serverSyncTree_,r,l)}else{const l=F(n);o=Nn(t.serverSyncTree_,r,l)}let a=r;o.length>0&&(a=Pn(t,r)),fe(t.eventQueue_,a,o)}function dr(t,e){ii(t,"connected",e),e===!1&&Xu(t)}function Qu(t,e){q(e,(n,s)=>{ii(t,n,s)})}function ii(t,e,n){const s=new A("/.info/"+e),i=F(n);t.infoData_.updateSnapshot(s,i);const r=Nn(t.infoSyncTree_,s,i);fe(t.eventQueue_,s,r)}function Jo(t){return t.nextWriteId_++}function Ju(t,e,n,s,i){ri(t,"set",{path:e.toString(),value:n,priority:s});const r=si(t),o=F(n,s),a=Vs(t.serverSyncTree_,e),l=qo(o,a,r),c=Jo(t),d=Bo(t.serverSyncTree_,e,l,c,!0);ni(t.eventQueue_,d),t.server_.put(e.toString(),o.val(!0),(f,g)=>{const _=f==="ok";_||z("set at "+e+" failed: "+f);const k=Ne(t.serverSyncTree_,c,!_);fe(t.eventQueue_,e,k),tt(t,i,f,g)});const h=sa(t,e);Pn(t,h),fe(t.eventQueue_,h,[])}function Xu(t){ri(t,"onDisconnectEvents");const e=si(t),n=fn();us(t.onDisconnect_,I(),(i,r)=>{const o=Pu(i,r,t.serverSyncTree_,e);at(n,i,o)});let s=[];us(n,I(),(i,r)=>{s=s.concat(Nn(t.serverSyncTree_,i,r));const o=sa(t,i);Pn(t,o)}),t.onDisconnect_=fn(),fe(t.eventQueue_,I(),s)}function ef(t,e,n){t.server_.onDisconnectCancel(e.toString(),(s,i)=>{s==="ok"&&ds(t.onDisconnect_,e),tt(t,n,s,i)})}function ur(t,e,n,s){const i=F(n);t.server_.onDisconnectPut(e.toString(),i.val(!0),(r,o)=>{r==="ok"&&at(t.onDisconnect_,e,i),tt(t,s,r,o)})}function tf(t,e,n,s,i){const r=F(n,s);t.server_.onDisconnectPut(e.toString(),r.val(!0),(o,a)=>{o==="ok"&&at(t.onDisconnect_,e,r),tt(t,i,o,a)})}function nf(t,e,n,s){if(ns(n)){U("onDisconnect().update() called with empty data.  Don't do anything."),tt(t,s,"ok",void 0);return}t.server_.onDisconnectMerge(e.toString(),n,(i,r)=>{i==="ok"&&q(n,(o,a)=>{const l=F(a);at(t.onDisconnect_,M(e,o),l)}),tt(t,s,i,r)})}function sf(t,e,n){let s;C(e._path)===".info"?s=lr(t.infoSyncTree_,e,n):s=lr(t.serverSyncTree_,e,n),Zo(t.eventQueue_,e._path,s)}function fr(t,e,n){let s;C(e._path)===".info"?s=ys(t.infoSyncTree_,e,n):s=ys(t.serverSyncTree_,e,n),Zo(t.eventQueue_,e._path,s)}function rf(t){t.persistentConnection_&&t.persistentConnection_.interrupt(Vu)}function ri(t,...e){let n="";t.persistentConnection_&&(n=t.persistentConnection_.id+":"),U(n,...e)}function tt(t,e,n,s){e&&ot(()=>{if(n==="ok")e(null);else{const i=(n||"error").toUpperCase();let r=i;s&&(r+=": "+s);const o=new Error(r);o.code=i,e(o)}})}function Xo(t,e,n){return Vs(t.serverSyncTree_,e,n)||w.EMPTY_NODE}function oi(t,e=t.transactionQueueTree_){if(e||Dn(t,e),lt(e)){const n=ta(t,e);m(n.length>0,"Sending zero length transaction queue"),n.every(i=>i.status===0)&&of(t,Gt(e),n)}else Go(e)&&Rn(e,n=>{oi(t,n)})}function of(t,e,n){const s=n.map(c=>c.currentWriteId),i=Xo(t,e,s);let r=i;const o=i.hash();for(let c=0;c<n.length;c++){const d=n[c];m(d.status===0,"tryToSendTransactionQueue_: items in queue should all be run."),d.status=1,d.retryCount++;const h=G(e,d.path);r=r.updateChild(h,d.currentOutputSnapshotRaw)}const a=r.val(!0),l=e;t.server_.put(l.toString(),a,c=>{ri(t,"transaction put response",{path:l.toString(),status:c});let d=[];if(c==="ok"){const h=[];for(let f=0;f<n.length;f++)n[f].status=2,d=d.concat(Ne(t.serverSyncTree_,n[f].currentWriteId)),n[f].onComplete&&h.push(()=>n[f].onComplete(null,!0,n[f].currentOutputSnapshotResolved)),n[f].unwatcher();Dn(t,ei(t.transactionQueueTree_,e)),oi(t,t.transactionQueueTree_),fe(t.eventQueue_,e,d);for(let f=0;f<h.length;f++)ot(h[f])}else{if(c==="datastale")for(let h=0;h<n.length;h++)n[h].status===3?n[h].status=4:n[h].status=0;else{z("transaction at "+l.toString()+" failed: "+c);for(let h=0;h<n.length;h++)n[h].status=4,n[h].abortReason=c}Pn(t,e)}},o)}function Pn(t,e){const n=ea(t,e),s=Gt(n),i=ta(t,n);return af(t,i,s),s}function af(t,e,n){if(e.length===0)return;const s=[];let i=[];const o=e.filter(a=>a.status===0).map(a=>a.currentWriteId);for(let a=0;a<e.length;a++){const l=e[a],c=G(n,l.path);let d=!1,h;if(m(c!==null,"rerunTransactionsUnderNode_: relativePath should not be null."),l.status===4)d=!0,h=l.abortReason,i=i.concat(Ne(t.serverSyncTree_,l.currentWriteId,!0));else if(l.status===0)if(l.retryCount>=zu)d=!0,h="maxretry",i=i.concat(Ne(t.serverSyncTree_,l.currentWriteId,!0));else{const f=Xo(t,l.path,o);l.currentInputSnapshot=f;const g=e[a].update(f.val());if(g!==void 0){xn("transaction failed: Data returned ",g,l.path);let _=F(g);typeof g=="object"&&g!=null&&oe(g,".priority")||(_=_.updatePriority(f.getPriority()));const D=l.currentWriteId,$=si(t),Y=qo(_,f,$);l.currentOutputSnapshotRaw=_,l.currentOutputSnapshotResolved=Y,l.currentWriteId=Jo(t),o.splice(o.indexOf(D),1),i=i.concat(Bo(t.serverSyncTree_,l.path,Y,l.currentWriteId,l.applyLocally)),i=i.concat(Ne(t.serverSyncTree_,D,!0))}else d=!0,h="nodata",i=i.concat(Ne(t.serverSyncTree_,l.currentWriteId,!0))}fe(t.eventQueue_,n,i),i=[],d&&(e[a].status=2,function(f){setTimeout(f,Math.floor(0))}(e[a].unwatcher),e[a].onComplete&&(h==="nodata"?s.push(()=>e[a].onComplete(null,!1,e[a].currentInputSnapshot)):s.push(()=>e[a].onComplete(new Error(h),!1,null))))}Dn(t,t.transactionQueueTree_);for(let a=0;a<s.length;a++)ot(s[a]);oi(t,t.transactionQueueTree_)}function ea(t,e){let n,s=t.transactionQueueTree_;for(n=C(e);n!==null&&lt(s)===void 0;)s=ei(s,n),e=R(e),n=C(e);return s}function ta(t,e){const n=[];return na(t,e,n),n.sort((s,i)=>s.order-i.order),n}function na(t,e,n){const s=lt(e);if(s)for(let i=0;i<s.length;i++)n.push(s[i]);Rn(e,i=>{na(t,i,n)})}function Dn(t,e){const n=lt(e);if(n){let s=0;for(let i=0;i<n.length;i++)n[i].status!==2&&(n[s]=n[i],s++);n.length=s,jo(e,n.length>0?n:void 0)}Rn(e,s=>{Dn(t,s)})}function sa(t,e){const n=Gt(ea(t,e)),s=ei(t.transactionQueueTree_,e);return Ou(s,i=>{Kn(t,i)}),Kn(t,s),Vo(s,i=>{Kn(t,i)}),n}function Kn(t,e){const n=lt(e);if(n){const s=[];let i=[],r=-1;for(let o=0;o<n.length;o++)n[o].status===3||(n[o].status===1?(m(r===o-1,"All SENT items should be at beginning of queue."),r=o,n[o].status=3,n[o].abortReason="set"):(m(n[o].status===0,"Unexpected transaction status in abort"),n[o].unwatcher(),i=i.concat(Ne(t.serverSyncTree_,n[o].currentWriteId,!0)),n[o].onComplete&&s.push(n[o].onComplete.bind(null,new Error("set"),!1,null))));r===-1?jo(e,void 0):n.length=r+1,fe(t.eventQueue_,Gt(e),i);for(let o=0;o<s.length;o++)ot(s[o])}}/**
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
 */function lf(t){let e="";const n=t.split("/");for(let s=0;s<n.length;s++)if(n[s].length>0){let i=n[s];try{i=decodeURIComponent(i.replace(/\+/g," "))}catch{}e+="/"+i}return e}function cf(t){const e={};t.charAt(0)==="?"&&(t=t.substring(1));for(const n of t.split("&")){if(n.length===0)continue;const s=n.split("=");s.length===2?e[decodeURIComponent(s[0])]=decodeURIComponent(s[1]):z(`Invalid query segment '${n}' in query '${t}'`)}return e}const pr=function(t,e){const n=hf(t),s=n.namespace;n.domain==="firebase.com"&&ue(n.host+" is no longer supported. Please use <YOUR FIREBASE>.firebaseio.com instead"),(!s||s==="undefined")&&n.domain!=="localhost"&&ue("Cannot parse Firebase url. Please use https://<YOUR FIREBASE>.firebaseio.com"),n.secure||_h();const i=n.scheme==="ws"||n.scheme==="wss";return{repoInfo:new lo(n.host,n.secure,s,i,e,"",s!==n.subdomain),path:new A(n.pathString)}},hf=function(t){let e="",n="",s="",i="",r="",o=!0,a="https",l=443;if(typeof t=="string"){let c=t.indexOf("//");c>=0&&(a=t.substring(0,c-1),t=t.substring(c+2));let d=t.indexOf("/");d===-1&&(d=t.length);let h=t.indexOf("?");h===-1&&(h=t.length),e=t.substring(0,Math.min(d,h)),d<h&&(i=lf(t.substring(d,h)));const f=cf(t.substring(Math.min(t.length,h)));c=e.indexOf(":"),c>=0?(o=a==="https"||a==="wss",l=parseInt(e.substring(c+1),10)):c=e.length;const g=e.slice(0,c);if(g.toLowerCase()==="localhost")n="localhost";else if(g.split(".").length<=2)n=g;else{const _=e.indexOf(".");s=e.substring(0,_).toLowerCase(),n=e.substring(_+1),r=s}"ns"in f&&(r=f.ns)}return{host:e,port:l,domain:n,subdomain:s,secure:o,scheme:a,pathString:i,namespace:r}};/**
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
 */class ia{constructor(e,n,s,i){this.eventType=e,this.eventRegistration=n,this.snapshot=s,this.prevName=i}getPath(){const e=this.snapshot.ref;return this.eventType==="value"?e._path:e.parent._path}getEventType(){return this.eventType}getEventRunner(){return this.eventRegistration.getEventRunner(this)}toString(){return this.getPath().toString()+":"+this.eventType+":"+H(this.snapshot.exportVal())}}class ra{constructor(e,n,s){this.eventRegistration=e,this.error=n,this.path=s}getPath(){return this.path}getEventType(){return"cancel"}getEventRunner(){return this.eventRegistration.getEventRunner(this)}toString(){return this.path.toString()+":cancel"}}/**
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
 */class df{constructor(e,n){this.snapshotCallback=e,this.cancelCallback=n}onValue(e,n){this.snapshotCallback.call(null,e,n)}onCancel(e){return m(this.hasCancelCallback,"Raising a cancel event on a listener with no cancel callback"),this.cancelCallback.call(null,e)}get hasCancelCallback(){return!!this.cancelCallback}matches(e){return this.snapshotCallback===e.snapshotCallback||this.snapshotCallback.userCallback!==void 0&&this.snapshotCallback.userCallback===e.snapshotCallback.userCallback&&this.snapshotCallback.context===e.snapshotCallback.context}}/**
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
 */class uf{constructor(e,n){this._repo=e,this._path=n}cancel(){const e=new le;return ef(this._repo,this._path,e.wrapCallback(()=>{})),e.promise}remove(){gt("OnDisconnect.remove",this._path);const e=new le;return ur(this._repo,this._path,null,e.wrapCallback(()=>{})),e.promise}set(e){gt("OnDisconnect.set",this._path),bs("OnDisconnect.set",e,this._path);const n=new le;return ur(this._repo,this._path,e,n.wrapCallback(()=>{})),n.promise}setWithPriority(e,n){gt("OnDisconnect.setWithPriority",this._path),bs("OnDisconnect.setWithPriority",e,this._path),Hu("OnDisconnect.setWithPriority",n);const s=new le;return tf(this._repo,this._path,e,n,s.wrapCallback(()=>{})),s.promise}update(e){gt("OnDisconnect.update",this._path),Wu("OnDisconnect.update",e,this._path);const n=new le;return nf(this._repo,this._path,e,n.wrapCallback(()=>{})),n.promise}}/**
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
 */class ai{constructor(e,n,s,i){this._repo=e,this._path=n,this._queryParams=s,this._orderByCalled=i}get key(){return S(this._path)?null:Ds(this._path)}get ref(){return new pe(this._repo,this._path)}get _queryIdentifier(){const e=Zi(this._queryParams),n=As(e);return n==="{}"?"default":n}get _queryObject(){return Zi(this._queryParams)}isEqual(e){if(e=rt(e),!(e instanceof ai))return!1;const n=this._repo===e._repo,s=Os(this._path,e._path),i=this._queryIdentifier===e._queryIdentifier;return n&&s&&i}toJSON(){return this.toString()}toString(){return this._repo.toString()+ed(this._path)}}class pe extends ai{constructor(e,n){super(e,n,new $s,!1)}get parent(){const e=yo(this._path);return e===null?null:new pe(this._repo,e)}get root(){let e=this;for(;e.parent!==null;)e=e.parent;return e}}class Mt{constructor(e,n,s){this._node=e,this.ref=n,this._index=s}get priority(){return this._node.getPriority().val()}get key(){return this.ref.key}get size(){return this._node.numChildren()}child(e){const n=new A(e),s=wn(this.ref,e);return new Mt(this._node.getChild(n),s,O)}exists(){return!this._node.isEmpty()}exportVal(){return this._node.val(!0)}forEach(e){return this._node.isLeafNode()?!1:!!this._node.forEachChild(this._index,(s,i)=>e(new Mt(i,wn(this.ref,s),O)))}hasChild(e){const n=new A(e);return!this._node.getChild(n).isEmpty()}hasChildren(){return this._node.isLeafNode()?!1:!this._node.isEmpty()}toJSON(){return this.exportVal()}val(){return this._node.val()}}function Te(t,e){return t=rt(t),t._checkNotDeleted("ref"),e!==void 0?wn(t._root,e):t._root}function wn(t,e){return t=rt(t),C(t._path)===null?Uu("child","path",e):Yo("child","path",e),new pe(t._repo,M(t._path,e))}function ff(t){return t=rt(t),new uf(t._repo,t._path)}function oa(t,e){t=rt(t),gt("set",t._path),bs("set",e,t._path);const n=new le;return Ju(t._repo,t._path,e,null,n.wrapCallback(()=>{})),n.promise}class li{constructor(e){this.callbackContext=e}respondsTo(e){return e==="value"}createEvent(e,n){const s=n._queryParams.getIndex();return new ia("value",this,new Mt(e.snapshotNode,new pe(n._repo,n._path),s))}getEventRunner(e){return e.getEventType()==="cancel"?()=>this.callbackContext.onCancel(e.error):()=>this.callbackContext.onValue(e.snapshot,null)}createCancelEvent(e,n){return this.callbackContext.hasCancelCallback?new ra(this,e,n):null}matches(e){return e instanceof li?!e.callbackContext||!this.callbackContext?!0:e.callbackContext.matches(this.callbackContext):!1}hasAnyCallback(){return this.callbackContext!==null}}class ci{constructor(e,n){this.eventType=e,this.callbackContext=n}respondsTo(e){let n=e==="children_added"?"child_added":e;return n=n==="children_removed"?"child_removed":n,this.eventType===n}createCancelEvent(e,n){return this.callbackContext.hasCancelCallback?new ra(this,e,n):null}createEvent(e,n){m(e.childName!=null,"Child events should have a childName.");const s=wn(new pe(n._repo,n._path),e.childName),i=n._queryParams.getIndex();return new ia(e.type,this,new Mt(e.snapshotNode,s,i),e.prevName)}getEventRunner(e){return e.getEventType()==="cancel"?()=>this.callbackContext.onCancel(e.error):()=>this.callbackContext.onValue(e.snapshot,e.prevName)}matches(e){return e instanceof ci?this.eventType===e.eventType&&(!this.callbackContext||!e.callbackContext||this.callbackContext.matches(e.callbackContext)):!1}hasAnyCallback(){return!!this.callbackContext}}function On(t,e,n,s,i){let r;if(typeof s=="object"&&(r=void 0,i=s),typeof s=="function"&&(r=s),i&&i.onlyOnce){const l=n,c=(d,h)=>{fr(t._repo,t,a),l(d,h)};c.userCallback=n.userCallback,c.context=n.context,n=c}const o=new df(n,r||void 0),a=e==="value"?new li(o):new ci(e,o);return sf(t._repo,t,a),()=>fr(t._repo,t,a)}function pf(t,e,n,s){return On(t,"value",e,n,s)}function mr(t,e,n,s){return On(t,"child_added",e,n,s)}function mf(t,e,n,s){return On(t,"child_changed",e,n,s)}function gf(t,e,n,s){return On(t,"child_removed",e,n,s)}du(pe);_u(pe);/**
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
 */const _f="FIREBASE_DATABASE_EMULATOR_HOST",ws={};let yf=!1;function vf(t,e,n,s){const i=e.lastIndexOf(":"),r=e.substring(0,i),o=Hr(r);t.repoInfo_=new lo(e,o,t.repoInfo_.namespace,t.repoInfo_.webSocketOnly,t.repoInfo_.nodeAdmin,t.repoInfo_.persistenceKey,t.repoInfo_.includeNamespaceInQueryParams,!0,n),s&&(t.authTokenProvider_=s)}function bf(t,e,n,s,i){let r=s||t.options.databaseURL;r===void 0&&(t.options.projectId||ue("Can't determine Firebase Database URL. Be sure to include  a Project ID when calling firebase.initializeApp()."),U("Using default host for project ",t.options.projectId),r=`${t.options.projectId}-default-rtdb.firebaseio.com`);let o=pr(r,i),a=o.repoInfo,l;typeof process<"u"&&Pi&&(l=Pi[_f]),l?(r=`http://${l}?ns=${a.namespace}`,o=pr(r,i),a=o.repoInfo):o.repoInfo.secure;const c=new Nh(t.name,t.options,e);qu("Invalid Firebase Database URL",o),S(o.path)||ue("Database URL must point to the root of a Firebase Database (not including a child path).");const d=Cf(a,t,c,new Ih(t,n));return new Sf(d,t)}function wf(t,e){const n=ws[e];(!n||n[t.key]!==t)&&ue(`Database ${e}(${t.repoInfo_}) has already been deleted.`),rf(t),delete n[t.key]}function Cf(t,e,n,s){let i=ws[e.name];i||(i={},ws[e.name]=i);let r=i[t.toURLString()];return r&&ue("Database initialized multiple times. Please make sure the format of the database URL matches with each database() call."),r=new Ku(t,yf,n,s),i[t.toURLString()]=r,r}class Sf{constructor(e,n){this._repoInternal=e,this.app=n,this.type="database",this._instanceStarted=!1}get _repo(){return this._instanceStarted||(Yu(this._repoInternal,this.app.options.appId,this.app.options.databaseAuthVariableOverride),this._instanceStarted=!0),this._repoInternal}get _root(){return this._rootInternal||(this._rootInternal=new pe(this._repo,I())),this._rootInternal}_delete(){return this._rootInternal!==null&&(wf(this._repo,this.app.name),this._repoInternal=null,this._rootInternal=null),Promise.resolve()}_checkNotDeleted(e){this._rootInternal===null&&ue("Cannot call "+e+" on a deleted database.")}}function Ef(t=Jc(),e){const n=zc(t,"database").getImmediate({identifier:e});if(!n._instanceStarted){const s=Ml("database");s&&kf(n,...s)}return n}function kf(t,e,n,s={}){t=rt(t),t._checkNotDeleted("useEmulator");const i=`${e}:${n}`,r=t._repoInternal;if(t._instanceStarted){if(i===t._repoInternal.repoInfo_.host&&on(s,r.repoInfo_.emulatorOptions))return;ue("connectDatabaseEmulator() cannot initialize or alter the emulator configuration after the database instance has started.")}let o;if(r.repoInfo_.nodeAdmin)s.mockUserToken&&ue('mockUserToken is not supported by the Admin SDK. For client access with mock users, please use the "firebase" package instead of "firebase-admin".'),o=new en(en.OWNER);else if(s.mockUserToken){const a=typeof s.mockUserToken=="string"?s.mockUserToken:Ll(s.mockUserToken,t.app.options.projectId);o=new en(a)}Hr(e)&&Zl(e),vf(r,i,s,o)}/**
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
 */function Tf(t){dh(Qc),ln(new Tt("database",(e,{instanceIdentifier:n})=>{const s=e.getProvider("app").getImmediate(),i=e.getProvider("auth-internal"),r=e.getProvider("app-check-internal");return bf(s,i,r,n)},"PUBLIC").setMultipleInstances(!0)),je(Di,Oi,t),je(Di,Oi,"esm2020")}he.prototype.simpleListen=function(t,e){this.sendRequest("q",{p:t},e)};he.prototype.echo=function(t,e){this.sendRequest("echo",{d:t},e)};Tf();const Oe=!!(es.apiKey&&es.databaseURL);let te=null;if(Oe){const t=Gr(es);te=Ef(t)}const Cn="matrix-rpg-characters-v1",hi=["home","learn","jack-in"],di=["identity","abilities","skills","loadout","notes","comms"],If=["Common Sense","Focus","Agility","Strength","Endurance","CyberZen"],Nf=["None","Light","Moderate","Serious","Critical","Incapacitated","Dead"],Af=["RSI Hacker","Operator","Pilot","Captain","Crew","Nomad","Surface Human"],Rf=["None","Temporary","Permanent"],Cs="matrix-rpg-opensea-key-v1",aa=[{slug:"the-matrix-avatars-red-polygon",chain:"polygon",filter:"red",label:"Red Pill"},{slug:"the-matrix-avatars-blue-polygon",chain:"polygon",filter:"blue",label:"Blue Pill"},{slug:"the-matrix-avatars",chain:"ethereum",filter:"base",label:"Base Avatar"}],xf={"0xc37d61ad831dbc979469dc48a7f55141e2e27f03":"red","0xcc16d5f112d2d6b7d4572eb191a59f22aaf87d02":"blue","0x495f947276749ce646f68ac8c248420045cb7b5e":"base"},la="matrix-rpg-nft-bookmarks-v1",ui="matrix-rpg-messages-v1";function Ss(){return localStorage.getItem(Cs)||""}function gr(t){t?localStorage.setItem(Cs,t):localStorage.removeItem(Cs)}function Pf(){try{return JSON.parse(localStorage.getItem(la)||"[]")}catch{return[]}}function Df(){localStorage.setItem(la,JSON.stringify(u.nftBookmarks))}function ca(){try{return JSON.parse(localStorage.getItem(ui)||"[]")}catch{return[]}}function Lt(){localStorage.setItem(ui,JSON.stringify(u.messages)),Of()}function Of(){let t=!1;u.characters=u.characters.map(e=>{const n=e.homeShip||"",s=u.messages.filter(o=>(o.shipName||"")!==n?!1:e.role==="Operator"?!0:o.to==="__all__"||o.to===e.id||o.fromCharId===e.id),i=e.messageLog||[],r=s.filter(o=>!i.find(a=>a.id===o.id));return r.length?(t=!0,{...e,messageLog:[...i,...r]}):e}),t&&Ue(u.characters)}function nt(t){return`${t.contract||""}:${t.identifier}`}function Mf(t){return u.nftBookmarks.some(e=>nt(e)===nt(t))}function ha(t){var e;return((e=u.characters.find(n=>n.id===t))==null?void 0:e.role)==="Operator"}function da(t){const e=u.characters.find(s=>s.id===t),n=(e==null?void 0:e.homeShip)||"";return ha(t)?u.messages.filter(s=>(s.to==="__operator__"||s.to===t)&&(s.shipName||"")===n):u.messages.filter(s=>(s.to==="__all__"||s.to===t)&&(s.shipName||"")===n)}function ua(t){return da(t).filter(e=>!e.readBy.includes(t)).length}function Lf(t){let e=!1;const n=ha(t);u.messages=u.messages.map(s=>(n?s.to==="__operator__"||s.to===t:s.to==="__all__"||s.to===t)&&!s.readBy.includes(t)?(e=!0,{...s,readBy:[...s.readBy,t]}):s),e&&Lt()}function _r(t,e,n,s,i=""){const r={id:`msg-${Date.now()}-${Math.random().toString(16).slice(2,6)}`,from:t,fromCharId:e,to:n,shipName:i,body:s,sentAt:new Date().toISOString(),readBy:[]};Oe&&te?(u.messages=[...u.messages,r],N(),oa(Te(te,`matrix-rpg/messages/${r.id}`),{...r,readBy:{}}).catch(o=>{console.error("Firebase write failed:",o),u.status="Transmission failed — check your connection.",N()}),Lt()):(u.messages=[...u.messages,r],Lt(),N())}function fa(t){if(!Oe||!te)return;const e={id:t.id,profileName:t.profileName||"Unknown",callSign:t.callSign||"",role:t.role||"",homeShip:t.homeShip||"",phoneOn:u.phoneOn,lastSeen:Date.now()},n=Te(te,`matrix-rpg/sessions/${t.id}`);ff(n).remove(),oa(n,e).catch(s=>{console.error("Session register failed:",s),String(s).includes("PERMISSION_DENIED")&&(u.status='Firebase rules block sessions — add "sessions" to your Realtime Database rules (see README).',N())})}function Ff(t){const e=nt(t),n=u.nftBookmarks.findIndex(s=>nt(s)===e);n>=0?u.nftBookmarks=[...u.nftBookmarks.slice(0,n),...u.nftBookmarks.slice(n+1)]:u.nftBookmarks=[...u.nftBookmarks,{...t,bookmarkedAt:new Date().toISOString()}],Df(),N()}function Ft(){return`char-${Date.now()}-${Math.random().toString(16).slice(2,8)}`}function fi(){return{id:Ft(),name:"",rating:0,attribute:"Agility",specialization:"",downloadType:"None",notes:""}}function pi(){return{id:Ft(),name:"",rating:0,notes:""}}function Ke(){return{id:Ft(),profileName:"New Redpill",callSign:"",realName:"",path:"",role:"RSI Hacker",affiliation:"Zion Resistance",homeShip:"",origin:"",redPillChoice:"Red Pill",background:"",motivation:"",appearance:"",notes:"",attributes:{commonSense:1,focus:1,agility:1,strength:1,endurance:1,cyberZen:0,giftUnlocked:!1},damage:"None",experience:0,karma:0,hardlines:1,matrixFeats:[pi()],skills:Array.from({length:6},()=>fi()),gear:{realWorld:"",matrixLoadout:"",contacts:"",vehicles:"",hardlineNotes:""},nft:{walletAddress:"",collectionNotes:""},messageLog:[],updatedAt:new Date().toISOString()}}function mi(t={}){const e=Ke();return{...e,...t,id:t.id||e.id,profileName:t.profileName||e.profileName,attributes:{...e.attributes,...t.attributes},gear:{...e.gear,...t.gear},nft:{...e.nft,...t.nft},skills:Array.isArray(t.skills)&&t.skills.length?t.skills.map(n=>({...fi(),...n,id:n.id||Ft()})):e.skills,matrixFeats:Array.isArray(t.matrixFeats)&&t.matrixFeats.length?t.matrixFeats.map(n=>({...pi(),...n,id:n.id||Ft()})):e.matrixFeats,messageLog:Array.isArray(t.messageLog)?t.messageLog:[],updatedAt:t.updatedAt||e.updatedAt}}function pa(){const t=window.location.hash.replace("#","")||"home";return hi.includes(t)?t:"home"}function ma(){try{const t=window.localStorage.getItem(Cn);if(!t){const n=Ke();return window.localStorage.setItem(Cn,JSON.stringify([n])),[n]}const e=JSON.parse(t);return!Array.isArray(e)||!e.length?[Ke()]:e.map(n=>mi(n))}catch{return[Ke()]}}function Ue(t){window.localStorage.setItem(Cn,JSON.stringify(t))}const u={characters:ma(),selectedId:null,status:"Local storage ready.",route:pa(),sheetTab:"identity",nftLoading:!1,nftItems:[],nftError:null,nftFilter:"all",nftMode:"wallet",nftContractItems:[],nftContractNext:null,nftContractAddress:"",nftBookmarks:Pf(),phoneOn:!1,messages:ca(),firebaseConnected:!1,sessionChars:{}};var br;u.selectedId=((br=u.characters[0])==null?void 0:br.id)??null;window.addEventListener("hashchange",()=>{const t=pa();t!==u.route&&(u.route=t,N())});let Yn=!1;function ft(t=!1){Yn||(Yn=!0,requestAnimationFrame(()=>{if(Yn=!1,N(),t&&u.phoneOn){const e=document.getElementById("phone-screen");e&&(e.scrollTop=e.scrollHeight)}}))}if(Oe&&te){pf(Te(te,".info/connected"),e=>{u.firebaseConnected=e.val()===!0,N()}),mr(Te(te,"matrix-rpg/messages"),e=>{const n=e.val();if(!n)return;const s=n.readBy?Object.keys(n.readBy):[],i={...n,id:e.key,readBy:s};u.messages.find(r=>r.id===i.id)||(u.messages=[...u.messages,i],Lt(),ft(u.sheetTab==="comms"))});const t=e=>{console.error("Sessions listener denied:",e),u.status='Firebase rules block sessions — add "sessions" to your Realtime Database rules (see README).',N()};mr(Te(te,"matrix-rpg/sessions"),e=>{e.key&&e.val()&&(u.sessionChars[e.key]=e.val(),ft())},t),mf(Te(te,"matrix-rpg/sessions"),e=>{e.key&&e.val()&&(u.sessionChars[e.key]=e.val(),ft())},t),gf(Te(te,"matrix-rpg/sessions"),e=>{e.key&&(delete u.sessionChars[e.key],ft())},t)}else window.addEventListener("storage",t=>{t.key===ui&&(u.messages=ca(),ft(u.sheetTab==="comms")),t.key===Cn&&(u.characters=ma(),N())});function Ae(){return u.characters.find(t=>t.id===u.selectedId)??u.characters[0]}function Se(t){u.status=t}function Yt(t,e={}){hi.includes(t)&&(u.route=t,e.sheetTab&&di.includes(e.sheetTab)&&(u.sheetTab=e.sheetTab),window.location.hash!==`#${t}`&&(window.location.hash=t),N())}function $f(t){di.includes(t)&&(u.sheetTab=t,t==="comms"&&fa(Ae()),N())}function ae(t,e=!0){u.characters=u.characters.map(n=>{if(n.id!==u.selectedId)return n;const s=t(structuredClone(n));return s.updatedAt=new Date().toISOString(),mi(s)}),Ue(u.characters),e&&N()}function ie({label:t,name:e,value:n,type:s="text",placeholder:i="",min:r=0,max:o=99}){return`
    <label class="field">
      <span>${t}</span>
      <input data-field="${e}" type="${s}" value="${y(String(n??""))}" placeholder="${y(i)}" ${s==="number"?`min="${r}" max="${o}"`:""} />
    </label>
  `}function Bf(t,e){return`
    <div class="skill-name-wrapper">
      <label class="field">
        <span>Feat Name</span>
        <input data-field="feat.name.${t}" type="text" value="${y(e)}" placeholder="Flight, Telepathy, Heal..." autocomplete="off" />
      </label>
      <div class="skill-suggestions" hidden data-feat-suggestions="${t}"></div>
    </div>
  `}function Wf(t,e){return`
    <div class="skill-name-wrapper">
      <label class="field">
        <span>Skill Name</span>
        <input data-field="skill.name.${t}" type="text" value="${y(e)}" placeholder="Martial Arts, Programming..." autocomplete="off" />
      </label>
      <div class="skill-suggestions" hidden data-skill-suggestions="${t}"></div>
    </div>
  `}function Zt({label:t,name:e,value:n,placeholder:s=""}){return`
    <div class="skill-name-wrapper">
      <label class="field">
        <span>${t}</span>
        <input data-field="${e}" type="text" value="${y(n)}" placeholder="${y(s)}" autocomplete="off" />
      </label>
      <div class="skill-suggestions" hidden data-simple-suggestions="${e}"></div>
    </div>
  `}function Qt({label:t,name:e,value:n,placeholder:s="",rows:i=4}){const r=e.split(".").pop();return`
    <div class="gear-picker-wrapper">
      <label class="field field-textarea">
        <span>${t}</span>
        <textarea data-field="${e}" rows="${i}" placeholder="${y(s)}">${y(n??"")}</textarea>
      </label>
      <div class="gear-picker-bar">
        <button class="gear-add-btn" type="button" data-gear-add="${r}">+ Add from list</button>
        <div class="skill-suggestions" hidden data-gear-panel="${r}"></div>
      </div>
    </div>
  `}function Me({label:t,name:e,value:n,placeholder:s="",rows:i=4}){return`
    <label class="field field-textarea">
      <span>${t}</span>
      <textarea data-field="${e}" rows="${i}" placeholder="${y(s)}">${y(n??"")}</textarea>
    </label>
  `}function $t({label:t,name:e,value:n,options:s}){return`
    <label class="field">
      <span>${t}</span>
      <select data-field="${e}">
        ${s.map(i=>`<option value="${y(i)}" ${i===n?"selected":""}>${y(i)}</option>`).join("")}
      </select>
    </label>
  `}function y(t){return String(t).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;")}function Hf(t){const n=(Number(t.attributes.cyberZen)||0)*3,s=Math.floor(n/3),i=n-s,r=t.skills.filter(a=>a.downloadType==="Permanent").length,o=t.skills.filter(a=>a.downloadType==="Temporary").length;return{maxSlots:n,permanentSlots:s,temporarySlots:i,permanentUsed:r,temporaryUsed:o}}function Uf(t){const e=new Blob([JSON.stringify(t,null,2)],{type:"application/json"}),n=URL.createObjectURL(e),s=document.createElement("a");s.href=n,s.download=`${(t.profileName||"matrix-character").replace(/\s+/g,"-").toLowerCase()}.json`,s.click(),URL.revokeObjectURL(n)}function qf(){return hi.map(t=>{const e=t==="jack-in"?"Jack In":t[0].toUpperCase()+t.slice(1);return`<button class="route-link ${u.route===t?"is-active":""}" data-route="${t}">${e}</button>`}).join("")}function jf(t){return`
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
  `}function Gf(){return`
    <section class="view-heading">
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
  `}function Vf(t){return`
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
  `}function zf(){const t=Ae(),e=ua(t.id),n={identity:"Identity",abilities:"Abilities",skills:"Skills",loadout:"Loadout",notes:"Notes",comms:`Comms${!u.phoneOn&&e>0?` <span class="tab-badge">${e}</span>`:""}`};return di.map(s=>`<button class="sheet-tab ${u.sheetTab===s?"is-active":""}" data-sheet-tab="${s}">${n[s]}</button>`).join("")}function Kf(t){return`
    <section class="sheet-card sheet-card-wide">
      <h3>Identity</h3>
      <div class="field-grid two-up">
        ${ie({label:"Profile Name",name:"profileName",value:t.profileName,placeholder:"Neo, Switch, Ghost..."})}
        ${ie({label:"Call Sign",name:"callSign",value:t.callSign,placeholder:"Operator tag or street handle"})}
        ${ie({label:"Real Name",name:"realName",value:t.realName})}
        ${Zt({label:"Path",name:"path",value:t.path,placeholder:"RSI Hacker, Mercenary, Punksmith..."})}
        ${$t({label:"Role",name:"role",value:t.role,options:Af})}
        ${Zt({label:"Affiliation",name:"affiliation",value:t.affiliation,placeholder:"Zion Resistance, Crystal Shard..."})}
        ${Zt({label:"Hovership / Crew",name:"homeShip",value:t.homeShip,placeholder:"Speeder Hovercraft, Nomad Hovercraft..."})}
        ${Zt({label:"Origin",name:"origin",value:t.origin,placeholder:"Pod-born, Surface-born, Freeborn..."})}
        ${$t({label:"Choice",name:"redPillChoice",value:t.redPillChoice,options:["Red Pill","Blue Pill","Still Deciding"]})}
        ${ie({label:"Motivation",name:"motivation",value:t.motivation,placeholder:"Why do they keep fighting?"})}
      </div>
      <div class="field-grid">
        ${Me({label:"Background",name:"background",value:t.background,rows:5,placeholder:"How did this character end up here?"})}
        ${Me({label:"Appearance / RSI Notes",name:"appearance",value:t.appearance,rows:4,placeholder:"Residual self image, style, tells..."})}
      </div>
    </section>
  `}function Yf(t,e){return`
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
        ${[["commonSense","Common Sense"],["focus","Focus"],["agility","Agility"],["strength","Strength"],["endurance","Endurance"],["cyberZen","CyberZen"]].map(([n,s])=>`
              <label class="attribute-tile">
                <span>${s}</span>
                <input data-attribute="${n}" type="number" min="0" max="6" value="${t.attributes[n]}" />
              </label>
            `).join("")}
      </div>

      <div class="field-grid four-up compact-grid">
        ${$t({label:"Damage",name:"damage",value:t.damage,options:Nf})}
        ${ie({label:"Experience",name:"experience",value:t.experience,type:"number",min:0,max:999})}
        ${ie({label:"Karma",name:"karma",value:t.karma,type:"number",min:0,max:999})}
        ${ie({label:"Secured Hardlines",name:"hardlines",value:t.hardlines,type:"number",min:0,max:20})}
      </div>

      <label class="toggle-row">
        <input data-attribute-toggle="giftUnlocked" type="checkbox" ${t.attributes.giftUnlocked?"checked":""} />
        <span>The Gift is unlocked</span>
      </label>
    </section>
  `}function Zf(t){return`
    <section class="sheet-card sheet-card-wide">
      <div class="section-heading-with-action">
        <h3>Skills</h3>
        <button class="ghost-button" data-action="add-skill">Add Skill</button>
      </div>
      <div class="repeatable-list">
        ${t.skills.map((e,n)=>{var i;const s=((i=Xt.find(r=>r.name===e.name))==null?void 0:i.description)??"";return`
              <article class="repeatable-card">
                <div class="repeatable-head">
                  <strong>Skill ${n+1}</strong>
                  <button class="mini-button" data-remove-skill="${e.id}">Remove</button>
                </div>
                <div class="field-grid four-up compact-grid">
                  ${Wf(e.id,e.name)}
                  ${ie({label:"Rating",name:`skill.rating.${e.id}`,value:e.rating,type:"number",min:0,max:6})}
                  ${$t({label:"Default Attribute",name:`skill.attribute.${e.id}`,value:e.attribute,options:If})}
                  ${ie({label:"Specialization",name:`skill.specialization.${e.id}`,value:e.specialization,placeholder:"Aikido, Handguns, Stealth..."})}
                  ${$t({label:"Download Type",name:`skill.downloadType.${e.id}`,value:e.downloadType,options:Rf})}
                </div>
                <p class="skill-description" data-skill-description="${e.id}"${s?"":" hidden"}>${y(s)}</p>
                ${Me({label:"Skill Notes",name:`skill.notes.${e.id}`,value:e.notes,rows:2,placeholder:"Table reminders or source of training"})}
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
        ${t.matrixFeats.map((e,n)=>{const s=mt.find(r=>r.name===e.name),i=s?`<strong>Rule Bender:</strong> ${y(s.ruleBender)}<br><strong>Rule Breaker:</strong> ${y(s.ruleBreaker)}`:"";return`
              <article class="repeatable-card">
                <div class="repeatable-head">
                  <strong>Feat ${n+1}</strong>
                  <button class="mini-button" data-remove-feat="${e.id}">Remove</button>
                </div>
                <div class="field-grid two-up compact-grid">
                  ${Bf(e.id,e.name)}
                  ${ie({label:"Rating",name:`feat.rating.${e.id}`,value:e.rating,type:"number",min:0,max:6})}
                </div>
                <div class="skill-description" data-feat-description="${e.id}"${s?"":" hidden"}>${i}</div>
                ${Me({label:"Feat Notes",name:`feat.notes.${e.id}`,value:e.notes,rows:2,placeholder:"Rule-bending or rule-breaking effects"})}
              </article>
            `}).join("")}
      </div>
    </section>
  `}function Qf(t){return`
    <section class="sheet-card sheet-card-wide">
      <h3>Loadout And Contacts</h3>
      <div class="field-grid two-up">
        ${Qt({label:"Real World Gear",name:"gear.realWorld",value:t.gear.realWorld,rows:4,placeholder:"Weapons, medkits, tools, hovercraft assets..."})}
        ${Qt({label:"Matrix Loadout",name:"gear.matrixLoadout",value:t.gear.matrixLoadout,rows:4,placeholder:"Downloaded weapons, fake IDs, clothes, vehicles..."})}
        ${Qt({label:"Contacts",name:"gear.contacts",value:t.gear.contacts,rows:3,placeholder:"Fixers, captains, operators, informants..."})}
        ${Qt({label:"Vehicles / Frames",name:"gear.vehicles",value:t.gear.vehicles,rows:3,placeholder:"Hovercraft, bikes, APCs, sentinels..."})}
      </div>
      ${Me({label:"Hardline Notes",name:"gear.hardlineNotes",value:t.gear.hardlineNotes,rows:4,placeholder:"Exit points, backups, dangerous zones..."})}
    </section>
  `}function Jf(t){return`
    <section class="sheet-card sheet-card-wide">
      <h3>Campaign Notes</h3>
      ${Me({label:"Session Notes",name:"notes",value:t.notes,rows:7,placeholder:"Mission goals, betrayals, unresolved hooks..."})}
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
          ${ie({label:"Wallet Address",name:"nft.walletAddress",value:t.nft.walletAddress,placeholder:"0x..."})}
          <label class="field">
            <span>OpenSea API Key</span>
            <input id="nft-api-key" type="password" value="${y(Ss())}" placeholder="Free key at opensea.io/developers" autocomplete="off" />
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
            <input id="nft-api-key" type="password" value="${y(Ss())}" placeholder="Free key at opensea.io/developers" autocomplete="off" />
          </label>
        </div>
        <div class="nft-controls-row">
          <button class="solid-button" data-action="browse-contract"${u.nftLoading?" disabled":""}>
            ${u.nftLoading?"Loading…":"Browse Contract"}
          </button>
        </div>
      `:""}

      ${lp()}

      ${Me({label:"Collection Notes",name:"nft.collectionNotes",value:t.nft.collectionNotes,rows:3,placeholder:"Token IDs, display preferences, trades..."})}
    </section>
  `}function Xf(t,e){return u.sheetTab==="identity"?Kf(t):u.sheetTab==="abilities"?Yf(t,e):u.sheetTab==="skills"?Zf(t):u.sheetTab==="loadout"?Qf(t):u.sheetTab==="comms"?_p(t):Jf(t)}function ep(t,e){return`
    <section class="builder-hero">
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
      ${Vf(t)}

      <section class="sheet-panel">
        <div class="sheet-toolbar">
          <div class="sheet-tab-bar">${zf()}</div>
          <p class="status-line">${y(u.status)}</p>
        </div>
        ${Xf(t,e)}
      </section>
    </section>
  `}function Jt(t,e){var o;const n=(o=t.closest(".skill-name-wrapper"))==null?void 0:o.querySelector(".skill-suggestions");if(!n)return;const s=a=>`<button class="skill-suggestion" data-suggest-value="${y(a)}">
      <span class="skill-suggestion-name">${y(a)}</span>
    </button>`,i=()=>{const a=[];for(const l of e)a.push(`<div class="skill-suggestion-header">${y(l.category)}</div>`),l.items.forEach(c=>a.push(s(c)));n.innerHTML=a.join(""),n.hidden=!1},r=a=>{if(!a){i();return}const l=a.toLowerCase(),d=e.flatMap(h=>[...h.items]).filter(h=>h.toLowerCase().includes(l)).slice(0,14);if(d.length===0){n.hidden=!0;return}n.innerHTML=d.map(s).join(""),n.hidden=!1};t.addEventListener("input",()=>r(t.value.trim())),t.addEventListener("focus",()=>r(t.value.trim())),t.addEventListener("blur",()=>{n.hidden=!0}),t.addEventListener("keydown",a=>{a.key==="Escape"&&(n.hidden=!0)}),n.addEventListener("mousedown",a=>{const l=a.target.closest(".skill-suggestion");l&&(a.preventDefault(),t.value=l.dataset.suggestValue,st(t),n.hidden=!0)})}function tp(t,e,n){const s=t.dataset.gearAdd,i=t.parentElement,r=i==null?void 0:i.querySelector(`[data-gear-panel="${s}"]`);if(!r||!i)return;const o=l=>`<button class="skill-suggestion" data-gear-item="${y(l)}">
      <span class="skill-suggestion-name">${y(l)}</span>
    </button>`,a=()=>{const l=[];for(const c of n)l.push(`<div class="skill-suggestion-header">${y(c.category)}</div>`),c.items.forEach(d=>l.push(o(d)));r.innerHTML=l.join("")};t.addEventListener("click",()=>{if(!r.hidden){r.hidden=!0;return}a(),r.hidden=!1}),t.addEventListener("blur",()=>{r.hidden=!0}),r.addEventListener("mousedown",l=>{const c=l.target.closest(".skill-suggestion");if(!c)return;l.preventDefault();const d=c.dataset.gearItem,h=e.value;e.value=h?`${h}
${d}`:d,st(e),r.hidden=!0,t.focus()})}function np(t,e){var a;const n=(a=t.closest(".skill-name-wrapper"))==null?void 0:a.querySelector("[data-skill-suggestions]");if(!n)return;const s=document.querySelector(`[data-skill-description="${e}"]`),i=l=>`<button class="skill-suggestion"
      data-skill-name="${y(l.name)}"
      data-skill-attr="${y(l.attribute)}"
      data-skill-desc="${y(l.description)}">
      <span class="skill-suggestion-name">${y(l.name)}</span>
      <span class="skill-suggestion-meta">${y(l.attribute)} · ${y(l.category)}</span>
    </button>`,r=()=>{const l=[];for(const c of gl){const d=Xt.filter(h=>h.category===c);d.length!==0&&(l.push(`<div class="skill-suggestion-header">${y(c)}</div>`),d.forEach(h=>l.push(i(h))))}n.innerHTML=l.join(""),n.hidden=!1},o=l=>{if(!l){r();return}const c=l.toLowerCase(),d=Xt.filter(f=>f.name.toLowerCase().includes(c)||f.category.toLowerCase().includes(c)).slice(0,12);if(d.length===0){n.hidden=!0;return}const h=Xt.find(f=>f.name.toLowerCase()===c);h&&s&&(s.textContent=h.description,s.hidden=!1),n.innerHTML=d.map(i).join(""),n.hidden=!1};t.addEventListener("input",()=>o(t.value.trim())),t.addEventListener("focus",()=>o(t.value.trim())),t.addEventListener("blur",()=>{n.hidden=!0}),t.addEventListener("keydown",l=>{l.key==="Escape"&&(n.hidden=!0)}),n.addEventListener("mousedown",l=>{const c=l.target.closest(".skill-suggestion");if(!c)return;l.preventDefault(),t.value=c.dataset.skillName,st(t);const d=document.querySelector(`[data-field="skill.attribute.${e}"]`);d&&c.dataset.skillAttr&&(d.value=c.dataset.skillAttr,st(d)),s&&c.dataset.skillDesc&&(s.textContent=c.dataset.skillDesc,s.hidden=!1),n.hidden=!0})}function sp(t,e){var l;const n=(l=t.closest(".skill-name-wrapper"))==null?void 0:l.querySelector("[data-feat-suggestions]");if(!n)return;const s=document.querySelector(`[data-feat-description="${e}"]`),i=c=>`<button class="skill-suggestion" data-feat-name="${y(c.name)}">
      <span class="skill-suggestion-name">${y(c.name)}</span>
      <span class="skill-suggestion-meta">CyberZen</span>
    </button>`,r=c=>{s&&(s.innerHTML=`<strong>Rule Bender:</strong> ${y(c.ruleBender)}<br><strong>Rule Breaker:</strong> ${y(c.ruleBreaker)}`,s.hidden=!1)},o=()=>{n.innerHTML='<div class="skill-suggestion-header">Matrix Feats</div>'+mt.map(i).join(""),n.hidden=!1},a=c=>{if(!c){o();return}const d=c.toLowerCase(),h=mt.filter(g=>g.name.toLowerCase().includes(d)).slice(0,12);if(h.length===0){n.hidden=!0;return}const f=mt.find(g=>g.name.toLowerCase()===d);f&&r(f),n.innerHTML=h.map(i).join(""),n.hidden=!1};t.addEventListener("input",()=>a(t.value.trim())),t.addEventListener("focus",()=>a(t.value.trim())),t.addEventListener("blur",()=>{n.hidden=!0}),t.addEventListener("keydown",c=>{c.key==="Escape"&&(n.hidden=!0)}),n.addEventListener("mousedown",c=>{const d=c.target.closest(".skill-suggestion");if(!d)return;c.preventDefault();const h=d.dataset.featName;t.value=h,st(t);const f=mt.find(g=>g.name===h);f&&r(f),n.hidden=!0})}async function ip(t,e){u.nftLoading=!0,u.nftError=null,u.nftItems=[],N();try{const n=aa.map(({slug:i,chain:r,filter:o})=>fetch(`https://api.opensea.io/api/v2/chain/${r}/account/${encodeURIComponent(t)}/nfts?collection=${i}&limit=50`,{headers:{"x-api-key":e,accept:"application/json"}}).then(a=>{if(a.status===401)throw new Error("Invalid API key — get a free key at opensea.io/developers");if(a.status===400)throw new Error("Invalid wallet address format");return a.ok?a.json():Promise.reject(new Error(`OpenSea error ${a.status}`))}).then(a=>(a.nfts||[]).map(l=>({...l,_filter:o}))).catch(a=>(u.nftError=a.message,[]))),s=await Promise.all(n);u.nftItems=s.flat(),u.nftItems.length===0&&!u.nftError&&(u.nftError="No Matrix Avatar NFTs found for this wallet.")}catch(n){u.nftError=(n==null?void 0:n.message)??"Failed to load. Check API key and wallet address."}u.nftLoading=!1,N()}async function yr(t,e,n){u.nftLoading=!0,u.nftError=null,n||(u.nftContractItems=[],u.nftContractNext=null),N();const s=xf[t.toLowerCase()];let i="";try{for(const c of["polygon","ethereum"])if((await fetch(`https://api.opensea.io/api/v2/chain/${c}/contract/${t}`,{headers:{"x-api-key":e,accept:"application/json"}})).ok){i=c;break}if(!i)throw new Error("Contract not found on Polygon or Ethereum.");const r=new URL(`https://api.opensea.io/api/v2/chain/${i}/contract/${t}/nfts`);r.searchParams.set("limit","50"),n&&r.searchParams.set("next",n);const o=await fetch(r.toString(),{headers:{"x-api-key":e,accept:"application/json"}});if(o.status===401)throw new Error("Invalid API key");if(!o.ok)throw new Error(`OpenSea error ${o.status}`);const a=await o.json(),l=(a.nfts||[]).map(c=>({...c,contract:t,_filter:s??"contract",_chain:i}));u.nftContractItems=n?[...u.nftContractItems,...l]:l,u.nftContractNext=a.next||null,u.nftContractAddress=t,u.nftContractItems.length===0&&(u.nftError=`No NFTs found for that contract on ${i}.`)}catch(r){u.nftError=(r==null?void 0:r.message)??"Failed to load contract NFTs."}u.nftLoading=!1,N()}function rp(t){return t==="red"?'<span class="nft-badge nft-badge-red">Red Pill</span>':t==="blue"?'<span class="nft-badge nft-badge-blue">Blue Pill</span>':t==="base"?'<span class="nft-badge nft-badge-base">Base</span>':""}function op(t){return t&&(t.includes("seadn.io")?`${t}?w=600`:t)}function Es(t){const e=y(t.name||`#${t.identifier}`),n=op(t.display_image_url||t.image_url),s=Mf(t),i=y(nt(t));return`
    <div class="nft-token-card">
      <a class="nft-token-link" href="${y(t.opensea_url||"https://opensea.io")}" target="_blank" rel="noopener noreferrer">
        <div class="nft-token-img">
          ${n?`<img src="${y(n)}" alt="${e}" loading="lazy" />`:'<span class="nft-no-img">No Image</span>'}
        </div>
      </a>
      <div class="nft-token-meta">
        <span class="nft-token-name">${e}</span>
        <div class="nft-token-foot">
          ${rp(t._filter)}
          <button class="nft-bookmark-btn${s?" is-bookmarked":""}"
            data-bookmark-key="${i}"
            title="${s?"Remove bookmark":"Bookmark"}">
            ${s?"★":"☆"}
          </button>
        </div>
      </div>
    </div>
  `}function ap(t,e){return u.nftLoading?'<div class="nft-status-msg">Fetching from OpenSea…</div>':u.nftError&&!t.length?`<div class="nft-status-msg nft-status-error">${y(u.nftError)}</div>`:t.length?`<div class="nft-token-grid">${t.map(Es).join("")}</div>`:`<div class="nft-status-msg">${y(e)}</div>`}function lp(){var e;if(u.nftMode==="bookmarks")return u.nftBookmarks.length?`<div class="nft-token-grid">${u.nftBookmarks.map(Es).join("")}</div>`:'<div class="nft-status-msg">No bookmarks yet. Browse your wallet or a contract and click ☆ to save NFTs here.</div>';if(u.nftMode==="contract"){const n=ap(u.nftContractItems,"Enter a contract address and click Browse."),s=u.nftContractNext&&!u.nftLoading?`<div class="nft-load-more-row">
           <button class="ghost-button" data-action="load-more-nfts">Load 50 more</button>
           <span class="nft-count">${u.nftContractItems.length} loaded</span>
         </div>`:u.nftContractItems.length>0?`<div class="nft-count-row"><span class="nft-count">${u.nftContractItems.length} NFTs loaded</span></div>`:"";return n+s}const t=u.nftFilter==="all"?u.nftItems:u.nftItems.filter(n=>n._filter===u.nftFilter);return u.nftLoading?'<div class="nft-status-msg">Fetching wallet NFTs from OpenSea…</div>':u.nftError&&!u.nftItems.length?`<div class="nft-status-msg nft-status-error">${y(u.nftError)}</div>`:u.nftItems.length?t.length?`<div class="nft-token-grid">${t.map(Es).join("")}</div>`:`<div class="nft-status-msg">No ${((e=aa.find(s=>s.filter===u.nftFilter))==null?void 0:e.label)??"this collection"} NFTs in this wallet.</div>`:""}function cp(t){const e=ua(t);return`
    <div class="phone-screen-off">
      <span class="phone-power-icon">⏻</span>
      <span class="phone-off-label">POWERED OFF</span>
      ${e>0?`<span class="phone-unread-badge">${e} MSG WAITING</span>`:""}
    </div>
  `}function hp(t){const e=da(t);return e.length===0?`
      <div class="phone-screen-on-empty">
        <span>NO MESSAGES</span>
        <span>STANDING BY</span>
      </div>
    `:e.map((n,s)=>{const i=new Date(n.sentAt).toLocaleTimeString("en-US",{hour:"2-digit",minute:"2-digit",hour12:!1}),r=!n.readBy.includes(t);return`${s>0?'<div class="phone-msg-divider">───────────</div>':""}
      <div class="phone-msg${r?" phone-msg-new":""}">
        <div class="phone-msg-from">FROM:${y(n.from.toUpperCase())}<span class="phone-msg-time">${i}</span></div>
        <div class="phone-msg-body">&gt;${y(n.body)}</div>
      </div>`}).join("")}const dp=[{top:"1",sub:""},{top:"2",sub:"ABC"},{top:"3",sub:"DEF"},{top:"4",sub:"GHI"},{top:"5",sub:"JKL"},{top:"6",sub:"MNO"},{top:"7",sub:"PRS"},{top:"8",sub:"TUV"},{top:"9",sub:"WXY"},{top:"*",sub:""},{top:"0",sub:"+"},{top:"#",sub:""}];function up(t){const e=u.phoneOn,n=e?hp(t.id):cp(t.id);return`
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
          ${dp.map(s=>`<button class="phone-key" tabindex="-1">${s.top}${s.sub?`<span class="phone-key-sub">${s.sub}</span>`:""}</button>`).join("")}
        </div>
        <div class="phone-bottom-row">
          <button class="phone-power-btn" data-action="phone-toggle" title="${e?"Power off":"Power on"}">⏻</button>
        </div>
      </div>
      <p class="phone-status-label">${e?"ONLINE · ZION MESH":"PRESS ⏻ TO POWER ON"}</p>
    </div>
  `}function fp(){const t=[{size:"sm",type:"orange"},{size:"sm",type:"blue"},{size:"sm",type:"green"},{size:"sm",type:"red"},{size:"sm",type:"blue"},{size:"sm",type:"green"},{size:"sm",type:"orange"},{size:"md",type:"blue"},{size:"lg",type:"green"},{size:"xl",type:"orange"},{size:"lg",type:"green"},{size:"md",type:"teal"}],e=t.slice(0,7),n=t.slice(7),s=({size:i,type:r})=>`<div class="op-mon ${i}"><div class="op-mon-screen op-scr-${r}"></div></div>`;return`
    <div class="op-rig-display" aria-hidden="true">
      <div class="op-rig-monitor-wall">
        <div class="op-rig-row">${e.map(s).join("")}</div>
        <div class="op-rig-row">${n.map(s).join("")}</div>
      </div>
    </div>
    <p class="op-rig-caption">OPERATOR STATION · ZION BROADCAST SYSTEM</p>
  `}function pp(t){const e=t.homeShip||"",n=Oe?Object.values(u.sessionChars).filter(l=>l.role!=="Operator"&&(l.homeShip||"")===e):u.characters.filter(l=>l.role!=="Operator"&&(l.homeShip||"")===e),s=y(t.callSign||t.profileName||"Operator"),i=l=>u.messages.filter(c=>c.to==="__operator__"&&c.fromCharId===l&&!c.readBy.includes(t.id)).length,r=l=>u.messages.filter(c=>(c.to===l||c.to==="__all__")&&!c.readBy.includes(l)).length,o=[...t.messageLog||[]].reverse().slice(0,30),a=e?y(e):"unassigned hovership";return`
    <div class="op-monitor">
      ${fp()}
      <div class="op-monitor-head">
        <p class="eyebrow">Operator · Mission Control</p>
        <h3>Operator's Console</h3>
        <p class="comms-phone-desc">Broadcasting on <strong>${a}</strong>. Only crew assigned to the same hovership will receive your transmissions.</p>
      </div>

      <div class="op-monitor-body">
        <div class="op-crew-panel">
          <p class="op-section-label">Crew Status</p>
          ${n.length===0?`<p class="op-no-crew">No crew on <em>${a}</em>. ${Oe?"Crew members must open their Comms tab to appear here.":"Create characters with a matching Hovership name to connect them to this console."}</p>`:n.map(l=>{const c=i(l.id),d=r(l.id),h=l.phoneOn;return`
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
              <input id="op-from" type="text" value="${s}" placeholder="Tank, Morpheus…" maxlength="24" />
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
  `}function mp(t){return`
    <div class="crew-reply-panel">
      <p class="op-section-label">Reply to Operator</p>
      <p class="comms-phone-desc">Send a message directly to your Operator. They will see it on their console.</p>
      <label class="field">
        <span>Message <span class="op-char-count" id="crew-reply-count">0 / 501</span></span>
        <textarea id="crew-reply-msg" rows="3" maxlength="501" placeholder="Operator, I'm at the hardline…"></textarea>
      </label>
      <button class="solid-button" data-action="send-crew-reply" data-char-id="${t.id}">▶ SEND TO OPERATOR</button>
    </div>
  `}function gp(t){const e=[...t.messageLog||[]].reverse().slice(0,30);return e.length?`
    <div class="op-log crew-log">
      <div class="crew-log-header">
        <p class="op-section-label">Transmission Log</p>
        <button class="ghost-button ghost-button-sm" data-action="clear-crew-log">Clear Log</button>
      </div>
      ${e.map(n=>{const s=new Date(n.sentAt).toLocaleTimeString("en-US",{hour:"2-digit",minute:"2-digit",hour12:!1}),i=n.fromCharId===t.id,r=i?"→ OPERATOR":n.to==="__all__"?"← ALL CREW":"← YOU";return`<div class="op-log-entry${i?"":" op-log-incoming"}">
          <div class="op-log-header">
            <span class="op-log-from">[${y(n.from)}]</span>
            <span class="op-log-meta">${s} ${r}</span>
          </div>
          <span class="op-log-body">${y(n.body)}</span>
        </div>`}).join("")}
    </div>
  `:""}function vr(){return Oe?u.firebaseConnected?'<div class="comms-conn-banner comms-conn-online">◉ ZION MESH ONLINE — real-time sync active</div>':'<div class="comms-conn-banner comms-conn-connecting">◎ Connecting to Zion Mesh…</div>':`<div class="comms-conn-banner comms-conn-local">
    ◌ LOCAL MODE — messages stay in this browser only.
    <a href="https://console.firebase.google.com" target="_blank" rel="noopener" class="comms-conn-link">Set up Firebase</a> and fill in <code>src/firebase-config.ts</code> to enable cross-device play.
  </div>`}function _p(t){return t.role==="Operator"?`
      <section class="sheet-card">
        ${vr()}
        ${pp(t)}
      </section>`:`
    <section class="sheet-card">
      ${vr()}
      <div class="comms-layout">
        <div class="comms-phone-col">
          <p class="eyebrow">Hardline Communications</p>
          <h3>Field Phone</h3>
          <p class="comms-phone-desc">Your connection to the Operator. Power on to receive transmissions.</p>
          ${up(t)}
        </div>
        <div class="comms-operator-col">
          ${mp(t)}
          ${gp(t)}
        </div>
      </div>
    </section>
  `}function N(){const t=Ae(),e=Hf(t);let n=jf(t),s="hero-view";u.route==="learn"&&(n=Gf(),s="learn-view"),u.route==="jack-in"&&(n=ep(t,e),s="jack-in-view"),document.querySelector("#app").innerHTML=`
    <div class="page-shell">
      <header class="site-header">
        <a href="#home" class="brand">The Unofficial Matrix RPG</a>
        <nav class="route-nav">${qf()}</nav>
      </header>
      <main class="view-shell" data-view="${s}">
        ${n}
      </main>
    </div>
  `,yp(),pl(),ml()}function yp(){var d,h,f,g,_,k,D,$,Y,Z,X,j,we,ee,Ce;document.querySelectorAll("[data-route]").forEach(p=>{p.addEventListener("click",()=>{Yt(p.dataset.route,{sheetTab:p.dataset.sheetTab})})}),document.querySelectorAll("[data-sheet-tab]").forEach(p=>{p.addEventListener("click",()=>$f(p.dataset.sheetTab))}),document.querySelectorAll("[data-character-id]").forEach(p=>{p.addEventListener("click",()=>{u.selectedId=p.dataset.characterId,Se("Character loaded from local storage."),Yt("jack-in")})}),document.querySelectorAll("[data-field]").forEach(p=>{p.addEventListener("input",b=>st(b.currentTarget))}),document.querySelectorAll("[data-attribute]").forEach(p=>{p.addEventListener("input",b=>{const v=b.currentTarget;ae(T=>(T.attributes[v.dataset.attribute]=Number(v.value)||0,T))})}),document.querySelectorAll("[data-attribute-toggle]").forEach(p=>{p.addEventListener("change",b=>{const v=b.currentTarget;ae(T=>(T.attributes[v.dataset.attributeToggle]=v.checked,T))})}),(d=document.querySelector('[data-action="new-character"]'))==null||d.addEventListener("click",()=>{const p=Ke();u.characters=[p,...u.characters],u.selectedId=p.id,Ue(u.characters),u.sheetTab="identity",Se("New blank sheet created locally."),Yt("jack-in")}),(h=document.querySelector('[data-action="save-status"]'))==null||h.addEventListener("click",()=>{Ue(u.characters),Se("All character data saved to this browser on this device."),N()}),(f=document.querySelector('[data-action="export-character"]'))==null||f.addEventListener("click",()=>{Uf(Ae()),Se("Character exported as JSON."),N()}),(g=document.querySelector('[data-action="delete-character"]'))==null||g.addEventListener("click",()=>{u.characters.length===1?(u.characters=[Ke()],u.selectedId=u.characters[0].id):(u.characters=u.characters.filter(p=>p.id!==u.selectedId),u.selectedId=u.characters[0].id),Ue(u.characters),Se("Character deleted from local storage."),N()}),(_=document.querySelector('[data-action="add-skill"]'))==null||_.addEventListener("click",()=>{ae(p=>(p.skills.push(fi()),p))}),document.querySelectorAll('input[data-field*="skill.name"]').forEach(p=>{const b=p.dataset.field.split(".")[2];np(p,b)}),document.querySelectorAll('input[data-field*="feat.name"]').forEach(p=>{const b=p.dataset.field.split(".")[2];sp(p,b)});const t=document.querySelector('[data-field="path"]');t&&Jt(t,[{category:"Paths",items:wl}]);const e=document.querySelector('[data-field="affiliation"]');e&&Jt(e,[{category:"Affiliations",items:Cl}]);const n=document.querySelector('[data-field="origin"]');n&&Jt(n,[{category:"Origins",items:Sl}]);const s=document.querySelector('[data-field="homeShip"]');s&&Jt(s,[{category:"Ship Types",items:El}]);const i={realWorld:[..._l],matrixLoadout:[...yl],vehicles:[...vl],contacts:[{category:"Contact Types",items:bl}]};document.querySelectorAll("[data-gear-add]").forEach(p=>{const b=p.dataset.gearAdd,v=p.closest(".gear-picker-wrapper"),T=v==null?void 0:v.querySelector(`[data-field="gear.${b}"]`),L=i[b];T&&L&&tp(p,T,L)}),(k=document.querySelector('[data-action="add-feat"]'))==null||k.addEventListener("click",()=>{ae(p=>(p.matrixFeats.push(pi()),p))}),document.querySelectorAll("[data-remove-skill]").forEach(p=>{p.addEventListener("click",()=>{ae(b=>(b.skills=b.skills.filter(v=>v.id!==p.dataset.removeSkill),b))})}),document.querySelectorAll("[data-remove-feat]").forEach(p=>{p.addEventListener("click",()=>{ae(b=>(b.matrixFeats=b.matrixFeats.filter(v=>v.id!==p.dataset.removeFeat),b))})}),(D=document.querySelector("#import-json"))==null||D.addEventListener("change",async p=>{var v;const b=(v=p.target.files)==null?void 0:v[0];if(b)try{const T=mi(JSON.parse(await b.text()));T.updatedAt=new Date().toISOString(),u.characters=[T,...u.characters.filter(L=>L.id!==T.id)],u.selectedId=T.id,Ue(u.characters),Se("Character imported successfully."),Yt("jack-in")}catch{Se("Import failed. Please use a valid exported JSON character file."),N()}}),document.querySelectorAll("[data-nft-filter]").forEach(p=>{p.addEventListener("click",()=>{u.nftFilter=p.dataset.nftFilter,N()})}),document.querySelectorAll("[data-nft-mode]").forEach(p=>{p.addEventListener("click",()=>{u.nftMode=p.dataset.nftMode,N()})}),($=document.querySelector('[data-action="load-nfts"]'))==null||$.addEventListener("click",async()=>{const p=document.querySelector('[data-field="nft.walletAddress"]'),b=document.getElementById("nft-api-key"),v=(p==null?void 0:p.value.trim())??"",T=(b==null?void 0:b.value.trim())??"";if(!v){u.nftError="Enter a Polygon wallet address first.",N();return}if(!T){u.nftError="Enter your OpenSea API key. Get a free one at opensea.io/developers.",N();return}gr(T),await ip(v,T)}),(Y=document.querySelector('[data-action="browse-contract"]'))==null||Y.addEventListener("click",async()=>{const p=document.getElementById("nft-contract-address"),b=document.getElementById("nft-api-key"),v=(p==null?void 0:p.value.trim())??"",T=(b==null?void 0:b.value.trim())??"";if(!v){u.nftError="Enter a contract address first.",N();return}if(!T){u.nftError="Enter your OpenSea API key. Get a free one at opensea.io/developers.",N();return}gr(T),await yr(v,T)}),(Z=document.querySelector('[data-action="load-more-nfts"]'))==null||Z.addEventListener("click",async()=>{const p=Ss();!p||!u.nftContractAddress||!u.nftContractNext||await yr(u.nftContractAddress,p,u.nftContractNext)}),document.querySelectorAll("[data-bookmark-key]").forEach(p=>{p.addEventListener("click",b=>{b.preventDefault(),b.stopPropagation();const v=p.dataset.bookmarkKey,L=[...u.nftItems,...u.nftContractItems,...u.nftBookmarks].find($e=>nt($e)===v);L&&Ff(L)})}),(X=document.querySelector('[data-action="phone-toggle"]'))==null||X.addEventListener("click",()=>{const p=Ae();if(u.phoneOn=!u.phoneOn,u.phoneOn&&Lf(p.id),fa(p),N(),u.phoneOn){const b=document.getElementById("phone-screen");b&&(b.scrollTop=b.scrollHeight)}}),(j=document.querySelector('[data-action="send-operator-message"]'))==null||j.addEventListener("click",()=>{const p=document.getElementById("op-from"),b=document.getElementById("op-recipient"),v=document.getElementById("op-message"),T=(p==null?void 0:p.value.trim())||"Operator",L=(b==null?void 0:b.value)||"__all__",$e=(v==null?void 0:v.value.trim())||"";if(!$e)return;const gi=Ae();_r(T,gi.id,L,$e,gi.homeShip||""),v&&(v.value="");const _i=document.getElementById("op-count");_i&&(_i.textContent="0 / 501")}),(we=document.querySelector('[data-action="send-crew-reply"]'))==null||we.addEventListener("click",()=>{const p=Ae(),b=document.getElementById("crew-reply-msg"),v=(b==null?void 0:b.value.trim())||"";if(!v)return;const T=p.callSign||p.profileName||"Unknown";_r(T,p.id,"__operator__",v,p.homeShip||""),b&&(b.value="");const L=document.getElementById("crew-reply-count");L&&(L.textContent="0 / 501")}),(ee=document.querySelector('[data-action="clear-message-log"]'))==null||ee.addEventListener("click",()=>{confirm("Delete all transmissions from the Operator log?")&&(u.messages=[],Lt(),ae(p=>({...p,messageLog:[]})))}),(Ce=document.querySelector('[data-action="clear-crew-log"]'))==null||Ce.addEventListener("click",()=>{confirm("Clear your transmission log?")&&ae(p=>({...p,messageLog:[]}))});const r=document.getElementById("op-message"),o=document.getElementById("op-count");r&&o&&r.addEventListener("input",()=>{o.textContent=`${r.value.length} / 501`});const a=document.getElementById("crew-reply-msg"),l=document.getElementById("crew-reply-count");a&&l&&a.addEventListener("input",()=>{l.textContent=`${a.value.length} / 501`});const c=document.getElementById("phone-screen");c&&u.phoneOn&&(c.scrollTop=c.scrollHeight)}function st(t){const e=t.dataset.field,n=t.value;ae(s=>{const[i,r,o]=e.split(".");return r?i==="gear"||i==="nft"?(s[i][r]=n,s):i==="skill"?(s.skills=s.skills.map(a=>a.id!==o?a:{...a,[r]:r==="rating"?Number(n)||0:n}),s):(i==="feat"&&(s.matrixFeats=s.matrixFeats.map(a=>a.id!==o?a:{...a,[r]:r==="rating"?Number(n)||0:n})),s):(s[e]=t.type==="number"?Number(n)||0:n,s)},!1)}N();
