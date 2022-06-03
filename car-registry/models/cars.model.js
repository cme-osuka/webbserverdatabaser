/**
 * {
 *   id: string
 *   maker: string,
 *   model: string,
 *   reg: string,
 *   mileage: number,
 *   year: number,
 *   combi: boolean
 * }
 */
let cars = [];

function getAll() {
  return cars;
}

module.exports = {
  cars, 
  getAll
}