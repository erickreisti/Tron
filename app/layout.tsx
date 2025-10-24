import type { Metadata } from "next";
import { Poppins, Open_Sans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { LoadingProvider } from "@/providers/LoadingProvider";
import { CursorWrapper } from "@/components/ui/CursorWrapper";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
});

const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-open-sans",
});

export const metadata: Metadata = {
  title: "Erick Reis | Desenvolvedor FullStack & Arquiteto de Sistemas",
  description: "Portfólio profissional de Erick Reis...",
  // ... resto do metadata
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="dark">
      {" "}
      {/* ← Tema escuro fixo */}
      <head>{/* ... head content */}</head>
      <body
        className={cn(
          "min-h-screen bg-black text-cyan-400 font-sans antialiased overflow-x-hidden", // ← Cores fixas
          poppins.variable,
          openSans.variable
        )}
        suppressHydrationWarning
      >
        <div className="overflow-x-hidden w-full">
          <LoadingProvider>
            <CursorWrapper />
            {children} {/* ← ThemeProvider removido aqui */}
          </LoadingProvider>
        </div>
      </body>
    </html>
  );
}
