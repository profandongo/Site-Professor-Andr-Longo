import GameApp from '../../../components/game-app';
export default async function Page({params}:{params:Promise<{id:string}>}){const {id}=await params;return <GameApp mode="class" id={id}/>}
