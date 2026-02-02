export function getDivision(elo: number, subdivion?: boolean) {
    if (subdivion) {
        if (elo >= 0 && elo < 400) {
            return "Coal I";
        } else if (elo >= 400 && elo < 500) {
            return "Coal II";
        } else if (elo >= 500 && elo < 600) {
            return "Coal III";
        } else if (elo >= 600 && elo < 700) {
            return "Iron I";
        } else if (elo >= 700 && elo < 800) {
            return "Iron II";
        } else if (elo >= 800 && elo < 900) {
            return "Iron III";
        } else if (elo >= 900 && elo < 1000) {
            return "Gold I";
        } else if (elo >= 100 && elo < 1100) {
            return "Gold II";
        } else if (elo >= 1100 && elo < 1200) {
            return "Gold III";
        } else if (elo >= 1200 && elo < 1300) {
            return "Emerald I";
        } else if (elo >= 1300 && elo < 1400) {
            return "Emerald II";
        } else if (elo >= 1400 && elo < 1500) {
            return "Emerald III";
        } else if (elo >= 1500 && elo < 1650) {
            return "Diamond I";
        } else if (elo >= 1650 && elo < 1800) {
            return "Diamond II";
        } else if (elo >= 1800 && elo < 2000) {
            return "Diamond III";
        } else if (elo >= 2000) {
            return "Netherite";
        } else {
            return undefined;
        }
    } else {
        if (elo >= 0 && elo < 600) {
            return "coal";
        } else if (elo >= 600 && elo < 900) {
            return "iron";
        } else if (elo >= 900 && elo < 1200) {
            return "gold";
        } else if (elo >= 1200 && elo < 1500) {
            return "emerald";
        } else if (elo >= 1500 && elo < 2000) {
            return "diamond"
        } else if (elo >= 2000) {
            return "netherite"
        } else {
            return undefined;
        }
    }
}

export function padNumber(givenNumber: number | string, padAmount: number) {
    if (typeof givenNumber === "number") {
        return givenNumber.toString().padStart(padAmount, "0");
    } else {
        return givenNumber.padStart(padAmount, "0");
    }
}