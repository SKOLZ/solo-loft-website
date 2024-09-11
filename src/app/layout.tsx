import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "@/styles/globals.scss";
import { Footer } from "./_components/Footer";
import { Header } from "./_components/Header";

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["100", "400", "600"],
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
      <body className={`${poppins.variable} body`}>
        <Header />
        <main className="container main-container">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
