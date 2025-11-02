declare module "diff-match-patch" {
    export default class DiffMatchPatch {
        static DIFF_DELETE: number;
        static DIFF_INSERT: number;
        static DIFF_EQUAL: number;

        diff_main(text1: string, text2: string): [number, string][];
        diff_cleanupSemantic(diffs: [number, string][]): void;
    }
}
