"use client";

export const SimpleLoading = () => {
  return (
    <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin mb-4" />
        <p className="text-cyan-400 font-mono text-sm">INICIANDO SISTEMA...</p>
      </div>
    </div>
  );
};
