(function(){
var $=function(s){return document.querySelector(s)};
var $$=function(s){return Array.prototype.slice.call(document.querySelectorAll(s))};

// ---- demo data (replace with real API data later) ----
var matches=[
 {co:"Razorpay",role:"SDE Intern",skills:"DSA, Node.js",pay:"₹60k/mo",fit:92},
 {co:"Zoho",role:"Software Trainee",skills:"Java, SQL",pay:"₹9 LPA",fit:86},
 {co:"Infosys Springboard",role:"Systems Engineer",skills:"C++, OOP",pay:"₹6.5 LPA",fit:79}];
var students=[
 {n:"Aarav Mehta",b:"CSE",c:84,l:412,h:3,r:91},
 {n:"Diya Sharma",b:"IT",c:61,l:268,h:2,r:78},
 {n:"Saurav",b:"CSE",c:47,l:312,h:1,r:72},
 {n:"Kabir Singh",b:"ECE",c:22,l:140,h:0,r:55}];
var cands=[
 {n:"Aarav Mehta",s:["React","Node.js","DSA"],v:95},
 {n:"Diya Sharma",s:["Python","ML","SQL"],v:88},
 {n:"Saurav",s:["C++","DSA","Git"],v:81},
 {n:"Kabir Singh",s:["Java","SQL"],v:70}];
var interns=[
 {t:"Frontend Intern",o:"Razorpay",m:"Remote · 3 months",p:"₹40k/mo"},
 {t:"Data Analyst Intern",o:"Zoho",m:"Chennai · 6 months",p:"₹25k/mo"},
 {t:"Backend Intern",o:"Swiggy",m:"Bengaluru · 2 months",p:"₹50k/mo"}];
var events=[
 {t:"Smart India Hackathon 2026",o:"Teams of 6",m:"Register now"},
 {t:"Lantern Build Weekend",o:"48 hours, online",m:"Open"},
 {t:"What recruiters look for in 2026",o:"Article",m:"5 min read"}];
var vac=[
 {t:"Scientific Officer (IT)",o:"Central Govt.",s:"govt",f:"Verified projects + exam rank"},
 {t:"Junior Software Engineer",o:"State e-Governance",s:"govt",f:"Coding test + GitHub history"},
 {t:"SDE-1",o:"Product startup",s:"private",f:"System design + LeetCode consistency"},
 {t:"ML Engineer",o:"Fintech",s:"private",f:"Shipped models + paper reading"}];

function row(a,b,c,d){return '<div class="row"><div><b>'+a+'</b><span class="sub">'+b+'</span></div><div>'+c+(d||'')+'</div></div>'}

// ---- GitHub contribution graph (deterministic demo pattern) ----
var seed=7,total=0,h='';
function rnd(){seed=(seed*9301+49297)%233280;return seed/233280}
for(var i=0;i<52*7;i++){var r=rnd(),l=r<.45?0:r<.65?1:r<.82?2:r<.94?3:4;total+=l*2;h+='<i class="l'+l+'" title="'+l*2+' contributions"></i>'}
$('#heat').innerHTML=h;$('#total').textContent=total;

// ---- LeetCode streak count-up (respects reduced motion) ----
var target=23,el=$('#streak');
if(window.matchMedia('(prefers-reduced-motion: reduce)').matches){el.textContent=target}
else{var n=0,t=setInterval(function(){el.textContent=++n;if(n>=target)clearInterval(t)},40)}

$('#matches').innerHTML=matches.map(function(m){return row(m.co+' — '+m.role,m.skills+' · '+m.pay,'<span class="score">'+m.fit+'% fit</span>')}).join('');
$('#students').innerHTML=students.map(function(s){return '<tr><td>'+s.n+'</td><td>'+s.b+'</td><td>'+s.c+'</td><td>'+s.l+' solved</td><td>'+s.h+'</td><td><span class="bar2" style="width:'+s.r*.6+'px"></span>'+s.r+'%</td></tr>'}).join('');
$('#interns').innerHTML=interns.map(function(x){return row(x.t,x.o+' · '+x.m,'<span class="tag">'+x.p+'</span>')}).join('');
$('#events').innerHTML=events.map(function(x){return row(x.t,x.o,'<span class="tag">'+x.m+'</span>')}).join('');

// ---- role tabs ----
$$('#dashboard .tab').forEach(function(b){b.onclick=function(){
 $$('#dashboard .tab').forEach(function(x){x.classList.toggle('on',x===b)});
 ['student','college','industry'].forEach(function(v){$('#v-'+v).hidden=(v!==b.dataset.view)})}});

// ---- industry skill filter ----
var skills=["React","Node.js","DSA","Python","ML","SQL","C++","Java","Git"],active={};
function drawCands(){
 var keys=Object.keys(active);
 var list=cands.filter(function(c){return keys.every(function(k){return c.s.indexOf(k)>-1})});
 $('#cands').innerHTML=list.length?list.map(function(c){return row(c.n,c.s.join(', '),'<span class="score">'+c.v+' verified</span>')}).join(''):'<p class="muted">No candidates match all selected skills. Remove a skill to widen the search.</p>'}
$('#skillChips').innerHTML=skills.map(function(s){return '<button class="chip" data-s="'+s+'">'+s+'</button>'}).join('');
$$('.chip').forEach(function(c){c.onclick=function(){var s=c.dataset.s;active[s]?delete active[s]:active[s]=1;c.classList.toggle('on');drawCands()}});
drawCands();

// ---- government / private vacancy filter ----
function drawVac(s){
 $('#vac').innerHTML=vac.filter(function(v){return s==='all'||v.s===s}).map(function(v){return row(v.t,v.o+' · AI checks: '+v.f,'<span class="tag">'+(v.s==='govt'?'Government':'Private')+'</span>')}).join('')}
$$('#hire .tab').forEach(function(b){b.onclick=function(){
 $$('#hire .tab').forEach(function(x){x.classList.toggle('on',x===b)});drawVac(b.dataset.sector)}});
drawVac('all');
})();
