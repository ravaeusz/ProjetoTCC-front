import Link from "next/link";

export default function NavBar() {
    return (
        <div className="relative bg-[#211181] h-20 w-full flex items-center">
            <div className="absolute left-1/2 transform -translate-x-1/2">
                <Link href="/" className="text-white font-bold text-4xl">4HELP</Link>
            </div>
            <div className="ml-auto pr-6">
                <Link href="/login" className="text-white font-bold cursor-pointer">Login/Register</Link>
            </div>
        </div>
    )
}