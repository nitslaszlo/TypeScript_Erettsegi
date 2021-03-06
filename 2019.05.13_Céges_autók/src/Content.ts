﻿import fs from "fs";
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
        res.write("<title>Céges autók</title>");
        res.write("</head>");
        res.write("<body><form><pre>");
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const params = new url.URL(req.url as string, `http://${req.headers.host}/`).searchParams;

        // Kezd a kódolást innen -->
        const m: Megoldás = new Megoldás("autok.txt");

        res.write(`2. feladat:\n${m.utolsóKihatás.nap}. nap rendszám: ${m.utolsóKihatás.rendszám}\n`);

        let inputNap: number = parseInt(params.get("iNap") as string);
        if (isNaN(inputNap)) inputNap = 4;
        res.write(`3. feladat:\nNap: <input type='number' name='iNap' value=${inputNap} style='max-width:100px;' onChange='this.form.submit();'>\n`);
        res.write(`Forgalom a(z) ${inputNap}. napon:\n`);
        res.write(m.forgalom(inputNap));

        res.write(`4. feladat:\nA hónap végén ${m.kintMaradtAutókSzáma} autót nem hoztak vissza.\n`);

        res.write("5. feladat:\n");
        res.write(m.távolságStatisztika);

        res.write(`6. feladat:\nLeghosszab út: ${m.maxTávÁthajtás.megtettTáv} km, személy: ${m.maxTávÁthajtás.azon}\n`);

        let rendszam: string = params.get("rendszam") as string;
        if (!rendszam) rendszam = "CEG300";

        res.write("7. feladatg");
        res.write(`Rendszám: <input type='text' name='rendszam' value=${rendszam} style='max-width:100px;' onChange='this.form.submit();'>\n`);
        m.menetleveletKészít(rendszam);
        res.write("Menetlevél kész.");

        // <---- Fejezd be a kódolást

        res.write("</pre></form></body></html>");
        res.end();
    }
}
