import Felszállás from "./Felszállás";

export default class FelszállásJegy extends Felszállás {
    private _jegyekSzáma: number;

    public get érvényesFelszállás(): boolean {
        return this._jegyekSzáma > 0;
    }

    public constructor(sor: string) {
        super(sor);
        // a felhasználható jegyek számát tároljuk:
        this._jegyekSzáma = parseInt(sor.split(" ")[4]);
    }
}
