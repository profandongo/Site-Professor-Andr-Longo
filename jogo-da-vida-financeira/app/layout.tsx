import type {Metadata} from 'next';
import './globals.css';
export const metadata:Metadata={title:'Jogo da Vida Financeira',description:'Uma jornada de escolhas e educação financeira.',robots:{index:false,follow:false},icons:{icon:'/favicon.svg'}};
export default function Layout({children}:{children:React.ReactNode}){return <html lang="pt-BR"><body>{children}</body></html>}
