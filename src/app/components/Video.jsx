"use client";
import { useState, useRef, useEffect } from 'react';
import { 
  FaPlay, 
  FaPause, 
  FaVolumeUp, 
  FaVolumeMute, 
  FaExpand, 
  FaCompress,
  FaEye,
  FaTimes
} from 'react-icons/fa';
import { IoMdSettings } from 'react-icons/io';

export default function VideoTelaCheia({
  urlVideo = "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
  videosDaltonismo = {}
}) {
  const [estaRodando, setEstaRodando] = useState(false);
  const [estaMutado, setEstaMutado] = useState(true);
  const [estaTelaCheia, setEstaTelaCheia] = useState(false);
  const [mostrarControles, setMostrarControles] = useState(true);
  const [daltonico, setDaltonico] = useState(false);
  const [tipoDaltonismo, setTipoDaltonismo] = useState("deuteranopia");
  const [tempoAtual, setTempoAtual] = useState(0);
  const [duracao, setDuracao] = useState(0);
  const [volume, setVolume] = useState(100);
  const [mostrarMenuDaltonismo, setMostrarMenuDaltonismo] = useState(false);
  
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const timeoutControlesRef = useRef(null);

  const tiposDaltonismo = [
    { valor: "deuteranopia", label: "Deuteranopia", descricao: "Dificuldade com verde" },
    { valor: "protanopia", label: "Protanopia", descricao: "Dificuldade com vermelho" },
    { valor: "tritanopia", label: "Tritanopia", descricao: "Dificuldade com azul" },
    { valor: "acromatopsia", label: "Acromatopsia", descricao: "Visão em preto e branco" }
  ];


  const aoMoverMouse = () => {
    setMostrarControles(true);
    if (timeoutControlesRef.current) {
      clearTimeout(timeoutControlesRef.current);
    }
    timeoutControlesRef.current = setTimeout(() => {
      if (estaRodando) {
        setMostrarControles(false);
        setMostrarMenuDaltonismo(false);
      }
    }, 10000);
  };

  const selecionarTipoDaltonismo = (tipo) => {
    setTipoDaltonismo(tipo);
    setMostrarMenuDaltonismo(false);
  };

  const alternarDaltonico = () => {
    setDaltonico(!daltonico);
  };

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.play()
        .then(() => setEstaRodando(true))
        .catch((erro) => console.log('Autoplay bloqueado:', erro));
    }
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const atualizarTempo = () => setTempoAtual(video.currentTime);
    const atualizarDuracao = () => setDuracao(video.duration);

    video.addEventListener('timeupdate', atualizarTempo);
    video.addEventListener('loadedmetadata', atualizarDuracao);

    return () => {
      video.removeEventListener('timeupdate', atualizarTempo);
      video.removeEventListener('loadedmetadata', atualizarDuracao);
    };
  }, []);

  const alternarPlayPause = () => {
    const video = videoRef.current;
    if (video) {
      if (estaRodando) {
        video.pause();
        setEstaRodando(false);
        setMostrarControles(true);
      } else {
        video.play();
        setEstaRodando(true);
      }
    }
  };

  const alternarMudo = () => {
    const video = videoRef.current;
    if (video) {
      video.muted = !estaMutado;
      setEstaMutado(!estaMutado);
    }
  };

  const alternarTelaCheia = () => {
    const container = containerRef.current;
    if (!document.fullscreenElement) {
      container?.requestFullscreen();
      setEstaTelaCheia(true);
    } else {
      document.exitFullscreen();
      setEstaTelaCheia(false);
    }
  };

  const mudarVolume = (e) => {
    const novoVolume = parseInt(e.target.value);
    setVolume(novoVolume);
    const video = videoRef.current;
    if (video) {
      video.volume = novoVolume / 100;
      if (novoVolume === 0) {
        setEstaMutado(true);
        video.muted = true;
      } else if (estaMutado) {
        setEstaMutado(false);
        video.muted = false;
      }
    }
  };

  const mudarProgresso = (e) => {
    const video = videoRef.current;
    if (video) {
      const novoTempo = parseFloat(e.target.value);
      video.currentTime = novoTempo;
      setTempoAtual(novoTempo);
    }
  };

  const formatarTempo = (segundos) => {
    const mins = Math.floor(segundos / 60);
    const secs = Math.floor(segundos % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  let videoSrc = urlVideo;
  if (daltonico && tipoDaltonismo && videosDaltonismo[tipoDaltonismo]) {
    videoSrc = videosDaltonismo[tipoDaltonismo];
  } else if (!daltonico && videosDaltonismo.normal) {
    videoSrc = videosDaltonismo.normal;
  }

  const filtrosDaltonismo = {
    acromatopsia: "grayscale(1)",
    deuteranopia: "contrast(1.2) hue-rotate(60deg)",
    protanopia: "contrast(1.2) hue-rotate(-30deg)",
    tritanopia: "contrast(1.2) hue-rotate(180deg)"
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-screen bg-black overflow-hidden"
      onMouseMove={aoMoverMouse}
      onMouseLeave={() => estaRodando && setMostrarControles(false)}
      style={daltonico ? { filter: filtrosDaltonismo[tipoDaltonismo] } : {}}
    >
      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        loop
        muted={estaMutado}
        playsInline
        src={videoSrc}
        onClick={alternarPlayPause}
      />

      {/* Indicador de play/pause no centro */}
      {!estaRodando && (
        <div 
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          style={{ transition: 'opacity 0.3s' }}
        >
          <div className="bg-black/70 rounded-full p-8 backdrop-blur-sm">
            <FaPlay className="text-white text-6xl ml-2" />
          </div>
        </div>
      )}

      {/* Menu de Daltonismo */}
      {mostrarMenuDaltonismo && (
        <div
          className="absolute bottom-24 right-6 bg-gray-900/95 backdrop-blur-md rounded-lg shadow-2xl border border-gray-700 overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-4 border-b border-gray-700 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FaEye className="text-yellow-400 text-lg" />
              <h3 className="text-white font-semibold">Configurações de Acessibilidade</h3>
            </div>
            <button
              onClick={() => setMostrarMenuDaltonismo(false)}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <FaTimes />
            </button>
          </div>
          
          <div className="p-3">
            <div className="mb-3 flex items-center justify-between bg-gray-800 rounded-lg p-3">
              <span className="text-white text-sm font-medium">Modo Daltonismo</span>
              <button
                onClick={alternarDaltonico}
                className={`relative w-14 h-7 rounded-full transition-colors ${
                  daltonico ? "bg-yellow-400" : "bg-gray-600"
                }`}
              >
                <div
                  className={`absolute top-1 w-5 h-5 bg-white rounded-full shadow-md transition-transform ${
                    daltonico ? "translate-x-8" : "translate-x-1"
                  }`}
                />
              </button>
            </div>

            <div className="space-y-1">
              {tiposDaltonismo.map((tipo) => (
                <button
                  key={tipo.valor}
                  onClick={() => selecionarTipoDaltonismo(tipo.valor)}
                  disabled={!daltonico}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-all ${
                    tipoDaltonismo === tipo.valor && daltonico
                      ? "bg-yellow-500 text-black"
                      : daltonico
                      ? "bg-gray-800 text-white hover:bg-gray-700"
                      : "bg-gray-800/50 text-gray-500 cursor-not-allowed"
                  }`}
                >
                  <div className="font-medium text-sm">{tipo.label}</div>
                  <div className={`text-xs mt-0.5 ${
                    tipoDaltonismo === tipo.valor && daltonico ? "text-black/70" : "text-gray-400"
                  }`}>
                    {tipo.descricao}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

    
      <div
        className={`absolute bottom-0 left-0 right-0 transition-all duration-500 ${
          mostrarControles ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Barra de progresso */}
        <div className="px-6 pb-2">
          <input
            type="range"
            min="0"
            max={duracao || 0}
            value={tempoAtual}
            onChange={mudarProgresso}
            className="w-full h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer transition-all hover:h-1.5"
            style={{
              background: `linear-gradient(to right, #ef4444 0%, #ef4444 ${(tempoAtual / duracao) * 100}%, #4b5563 ${(tempoAtual / duracao) * 100}%, #4b5563 100%)`
            }}
          />
        </div>

      
        <div className="bg-gradient-to-t from-black/95 via-black/85 to-transparent px-6 pb-6 pt-4">
          <div className="flex items-center gap-4">
            {/* Play/Pause */}
            <button
              onClick={alternarPlayPause}
              className="text-white hover:scale-110 transition-transform p-2 hover:bg-white/10 rounded-full"
              aria-label={estaRodando ? 'Pausar' : 'Reproduzir'}
            >
              {estaRodando ? (
                <FaPause className="text-2xl" />
              ) : (
                <FaPlay className="text-2xl" />
              )}
            </button>

            {/* Volume */}
            <div className="flex items-center gap-2 group">
              <button
                onClick={alternarMudo}
                className="text-white hover:scale-110 transition-transform p-2 hover:bg-white/10 rounded-full"
                aria-label={estaMutado ? 'Ativar som' : 'Desativar som'}
              >
                {estaMutado || volume === 0 ? (
                  <FaVolumeMute className="text-xl" />
                ) : (
                  <FaVolumeUp className="text-xl" />
                )}
              </button>
              <input
                type="range"
                min="0"
                max="100"
                value={volume}
                onChange={mudarVolume}
                className="w-0 group-hover:w-20 h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer transition-all duration-300"
                style={{
                  background: `linear-gradient(to right, white 0%, white ${volume}%, #4b5563 ${volume}%, #4b5563 100%)`
                }}
              />
            </div>

            {/* Tempo */}
            <span className="text-white text-sm font-medium">
              {formatarTempo(tempoAtual)} / {formatarTempo(duracao)}
            </span>

            <div className="flex-1" />

            {/* Botão de Configurações de Daltonismo */}
            <button
              onClick={() => setMostrarMenuDaltonismo(!mostrarMenuDaltonismo)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${
                daltonico
                  ? "bg-yellow-500 text-black hover:bg-yellow-400"
                  : "bg-white/10 text-white hover:bg-white/20"
              }`}
            >
              <FaEye className="text-lg" />
              <span className="text-sm font-medium">
                {daltonico ? tiposDaltonismo.find(t => t.valor === tipoDaltonismo)?.label : "Acessibilidade"}
              </span>
              <IoMdSettings className="text-lg" />
            </button>

            {/* Tela cheia */}
            <button
              onClick={alternarTelaCheia}
              className="text-white hover:scale-110 transition-transform p-2 hover:bg-white/10 rounded-full"
              aria-label={estaTelaCheia ? 'Sair da tela cheia' : 'Tela cheia'}
            >
              {estaTelaCheia ? (
                <FaCompress className="text-xl" />
              ) : (
                <FaExpand className="text-xl" />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}