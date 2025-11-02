import DiffMatchPatch from "diff-match-patch";

export function highlightDifferences(original: string, corrected: string): string {
    if (!original || !corrected) return corrected || "";

    const dmp = new DiffMatchPatch();
    const diffs: [number, string][] = dmp.diff_main(original, corrected);
    dmp.diff_cleanupSemantic(diffs);

    return diffs
        .map(([type, text]) => {
            if (type === DiffMatchPatch.DIFF_INSERT)
                return `<span style="color: #CBA6F7; text-decoration: underline; text-shadow: 0 0 2px #CBA6F7">${text}</span>`;
            if (type === DiffMatchPatch.DIFF_DELETE)
                return "";
            return text;
        })
        .join("");
}
