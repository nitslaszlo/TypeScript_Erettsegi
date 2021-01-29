import Megoldás from "../Megoldás";

describe("Megoldás osztály unit tesztek", () => {
    const instance: Megoldás = new Megoldás("naplo.txt");

    it("Megoldás osztálypéldány ellenőrzése", async () => {
        expect(instance).toBeInstanceOf(Megoldás);
    });

    it("Bejegyzések számaSéta hossza", async () => {
        expect(instance.bejegyzésekSzáma).toBe(139);
    });

    it("Össz igazolt", async () => {
        expect(instance.összIgazolt).toBe(788);
    });

    it("Össz igazolatlan", async () => {
        expect(instance.összIgazolatlan).toBe(18);
    });
});
