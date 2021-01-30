import Megoldás from "../Megoldás";

describe("Megoldás osztály unit tesztek", () => {
    const instance: Megoldás = new Megoldás("naplo.txt");

    it("Megoldás osztálypéldány ellenőrzése", async () => {
        expect(instance).toBeInstanceOf(Megoldás);
    });

    it("Bejegyzések száma", async () => {
        expect(instance.bejegyzésekSzáma).toBe(139);
    });

    it("Összs igazolt", async () => {
        expect(instance.összIgazolt).toBe(788);
    });

    it("Összes igazolatlan", async () => {
        expect(instance.összIgazolatlan).toBe(18);
    });

    it("Megszámol hiányzás", async () => {
        expect(instance.megszámolHiányzások("szerda", "3")).toBe(49);
    });

    it("Legtöbbet hiányzó tanuló(k)", async () => {
        expect(instance.legtöbbetHiányzóTanulók).toStrictEqual(["Kivi Adrienn", "Jujuba Ibolya"]);
    });
});
