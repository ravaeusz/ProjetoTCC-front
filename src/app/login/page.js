"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Login() {
    const [isLogin, setIsLogin] = useState(true);
    const router = useRouter();

    const handleLoginSubmit = (e) => {
        e.preventDefault();
        router.push("/logado");
    }
    
    return (
        <div className="pt-40 bg-gray-100 flex items-center justify-center min-h-screen">
          <div className="w-full max-w-md">
            {/* Botão de alternância */}
            <div className="flex gap-4 mb-6">
              <button
                onClick={() => setIsLogin(true)}
                className={`flex-1 py-2 font-bold text-lg rounded ${
                  isLogin
                    ? 'bg-[#211181] text-white'
                    : 'bg-gray-300 text-gray-700'
                }`}
              >
                Login
              </button>
              <button
                onClick={() => setIsLogin(false)}
                className={`flex-1 py-2 font-bold text-lg rounded ${
                  !isLogin
                    ? 'bg-[#211181] text-white'
                    : 'bg-gray-300 text-gray-700'
                }`}
              >
                Registrar
              </button>
            </div>
    
            {/* Formulário */}
            <div className="bg-white p-8 rounded-lg shadow-lg">
              {isLogin ? (
                <form onSubmit={handleLoginSubmit} className="space-y-4">
                  <h2 className="text-2xl font-bold text-[#211181] mb-6">Login</h2>
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-[#211181]"
                  />
                  <input
                    type="password"
                    placeholder="Senha"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-[#211181]"
                  />
                  <button
                    type="submit"
                    className="w-full bg-[#211181] text-white py-2 rounded font-bold hover:opacity-90">      
                    Entrar
                  </button>
                </form>
              ) : (
                <form className="space-y-4">
                  <h2 className="text-2xl font-bold text-[#211181] mb-6">Registrar</h2>
                  <input
                    type="text"
                    placeholder="Nome"
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-[#211181]"
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-[#211181]"
                  />
                  <input
                    type="password"
                    placeholder="Senha"
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-[#211181]"
                  />
                  <input
                    type="password"
                    placeholder="Confirmar Senha"
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-[#211181]"
                  />
                  <button
                    type="submit"
                    className="w-full bg-[#211181] text-white py-2 rounded font-bold hover:opacity-90"
                  >
                    Registrar
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
    );
}
