import fs from "fs";
import Megoldás from "../Megoldás";

describe("Megoldás osztály unit tesztek", () => {
    const instance: Megoldás = new Megoldás("utasadat.txt");

    it("Megoldás osztálypéldány ellenőrzése", async () => {
        expect(instance).toBeInstanceOf(Megoldás);
    });

    it("Felszállók száma", async () => {
        expect(instance.felszállókSzáma).toBe(699);
    });

    it("Érvénytelen felszállás", async () => {
        expect(instance.érvénytelenFelszállás).toBe(21);
    });

    it("Maximum keresés Map-el", async () => {
        expect(instance.maxKeresMap.maxFelszálló).toBe(39);
        expect(instance.maxKeresMap.maxElsőMegálló).toBe(8);
    });

    it("Maximum keresés Array-el", async () => {
        expect(instance.maxKeresArray.maxFelszálló).toBe(39);
        expect(instance.maxKeresArray.maxElsőMegálló).toBe(8);
    });

    it("Ingyenesen utazók száma", async () => {
        expect(instance.ingyenesenUtazók).toBe(133);
    });

    it("Kedvezményesen utazók száma", async () => {
        expect(instance.kedvezményesenUtazók).toBe(200);
    });

    it("Fájlok összehasonlítása", async () => {
        expect(fs.readFileSync("figyelmeztetes.txt").toString()).toBe(fs.readFileSync("figyelmeztetesOH.txt").toString());
    });
});
