"use client";
import { useState, useRef, useEffect } from "react";
import {
  FaPlay,
  FaPause,
  FaVolumeUp,
  FaVolumeMute,
  FaExpand,
  FaCompress,
  FaEye,
  FaTimes,
  FaSpinner,
} from "react-icons/fa";
import { MdHighQuality } from "react-icons/md";
import { useRouter } from "next/navigation";

export default function VideoTelaCheia({
  // Props principais
  videoSrc,
  poster, // imagem de thumbnail opcional
  titulo,

  // Configurações de comportamento
  autoPlay = false,
  loop = false, // Mudei para false para permitir o redirecionamento
  muted = true,
  mostrarControles = true,

  // Opções de qualidade (agora opcional)
  opcoesQualidade = [],

  // Configurações de acessibilidade
  mostrarAcessibilidade = true,

  // Callbacks
  onPlay,
  onPause,
  onEnded,
  onError,
}) {
  // Estados
  const [estaRodando, setEstaRodando] = useState(autoPlay);
  const [estaMutado, setEstaMutado] = useState(muted);
  const [estaTelaCheia, setEstaTelaCheia] = useState(false);
  const [mostrarControlesUI, setMostrarControlesUI] =
    useState(mostrarControles);
  const [daltonico, setDaltonico] = useState(false);
  const [tipoDaltonismo, setTipoDaltonismo] = useState("deuteranopia");
  const [tempoAtual, setTempoAtual] = useState(0);
  const [duracao, setDuracao] = useState(0);
  const [volume, setVolume] = useState(muted ? 0 : 80);
  const [mostrarMenuDaltonismo, setMostrarMenuDaltonismo] = useState(false);
  const [mostrarMenuQualidade, setMostrarMenuQualidade] = useState(false);
  const [qualidadeSelecionada, setQualidadeSelecionada] = useState("auto");
  const [estaCarregando, setEstaCarregando] = useState(false);
  const [erro, setErro] = useState(null);

  // Refs
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const timeoutControlesRef = useRef(null);

  // Router para redirecionamento
  const router = useRouter();

  // Tipos de daltonismo
  const tiposDaltonismo = [
    {
      valor: "deuteranopia",
      label: "Deuteranopia",
      descricao: "Dificuldade com verde",
    },
    {
      valor: "protanopia",
      label: "Protanopia",
      descricao: "Dificuldade com vermelho",
    },
    {
      valor: "tritanopia",
      label: "Tritanopia",
      descricao: "Dificuldade com azul",
    },
    {
      valor: "acromatopsia",
      label: "Acromatopsia",
      descricao: "Visão em preto e branco",
    },
  ];

  // Opções de qualidade padrão (se não for passado via props)
  const opcoesQualidadePadrao = [
    {
      valor: "auto",
      label: "Auto",
      descricao: "Ajuste automático",
    },
    {
      valor: "1080p",
      label: "1080p",
      descricao: "Full HD",
    },
    {
      valor: "720p",
      label: "720p",
      descricao: "HD",
    },
    {
      valor: "480p",
      label: "480p",
      descricao: "SD",
    },
  ];

  const opcoesQualidadeFinal =
    opcoesQualidade.length > 0 ? opcoesQualidade : opcoesQualidadePadrao;

  // Efeito para autoplay
  useEffect(() => {
    if (autoPlay && videoRef.current) {
      videoRef.current.play().catch((err) => {
        console.log("Autoplay bloqueado:", err);
        setErro("Autoplay bloqueado. Clique para reproduzir.");
      });
    }
  }, [autoPlay]);

  // Controles de tempo de exibição
  const aoMoverMouse = () => {
    if (!mostrarControles) return;

    setMostrarControlesUI(true);
    if (timeoutControlesRef.current) {
      clearTimeout(timeoutControlesRef.current);
    }
    timeoutControlesRef.current = setTimeout(() => {
      if (estaRodando) {
        setMostrarControlesUI(false);
        setMostrarMenuDaltonismo(false);
        setMostrarMenuQualidade(false);
      }
    }, 3000);
  };

  // Função para redirecionar
  const redirecionarParaCatalogo = () => {
    console.log("Redirecionando para /catalogo...");
    // Adiciona um pequeno delay para dar feedback visual
    setTimeout(() => {
      router.push("/Pages/Catalogo");
    }, 500);
  };

  // Eventos do vídeo
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const atualizarTempo = () => setTempoAtual(video.currentTime);
    const atualizarDuracao = () => setDuracao(video.duration);
    const aoIniciarCarregamento = () => setEstaCarregando(true);
    const aoTerminarCarregamento = () => setEstaCarregando(false);
    const aoTocar = () => {
      setEstaRodando(true);
      setErro(null);
      onPlay?.();
    };
    const aoPausar = () => {
      setEstaRodando(false);
      onPause?.();
    };
    const aoTerminar = () => {
      console.log("Vídeo terminou - evento ended disparado");
      setEstaRodando(false);
      onEnded?.();

      // REDIRECIONAR PARA /CATALOGO QUANDO O VÍDEO TERMINAR
      redirecionarParaCatalogo();
    };
    const aoErro = (e) => {
      console.error("Erro no vídeo:", e);
      setErro("Erro ao carregar o vídeo");
      setEstaCarregando(false);
      onError?.(e);
    };

    // Verifica se o vídeo já está no final (para casos de recarregamento)
    const verificarSeVideoTerminou = () => {
      if (video.currentTime >= video.duration - 0.5 && video.duration > 0) {
        console.log("Vídeo já está no final, redirecionando...");
        redirecionarParaCatalogo();
      }
    };

    // Adiciona event listeners
    video.addEventListener("timeupdate", atualizarTempo);
    video.addEventListener("loadedmetadata", atualizarDuracao);
    video.addEventListener("loadstart", aoIniciarCarregamento);
    video.addEventListener("canplay", aoTerminarCarregamento);
    video.addEventListener("waiting", aoIniciarCarregamento);
    video.addEventListener("playing", aoTerminarCarregamento);
    video.addEventListener("play", aoTocar);
    video.addEventListener("pause", aoPausar);
    video.addEventListener("ended", aoTerminar);
    video.addEventListener("error", aoErro);
    video.addEventListener("loadedmetadata", verificarSeVideoTerminou);

    // Verificação inicial
    if (video.readyState >= 1) {
      verificarSeVideoTerminou();
    }

    // Cleanup
    return () => {
      video.removeEventListener("timeupdate", atualizarTempo);
      video.removeEventListener("loadedmetadata", atualizarDuracao);
      video.removeEventListener("loadstart", aoIniciarCarregamento);
      video.removeEventListener("canplay", aoTerminarCarregamento);
      video.removeEventListener("waiting", aoIniciarCarregamento);
      video.removeEventListener("playing", aoTerminarCarregamento);
      video.removeEventListener("play", aoTocar);
      video.removeEventListener("pause", aoPausar);
      video.removeEventListener("ended", aoTerminar);
      video.removeEventListener("error", aoErro);
      video.removeEventListener("loadedmetadata", verificarSeVideoTerminou);

      if (timeoutControlesRef.current) {
        clearTimeout(timeoutControlesRef.current);
      }
    };
  }, [onPlay, onPause, onEnded, onError, router]);

  // Controles do vídeo
  const alternarPlayPause = () => {
    const video = videoRef.current;
    if (video) {
      if (estaRodando) {
        video.pause();
      } else {
        video.play().catch((err) => {
          console.error("Erro ao reproduzir:", err);
          setErro("Erro ao reproduzir o vídeo");
        });
      }
    }
  };

  const alternarMudo = () => {
    const video = videoRef.current;
    if (video) {
      video.muted = !estaMutado;
      setEstaMutado(!estaMutado);
      if (!estaMutado && volume === 0) {
        setVolume(50);
        video.volume = 0.5;
      }
    }
  };

  const alternarTelaCheia = () => {
    const container = containerRef.current;
    if (!document.fullscreenElement) {
      container
        ?.requestFullscreen()
        .then(() => {
          setEstaTelaCheia(true);
        })
        .catch((err) => {
          console.log("Erro ao entrar em tela cheia:", err);
        });
    } else {
      document.exitFullscreen().then(() => {
        setEstaTelaCheia(false);
      });
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

  const selecionarTipoDaltonismo = (tipo) => {
    setTipoDaltonismo(tipo);
    setMostrarMenuDaltonismo(false);
  };

  const alternarDaltonico = () => {
    setDaltonico(!daltonico);
  };

  const mudarQualidade = (qualidade) => {
    setQualidadeSelecionada(qualidade);
    setMostrarMenuQualidade(false);
  };

  // Utilitários
  const formatarTempo = (segundos) => {
    if (!segundos || isNaN(segundos)) return "0:00";
    const mins = Math.floor(segundos / 60);
    const secs = Math.floor(segundos % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const filtrosDaltonismo = {
    acromatopsia: "grayscale(1)",
    deuteranopia: "contrast(1.2) hue-rotate(60deg)",
    protanopia: "contrast(1.2) hue-rotate(-30deg)",
    tritanopia: "contrast(1.2) hue-rotate(180deg)",
  };

  // Se não tem vídeo source
  if (!videoSrc) {
    return (
      <div className="relative w-full h-screen bg-black flex items-center justify-center">
        <div className="text-white text-center">
          <div className="text-6xl mb-4">🎬</div>
          <h3 className="text-xl font-semibold mb-2">Vídeo não encontrado</h3>
          <p className="text-gray-400">
            Forneça um caminho de vídeo válido via props
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="relative w-full h-screen bg-black overflow-hidden select-none"
      onMouseMove={aoMoverMouse}
      onMouseLeave={() => estaRodando && setMostrarControlesUI(false)}
      style={daltonico ? { filter: filtrosDaltonismo[tipoDaltonismo] } : {}}
    >
      {/* Vídeo */}
      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        loop={loop} // IMPORTANTE: loop deve ser false para redirecionar
        muted={estaMutado}
        playsInline
        src={videoSrc}
        poster={poster}
        onClick={alternarPlayPause}
        onEnded={() => {
          console.log("onEnded diretamente no video element");
          redirecionarParaCatalogo();
        }}
      />

      {/* Overlay quando o vídeo termina */}
      {tempoAtual >= duracao - 0.5 && duracao > 0 && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/70">
          <div className="text-white text-center p-8">
            <div className="text-4xl mb-4">✅</div>
            <h3 className="text-xl font-semibold mb-2">Vídeo completed</h3>
            <p className="text-gray-300 mb-4">Redirecting to catalog...</p>
            <button
              onClick={redirecionarParaCatalogo}
              className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg transition-colors"
            >
              Go to Catalog Now
            </button>
          </div>
        </div>
      )}

      {/* Mensagem de erro */}
      {erro && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/80">
          <div className="text-white text-center p-8">
            <div className="text-4xl mb-4">⚠️</div>
            <h3 className="text-xl font-semibold mb-2">Erro</h3>
            <p className="text-gray-300 mb-4">{erro}</p>
            <button
              onClick={alternarPlayPause}
              className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg transition-colors"
            >
              Tentar Novamente
            </button>
          </div>
        </div>
      )}

      {/* Indicador de play/pause no centro */}
      {!estaRodando &&
        !estaCarregando &&
        !erro &&
        tempoAtual < duracao - 0.5 && (
          <div
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
            style={{ transition: "opacity 0.3s" }}
          >
            <div className="bg-black/60 rounded-full p-8 backdrop-blur-sm border border-white/20">
              <FaPlay className="text-white text-6xl ml-2" />
            </div>
          </div>
        )}

      {/* Indicador de loading */}
      {estaCarregando && !erro && (
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none bg-black/40"
          style={{ transition: "opacity 0.3s" }}
        >
          <div className="bg-black/70 rounded-full p-8 backdrop-blur-sm border border-white/20">
            <FaSpinner className="text-white text-6xl animate-spin" />
          </div>
        </div>
      )}

      {/* Título (se fornecido) */}
      {titulo && mostrarControlesUI && (
        <div className="absolute top-6 left-6 text-white">
          <h1 className="text-2xl font-bold drop-shadow-lg">{titulo}</h1>
        </div>
      )}

      {/* Menu de Qualidade */}
      {mostrarMenuQualidade && opcoesQualidadeFinal.length > 1 && (
        <div
          className="absolute bottom-24 right-6 bg-gray-900/95 backdrop-blur-md rounded-lg shadow-2xl border border-gray-700 overflow-hidden z-50"
          style={{ minWidth: "200px" }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-3 border-b border-gray-700 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MdHighQuality className="text-blue-400 text-lg" />
              <h3 className="text-white font-semibold text-sm">Qualidade</h3>
            </div>
            <button
              onClick={() => setMostrarMenuQualidade(false)}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <FaTimes size={14} />
            </button>
          </div>

          <div className="p-2 space-y-1">
            {opcoesQualidadeFinal.map((opcao) => (
              <button
                key={opcao.valor}
                onClick={() => mudarQualidade(opcao.valor)}
                className={`w-full text-left px-3 py-2 rounded transition-all text-sm ${
                  qualidadeSelecionada === opcao.valor
                    ? "bg-blue-500 text-white"
                    : "bg-gray-800 text-white hover:bg-gray-700"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span>{opcao.label}</span>
                  {qualidadeSelecionada === opcao.valor && <span>✓</span>}
                </div>
                {opcao.descricao && (
                  <div className="text-xs text-white/70 mt-0.5">
                    {opcao.descricao}
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Menu de Daltonismo */}
      {mostrarMenuDaltonismo && mostrarAcessibilidade && (
        <div
          className="absolute bottom-24 right-6 bg-gray-900/95 backdrop-blur-md rounded-lg shadow-2xl border border-gray-700 overflow-hidden z-50"
          style={{ minWidth: "250px" }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-3 border-b border-gray-700 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FaEye className="text-yellow-400 text-lg" />
              <h3 className="text-white font-semibold text-sm">
                Acessibilidade
              </h3>
            </div>
            <button
              onClick={() => setMostrarMenuDaltonismo(false)}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <FaTimes size={14} />
            </button>
          </div>

          <div className="p-2">
            <div className="mb-2 flex items-center justify-between bg-gray-800 rounded p-2">
              <span className="text-white text-sm">Modo Daltonismo</span>
              <button
                onClick={alternarDaltonico}
                className={`relative w-12 h-6 rounded-full transition-colors ${
                  daltonico ? "bg-yellow-400" : "bg-gray-600"
                }`}
              >
                <div
                  className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-md transition-transform ${
                    daltonico ? "translate-x-6" : "translate-x-0.5"
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
                  className={`w-full text-left px-3 py-2 rounded transition-all text-sm ${
                    tipoDaltonismo === tipo.valor && daltonico
                      ? "bg-yellow-500 text-black"
                      : daltonico
                      ? "bg-gray-800 text-white hover:bg-gray-700"
                      : "bg-gray-800/50 text-gray-500 cursor-not-allowed"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span>{tipo.label}</span>
                    {tipoDaltonismo === tipo.valor && daltonico && (
                      <span>✓</span>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Controles inferiores */}
      {mostrarControles && (
        <div
          className={`absolute bottom-0 left-0 right-0 transition-all duration-300 ${
            mostrarControlesUI
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-4 pointer-events-none"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Barra de progresso */}
          <div className="px-4 pb-1">
            <input
              type="range"
              min="0"
              max={duracao || 0}
              value={tempoAtual}
              onChange={mudarProgresso}
              className="w-full h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer transition-all hover:h-1.5"
              style={{
                background: `linear-gradient(to right, #ef4444 0%, #ef4444 ${
                  (tempoAtual / duracao) * 100
                }%, #4b5563 ${(tempoAtual / duracao) * 100}%, #4b5563 100%)`,
              }}
            />
          </div>

          <div className="bg-gradient-to-t from-black/95 via-black/85 to-transparent px-4 pb-4 pt-2">
            <div className="flex items-center gap-3">
              {/* Play/Pause */}
              <button
                onClick={alternarPlayPause}
                className="text-white hover:scale-110 transition-transform p-2 hover:bg-white/10 rounded-full"
                aria-label={estaRodando ? "Pausar" : "Reproduzir"}
              >
                {estaRodando ? (
                  <FaPause className="text-xl" />
                ) : (
                  <FaPlay className="text-xl" />
                )}
              </button>

              {/* Volume */}
              <div className="flex items-center gap-2 group">
                <button
                  onClick={alternarMudo}
                  className="text-white hover:scale-110 transition-transform p-2 hover:bg-white/10 rounded-full"
                  aria-label={estaMutado ? "Ativar som" : "Desativar som"}
                >
                  {estaMutado || volume === 0 ? (
                    <FaVolumeMute className="text-lg" />
                  ) : (
                    <FaVolumeUp className="text-lg" />
                  )}
                </button>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={volume}
                  onChange={mudarVolume}
                  className="w-0 group-hover:w-16 h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer transition-all duration-300"
                  style={{
                    background: `linear-gradient(to right, white 0%, white ${volume}%, #4b5563 ${volume}%, #4b5563 100%)`,
                  }}
                />
              </div>

              {/* Tempo */}
              <span className="text-white text-sm font-medium min-w-[100px]">
                {formatarTempo(tempoAtual)} / {formatarTempo(duracao)}
              </span>

              <div className="flex-1" />

              {/* Qualidade (se tiver opções) */}
              {opcoesQualidadeFinal.length > 1 && (
                <button
                  onClick={() => {
                    setMostrarMenuQualidade(!mostrarMenuQualidade);
                    setMostrarMenuDaltonismo(false);
                  }}
                  className="flex items-center gap-2 px-3 py-1 rounded bg-white/10 text-white hover:bg-white/20 transition-all text-sm"
                >
                  <MdHighQuality className="text-lg" />
                  <span>
                    {
                      opcoesQualidadeFinal.find(
                        (q) => q.valor === qualidadeSelecionada
                      )?.label
                    }
                  </span>
                </button>
              )}

              {/* Acessibilidade */}
              {mostrarAcessibilidade && (
                <button
                  onClick={() => {
                    setMostrarMenuDaltonismo(!mostrarMenuDaltonismo);
                    setMostrarMenuQualidade(false);
                  }}
                  className={`flex items-center gap-2 px-3 py-1 rounded transition-all text-sm ${
                    daltonico
                      ? "bg-yellow-500 text-black hover:bg-yellow-400"
                      : "bg-white/10 text-white hover:bg-white/20"
                  }`}
                >
                  <FaEye className="text-sm" />
                  <span>Vision</span>
                </button>
              )}

              {/* Tela cheia */}
              <button
                onClick={alternarTelaCheia}
                className="text-white hover:scale-110 transition-transform p-2 hover:bg-white/10 rounded-full"
                aria-label={estaTelaCheia ? "Sair da tela cheia" : "Tela cheia"}
              >
                {estaTelaCheia ? (
                  <FaCompress className="text-lg" />
                ) : (
                  <FaExpand className="text-lg" />
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
