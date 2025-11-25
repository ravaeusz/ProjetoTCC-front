"use client"

import { useSelector } from "react-redux";
import { useState, useEffect, useRef } from "react";
import { rankTopThree, fetchQuizByCategory, submitAnswers } from "@/api/api";


export default function Home() {

  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [userAnswers, setUserAnswers] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleQuiz = () => {
    setQuizStarted(true);
    setCurrentQuestionIndex(1);
    setUserAnswers([]);
    loadQuestion(1);
  }

  const loginState = useSelector((state) => state.login);
  const isAuthenticated = loginState.isAuthenticated;
  const userId = loginState.userId;
  const token = loginState.token;

  const [general, setGeneral] = useState([]);
  const [school, setSchool] = useState([]);
  const [msg, Setmsg] = useState("");
  const [result, Setresult] = useState("");
  

  const podiumTopThree = async (token) => {
    setGeneral(await rankTopThree(token));
  }

  const loadQuestion = async (questionIndex) => {
    setLoading(true);
    try {
      const data = await fetchQuizByCategory(token);
      const question = Array.isArray(data) ? data[questionIndex - 1] : data;
      setCurrentQuestion(question);
    } catch (err) {
      console.error("Erro ao carregar questão:", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (isAuthenticated && token) {
      podiumTopThree(token);
    }
  }, [token, isAuthenticated]);

  const handleNextQuestion = async (token, userId) => {
    setLoading(true);
    try {
      if (selectedAnswer === currentQuestion.correctAlternative) {
      const result = await submitAnswers(userId, token);
      
      Setmsg(result.msg);
      await new Promise(resolve => setTimeout(resolve, 1000));
      }else if (selectedAnswer !== currentQuestion.correctAlternative){
        
        Setmsg("Resposta incorreta, alternativa correta: " + currentQuestion.correctAlternative);
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    } catch (err) {
      console.error("Erro ao enviar respostas:", err);
    } finally {
      setLoading(false);
    }
    ;

    if (currentQuestion) {
      const isCorrect = selectedAnswer === currentQuestion.correctAlternative;
      setUserAnswers(prev => [
        ...prev,
        {
          questionIndex: currentQuestionIndex,
          selected: selectedAnswer,
          correctAlternative: currentQuestion.correctAlternative,
          isCorrect
        }
      ]);
    }

    ;


    if (currentQuestionIndex < 20) {
      const nextIndex = currentQuestionIndex + 1;
      setCurrentQuestionIndex(nextIndex);
      setSelectedAnswer(null);
      await loadQuestion(nextIndex);
    } else {
      setQuizStarted(false);
      setCurrentQuestionIndex(0);
      setSelectedAnswer(null);
      
      
    }
     Setmsg("");
  }
 


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
        <div className="flex flex-row gap-6 p-6 min-h-screen bg-gray-100 mt-10">
          <div className="flex-1">
            {quizStarted && currentQuestion ? (
              <div className="bg-white p-10 rounded-lg shadow-lg">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-[#211181] mb-2">{currentQuestion.title}</h2>
                  <div className="flex gap-4 text-sm text-gray-600">
                    <span className="font-bold">Disciplina: {currentQuestion.discipline}</span>
                  </div>
                </div>

                {/* CONTEXTO */}
                <div className="mb-6 p-4 bg-gray-50 rounded">
                  <p className="text-gray-700 whitespace-pre-wrap">{currentQuestion.context}</p>
                </div>

                {/* IMAGEM */}
                {currentQuestion.files && currentQuestion.files.length > 0 && (
                  <div className="mb-6 flex justify-center max-w-200">
                    {currentQuestion.files.map((file, idx) => (
                      <img key={idx} src={file} alt={`Questão ${idx}`} className="max-w-full rounded" />
                    ))}
                  </div>
                )}

                {/* Introdução das alternativas */}
                <p className="font-bold text-gray-700 mb-4">{currentQuestion.alternativesIntroduction}</p>

                {/* Alternativas */}
                <div className="space-y-3 mb-8">
                  {currentQuestion.alternatives.map((alt, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedAnswer(alt.letter)}
                      
                      className={`w-full p-4 text-left rounded border-2 font-bold transition ${
                        selectedAnswer === alt.letter
                          ? "border-[#211181] bg-[#211181] text-white"
                          : "border-gray-300 bg-white text-gray-700 hover:border-[#211181]"
                      }`}
                    >
                      {alt.letter}. {alt.text || "(Sem texto)"}
                    </button>
                  ))}
                {msg === "Resposta incorreta, alternativa correta:" + currentQuestion.correctAlternative ? (
                  <p className="mt-4 text-red-600 bg-red-200 p-2 font-bold">{msg}</p>
                ) : (
                  <p className="mt-4 text-green-600  p-2 font-bold">{msg}</p>
                )}

                  
                </div>

                {/* Botões de navegação */}
                <div className="flex gap-4 justify-between">
                  
                  <span className="flex items-center font-bold text-gray-700">
                    Questão {currentQuestionIndex} de 20
                  </span>
                  {currentQuestionIndex === 20 ? (
                    <button
                      onClick={() => {handleNextQuestion(token, userId); podiumTopThree(token);}}
                      className="bg-green-500 text-white py-2 px-4 rounded font-bold hover:opacity-90"
                    >
                      Finalizar
                    </button>
                  ) : (
                    <button
                      onClick={() => {handleNextQuestion(token, userId)}}
                      disabled={loading}
                      className="bg-[#211181] text-white py-2 px-4 rounded font-bold hover:opacity-90 disabled:opacity-50"
                    >
                      {loading ? "Carregando..." : "Próxima →"}
                    </button>
                  )}
                </div>
              </div>
            ) : (
              <div className="bg-white p-10 rounded-lg shadow-lg text-center">
                <h1 className="text-4xl font-bold mb-8 text-[#211181]">Clique no botão abaixo e desafie-se.</h1>
                <div className="flex gap-4 justify-center flex-col">
                  <button
                    onClick={handleQuiz}
                    className="bg-[#211181] text-white py-3 px-6 rounded font-bold hover:opacity-90 text-lg"
                  >
                    Iniciar Quiz Geral
                  </button>
                  <button
                    className="bg-[#211181] text-white py-3 px-6 rounded font-bold hover:bg-gray-400 text-lg"
                  >
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
              {general.length > 0 ? (
                <ul className="space-y-4">
                  {general.map((item, idx) => (
                    <li key={idx} className="flex justify-between items-center p-3 bg-gray-50 rounded hover:bg-gray-100">
                      <span className="font-bold text-[#211181]">{idx+1}º</span>
                      <span className="font-bold">{item.user[0].nome}</span>
                      <span className="font-bold">{item.pontos} pts</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500 text-center">Carregando...</p>
              )}
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h2 className="text-3xl font-bold text-[#211181] text-center mb-6">Ranking Escola</h2>
              {school.length > 0 ? (
                <ul className="space-y-4">
                  {school.map((item, idx) => (
                    <li key={idx} className="flex justify-between items-center p-3 bg-gray-50 rounded hover:bg-gray-100">
                      <span className="font-bold text-[#211181]">{item.key}º</span>
                      <span>{item.nome}</span>
                      <span className="font-bold">{item.pontos} pts</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500 text-center">Carregando...</p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}