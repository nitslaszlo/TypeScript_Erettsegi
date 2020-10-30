import Felszállás from "../Felszállás";
import FelszállásJegy from "../FelszállásJegy";

describe("FelszállásJegy osztály unit tesztek", () => {
    const instance4: Felszállás = new FelszállásJegy("22 20190326-0728 9084477 JGY 8");
    const instance5: Felszállás = new FelszállásJegy("26 20190326-0732 8885564 JGY 0");

    it("FelszállásJegy osztálypéldányok ellenőrzése", async () => {
        expect(instance4).toBeInstanceOf(FelszállásJegy);
        expect(instance5).toBeInstanceOf(FelszállásJegy);
    });

    it("Megálló sorszáma", async () => {
        expect(instance4.megállóSorszáma).toBe(22);
        expect(instance5.megállóSorszáma).toBe(26);
    });

    it("Érvényes felszállás", async () => {
        expect(instance4.érvényesFelszállás).toBe(true);
        expect(instance5.érvényesFelszállás).toBe(false);
    });

    it("Kedvezményes utazás", async () => {
        expect(instance4.kedvezményesUtazás).toBe(false);
        expect(instance5.kedvezményesUtazás).toBe(false);
    });

    it("Ingyenes utazás", async () => {
        expect(instance4.ingyenesUtazás).toBe(false);
        expect(instance5.ingyenesUtazás).toBe(false);
    });

    it("Lejárt 3 nap", async () => {
        expect(instance4.lejárHáromNap).toBe(false);
        expect(instance5.lejárHáromNap).toBe(false);
    });
});
