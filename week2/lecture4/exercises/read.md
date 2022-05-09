# Läsa en .txt-fil

1. Skapa en en .txt-fil, exempelvis `text.txt` med innehållet "Detta är en text"

2. Skapa en js-fil med namnet `read.js` och importera `fs` med hjälp av `require()`

3. Läs filen `text.txt` med `fs.readFile` och console.logga innehållet.

4. Hantera om exempelvis ett fel uppstår

5. Testa att implementera detta med hjälp av det Promise-baserade API'et istället för callbacks


----------------------------------------------------------------------
## HINTAR

Require använder vi för att importera en modul, ungefär som vi använt `import` i React
```js
const fs = require("fs");
```

Du kan behöva använda en inbyggd metod för att omvandla innehållet från en Buffer

För att skriva det med Promise-baserade API'et kan du behöva använda try-catch