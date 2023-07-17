import "./globals.css";
import { Inter } from "next/font/google";
import Header from "./Components/Header";
import Footer from "./Components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "WeatherApp",
  description: "A fun weather app created and designed by Trevor Brown",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <main className="scroll-snap-y-mandatory ">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
