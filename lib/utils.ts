import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import slugify from "slugify";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function generateSlug(title: string): string {
    return slugify(title, { lower: true, strict: true, trim: true });
}

export function formatPrice(amount: number, currency: string = "USD"): string {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency,
        maximumFractionDigits: 0,
    }).format(amount);
}

export function formatDate(date: Date | string): string {
    return new Date(date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
}

export function truncate(str: string, length: number): string {
    return str.length > length ? str.substring(0, length) + "..." : str;
}
