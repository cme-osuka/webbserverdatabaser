# Hello X

1. Skriv ett enkelt program som skriver ut "Hello World" i konsollen.

2. Kör den med ex `node hello.js`

3. Testa använda `process.argv` för att skriva ut resultatet från `node hello.js world`

4. Testa byta ut strängen Hello också, och använd istället argument för att skriva ut ex. "Hello World"


----------------------------------------------------------------------
## HINTAR

Du behöver inte importera process.argv i förväg, utan ska kunna använda den rakt upp och ner. Eftersom den är en del av s.k. "globals" i Node.

```js
console.log(process.argv);
```