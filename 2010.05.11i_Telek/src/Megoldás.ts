import fs from "fs";
import Telek from "./Telek";

export default class Megoldás {
    private _telkek: Telek[] = [];

    public get telkek(): Telek[] {
        return this._telkek;
    }

    public get sétaHossza(): number {
        return this._telkek.reduce((sum, a) => sum + a.szélesség, 0) + 160;
    }

    public get teljesBeépítésJólétsor(): number {
        return this._telkek.filter(a => a.isJs && a.szélesség <= 20).length;
    }

    public get legkisebbTelekGazdagsor(): Telek {
        return this.gazdagsoriTelkekRendezveTerület[0];
    }

    public get legnagyobbTelekGazdagsor(): Telek {
        return this.gazdagsoriTelkekRendezveTerület[this.gazdagsoriTelkekRendezveTerület.length - 1];
    }

    public get legnagyobbLegkisebbTelkekTávolsága(): number {
        return Math.abs(this.legnagyobbTelekGazdagsor.házszám - this.legkisebbTelekGazdagsor.házszám) / 2 - 1;
    }

    public get agóGazdagsor(): number {
        return this.gazdagsoriTelkek.reduce((sum, a) => sum + a.adó, 0);
    }

    public get gazdagsoriTelkek(): Telek[] {
        return this._telkek.filter(a => a.isGs);
    }

    public get gazdagsoriTelkekRendezveTerület(): Telek[] {
        return this._telkek.filter(a => a.isGs).sort((a, b) => a.terület - b.terület);
    }

    public get gazdagsoriTelkekRendezveHsz(): Telek[] {
        return this._telkek.filter(a => a.isGs).sort((a, b) => a.házszám - b.házszám);
    }

    public get jólétsoriTelkekRendezveHsz(): Telek[] {
        return this._telkek.filter(a => a.isJs).sort((a, b) => a.házszám - b.házszám);
    }

    constructor(forrás: string) {
        // Adatok beolvasása, tárolása
        fs.readFileSync(forrás)
            .toString()
            .split("\n")
            .forEach(i => {
                const aktSor = i.trim();
                if (aktSor.split(" ").length == 3) this._telkek.push(new Telek(aktSor));
            });

        // Telkek távolságának meghatározása az utca elejétől a 6. feladathoz:
        this.telkekTávolása();

        // Jólétsori telkek hosszának meghatározása a 7. feladathoz:
        this.jólétsoriTelkekHossza();
    }

    private telkekTávolása(): void {
        for (let i = 1; i < this.jólétsoriTelkekRendezveHsz.length; i++) {
            this.jólétsoriTelkekRendezveHsz[i].telekKezdete = this.jólétsoriTelkekRendezveHsz[i - 1].telekKezdete + this.jólétsoriTelkekRendezveHsz[i - 1].szélesség;
        }
        for (let i = 1; i < this.gazdagsoriTelkekRendezveHsz.length; i++) {
            this.gazdagsoriTelkekRendezveHsz[i].telekKezdete = this.gazdagsoriTelkekRendezveHsz[i - 1].telekKezdete + this.gazdagsoriTelkekRendezveHsz[i - 1].szélesség;
        }
    }

    private jólétsoriTelkekHossza(): void {
        for (const js of this.jólétsoriTelkekRendezveHsz) {
            js.hosszúság =
                70 -
                this.gazdagsoriTelkekRendezveHsz
                    .filter(
                        gs =>
                            (gs.telekVége >= js.telekKezdete && gs.telekVége <= js.telekVége) || // vége lóg bele
                            (gs.telekKezdete >= js.telekKezdete && gs.telekKezdete <= js.telekVége) || // eleje lóg bele
                            (gs.telekKezdete < js.telekKezdete && gs.telekVége > js.telekVége)
                    ) // átfedő telek pl: 17, 27
                    .reduce((max, x) => Math.max(x.hosszúság, max), 0);
        }
    }

    public jolétsoriTelkeketÁllománybaÍr(állomány: string): void {
        const ki: string[] = [];
        this.jólétsoriTelkekRendezveHsz.forEach(js => {
            ki.push([js.házszám, js.szélesség, js.hosszúság].join(";"));
        });
        fs.writeFileSync(állomány, ki.join("\r\n"));
    }
}
