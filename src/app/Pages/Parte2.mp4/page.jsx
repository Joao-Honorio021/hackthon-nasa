"use client";
import VideoTelaCheia from "@/app/components/Video.jsx";


export default function Video() {
  return (<VideoTelaCheia 
  videoSrc="/Parte2.mp4"
  poster="/thumbnail.jpg"
  titulo="The Blackout"
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
/>
);
}
