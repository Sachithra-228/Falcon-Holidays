"use server";

import { cookies } from "next/headers";

const ADMIN_SESSION_COOKIE = "falcon_admin_session";

export async function adminLogin(password: string): Promise<{ success: boolean; error?: string }> {
    const adminPassword = process.env.ADMIN_PASSWORD;
    if (!adminPassword) {
        return { success: false, error: "Server configuration error" };
    }
    if (password !== adminPassword) {
        return { success: false, error: "Invalid password" };
    }
    const cookieStore = await cookies();
    cookieStore.set(ADMIN_SESSION_COOKIE, "authenticated", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24, // 24 hours
        path: "/",
    });
    return { success: true };
}

export async function adminLogout() {
    const cookieStore = await cookies();
    cookieStore.delete(ADMIN_SESSION_COOKIE);
    return { success: true };
}

export async function checkAdminAuth(): Promise<boolean> {
    const cookieStore = await cookies();
    const session = cookieStore.get(ADMIN_SESSION_COOKIE);
    return session?.value === "authenticated";
}
