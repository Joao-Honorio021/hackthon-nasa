"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "@/app/contexts/ThemeContext";

export default function PaginaConfiguracao() {
  const router = useRouter();
  const { cores, atualizarTema } = useTheme();

  const [idade, setIdade] = useState("");
  const [tipoDaltonismo, setTipoDaltonismo] = useState("");
  const [daltonico, setDaltonico] = useState(false);
  const [carregado, setCarregado] = useState(false);

  // Carrega dados do localStorage apenas uma vez
  useEffect(() => {
    if (typeof window !== "undefined") {
      const idadeSalva = localStorage.getItem("idade") || "";
      const tipoSalvo = localStorage.getItem("tipoDaltonismo") || "";
      const daltonicoSalvo = localStorage.getItem("daltonico") === "true";
      
      setIdade(idadeSalva);
      setTipoDaltonismo(tipoSalvo);
      setDaltonico(daltonicoSalvo);
      setCarregado(true);
    }
  }, []);

  // Salva idade no localStorage
  useEffect(() => {
    if (carregado && typeof window !== "undefined") {
      localStorage.setItem("idade", idade);
    }
  }, [idade, carregado]);

  // Salva tipoDaltonismo e atualiza tema
  useEffect(() => {
    if (carregado && typeof window !== "undefined") {
      localStorage.setItem("tipoDaltonismo", tipoDaltonismo);
      if (atualizarTema) {
        atualizarTema();
      }
    }
  }, [tipoDaltonismo, carregado, atualizarTema]);

  // Salva estado daltonico e atualiza tema
  useEffect(() => {
    if (carregado && typeof window !== "undefined") {
      localStorage.setItem("daltonico", daltonico.toString());
      if (atualizarTema) {
        atualizarTema();
      }
    }
  }, [daltonico, carregado, atualizarTema]);

  const salvarConfiguracao = (e) => {
    e.preventDefault();
    router.push("/");
  };

  // Loading state
  if (!carregado) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-purple-900 via-blue-900 to-black">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div
      className={`flex min-h-screen items-center justify-center ${cores?.background || 'bg-gradient-to-br from-purple-900 via-blue-900 to-black'}`}
    >
      <div className="w-full max-w-md bg-white/10 backdrop-blur-md rounded-2xl shadow-lg p-8 mx-4">
        <h1 className={`text-2xl font-bold text-center ${cores?.accent || 'text-cyan-400'} mb-6`}>
          Settings
        </h1>

        <form onSubmit={salvarConfiguracao} className="space-y-4">
          {/* Idade */}
          <div>
            <label className="block text-gray-200 mb-1">Age (Years)</label>
            <input
              type="number"
              value={idade}
              onChange={(e) => setIdade(e.target.value)}
              placeholder="Enter your age"
              min="0"
              max="120"
              className="w-full p-2 rounded-lg bg-gray-900/50 text-white border border-gray-700 focus:border-cyan-400 focus:ring focus:ring-cyan-400/30 outline-none"
            />
          </div>

          {/* Tipo de Daltonismo */}
          <div>
            <label className="block text-gray-200 mb-1">
              Colorblind Theme
            </label>
            <select
              value={tipoDaltonismo}
              onChange={(e) => setTipoDaltonismo(e.target.value)}
              className="w-full p-2 rounded-lg bg-gray-900/50 text-white border border-gray-700 focus:border-cyan-400 focus:ring focus:ring-cyan-400/30 outline-none"
            >
              <option value="">Select a theme</option>
              <option value="deuteranopia">Deuteranopia (green deficiency)</option>
              <option value="protanopia">Protanopia (red deficiency)</option>
              <option value="tritanopia">Tritanopia (blue deficiency)</option>
              <option value="acromatopsia">Acromatopsia (no colors)</option>
            </select>
          </div>

          {/* Toggle Daltonico */}
          <div className="flex items-center justify-between py-2">
            <label className="text-gray-200">Enable Colorblind Mode</label>
            <button
              type="button"
              onClick={() => setDaltonico(!daltonico)}
              className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors duration-300 ${
                daltonico ? "bg-cyan-400" : "bg-gray-600"
              }`}
              aria-label="Toggle colorblind mode"
            >
              <div
                className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform duration-300 ${
                  daltonico ? "translate-x-6" : "translate-x-0"
                }`}
              />
            </button>
          </div>

          {/* Botão Salvar */}
          <button
            type="submit"
            className="w-full py-2 rounded-lg bg-gradient-to-r from-purple-700 to-cyan-600 text-white font-semibold hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/30 transition-transform duration-300"
          >
            Save Settings
          </button>
        </form>

        {/* Status Display */}
        <div
          className={`mt-6 p-4 rounded-lg text-center font-semibold transition-colors duration-300 ${
            daltonico ? "bg-yellow-200 text-black" : "bg-purple-700 text-white"
          }`}
        >
          {daltonico
            ? `Colorblind Mode: Active ${tipoDaltonismo ? `(${tipoDaltonismo})` : '(theme not selected)'}`
            : "Standard Mode: Active"}
          {idade && (
            <>
              <br />
              <span className="text-sm">Age: {idade} years</span>
            </>
          )}
        </div>
      </div>
    </div>
  );
}