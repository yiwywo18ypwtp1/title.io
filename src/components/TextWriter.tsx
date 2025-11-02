import { useEffect, useState } from "react";
import parse from "html-react-parser";


function sliceHtmlByVisibleChars(html: string, limit: number): string {
    if (limit <= 0) return "";
    const container = document.createElement("div");
    container.innerHTML = html;

    let count = 0;

    const trimNode = (node: Node) => {
        if (count >= limit) {
            while (node.lastChild) node.removeChild(node.lastChild);
            return;
        }

        const children = Array.from(node.childNodes);
        for (let i = 0; i < children.length; i++) {
            const child = children[i];

            if (child.nodeType === Node.TEXT_NODE) {
                const text = child.textContent ?? "";
                if (count + text.length <= limit) {
                    count += text.length;
                } else {
                    const need = limit - count;
                    (child as Text).textContent = text.slice(0, need);
                    count = limit;
                    for (let j = i + 1; j < children.length; j++) {
                        node.removeChild(children[j]);
                    }
                    break;
                }
            } else if (child.nodeType === Node.ELEMENT_NODE) {
                trimNode(child);
                if (count >= limit) {
                    for (let j = i + 1; j < children.length; j++) {
                        node.removeChild(children[j]);
                    }
                    break;
                }
            }
        }
    };

    trimNode(container);
    return container.innerHTML;
}

const TextWriter = ({ text }: { text: string }) => {
    const [visibleLen, setVisibleLen] = useState(0);
    const [showCursor, setShowCursor] = useState(true);

    useEffect(() => {
        if (typeof window === "undefined") return;

        const temp = document.createElement("div");
        temp.innerHTML = text || "";
        const total = (temp.textContent || "").length;

        setVisibleLen(0);
        setShowCursor(true);

        if (!text || total === 0) return;

        const tick = setInterval(() => {
            setVisibleLen((prev) => {
                if (prev + 1 >= total) {
                    clearInterval(tick);
                    setShowCursor(false);
                    return total;
                }
                return prev + 1;
            });
        }, 10);

        const blink = setInterval(() => setShowCursor((p) => !p), 350);

        return () => {
            clearInterval(tick);
            clearInterval(blink);
        };
    }, [text]);

    const partialHTML = typeof window !== "undefined"
        ? sliceHtmlByVisibleChars(text || "", visibleLen)
        : "";

    return (
        <div className="break-words text-wrap whitespace-pre-wrap leading-relaxed">
            {parse(partialHTML)}
            <span
                style={{
                    opacity: showCursor ? 1 : 0,
                    transition: "opacity 0.2s ease-in-out",
                }}
            >
                |
            </span>
        </div>
    );
}

export default TextWriter;