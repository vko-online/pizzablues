const xRay = require('x-ray');
const async = require('async');

const urls = {
  pizza_blues: [{
      title: 'Пицца',
      url: 'http://cafe.pizza-blues.kz/pizza/'
    },
    {
      title: 'Салаты',
      url: 'http://cafe.pizza-blues.kz/salati/',
    },
    {
      title: 'Первые блюда',
      url: 'http://cafe.pizza-blues.kz/pervie-bluda/',
    },
    {
      title: 'Вторые блюда',
      url: 'http://cafe.pizza-blues.kz/vtorie-bluda/'
    }, {
      title: 'Десерты',
      url: 'http://cafe.pizza-blues.kz/deserti/',
    },
    {
      title: 'Напитки',
      url: 'http://cafe.pizza-blues.kz/napitki/'
    },
    {
      title: 'Завтраки',
      url: 'http://cafe.pizza-blues.kz/zavtraki/'
    },
    {
      title: 'Детское меню',
      url: 'http://cafe.pizza-blues.kz/detskoe-menu/'
    },
    {
      title: 'Полуфабрикаты',
      url: 'http://cafe.pizza-blues.kz/polufabrikaty/'
    },
    {
      title: 'Кулинария',
      url: 'http://cafe.pizza-blues.kz/kylinaria/'
    }
  ]
};

function main() {

}

main()
  .then(console.dir, console.error);