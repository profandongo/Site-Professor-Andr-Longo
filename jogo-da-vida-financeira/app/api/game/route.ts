import {env} from 'cloudflare:workers';
import {CONFIG} from '../../../game/config.mjs';
import {createClass,createWallet,saveDecision,closeTurn,nextTurn,wealth} from '../../../game/engine.mjs';
export const dynamic='force-dynamic';
const json=(x:any,status=200)=>Response.json(x,{status,headers:{'Cache-Control':'no-store'}});
const db=()=>env.DB!;
const hash=async(s:string)=>Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256',new TextEncoder().encode(s)))).map(x=>x.toString(16).padStart(2,'0')).join('');
async function authorize(req:Request){const row=await db().prepare('SELECT value FROM settings WHERE id=?').bind('admin').first<any>();if(!row)return false;const value=JSON.parse(row.value);return await hash(value.salt+req.headers.get('x-admin-key'))===value.hash}
function name(v:any){if(typeof v!=='string'||!v.trim()||v.trim().length>80)throw Error('Use um nome de até 80 caracteres.');return v.trim()}
function publicClass(g:any){return {id:g.id,name:g.name,turn:g.turn,phase:g.phase,flags:g.flags,release:g.release,wallets:g.wallets.map((w:any)=>({...w,movements:undefined,pending:undefined,principal:undefined,interest:undefined,paidInterest:undefined,forgiven:undefined,wealth:wealth(w)}))}}
export async function GET(req:Request){try{const u=new URL(req.url);const admin=u.searchParams.has('admin');if(admin&&!await authorize(req))return json({error:'Chave administrativa inválida.'},401);const setup=!!await db().prepare('SELECT id FROM settings WHERE id=?').bind('admin').first();const id=u.searchParams.get('id');if(id){const row=await db().prepare('SELECT data,version FROM classrooms WHERE id=?').bind(id).first<any>();if(!row)return json({error:'Turma não encontrada.'},404);const g=JSON.parse(row.data);return json({class:admin?g:publicClass(g),version:row.version})}const rows=await db().prepare('SELECT id,name,data FROM classrooms ORDER BY name').all<any>();return json({setup,classes:rows.results.map((r:any)=>{const g=JSON.parse(r.data);return {id:r.id,name:r.name,count:g.wallets.length,turn:g.turn,phase:g.phase}})})}catch{return json({error:'Não foi possível carregar os dados.'},500)}}
export async function POST(req:Request){try{if(req.headers.get('origin')&&new URL(req.headers.get('origin')!).host!==new URL(req.url).host)return json({error:'Origem não permitida.'},403);const b=await req.json() as any;if(b.action==='setup'){if(typeof b.key!=='string'||b.key.length===0)throw Error('Digite uma chave administrativa.');const salt=crypto.randomUUID();const value=JSON.stringify({salt,hash:await hash(salt+b.key)});const r=await db().prepare('INSERT OR IGNORE INTO settings (id,value) VALUES (?,?)').bind('admin',value).run();if(!r.meta.changes)throw Error('A chave já foi configurada.');return json({ok:true})}
const admin=b.action!=='decision';if(admin&&!await authorize(req))return json({error:'Chave administrativa inválida.'},401);
if(b.action==='create'){const g=createClass(crypto.randomUUID(),name(b.name),crypto.randomUUID());await db().prepare('INSERT INTO classrooms (id,name,data,version) VALUES (?,?,?,0)').bind(g.id,g.name,JSON.stringify(g)).run();return json({ok:true,id:g.id})}
const row=await db().prepare('SELECT data,version FROM classrooms WHERE id=?').bind(b.id).first<any>();if(!row)throw Error('Turma não encontrada.');if(b.version!==row.version)return json({error:'A turma foi atualizada. Recarregue e tente novamente.'},409);let g=JSON.parse(row.data);
if (b.action === 'deleteClass') {
  if (b.confirmedId !== g.id) return json({error:'Confirme a turma selecionada.'},400);
  const deleted = await db().prepare('DELETE FROM classrooms WHERE id=? AND version=?').bind(g.id,row.version).run();
  if (!deleted.meta.changes) return json({error:'A turma mudou. Confira os dados e tente novamente.'},409);
  return json({ok:true});
}
switch(b.action){case 'wallet':if(g.wallets.length>=100)throw Error('Limite de 100 carteiras por turma.');g.wallets.push(createWallet(crypto.randomUUID(),name(b.name),g.turn));break;
case 'rename':if(b.wallet){const w=g.wallets.find((w:any)=>w.id===b.wallet);if(!w)throw Error('Carteira não encontrada.');w.name=name(b.name)}else g.name=name(b.name);break;
case 'flags':for(const [k,v]of Object.entries(b.flags||{})){if(!(k in g.flags)||typeof v!=='boolean')throw Error('Configuração inválida.');if(k==='renegotiation'&&v&&!g.flags[k])g.release++;g.flags[k]=v}break;
case 'decision':{const raw=b.decision;if(!raw||typeof raw!=='object')throw Error('Decisão inválida.');const decision={career:raw.career||undefined,investments:raw.investments||{},insurance:raw.insurance||[],opportunities:raw.opportunities||[],renegotiate:!!raw.renegotiate};if(!Array.isArray(decision.insurance)||!Array.isArray(decision.opportunities))throw Error('Decisão inválida.');saveDecision(g,b.wallet,decision);break}
case 'close':if(g.phase!=='B')return json({ok:true});g=closeTurn(g);break;
case 'next':if(g.phase==='B')return json({ok:true});g=nextTurn(g);break;
default:throw Error('Operação desconhecida.')}
const r=await db().prepare('UPDATE classrooms SET name=?,data=?,version=version+1 WHERE id=? AND version=?').bind(g.name,JSON.stringify(g),g.id,row.version).run();if(!r.meta.changes)return json({error:'Outra alteração chegou primeiro. Atualize e tente novamente.'},409);return json({ok:true});
}catch(e:any){return json({error:e.message||'Não foi possível salvar.'},400)}}
