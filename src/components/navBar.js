"use client";

import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/redux/slices/loginSlice";
import { useState } from "react";

export default function NavBar() {
    const loginState = useSelector((state) => state.login);
    const registerState = useSelector((state) => state.register);
    const dispatch = useDispatch();

    const [open, setOpen] = useState(false);

    const isAuthenticated = loginState.isAuthenticated;
    const rawUser =
        registerState?.user ||
        loginState?.user;

    const userName = rawUser?.nome ?? rawUser ?? "Usuário";

    const handleLogout = () => {
        dispatch(logout());
        setOpen(false);
    };

    return (
        <div className="w-full bg-white shadow-md">
            <div className="container mx-auto px-4 md:px-6 flex items-center justify-between h-20">
                {/* left: hamburger (mobile) + logo */}
                <div className="flex items-center gap-3">
                    <button
                        className="md:hidden p-2 rounded hover:bg-gray-100"
                        aria-label="Abrir menu"
                        onClick={() => setOpen(!open)}
                    >
                        <svg className="w-6 h-6 text-[#211181]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>

                    <Link href="/" className="text-[#211181] font-bold text-2xl md:text-4xl">
                        4HELP
                    </Link>
                </div>

                {/* desktop right area */}
                <div className="hidden md:flex items-center gap-4">
                    {isAuthenticated ? (
                        <>
                            <span className="text-[#211181] font-medium">Olá, <span className="font-bold">{userName}</span></span>
                            <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded font-semibold hover:opacity-90">
                                Logout
                            </button>
                        </>
                    ) : (
                        <Link href="/login" className="text-[#211181] font-semibold hover:opacity-90">
                            Login / Registrar
                        </Link>
                    )}
                </div>

                {/* mobile dropdown */}
                <div className={`absolute top-full right-4 mt-2 md:hidden z-50 ${open ? "block" : "hidden"}`}>
                    <div className="w-56 bg-white border rounded shadow-lg py-2">
                        {isAuthenticated ? (
                            <div className="flex flex-col gap-2 px-3">
                                <span className="text-[#211181] font-medium truncate">{userName}</span>
                                <Link href="/perfil" className="text-gray-700 px-2 py-1 rounded hover:bg-gray-100">Perfil</Link>
                                <button onClick={handleLogout} className="text-left text-red-500 px-2 py-1 rounded hover:bg-gray-100">Logout</button>
                            </div>
                        ) : (
                            <div className="flex flex-col px-3">
                                <Link href="/login" className="text-gray-700 px-2 py-2 rounded hover:bg-gray-100" onClick={() => setOpen(false)}>Login / Registrar</Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}