"use client";

import Link from "next/link";
import Image from "next/image";
import { Github, Instagram, Heart, Rocket, Sparkles } from "lucide-react";

const XIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    fill="currentColor"
    viewBox="0 0 24 24"
  >
    <path d="M13.795 10.533 20.68 2h-3.073l-5.255 6.517L7.69 2H1l7.806 10.91L1.47 22h3.074l5.705-7.07L15.31 22H22l-8.205-11.467Zm-2.38 2.95L9.97 11.464 4.36 3.627h2.31l4.528 6.317 1.443 2.02 6.018 8.409h-2.31l-4.934-6.89Z" />
  </svg>
);

const socialLinks = [
  {
    icon: Github,
    href: "https://github.com/erickreisti",
    label: "GitHub",
  },
  {
    icon: Instagram,
    href: "https://www.instagram.com/ereislimati/",
    label: "Instagram",
  },
  {
    icon: XIcon,
    href: "https://x.com/ereislima",
    label: "X",
  },
];

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="w-full border-t border-cyan-800/50 bg-black pt-12 lg:pt-20 pb-8 lg:pb-16 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900" />
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-cyan-500/10 rounded-full blur-3xl" />
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-blue-500/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col items-center justify-between lg:flex-row mb-12 lg:mb-16">
          <Link
            href="#hero"
            className="group flex items-center space-x-3 lg:space-x-4 mb-6 lg:mb-0 interactive"
            onClick={(e) => {
              e.preventDefault();
              scrollToTop();
            }}
          >
            <div className="relative">
              <div className="h-16 w-16 lg:h-20 lg:w-20 rounded-xl lg:rounded-2xl flex items-center justify-center overflow-hidden shadow-2xl">
                <Image
                  src="/images/hashblue.svg"
                  alt="Erick Reis - Full Stack Developer"
                  width={64}
                  height={64}
                  className="h-14 w-14 lg:h-18 lg:w-18 object-contain filter brightness-125"
                  style={{ width: "auto", height: "auto" }}
                />
              </div>
            </div>

            <div className="flex flex-col">
              <span className="text-xl lg:text-2xl font-black text-white bg-gradient-to-r from-white to-cyan-100 bg-clip-text text-transparent">
                Érick Reis
              </span>
              <span className="text-xs lg:text-sm text-cyan-400 font-mono tracking-widest">
                FULLSTACK DEV
              </span>
            </div>
          </Link>

          <div className="flex space-x-3 lg:space-x-4">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.label}
                className="group relative flex items-center justify-center h-12 w-12 lg:h-14 lg:w-14 rounded-xl lg:rounded-2xl bg-cyan-900/60 backdrop-blur-xl border border-cyan-400/20 text-cyan-300 transition-all duration-500 hover:bg-cyan-500/10 hover:border-cyan-400/40 hover:scale-110 hover:shadow-2xl hover:shadow-cyan-500/20 hover:text-white interactive"
              >
                <link.icon className="h-5 w-5 lg:h-6 lg:w-6 transition-transform duration-300 group-hover:scale-110" />
              </a>
            ))}
          </div>
        </div>

        <div className="w-full h-px bg-gradient-to-r from-transparent via-cyan-500/20 via-50% to-transparent mb-6 lg:mb-8" />

        <div className="flex flex-col items-center space-y-6 lg:space-y-0 lg:flex-row lg:justify-between">
          <div className="text-center lg:text-left order-2 lg:order-1">
            <p className="text-cyan-400 text-sm font-mono font-bold tracking-wide flex flex-col lg:flex-row items-center space-y-1 lg:space-y-0 lg:space-x-2">
              <span>© {currentYear} ÉRICK REIS</span>
              <span className="hidden lg:inline text-cyan-400">•</span>
              <span>TODOS OS DIREITOS</span>
            </p>
          </div>

          <div className="flex items-center space-x-2 lg:space-x-3 text-cyan-400 text-sm font-mono font-bold tracking-wide order-1 lg:order-2">
            <div className="flex items-center space-x-2 px-3 lg:px-4 py-2 rounded-lg lg:rounded-xl bg-cyan-900/40 backdrop-blur-sm border border-cyan-700/50">
              <Rocket className="h-3.5 w-3.5 lg:h-4 lg:w-4 text-cyan-400" />
              <span className="hidden sm:inline">DESENVOLVIDO</span>
              <Heart className="h-3.5 w-3.5 lg:h-4 lg:w-4 text-red-500" />
              <span className="text-cyan-400 font-semibold bg-gradient-to-r from-cyan-400 to-cyan-400 bg-clip-text text-transparent text-xs lg:text-sm">
                ÉRICK
              </span>
            </div>
          </div>

          <button
            onClick={scrollToTop}
            className="group relative text-cyan-400 text-xs lg:text-sm font-mono font-bold tracking-wide flex items-center space-x-2 lg:space-x-3 px-4 lg:px-5 py-2.5 lg:py-3 rounded-lg lg:rounded-xl bg-cyan-900/40 backdrop-blur-sm border border-cyan-700/50 hover:border-cyan-400/30 hover:bg-cyan-500/10 transition-all duration-300 order-3 interactive"
          >
            <div className="flex items-center space-x-1 lg:space-x-2">
              <Rocket className="h-3.5 w-3.5 lg:h-4 lg:w-4" />
              <span className="hidden sm:inline">VOLTAR AO TOPO</span>
              <span className="sm:hidden">TOPO</span>
            </div>
          </button>
        </div>

        <div className="mt-8 lg:mt-12 text-center">
          <div className="inline-flex items-center space-x-2 lg:space-x-4 bg-cyan-900/40 backdrop-blur-xl px-4 lg:px-6 py-3 lg:py-4 rounded-xl lg:rounded-2xl border border-cyan-700/50 interactive">
            <Sparkles className="h-4 w-4 lg:h-5 lg:w-5 text-cyan-400" />
            <p className="text-cyan-400 text-xs lg:text-sm font-mono font-bold tracking-widest">
              PRONTO PARA DESAFIOS! 🚀
            </p>
          </div>
        </div>

        <div className="mt-6 lg:mt-8 text-center">
          <p className="text-cyan-600 text-xs font-mono px-2">
            {"</>"} COM 💙 POR ERICK REIS • NEXT.JS • TS • TAILWIND
          </p>
        </div>
      </div>
    </footer>
  );
};
