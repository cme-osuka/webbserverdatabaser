# Övning: Använda ett ORM

Här kan du testa att använda ett ORM, som underlättar för oss när vi jobbar med exempelvis en SQL-databas.
Där vi kan skriva queries på ett lite smidigare sätt än när vi jobbar med en databas och SQL direkt.

Vi slipper bland annat wrappa våra anrop i Promises med "bara sqlite3", eftersom `knex()` returnerar promises :)

```sql
SELECT * FROM students
-- 
INSERT INTO students (name, email) VALUES ("ryan", "ryan@dahl.dk");
--
```
```js
knex("students").select();
// 
knex("students").insert({ name: "ryan", email: "ryan@dahl.dk"});
// 
knex.raw("SELECT * FROM students");
```

## Hur installerar man ORM'et Knex?
Du hittar deras guide med instruktioner under "Node.js" och sedan respektive databas.
I vårt fall kommer vi använda oss av SQLite3 med Knex.

http://knexjs.org/guide/


## Vad du behöver göra
Jag har skapat ett set funktioner i en `model` jag vill att du implementerar med hjälp av `Knex`.

## 1. Skapa en mapp `data` i roten och gå in i den mappen med `cd data/`

Först behöver vi skapa en mapp för `knex`s konfigurations-fil `knexfile.js` och databasen, för det skapar vi en mapp `data` i roten på applikationen.

## 2. Skapa en knexfile.js

Inuti denna mappen kör du `npx knex init` som kommer ge dig en `knexfile.js`

Det ger oss en fil som ser ut såhär:
```js
/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: './dev.sqlite3'
    }
  },
  staging: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },
  production: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }
};
```
Och som du ser innehåller den konfigurationer för dev, staging och produktions-miljöer. Här kan vi specificera olika uppgifter för de olika miljöerna - **Men vi kommer ta bort `staging` och `production`** och bara behålla `development`.

Den kommer sedan se ut ungefär såhär:
```js
/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: './db.sqlite3'
    }
  },
};
```

## 3. Konfigurera den lite

Här kommer vi ändra och lägga till lite i konfigurationen, bland annat `knex_migrations` och `useNullAsDefault`:

```js
 development: {
    client: 'sqlite3',
    connection: {
      filename: './db.sqlite3'
    },
    migrations: {
      tableName: 'knex_migrations'
    },
    useNullAsDefault: true
  }
```

Det berättar för vår databas att den behöver skapa en tabell som hanterar migrationer (mer om det senare) och att vi ska använda `null` som default i våra kolumner (något som sqlite kräver).

## 4. Skapa vår `db.js` i mappen `data`:

Här ser processen ungefär likadan ut som förut, fast istället för att vi skapar databasen med `new sqlite3.Database()` så använder vi knex för det:

```js
const knexConfig = require("./knexfile");
const knex = require("knex");
// För att skapa en ny instans av Knex:
const db = knex(knexConfig["development"])
// Vi ger den får knexfile, konfigurationen vi skapat
// och hårdkodar "development" som miljö. 
// Här brukar man använda env-variabler (process.env.NODE_ENV)
// för att bestämma miljön - men vi hårdkodar för att göra det
// lätt för oss.
```

## 5. Skapa en migration för att skapa vår lista på elever:

Som vi nämnt, så är en av nackdelarna (eller en styrka) med SQL att det är svårt att ändra strukturen och datatyper på våra tabeller/kolumner. För att lättare hantera detta jobbar man med s.k. migrationer - där vi i knex använder funktionen `up` för att "köra en migration" och `down` för att ångra en migration. 

Ångra oss kan vi exempelvis göra ifall vi vill rulla tillbaka ändringarna vi gjort.

VIKTIGT: **Innan vi skapar en migration, se till att du är i `data`-mappen**

För det kör du `npx knex migrate:make students_table`

Det kommer skapa en migrations-fil i en mapp som `knex` kommer kalla `migrations` - där kommer vi se de två funktionerna jag nämnde: `up` och `down`.

Vi kan byta ut innehållet i dessa mot:
```js
// Vår migrations-funktion,
// som sätter upp vår tabell/schema på sättet vi definierar.
exports.up = function(knex) {
  return knex.schema.createTable('students', (table) => {
      // Skapar en kolumn "id" som "auto incrementar" id't
      table.increments('id');
      // Skapar en kolumn "name" som inte kan vara null
      table.string('name').notNullable();
      // Skapar en kolumn "email" som måste vara unique och inte null
      table.string('email').unique().notNullable();
      // En kolumn som skapar en timestamp när en användare skapas
      table.timestamps();
    });
};
// Du hittar funktionerna för att bygga tabellerna/schemat här:
// http://knexjs.org/guide/schema-builder.html

// Vår "rollback"-funktion
exports.down = function(knex) {
  return knex.schema
    // Tar bort tabellen, om vi t.ex. inte längre vill ha den
    .dropTable('students');
};
```

## 6. Lägg till ett migrate-script i din `package.json` och kör det

Inuti vår `package.json` vill vi även lägga till ett script, så vi slipper skriva kommandot om och om igen. 

```json
// package.json, bland dina scripts
"migrate": "knex migrate:latest --knexfile data/knexfile.js"
```

Och sedan köra scriptet för att köra migreringen med `npm run migrate`!

Det kommer skapa en ny `sqlite`-databas och köra migrationen vi precis skapade för `students`. Skulle vi nu inspektera denna med något verktyg, hade vi sett att den skapat vår tabell `students` i databasen med kolumnerna vi skrev i `up`-funktionen.

## 7. Skapa en seed-fil för att "så" lite data i databasen:

Med hjälp av seed-filer kan vi skapa ett set med data vi kan populera vår databas med och slippa behöva lägga till dessa manuellt. Typ om vi behöver fylla databasen med lite exempel-data för att bygga på vår server under utvecklings-stadiet.

För att skapa en sån kör vi `npx knex seed:make students --knexfile data/knexfile.js` i terminalen.

Det skapar en seed-fil i `/data/seeds` och med `--knexfile data/knexfile.js` berättar vi för scriptet vart vår konfigurations-fil finns någonstans.

Om vi öppnar filen i `/data/seeds/students.js` kommer vi se att den innehåller en funktion `seed`. Den raderar först alla elever och lägger sedan till nya i tabellen.

Vi kan ersätta innehållet med: 
```js
exports.seed = async (knex) => {
  // Tar bort alla föregående 
  return await knex("students").del()
  // Lägger till ett gäng elever i students
  await knex("students").insert([
        {id: 1, name: "Ryan Dahl", email: "ryan@dahl.dk"},
        {id: 2, name: "Bryan Dahl", email: "bryan@dahl.dk"},
        {id: 3, name: "Oscar Nilsson", email: "oscar@osuka.dev"}
    ]);
};
```

Och som med `migrate` kan vi lägga till det kommandot i vår `package.json` så vi bara kan köra `npm run seed` istället för att skriva kommandot igen.

```json
// package.json, bland dina scripts
"seed": "knex seed:run --knexfile data/knexfile.js"
```

Och sedan kör vi `npm run seed`. Det kommer göra att dessa tre elever läggs till i vår tabell, om du kollar på den med någon sqlite-klient eller dylikt.

## 8. Hur läser vi ut data från databasen med Knex?

Det är som tur är ganska straight forward, och en av styrkorna med ORM's. För att göra det med `knex` behöver vi importera `knex`-instansen från vår `database.js`:

Detta kan du göra i `students.model.js`, eftersom det är där vi kommer prata med knex och databasen. Och sedan kalla på funktionerna där i för att köra de olika operationerna mot databasen.

För att skriva `SELECT * FROM students` skriver vi:
```js
const knex = require("../data/db.js");

async function findAll() {
    const result = knex("students").select();
    return result;
}
```

## 9. Hur lägger vi till data i en tabell?

För att lägga till data så hade vi använt `INSERT INTO table` för att lägga till värden i en tabell. Med `knex`, för att lägga till data från ex. `req.body` skriver man:

```js
// Finns inte name eller email, är name en tom sträng.
const name = req.body.name;
const email = req.body.email;

                  // samma som { name: name, email: email }
const id = await knex("students").insert({name, email}) 
// Vi får tillbaka id't på användaren vi precis skapat

// Vi kan använda antingen async/await eller .then() på knex-funktioner.
knex("students")
  .select()
  .where({ id }) // samma som { id: id }
  .then((user) => console.log(user[0]))
  .catch((e) => console.error(e.message));
```

Där vi hämtar name och email från `req.body` och ger till motsvarande funktion i vår modell, 

## 10. Skriv klart modellen och skapa motsvarande routes

Nu är det upp till dig att skriva klart funktionerna jag skapat i modellen och skriva routesen som använder dessa. Vill du strukturera ut `route handlers`en i en controller-fil får du göra det, men det är inte poängen med denna övningen.

Det är att du ska få en känsla för hur vi använder `Knex` för att skriva och köra SQL-queries, på ett lite trevligare sätt. Med extra funktioner som `migrationer` och `seed`s som gör det lättare för oss att sätta upp och plocka ner tabeller i vår databas.
