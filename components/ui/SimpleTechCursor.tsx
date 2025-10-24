"use client";

import { useEffect, useRef, useState } from "react";

export const SimpleTechCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isPointer, setIsPointer] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    const cursor = cursorRef.current;
    if (!cursor) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (cursor) {
        cursor.style.left = e.clientX + "px";
        cursor.style.top = e.clientY + "px";
      }

      // Verificar elementos interativos de forma mais abrangente
      const target = e.target as HTMLElement;
      const interactiveSelectors = [
        "button",
        "a",
        '[role="button"]',
        '[class*="cursor-pointer"]',
        '[class*="interactive"]',
        '[class*="directive"]',
        "input",
        "select",
        "textarea",
      ].join(",");

      const isInteractive =
        target.matches(interactiveSelectors) ||
        target.closest(interactiveSelectors) !== null;

      setIsPointer(isInteractive);
    };

    // Também detectar quando o mouse entra/sai de elementos interativos
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactiveSelectors = [
        "button",
        "a",
        '[role="button"]',
        '[class*="cursor-pointer"]',
        '[class*="interactive"]',
        '[class*="directive"]',
      ].join(",");

      if (
        target.matches(interactiveSelectors) ||
        target.closest(interactiveSelectors)
      ) {
        setIsPointer(true);
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactiveSelectors = [
        "button",
        "a",
        '[role="button"]',
        '[class*="cursor-pointer"]',
        '[class*="interactive"]',
        '[class*="directive"]',
      ].join(",");

      if (
        target.matches(interactiveSelectors) ||
        target.closest(interactiveSelectors)
      ) {
        // Só desativa se não estiver entrando em outro elemento interativo
        const relatedTarget = e.relatedTarget as HTMLElement;
        if (
          !relatedTarget?.matches(interactiveSelectors) &&
          !relatedTarget?.closest(interactiveSelectors)
        ) {
          setIsPointer(false);
        }
      }
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseout", handleMouseOut);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
    };
  }, [isClient]);

  // ⚠️ IMPORTANTE: Não renderizar no servidor
  if (!isClient) {
    return null;
  }

  return (
    <div
      ref={cursorRef}
      className="custom-cursor-visible fixed pointer-events-none z-[9999] transform -translate-x-1/2 -translate-y-1/2"
      style={{ left: 0, top: 0 }}
    >
      {/* Círculo principal do cursor - Estilo Tron */}
      <div
        className={`w-12 h-12 rounded-full border-2 transition-all duration-300 ${
          isPointer
            ? "border-cyan-400 bg-cyan-400/20 shadow-[0_0_40px_#00ffff,0_0_80px_#00ffff60,inset_0_0_20px_#00ffff40] scale-150"
            : "border-cyan-300/80 bg-cyan-500/10 shadow-[0_0_20px_#00ffff40,0_0_40px_#00ffff20,inset_0_0_10px_#00ffff20] scale-100"
        } backdrop-blur-sm cursor-pulse`}
      />

      {/* Grade interna do cursor */}
      <div className="absolute inset-1 rounded-full border border-cyan-400/30 pointer-events-none" />
      <div className="absolute inset-2 rounded-full border border-cyan-400/20 pointer-events-none" />

      {/* Núcleo central pulsante - Estilo Processador */}
      <div
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg transition-all duration-300 transform rotate-45 ${
          isPointer
            ? "bg-gradient-to-br from-cyan-400 to-blue-500 w-5 h-5 shadow-[0_0_30px_#00ffff,0_0_60px_#00ffff80,inset_0_0_10px_#00ffff]"
            : "bg-gradient-to-br from-cyan-300 to-blue-400 w-4 h-4 shadow-[0_0_15px_#00ffff,0_0_30px_#00ffff60,inset_0_0_5px_#00ffff]"
        } cursor-core`}
      />

      {/* Cruz central - Estilo Alvo */}
      <div className="absolute top-1/2 left-0 right-0 h-px bg-cyan-400/50 transform -translate-y-1/2" />
      <div className="absolute left-1/2 top-0 bottom-0 w-px bg-cyan-400/50 transform -translate-x-1/2" />

      {/* Partículas orbitais - Cores Tron */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-cyan-400 rounded-full animate-orbit-fast tron-particle-glow" />
      <div className="absolute top-1/2 -right-1 -translate-y-1/2 w-1.5 h-1.5 bg-blue-400 rounded-full animate-orbit-faster tron-particle-glow" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-1.5 h-1.5 bg-cyan-300 rounded-full animate-orbit-fastest tron-particle-glow" />
      <div className="absolute -left-1 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-blue-300 rounded-full animate-orbit-reverse tron-particle-glow" />

      {/* Anéis concêntricos */}
      <div className="absolute inset-0 border border-cyan-400/20 rounded-full animate-ping-slow" />
      <div
        className="absolute inset-2 border border-cyan-400/15 rounded-full animate-ping-slow"
        style={{ animationDelay: "1s" }}
      />

      {/* Partículas extras no hover - Efeito de Sistema Ativado */}
      {isPointer && (
        <>
          <div className="absolute top-1/4 -right-2 w-2 h-2 bg-cyan-400 rounded-full animate-orbit-fast tron-particle-glow-intense" />
          <div className="absolute -left-2 bottom-1/4 w-2 h-2 bg-blue-400 rounded-full animate-orbit-faster tron-particle-glow-intense" />
          <div className="absolute -top-2 left-1/4 w-1.5 h-1.5 bg-cyan-300 rounded-full animate-orbit-fastest tron-particle-glow-intense" />
          <div className="absolute -bottom-2 right-1/4 w-1.5 h-1.5 bg-blue-300 rounded-full animate-orbit-reverse tron-particle-glow-intense" />

          {/* Efeito de pulso expandido */}
          <div className="absolute inset-0 border-2 border-cyan-400/40 rounded-full animate-ping" />
        </>
      )}

      {/* Linhas de conexão quando em hover */}
      {isPointer && (
        <>
          <div className="absolute top-0 left-1/2 w-px h-4 bg-gradient-to-b from-transparent to-cyan-400 -translate-x-1/2 -translate-y-2" />
          <div className="absolute bottom-0 left-1/2 w-px h-4 bg-gradient-to-t from-transparent to-cyan-400 -translate-x-1/2 translate-y-2" />
          <div className="absolute left-0 top-1/2 h-px w-4 bg-gradient-to-r from-transparent to-cyan-400 -translate-y-1/2 -translate-x-2" />
          <div className="absolute right-0 top-1/2 h-px w-4 bg-gradient-to-l from-transparent to-cyan-400 -translate-y-1/2 translate-x-2" />
        </>
      )}
    </div>
  );
};
