"use client";

import { useState, useTransition } from "react";
import { createInquiry } from "@/lib/actions/inquiries";
import { Input, Textarea, Select } from "@/components/ui/FormFields";
import { Send, CheckCircle, Loader2 } from "lucide-react";

const INQUIRY_TYPES = [
    { value: "", label: "Select inquiry type" },
    { value: "general", label: "General Inquiry" },
    { value: "honeymoon", label: "Honeymoon Package" },
    { value: "family", label: "Family Holiday" },
    { value: "adventure", label: "Adventure Trip" },
    { value: "corporate", label: "Corporate Travel" },
    { value: "custom", label: "Custom Itinerary" },
];

export default function ContactForm() {
    const [isPending, startTransition] = useTransition();
    const [success, setSuccess] = useState(false);
    const [serverError, setServerError] = useState("");
    const [form, setForm] = useState({ name: "", email: "", phone: "", inquiryType: "", message: "" });
    const [errors, setErrors] = useState<Record<string, string>>({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
        setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
    };

    const validate = () => {
        const errs: Record<string, string> = {};
        if (!form.name.trim() || form.name.length < 2) errs.name = "Name is required";
        if (!form.email || !/\S+@\S+\.\S+/.test(form.email)) errs.email = "Valid email required";
        if (!form.phone.trim() || form.phone.length < 7) errs.phone = "Phone number required";
        if (!form.message.trim() || form.message.length < 10) errs.message = "Message must be at least 10 characters";
        return errs;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const errs = validate();
        if (Object.keys(errs).length > 0) { setErrors(errs); return; }
        startTransition(async () => {
            try {
                await createInquiry({ name: form.name, email: form.email, phone: form.phone, message: `[${form.inquiryType || "General"}] ${form.message}` });
                setSuccess(true);
            } catch {
                setServerError("Something went wrong. Please try again.");
            }
        });
    };

    if (success) {
        return (
            <div className="bg-white rounded-2xl shadow-sm p-12 text-center border border-emerald-100 h-full flex flex-col items-center justify-center">
                <CheckCircle size={64} className="text-emerald-500 mb-5" />
                <h3 className="text-2xl font-bold text-navy-900 mb-3">Message Received!</h3>
                <p className="text-gray-600 max-w-sm">
                    Thank you for contacting Falcon Holidays. We'll respond within 24 hours, or feel free to reach us on WhatsApp for a faster response.
                </p>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-2xl shadow-sm p-8 border border-gray-100">
            <h2 className="text-2xl font-bold text-navy-900 mb-2">Send Us a Message</h2>
            <p className="text-gray-500 text-sm mb-7">We'll get back to you within 24 hours.</p>

            {serverError && (
                <div className="mb-5 p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl text-sm">{serverError}</div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <Input id="c-name" name="name" label="Full Name *" placeholder="John Smith" value={form.name} onChange={handleChange} error={errors.name} />
                    <Input id="c-email" name="email" type="email" label="Email Address *" placeholder="john@example.com" value={form.email} onChange={handleChange} error={errors.email} />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <Input id="c-phone" name="phone" label="Phone Number *" placeholder="+94 77 123 4567" value={form.phone} onChange={handleChange} error={errors.phone} />
                    <Select
                        id="c-inquiryType"
                        name="inquiryType"
                        label="Inquiry Type"
                        options={INQUIRY_TYPES}
                        value={form.inquiryType}
                        onChange={handleChange}
                    />
                </div>
                <Textarea id="c-message" name="message" label="Your Message *" placeholder="Tell us about your travel plans, destination, dates, group size, budget..." value={form.message} onChange={handleChange} error={errors.message} rows={6} />

                <button
                    type="submit"
                    disabled={isPending}
                    className="btn-primary w-full justify-center py-4 disabled:opacity-70"
                >
                    {isPending ? <><Loader2 size={18} className="animate-spin" /> Sending...</> : <><Send size={18} /> Send Message</>}
                </button>
            </form>
        </div>
    );
}
