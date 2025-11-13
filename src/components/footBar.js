
    export default function FootBar() {
        return (
            <>
                {/* spacer para reservar espaço quando o footer estiver fixed */}
                <div aria-hidden="true" className="h-24 md:h-24" />

                <footer className="fixed w-full bg-[#211181] text-white py-6 bottom-0 left-0">
                    <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-3 ">
                        <div className="flex items-center gap-3 text-sm">
                            <span className="font-medium">&copy; {new Date().getFullYear()} 4Help</span>
                            <span className="text-white/70">• Todos os direitos reservados.</span>

                            <a
                                href="/infos"
                                className="ml-3 inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 transition px-3 py-1 rounded text-sm underline-offset-2"
                                aria-label="Política de Privacidade (ir para /infos)"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                </svg>
                                Clique aqui para mais informações
                            </a>
                        </div>

                        <div className="text-xs text-white/80 text-center md:text-right">
                            Desenvolvido por <span className="font-semibold">Rafael Girardi</span>
                        </div>
                    </div>
                </footer>
            </>
        );
    }
