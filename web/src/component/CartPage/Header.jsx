import { ArrowLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom';

function Header() {
    const navigate = useNavigate();
    return (
        <header className="sticky top-0 z-10 bg-[#FBF3DF]">
            <div className="mx-auto flex max-w-5xl items-center gap-4 px-6 py-4">
                <button
                    onClick={() => navigate(-1)}
                    className="rounded-full p-2 hover:bg-[#241A12]/5 text-[#241A12]"
                >
                    <ArrowLeft size={20} />
                </button>

                <div>
                    <h1 className="text-xl font-bold tracking-tight">Your Cart</h1>
                </div>
            </div>
            <div className="h-px bg-[#241A12]/10" />
        </header>
    )
}

export default Header