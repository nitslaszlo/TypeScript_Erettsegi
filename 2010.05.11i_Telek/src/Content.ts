import fs from "fs";
import http from "http";
import Megoldás from "./Megoldás";
import Grafika from "./Grafika";

export default class Content {
    /** Metódus a webszerver (http) konstruktorához
     * @param  {http.IncomingMessage} req Bejövő üzenetek, kérések
     * @param  {http.ServerResponse} res Webszerver válasza
     * @returns void
     */
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
        res.write("<title>eUtazás</title>");
        res.write("</head>");
        res.write("<body><form><pre>");

        // Kezd a kódolást innen -->

        // 1. Olvassa be a telkek.txt állományban található adatokat,
        // s annak felhasználásával oldja meg a következő feladatokat!
        const megold: Megoldás = new Megoldás("telkek.txt");

        // 2. Hány métert kell annak gyalogolnia, aki körbe akarja járni a két utcát?
        // A kiszámított távolságot írassa ki a képernyőre!
        res.write(`2. Feladat: A séta hossza: ${megold.sétaHossza}m<br>`);

        // 3. Az önkormányzat előírásai szerint a 20 m széles vagy annál keskenyebb telkek esetén
        // teljes utcafront beépítést kell alkalmazni.
        // Határozza meg és a képernyőre írassa ki, hogy ez hány telekre vonatkozik a Jólétsoron!
        res.write(`3. Feladat: Teljes beépítés a Jólétsoron: ${megold.teljesBeépítésJólétsor}db telek<br>`);

        // 4. Hány háznyira van egymástól a legnagyobb és a legkisebb területű telek Gazdagsoron?
        // A két telek között elhelyezkedő telkek számát, valamint a legnagyobb és legkisebb telek házszámát,
        // illetve területét írassa ki a képernyőre!
        res.write("4. Feladat: Távolság:<br>");
        res.write(`\t${megold.legnagyobbLegkisebbTelkekTávolsága} háznyi távolságra van egymástól Gazdagsor legnagyobb és legkisebb telke<br>`);
        res.write(`\tLegnagyobb telek - házszám: ${megold.legnagyobbTelekGazdagsor.házszám}, terület: ${megold.legnagyobbTelekGazdagsor.terület}m<sup>2</sup><br>`);
        res.write(`\tLegkisebb telek - házszám: ${megold.legkisebbTelekGazdagsor.házszám}, terület: ${megold.legkisebbTelekGazdagsor.terület}m<sup>2</sup><br>`);

        // 5. Az önkormányzat telekadót fog kivetni. Az adót Fabatkában számolják.
        // A 700 négyzet-méteres és annál kisebb telkek esetén ez 51 Fabatka négyzetméterenként,
        // az ennél nagyobb telkeknél az első 700 négyzetméterre vonatkozóan szintén 51 Fabatka,
        // 700 négyzetméter felett egészen 1000 négyzetméterig 39 Fabatka a négyzetméterenkénti adó.
        // Az 1000 négyzetméter feletti részért négyzetméter árat nem, csak 200 Fabatka egyösszegű általányt kell fizetni.
        // A 15 m vagy annál keskenyebb, illetve a 25 m vagy annál rövidebb telkek tulajdonosai
        // 20% adókedvezményben részesülnek.
        // Az adó meghatározásánál 100 Fabatkás kerekítést kell használni (pl. 6238 esetén 6200, 6586 esetén 6600).
        // Határozza meg, mekkora adóbevételre számíthat Gazdagsor után az önkormányzat!
        res.write(`5. feladat: Adó a Gazdagsoron ${megold.agóGazdagsor} fabatka.<br>`);

        // 6. Melyik a 3 utolsó telek a Jólétsoron?
        // A házszámokat és a telkeknek a Jólétsor elejétől mért távolságát írja ki a képernyőre
        // a házszámok szerint csökkenő sorrendben!
        res.write("6. feladat: Utolsó 3 telek a Jólétsoron<br>");
        for (let i: number = megold.jólétsoriTelkekRendezveHsz.length - 1; i > megold.jólétsoriTelkekRendezveHsz.length - 4; i--) {
            res.write(`\tHázszám: ${megold.jólétsoriTelkekRendezveHsz[i].házszám} Táv: ${megold.jólétsoriTelkekRendezveHsz[i].telekKezdete}m<br>`);
        }

        // 7. Határozza meg Jólétsor telkeinek hosszúságát! Vegye figyelembe, hogy a szemben fekvő telkek patak felőli
        // határvonalait az utcafrontra merőleges irányban legalább 10 méternek kell elválasztania egymástól!
        // Szemben fekvőnek számítanak a telkek akkor is, ha csak a telkek valamelyik széle van egymással szemben.
        // (Például a 10-es számú telekkel csak a 9-es és 11-es számú telek van szemben.)
        // A számításnál a feltételnek megfelelő legnagyobb telkeket kell kialakítani!
        // Jólétsor adatait írja ki a joletsor.csv fájlba!
        // Az egyes sorok-ban a házszám, a szélesség és a hosszúság szerepeljen!
        // Az adatokat pontosan egy pontos-vessző válassza el egymástól!
        res.write("7. Feladat: Jólétsor telkeinek hosszúsága: joletsor.csv\n");
        megold.jolétsoriTelkeketÁllománybaÍr("joletsor.csv");

        // Nem a feladat (megoldás) része :
        res.write("\nNem a feladat (megoldás) része:\n\n");
        res.write("<u>Grafika:</u>\n");
        res.write("<br><div style='position:relative;background:blue;color:black;" + "width:1140px;height: 220px; font-family:segoe ui; font-size:10px'>");
        megold.telkek.forEach(i => res.write(Grafika.telketRajzol(i)));
        res.write("</div><br>");

        res.write("\n\n<u>GitHub repository:</u> ");
        res.write("<a href='https://github.com/nitslaszlo/Erettsegi-TelekTs/' target='_blank'>GitHub</a><br>");

        res.write("\n\n<u>A joletsor.csv fájl:</u>\n");
        fs.readFileSync("joletsor.csv")
            .toString()
            .split("\n")
            .forEach(i => res.write(`${i.trim()}<br>`));

        res.write("\n\n<u>A forrás telkek.txt fájl:</u>\n");
        fs.readFileSync("telkek.txt")
            .toString()
            .split("\n")
            .forEach(i => res.write(`${i.trim()}<br>`));

        // <---- Fejezd be a kódolást

        res.write("</pre></form></body></html>");
        res.end();
    }
}
