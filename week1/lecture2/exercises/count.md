# Count argument letters

1. Skriv ett program som tar argumenten du skickar in till programmet med process.argv

2. Logga ut listan på dessa i konsollen en efter en, med hjälp av en loop. Ex:

```sh
$ node count.js this is a few words
this
is
a
few
words
```

3. Räkna ut längden på varje ord du passar med som element och skriv ut längden på dessa
```sh
$ node count.js this is a few words
4
2
1
3
5
```

----------------------------------------------------------------------
## HINTAR

Du behöver inte importera process.argv i förväg, utan ska kunna använda den rakt upp och ner. Eftersom den är en del av s.k. "globals" i Node.

```js
console.log(process.argv);
```