import { Menu, Utensils } from 'lucide-react';

export default function Header({ menu }) {
    return (
        <header className="sticky top-0 z-30 bg-[#FFFFF0]/95 backdrop-blur border-b border-black/5">
            <div className="flex h-14 items-center justify-between px-4">

                <div className="flex min-w-0 items-center gap-2">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#FF5A3C]/10">
                        <Utensils
                            size={20}
                            strokeWidth={2.2}
                            color="#FF5A3C"
                        />
                    </div>

                    <h1 className="truncate text-base font-bold">
                        {menu.restaurant_name || 'Restaurant Menu'}
                    </h1>
                </div>

                <button
                    type="button"
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full hover:bg-black/5 active:bg-black/10"
                    aria-label="Open menu"
                >
                    <Menu size={23} />
                </button>
            </div>
        </header>

    );
}
