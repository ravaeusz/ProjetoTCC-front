"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginStart, loginSuccess, loginError } from "@/redux/slices/loginSlice";
import { registerStart, registerSuccess, registerError } from "@/redux/slices/registerSlice";
import { loginUser, registerUser } from "@/api/api";

export default function Login() {
    const [user , setUser] = useState([])
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [nome, setNome] = useState("");
    const [escola, setEscola] = useState("");
    const [ROLE, setROLE] = useState("");
    const router = useRouter();
    const dispatch = useDispatch();
    const loginState = useSelector((state) => state.login);
    const registerState = useSelector((state) => state.register);

    const userEmail = registerState?.user || "Usuário";

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        dispatch(loginStart());
        try {
            const data = await loginUser({ email, senha });
            console.log(data);
            dispatch(loginSuccess(data));
            router.push("/");
        } catch (err) {
            const message = err.response?.data?.message || err.message;
            dispatch(loginError(message));
        }
    };

    const handleRegisterSubmit = async (e) => {
      e.preventDefault();
      dispatch(registerStart());
      try {
        
        const payload = { nome, email, senha, escola, ROLE };
      
        const data = await registerUser(payload);
        console.log(data);
       
        setUser(data);
        dispatch(registerSuccess(data));
      } catch (err) {
        const message = err.response?.data?.message || err.message;
        dispatch(registerError(message));
      }
    };

    return (
        <div className="pt-20 bg-gray-100 flex items-center justify-center ">
          
          <div className="w-full max-w-md mt-10">
            <h1 className="text-4xl font-bold text-center text-[#211181] mb-5">Bem-vindo</h1>
            <p className="text-center mb-10">Por favor, faça login ou registre-se para continuar.</p>
            <div className="flex gap-4 mb-6">
              <button
                onClick={() => setIsLogin(true)}
                className={`flex-1 py-2 font-bold text-lg rounded ${ isLogin ? 'bg-[#211181] text-white' : 'bg-gray-300 text-gray-700' }`}
              >
                Login
              </button>
              <button
                onClick={() => setIsLogin(false)}
                className={`flex-1 py-2 font-bold text-lg rounded ${ !isLogin ? 'bg-[#211181] text-white' : 'bg-gray-300 text-gray-700' }`}
              >
                Registrar
              </button>
            </div>
            <div className="relative bg-white p-8 rounded-lg shadow-lg">
            
             
              {isLogin ? (
                <form onSubmit={handleLoginSubmit} className="space-y-4">
                  
                  <h2 className="text-2xl font-bold text-[#211181] mb-6">Login</h2>
                  {loginState.error && <p className="text-red-500">{loginState.error}</p>}
                  <input type="email"  placeholder={userEmail}  value={email} onChange={(e)=>setEmail(e.target.value)} required className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-[#211181]" />
                  <input type="password" placeholder="Senha" value={senha} onChange={(e)=>setSenha(e.target.value)} required className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-[#211181]" />
                  <button type="submit" className="w-full bg-[#211181] text-white py-2 rounded font-bold hover:opacity-90">{loginState.loading ? "Carregando..." : "Entrar"}</button>
                </form>
              ) : (
                <form onSubmit={handleRegisterSubmit} className="space-y-4">
                  <h2 className="text-2xl font-bold text-[#211181] mb-6">Registrar</h2>
                  {registerState.error && <p className="text-red-500">{registerState.error}</p>}
                  <input type="text"  placeholder="Nome" value={nome} onChange={(e)=>setNome(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-[#211181]" />
                  <input type="email" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-[#211181]" />
                  <input type="password" placeholder="Senha" value={senha} onChange={(e)=>setSenha(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-[#211181]" />
                  <input type="text" placeholder="Escola" value={escola} onChange={(e)=>setEscola(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-[#211181]" />
                  <input type="text" placeholder="Função" value={ROLE} onChange={(e)=>setROLE(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-[#211181]" />
                  <button type="submit" className="w-full bg-[#211181] text-white py-2 rounded font-bold hover:opacity-90">{registerState.loading ? "Carregando..." : "Registrar"}</button>
                </form>
              )}
              
            </div>
          </div>
        </div>
    );
}
