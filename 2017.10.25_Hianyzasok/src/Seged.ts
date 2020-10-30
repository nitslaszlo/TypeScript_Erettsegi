export default class Segéd {
    // 4. feladat:
    /** Megadja a nap nevét
     * @param  {number} honap - A hónap sorszáma
     * @param  {number} nap - A nap sorszáma
     * @returns string - A nap neve
     */
    public static hetNapja(honap: number, nap: number): string {
        const napnev: string[] = ["vasarnap", "hetfo", "kedd", "szerda", "csutortok", "pentek", "szombat"];
        const napszam: number[] = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 335];
        const napsorszam: number = (napszam[honap - 1] + nap) % 7;
        return napnev[napsorszam];
    }
}
