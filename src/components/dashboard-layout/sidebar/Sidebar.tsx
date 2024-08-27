'use client'

import { COLORS } from "@/constants/color.constants";
import { Gavel } from "lucide-react";
import Link from "next/link";
import { LogoutButton } from "./LogoutButton";
import { MENU } from "./menu.data";
import { MenuItem } from "./MenuItem";

export function Sidebar() {
    return (
        <aside className="border-r border-r-border h-full bg-sidebar flex flex-col justify-between">
            <div>
                <Link
                    href='/i'
                    className='flex items-center justify-center gap-2.5 p-layout border-b border-b-border'
                >
                    <Gavel
                        color={COLORS.blueHalfTransparent}
                        size={50}
                    />
                    <span className="text-2xl font-bold relative">
                        CZO_Work
                        <span className="absolute -top-1 -right-6 text-xs opacity-40 rotate-[18deg] font-normal">
                            beta
                        </span>
                    </span>
                </Link>

                <div className="py-4 px-2 relative">
                    <LogoutButton />
                    
                    {MENU.map(item => (
                        <MenuItem 
                        item={item}
                        key={item.link}
                        />
                        ))}
                </div>
            </div>

            <footer className="text-xs opacity-40 font-normal text-center p-layout">
                2024 &copy; With love from {''}
                <a 
                    href="https://github.com/ArtHouse379"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-primary text-brand-300 transition-colors"
                >
                    ArtHouse379
                </a>
                . <br /> All rights reserved.
            </footer>

        </aside>
    )
}

