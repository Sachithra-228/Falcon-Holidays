"use client";

import { useState, useTransition } from "react";
import { adminLogin } from "@/lib/actions/auth";
import { useRouter } from "next/navigation";
import { Lock, Eye, EyeOff, Loader2 } from "lucide-react";

export default function AdminLoginPage() {
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const [isPending, startTransition] = useTransition();
    const router = useRouter();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!password) { setError("Password is required"); return; }
        startTransition(async () => {
            const result = await adminLogin(password);
            if (result.success) {
                router.push("/admin");
                router.refresh();
            } else {
                setError(result.error || "Invalid password");
            }
        });
    };

    return (
        <div className="min-h-screen bg-navy-900 flex items-center justify-center p-4">
            <div className="relative">
                {/* Background glow */}
                <div className="absolute inset-0 bg-gold/10 rounded-3xl blur-3xl scale-150 pointer-events-none" />

                <div className="relative bg-white rounded-3xl shadow-2xl p-10 w-full max-w-sm">
                    {/* Logo */}
                    <div className="text-center mb-8">
                        <div className="w-16 h-16 mx-auto rounded-2xl bg-navy-900 flex items-center justify-center mb-4 shadow-xl">
                            <Lock size={28} className="text-gold" />
                        </div>
                        <h1 className="text-2xl font-bold text-navy-900">Admin Login</h1>
                        <p className="text-gray-500 text-sm mt-1">Falcon Holidays Dashboard</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label className="label-field">Admin Password</label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => { setPassword(e.target.value); setError(""); }}
                                    placeholder="Enter admin password"
                                    className={`input-field pr-11 ${error ? "border-red-400 focus:ring-red-300 focus:border-red-400" : ""}`}
                                    autoFocus
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                            {error && <p className="mt-1.5 text-sm text-red-500">{error}</p>}
                        </div>

                        <button
                            type="submit"
                            disabled={isPending}
                            className="btn-navy w-full justify-center py-3.5 disabled:opacity-70"
                        >
                            {isPending ? <><Loader2 size={18} className="animate-spin" /> Verifying...</> : "Login to Dashboard"}
                        </button>
                    </form>

                    <p className="text-center text-xs text-gray-400 mt-6">
                        Default password is set in{" "}
                        <code className="bg-gray-100 px-1.5 py-0.5 rounded text-gray-600">.env.local</code>
                    </p>
                </div>
            </div>
        </div>
    );
}
