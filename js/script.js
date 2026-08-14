(()=>{
'use strict';
const ROUTES=9;
const labels=['Початок','Зелена інфраструктура','Екосистемна цінність','Управлінська логіка','Спробуйте застосувати','Приклади та інструменти','Ваша карта','Фінальна перевірка','Завершення'];
const KEYS={progress:'ucan_l07_route_v1',portfolio:'ucan_l07_portfolio_v1',formative:'ucan_l07_formative_v1',assessment:'ucan_l07_assessment_passed_v1'};
const qaMode=new URLSearchParams(window.location.search).get('qa')==='1';
const qs=(s,r=document)=>r.querySelector(s), qsa=(s,r=document)=>[...r.querySelectorAll(s)];
let qaAssessment={passed:false,dirty:false,checked:false};
let current=qaMode?1:Math.max(1,Math.min(ROUTES,Number(localStorage.getItem(KEYS.progress)||1)));

function announce(msg){const el=qs('#globalStatus');if(el){el.textContent='';setTimeout(()=>el.textContent=msg,20)}}
function assessmentState(){if(qaMode)return qaAssessment;try{return JSON.parse(localStorage.getItem(KEYS.assessment)||'{"passed":false,"dirty":false,"checked":false}')}catch{return {passed:false,dirty:false,checked:false}}}
function setAssessmentState(state){if(qaMode){qaAssessment={...state};}else{localStorage.setItem(KEYS.assessment,JSON.stringify(state));}updateCompletion();updateNav();}
function canOpen(n){return qaMode||n!==9||assessmentState().passed}

function updateProgress(){
  const pct=Math.round(current/ROUTES*100);
  qs('#progressText').textContent=`Сторінка ${current} із ${ROUTES} · ${pct}%`;
  const bar=qs('#progressBar');
  bar.setAttribute('aria-valuenow',String(current));
  bar.setAttribute('aria-valuetext',`Сторінка ${current} із ${ROUTES}, ${pct} відсотків`);
  qs('.progress-fill').style.width=`${pct}%`;
  qs('#currentRouteLabel').textContent=labels[current-1];
  qsa('.section-strip [data-goto]').forEach(btn=>{
    const n=Number(btn.dataset.goto);
    if(n===current)btn.setAttribute('aria-current','page');else btn.removeAttribute('aria-current');
    const locked=n===9&&!canOpen(9);
    btn.disabled=locked;
    btn.setAttribute('aria-disabled',locked?'true':'false');
  });
}

function portfolioData(){const d={};qsa('#portfolio [id^="pf"]').filter(e=>/^pf0[1-5]$/.test(e.id)).forEach(el=>d[el.id]=el.value.trim());return d}
function portfolioCount(){return Object.values(portfolioData()).filter(Boolean).length}
function updateCompletion(){
  const passed=assessmentState().passed;
  const accessible=passed||qaMode;
  const r9=qs('#r9');
  r9.classList.toggle('locked',!accessible);
  r9.setAttribute('aria-disabled',accessible?'false':'true');
  qs('#completionLocked').hidden=accessible;
  qs('#completionContent').hidden=!accessible;
  if(accessible){
    const assessmentStatus=qs('#assessmentCompletionStatus');
    assessmentStatus.hidden=!passed;
    assessmentStatus.textContent=passed?'5/5 — пройдено':'';
    const n=portfolioCount();
    qs('#portfolioCompletionStatus').textContent=n===5?'Карта готова: усі 5 елементів заповнені.':n?`Карта частково заповнена: ${n} із 5 елементів.`:'Карта ще не заповнена.';
  }
}
function updateNav(){
  const prev=qs('#prevRoute'),next=qs('#nextRoute'),nextLesson=qs('#nextLessonCta');
  prev.disabled=current===1;
  if(current===9){
    next.hidden=true;
    next.disabled=false;
    next.removeAttribute('aria-disabled');
    next.textContent='Далі';
    nextLesson.hidden=false;
  }else{
    next.hidden=false;
    next.disabled=current===8&&!canOpen(9);
    next.textContent=current===8?'До завершення':'Далі';
    nextLesson.hidden=true;
  }
  updateProgress();
}
function showRoute(n,focus=true){
  n=Math.max(1,Math.min(ROUTES,n));
  if(!canOpen(n))n=8;
  current=n;
  if(!qaMode)localStorage.setItem(KEYS.progress,String(current));
  qsa('.route').forEach(el=>el.classList.toggle('active',Number(el.dataset.route)===current));
  updateCompletion();updateNav();
  window.scrollTo({top:0,behavior:'smooth'});
  if(focus)setTimeout(()=>{const h=qs(`#r${current} h2`);if(h){h.setAttribute('tabindex','-1');h.focus();}},50);
}
function bindRouteControls(){
  qs('#prevRoute').addEventListener('click',()=>showRoute(current-1));
  qs('#nextRoute').addEventListener('click',()=>showRoute(current+1));
  qsa('.section-strip [data-goto]').forEach(btn=>btn.addEventListener('click',()=>showRoute(Number(btn.dataset.goto))));
  qs('#resetProgress').addEventListener('click',()=>qs('#resetDialog').showModal());
  qs('#resetDialog').addEventListener('close',()=>{if(qs('#resetDialog').returnValue==='confirm')resetLesson()});
}
function resetLesson(){
  if(!qaMode){localStorage.removeItem(KEYS.progress);localStorage.removeItem(KEYS.formative);localStorage.removeItem(KEYS.assessment);}else{qaAssessment={passed:false,dirty:false,checked:false};}
  current=1;
  qsa('#formative input').forEach(i=>i.checked=false);qsa('.scenario-feedback').forEach(f=>{f.textContent='';f.className='scenario-feedback'});qs('#formativeFeedback').innerHTML='';
  qsa('#assessment input').forEach(i=>i.checked=false);qs('#assessmentFeedback').textContent='';
  showRoute(1,false);
  announce(qaMode?'Заняття повернуто до початку.':'Прогрес заняття, формативну вправу та фінальну перевірку скинуто. Дані Портфеля мера збережено.');
}

const pfIds=['pf01','pf02','pf03','pf04','pf05'];
function loadPortfolio(){let data={};if(!qaMode){try{data=JSON.parse(localStorage.getItem(KEYS.portfolio)||'{}')}catch{}}pfIds.forEach(id=>{const el=qs('#'+id);if(el&&data[id]!=null)el.value=data[id]});updatePfOptions();updatePortfolioReadiness();}
function persistPortfolio({announceSave=false}={}){
  const data={};pfIds.forEach(id=>data[id]=qs('#'+id).value);
  if(!qaMode)localStorage.setItem(KEYS.portfolio,JSON.stringify(data));
  updatePfOptions();updatePortfolioReadiness();
  if(announceSave){
    const status=qs('#saveStatus');
    status.textContent=qaMode?'':'Карту збережено у цьому браузері.';
    if(status.textContent)announce(status.textContent);
  }
}
function savePortfolio(){persistPortfolio({announceSave:false});}
function updatePfOptions(){const dl=qs('#pf02Options');if(!dl)return;const items=(qs('#pf01')?.value||'').split(/\n|;|,/).map(s=>s.trim()).filter(Boolean).slice(0,10);dl.innerHTML=items.map(v=>`<option value="${escapeHtml(v)}"></option>`).join('')}
function updatePortfolioReadiness(){const n=portfolioCount();qs('#portfolioReadiness').textContent=`Заповнено ${n} із 5 елементів`;updateCompletion()}
function escapeHtml(s){return s.replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
function buildAiPrompt(task){
  const v=id=>(qs('#'+id)?.value||'').trim();
  if(task==='ai2')return `Ось мій власний управлінський висновок про зелений актив: ${v('pf05')||'[Ваш управлінський висновок]'}. Скороти його до 1–2 чітких речень для управлінської команди. Не додавай нових фактів, чисел, місцевих даних або рекомендацій, яких немає в моєму тексті.`;
  return `Я описую зелений актив своєї громади. Актив: ${v('pf02')||'[Ваш обраний актив]'}. Основна екосистемна послуга / цінність: ${v('pf03')||'[Ваша відповідь]'}. Як ця цінність проявляється: ${v('pf04')||'[Ваша відповідь]'}. Управлінське значення: ${v('pf05')||'[Ваш висновок]'}. Не додавай фактів про мою громаду. Перевір, чи логічно пов’язані ці частини, і постав до трьох уточнювальних запитань. Не заповнюй карту замість мене.`;
}
function selectedAiTask(){return qs('input[name="aiTask"]:checked')?.value||'ai1'}
function bindPortfolio(){
  pfIds.forEach(id=>qs('#'+id).addEventListener('input',savePortfolio));
  qs('#savePortfolio').addEventListener('click',()=>persistPortfolio({announceSave:true}));
  qs('#deletePortfolio').addEventListener('click',()=>qs('#deletePortfolioDialog').showModal());
  qs('#deletePortfolioDialog').addEventListener('close',()=>{if(qs('#deletePortfolioDialog').returnValue==='confirm'){
    if(!qaMode)localStorage.removeItem(KEYS.portfolio);
    pfIds.forEach(id=>qs('#'+id).value='');updatePfOptions();updatePortfolioReadiness();announce(qaMode?'Дані на сторінці очищено.':'Дані Портфеля мера видалено.');
  }});
  qs('#printPortfolio').addEventListener('click',()=>window.print());
}

/* Formative Micro-Polish Decision — APPROVED in this Sprint.
   Scenario stems, correct concepts and feedback purpose are preserved.
   Only distractors were refined to remain municipally plausible but less appropriate than the best answer. */
const formative=[
{scenario:'У спекотні періоди відкрита міська вулиця майже не має тіні. Який ланцюг найкраще відповідає управлінській логіці цього заняття?',options:{A:'Дерева вздовж вулиці → затінення й охолодження → врахувати зелений актив під час оновлення вуличного простору.',B:'Дерева вздовж вулиці → затінення й охолодження → розглядати їх лише як елемент благоустрою без зв’язку з рішенням щодо перегрітої вулиці.',C:'Міський парк неподалік → рекреація і добробут → зосередити управлінську увагу на парку, не змінюючи умови саме на перегрітій вулиці.',D:'Зелений коридор → підтримка біорізноманіття → зробити збереження коридору головною відповіддю на проблему відсутності тіні на цій вулиці.'},correct:'A',good:'Цей ланцюг пов’язує конкретну проблему вулиці з релевантним зеленим активом, його найбільш очевидною послугою та рішенням щодо самого простору.',bad:'Перегляньте зв’язок «проблема → актив → послуга → управлінське рішення». Оберіть варіант, який найточніше відповідає саме проблемі перегріву цієї вулиці.'},
{scenario:'Після інтенсивних опадів вода затримується біля громадського простору. Який ланцюг є найпослідовнішим для першого управлінського розгляду?',options:{A:'Озеленена ділянка, що приймає дощову воду → рекреація → планувати її насамперед як простір відпочинку, не роблячи водну функцію частиною рішення.',B:'Озеленена ділянка, що приймає дощову воду → підтримка управління дощовою водою → врахувати її під час планування простору та поводження з опадами.',C:'Дерева навколо громадського простору → затінення й охолодження → зробити озеленення головною відповіддю на затримання води без окремого розгляду водної функції.',D:'Міський парк поруч → рекреація та добробут → спрямувати рішення на покращення користування парком, не пов’язуючи його з проблемою опадів біля цього простору.'},correct:'B',good:'Ланцюг безпосередньо пов’язує проблему опадів з активом, здатним приймати дощову воду, і з управлінським питанням планування простору та води.',bad:'Перевірте зв’язок між проблемою, активом і його основною функцією. Найкращий варіант має прямо відповідати ситуації з дощовою водою без перебільшення ефекту.'},
{scenario:'Місто розглядає зміни у просторі, де зелена смуга поєднує дві природні ділянки. Який ланцюг найкраще показує управлінське значення цього активу?',options:{A:'Зелений коридор → підтримка біорізноманіття → врахувати безперервність зеленого зв’язку у просторовому рішенні.',B:'Зелений коридор → рекреація і добробут → пріоритезувати зручність користування простором, розглядаючи екологічну зв’язність як другорядну.',C:'Зелений коридор → затінення й охолодження → оцінювати його насамперед як комфортний маршрут, не враховуючи зв’язок між природними ділянками.',D:'Зелений коридор → підтримка управління дощовою водою → зосередити рішення тільки на водній функції, не враховуючи просторову зв’язність зелених ділянок.'},correct:'A',good:'Цей варіант зберігає логіку «актив → екосистемна цінність → управлінське значення»: зв’язність зелених ділянок має бути помітною під час просторового рішення.',bad:'Перегляньте ланку «послуга → управлінське значення». Оберіть функцію, яка найточніше пояснює значення зеленого зв’язку між двома природними ділянками.'}
];
function buildFormative(){const host=qs('#formativeItems');host.innerHTML='';formative.forEach((item,i)=>{const fs=document.createElement('fieldset');const lg=document.createElement('legend');lg.textContent=`Ситуація ${i+1}. ${item.scenario}`;fs.appendChild(lg);Object.entries(item.options).forEach(([k,t])=>{const lab=document.createElement('label');lab.className='choice';lab.innerHTML=`<input type="radio" name="f${i}" value="${k}"> <span>${k}. ${t}</span>`;fs.appendChild(lab)});const fb=document.createElement('div');fb.id=`f${i}Feedback`;fb.className='scenario-feedback';fb.setAttribute('role','status');fb.setAttribute('aria-live','polite');fs.appendChild(fb);host.appendChild(fs)});qs('#formative').addEventListener('submit',e=>{e.preventDefault();formative.forEach((item,i)=>{const c=qs(`input[name="f${i}"]:checked`),fb=qs(`#f${i}Feedback`);if(!c){fb.textContent='Оберіть відповідь, щоб перевірити логіку.';fb.className='scenario-feedback status-error'}else if(c.value===item.correct){fb.textContent=item.good;fb.className='scenario-feedback status-success'}else{fb.textContent=item.bad;fb.className='scenario-feedback status-error'}});announce('Формативні відповіді перевірено. Вправа не впливає на завершення заняття.')});qs('#formativeRetry').addEventListener('click',()=>{qsa('#formative input').forEach(i=>i.checked=false);qsa('.scenario-feedback').forEach(f=>{f.textContent='';f.className='scenario-feedback'});announce('Формативну вправу очищено. Можна спробувати ще раз.')})}

const questions=[
{q:'Що найточніше описує екосистемну послугу в контексті цього заняття?',a:{A:'Корисна для міста і людей функція або цінність, пов’язана з природним чи озелененим елементом.',B:'Будь-яка послуга комунального підприємства.',C:'Лише грошова оцінка зеленої території.',D:'Тільки юридичний статус природоохоронної території.'}},
{q:'Чому зелену інфраструктуру доцільно розглядати як міський актив?',a:{A:'Тому що її цінність визначається тільки площею.',B:'Тому що вона може надавати екосистемні послуги, важливі для міських рішень.',C:'Тому що будь-яка зелена територія автоматично вирішує всі кліматичні ризики.',D:'Тому що після створення зелена інфраструктура більше не потребує управління.'}},
{q:'Який зв’язок «актив → екосистемна послуга» найкраще відповідає логіці заняття для вулиці, яка сильно нагрівається влітку?',a:{A:'Дерева вздовж вулиці → затінення та охолодження.',B:'Міський парк → усунення підтоплень на всій вулиці без оцінки місцевих умов.',C:'Зелена смуга → заміна вимог міського планування.',D:'Сквер → автоматичне скорочення бюджетних витрат без додаткового аналізу.'}},
{q:'Ви складаєте первинний перелік зелених активів громади, але не маєте точних ГІС-даних або вимірювань. Який підхід відповідає цьому заняттю?',a:{A:'Відкласти роботу до появи повного технічного дослідження.',B:'Зафіксувати актив, його основну екосистемну послугу / цінність і управлінське значення без вигаданих цифр.',C:'Самостійно припустити точний кількісний ефект.',D:'Замінити первинну карту фінансовою моделлю активу.'}},
{q:'Місто планує рішення щодо скверу. Який управлінський підхід найкраще відповідає логіці управління зеленою інфраструктурою як активом?',a:{A:'Оцінити насамперед декоративний вигляд скверу, не пов’язуючи його з іншими функціями.',B:'Визначити, яку екосистемну послугу / цінність сквер надає або може надавати, і врахувати це в управлінському рішенні.',C:'Використати однаковий перелік екосистемних послуг для всіх зелених просторів без окремого аналізу.',D:'Враховувати сквер лише як витрату на утримання, не розглядаючи його можливі екосистемні послуги.'}}
];
const answerKey=['A','B','A','B','B'];
function invalidateAssessment(){const st=assessmentState();if(st.passed||st.checked){setAssessmentState({passed:false,dirty:true,checked:false});const fb=qs('#assessmentFeedback');fb.textContent='Відповіді змінено. Перевірте їх ще раз, щоб підтвердити результат.';fb.className='feedback';if(current===9&&!qaMode)showRoute(8,false);announce('Відповіді змінено. Завершення знову заблоковано до повторної перевірки.')}}
function buildAssessment(){const host=qs('#questions');host.innerHTML='';questions.forEach((item,i)=>{const fs=document.createElement('fieldset');const lg=document.createElement('legend');lg.textContent=`Q${i+1}. ${item.q}`;fs.appendChild(lg);Object.entries(item.a).forEach(([key,text])=>{const lab=document.createElement('label');lab.className='choice';lab.innerHTML=`<input type="radio" name="q${i+1}" value="${key}"> <span>${key}. ${text}</span>`;fs.appendChild(lab)});host.appendChild(fs)});qsa('#assessment input').forEach(i=>i.addEventListener('change',invalidateAssessment));qs('#assessment').addEventListener('submit',e=>{e.preventDefault();let score=0;answerKey.forEach((key,i)=>{const c=qs(`input[name="q${i+1}"]:checked`);if(c&&c.value===key)score++});const fb=qs('#assessmentFeedback');if(score===5){setAssessmentState({passed:true,dirty:false,checked:true,score:5,at:new Date().toISOString()});fb.textContent='5/5. Фінальну перевірку пройдено. Розділ «Завершення» розблоковано.';fb.className='feedback status-success'}else{setAssessmentState({passed:false,dirty:false,checked:true,score,at:new Date().toISOString()});fb.textContent=`Результат: ${score}/5. Для завершення потрібно 5/5. Перегляньте відповіді та спробуйте ще раз.`;fb.className='feedback status-error'}})}
async function copySelectedAiPrompt(){
  const status=qs('#clipboardStatus');
  const prompt=buildAiPrompt(selectedAiTask());
  try{
    await navigator.clipboard.writeText(prompt);
    status.textContent='Промпт скопійовано. Відкрийте ChatGPT або Gemini та вставте його в чат.';
    status.className='feedback status-success';
  }catch{
    status.textContent='Не вдалося скопіювати промпт. Спробуйте ще раз.';
    status.className='feedback status-error';
  }
}
function openAiService(service){
  const urls={chatgpt:'https://chatgpt.com/',gemini:'https://gemini.google.com/app'};
  const url=urls[service];
  if(url)window.open(url,'_blank','noopener,noreferrer');
}
function bindAiActions(){
  qs('#copyAiPrompt').addEventListener('click',copySelectedAiPrompt);
  qsa('[data-ai-open]').forEach(btn=>btn.addEventListener('click',()=>openAiService(btn.dataset.aiOpen)));
}
function initQaMode(){if(!qaMode)return;qs('#qaBadge').hidden=false;document.documentElement.dataset.qa='1';}

document.addEventListener('DOMContentLoaded',()=>{initQaMode();bindRouteControls();buildFormative();loadPortfolio();bindPortfolio();bindAiActions();buildAssessment();updateCompletion();showRoute(canOpen(current)?current:8,false)});
})();
