"use server";

import connectDB from "@/lib/db";
import Package, { IPackage } from "@/lib/models/Package";
import { generateSlug } from "@/lib/utils";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const PackageSchema = z.object({
    title: z.string().min(3, "Title must be at least 3 characters"),
    destination: z.string().min(2, "Destination is required"),
    category: z.enum(["Sri Lanka", "International", "Honeymoon", "Adventure"]),
    durationDays: z.number().min(1, "Duration must be at least 1 day"),
    priceFrom: z.number().min(0, "Price must be positive"),
    currency: z.string().default("USD"),
    highlights: z.array(z.string()).default([]),
    inclusions: z.array(z.string()).default([]),
    exclusions: z.array(z.string()).default([]),
    itinerary: z
        .array(
            z.object({
                day: z.number(),
                title: z.string(),
                description: z.string(),
            })
        )
        .default([]),
    images: z.array(z.string()).default([]),
    isPublished: z.boolean().default(false),
});

type PackageInput = z.infer<typeof PackageSchema>;

// Get all published packages (public)
export async function getPublishedPackages(filters?: {
    destination?: string;
    category?: string;
    minDays?: number;
    maxDays?: number;
    maxPrice?: number;
    sort?: string;
}) {
    await connectDB();
    const query: Record<string, unknown> = { isPublished: true };

    if (filters?.destination && filters.destination !== "all") {
        query.destination = { $regex: filters.destination, $options: "i" };
    }
    if (filters?.category && filters.category !== "all") {
        query.category = filters.category;
    }
    if (filters?.minDays || filters?.maxDays) {
        query.durationDays = {};
        if (filters.minDays) (query.durationDays as Record<string, number>).$gte = filters.minDays;
        if (filters.maxDays) (query.durationDays as Record<string, number>).$lte = filters.maxDays;
    }
    if (filters?.maxPrice) {
        query.priceFrom = { $lte: filters.maxPrice };
    }

    let sortQuery: Record<string, 1 | -1> = { createdAt: -1 };
    if (filters?.sort === "price_asc") sortQuery = { priceFrom: 1 };
    else if (filters?.sort === "price_desc") sortQuery = { priceFrom: -1 };
    else if (filters?.sort === "duration") sortQuery = { durationDays: 1 };

    const packages = await Package.find(query).sort(sortQuery).lean();
    return JSON.parse(JSON.stringify(packages));
}

// Get featured packages (top 6 published, newest first)
export async function getFeaturedPackages() {
    await connectDB();
    const packages = await Package.find({ isPublished: true })
        .sort({ createdAt: -1 })
        .limit(6)
        .lean();
    return JSON.parse(JSON.stringify(packages));
}

// Get single package by slug (public)
export async function getPackageBySlug(slug: string) {
    await connectDB();
    const pkg = await Package.findOne({ slug, isPublished: true }).lean();
    return pkg ? JSON.parse(JSON.stringify(pkg)) : null;
}

// Get all packages (admin)
export async function getAllPackagesAdmin() {
    await connectDB();
    const packages = await Package.find({}).sort({ createdAt: -1 }).lean();
    return JSON.parse(JSON.stringify(packages));
}

// Get package by ID (admin)
export async function getPackageById(id: string) {
    await connectDB();
    const pkg = await Package.findById(id).lean();
    return pkg ? JSON.parse(JSON.stringify(pkg)) : null;
}

// Create package (admin)
export async function createPackage(data: PackageInput) {
    await connectDB();
    const validated = PackageSchema.parse(data);
    const slug = generateSlug(validated.title);

    const existing = await Package.findOne({ slug });
    const finalSlug = existing ? `${slug}-${Date.now()}` : slug;

    const pkg = await Package.create({ ...validated, slug: finalSlug });
    revalidatePath("/packages");
    revalidatePath("/");
    revalidatePath("/admin/packages");
    return JSON.parse(JSON.stringify(pkg));
}

// Update package (admin)
export async function updatePackage(id: string, data: Partial<PackageInput>) {
    await connectDB();
    const pkg = await Package.findByIdAndUpdate(id, data, { new: true }).lean();
    revalidatePath("/packages");
    revalidatePath("/");
    revalidatePath("/admin/packages");
    if (pkg) {
        revalidatePath(`/packages/${(pkg as IPackage).slug}`);
    }
    return pkg ? JSON.parse(JSON.stringify(pkg)) : null;
}

// Delete package (admin)
export async function deletePackage(id: string) {
    await connectDB();
    await Package.findByIdAndDelete(id);
    revalidatePath("/packages");
    revalidatePath("/");
    revalidatePath("/admin/packages");
    return { success: true };
}

// Toggle publish status (admin)
export async function togglePublishPackage(id: string) {
    await connectDB();
    const pkg = await Package.findById(id);
    if (!pkg) throw new Error("Package not found");
    pkg.isPublished = !pkg.isPublished;
    await pkg.save();
    revalidatePath("/packages");
    revalidatePath("/");
    revalidatePath("/admin/packages");
    return JSON.parse(JSON.stringify(pkg));
}
