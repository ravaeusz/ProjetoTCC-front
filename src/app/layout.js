"use client"
import { Provider } from "react-redux";
import store from "@/redux/store";
import NavBar from "@/components/navBar";
import FootBar from "@/components/footBar";
import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>
        <Provider store={store}>
          <NavBar />
          {children}
          <FootBar />    
        </Provider>
      </body>
    </html>
  );
}
