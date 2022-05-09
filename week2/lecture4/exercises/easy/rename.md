# Byt namn på din .txt-fil

1. Använd den skapade .txt-filen, exempelvis `text.txt` - om du har raderat denna skapa en ny med valfritt innehåll.

2. Skapa en js-fil med namnet `rename.js` och importera `fs` med hjälp av `require()`

3. Byt namn på `text.txt` med `fs.rename` och ge den sökvägen på filen du vill flytta som första argument och destinationen som andra argument (`text.txt text2.txt`)

4. Kör `rename.js` och kontrollera om filen bytt namn

5. Skapa en ny mapp i samma folder med namnet `test-data`

6. Flytta `text.txt` med `fs.rename` och ge den sökvägen på filen du vill flytta som första argument och destinationen som andra argument (`text.txt test-data/text2.txt`)

7. Hantera om exempelvis ett fel uppstår

8. Testa att köra programmet en gång till utan att skapa filen, vad händer då?

9. Testa att implementera detta med hjälp av det Promise-baserade API'et istället för callbacks


----------------------------------------------------------------------
## HINTAR

Detta är samma sak som att använda `mv`, ex: `mv text.txt text-new.txt`

Require använder vi för att importera en modul, ungefär som vi använt `import` i React
```js
const fs = require("fs");
```

För att skriva det med Promise-baserade API'et kan du behöva använda try-catch