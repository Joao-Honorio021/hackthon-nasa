"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "../contexts/ThemeContext";

export default function PaginaConfiguracao() {
  const router = useRouter();
  const { cores, atualizarTema } = useTheme();


  const [idade, definirIdade] = useState("");
  const [tipoDaltonismo, definirTipoDaltonismo] = useState("");
  const [daltonico, definirDaltonico] = useState(false);
  const [carregado, definirCarregado] = useState(false);


  useEffect(() => {
    if (typeof window !== "undefined") {
      definirIdade(localStorage.getItem("idade") || "");
      definirTipoDaltonismo(localStorage.getItem("tipoDaltonismo") || "");
      definirDaltonico(localStorage.getItem("daltonico") === "true");
      definirCarregado(true);
    }
  }, []);


  useEffect(() => {
    if (carregado) {
      localStorage.setItem("idade", idade);
    }
  }, [idade, carregado]);

  useEffect(() => {
    if (carregado) {
      localStorage.setItem("tipoDaltonismo", tipoDaltonismo);
      atualizarTema?.();
    }
  }, [tipoDaltonismo, carregado, atualizarTema]);

  useEffect(() => {
    if (carregado) {
      localStorage.setItem("daltonico", daltonico.toString());
      atualizarTema?.();
    }
  }, [daltonico, carregado, atualizarTema]);

 
  const salvarConfiguracao = (e) => {
    e.preventDefault();
    router.push("/");
  };

  if (!carregado) {
    return null;
  }

  return (
    <div
      className={`flex min-h-screen items-center justify-center ${cores.background}`}
    >
      <div className="w-full max-w-md bg-white/10 backdrop-blur-md rounded-2xl shadow-lg p-8">
        <h1 className={`text-2xl font-bold text-center ${cores.accent} mb-6`}>
          Configurações
        </h1>

        <form onSubmit={salvarConfiguracao} className="space-y-4">
          {/* Idade */}
          <div>
            <label className="block text-gray-200 mb-1">Idade</label>
            <input
              type="number"
              value={idade}
              onChange={(e) => definirIdade(e.target.value)}
              placeholder="Digite sua idade"
              className="w-full p-2 rounded-lg bg-gray-900/50 text-white border border-gray-700 focus:border-cyan-400 focus:ring focus:ring-cyan-400/30"
            />
          </div>

          <div>
            <label className="block text-gray-200 mb-1">
              Tipo de Daltonismo
            </label>
            <select
              value={tipoDaltonismo}
              onChange={(e) => definirTipoDaltonismo(e.target.value)}
              className="w-full p-2 rounded-lg bg-gray-900/50 text-white border border-gray-700 focus:border-cyan-400 focus:ring focus:ring-cyan-400/30"
            >
              <option value="">Selecione</option>
              <option value="deuteranopia">Deuteranopia (verde)</option>
              <option value="protanopia">Protanopia (vermelho)</option>
              <option value="tritanopia">Tritanopia (azul)</option>
              <option value="acromatopsia">Acromatopsia (sem cores)</option>
            </select>
          </div>

          <div className="flex items-center justify-between">
            <label className="text-gray-200">Ativar Modo Daltônico</label>
            <button
              type="button"
              onClick={() => definirDaltonico(!daltonico)}
              className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors duration-300 ${
                daltonico ? "bg-cyan-400" : "bg-gray-600"
              }`}
            >
              <div
                className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform duration-300 ${
                  daltonico ? "translate-x-6" : "translate-x-0"
                }`}
              />
            </button>
          </div>

          <button
            type="submit"
            className="w-full py-2 rounded-lg bg-gradient-to-r from-purple-700 to-cyan-600 text-white font-semibold hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/30 transition-transform duration-300"
          >
            Salvar Configurações
          </button>
        </form>

        <div
          className={`mt-6 p-4 rounded-lg text-center font-semibold ${
            daltonico ? "bg-yellow-200 text-black" : "bg-purple-700 text-white"
          }`}
        >
          {daltonico
            ? `Modo Daltônico Ativado (${tipoDaltonismo || "não selecionado"})`
            : "Modo Padrão Ativo"}
          <br />
          {idade && `Idade: ${idade}`}
        </div>
      </div>
    </div>
  );
}
