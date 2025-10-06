"use client";
import VideoTelaCheia from "@/app/components/Video.jsx";


export default function Video() {
  return (<VideoTelaCheia 
  videoSrc="https://www.youtube.com/watch?v=07fHaV5hYlc"
  poster="/thumbnail.jpg"
  titulo="The Beginning"
  autoPlay={false}
  loop={false}
  muted={false}
  mostrarControles={true}
  mostrarAcessibilidade={true}
  opcoesQualidade={[
    { valor: "1080p", label: "1080p", descricao: "Full HD" },
    { valor: "720p", label: "720p", descricao: "HD" },
    { valor: "480p", label: "480p", descricao: "SD" }
  ]}
  onPlay={() => console.log('Vídeo iniciado')}
  onPause={() => console.log('Vídeo pausado')}
  onEnded={() => console.log('Vídeo finalizado')}
  onError={(error) => console.error('Erro no vídeo:', error)}
/>);
}