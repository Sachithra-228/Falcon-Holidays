import { cn } from "@/lib/utils";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
}

export function Input({ label, error, className, id, ...props }: InputProps) {
    return (
        <div className="w-full">
            {label && <label htmlFor={id} className="label-field">{label}</label>}
            <input
                id={id}
                className={cn("input-field", error && "border-red-400 focus:ring-red-300 focus:border-red-400", className)}
                {...props}
            />
            {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
        </div>
    );
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    label?: string;
    error?: string;
    options: { value: string; label: string }[];
}

export function Select({ label, error, options, className, id, ...props }: SelectProps) {
    return (
        <div className="w-full">
            {label && <label htmlFor={id} className="label-field">{label}</label>}
            <select
                id={id}
                className={cn("input-field", error && "border-red-400 focus:ring-red-300 focus:border-red-400", className)}
                {...props}
            >
                {options.map(({ value, label }) => (
                    <option key={value} value={value}>{label}</option>
                ))}
            </select>
            {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
        </div>
    );
}

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    label?: string;
    error?: string;
}

export function Textarea({ label, error, className, id, ...props }: TextareaProps) {
    return (
        <div className="w-full">
            {label && <label htmlFor={id} className="label-field">{label}</label>}
            <textarea
                id={id}
                rows={4}
                className={cn("input-field resize-none", error && "border-red-400 focus:ring-red-300 focus:border-red-400", className)}
                {...props}
            />
            {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
        </div>
    );
}
