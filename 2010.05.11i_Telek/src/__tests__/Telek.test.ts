import Telek from "../Telek";

describe("Telek osztály unit tesztek", () => {
    const instance1: Telek = new Telek("25 20 35");
    const instance2: Telek = new Telek("28 25 0");

    it("Telek osztálypéldányok ellenőrzése", async () => {
        expect(instance1).toBeInstanceOf(Telek);
        expect(instance2).toBeInstanceOf(Telek);
    });

    it("Házszám ellenőrzése", async () => {
        expect(instance1.házszám).toBe(25);
        expect(instance2.házszám).toBe(28);
    });

    it("Telek szélessége", async () => {
        expect(instance1.szélesség).toBe(20);
        expect(instance2.szélesség).toBe(25);
    });

    it("Telek hosszúsága", async () => {
        expect(instance1.hosszúság).toBe(35);
        expect(instance2.hosszúság).toBe(0);
    });

    it("Telek után fizetendő adó", async () => {
        expect(instance1.adó).toBe(35700);
        expect(instance2.adó).toBe(0); // 0-a, mert itt még ismeretlen a hossza (így területe is) a teleknek
    });
});
