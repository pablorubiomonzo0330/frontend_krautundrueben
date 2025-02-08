export interface Zutat {
    id: number,
    bezeichnung: string,
    einheit: string,
    nettopreis: number,
    bestand: number,
    lieferantenId: number,
    kalorien: number,
    kohlenhydrate: number,
    protein: number
}

export interface ZutatForRezept {
    bezeichnung: string,
    einheit: string,
    menge: number
}

export interface Rezept {
    id: number;
    name: string;
    beschreibung: string;
    durchschnittlicheZubereitungszeit: string;
    ernaehrungskategorien: string[];
    zutaten: ZutatForRezept[];
}
