import { setStyle } from "framer-motion";
import React from "react";

const STYLES = [
    {
        value: "",
        label: "- Choose text style -",
        description: ""
    },
    {
        value: "None",
        label: "Keep original text",
        description: ""
    },
    {
        value: "Formal",
        label: "Formal",
        description: "Ideal for business emails, reports, or documents. No colloquial expressions"
    },
    {
        value: "Neutral",
        label: "Neutral",
        description: "Balanced and clear tone — professional, calm, and emotion-free"
    },
    {
        value: "Friendly",
        label: "Friendly",
        description: "Warm and polite tone, suitable for customer or reader communication"
    },
    {
        value: "Creative",
        label: "Creative",
        description: "Slightly expressive and artistic tone, adds a touch of creativity"
    }
];

const StyleSelect = ({ style, setStyle, setDescription }: { style: string; setStyle: (v: string) => void; setDescription: (v: string) => void }) => {
    return (
        <div className="flex flex-col justify-between items-center gap-2 w-full min-h-12">
            <select
                value={style}
                onChange={
                    (e) => {
                        const selected = e.target.value;
                        setStyle(selected);
                        setDescription(STYLES.find((s) => s.value === selected)?.description || "");
                    }
                }
                className="appearance-none centred-select px-6 py-3 border-1 purple-br w-full rounded-md h-full cursor-pointer transition-all purple-sh-hover txt-sh-white-hover text-center focus:outline-none"
            >
                {STYLES.map((s, index) => (
                    <option
                        key={s.value}
                        value={s.value}
                        disabled={index === 0}
                        hidden={index === 0}
                    >
                        {s.label}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default StyleSelect;