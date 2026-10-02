import { UtensilsCrossed } from 'lucide-react'

function Header({ name, image }) {
    return (
        <header className="bg-[#FBF3DF] z-20">
            {image && (
                <div className="px-4">
                    <div className="h-24 rounded-2xl overflow-hidden">
                        <img
                            src={image}
                            alt={name}
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>
            )}

            <div className="px-4 pt-4 pb-5">
                <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2 text-[#241A12]">
                    <UtensilsCrossed size={20} className="text-[#D6402C]" />
                    {name}
                </h1>
            </div>
        </header>
    )
}

export default Header