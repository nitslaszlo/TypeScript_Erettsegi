import Megoldás from "../Megoldás";
import fs from "fs";

describe("Megoldás osztály unit tesztek", () => {
    const m: Megoldás = new Megoldás("szavazatok.txt");

    it("Megoldás osztálypéldány ellenőrzése", async () => {
        expect(m).toBeInstanceOf(Megoldás);
    });

    it("Jelöltek száma jellemző ellenőrzése", async () => {
        expect(m.jelöltekSzáma).toBe(40);
    });

    it("Szavazatok száma jellemző ellenőrzése", async () => {
        expect(m.szavazatokSzáma).toBe(4713);
    });

    it("SzavazatSzázalék jellemző ellenőrzése", async () => {
        expect(m.szavazottSzázalék).toBe("38.18%");
    });

    it("Szavazat jellemző ellenörzése", async () => {
        expect(m.szavazatStat).toBe("Független jelöltek= 17.53 %\n" + "Gyümölcsevők Pártja= 16.36 %\n" + "Zöldségevők Párja= 20.03 %\n" + "Húsevők Pártja= 24.59 %\n" + "Tejivók Szövetsége= 21.49 %\n");
    });

    it("GyőztesKépviselők jellemző ellenörzése", async () => {
        expect(m.győztesKépviselők).toBe("Joghurt Jakab TISZ\nNarancs Edmond GYEP\nVadas Marcell HEP\n");
    });

    it("képviselőKeresése() függvény ellenörzése", async () => {
        expect(m.képviselőKeresése("Fasirt Ferenc")).toBe("Fasirt Ferenc 143 szavazatot kapott.");
        expect(m.képviselőKeresése("Szabó János")).toBe("Ilyen nevű képviselőjelölt nem szerepel a nyilvántartásban!");
    });

    it("ÁllománytÍr() függvény ellenörzése", async () => {
        m.állománytÍr("kepviselok.txt");
        const t1: string = fs.readFileSync("kepviselok.txt").toString();
        const t2: string = fs.readFileSync("kepviselok_OH.txt").toString();
        expect(t1).toBe(t2);
    });
});
