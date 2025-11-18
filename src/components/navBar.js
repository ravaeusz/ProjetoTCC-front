"use client";

import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/redux/slices/loginSlice";




export default function NavBar() {
    const loginState = useSelector((state) => state.login);
    const registerState = useSelector((state) => state.register);
    const dispatch = useDispatch();

    const isAuthenticated = loginState.isAuthenticated;
    const userName =
        registerState?.user ||
        loginState?.user

    const handleLogout = () => {
        dispatch(logout());
    };

    return (
        <div className="fixed top-0 left-0 right-0 bg-[#211181] h-20 w-full flex items-center z-50 shadow-md">
            <div className="absolute left-1/2 transform -translate-x-1/2">
                <Link href="/" className="text-white font-bold text-4xl">4HELP</Link>
            </div>
            <div className="ml-auto pr-6 flex items-center gap-4">
                {isAuthenticated ? (
                    <>
                        <span className="text-white font-bold">Olá, {userName}!</span>
                        <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded font-bold hover:opacity-90">
                            Logout
                        </button>
                    </>
                ) : (
                    <Link href="/login" className="text-white font-bold cursor-pointer hover:opacity-90">
                        Login/Register
                    </Link>
                )}
            </div>
        </div>
    )
}