import fs from "fs";
import http from "http";
import BeKiLép from "./Bekilep";
import Vendég from "./Vendeg";

export default class Content {
    public content(req: http.IncomingMessage, res: http.ServerResponse): void {
        // favicon.ico kérés kiszolgálása:
        if (req.url === "/favicon.ico") {
            res.writeHead(200, { "Content-Type": "image/x-icon" });
            fs.createReadStream("favicon.ico").pipe(res);
            return;
        }
        res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
        res.write("<html><head><title>Fürdő 2017.10.25</title></head>");
        res.write("<body style='font-family: monospace;'>");
        res.write("<pre style='font-family: Courier; background-color: LightGray; font-size:18px;'>");

        const beKiLépések: BeKiLép[] = []; // be- és kilépéseket tároló vektor
        const forrás: string[] = fs.readFileSync("furdoadat.txt").toString().split("\n");
        forrás.forEach(i => {
            if (i.length > 0) beKiLépések.push(new BeKiLép(i.trim()));
        });

        const vendégek: Vendég[] = []; // vendégeket tároló vektor

        beKiLépések.forEach(i => {
            const vindex: number = vendégek.map(x => x.vazon).indexOf(i.vazon);
            if (vindex === -1) {
                // új vendég
                vendégek.push(new Vendég(i.vazon, i.ido));
            } else {
                // már a v vektorban létező vendég
                vendégek[vindex].részlegek[i.részleg]++; // hova lépett be?
                vendégek[vindex].ment = i.ido; // a legvégén az fürdő elhagyási ideje lesz
            }
        });

        res.write("<p>2. feladat<br>");
        res.write(`Az első vendég ${vendégek[0].jött.toLocaleTimeString()}` + "-kor lépett ki az öltözőből.<br>");
        res.write(`Az utolsó vendég ${vendégek[vendégek.length - 1].jött.toLocaleTimeString()}` + "-kor lépett ki az öltözőből.</p>");

        res.write("<p>3. feladat<br>");
        let vdb: number = 0;
        vendégek.forEach(i => {
            if (i.részlegDb === 2) vdb++; // öltözőben és egy másik részlegen
        });
        res.write(`A fürdőben ${vdb} vendég járt csak egy részlegen.</p>`);

        res.write("<p>4. feladat<br>A legtöbb időt eltöltő vendég:<br>");
        vendégek.sort((a, b) => {
            return b.fürdőbenEltöltöttIdőMs - a.fürdőbenEltöltöttIdőMs;
        });
        res.write(`${vendégek[0].vazon}  vendég  ${vendégek[0].FürdőbenEltöltöttIdő}</p>`);

        res.write("<p>5. feladat<br>");
        const stat: number[] = [0, 0, 0]; // a három időszakhoz
        vendégek.forEach(i => {
            if (i.jött < new Date(1970, 1, 1, 9, 0, 0, 0)) stat[0]++;
            else if (i.jött >= new Date(1970, 1, 1, 16, 0, 0, 0)) stat[2]++;
            else stat[1]++;
        });
        res.write(`6 és 9 óra között ${stat[0]} vendég<br>`);
        res.write(`9 és 16 óra között ${stat[1]} vendég<br>`);
        res.write(`16 és 20 óra között ${stat[2]} vendég</p>`);

        // 6. feladat: szauna.txt
        for (let i: number = 0; i < beKiLépések.length; i++) {
            if (beKiLépések[i].részleg === 2 && beKiLépések[i].beKi === 1) {
                // ha a szaunából kilép
                const vindex: number = vendégek.map(x => x.vazon).indexOf(beKiLépések[i].vazon);
                vendégek[vindex].szaunábanEltöltöttIdőMs += beKiLépések[i].ido.getTime() - beKiLépések[i - 1].ido.getTime();
            }
        }

        const szaunaKi: string[] = [];
        vendégek.forEach(i => {
            if (i.szaunábanEltöltöttIdőMs > 0) {
                szaunaKi.push(`${i.vazon} ${i.szaunábanEltöltöttIdő}\r\n`);
            }
        });
        fs.writeFileSync("szauna.txt", szaunaKi.join(""));

        res.write("<p>7. feladat<br>");
        const reszlegStat: number[] = [0, 0, 0, 0, 0]; // az öt részleghez
        vendégek.forEach(i => {
            for (let j: number = 0; j < i.részlegek.length; j++) {
                if (i.részlegek[j] > 0) reszlegStat[j]++;
            }
        });
        res.write(`Uszoda: ${reszlegStat[1]}<br>`);
        res.write(`Szaunák: ${reszlegStat[2]}<br>`);
        res.write(`Gyógyvizes medencék: ${reszlegStat[3]}<br>`);
        res.write(`Strand: ${reszlegStat[4]}</p>`);
        res.write("</pre>");

        res.write("<b>Feladat, javítási, forrás(ok), forráskód GitHub repository:</b><br>");
        res.write("<a href='https://github.com/nitslaszlo/ErettsegiFurdoTsNode' target='_blank'>" + "https://github.com/nitslaszlo/ErettsegiFurdoTsNode</a><br><br>");

        res.write("<b>Az elkészített szauna.txt fálj:</b><br>");
        const szaunaEll: string[] = fs.readFileSync("szauna.txt").toString().split("\n");
        szaunaEll.forEach(i => res.write(`${i.trim()}<br>`));

        res.write("<b>A forrás furdoadat.txt fájl:</b><br>");
        forrás.forEach(i => res.write(`${i.trim()}<br>`));

        res.end("</body></html>");
    }
}
