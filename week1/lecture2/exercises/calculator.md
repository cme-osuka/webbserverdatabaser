# Calculator

1. Skriv ett program som tar argumenten du skickar in till programmet med process.argv och räknar ihop summan av dessa

```sh
$ node calculator.js 1 3
4
```

2. Ändra så du kan lägga till en operator (ex. `+`, `-`) mellan siffra 1 och 2 och skriv ut resultatet

```sh
$ node calculator.js 3 - 1
2
```

3. Se till så den stödjer `+`, `-`, `*`, `/` - och skulle du inte ange något ska den skriva ut summan av första och andra argumentet

----------------------------------------------------------------------
## HINTAR

Du behöver inte importera process.argv i förväg, utan ska kunna använda den rakt upp och ner. Eftersom den är en del av s.k. "globals" i Node.

```js
console.log(process.argv);
```

Använd if-satser för att kolla vad för operation du behöver göra (`-`, `*` etc)

```js
console.log(process.argv);
```