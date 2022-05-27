# Kurs-projekt "Cars" (del 2)

## Mål med uppgiften

Med denna uppgiften, lär vi oss sätta upp ett enklare RESTful API med hjälp av Express, och sätta grunden för något vi kan bygga vidare på. Vi kommer lära oss hur vi tar emot data på olika sätt från klienten, strukturera och separera ut routes i egna moduler och skapa relationer mellan dataset.

- Applicera MVC-design pattern på vårt projekt
- Strukturera moduler/filer på ett bättre sätt

[https://developer.mozilla.org/en-US/docs/Glossary/MVC](https://developer.mozilla.org/en-US/docs/Glossary/MVC)

## Vad du behöver göra

### 1.  Controllers

Det är dags att applicera Model View Controller design pattern’et på vår applikation, där vi delar upp koden i delar baserat på vad dens uppgift är. Och den första vi ska sätta upp är controllern. Den som våra användare kommer interagera med - genom att tolka och processa requestsen från användarna och genomföra lämpliga åtgärder baserat på vad som ska göras. 

I Express är våra controllers våra ``request handling functions``, dvs de funktioner som vi passar till våra routes.

```jsx
// server.js

carRouter.get("/cars", (req, res) => {});
                Denna: ^^^^^^^^^^^^^^^^
```

Så vi skulle kunna börja med att flytta ut dessa till våra controllers, och vi kommer skapa en controller för varje “resurs” vi har.

Men innan vi gör det behöver vi skapa en ny mapp, vi kommer lägga den i roten av applikationen och kalla den ``controllers``. Så det är enkelt för oss att veta vart dessa lever!

I denna kommer vi skapa controllersen som kommer hålla i dessa funktioner, där vi skapar två stycken:

En ``cars.controller.js`` och en ``owners.controller.js`` .

I dessa kommer vi flytta över våra request handlers för respektive routes, exempelvis ``GET /owners`` och dess handler-funktion ``(req, res) => {}`` flyttar vi över till ``owners.controller.js``.

```jsx
// owners.controller.js

// Notera att vi omvandlar den från en anonym funktion
// till en namngiven funktion, med nyckelordet function.
function getOwners(req, res) {
	res.send(owners);
}
// Det går att köra anonyma funktioner, men då vet inte
// Node vad funktionen heter (getOwners) om den stöter på
// ett fel. Så vi gör det för att lättare kunna felsöka!
```

Och vi kommer göra detta för samtliga controllers. **Kom ihåg ihåg att ge dessa namn som motsvarar funktionaliteten de har, exempelvis ``getOwners``, ``getOwner``, ``addOwner``, ``deleteOwner`` osv. Så vi vet vad de gör utan att behöva gissa.

När vi sedan flyttat över dessa, så skulle vi behöva lägga till funktionerna igen i våra routes - fast importerade från vår owners.controller.js. För det behöver vi exportera dessa först.

```jsx
// owners.controller.js

module.exports = {
  getOwners: getOwners,
  getOwner: getOwner,
  // ... och resterande funktioner
}
```

och sedan i ``server.js`` kommer vi importera dessa som ``ownersController`` och kalla på respektive funktion på respektive route:

```jsx
// server.js
const express = require("express");
const bodyParser = require("body-parser");
const uuid = require("uuid");

const ownersController = require("./controllers/owners.controller");

// ...
```

och sedan i våra routes:

```jsx
// server.js
// ...

const ownerRouter = express.Router();

ownerRouter.get("/owners", ownersController.getOwners);
ownerRouter.get("/owners/:id", ownersController.getOwner);
// osv..
```

Och när vi gjort det tänker vi nog - nu kan vi testa vår applikation och se om det funkar! 

Gör du det, så kommer du nog få ett error-meddelande när du försöker komma åt ``owners`` i någon av dina routes. Det är för att den här arrayen kanske fortfarande ligger i ``server.js``, och då finns ju inte den inuti vår controller. Den kan inte komma åt variabler från andra filer hur som helst.

Så innan vi kan få servern att funka, behöver vi lägga till nästa del i vår MVC-struktur: Modellen.

### 2. Models

Så, precis som vi gjorde med våra controllers - så behöver vi skapa filstrukturen för våra modeller. Där vi kommer skapa en mapp i projekt-roten som vi kallar.. (you guessed it) ``models`` som kommer innehålla våra model-moduler.

Och inuti den mappen behöver vi skapa en model för varje resurs, dvs - har vi ``owners`` och ``cars`` så ska vi skapa ``owners.model.js`` och ``cars.model.js`` i ``/models``-mappen.

Och i dessa kommer logiken för hur vi interagerar med vår databas ligga i framtiden, men nu eftersom vi inte kommit dit än - kommer vi att lägga våra arrays som håller i datan där inuti. Och i princip bara exportera dessa. (Och ta bort den som ligger i ``server.js`` såklart)

```jsx
// owners.model.js

const owners = [];

module.exports = owners;
```

Och som vi upptäckte innan, behöver vi importera den i vår controller för att kunna komma åt ``owners``-arrayen och skicka den tillbaka till användaren. 

```jsx
// owners.controller.js
// Notera att vi behöver upp ett steg i mappstrukturen, för att komma åt models
const model = require("../models/owners.model");

function getOwners(req, res) {
	// Eftersom vi exporterar arrayen owners direkt, så kan vi använda
  // model som en array. Så vi byter ut owners till model sålänge.
  res.send(model);
}
```

Det är även här i modellen vi skulle kunna lägga till funktioner som sköter logiken för att ändra en ägare. Till exempel om vi skulle skriva en updateOne-funktion för att ändra en ägare:

```jsx
// owners.model.js

const owners = [];

function updateOne(id, data) {
  // Logik för att uppdatera och ändra en användare
}

// Notera att vi inte längre exporterar owners direkt,
// så sättet vi kommer interagera med modellen jämfört med exemplet ovan
// kommer skilja sig. Den importerade modellen är nu ett objekt med arrayen 
// owners och funktionen updateOne.
module.exports = {
	owners: owners,
  updateOne: updateOne
}
```

```jsx
// owners.controller.js
const model = require("../models/owners.model");

function getOwners(req, res) {
	// När vi exporterar ett objekt med owners-arrayen och funktionen updateOne
  // behöver vi då ändra hur vi interagerar med model'en. 
  // För att skicka arrayen behöver vi då skicka model.owners istället.
  res.send(model.owners);
} 
```

### 3. Applicera den principen på både owners och cars

Om du inte redan gjort detta, så kan du applicera den principen eller design pattern’et vi precis testat med controllers och modeller på både ``cars`` och ``owners``. 

Den enkla relationen som vi skapade kommer vi komma tillbaka till, fast med databaser. Så den kan du kommentera ut eller radera sålänge.

### 4. Routes (och anledningen till att vi använder express.Router())

Genom att använda separata routers kan vi bryta ner vår applikation i ännu en beståndsdel, så det blir lättare att hantera dessa allteftersom vår applikation växer. För det använder vi express.Router som vi kan kalla på för att skapa en ny Router.

Och precis som ``controllers`` och ``models`` kommer vi att organisera dessa i en egen mapp för routers, nämligen mappen ``routers`` i roten av vårt projekt.

Så vi kan börja med att skapa en router-fil, och döpa den till `owners.router.js`

Inuti den kommer vi flytta in Owners-routern vi skapat, både deklarationen och våra routes.

```jsx
// owners.router.js
// Kom ihåg att importera express, eftersom vi använder .Router() från Express
const express = require("express");

const ownersRouter = express.Router();

ownerRouter.get("/owners", ownersController.getOwners);
ownerRouter.get("/owners/:id", ownersController.getOwner);
// ...

// Och så exporterar vi routern innehållandes våra routes härifrån
module.exports = ownersRouter;
```

Och som ni kanske märkt, så använder vi ju ``ownersController`` i vår route - så vi skulle behöva importera den också för att det ska funka igen!

```jsx
// owners.router.js
const express = require("express");
// Vi importerar ownersController i routern, kom ihåg att vi använder
// relativa paths - så du behöver se till så den går till rätt mapp
const ownersController = require("../controllers/owners.controller");

const ownersRouter = express.Router();

ownerRouter.get("/owners", ownersController.getOwners);
ownerRouter.get("/owners/:id", ownersController.getOwner);
// ...

module.exports = ownersRouter;
```

Och slutligen, i vår ``server.js`` behöver vi ju importera routern vi flyttat ut så vi kan “mounta” den med ``app.use(ownersRouter)`` igen.

```jsx
// server.js
const express = require("express");
const bodyParser = require("body-parser");
const uuid = require("uuid");

const ownersRouter = require("./routes/owners.router");

// Denna kan vi ta bort, eftersom vi använder controllern direkt i vår route
// const ownersController = require("./controllers/owners.controller");

// ...

// Och lite längre ner, "mounta" vår router.
app.use(ownersRouter);
```

Och likadant för vår ``carsRouter``.

### 5. Funkar det?

Nu bör vi ha strukturerat vår app på följande sätt: