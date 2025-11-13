
import "./globals.css";
import NavBar from "@/components/navBar";

export default function RootLayout({ children }) {

  const login = false;

  return (
    <html lang="pt_br">
      <body>
        <NavBar />
        {children}
      </body>
    </html>
  );
}
