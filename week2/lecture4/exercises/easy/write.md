# Skriva till en .txt-fil

1. Använd den skapade .txt-filen, exempelvis `text.txt` med innehållet "Detta är en text" från Read-övningen eller skapa en ny.

2. Skapa en js-fil med namnet `write.js` och importera `fs` med hjälp av `require()`

3. Skriv till `text.txt` med `fs.writeFile` med valfritt innehåll (En sträng, med något annat än "Detta är en text")

4. Öppna text.txt med antingen read.js eller i operativsystemet och kolla resultatet?

5. Hantera om exempelvis ett fel uppstår

6. Ange flaggan "a" som tredje argument till funktionen och testa skriva till filen igen - vad får du för resultat?

7. Testa att implementera detta med hjälp av det Promise-baserade API'et istället för callbacks


----------------------------------------------------------------------
## HINTAR

Require använder vi för att importera en modul, ungefär som vi använt `import` i React
```js
const fs = require("fs");
```

För att hitta information om hur du skriver flaggan, kolla `https://nodejs.org/docs/latest/api/fs.html#file-system-flags`

För att skriva det med Promise-baserade API'et kan du behöva använda try-catch