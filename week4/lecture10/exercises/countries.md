# Länder

Denna övningen ger dig möjlighet att öva på hantering av **URL-parametrar, querystrings** och **paginering.** Där du kommer få en .json-fil med ett antal länder och ska bygga följande routes:

### GET /countries

Denna routen ska ta JSON-filen som följer med i övningen (countries.json) och returnera 20 länder i taget.

Denna routen ska stödja när man passar in en av följande querystrings eller båda och ha fallbacks ifall användaren inte passar in någon av dessa.

```jsx
// Querystring: page
[SERVER_URL_HÄR]/countries?page=2
```

och returnera de 20 första länderna i arrayen.
Skulle man inte passa in page ska den tolka det som `page=1` och returnera de 20 första länderna. Passar du in `page=2` ska den returnera nästa 20 länder i listan.

```jsx
// Querystring: size
[SERVER_URL_HÄR]/countries?page=2&size=20
```

### GET /countries/:countrycode (/countries/SE)

Denna routen ska ta JSON-filen som följer med och returnera ett land baserat på en URL-parameter som tar landskoden på landets antingen två eller tre tecken långa landskod.
