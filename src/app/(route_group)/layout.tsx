import Navbar from "@/components/Navbar";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "EventRegister::Badges",
    description: "List of All the Badges you currently own.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="w-full">
            <Navbar />
            {children}
        </div>
    );
}
