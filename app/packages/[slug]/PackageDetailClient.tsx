"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronDown, ChevronUp } from "lucide-react";

interface GalleryProps {
    images: string[];
    title: string;
}

export function Gallery({ images, title }: GalleryProps) {
    const [selected, setSelected] = useState(0);
    const imgs = images.length > 0 ? images : [`https://picsum.photos/seed/${title}/800/600`];

    return (
        <div className="space-y-3">
            <div className="relative h-80 md:h-[480px] rounded-2xl overflow-hidden">
                <Image src={imgs[selected]} alt={`${title} - image ${selected + 1}`} fill className="object-cover" />
            </div>
            {imgs.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-1">
                    {imgs.map((img, i) => (
                        <button
                            key={i}
                            onClick={() => setSelected(i)}
                            className={`relative w-20 h-16 rounded-xl overflow-hidden shrink-0 ring-2 transition-all ${i === selected ? "ring-gold" : "ring-transparent opacity-60 hover:opacity-80"
                                }`}
                        >
                            <Image src={img} alt={`thumbnail ${i + 1}`} fill className="object-cover" />
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}

interface AccordionItem {
    day?: number;
    title: string;
    description: string;
}

export function Accordion({ items, label = "Day" }: { items: AccordionItem[]; label?: string }) {
    const [open, setOpen] = useState<number | null>(0);

    return (
        <div className="space-y-3">
            {items.map((item, i) => (
                <div key={i} className="border border-gray-100 rounded-xl overflow-hidden">
                    <button
                        onClick={() => setOpen(open === i ? null : i)}
                        className="flex items-center justify-between w-full px-5 py-4 text-left hover:bg-gray-50 transition-colors"
                    >
                        <div className="flex items-center gap-3">
                            {item.day !== undefined && (
                                <span className="w-8 h-8 rounded-full bg-navy-900 text-white text-xs font-bold flex items-center justify-center shrink-0">
                                    {item.day}
                                </span>
                            )}
                            <span className="font-semibold text-navy-900 text-sm">{item.title}</span>
                        </div>
                        {open === i ? (
                            <ChevronUp size={18} className="text-gray-400 shrink-0" />
                        ) : (
                            <ChevronDown size={18} className="text-gray-400 shrink-0" />
                        )}
                    </button>
                    {open === i && (
                        <div className="px-5 pb-5 text-gray-600 text-sm leading-relaxed">
                            {item.day !== undefined && <div className="w-full h-px bg-gray-100 mb-4" />}
                            {item.description}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}
