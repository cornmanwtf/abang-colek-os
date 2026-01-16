export const MANIFESTO_PARTS = {
    intros: [
        "Dengar sini baik-baik!",
        "Aku tak faham betul la orang sekarang.",
        "Ini rahsia bisnes yang \"guru\" korang tak bagitahu.",
        "Abang Colek bukan nak marah, tapi nak tegur.",
        "Siapa kata buat bisnes tu senang?"
    ],
    complaints: [
        "Customer mintak diskaun, tapi nak portion extra.",
        "Supplier janji pukul 8, pukul 10 baru nampak batang hidung.",
        "Budak baru kerja sehari dah mintak cuti.",
        "Orang kita ni support member main-main.",
        "Bila kita berjaya, ada je yang dengki."
    ],
    philosophy: [
        "Kita meniaga bukan nak kaya cepat, tapi nak berkat.",
        "Kualiti tu nombor satu, duit tu nombor dua.",
        "Abang Colek pegang satu je: Jujur.",
        "Susah sekarang, senang kemudian.",
        "Rezeki tak pernah salah alamat."
    ],
    outros: [
        "Fikir-fikirkanlah.",
        "Ingat pesan Abang Colek.",
        "Jumpa kat booth nanti.",
        "Support lokal, support Abang Colek.",
        "Sekian, terima kasih."
    ]
};

export const SCRIPT_TEMPLATES = [
    {
        id: "viral-hook",
        title: "The Viral Hook",
        structure: [
            { label: "Hook (3s)", description: "Stop scrolling statement", type: "text" },
            { label: "Value (15s)", description: "Show the problem & solution", type: "text" },
            { label: "CTA (5s)", description: "Call to action", type: "text" }
        ],
        format: (inputs: string[]) => `
(HOOK - 3s)
${inputs[0]}

(VALUE - 15s)
${inputs[1]}

(CTA - 5s)
${inputs[2]}
`
    },
    {
        id: "behind-scenes",
        title: "Behind The Scenes",
        structure: [
            { label: "Intro", description: "What are we making today?", type: "text" },
            { label: "Process", description: "Satisfying action shot description", type: "text" },
            { label: "Result", description: "Final product reveal", type: "text" }
        ],
        format: (inputs: string[]) => `
(INTRO)
${inputs[0]}

(PROCESS - ASMR)
${inputs[1]}

(FINAL RESULT)
${inputs[2]}
`
    }
];

export function generateManifesto() {
    const pick = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)];
    return `${pick(MANIFESTO_PARTS.intros)} ${pick(MANIFESTO_PARTS.complaints)} ${pick(MANIFESTO_PARTS.philosophy)} ${pick(MANIFESTO_PARTS.outros)}`;
}
