import {CONFIG as C,FLAGS} from './config.mjs';
export const up=n=>Math.ceil(Number(n.toFixed(8)));
export const clone=x=>structuredClone(x);
export function random(key){let h=2166136261;for(const c of key){h^=c.charCodeAt(0);h=Math.imul(h,16777619)}return ()=>{h+=0x6D2B79F5;let t=h;t=Math.imul(t^t>>>15,t|1);t^=t+Math.imul(t^t>>>7,t|61);return ((t^t>>>14)>>>0)/4294967296}}
export function createClass(id,name,seed=id){return {id,name,seed,turn:1,phase:'B',flags:{...FLAGS},release:0,wallets:[],results:[]}}
export function createWallet(id,name,turn=1){return {id,name,cash:C.initial,principal:0,interest:0,paidInterest:0,forgiven:0,career:null,start:null,cim:C.initialCim,effective:C.initialCim,investments:[],opportunities:[],pending:[],decision:null,late:turn>1,renegotiated:0,movements:[],notifications:[]}}
export const wealth=w=>w.cash+w.investments.reduce((a,i)=>a+i.value,0);
export const graduated=(w,t)=>!!w.career&&t-w.start>=C.careers[w.career].stages.reduce((n,s)=>n+s[0],0);
function record(w,value,type,turn){w.movements.push({type,value,turn,balance:w.cash})}
export function changeCash(w,value,type='movimento',turn=0){if(value>=0){let amount=value;const interest=Math.min(amount,w.interest);w.interest-=interest;w.paidInterest+=interest;amount-=interest;w.principal-=Math.min(amount,w.principal)}else {const newDebt=Math.max(0,-(w.cash+value))-Math.max(0,-w.cash);w.principal+=newDebt}w.cash+=value;record(w,value,type,turn)}
function chargeInterest(w,turn){if(w.cash<0){const v=up(-w.cash*C.debtRate);w.interest+=v;w.cash-=v;record(w,-v,'juros',turn)}}
function cancel(w){for(const o of w.opportunities)if(o.status==='Em andamento')o.status='Cancelada'}
function ensure(ok,msg){if(!ok)throw Error(msg)}
export function market(g,key){const p=C.investments[key];if(!p.draws)return p.rate;const rng=random(`${g.id}:${g.seed}:${g.turn}:market:${key}`);let sum=0;for(let i=0;i<p.draws;i++)sum+=(rng()*2-1)*p.range;return sum/p.draws+p.bonus}
export function applyDecision(g,w,d={}){ensure(g.phase==='B'&&!w.late,'As decisões estão encerradas.');if(d.career){ensure(g.flags.career&&!w.career&&C.careers[d.career],'Profissão indisponível.');w.career=d.career;w.start=g.turn;w.cim=C.careers[w.career].stages[0]?.[1]??C.careers[w.career].cim}
const spend=v=>{ensure(Number.isSafeInteger(v)&&v>=0&&w.cash>=v,'Saldo insuficiente.');changeCash(w,-v,'decisão',g.turn)};
for(const [key,value] of Object.entries(d.investments||{})){if(!value)continue;const p=C.investments[key];ensure(p&&g.flags[key]&&w.cash>=0,'Aplicação indisponível.');ensure(g.turn+p.term-1<=C.turns,'O investimento venceria após o jogo.');ensure(value>0,'Informe um valor positivo.');spend(value);w.investments.push({id:`${g.turn}-${key}-${w.investments.length}`,key,original:value,value,start:g.turn,end:g.turn+p.term-1,status:'Em carência'})}
const insured=[];for(const key of d.insurance||[]){ensure(C.insurance[key]&&g.flags[key]&&!insured.includes(key),'Seguro indisponível.');spend(C.insurance[key].price);insured.push(key)}
for(const key of d.opportunities||[]){const p=C.opportunities[key];ensure(p&&g.flags[key]&&graduated(w,g.turn)&&w.cash>=0&&!w.opportunities.some(o=>o.key===key),'Oportunidade indisponível.');spend(p.price||0);const o={key,start:g.turn,progress:0,cost:p.price||0,status:p.term?'Em andamento':'Concluída'};w.opportunities.push(o);if(!p.term)w.pending.push({percent:p.percent||0,fixed:p.fixed||0})}
if(d.renegotiate){ensure(g.flags.renegotiation&&w.cash<0&&w.renegotiated!==g.release,'Renegociação indisponível.');const v=w.interest;w.cash+=v;w.forgiven+=v;w.interest=0;w.renegotiated=g.release;record(w,v,'perdão de juros',g.turn)}return insured}
export function validateDecision(g,w,d){const copy=clone(w);applyDecision(g,copy,d);return true}
export function saveDecision(g,id,d){const w=g.wallets.find(w=>w.id===id);ensure(w,'Carteira não encontrada.');validateDecision(g,w,d);w.decision=clone(d)}
export function closeTurn(input,overrides={}){if(input.phase!=='B')return clone(input);const g=clone(input);const rates=Object.fromEntries(Object.keys(C.investments).map(k=>[k,market(g,k)]));const result={turn:g.turn,flags:clone(g.flags),rates,wallets:[]};
for(const w of g.wallets){if(w.late)continue;w.notifications=[];const insured=applyDecision(g,w,w.decision||{});const rng=random(`${g.id}:${g.seed}:${g.turn}:${w.id}:personal`);const job=C.careers[w.career];const eligible=graduated(w,g.turn);const draws=overrides[w.id]||{};const unemployed=eligible&&w.cash>=0&&g.flags.unemployment&&(draws.unemployment??rng())<job.unemployment;
if(unemployed){cancel(w);w.notifications.push('Você ficou desempregado neste semestre.')}else if(eligible&&g.flags.promotion&&(draws.promotion??rng())<job.promotion){w.pending.push({percent:C.promotion,fixed:0});w.notifications.push('Você recebeu uma promoção para o próximo semestre!')}
let event=C.events.at(-1),value=0;if(g.flags.events){let r=(draws.event??rng())*100;for(const e of C.events){r-=e[2];if(r<0){event=e;break}}if((event[3]<0&&w.cash<0)||(event[0]==='bonus'&&(!eligible||unemployed)))event=C.events.at(-1);value=(event[3]+Math.floor((draws.amount??rng())*((event[4]-event[3])/10+1))*10)*100;
const insurance=insured.map(k=>C.insurance[k]).find(p=>p.event===event[0]);if(value<0&&insurance){value=up(value*(1-insurance.coverage));w.notifications.push('Seu seguro cobriu 80% da despesa.')}changeCash(w,value,event[1],g.turn);w.notifications.push(event[1]);}
if(w.cash<0)cancel(w);for(const i of w.investments){i.value=up(i.value*(1+rates[i.key]));if(i.end===g.turn)i.status='Aguardando liquidação'}
if(w.cash>0)changeCash(w,up(w.cash*C.cashRate),'rendimento da conta',g.turn);else chargeInterest(w,g.turn);
let monthly=unemployed?-2*w.cim:w.cim;for(const o of w.opportunities)if(o.status==='Em andamento'){const p=C.opportunities[o.key];monthly-=p.monthly||0;o.cost+=(p.monthly||0)*C.months}w.effective=monthly;changeCash(w,monthly*C.months,'CIM semestral',g.turn);if(w.cash<0)cancel(w);
for(const o of w.opportunities)if(o.status==='Em andamento'){o.progress++;const p=C.opportunities[o.key];if(o.progress>=p.term){o.status='Concluída';w.pending.push({percent:p.percent||0,fixed:p.fixed||0});w.notifications.push(`${p.name} concluída!`)}}
result.wallets.push({id:w.id,event:event[0],eventValue:value,unemployed,cim:monthly,cash:w.cash,wealth:wealth(w)});w.decision=null}
g.results.push(result);g.phase=g.turn===C.turns?'finished':'waiting';return g}
export function nextTurn(input){ensure(input.phase==='waiting'&&input.turn<C.turns,'O próximo turno ainda não está disponível.');const g=clone(input);g.turn++;g.phase='B';for(const w of g.wallets){if(w.late)continue;if(w.career){let elapsed=g.turn-w.start;const p=C.careers[w.career];if(!graduated(w,g.turn)){for(const [duration,cim] of p.stages){if(elapsed<duration){w.cim=cim;break}elapsed-=duration}}else if(!graduated(w,g.turn-1))w.cim=p.cim}
let cim=w.cim;for(const p of w.pending)cim=up(cim*(1+p.percent));cim+=w.pending.reduce((a,p)=>a+p.fixed,0);w.cim=cim;w.pending=[];w.effective=w.cim;
for(const i of w.investments.filter(i=>i.end<g.turn))changeCash(w,i.value,'liquidação',g.turn);w.investments=w.investments.filter(i=>i.end>=g.turn);if(w.cash<0)cancel(w)}return g}
