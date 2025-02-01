"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const Navbar = () => {
    const pathname = usePathname();
    return (
        <header className="w-full h-16 center-content fixed z-10 bg-light shadow-md">
            <nav className="lg:w-1/3 flex justify-between font-bold text-lg text-accent">
                <Link
                    className={`${
                        pathname === "/events" && "border-b-2"
                    } hover:text-dark hover:border-black w-24 text-center border-accent`}
                    href="/events"
                >
                    Events
                </Link>

                <Link
                    className={`${
                        pathname === "/me" && "border-b-2"
                    } hover:text-dark hover:border-black w-24 text-center border-accent`}
                    href="/me"
                >
                    Profile
                </Link>
            </nav>
        </header>
    );
};

export default Navbar;
