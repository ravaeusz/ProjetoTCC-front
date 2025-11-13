"use client";

import { useState } from "react";

export default function Loged() {
    const [quizStarted, setQuizStarted] = useState(false);

    const handleQuiz = () => {
        setQuizStarted(true);
    }

    return (  
        <div className="flex flex-row gap-6 p-6 min-h-screen bg-gray-100">
            {/* Quiz Section */}
            <div className="flex-1">
                {quizStarted ? (
                    <div className="bg-white p-10 rounded-lg shadow-lg">
                        <h2 className="text-3xl font-bold text-[#211181] mb-6">Quiz Geral</h2>
                        {/* Adicione conteúdo do quiz aqui */}
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
                    <ul className="space-y-4">    
                        <li className="flex justify-between items-center p-3 bg-gray-50 rounded hover:bg-gray-100">
                            <span className="font-bold text-[#211181]">1º</span>
                            <span>User</span>
                            <span className="font-bold">1500 pts</span>
                        </li>
                        <li className="flex justify-between items-center p-3 bg-gray-50 rounded hover:bg-gray-100">
                            <span className="font-bold text-[#211181]">2º</span>
                            <span>User</span>
                            <span className="font-bold">1400 pts</span>
                        </li>
                        <li className="flex justify-between items-center p-3 bg-gray-50 rounded hover:bg-gray-100">
                            <span className="font-bold text-[#211181]">3º</span>
                            <span>User</span>
                            <span className="font-bold">1300 pts</span>
                        </li>
                        <li className="flex justify-between items-center p-3 bg-gray-50 rounded hover:bg-gray-100">
                            <span className="font-bold text-[#211181]">4º</span>
                            <span>User</span>
                            <span className="font-bold">1200 pts</span>
                        </li>
                        <li className="flex justify-between items-center p-3 bg-gray-50 rounded hover:bg-gray-100">
                            <span className="font-bold text-[#211181]">5º</span>
                            <span>User</span>
                            <span className="font-bold">1100 pts</span>
                        </li>     
                    </ul>
                </div>
                <div className="bg-white p-8 rounded-lg shadow-lg">
                    <h2 className="text-3xl font-bold text-[#211181] text-center mb-6">Ranking Escola</h2>
                    <ul className="space-y-4">    
                        <li className="flex justify-between items-center p-3 bg-gray-50 rounded hover:bg-gray-100">
                            <span className="font-bold text-[#211181]">1º</span>
                            <span>User</span>
                            <span className="font-bold">1500 pts</span>
                        </li>
                        <li className="flex justify-between items-center p-3 bg-gray-50 rounded hover:bg-gray-100">
                            <span className="font-bold text-[#211181]">2º</span>
                            <span>User</span>
                            <span className="font-bold">1400 pts</span>
                        </li>
                        <li className="flex justify-between items-center p-3 bg-gray-50 rounded hover:bg-gray-100">
                            <span className="font-bold text-[#211181]">3º</span>
                            <span>User</span>
                            <span className="font-bold">1300 pts</span>
                        </li>
                        <li className="flex justify-between items-center p-3 bg-gray-50 rounded hover:bg-gray-100">
                            <span className="font-bold text-[#211181]">4º</span>
                            <span>User</span>
                            <span className="font-bold">1200 pts</span>
                        </li>
                        <li className="flex justify-between items-center p-3 bg-gray-50 rounded hover:bg-gray-100">
                            <span className="font-bold text-[#211181]">5º</span>
                            <span>User</span>
                            <span className="font-bold">1100 pts</span>
                        </li>     
                    </ul>
                </div>
            </div>
        </div>
    )
}