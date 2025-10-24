"use client";

import { useEffect, useRef } from "react";

export const SimpleLoading = () => {
  const loadingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!loadingRef.current) return;

    // Importação dinâmica do GSAP apenas no cliente
    import("gsap").then((gsapModule) => {
      const gsap = gsapModule.default || gsapModule;

      const ctx = gsap.context(() => {
        // Timeline principal
        const masterTL = gsap.timeline();

        // 1. Sistema de inicialização
        masterTL
          // Grid Tron aparecendo
          .fromTo(
            ".tron-grid-loading",
            { opacity: 0, scale: 0.8 },
            { opacity: 1, scale: 1, duration: 1.5, ease: "power3.out" }
          )
          // Processador central
          .fromTo(
            ".core-processor",
            {
              scale: 0,
              rotation: -180,
              opacity: 0,
            },
            {
              scale: 1,
              rotation: 0,
              opacity: 1,
              duration: 1.2,
              ease: "back.out(1.7)",
            },
            "-=1"
          )
          // Animações orbitais
          .fromTo(
            ".orbit-particle",
            { scale: 0, opacity: 0 },
            {
              scale: 1,
              opacity: 1,
              duration: 0.8,
              stagger: 0.1,
              ease: "power2.out",
            },
            "-=0.5"
          )
          // Texto do sistema
          .fromTo(
            ".system-text",
            { y: 50, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.8,
              ease: "power3.out",
            },
            "-=0.3"
          )
          // Barra de progresso
          .fromTo(
            ".progress-bar",
            { scaleX: 0 },
            {
              scaleX: 1,
              duration: 2.5,
              ease: "power2.inOut",
            },
            "-=0.5"
          )
          // Partículas de dados
          .fromTo(
            ".data-stream",
            { x: -100, opacity: 0 },
            {
              x: 0,
              opacity: 1,
              duration: 1,
              stagger: 0.2,
              ease: "power2.out",
            },
            "-=1.5"
          );

        // 2. Animações contínuas
        // Rotação do processador
        gsap.to(".core-processor", {
          rotation: 360,
          duration: 8,
          repeat: -1,
          ease: "none",
        });

        // Pulsação do núcleo
        gsap.to(".core-pulse", {
          scale: 1.2,
          opacity: 0.8,
          duration: 1.5,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });

        // Partículas orbitais
        gsap.to(".orbit-particle", {
          rotation: 360,
          duration: 3,
          repeat: -1,
          ease: "none",
          stagger: 0.5,
        });

        // Scanlines
        gsap.to(".scan-line", {
          y: "100%",
          duration: 2,
          repeat: -1,
          ease: "none",
          stagger: 0.5,
        });

        // Efeito de dados fluindo
        gsap.to(".data-bit", {
          y: -20,
          opacity: 0,
          duration: 1.5,
          repeat: -1,
          stagger: 0.1,
          ease: "power1.in",
        });
      }, loadingRef);

      return () => ctx.revert();
    });
  }, []);

  return (
    <div
      ref={loadingRef}
      className="fixed inset-0 bg-black z-50 overflow-hidden"
    >
      {/* Grade de Fundo Tron Animada */}
      <div className="tron-grid-loading absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-blue-500/3 to-purple-500/5" />

        {/* Linhas da grade */}
        {[...Array(20)].map((_, i) => (
          <div
            key={`h-${i}`}
            className="absolute h-px bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent"
            style={{ top: `${i * 5}%`, width: "100%" }}
          />
        ))}
        {[...Array(20)].map((_, i) => (
          <div
            key={`v-${i}`}
            className="absolute w-px bg-gradient-to-b from-transparent via-cyan-400/20 to-transparent"
            style={{ left: `${i * 5}%`, height: "100%" }}
          />
        ))}
      </div>

      {/* Scan Lines */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="scan-line absolute h-px bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent"
            style={{
              top: `${i * 20}%`,
              width: "100%",
              filter: "blur(1px)",
            }}
          />
        ))}
      </div>

      {/* Conteúdo Principal */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen">
        {/* Sistema Central */}
        <div className="relative mb-12">
          {/* Anéis Concêntricos */}
          <div
            className="absolute inset-0 border-2 border-cyan-400/30 rounded-full animate-ping"
            style={{
              width: "200px",
              height: "200px",
              top: "-100px",
              left: "-100px",
            }}
          />
          <div
            className="absolute inset-0 border border-cyan-400/20 rounded-full"
            style={{
              width: "160px",
              height: "160px",
              top: "-80px",
              left: "-80px",
            }}
          />

          {/* Processador Central */}
          <div className="core-processor relative">
            <div className="core-pulse w-24 h-24 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-lg transform rotate-45 shadow-2xl shadow-cyan-400/50 relative">
              {/* Grade Interna */}
              <div className="absolute inset-2 border border-cyan-300/50 rounded-sm" />
              <div className="absolute inset-4 bg-cyan-400/20 rounded-sm" />

              {/* Cruz Central */}
              <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-cyan-300/60 transform -translate-y-1/2" />
              <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-cyan-300/60 transform -translate-x-1/2" />
            </div>

            {/* Partículas Orbitais */}
            <div className="orbit-particle absolute top-0 left-1/2 -translate-x-1/2 -translate-y-4 w-3 h-3 bg-cyan-400 rounded-full shadow-lg shadow-cyan-400" />
            <div className="orbit-particle absolute top-1/2 right-0 translate-x-4 -translate-y-1/2 w-3 h-3 bg-blue-400 rounded-full shadow-lg shadow-blue-400" />
            <div className="orbit-particle absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-4 w-3 h-3 bg-cyan-300 rounded-full shadow-lg shadow-cyan-300" />
            <div className="orbit-particle absolute top-1/2 left-0 -translate-x-4 -translate-y-1/2 w-3 h-3 bg-blue-300 rounded-full shadow-lg shadow-blue-300" />
          </div>
        </div>

        {/* Texto do Sistema */}
        <div className="system-text text-center mb-8">
          <h2 className="text-2xl font-mono font-bold text-cyan-300 mb-4 tracking-widest">
            SYSTEM_INITIALIZATION
          </h2>
          <div className="text-cyan-400 font-mono text-sm mb-2">
            <span className="text-green-400">●</span> CORE_SYSTEMS_ONLINE
          </div>
          <div className="text-cyan-400 font-mono text-sm">
            <span className="text-blue-400">●</span> TRON_ARCHITECTURE_ACTIVE
          </div>
        </div>

        {/* Stream de Dados */}
        <div className="data-stream flex space-x-2 mb-8">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="data-bit w-1 h-6 bg-gradient-to-t from-cyan-400 to-blue-400 rounded-full opacity-60"
              style={{ animationDelay: `${i * 0.1}s` }}
            />
          ))}
        </div>

        {/* Barra de Progresso Avançada */}
        <div className="w-80 max-w-full px-8">
          <div className="relative">
            {/* Track da barra */}
            <div className="h-3 bg-slate-800/50 rounded-full border border-cyan-400/20 overflow-hidden backdrop-blur-sm">
              {/* Barra de progresso animada */}
              <div className="progress-bar h-full bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-300 rounded-full relative overflow-hidden">
                {/* Efeito de brilho */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer" />

                {/* Partículas na barra */}
                <div className="absolute top-0 left-1/4 w-1 h-1 bg-white rounded-full animate-ping" />
                <div
                  className="absolute top-0 left-2/3 w-1 h-1 bg-cyan-200 rounded-full animate-ping"
                  style={{ animationDelay: "0.3s" }}
                />
              </div>
            </div>

            {/* Texto de porcentagem */}
            <div className="flex justify-between mt-2">
              <span className="text-cyan-400 font-mono text-xs">
                BOOT_SEQUENCE
              </span>
              <span className="text-cyan-300 font-mono text-xs font-bold">
                87%
              </span>
            </div>
          </div>
        </div>

        {/* Status do Sistema */}
        <div className="mt-8 flex space-x-6">
          {[
            { text: "MEMORY", status: "OK", color: "text-green-400" },
            { text: "PROCESSOR", status: "ACTIVE", color: "text-blue-400" },
            { text: "NETWORK", status: "SYNC", color: "text-cyan-400" },
          ].map((item, index) => (
            <div key={index} className="text-center">
              <div className="text-cyan-500 font-mono text-xs">{item.text}</div>
              <div className={`font-mono text-xs font-bold ${item.color}`}>
                {item.status}
              </div>
            </div>
          ))}
        </div>

        {/* Efeitos de Partículas de Fundo */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-cyan-400/30 rounded-full animate-float-slow"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${Math.random() * 8 + 4}s`,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
