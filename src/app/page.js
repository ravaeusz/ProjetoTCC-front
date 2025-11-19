"use client"

import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { rankTopThree } from "@/api/api";

export default function Home() {

  const [quizStarted, setQuizStarted] = useState(false);
  

    const handleQuiz = () => {
        setQuizStarted(true);
    }

  const loginState = useSelector((state) => state.login);
  const isAuthenticated = loginState.isAuthenticated;
  const token = loginState.token;
    const [general, setGeneral] = useState([]);
    const [school, setSchool] = useState([]);



  const podiumTopThree = async (token) => {
        setGeneral(await rankTopThree(token));
  }

  //const podiumSchool = async (token) => {
  //      setSchool(await rankTopSchool(token));
  //}

    useEffect(() => {
      podiumTopThree(token)
      //podiumSchool(token)
        
    }, [token]);
  

return (
    <>
        {!isAuthenticated ? (
            <div className="min-h-screen flex items-start justify-center pt-60 text-center">
                <div>
                    <h1 className="text-4xl font-bold mb-4">Bem vindo ao 4HELP</h1>
                    <p className="text-lg max-w-md">
                        Esta é a página inicial. Use a barra de navegação para fazer login ou registrar-se.
                    </p>
                </div>
            </div>
        ) : (
            <div className="flex flex-row gap-6 p-6 min-h-screen bg-gray-100 mt-20">
                 
                    <div className="flex-1">
                            {quizStarted ? (
                                    <div className="bg-white p-10 rounded-lg shadow-lg">
                                            <h2 className="text-3xl font-bold text-[#211181] mb-6">Quiz Geral</h2>
                            
                                            <p className="text-gray-600 mb-6">Conteúdo do quiz será exibido aqui</p>
                                            <button 
                                                    onClick={() => setQuizStarted(false)}
                                                    className="bg-gray-500 text-white py-2 px-4 rounded font-bold hover:opacity-90">
                                                    Voltar
                                            </button>
                                    </div>
                            ) : (
                                    <div className="bg-white p-10 rounded-lg shadow-lg text-center">
                                            <h1 className="text-4xl font-bold mb-8 text-[#211181]">Clique no botão abaixo e desafie-se.</h1>
                                            <div className="flex gap-4 justify-center flex-col">
                                                    <button 
                                                            onClick={handleQuiz}
                                                            className="bg-[#211181] text-white py-3 px-6 rounded font-bold hover:opacity-90 text-lg">      
                                                            Iniciar Quiz Geral
                                                    </button> 
                                                    <button 
                                                            onClick={() => alert("Temporariamente indisponível")}
                                                            className="bg-[#211181] text-white py-3 px-6 rounded font-bold hover:bg-gray-400  text-lg">      
                                                            Iniciar Por Disciplinas
                                                    </button> 
                                            </div>   
                                    </div>
                            )}
                    </div>

                    {/* Ranking Section */}
                    <div className="w-80 flex flex-col gap-6">
                            <div className="bg-white p-8 rounded-lg shadow-lg">
                                    <h2 className="text-3xl font-bold text-[#211181] text-center mb-6">Ranking Geral</h2>
                                    {general.map(item => (
                                            <ul className="space-y-4" key={item.key}>    
                                            <li className="flex justify-between items-center p-3 bg-gray-50 rounded hover:bg-gray-100">
                                                    <span className="font-bold text-[#211181]">{item.key}º</span>
                                                    <span>{item.nome}</span>
                                                    <span className="font-bold">{item.pontos}</span>
                                            </li>
                                            </ul>
                                            ))}   
                            </div>
                            <div className="bg-white p-8 rounded-lg shadow-lg">
                            <h2 className="text-3xl font-bold text-[#211181] text-center mb-6">Ranking Escola</h2>
                            {school.map(item => (                  
                                    <ul className="space-y-4" key={item.key}>    
                                            <li className="flex justify-between items-center p-3 bg-gray-50 rounded hover:bg-gray-100">
                                                    <span className="font-bold text-[#211181]">{item.key}</span>
                                                    <span>{item.nome}</span>
                                                    <span className="font-bold">{item.pontos}</span>
                                            </li>
                                            </ul>
                         ))}
                            
                            </div>
                    </div>
            </div>
        )}
    </>
);
}