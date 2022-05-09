# Radera din .txt-fil

1. Använd den skapade .txt-filen, exempelvis `text.txt`

2. Skapa en js-fil med namnet `delete.js` och importera `fs` med hjälp av `require()`

3. Radera `text.txt` med `fs.unlink` och ge den sökvägen på filen du vill ta bort. (`text.txt`)

4. Kör `delete.js` och kontrollera om filen tagits bort

5. Hantera om exempelvis ett fel uppstår

6. Testa att köra programmet en gång till utan att skapa filen, vad får du för resultat?

7. Testa att implementera detta med hjälp av det Promise-baserade API'et istället för callbacks


----------------------------------------------------------------------
## HINTAR

Var försiktig när du använder `unlink()`, den tar bort filen permanent utan att lägga den i papperskorgen och går inte att återskapa.

Require använder vi för att importera en modul, ungefär som vi använt `import` i React
```js
const fs = require("fs");
```

För att skriva det med Promise-baserade API'et kan du behöva använda try-catch