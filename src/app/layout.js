
import "./globals.css";
import NavBar from "@/components/navBar";
import FootBar from "@/components/footBar"; 

export default function RootLayout({ children }) {

  const login = false;

  return (
    <html lang="pt_br">
      <body>
        <NavBar />
      {children}
        <FootBar />
      </body>
    </html>
  );
}
