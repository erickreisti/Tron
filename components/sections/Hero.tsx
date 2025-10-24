"use client";

import Link from "next/link";
import { Download, Mail, Cpu, CircuitBoard, CpuIcon } from "lucide-react";
import { useRef, useEffect, useState, useCallback } from "react";
import gsap from "gsap";
import MotionDiv from "@/components/ui/MotionDiv";
import { Button } from "@/components/ui/button";

export const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const checkMobile = useCallback(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isMobile) {
        const x = (e.clientX / window.innerWidth - 0.5) * 40;
        const y = (e.clientY / window.innerHeight - 0.5) * 40;
        setMousePosition({ x, y });
      }
    },
    [isMobile]
  );

  // Criar grade de circuito Tron
  const createTronGrid = useCallback(() => {
    if (!gridRef.current || isMobile) return;

    const gridContainer = gridRef.current;
    gridContainer.innerHTML = "";

    // Linhas horizontais
    for (let i = 0; i < 20; i++) {
      const line = document.createElement("div");
      line.className = "grid-line horizontal";
      line.style.cssText = `
        top: ${i * 5}%;
        animation-delay: ${Math.random() * 2}s;
      `;
      gridContainer.appendChild(line);
    }

    // Linhas verticais
    for (let i = 0; i < 20; i++) {
      const line = document.createElement("div");
      line.className = "grid-line vertical";
      line.style.cssText = `
        left: ${i * 5}%;
        animation-delay: ${Math.random() * 2}s;
      `;
      gridContainer.appendChild(line);
    }

    // Partículas de dados
    for (let i = 0; i < 50; i++) {
      const particle = document.createElement("div");
      particle.className = "data-particle";
      particle.style.cssText = `
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        animation-delay: ${Math.random() * 5}s;
        animation-duration: ${Math.random() * 3 + 2}s;
      `;
      gridContainer.appendChild(particle);
    }

    // Nós de conexão
    for (let i = 0; i < 30; i++) {
      const node = document.createElement("div");
      node.className = "grid-node";
      node.style.cssText = `
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        animation-delay: ${Math.random() * 4}s;
      `;
      gridContainer.appendChild(node);
    }
  }, [isMobile]);

  // Animações GSAP para elementos Tron
  const animateTronElements = useCallback(() => {
    if (!gridRef.current || isMobile) return;

    const particles = gridRef.current.querySelectorAll(".data-particle");
    const nodes = gridRef.current.querySelectorAll(".grid-node");

    particles.forEach((particle) => {
      gsap.to(particle, {
        x: `+=${Math.random() * 200 - 100}`,
        y: `+=${Math.random() * 200 - 100}`,
        rotation: 360,
        duration: Math.random() * 8 + 8,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
      });
    });

    nodes.forEach((node) => {
      gsap.to(node, {
        scale: Math.random() * 0.5 + 0.8,
        duration: Math.random() * 2 + 1,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    });
  }, [isMobile]);

  useEffect(() => {
    setMounted(true);
    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, [checkMobile]);

  // Efeitos de animação principais
  useEffect(() => {
    if (!mounted || !heroRef.current) return;

    const ctx = gsap.context(() => {
      // Timeline principal
      const masterTimeline = gsap.timeline({
        defaults: { ease: "power3.out" },
      });

      masterTimeline
        .fromTo(".tron-grid", { opacity: 0 }, { opacity: 1, duration: 2 })
        .fromTo(
          ".central-processor",
          { scale: 0, rotation: -180 },
          {
            scale: 1,
            rotation: 0,
            duration: 1.5,
            ease: "back.out(1.7)",
          },
          "-=1.5"
        )
        .fromTo(
          ".title-line-1",
          {
            y: isMobile ? 60 : 120,
            opacity: 0,
            skewX: 30,
          },
          {
            y: 0,
            opacity: 1,
            skewX: 0,
            duration: isMobile ? 1 : 1.4,
            ease: "power4.out",
          },
          "-=1"
        )
        .fromTo(
          ".title-line-2",
          {
            y: isMobile ? 60 : 120,
            opacity: 0,
            skewX: -30,
          },
          {
            y: 0,
            opacity: 1,
            skewX: 0,
            duration: isMobile ? 1 : 1.4,
            ease: "power4.out",
          },
          isMobile ? "-=0.8" : "-=1"
        )
        .fromTo(
          ".system-status",
          {
            y: 40,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
          },
          "-=0.6"
        )
        .fromTo(
          ".directive-text",
          {
            y: 30,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
          },
          "-=0.4"
        )
        .fromTo(
          ".directive-primary",
          {
            y: 50,
            opacity: 0,
            scale: 0.8,
          },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.7,
            ease: "back.out(1.5)",
          },
          "-=0.3"
        )
        .fromTo(
          ".directive-secondary",
          {
            y: 50,
            opacity: 0,
            scale: 0.8,
          },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.7,
            ease: "back.out(1.5)",
          },
          "-=0.5"
        );

      // Criar e animar grade Tron
      if (!isMobile) {
        createTronGrid();
        setTimeout(() => {
          animateTronElements();
        }, 500);
      }

      // Animações contínuas para o processador central
      if (!isMobile) {
        gsap.to(".central-processor", {
          rotation: 360,
          duration: 20,
          repeat: -1,
          ease: "none",
        });

        gsap.to(".core-pulse", {
          scale: 1.2,
          opacity: 0.8,
          duration: 2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }
    }, heroRef);

    if (!isMobile) {
      window.addEventListener("mousemove", handleMouseMove, { passive: true });
    }

    return () => {
      ctx.revert();
      if (!isMobile) {
        window.removeEventListener("mousemove", handleMouseMove);
      }
    };
  }, [mounted, isMobile, handleMouseMove, createTronGrid, animateTronElements]);

  const parallaxStyle = !isMobile
    ? {
        transform: `translate3d(${mousePosition.x * 0.1}px, ${
          mousePosition.y * 0.1
        }px, 0) rotateX(${mousePosition.y * 0.05}deg) rotateY(${
          mousePosition.x * 0.05
        }deg)`,
      }
    : {};

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  if (!mounted) {
    return (
      <section className="min-h-screen relative overflow-hidden bg-black pt-16 pb-16 md:pt-32 md:pb-32">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="min-h-[70vh] md:min-h-[75vh] flex items-center justify-center">
            <div className="text-center space-y-4">
              <div className="h-16 w-16 md:h-20 md:w-20 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-lg animate-pulse mx-auto tron-glow" />
              <div className="h-6 w-48 md:h-8 md:w-64 bg-gray-900 rounded animate-pulse mx-auto" />
              <div className="h-3 w-32 md:h-4 md:w-48 bg-gray-900 rounded animate-pulse mx-auto" />
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={heroRef}
      id="hero"
      className="min-h-screen relative overflow-hidden bg-black pt-16 pb-16 md:pt-32 md:pb-32"
    >
      {/* Grade de Fundo Tron */}
      <div
        ref={gridRef}
        className="tron-grid absolute inset-0 overflow-hidden opacity-40"
      />

      {/* Processador Central */}
      <div className="central-processor absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0">
        <div className="relative">
          {/* Anéis concêntricos */}
          <div
            className="absolute inset-0 border-2 border-cyan-400/30 rounded-full animate-ping-slow tron-glow"
            style={{
              width: "120px",
              height: "120px",
              top: "-60px",
              left: "-60px",
            }}
          />
          <div
            className="absolute inset-0 border border-cyan-400/20 rounded-full"
            style={{
              width: "200px",
              height: "200px",
              top: "-100px",
              left: "-100px",
            }}
          />

          {/* Núcleo do processador */}
          <div className="core-pulse relative w-20 h-20 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-lg transform rotate-45 tron-glow-intense">
            <div className="absolute inset-2 border border-cyan-300/50 rounded-sm" />
            <div className="absolute inset-4 bg-cyan-400/20 rounded-sm" />
          </div>

          {/* Partículas orbitais */}
          {!isMobile && (
            <>
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-8 w-2 h-2 bg-cyan-400 rounded-full tron-glow animate-orbit-fast" />
              <div className="absolute right-0 top-1/2 translate-x-8 -translate-y-1/2 w-2 h-2 bg-blue-400 rounded-full tron-glow animate-orbit-faster" />
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-8 w-2 h-2 bg-cyan-300 rounded-full tron-glow animate-orbit-fastest" />
              <div className="absolute left-0 top-1/2 -translate-x-8 -translate-y-1/2 w-2 h-2 bg-blue-300 rounded-full tron-glow animate-orbit-reverse" />
            </>
          )}
        </div>
      </div>

      {/* Efeitos de Luz */}
      <div className="light-effects absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl animate-pulse-slow" />
        <div
          className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse-slow"
          style={{ animationDelay: "2s" }}
        />
        <div
          className="absolute top-2/3 left-1/3 w-48 h-48 bg-cyan-400/5 rounded-full blur-2xl animate-pulse-slow"
          style={{ animationDelay: "4s" }}
        />
      </div>

      {/* Conteúdo Principal */}
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="min-h-[70vh] md:min-h-[75vh] flex flex-col items-center justify-center text-center">
          {/* Título Principal */}
          <div className="main-title mb-8 md:mb-12" style={parallaxStyle}>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-mono font-black text-white mb-6 md:mb-8 leading-tight tracking-tighter">
              <span className="title-line-1 block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-300 mb-4 md:mb-6 tron-text-glow">
                SYSTEM_ACTIVATION
              </span>
              <span className="title-line-2 block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-300 tron-text-glow">
                USER_INTERFACE
              </span>
            </h1>
          </div>

          {/* Status do Sistema */}
          <MotionDiv
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="system-status mb-6 md:mb-8"
          >
            <div className="inline-flex items-center space-x-3 bg-black/50 backdrop-blur-xl border border-cyan-500/30 rounded-lg px-6 py-3 tron-glow">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse tron-glow" />
                <span className="text-sm font-mono font-bold text-cyan-300 uppercase tracking-widest">
                  Status: Online
                </span>
              </div>
              <div className="h-4 w-px bg-cyan-500/50" />
              <div className="flex items-center space-x-2">
                <CpuIcon className="h-4 w-4 text-blue-400" />
                <span className="text-sm font-mono font-bold text-blue-300 uppercase tracking-widest">
                  Core: Active
                </span>
              </div>
            </div>
          </MotionDiv>

          {/* Descrição */}
          <MotionDiv
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="directive-text mb-8 md:mb-10"
          >
            <p className="text-lg sm:text-xl md:text-2xl font-mono text-cyan-100/90 font-light max-w-2xl leading-relaxed tracking-wide">
              <span className="text-cyan-300 font-bold">DIGITAL_CONSTRUCT</span>{" "}
              <span className="text-white">//</span>{" "}
              <span className="text-blue-300 font-bold">SYSTEM_ARCHITECT</span>{" "}
              <span className="text-white">//</span>{" "}
              <span className="text-cyan-300 font-bold">CODE_GENERATOR</span>
            </p>
          </MotionDiv>

          {/* Identificação do Programa */}
          <div className="program-identifier mb-8 md:mb-10">
            <div
              className="inline-flex items-center space-x-4 bg-black/40 backdrop-blur-2xl border border-cyan-500/20 rounded-xl px-6 py-4 tron-glow hover-glow transition-all duration-500 group cursor-pointer"
              style={parallaxStyle}
            >
              <CircuitBoard className="h-5 w-5 text-cyan-400 group-hover:text-cyan-300 transition-colors duration-300" />
              <span className="text-sm font-mono font-medium text-cyan-200/80">
                Program:
              </span>
              <div className="h-4 w-px bg-cyan-500/30" />
              <span className="text-base font-mono font-bold text-white group-hover:text-cyan-300 transition-colors duration-300">
                ERICK_REIS.exe
              </span>
              <div className="h-4 w-px bg-cyan-500/30" />
              <div className="flex items-center space-x-2 group-hover:scale-110 transition-transform duration-300">
                <Cpu className="h-4 w-4 text-blue-400 animate-pulse" />
                <span className="text-xs font-mono font-bold text-blue-300 uppercase tracking-wider">
                  v2.0.24
                </span>
              </div>
            </div>
          </div>

          {/* Diretivas Principais */}
          <div className="directive-section">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6 w-full">
              <Button
                asChild
                size={isMobile ? "default" : "lg"}
                className="directive-primary group relative bg-gradient-to-r from-cyan-600/90 to-blue-600/90 hover:from-cyan-500 hover:to-blue-500 text-white font-mono font-bold text-base md:text-lg w-full sm:w-auto px-8 md:px-12 py-6 md:py-7 rounded-lg border border-cyan-400/50 tron-glow-intense hover-glow-intense transition-all duration-500 hover:scale-105 overflow-hidden"
                style={parallaxStyle}
              >
                <Link href="#contact">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                  <Mail className="mr-3 h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
                  INITIATE_PROTOCOL
                </Link>
              </Button>

              <Button
                asChild
                variant="outline"
                size={isMobile ? "default" : "lg"}
                className="directive-secondary group relative bg-black/50 backdrop-blur-xl border-cyan-400/40 text-cyan-100 hover:bg-cyan-950/30 font-mono font-semibold text-base md:text-lg w-full sm:w-auto px-6 md:px-10 py-6 md:py-7 rounded-lg tron-glow hover-glow transition-all duration-500 hover:scale-105 overflow-hidden"
                style={parallaxStyle}
              >
                <a href="/docs/curriculo-erick-reis.pdf" download>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                  <Download className="mr-3 h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
                  DOWNLOAD_SYSTEM
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Indicador de Scroll */}
      <div className="scroll-indicator absolute bottom-4 md:bottom-8 left-1/2 -translate-x-1/2 z-30">
        <button
          onClick={() => scrollToSection("about")}
          className="flex flex-col items-center space-y-2 md:space-y-3 group cursor-pointer transition-all duration-300 hover:scale-110"
          aria-label="Access next sector"
        >
          <span className="text-cyan-300/80 text-xs font-mono font-light tracking-widest group-hover:text-cyan-300 transition-colors duration-300">
            ACCESS_NEXT_SECTOR
          </span>
          <div className="w-px h-12 md:h-16 bg-gradient-to-b from-cyan-400 to-transparent relative overflow-hidden rounded-full">
            <div className="absolute top-0 w-full h-4 md:h-6 bg-gradient-to-b from-cyan-400 to-blue-400 rounded-full animate-bounce tron-glow" />
          </div>
        </button>
      </div>
    </section>
  );
};
