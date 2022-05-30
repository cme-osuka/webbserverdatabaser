
const fruits = [
  "tomato",
  "kiwi",
  "mango",
  "chili",
  "limequat",
  "sharon",
  "häst",
  "tunnel-banana"
]

function getAll() {
  return fruits;
}

function add(fruit) {
  fruits.push(fruit);
  return fruits;
}

module.exports = {
  fruits,
  add,
  getAll
}