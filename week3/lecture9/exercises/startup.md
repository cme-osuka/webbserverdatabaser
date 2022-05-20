# Startup!

## Uppercase-tjänst

En tidig startup kom precis förbi och pitchade sin unika idé, och din uppgift är att bygga en webbserver som speglar deras behov. Så de kan fortsätta skala upp sin verksamhet och växa och bli störst på sin marknad.

De behöver en webbserver som tar emot data i form av en sträng från användaren i JSON-format, och returnerar denna till användaren - FAST I UPPERCASE.

## Vad du behöver göra:

1. Börja med att sätta upp en Express-applikation
2. Lägg till `express.json()` -middlewaren, som parsar inkommande requests med JSON-payloads.
3. Skapa en endpoint som lyssnar på requests med HTTP-verbet POST till pathen “/uppercase”.
Denna endpointen ska ta datan från requestens body, och svara med ett objekt med nyckeln `value` som innehåller den inkomna strängen fast i UPPERCASE. 

4. Lägg till en egen middleware-funktion som console.loggar requestens metod och urlen till konsollen.
(Glöm inte att kalla på next(), så den går vidare till nästa funktion) 
5. Skapa ytterligare en middleware som kollar så den inkommande datan i bodyn innehåller en sträng. Gör den inte det så ska middlewaren avsluta requesten med en lämplig statuskod och ett felmeddelande som berättar för klienten vad som gått fel.

### Struktur:

```js
// Inkommande data
{ "value": "Strängen som ska göras till uppercase" }
```

```js
// Utgående data / svaret
{ "value": "STRÄNGEN SOM SKA GÖRAS TILL UPPERCASE" }
```

## Lowercase-tjänst

Startupen har nu insett sin fulla potential och kommer till dig igen, de har haft så stor framgång och har nu störst marknadsandel av alla företag i samma bransch. De vill nu utöka sin verksamhet till att även erbjuda möjligheten att göra strängar till lowercase.

Så du behöver lägga till denna funktionaliteten i webbservern du byggde till dem i den tidigare övningen.

### Vad du behöver göra:

Likt uppercase-routen, behöver du lägga till en lowercase-route. Den ska omvandla strängen de skickar in med samma struktur till lowercase och svara på samma sätt som /uppercase gjorde.

## Capitalize-tjänst

Startupen kommer tillbaka till dig bara efter några dagar, och har nu hamnat i knipa. Introducerandet av en Lowercase-funktion i deras app gjorde att de blev cancelled av oförklarliga skäl. Och hela deras idé har nu kopierats av sökmotor-jätten Boogle.com. Startupen har nu förlorat hälften av sina användare och deras ledningsgrupp och investerare har nu tagit över ledningen, och för att bibehålla deras resterande användare behöver de något innovativt. Något helt banbrytande!

En Capitalize-tjänst!

### Vad du behöver göra:

Lägg till en route som likt de andra, tar emot en sträng och gör om den till en “Capitalizad” sträng och skickar tillbaka den.
Dvs att den gör första bokstaven i strängen till uppercase.

Men den funktionaliteten finns inte inbyggd i JS och du behöver nu hitta en lösning på detta, och implementera den funktionaliteten på routen.
