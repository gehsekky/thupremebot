const config = require('config');
const cheerio = require('cheerio');
const supremeClient = require('./supreme-client');
const ShopItem = require('./shopitem');

class ThupremeBot {
  constructor() {

  }

  run() {
    console.log('running supremebot');

    // sanity checks
    const payment = config.get('payment');
    if (!payment) {
      throw new Error('payment must not be empty or null');
    }
    const buyList = config.get('buylist');
    if (!buyList || buyList.length === 0) {
      throw new Error('buylist must not be empty or null');
    }

    this.getItems();
  }

  getItems() {
    const items = [];
    const linkRegex = /^(\/shop\/(.*)+\/(.*)+\/)(.*)$/i;

    return supremeClient({
      method: 'get',
      path: '/shop/all'
    })
    .then(response => {
      const $ = cheerio.load(response.entity);
      $('article', '#container').each((idx, item) => {
        // parse base item link
        const match = linkRegex.exec($('a', item).attr('href'));

        // check if we already have this type
        const foundType = items.find(item => {
          return item.getItem() === match[3];
        });

        if (foundType) {
          foundType.addVariation(match[4]);
        } else {
          const shopItem = new ShopItem();
          shopItem.setLink(match[1]);
          shopItem.setType(match[2]);
          shopItem.setItem(match[3]);
          shopItem.addVariation(match[4]);

          items.push(shopItem);
        }

        return items;
      });
    })
  }
}

module.exports = ThupremeBot;
