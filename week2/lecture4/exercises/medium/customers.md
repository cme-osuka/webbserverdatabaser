# Läs och skriv till samma JSON-fil

1. Skapa en en .json-fil, exempelvis `customers.json` med innehållet `{ customers: [] }`

2. Skapa en js-fil med namnet `customers.js` och importera `fs` med hjälp av `require()`

3. Läs filen `customers.json` med `fs.readFile` och console.logga innehållet.

4. Skriv en funktion som läser, parsar och sparar innehållet med i en variabel i funktionen

5. Ändra innehållet i JSON-objektet genom att pusha ett kund-objekt till customers-arrayen

6. Spara slutligen innehållet i JSON-objektet med `fs.writeFile` och kontrollera så datan ändrats

7. Hantera om exempelvis ett fel uppstår vid läsning eller skrivning av filen

BONUS: 
- Testa att implementera detta med hjälp av det Promise-baserade API'et istället för callbacks
- Testa att lägga till argument när du kallar på funktionen och skicka med ex. namn och adress i terminalen (`node customers.js kalle "Ankavägen 32, 215 32 Malmö"`)

----------------------------------------------------------------------
## HINTAR

Exempel på ett Customer-objekt:
```js
{
  name: "Oscar",
  address: "Gatans gränd 69",
  phone: "+46123456",
  order: {
    item: "Nuggets",
    qty: "9001"
  }
}
```

Require använder vi för att importera en modul, ungefär som vi använt `import` i React
```js
const fs = require("fs");
```

För JSON kan du behöva använda `parse` och `stringify` när du läst ut data eller skriver data till filen

Du skulle kunna kalla på `writeFile` för att skriva till filen inuti din `readFile`-callback

Du kan behöva använda en inbyggd metod för att omvandla innehållet från en Buffer

För att skriva det med Promise-baserade API'et kan du behöva använda try-catch
