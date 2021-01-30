import Segéd from "../Segéd";

describe("Segéd osztály unit tesztek", () => {
    it("hétNapja() statikus metódus teszt", async () => {
        expect(Segéd.hetNapja(1, 1)).toBe("hetfo");
        expect(Segéd.hetNapja(1, 15)).toBe("hetfo");
        expect(Segéd.hetNapja(1, 16)).toBe("kedd");
        expect(Segéd.hetNapja(6, 20)).toBe("szerda");
        expect(Segéd.hetNapja(11, 30)).toBe("pentek");
        expect(Segéd.hetNapja(12, 30)).toBe("vasarnap");
    });
});
