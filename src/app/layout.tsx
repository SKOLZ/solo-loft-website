import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "@/styles/globals.scss";
import { Footer } from "./_components/Footer";
import { Header } from "./_components/Header";
import { PageTransition } from "./_components/PageTransition";
import { Toaster } from "react-hot-toast";

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["100", "300", "600"],
});

export const metadata: Metadata = {
  title: "Solo Loft",
  description:
    "Explora una selección exclusiva de propiedades en venta y alquiler, que incluye apartamentos, casas y espacios comerciales. Ya sea que busques comprar, alquilar o invertir, nuestros anuncios ofrecen información detallada, fotos e información sobre la ubicación para ayudarte a encontrar la opción perfecta. Comienza tu búsqueda hoy y da el primer paso hacia tu propiedad ideal.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body id="root" className={`${poppins.variable} body`}>
        <Header />
        <PageTransition>{children}</PageTransition>
        <Footer />
        <Toaster
          toastOptions={{
            style: {
              background: "#111",
              border: "1px solid #222",
              color: "#fff",
              fontSize: "0.875rem",
            },
            position: "bottom-right",
          }}
        />
      </body>
    </html>
  );
}
