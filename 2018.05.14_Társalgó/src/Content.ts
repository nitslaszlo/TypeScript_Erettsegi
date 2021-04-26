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

        // 1. feladat:
        const mo: Megoldás = new Megoldás("ajto.txt");

        res.write("2. feladat\n");
        res.write(`Az első belépő: ${mo.elsőBelépő}\n`);
        res.write(`Az utolsó kilépő: ${mo.utolsőKilépő}\n`);

        // 3. feladat:
        mo.áthaladástÍr("athaladas.txt");

        res.write(`4.feladat\nA végén a társalgóban voltak: ${mo.társalgóbanRagadt}\n`);

        res.write(`5.feladat\nPéldául ${mo.társalgóbanLegtöbben}-kor voltak a legtöbben a társalgóban.\n`);

        // 6. feladat:
        let inputAzon: number = parseInt(params.get("inputAzon") as string);
        if (isNaN(inputAzon)) inputAzon = 22;
        res.write(`6. feladat:\nAdja meg a személy azonosítóját! <input type='number' name='inputAzon' value=${inputAzon} style='max-width:100px;' onChange='this.form.submit();'>\n`);

        res.write("7. feladat\n");
        res.write(mo.mettőlMeddig(inputAzon));

        res.write(`8.feladat\nA(z) ${inputAzon}. személy összesen ${mo.társalgóbanTöltöttIdő(inputAzon)} percet volt bent, a megfigyelés végén ${mo.őTársalgóbanRagadt(inputAzon) ? "a társalgóban volt" : "nem volt a társalgóban"}.\n`);

        res.write("</pre></form></body></html>");
        res.end();
    }
}
