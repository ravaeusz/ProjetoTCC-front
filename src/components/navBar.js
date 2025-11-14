import Link from "next/link";

export default function NavBar() {
    return (
        <div className="relative bg-white h-20 w-full flex items-center border-b border-[#221181] py-10 hover:shadow-md transition-shadow">
            <div className="absolute left-1/2 transform -translate-x-1/2">
                <Link href="/" className="text-[#211181]font-bold text-4xl">4HELP</Link>
            </div>
            <div className="ml-auto pr-6">
                <Link href="/login" className="text-[#211181]font-bold cursor-pointer">Login/Register</Link>
            </div>
        </div>
    )
}