import fs from "fs";
import http from "http";
import { ParsedUrlQuery } from "querystring";
import url from "url";
import Megoldás from "./megoldas";

export default class Content {
    public content(req: http.IncomingMessage, res: http.ServerResponse): void {
        // req: http.IncomingMessage -> Bejövő kérés (request), pl.: paraméterek
        // res: http.ServerResponse -> Webszerver válasza (response) az összerakott weboldal

        // favicon.ico kérés kiszolgálása:
        if (req.url === "/favicon.ico") {
            res.writeHead(200, { "Content-Type": "image/x-icon" });
            fs.createReadStream("favicon.ico").pipe(res);
            return;
        }

        res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
        res.write("<!DOCTYPE html>");
        res.write("<html lang='hu'><head><title>Tesztverseny 2017.05.15</title></head>");
        res.write("<body><pre style='font-family: monospace;'>");
        res.write("<form style='font-family: Courier; font-size:16px; background-color: LightGray;'>");

        res.write("<p>1. feladat: Az adatok beolvasása</p>");

        // Az URL-ben átadott paraméterek lekérdezése:
        const query: ParsedUrlQuery = url.parse(req.url as string, true).query;
        // http://localhost:8080
        // Ha nincs vazon paraméter, akkor beállítja az alapértelmezett (mintán látható) értéket
        // http://localhost:8080/?vazon=JO001&sorszam=8
        // Ha van vazon paraméter, akkor kiolvassa és eltárolja az értékét
        // query.vazon as string -> típuskényszerítés C# (byte)hónapSorszáma
        const vazon: string = query.vazon === undefined ? "AB123" : (query.vazon as string);
        // Hasonlóan jár el a sorszam paraméter esetén is:
        let sorszam: string = query.sorszam === undefined ? "10" : (query.sorszam as string);
        // query.sorszam as string -> típuskényszerítés, mivel lehetne a paraméter string[]-is,
        // azaz több értéket is átadhatna, de itt biztosan csak egy érték lesz

        const megoldások: Megoldás[] = []; // Versenyző osztálypéldányokat tároló vektor
        const forrás: string[] = fs.readFileSync("valaszok.txt").toString().split("\n");
        // a windows-os szöveges fájlok végén két vezérlőkarakter (kód) van: 13->"\r" és a 10->"\n"
        // Linux (Unix), MacOs esetén csak a 13->"\n" van, így a megoldás "univerzális"
        // Windowsnál .split("\n") után a sorok végén a "\r" ott marad, ezt törli a .trim():
        Megoldás.helyesMegoldás = forrás[0].trim(); // statikus mező (helyesMegoldás) elérése
        for (let i = 1; i < forrás.length; i++) {
            // az üres sorok feldolgozását védi a .length > 0 feltétel
            // v.push() -> Új elemet (itt objektumot) tesz a vektor végére
            if (forrás[i].length > 0) megoldások.push(new Megoldás(forrás[i].trim()));
        }

        // Minta a saját írható jellemző használatára
        // Nem a megoldás része
        megoldások[0].válasz = "BXCDBBACACADBC";

        res.write(`<p>2. feladat: A vetélkedőn ${megoldások.length} versenyző indult.</p>`);

        // onChange = 'this.form.submit() -> Enter leütésére csinál egy Submit()-ot
        // name= 'vazon' -> vazon lesz a paraméter azonosítója
        // value='${vazon} -> vazon paraméter értékét a vazon változó határozza meg
        res.write("<p>3. feladat: A versenyző azonosítója = " + "<input type = 'text' name= 'vazon' " + "style= 'font-family:Courier; font-size: inherit; background-color: LightBlue;'" + `value='${vazon}' onChange = 'this.form.submit();'><br>`);

        // versenyző keresése a kódszáma alapján
        // példa az Union type-ra
        let tmp: Megoldás | undefined;
        for (const i of megoldások) {
            if (i.kód === vazon) {
                tmp = i;
                break;
            }
        }

        // ha nincs a megadott versenyző, lezárja a választ (res)
        // majd befejezi a content() metódus végrehajtását (return)
        if (tmp === undefined) {
            res.end();
            return;
        }
        // ha megtaláltuk, akkor kiírjuk a válaszait:
        res.write(`${tmp.válasz} (a versenyző válasza)</p>`);

        res.write("<p>4. feladat:<br>");
        res.write(Megoldás.helyesMegoldás + " (a helyes megoldás)<br>");
        res.write(tmp.válaszMinta() + " (a versenyző helyes válaszai)</p>");

        // ha a "sorszam" paraméter nem szám,
        // akkor állítsuk vissza az alapértelmezett értéket (10-et):
        if (!parseInt(sorszam, 10)) sorszam = "10";

        // hosszú string literál sorok tördelése összefűzéssel (+)
        // példa a normál "string literál" és a `template string` összeadására:
        res.write("<p>5. feladat: A feladat sorszáma = " + "<input type='number' name='sorszam' style='font-family:Courier;" + "font - size: inherit; background:Lightblue;'" + `value='${sorszam}' onChange = 'this.form.submit();'><br>`);

        // Egyszerű megszámlálás:
        let dbHelyes = 0; // A megadott sorszámú kérdésre hányan válaszoltak helyesen
        const kérdésIndexe: number = parseInt(sorszam, 10) - 1; // a kérdés indexe

        // Megoldás hagyományos for ciklussal
        // tslint:disable-next-line: prefer-for-of
        // for (let i: number = 0; i < megoldások.length; i++) {
        //     if (megoldások[i].helyesenVálaszolt(kérdésIndexe)) dbHelyes++;
        // }

        // Megoldás for-of ciklussal:
        // for (const i of megoldások) {
        //     if (i.helyesenVálaszolt(kérdésIndexe)) dbHelyes++;
        // }

        // Megoldás a vektor forEach metódusával
        megoldások.forEach(i => {
            if (i.helyesenVálaszolt(kérdésIndexe)) dbHelyes++;
        });

        res.write(`A feladatra ${dbHelyes} fő, a versenyzők ` + ((dbHelyes / megoldások.length) * 100).toFixed(2) + "%-a adott helyes választ.</p>");
        // JavaScript:
        // Valós osztás: a / b
        // Maradékképzés: a % b
        // Egész osztás: Math.trunc(a / b)

        res.write("<p>6. feladat: A versenyzők pontszámának meghatározása</p>");
        const ki: string[] = [];
        megoldások.forEach(i => ki.push(`${i.kód} ${i.pontszám()}\r\n`));
        fs.writeFileSync("pontok.txt", ki.join(""));

        res.write("<p>7. feladat:  A verseny legjobbjai:<br>");
        // vektor rendezése a .sort() metódussal
        // Az (aktuális, aktuálistKövető) => aktuálistKövető.pontszám() - aktuális.pontszám()
        // egy kétváltozós arrow függvény
        // ha a függvény >0 értékkel tér vissza, akkor cseréli az egymás melletti párokat
        // a végrehajtás után a sorrend csökkenő lesz a vektorban:
        megoldások.sort((aktuális, aktuálistKövető) => aktuálistKövető.pontszám() - aktuális.pontszám());

        let díj = 0;
        let pontElőző = -1;
        for (const i of megoldások) {
            if (pontElőző !== i.pontszám()) {
                díj++;
                if (díj === 4) break;
            }
            res.write(`${díj}.díj(${i.pontszám()} pont): ${i.kód}<br>`);
            pontElőző = i.pontszám();
        }
        // res.write("</p><input type='submit' value='Frissítés'></form>");
        res.write("</form>");

        res.write("<b>Feladat, javítási, forrás(ok), forráskód GitHub repository:</b><br>");
        res.write("<a href='https://github.com/nitslaszlo/ErettsegiTesztversenyTsNode' target='_blank'>" + "https://github.com/nitslaszlo/ErettsegiTesztversenyTsNode</a><br>");

        res.write("<br><b>Az elkészített pontok.txt fájl:</b><br>");
        fs.readFileSync("pontok.txt")
            .toString()
            .split("\n")
            .forEach(i => res.write(`${i.trim()}<br>`));

        res.write("<br><b>A forrás valaszok.txt fájl:</b><br>");
        fs.readFileSync("valaszok.txt")
            .toString()
            .split("\n")
            .forEach(i => res.write(`${i.trim()}<br>`));

        res.end("</pre></body></html>");
    }
}
