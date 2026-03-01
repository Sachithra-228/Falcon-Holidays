import mongoose, { Schema, model, models, Document } from "mongoose";

export interface IInquiry extends Document {
    name: string;
    email: string;
    phone: string;
    message: string;
    packageSlug?: string;
    status: "new" | "read";
    createdAt: Date;
    updatedAt: Date;
}

const InquirySchema = new Schema<IInquiry>(
    {
        name: { type: String, required: true, trim: true },
        email: { type: String, required: true, trim: true, lowercase: true },
        phone: { type: String, required: true, trim: true },
        message: { type: String, required: true, trim: true },
        packageSlug: { type: String, trim: true },
        status: { type: String, enum: ["new", "read"], default: "new" },
    },
    { timestamps: true }
);

const Inquiry = models.Inquiry || model<IInquiry>("Inquiry", InquirySchema);
export default Inquiry;
