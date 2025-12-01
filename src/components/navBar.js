"use client";

import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/redux/slices/loginSlice";

export default function NavBar() {
    const dispatch = useDispatch();
    const loginState = useSelector((state) => state.login);
    const registerState = useSelector((state) => state.register);

    const isAuthenticated = loginState.isAuthenticated;
    const rawUser = registerState?.user || loginState?.user;
    const userName = rawUser?.nome ?? rawUser ?? "Usuário";

    const handleLogout = () => {
        dispatch(logout());
    };

    return (
        <div className="w-full bg-white shadow-md">
            <div className="container mx-auto px-4 md:px-6 flex items-center justify-between h-20">
                {/* left: logo + small auth link on mobile */}
                <div className="flex items-center gap-3">
                    <Link href="/" className="text-[#211181] font-bold text-2xl md:text-4xl">
                        4HELP
                    </Link>

                   
                </div>

                {/* right: username + logout icon (or login link if not authenticated) */}
                <div className="flex items-center gap-3">
                    {isAuthenticated ? (
                        <div className="flex items-center gap-3">
                            <span className="text-[#211181] font-medium truncate max-w-[250px]">
                                Olá, <span className="font-bold">{userName}</span>
                            </span>

                            <button
                                onClick={handleLogout}
                                aria-label="Logout"
                                title="Logout"
                                className="p-2 rounded-full bg-red-500 hover:bg-red-600 transition-colors"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7" fill="white" stroke="none"/>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" stroke="currentColor" strokeWidth="2" fill="none"/>       
                                </svg>
                            </button>
                        </div>
                    ) : (
                        <Link href="/login" className="text-[#211181] font-semibold hover:opacity-90">
                            Login / Registrar
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
}