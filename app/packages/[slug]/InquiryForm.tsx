"use client";

import { useState, useTransition } from "react";
import { createInquiry } from "@/lib/actions/inquiries";
import { Input, Textarea } from "@/components/ui/FormFields";
import { Send, CheckCircle, Loader2 } from "lucide-react";

interface Props {
    packageTitle?: string;
    packageSlug?: string;
}

export default function InquiryForm({ packageTitle, packageSlug }: Props) {
    const [isPending, startTransition] = useTransition();
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");
    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        message: packageTitle ? `Hi, I'm interested in the "${packageTitle}" package. Please send me more information.` : "",
    });
    const [errors, setErrors] = useState<Record<string, string>>({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
        setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
    };

    const validate = () => {
        const errs: Record<string, string> = {};
        if (!form.name.trim() || form.name.length < 2) errs.name = "Name is required";
        if (!form.email || !/\S+@\S+\.\S+/.test(form.email)) errs.email = "Valid email is required";
        if (!form.phone.trim() || form.phone.length < 7) errs.phone = "Phone number is required";
        if (!form.message.trim() || form.message.length < 10) errs.message = "Message must be at least 10 characters";
        return errs;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const errs = validate();
        if (Object.keys(errs).length > 0) {
            setErrors(errs);
            return;
        }

        startTransition(async () => {
            try {
                await createInquiry({ ...form, packageSlug });
                setSuccess(true);
            } catch {
                setError("Something went wrong. Please try again or contact us via WhatsApp.");
            }
        });
    };

    if (success) {
        return (
            <div className="bg-white rounded-2xl shadow-sm p-10 text-center border border-emerald-100">
                <CheckCircle size={56} className="text-emerald-500 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-navy-900 mb-2">Inquiry Sent!</h3>
                <p className="text-gray-600">Thank you for reaching out. Our team will get back to you within 24 hours.</p>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-2xl shadow-sm p-8 border border-gray-100">
            <h2 className="text-2xl font-bold text-navy-900 mb-2">Send an Inquiry</h2>
            <p className="text-gray-500 text-sm mb-6">Fill in your details and we'll get back to you within 24 hours.</p>

            {error && (
                <div className="mb-5 p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl text-sm">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <Input id="name" name="name" label="Full Name" placeholder="John Smith" value={form.name} onChange={handleChange} error={errors.name} />
                    <Input id="email" name="email" type="email" label="Email Address" placeholder="john@example.com" value={form.email} onChange={handleChange} error={errors.email} />
                </div>
                <Input id="phone" name="phone" label="Phone Number" placeholder="+94 77 123 4567" value={form.phone} onChange={handleChange} error={errors.phone} />
                <Textarea id="message" name="message" label="Your Message" placeholder="Tell us about your travel plans..." value={form.message} onChange={handleChange} error={errors.message} rows={5} />

                <button
                    type="submit"
                    disabled={isPending}
                    className="btn-primary w-full justify-center py-3.5 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                    {isPending ? (
                        <>
                            <Loader2 size={18} className="animate-spin" />
                            Sending...
                        </>
                    ) : (
                        <>
                            <Send size={18} />
                            Send Inquiry
                        </>
                    )}
                </button>
            </form>
        </div>
    );
}
