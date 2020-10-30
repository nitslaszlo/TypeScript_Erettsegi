import fs from "fs";
import http from "http";
import { ParsedUrlQuery } from "querystring";
import url from "url";
import Hiányzó from "./hianyzo";
import Segéd from "./seged";

export default class Content {
    public content(req: http.IncomingMessage, res: http.ServerResponse): void {
        // favicon.ico kérés kiszolgálása:
        if (req.url === "/favicon.ico") {
            res.writeHead(200, { "Content-Type": "image/x-icon" });
            fs.createReadStream("favicon.ico").pipe(res);
            return;
        }

        res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
        res.write("<!DOCTYPE html>");
        res.write("<html lang='hu'><head><title>Hiányzások 2017.10.25</title></head>");
        res.write("<body>");
        res.write("<pre style='font-family: monospace;'>");
        res.write("<form style='background-color: LightGray; font-family: Courier; font-size:18px;'>");
        res.write("<p>1. feladat:<br>Az adatok beolvasása</p>");

        const hiányzók: Hiányzó[] = [];
        let aktDátum: string;
        fs.readFileSync("naplo.txt")
            .toString()
            .split("\n")
            .forEach(i => {
                const aktSor: string = i.trim(); // a trim() levágja a \r vezérlő karaktert a sor végéről
                if (aktSor[0] === "#") aktDátum = aktSor;
                // ha dátum adatot kell beolvasni
                else if (aktSor.length > 0) hiányzók.push(new Hiányzó(aktDátum, aktSor)); // ha tanuló nevét és hiányzását
            });

        res.write(`<p>2. feladat:<br>A naplóban ${hiányzók.length} bejegyzés van.</p>`);

        // 3. feladat:
        let összIgazolt = 0;
        let összIgazolatlan = 0;
        hiányzók.forEach(i => {
            összIgazolt += i.igazoltDb;
            összIgazolatlan += i.igazolatlanDb;
        });
        res.write("<p>3. feladat:<br>" + `Az igazolt hiányzások száma ${összIgazolt}, az igazolatlanoké ${összIgazolatlan} óra.</p>`);

        // Felhasználói input az 5. és 6. feladatokhoz
        // A mintában lévő adatokat állítja be,
        // vagy a paramétereken keresztül megadottakat (ha vannak)
        const query: ParsedUrlQuery = url.parse(req.url as string, true).query;
        const honap: string = query.honap === undefined ? "2" : (query.honap as string);
        const nap: string = query.nap === undefined ? "3" : (query.nap as string);
        const napnev: string = query.napnev === undefined ? "szerda" : (query.napnev as string);
        const ora: string = query.ora === undefined ? "3" : (query.ora as string);

        let sHonapSsz = "<p>5.feladat:<br>A hónap sorszáma = ";
        sHonapSsz += "<select name='honap' onChange = 'this.form.submit();'>";
        for (let i = 1; i < 13; i++) {
            sHonapSsz += `<option${honap === i.toString() ? " selected" : ""}>${i}</option>`;
        }
        res.write(sHonapSsz + "</select></p>");

        let sNapSsz = `<p>A nap sorszáma = ${nap} --> `;
        sNapSsz += "<input type='range' name='nap' min='1' max='31' step='1' ";
        sNapSsz += `value='${nap}' style='width: 400px' onChange='this.form.submit();'></p>`;
        res.write(sNapSsz);
        res.write(`<p>Azon a napon ${Segéd.hetNapja(parseInt(honap, 10), parseInt(nap, 10))} volt.</p>`);

        const napokNevei: string[] = ["hetfo", "kedd", "szerda", "csutortok", "pentek", "szombat", "vasarnap"];
        let sNapnev = "<p>6.feladat:<br>A nap neve = <select name='napnev' onChange='this.form.submit();'>";
        napokNevei.forEach(n => {
            sNapnev += `<option${napnev === n ? " selected" : ""}>${n}</option>`;
        });
        res.write(sNapnev + "</select></p>");

        let sOraSsz = "<p>Az óra sorszáma = <select name='ora' onChange='this.form.submit();'>";
        for (let i = 1; i < 8; i++) {
            sOraSsz += `<option${ora === i.toString() ? " selected" : ""}>${i}</option>`;
        }
        res.write(sOraSsz + "</select></p>");

        let hiányzásokDb = 0;
        hiányzók.forEach(i => {
            hiányzásokDb += i.voltHiányzás(napnev, parseInt(ora, 10)) ? 1 : 0;
        });
        res.write(`<p>Ekkor összesen ${hiányzásokDb} óra hiányzás történt. </p>`);

        // 7. feladat:
        const stat: Map<string, number> = new Map<string, number>();
        hiányzók.forEach(i => {
            if (stat.has(i.név)) {
                const tanulóEddigiHiányzásai = stat.get(i.név) as number;
                stat.set(i.név, tanulóEddigiHiányzásai + i.hianyzasDb);
            } else {
                stat.set(i.név, i.hianyzasDb);
            }
        });

        const maxHiányzás: number = Math.max(...stat.values());
        res.write("<p>7.feladat:<br>A legtöbbet hiányzó tanulók: ");
        stat.forEach((value: number, key: string) => {
            if (value === maxHiányzás) res.write(`${key} `);
        });
        res.write("</p></form>");

        // Nem a feladat része :
        res.write("<b>Feladat, javítási, forrás(ok), forráskód GitHub repository:</b><br>");
        res.write("<a href='https://github.com/nitslaszlo/TypeScript_Erettsege' target='_blank'>" + "https://github.com/nitslaszlo/TypeScript_Erettsegi</a><br><br>");

        res.write("<b>A forrás naplo.txt fájl:</b><br>");
        fs.readFileSync("naplo.txt")
            .toString()
            .split("\n")
            .forEach(i => res.write(`${i.trim()}<br>`));
        res.end("</pre></body></html>");
    }
}
