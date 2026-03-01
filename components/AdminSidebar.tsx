"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Package, MessageSquare, LogOut, ChevronRight } from "lucide-react";
import { adminLogout } from "@/lib/actions/auth";
import { useTransition } from "react";
import { useRouter } from "next/navigation";

const navItems = [
    { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
    { href: "/admin/packages", label: "Packages", icon: Package, exact: false },
    { href: "/admin/inquiries", label: "Inquiries", icon: MessageSquare, exact: false },
];

export default function AdminSidebar() {
    const pathname = usePathname();
    const [isPending, startTransition] = useTransition();
    const router = useRouter();

    const isActive = (href: string, exact: boolean) =>
        exact ? pathname === href : pathname.startsWith(href);

    const handleLogout = () => {
        startTransition(async () => {
            await adminLogout();
            router.push("/admin/login");
        });
    };

    return (
        <aside className="w-64 min-h-screen bg-navy-900 flex flex-col shadow-2xl">
            {/* Logo */}
            <div className="p-6 border-b border-white/10">
                <Link href="/admin" className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-gold to-gold-300 flex items-center justify-center">
                        <span className="text-navy-900 font-black">F</span>
                    </div>
                    <div>
                        <div className="text-white font-bold text-sm leading-tight">Falcon Holidays</div>
                        <div className="text-gold text-xs leading-tight">Admin Dashboard</div>
                    </div>
                </Link>
            </div>

            {/* Nav */}
            <nav className="flex-1 p-4 space-y-1">
                {navItems.map(({ href, label, icon: Icon, exact }) => {
                    const active = isActive(href, exact);
                    return (
                        <Link
                            key={href}
                            href={href}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${active
                                    ? "bg-gold text-navy-900 shadow-lg shadow-gold/20"
                                    : "text-gray-300 hover:bg-white/10 hover:text-white"
                                }`}
                        >
                            <Icon size={18} />
                            {label}
                            {active && <ChevronRight size={14} className="ml-auto" />}
                        </Link>
                    );
                })}
            </nav>

            {/* View Site Link */}
            <div className="px-4 pb-2">
                <Link
                    href="/"
                    target="_blank"
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-gray-400 hover:text-white hover:bg-white/5 transition-all"
                >
                    <Package size={16} />
                    View Public Site ↗
                </Link>
            </div>

            {/* Logout */}
            <div className="p-4 border-t border-white/10">
                <button
                    onClick={handleLogout}
                    disabled={isPending}
                    className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition-all"
                >
                    <LogOut size={16} />
                    {isPending ? "Logging out..." : "Logout"}
                </button>
            </div>
        </aside>
    );
}
