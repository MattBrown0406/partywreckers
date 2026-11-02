export declare const TRANSCRIPT_TYPE_PREFERENCE: string[];
export declare const sortTranscriptsByPreference: <T extends { type: string }>(transcripts: ReadonlyArray<T>) => T[];
export declare const redactTranscript: (text: string) => string;
export declare const formatTranscriptParagraphs: (text: string) => string;
export declare const transcriptToText: (raw: string, type: string) => string;
