# Bli mästare på REPL

Nu ska vi bli lite mer bekanta med Node's REPL och lära oss hitta dessa instruktioner i deras dokumentation! (Se länken under Läsvärt)

1. Skriv ut en lista på nuvarande kommandon
2. Skriv en multiline-expression (exempelvis en funktion)
3. Skriv ut resultatet från din senaste expression 
4. Hur kommer du åt historiken av dina senast körda kommandon?


Kommandon:
1. Testa köra `.help`, vad skriver den ut?
2. Testa skriva en loop som .break / clear (multiline)
3. Testa spara din REPL-kod i en fil med .save [filename]
4. Testa ladda filen du sparat med .load [filename]
5. Testa avsluta programmet med .exit 

----------------------------------------------------------------------

## Läsvärt
- [How to use the Node.js REPL](https://nodejs.dev/learn/how-to-use-the-nodejs-repl)

## HINTAR

För att köra igång REPL behöver du först ha Node installerat, sedan kör du bara `node` i din terminal för att sätta igång en REPL-session.

```sh
$ node
```

Du kan skriva ut i konsollen på samma sätt som i webbläsaren:
```js
console.log('Potato')
```

.break / .clear är endast för Multiline-expressions

Multiline ...
