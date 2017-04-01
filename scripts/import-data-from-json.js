import Parse from 'parse/node';

const maslenica = require('../data/maslenica.json');
const teplica = require('../data/teplica.json');
const pizzaBlues = require('../data/pizza-blues.json');

const SERVER_PORT = process.env.PORT || 8080;

Parse.initialize('oss-f8-app-2016');
Parse.serverURL = `http://localhost:${SERVER_PORT}/parse`;


async function importClass(data) {
  console.log('Loading Store');
  const Store = Parse.Object.extend('Store');
  const Product = Parse.Object.extend('Product');

  let sObj = new Store();
  sObj.set('title', data.title);
  sObj.set('hours', data.hours);
  sObj.set('phones', data.phones);
  sObj.set('image', data.image);

  sObj = await sObj.save();
  for (var i = 0; i < data.products.length; i++) {
    var p = data.products[i];
    let pObj = new Product();
    pObj.set('title', p.title);
    pObj.set('description', p.description);
    pObj.set('category', p.category);
    pObj.set('price', p.price);
    pObj.set('otherPrice', p.otherPrice);
    pObj.set('image', p.image);
    pObj = await pObj.save();
    sObj.relation('products').add(pObj);
  }
}

async function main() {
  await Promise.all([
    importClass(maslenica),
    importClass(teplica),
    importClass(pizzaBlues),
  ]);
  return 'OK';
}

main()
  .then(console.dir, console.error);