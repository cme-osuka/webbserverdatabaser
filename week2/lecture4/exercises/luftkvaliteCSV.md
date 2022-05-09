# Luftkvalité Södertälje

## Importera Luftkvalité-data från CSV
1. Skapa en mapp för denna övningen och hämta .csv-filen jag länkat till nedan, antingen genom direktlänken eller på dataportal.se (välj CSV Luftkvalitetsdata PM10 - Birkakorset) och spara den i samma mapp

## Sätta upp CSV-parser
1. Kör `npm init` för att skapa en package.json
2. Installera modulen csv med `npm install csv`

## Använda ReadStream för att läsa större data-filer
Till skillnad från när vi använt readFile kan du använda något som kallas `createReadStream`, där du istället lyssnar på event och får datan i chunks allt efterhand som den läses in.

Dessa kan du lyssna på genom att skriva
```js
fs.createReadStream("BirkakorsetData.csv", { encoding: "utf-8" })
.on("data", (chunk) => {
  console.log(chunk);
})
```

Samt lyssna på när den läst färdigt och den kallar på eventet `end`

```js
fs.createReadStream("BirkakorsetData.csv", { encoding: "utf-8" })
.on("data", (chunk) => {
  console.log(chunk);
})
.on("end", () => {
  console.log("Done")
})
```

Sätt upp en `createReadStream` som läser från .csv-filen och console.loggar ut varje chunk den laddar in

## Parsa data med .pipe() och CSV-parsern
För att parsa CSV-datan kan vi göra det själva eller använda oss av ett paket som hjälper oss med detta. I denna övningen kommer vi använda ett paket som heter `csv` för att tolka CSV-datan.

```js
const { parse } = require("csv-parse");
```

Det finns en metod på `createReadStream` du kan köra datan genom, för att exempelvis parsa i detta fallet CSV-data. Man passar då med funktionen som ska kallas på i pipe. 

```js
fs.createReadStream("")
.pipe(parse())
.on("data", (chunk) => ...)
```

För att berätta hur CSV-datan ska separeras, behöver vi skicka med ett objekt med parametern `delimiter` till vår CSV-parser, där vi berättar hur vi separerar datan i vår CSV-fil

```js
.pipe({ delimiter: ";" })
```

Testa att console.logga chunksen i våra `.on("data", (chunk) => {}) `

## Analysera data och sammanfatta resultat
Med hjälp av gränsvärdena nedan, analysera datan från CSV-filen och sammanfatta antalet dagar med respektive gränsvärden. Exempel på resultat du kan skriva ut:


```
Totalt: (result.length) dagar
Bra: 40 dagar,
Medel: 32 dagar,
Dåligt: 46 dagar,
Inget mätvärde: 72 dagar
etc..

Sämsta dagen: "2013-07-23 med värdet 9001"
```

Med hjälp av `end`-eventet kan du då skriva ut resultatet, den kallas på när allt är färdigt.


## Gränsvärden 
```
Bra: < 40
Medel: 40-80
Dåligt: 80-120
Mycket dåligt: 120-300
Extremt dåligt: >300
```

## Data kan du hitta på: 
Dataportal.se: https://www.dataportal.se/sv/datasets/75_2023/data-luftkvalitet-iot-i-sodertalje#ref=?p=1&q=co2&s=1&t=20&f=http%3A%2F%2Fpurl.org%2Fdc%2Fterms%2Fformat%7C%7Ctext%2Fcsv%7C%7Cfalse%7C%7Cliteral_s%7C%7CFormat%7C%7Ctext%2Fcsv&rt=dataset%24esterms_IndependentDataService%24esterms_ServedByDataService&c=false
eller 

Direktlänk: https://catalog.sodertalje.se/store/1/resource/401


## HINTAR

Du kommer behöva köra `npm init` och installera en npm-modul för att slutföra denna övningen

Require använder vi för att importera en modul, samma gäller för npm-moduler du installerat
```js
const fs = require("fs");
```


