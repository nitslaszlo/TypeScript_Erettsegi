import Telek from "./Telek";

export default class Grafika {
    private static rndNext(start: number, limit: number): number {
        return Math.floor(Math.random() * (limit - start) + start);
    }

    public static telketRajzol(t: Telek): string {
        return `<div style="
        width: ${t.szélesség * 3}px;
        height: ${t.hosszúság * 3}px;
        margin: 0 0 0 ${t.telekKezdete * 3}px;
        ${t.isGs ? "bottom" : "top"}: 0;
        position: absolute;
        text-align: center;
        display: flex;
        justify-content: center;
        flex-direction: column;
        border: 2px solid yellow;
        box-sizing: border-box;
        background: rgb(${this.rndNext(150, 256)}, ${this.rndNext(150, 256)}, ${this.rndNext(150, 256)});
        ">${(t.isGs ? "gs" : "js") + t.házszám + "<br>" + t.szélesség + "x" + t.hosszúság}</div>`;
    }
}
