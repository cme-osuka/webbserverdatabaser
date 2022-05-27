# Kurs-projekt "Cars"
## Mål med uppgiften

Med denna uppgiften, lär vi oss sätta upp ett enklare RESTful API med hjälp av Express, och sätta grunden för något vi kan bygga vidare på. Vi kommer lära oss hur vi tar emot data på olika sätt från klienten, strukturera och separera ut routes i egna moduler och skapa relationer mellan dataset. 

- Enklare RESTful API med Express
- URL-parametrar och req.body
- Strukturera separata routes
- Enklare relationer mellan data

## Vad du behöver göra

### 1. Starta projektet

Först behöver vi sätta upp ett nytt projekt med Express, för det kan vi skapa ett nytt projekt:

```bash
# Vi behöver skapa en ny mapp för projektet
# och navigera in i den. Den behöver inte heta car-registry
# eller handla om bilar, men det kommer vi följa i uppgiften
mkdir car-registry
cd car-registry
# Vi behöver även skapa en fil för vår server
touch server.js
# Vi kör npm init för att skapa en package.json
# -y för att skippa och säga yes till allt
npm init -y
# Vi kommer använda Express, body-parser och uuid i denna
# övningen, så vi kan passa på att installera dessa också
npm install express body-parser uuid
```

### 2. Grunden för vår Express-app

När vi har skapat mappen och installerat paketen är det dags att sätta upp grunden för vår applikation. Denna är ganska straight forward.
Första vi behöver göra i vår ``server.js`` är att importera Express, för att skapa grunden för vår webbserver med Express!

```jsx
// server.js
const express = require("express");
```

Därefter behöver vi lägga kalla på ``express()``, en funktion från Express som returnerar ett Express-objekt med alla metoder och funktionalitet vi kan komma att använda. Detta sparar vi i variabeln ``app`` normalt sett.

```jsx
// server.js
const app = express(); // Returnerar ett Express-objekt och sparar det i app
```

Efter det kan vi kalla på ``app.listen(port, callback)`` för att köra igång lyssnaren, som kommer sitta och lyssna på inkommande requests till vår server. Och en callback som skriver ut i vår konsoll att servern kör!

```jsx
// server.js
app.listen(4000, () => {
	console.log("Servern kör på port 4000");
})
```

Och där har vi grunden för vår applikation! Kör vi den nu med ``$ node server.js`` så kommer den förhoppningsvis skriva ut “Servern kör på port 4000” i konsollen. 

### 3. Vår första router

Vi skulle kunna skriva routes direkt med ``app`` genom att skriva ``app.get("/", (req, res) => {})``  men vi kommer ta en annan approach direkt. Vi kommer skapa en separat router med hjälp av ``express.Router()``-klassen. Med den kommer vi skapa en Router som vi kommer kalla för ``ownersRouter`` som du säkert kan gissa - kommer innehålla ägarna av bilarna i vår applikation.

```jsx
// server.js
// ...
const app = express();

// Vi lägger till en router för ägarna
const ownersRouter = express.Router();

app.listen(4000, () => {
	console.log("Servern kör på port 4000");
})
// ...
```

Därefter kommer vi precis som vi skulle gjort på ``app``, deklarera våra routes på ``ownersRouter``. Genom att säga: 

```jsx
// server.js
const ownersRouter = express.Router();

ownersRouter.get("/owners", (req, res) => {
	res.json(owners); // Kommer senare innehålla våra ägare
});
```

Vi behöver även behöva en array som ska hålla i våra ägare, så vi kan deklarera den lite längre upp i filen. Förslagsvis någonstans under ``const app = express()``.

```jsx
// server.js
// ...
const app = express();

const owners = [];

const ownersRouter = express.Router();

// ...
```

Och den kommer vi vilja skicka med i vår respons till ``GET /owners``, så vi lägger till den i ``res.json()`` vi lade till precis.

För att Express ska veta om att vi ska använda dessa routes, behöver vi lägga till routern - som är en middleware, och middlewares lägger vi till med hjälp av ``app.use`` någonstans i applikationen. Förslagsvis precis innan ``app.listen``, så vi inte råkar lägga den innan ``body-parser`` som vi kommer lägga till senare.

```jsx
// server.js

app.use(ownersRouter);
```

### 4. Skapa resterande routes för Owners

Vi skulle även behöva skapa funktionaliteten för att lägga till, ändra och ta bort ägarna. 
Det räcker med en enkel CRUD-funktionalitet (Create, Read, Update, Delete) så vi kan hantera ägarna med hjälp av anrop till vår webbserver.

Dessa routesen ska vi skapa enligt RESTful-principen, 

Följande routes/endpoints på ``ownersRouter`` behöver implementeras:

- ``GET /owners`` - hämta alla ägare
- ``GET /owners/:id`` - hämta en ägare, baserat på dess id
- ``POST /owners`` - skapa en ägare
- ``DELETE /owners/:id`` - ta bort en ägare

För ``POST /owners`` behöver vi även ta en funderare på själva data-strukturen på ägarna, där vi behöver ett unikt ``id``  (med hjälp av ``uuid``) och eventuellt ett namn. Skulle vi vilja ha med något mer? 

```jsx
{ id: "", name: "Ryan Dahl" }
```

Till ``POST /owners`` behöver vi även lägga till middlewaren ``body-parser``, som dess namn kanske föreslår - parsar bodyn från vår request. Den gör det lättare för oss att läsa ut datan från requesten.

```jsx
// server.js
// ...
const express = require("express");
// Vi importerar body-parser här uppe, och eftersom
// vi inte kan använda - i variabelnamn, lägg märke
// till att jag döpt den enl. camelCase istället.
const bodyParser = require("body-parser");
const app = express();

const owners = [];

// Vi använder .use för att berätta för Express
// att vi vill använda middlewaren body-parser.
// Och vi kallar på dess metod .json() som 
// kommer hjälpa oss att komma åt bodyn från
// requests med content-typen application/json.
app.use(bodyParser.json();

const ownersRouter = express.Router();
// ...
```

När vi har lagt till denna, så kommer vi i vår ``POST /owners`` kunna läsa ut bodyn som skickas från klienten i ``req.body``:

```jsx
// Om frontenden skickar följande JSON:
// { "name": "Ryan Dahl" }
// kan vi läsa ut den i req.body.name
// Där .name motsvarar nyckeln i JSON-objektet vi 
// vi skickar in.

ownersRouter.post("/owners", (req, res) => {
	const name = req.body.name; 
	res.send(name);
})
```

Vi skulle även kunna lägga till “requests” för varje request vi kan tänka oss göra mot ``/owners`` i Insomnia, så vi kan testa våra endpoints lite lättare.

Till exempel en som skapar en ägare, en som hämtar alla ägare, en som hämtar en, osv.

### 5. Skapa routes för Cars

Utöver ägare behöver vi även skapa funktionaliteten för att lägga till, ändra och ta bort bilar. 
Det räcker med en enkel CRUD-funktionalitet här också så vi kan hantera bilarna med hjälp av anrop till vår webbserver.

Här behöver vi följa samma sätt vi skapade ``ownersRouter`` på och skapa våra endpoints på denna separata routern.

Följande routes/endpoints på ``carsRouter`` behöver implementeras:

- ``GET /cars`` - hämta alla bilar
- ``GET /cars/:id`` - hämta en bil, baserat på dess id
- ``POST /cars`` - skapa en bil
- ``DELETE /cars/:id`` - ta bort en bil

För ``POST /cars`` behöver vi även fundera på datastrukturen för bilarna, där vi behöver ett unikt ``id``  även här, eventuellt ``reg`` för regnummer samt ``maker`` för tillverkare/märke. 

Lägg gärna till mer värden om känner för det.

```jsx
{ id: "", reg: "CAT123", maker: "Rena }
```

Vi skulle även kunna lägga till “requests” för varje request vi kan tänka oss göra mot ``/cars`` i Insomnia, så vi kan testa våra endpoints lite lättare.

Till exempel en som skapar en bil, en som hämtar alla bilar, en som hämtar en bil, osv.

### 6. Skapa en enklare data-relation

Något vi kommer göra med hjälp av databaser är att skapa s.k. relationer mellan data, till exempel för att kunna koppla samman ägare och bil. Och istället för att vi gör detta direkt i ``owners`` eller ``cars`` kan vi välja att skapa relationer mellan de två. 

Det kan vi göra exempelvis genom att skapa en till array, utöver ``cars`` och ``owners`` där vi håller i objekt som “knyter samman” `id` på en ägare och ``id`` på en bil.

```jsx
// Exempel på en enklare relation
const relations = [
	{ ownerId: "", carId: "" },
	{ ownerId: "", carId: "" }
]
```

Där vi kan definiera vilken ägare som äger vilken bil genom att titta på ``ownerId`` och hitta respektive ``carId`` i vår lista på ``cars`` .

### 6.1 Hämta ut information om en ägare och dess bilar

Jag vill att du implementerar så att vi på ``GET /owners/:id`` ska kunna göra en request med ``id`` som URL-parameter och med hjälp av relationen vi skapade tidigare, ta reda på vilka bilar personen äger och svara med följande:

```json
{
	"owner": {
		"id": "",
		"name": "Ryan Dahl"
	},
	"cars": [
		{ "id": "", "maker": "Polestar", "reg": "ROH69W" }	
	]
}
```

Där bilarna är en array av bilarna personen äger, äger de flera stycken vill jag att de visar samtliga bilar de äger.

### Färdig?

Vi kommer jobba vidare på vårt bil-projekt, så säg till om du hunnit färdigt med allt såhär långt - så ger jag dig nästa set av instruktioner! :)
