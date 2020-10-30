import Felszállás from "../Felszállás";
import FelszállásBérlet from "../FelszállásBérlet";

describe("FelszállásBérlet osztály unit tesztek", () => {
    const instance: Felszállás = new FelszállásBérlet("0 20190326-0700 4170861 NYB 20190404");
    const instance2: Felszállás = new FelszállásBérlet("0 20190326-0700 2020534 TAB 20190328");
    const instance3: Felszállás = new FelszállásBérlet("17 20190326-0722 2946924 FEB 20190325");
    const instance4: Felszállás = new FelszállásBérlet("0 20190326-0700 4908462 NYP 20210101");

    it("FelszállásBérlet osztálypéldányok ellenőrzése", async () => {
        expect(instance).toBeInstanceOf(FelszállásBérlet);
        expect(instance2).toBeInstanceOf(FelszállásBérlet);
        expect(instance3).toBeInstanceOf(FelszállásBérlet);
        expect(instance4).toBeInstanceOf(FelszállásBérlet);
    });

    it("Megálló sorszáma", async () => {
        expect(instance.megállóSorszáma).toBe(0);
        expect(instance2.megállóSorszáma).toBe(0);
        expect(instance3.megállóSorszáma).toBe(17);
        expect(instance4.megállóSorszáma).toBe(0);
    });

    it("Érvényes felszállás", async () => {
        expect(instance.érvényesFelszállás).toBe(true);
        expect(instance2.érvényesFelszállás).toBe(true);
        expect(instance3.érvényesFelszállás).toBe(false);
        expect(instance4.érvényesFelszállás).toBe(true);
    });

    it("Kedvezményes utazás", async () => {
        expect(instance.kedvezményesUtazás).toBe(true);
        expect(instance2.kedvezményesUtazás).toBe(true);
        expect(instance3.kedvezményesUtazás).toBe(false);
        expect(instance4.kedvezményesUtazás).toBe(false);
    });

    it("Ingyenes utazás", async () => {
        expect(instance.ingyenesUtazás).toBe(false);
        expect(instance2.ingyenesUtazás).toBe(false);
        expect(instance3.ingyenesUtazás).toBe(false);
        expect(instance4.ingyenesUtazás).toBe(true);
    });

    it("Lejárt 3 nap", async () => {
        expect(instance.lejárHáromNap).toBe(false);
        expect(instance2.lejárHáromNap).toBe(true);
        expect(instance3.lejárHáromNap).toBe(false);
        expect(instance4.lejárHáromNap).toBe(false);
    });

    it("txt Sora", async () => {
        expect((instance as FelszállásBérlet).állománySor).toBe("4170861 2019-04-04");
        expect((instance2 as FelszállásBérlet).állománySor).toBe("2020534 2019-03-28");
        expect((instance3 as FelszállásBérlet).állománySor).toBe("2946924 2019-03-25");
        expect((instance4 as FelszállásBérlet).állománySor).toBe("4908462 2021-01-01");
    });

    it("Napok különbsége statikus metódusok összehasonlítása", async () => {
        expect(Felszállás.napokszama(2019, 3, 26, 2019, 4, 4)).toBe(Felszállás.napokszama2(new Date("2019-03-26"), new Date("2019-04-04")));
        expect(Felszállás.napokszama(1188, 1, 1, 2020, 6, 6)).toBe(Felszállás.napokszama2(new Date("1188-01-01"), new Date("2020-06-06")));
    });
});
