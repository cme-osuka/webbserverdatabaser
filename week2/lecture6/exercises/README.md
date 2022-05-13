# Övning - Kontaktlista API

I denna övningen ska vi applicera de delar vi pratat om under dagen genom att bygga en kontaktlista eller "telefonbok". Där vi har ett gäng kontakter och deras kontaktuppgifter.

## 1. Sätt upp en webbserver
Först behöver vi sätta upp grunden för vår webbserver. Det gör du genom att importera http-modulen och använda den inbyggda funktionen `http.createServer()`

[Nodes dokumentation - http.createServer](https://nodejs.org/api/http.html#httpcreateserveroptions-requestlistener)

## 2. Endpoint: /api/persons
I vår webbserver ska vi skapa vår första endpoint, som kommer svara med en array på exempel-användare. Du kan använda den jag skrivit här nedan:

```js
const people = [
    { 
      "id": 1,
      "name": "Kalle Karlsson", 
      "number": "044-123456"
    },
    { 
      "id": 2,
      "name": "Kurt Kurtsson", 
      "number": "044-5323523"
    },
    { 
      "id": 3,
      "name": "Yvonne Yvonnesdotter", 
      "number": "0709-230195"
    },
    { 
      "id": 4,
      "name": "Gert", 
      "number": "080-642343"
    }
]
```

På en GET-request till endpointen `localhost:PORT/api/persons` ska den svara med:

```JSON
[
    { 
      "id": 1,
      "name": "Kalle Karlsson", 
      "number": "044-123456"
    },
    { 
      "id": 2,
      "name": "Kurt Kurtsson", 
      "number": "044-5323523"
    },
    { 
      "id": 3,
      "name": "Yvonne Yvonnesdotter", 
      "number": "0709-230195"
    },
    { 
      "id": 4,
      "name": "Gert", 
      "number": "080-642343"
    }
]
```

## 3. Endpoint: /info
Implementera en endpoint som svara med HTML som motsvarar:

```
Din kontaktlista innehåller 3 kontakter.

Ons 11 Maj 2022 22:39:01 GMT+0100 (CEST)
```

Där den berättar hur många kontakter som finns i kontaktlistan samt tid/datum när requesten togs emot. Formatteringen på datum/tid är inte viktig - men den ska svara med åtminstone tid och datum när requesten kom in.

[MDN - Date](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date)

## 4. Endpoint: /api/persons/1
Implementera en endpoint som skickar tillbaka en enskild kontakt från kontaktlistan, till exempel Gert och hans information om vi skickar in ID:t 4 som parameter.

Implementera även så att ifall den inte skulle hitta ett specifikt ID, bör servern svara med passande statuskod.

[MDN - HTTP Statuscodes](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status)

## 5. Endpoint: DELETE /api/persons/1
Implementera en endpoint som gör att vi kan ta bort informationen om en användare i vår telefonbok, genom att göra ett HTTP-anrop med verbet DELETE följt av användarens ID.

Detta kan du testa med hjälp av en REST-klinet som Postman eller Insomnia, eller direkt i webbläsarens konsoll.

## 6. Endpoint: POST /api/persons
Implementera en endpoint som gör att du kan lägga till en kontakt i listan, med hjälp av ett anrop till /api/persons med verbet POST.

Generera ett nytt ID till användaren med hjälp av `Math.random`-funktionen. Försök hitta ett sätt där du genererar ett ID med liten risk för att få likadana IDn.

## 7. Felhantering & Validering: POST /api/persons
Implementera felhantering / validering av datan som kommer in till föregående endpoint med POST-verbet. Se till att den inte lägger till en användare och svarar klienten med en statuskod som berättar vad det är som gått fel.

Den ska kolla efter:
- Om namnet eller numret saknas
- Om namnet redan finns i kontaktlistan

Och svara på dessa med respektive statuskod och eventuellt skicka tillbaka ett meddelande till klienten som beskriver varför det gick fel. Exempelvis:
```
{ error: "Name or number was missing" }
```