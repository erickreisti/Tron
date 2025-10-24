"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { SimpleLoading } from "@/components/ui/SimpleLoading";

interface LoadingContextType {
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

const LoadingContext = createContext<LoadingContextType>({
  isLoading: true,
  setIsLoading: () => {},
});

export const useLoading = () => useContext(LoadingContext);

export const LoadingProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // ⚠️ CRÍTICO: Não renderizar nada até montar no cliente
  if (!isMounted) {
    return (
      <LoadingContext.Provider value={{ isLoading: true, setIsLoading }}>
        <div className="min-h-screen bg-black" />
      </LoadingContext.Provider>
    );
  }

  return (
    <LoadingContext.Provider value={{ isLoading, setIsLoading }}>
      {isLoading && <SimpleLoading />}
      <div
        className={
          isLoading
            ? "opacity-0"
            : "opacity-100 transition-opacity duration-500"
        }
      >
        {children}
      </div>
    </LoadingContext.Provider>
  );
};
