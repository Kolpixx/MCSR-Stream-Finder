export const divisionsMap: Map<string, Array<number>> = new Map([
    ["coal", [0, 600]],
    ["iron", [600, 900]],
    ["gold", [900, 1200]],
    ["emerald", [1200, 1500]],
    ["diamond", [1500, 2000]],
    ["netherite", [2000, Infinity]]
]);

export const sortingOptionsMap: Map<string, string> = new Map([
    ["elo", "Elo"],
    ["viewers", "Viewers"],
    ["duration", "Duration"]
]);

export type Division = "coal" | "iron" | "gold" | "emerald" | "diamond" | "netherite";