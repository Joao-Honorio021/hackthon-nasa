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
  FaTimes,
  FaCog
} from 'react-icons/fa';
import { IoMdSettings } from 'react-icons/io';
import { MdHighQuality } from 'react-icons/md';

export default function VideoTelaCheia({
  cloudinaryId = "samples/sea-turtle",
  cloudName = "demo",
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
  const [mostrarMenuQualidade, setMostrarMenuQualidade] = useState(false);
  const [qualidadeSelecionada, setQualidadeSelecionada] = useState("auto");
  const [estaCarregando, setEstaCarregando] = useState(false);
  
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const timeoutControlesRef = useRef(null);

  const tiposDaltonismo = [
    { valor: "deuteranopia", label: "Deuteranopia", descricao: "Dificuldade com verde" },
    { valor: "protanopia", label: "Protanopia", descricao: "Dificuldade com vermelho" },
    { valor: "tritanopia", label: "Tritanopia", descricao: "Dificuldade com azul" },
    { valor: "acromatopsia", label: "Acromatopsia", descricao: "Visão em preto e branco" }
  ];

  const opcoesQualidade = [
    { 
      valor: "auto", 
      label: "Auto", 
      descricao: "Ajuste automático",
      cloudinaryParams: "q_auto"
    },
    { 
      valor: "2160p", 
      label: "2160p (4K)", 
      descricao: "Ultra HD",
      cloudinaryParams: "h_2160,q_auto:best"
    },
    { 
      valor: "1080p", 
      label: "1080p", 
      descricao: "Full HD",
      cloudinaryParams: "h_1080,q_auto:good"
    },
    { 
      valor: "720p", 
      label: "720p", 
      descricao: "HD",
      cloudinaryParams: "h_720,q_auto:good"
    },
    { 
      valor: "480p", 
      label: "480p", 
      descricao: "SD",
      cloudinaryParams: "h_480,q_auto:low"
    },
    { 
      valor: "360p", 
      label: "360p", 
      descricao: "Baixa",
      cloudinaryParams: "h_360,q_auto:low"
    }
  ];

  const gerarUrlCloudinary = (qualidade) => {
    const opcao = opcoesQualidade.find(q => q.valor === qualidade);
    const params = opcao ? opcao.cloudinaryParams : "q_auto";
    return `https://res.cloudinary.com/${cloudName}/video/upload/${params}/${cloudinaryId}.mp4`;
  };

  const aoMoverMouse = () => {
    setMostrarControles(true);
    if (timeoutControlesRef.current) {
      clearTimeout(timeoutControlesRef.current);
    }
    timeoutControlesRef.current = setTimeout(() => {
      if (estaRodando) {
        setMostrarControles(false);
        setMostrarMenuDaltonismo(false);
        setMostrarMenuQualidade(false);
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

  const mudarQualidade = (qualidade) => {
    const video = videoRef.current;
    if (video) {
      const tempoAtualSalvo = video.currentTime;
      const estavaTocando = !video.paused;
      
      setQualidadeSelecionada(qualidade);
      setMostrarMenuQualidade(false);
      setEstaCarregando(true);
      
      setTimeout(() => {
        video.currentTime = tempoAtualSalvo;
        if (estavaTocando) {
          video.play().catch(err => console.error('Erro ao reproduzir:', err));
        }
      }, 100);
    }
  };

  // Calcula a URL do vídeo
  let videoSrc = gerarUrlCloudinary(qualidadeSelecionada);
  if (daltonico && tipoDaltonismo && videosDaltonismo[tipoDaltonismo]) {
    videoSrc = videosDaltonismo[tipoDaltonismo];
  } else if (!daltonico && videosDaltonismo.normal) {
    videoSrc = videosDaltonismo.normal;
  }

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const atualizarTempo = () => setTempoAtual(video.currentTime);
    const atualizarDuracao = () => setDuracao(video.duration);
    const aoIniciarCarregamento = () => setEstaCarregando(true);
    const aoTerminarCarregamento = () => setEstaCarregando(false);
    const aoTocar = () => setEstaRodando(true);
    const aoPausar = () => setEstaRodando(false);
    const aoTerminar = () => setEstaRodando(false);

    video.addEventListener('timeupdate', atualizarTempo);
    video.addEventListener('loadedmetadata', atualizarDuracao);
    video.addEventListener('waiting', aoIniciarCarregamento);
    video.addEventListener('canplay', aoTerminarCarregamento);
    video.addEventListener('playing', aoTerminarCarregamento);
    video.addEventListener('play', aoTocar);
    video.addEventListener('pause', aoPausar);
    video.addEventListener('ended', aoTerminar);

    return () => {
      video.removeEventListener('timeupdate', atualizarTempo);
      video.removeEventListener('loadedmetadata', atualizarDuracao);
      video.removeEventListener('waiting', aoIniciarCarregamento);
      video.removeEventListener('canplay', aoTerminarCarregamento);
      video.removeEventListener('playing', aoTerminarCarregamento);
      video.removeEventListener('play', aoTocar);
      video.removeEventListener('pause', aoPausar);
      video.removeEventListener('ended', aoTerminar);
    };
  }, []);

  const alternarPlayPause = () => {
    const video = videoRef.current;
    if (video) {
      if (estaRodando) {
        video.pause();
        setEstaRodando(false);
        setMostrarControles(true);
        if (timeoutControlesRef.current) {
          clearTimeout(timeoutControlesRef.current);
        }
      } else {
        video.play().catch(err => console.error('Erro ao reproduzir:', err));
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
        key={videoSrc}
      />

      {/* Indicador de play/pause no centro */}
      {!estaRodando && !estaCarregando && (
        <div 
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          style={{ transition: 'opacity 0.3s' }}
        >
          <div className="bg-black/70 rounded-full p-8 backdrop-blur-sm">
            <FaPlay className="text-white text-6xl ml-2" />
          </div>
        </div>
      )}

      {/* Indicador de loading */}
      {estaCarregando && (
        <div 
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          style={{ transition: 'opacity 0.3s' }}
        >
          <div className="bg-black/70 rounded-full p-8 backdrop-blur-sm">
            <div className="w-16 h-16 border-4 border-white/30 border-t-white rounded-full animate-spin" />
          </div>
        </div>
      )}

      {/* Menu de Qualidade */}
      {mostrarMenuQualidade && (
        <div
          className="absolute bottom-24 right-6 bg-gray-900/95 backdrop-blur-md rounded-lg shadow-2xl border border-gray-700 overflow-hidden"
          style={{ minWidth: '280px' }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-4 border-b border-gray-700 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MdHighQuality className="text-blue-400 text-xl" />
              <h3 className="text-white font-semibold">Qualidade do Vídeo</h3>
            </div>
            <button
              onClick={() => setMostrarMenuQualidade(false)}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <FaTimes />
            </button>
          </div>
          
          <div className="p-3 space-y-1">
            {opcoesQualidade.map((opcao) => (
              <button
                key={opcao.valor}
                onClick={() => mudarQualidade(opcao.valor)}
                className={`w-full text-left px-4 py-3 rounded-lg transition-all relative overflow-hidden ${
                  qualidadeSelecionada === opcao.valor
                    ? "bg-blue-500 text-white"
                    : "bg-gray-800 text-white hover:bg-gray-700"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="font-medium text-sm">{opcao.label}</div>
                    <div className={`text-xs mt-0.5 ${
                      qualidadeSelecionada === opcao.valor ? "text-white/80" : "text-gray-400"
                    }`}>
                      {opcao.descricao}
                    </div>
                  </div>
                  {qualidadeSelecionada === opcao.valor && (
                    <div className="text-lg ml-2">✓</div>
                  )}
                </div>
              </button>
            ))}
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
                  className={`w-full text-left px-4 py-3 rounded-lg transition-all relative overflow-hidden ${
                    tipoDaltonismo === tipo.valor && daltonico
                      ? "bg-yellow-500 text-black"
                      : daltonico
                      ? "bg-gray-800 text-white hover:bg-gray-700"
                      : "bg-gray-800/50 text-gray-500 cursor-not-allowed"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-xl ${
                      tipoDaltonismo === tipo.valor && daltonico
                        ? "bg-black/10"
                        : daltonico
                        ? "bg-gray-700"
                        : "bg-gray-700/50"
                    }`}>
                      {tipo.valor === "deuteranopia" && "🟢"}
                      {tipo.valor === "protanopia" && "🔴"}
                      {tipo.valor === "tritanopia" && "🔵"}
                      {tipo.valor === "acromatopsia" && "⚫"}
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-sm">{tipo.label}</div>
                      <div className={`text-xs mt-0.5 ${
                        tipoDaltonismo === tipo.valor && daltonico ? "text-black/70" : "text-gray-400"
                      }`}>
                        {tipo.descricao}
                      </div>
                    </div>
                    {tipoDaltonismo === tipo.valor && daltonico && (
                      <div className="text-lg">✓</div>
                    )}
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

            {/* Botão de Qualidade */}
            <button
              onClick={() => {
                setMostrarMenuQualidade(!mostrarMenuQualidade);
                setMostrarMenuDaltonismo(false);
              }}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-all"
            >
              <MdHighQuality className="text-xl" />
              <span className="text-sm font-medium">
                {opcoesQualidade.find(q => q.valor === qualidadeSelecionada)?.label}
              </span>
            </button>

            {/* Botão de Configurações de Daltonismo */}
            <button
              onClick={() => {
                setMostrarMenuDaltonismo(!mostrarMenuDaltonismo);
                setMostrarMenuQualidade(false);
              }}
              className={`relative flex items-center gap-2 px-4 py-2 rounded-full transition-all ${
                daltonico
                  ? "bg-yellow-500 text-black hover:bg-yellow-400"
                  : "bg-white/10 text-white hover:bg-white/20"
              }`}
            >
              <FaEye className="text-lg" />
              <span className="text-sm font-medium">
                {daltonico ? tiposDaltonismo.find(t => t.valor === tipoDaltonismo)?.label : "Acessibilidade"}
              </span>
              {daltonico && (
                <span className="absolute -top-1 -right-1 flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-yellow-400"></span>
                </span>
              )}
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