"use client";

export const SimpleLoading = () => {
  return (
    <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
      <div className="text-center">
        {/* Logo/Ícone */}
        <div className="mb-8">
          <div className="w-20 h-20 mx-auto border-4 border-cyan-400 rounded-xl animate-spin-slow flex items-center justify-center">
            <div className="w-3 h-3 bg-cyan-400 rounded-full animate-pulse" />
          </div>
        </div>

        {/* Texto */}
        <div className="space-y-4">
          <h2 className="text-cyan-400 font-mono text-xl font-bold tracking-widest">
            ERICK REIS
          </h2>
          <p className="text-cyan-300 font-mono text-sm animate-pulse">
            INICIANDO SISTEMA...
          </p>

          {/* Barra de progresso simples */}
          <div className="w-64 h-1 bg-cyan-900 rounded-full mx-auto overflow-hidden">
            <div
              className="h-full bg-cyan-400 rounded-full animate-pulse"
              style={{
                animation: "loading-bar 2s ease-in-out infinite",
              }}
            />
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes loading-bar {
          0% {
            transform: translateX(-100%);
          }
          50% {
            transform: translateX(100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        .animate-spin-slow {
          animation: spin-slow 3s linear infinite;
        }
      `}</style>
    </div>
  );
};
