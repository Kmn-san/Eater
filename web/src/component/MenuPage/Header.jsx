import { UtensilsCrossed } from 'lucide-react'


function Header() {
    return (
        <header className="overflow-hidden px-4 pt-5 pb-4 relative top-0 bg-[#FBF3DF] z-20">
            <div
                className="pointer-events-none absolute inset-0 opacity-[0.06]"
            />
            <div className="relative flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
                        <UtensilsCrossed size={20} className="text-[#D6402C]" />
                        Restaurant Menu
                    </h1>
                </div>
            </div>
        </header>
    )
}

export default Header