import fs from "fs";
import http from "http";
import url from "url";
import Megoldás from "./Megoldás";

export default class Content {
    public static content(req: http.IncomingMessage, res: http.ServerResponse): void {
        // favicon.ico kérés kiszolgálása:
        if (req.url === "/favicon.ico") {
            res.writeHead(200, { "Content-Type": "image/x-icon" });
            fs.createReadStream("favicon.ico").pipe(res);
            return;
        }
        // Weboldal inicializálása + head rész:
        res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
        res.write("<!DOCTYPE html>");
        res.write("<html lang='hu'>");
        res.write("<head>");
        res.write("<style>input, pre {font-family:monospace; font-size:1em; font-weight:bold;}</style>");
        res.write("<meta name='viewport' content='width=device-width, initial-scale=1.0'>");
        res.write("<title>Jedlik Ts Template</title>");
        res.write("</head>");
        res.write("<body><form><pre>");
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const params = new url.URL(req.url as string, `http://${req.headers.host}/`).searchParams;

        // Kezd a kódolást innen -->
        const m: Megoldás = new Megoldás("szavazatok.txt");

        res.write(`2. feladat:\nA helyhatósági választáson ${m.jelöltekSzáma} képviselőjelölt indult.\n\n`);

        let inev: string = params.get("inev") as string;
        if (!inev) inev = "Fasirt Ferenc";
        res.write(`3. feladat:\nAdja meg a képviselő nevét! <input type='text' name='inev' size='30' value='${inev}' onChange='this.form.submit();'>\n`);
        res.write(`${m.képviselőKeresése(inev)}\n\n`);

        res.write(`4. feladat\nA választáson ${m.szavazatokSzáma.toLocaleString()} állampolgár, a jogosultak ${m.szavazottSzázalék}-a vett részt.\n\n`);

        res.write(`5. feladat\n${m.szavazatStat}\n\n`);

        res.write(`6. feladat\n${m.győztesKépviselők}\n\n`);

        // 7. feladat:
        m.állománytÍr("kepviselok.txt");

        // Nem a feladat része :
        res.write("<b>Feladat, javítási, forrás(ok), forráskód GitHub repository:</b><br>");
        res.write("<a href='https://github.com/nitslaszlo/TypeScript_Erettsegi' target='_blank'>https://github.com/nitslaszlo/TypeScript_Erettsegi</a><br><br>");

        res.write("<u>Az elkészített kepviselok.txt fájl:</u>\n");
        fs.readFileSync("kepviselok.txt")
            .toString()
            .split("\n")
            .forEach(i => res.write(`${i.trim()}<br>`));

        res.write("<u>A forrás szavazatok.txt fájl:</u>\n");
        fs.readFileSync("szavazatok.txt")
            .toString()
            .split("\n")
            .forEach(i => res.write(`${i.trim()}<br>`));

        // <---- Fejezd be a kódolást

        res.write("</pre></form></body></html>");
        res.end();
    }
}
