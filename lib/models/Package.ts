import mongoose, { Schema, model, models, Document } from "mongoose";

export interface IPackage extends Document {
    title: string;
    slug: string;
    destination: string;
    category: "Sri Lanka" | "Cultural" | "Adventure" | "Beach" | "Wildlife" | "Honeymoon" | "Family";
    durationDays: number;
    priceFrom: number;
    currency: string;
    highlights: string[];
    inclusions: string[];
    exclusions: string[];
    itinerary: Array<{ day: number; title: string; description: string }>;
    images: string[];
    isPublished: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const ItineraryItemSchema = new Schema({
    day: { type: Number, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
});

const PackageSchema = new Schema<IPackage>(
    {
        title: { type: String, required: true, trim: true },
        slug: { type: String, required: true, unique: true, lowercase: true },
        destination: { type: String, required: true, trim: true },
        category: {
            type: String,
            enum: ["Sri Lanka", "Cultural", "Adventure", "Beach", "Wildlife", "Honeymoon", "Family"],
            default: "Sri Lanka",
            required: true,
        },
        durationDays: { type: Number, required: true, min: 1 },
        priceFrom: { type: Number, required: true, min: 0 },
        currency: { type: String, default: "LKR" },
        highlights: [{ type: String }],
        inclusions: [{ type: String }],
        exclusions: [{ type: String }],
        itinerary: [ItineraryItemSchema],
        images: [{ type: String }],
        isPublished: { type: Boolean, default: false },
    },
    { timestamps: true }
);

const Package = models.Package || model<IPackage>("Package", PackageSchema);
export default Package;
