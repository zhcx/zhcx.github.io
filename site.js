const topics=[
 {key:'AI',n:'01',name:'AI 工具与工作流',label:'让工具为真正的问题服务。',intro:'把问题讲清楚，把过程记下来。',body:'这个栏目用来记录 AI 工具、Agent 与工作流的尝试。\n\n一条值得留下的实验记录，应包括：问题与背景、输入资料、所用工具、执行过程、验证结果和适用范围。\n\n先从一个小问题开始。把有用的尝试写下来，也把失败原因留给下一次探索。',title:'从一个问题开始，记录一次 AI 实验'},
 {key:'Build',n:'02',name:'开源开发与自建服务',label:'亲手搭建，理解工具如何工作。',intro:'从想法到可用，保留搭建的过程。',body:'这个栏目用来记录开源项目、NAS 和自建服务的探索。\n\n记录一项搭建，可以从用途、环境、操作步骤、验证方式和恢复方法展开。对配置和原始资料保留备份，让下一次调整有据可循。\n\n当前这里只是栏目开篇；后续可以加入真实项目的搭建记录。',title:'把搭建过程，变成可复用的笔记'},
 {key:'Run',n:'03',name:'跑步与耐力成长',label:'在每一次出发中，找到自己的节奏。',intro:'记录路程，也记录沿途的感受。',body:'这个栏目留给跑步、路线与日常感受。\n\n记录可以很简单：日期、距离、用时，以及当天的状态。数字帮助回看过程，文字留下数字以外的体验。\n\n本网站没有预填训练成绩。素材中的训练计划是示例，真实记录可以从工作台的跑步模块开始。',title:'每一次出发，都值得留下记录'},
 {key:'Notes',n:'04',name:'技术笔记与生活记录',label:'把零散的发现，慢慢连成自己的知识。',intro:'记录、思考，然后继续折腾。',body:'这个栏目收集技术笔记、阅读片段和生活中的小发现。\n\n不必等到想法完整才开始写。先记下问题、来源和当时的理解，再在实践后补上修正。\n\n工作台的笔记支持自动保存和导出，帮助把临时想法整理成可以继续使用的材料。',title:'让零散的想法，有一个落脚的地方'}
];
let selected='all';
const cards=document.querySelector('#categories');
cards.innerHTML=topics.map(t=>`<button class="category" data-topic="${t.key}"><img src="assets/${t.key}.png" alt="${t.name}品牌插画" loading="lazy"><div><span class="tag ${t.key.toLowerCase()}">${t.key}</span><span class="muted">${t.n} ↗</span></div><h2>${t.name}</h2><p>${t.label}</p></button>`).join('');
function showEntries(){const query=document.querySelector('#search').value.trim().toLowerCase();const rows=topics.filter(t=>(selected==='all'||t.key===selected)&&[t.title,t.key,t.name,t.intro].join(' ').toLowerCase().includes(query));document.querySelector('#entries').innerHTML=rows.length?rows.map(t=>`<button class="entry" data-topic="${t.key}"><span class="entry-number">${t.n}</span><div><span class="tag ${t.key.toLowerCase()}">${t.key}</span><span class="muted"> 栏目开篇</span><h3>${t.title}</h3><p>${t.intro}</p></div><span class="entry-arrow">↗</span></button>`).join(''):'<p class="empty">没有找到匹配的手记，试试其他关键词。</p>';}
document.querySelector('#filters').addEventListener('click',e=>{const b=e.target.closest('[data-filter]');if(!b)return;selected=b.dataset.filter;document.querySelectorAll('[data-filter]').forEach(x=>x.classList.toggle('active',x===b));showEntries();});
document.querySelector('#search').addEventListener('input',showEntries);
document.addEventListener('click',e=>{const b=e.target.closest('[data-topic]');if(!b)return;const t=topics.find(x=>x.key===b.dataset.topic);document.querySelector('#article-content').innerHTML=`<img class="article-image" src="assets/${t.key}.png" alt="${t.name}"><span class="tag ${t.key.toLowerCase()}">${t.key} / 栏目开篇</span><h2 id="article-title">${t.title}</h2>${t.body.split('\n\n').map(p=>`<p>${p}</p>`).join('')}`;document.querySelector('#article-dialog').showModal();});
document.querySelector('.close').addEventListener('click',()=>document.querySelector('#article-dialog').close());
document.querySelector('#article-dialog').addEventListener('click',e=>{if(e.target.id==='article-dialog')e.target.close();});
document.querySelector('#theme').addEventListener('click',()=>{document.documentElement.classList.toggle('dark');try{localStorage.setItem('zhcxLab-site-theme',document.documentElement.classList.contains('dark')?'dark':'light');}catch{}});
try{document.documentElement.classList.toggle('dark',localStorage.getItem('zhcxLab-site-theme')==='dark');}catch{}
const workbenchLink=document.querySelector('#workbench-link');
if(window.zhcxLabConfig?.workbenchUrl){workbenchLink.href=window.zhcxLabConfig.workbenchUrl;workbenchLink.hidden=false;}
showEntries();
