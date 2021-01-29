import fs from "fs";
import http from "http";
import url from "url";
import Megoldás from "./Megoldás";
import Segéd from "./Segéd";

export default class Content {
    public static content(req: http.IncomingMessage, res: http.ServerResponse): void {
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

        res.write("1. feladat:<br>Az adatok beolvasása\n");
        const m: Megoldás = new Megoldás("naplo.txt");

        res.write(`2. feladat:\nA naplóban ${m.bejegyzésekSzáma} bejegyzés van.\n`);

        res.write(`3. feladat:\nAz igazolt hiányzások száma ${m.összIgazolt}, az igazolatlanoké ${m.összIgazolatlan} óra.\n`);

        // Felhasználói input az 5. és 6. feladatokhoz
        // A mintában lévő adatokat állítja be,
        // vagy a paramétereken keresztül megadottakat (ha vannak)
        const params = new url.URL(req.url as string, `http://${req.headers.host}/`).searchParams;

        const honap: string = params.has("honap") ? (params.get("honap") as string) : "2";
        const nap: string = params.has("nap") ? (params.get("nap") as string) : "3";
        const napnev: string = params.has("napnev") ? (params.get("napnev") as string) : "szerda";
        const ora: string = params.has("ora") ? (params.get("ora") as string) : "3";

        let sHonapSsz = "5.feladat:\nA hónap sorszáma = ";
        sHonapSsz += "<select name='honap' onChange = 'this.form.submit();'>";
        for (let i = 1; i < 13; i++) {
            sHonapSsz += `<option${honap === i.toString() ? " selected" : ""}>${i}</option>`;
        }
        res.write(sHonapSsz + "</select>\n");

        let sNapSsz = `A nap sorszáma = ${nap} --> 1`;
        sNapSsz += "<input type='range' name='nap' min='1' max='31' step='1' ";
        sNapSsz += `value='${nap}' style='width: 400px' onChange='this.form.submit();'>31\n`;
        res.write(sNapSsz);
        res.write(`Azon a napon ${Segéd.hetNapja(parseInt(honap, 10), parseInt(nap, 10))} volt.\n`);

        const napokNevei: string[] = ["hetfo", "kedd", "szerda", "csutortok", "pentek", "szombat", "vasarnap"];
        let sNapnev = "6.feladat:<br>A nap neve = <select name='napnev' onChange='this.form.submit();'>";
        napokNevei.forEach(n => {
            sNapnev += `<option${napnev === n ? " selected" : ""}>${n}</option>`;
        });
        res.write(sNapnev + "</select>\n");

        let sOraSsz = "Az óra sorszáma = <select name='ora' onChange='this.form.submit();'>";
        for (let i = 1; i < 8; i++) {
            sOraSsz += `<option${ora === i.toString() ? " selected" : ""}>${i}</option>`;
        }
        res.write(sOraSsz + "</select>\n");

        res.write(`Ekkor összesen ${m.megszámolHiányzások(napnev, ora)} óra hiányzás történt.\n`);

        res.write(`7.feladat:\nA legtöbbet hiányzó tanulók: ${m.legtöbbetHiányzóTanulók.join(" ")}\n`);

        res.write("</form>");

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
