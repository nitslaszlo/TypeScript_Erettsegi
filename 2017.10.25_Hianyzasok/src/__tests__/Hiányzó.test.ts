import Hiányzó from "../Hiányzó";

describe("Hiányzó osztály unit tesztek", () => {
    const instance1: Hiányzó = new Hiányzó("# 01 15", "Galagonya Alfonz OXXXXXX");
    const instance2: Hiányzó = new Hiányzó("# 01 16", "Alma Hedvig OOOOOIO");

    it("Hiányzó osztálypéldány ellenőrzése", async () => {
        expect(instance1).toBeInstanceOf(Hiányzó);
        expect(instance2).toBeInstanceOf(Hiányzó);
    });

    it("Név jellemző", async () => {
        expect(instance1.név).toBe("Galagonya Alfonz");
        expect(instance2.név).toBe("Alma Hedvig");
    });

    it("Igazolt hiányzások száma", async () => {
        expect(instance1.igazoltDb).toBe(6);
        expect(instance2.igazoltDb).toBe(0);
    });

    it("Igazolatlan hiányzások száma", async () => {
        expect(instance1.igazolatlanDb).toBe(0);
        expect(instance2.igazolatlanDb).toBe(1);
    });

    it("Hiányzások száma", async () => {
        expect(instance1.hianyzasDb).toBe(6);
        expect(instance2.hianyzasDb).toBe(1);
    });

    it("Volt hiányzás", async () => {
        expect(instance1.voltHiányzás("hetfo", 1)).toBe(false);
        expect(instance1.voltHiányzás("hetfo", 2)).toBe(true);
        expect(instance1.voltHiányzás("hetfo", 3)).toBe(true);
        expect(instance1.voltHiányzás("kedd", 3)).toBe(false);
        expect(instance1.voltHiányzás("szerda", 3)).toBe(false);
        expect(instance1.voltHiányzás("csutortok", 3)).toBe(false);
        expect(instance1.voltHiányzás("pentek", 3)).toBe(false);
        expect(instance1.voltHiányzás("szombat", 3)).toBe(false);
        expect(instance1.voltHiányzás("vasarnap", 3)).toBe(false);

        expect(instance2.voltHiányzás("kedd", 5)).toBe(false);
        expect(instance2.voltHiányzás("kedd", 6)).toBe(true);
        expect(instance2.voltHiányzás("kedd", 7)).toBe(false);
    });
});
