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

    // fetch current items
    this.getItems()
    .then(items => {
      // iterate over items and check if any items in our buy list are present
      let buyListItem = null;
      const buyQueue = [];
      for (let shopItem of items) {
        buyListItem = buyList.find(i => i.itemId === shopItem.getItemId() && shopItem.hasVariation(i.variation));

        // found item to buy. buy it.
        if (buyListItem) {
          buyListItem.link = shopItem.getLink();
          buyQueue.push(buyListItem);
        }
      }

      console.log(`found ${buyQueue.length} item(s) to buy`);
    })
    .catch(err => {
      console.error(err);
    });
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
        // check if item is sold out
        const soldout = $('div.sold_out_tag', item);
        if (soldout.length > 0) return;

        // parse base item link
        const match = linkRegex.exec($('a', item).attr('href'));

        // check if we already have this type
        const foundType = items.find(item => {
          return item.getItemId() === match[3];
        });

        if (foundType) {
          foundType.addVariation(match[4]);
        } else {
          const shopItem = new ShopItem();
          shopItem.setLink(match[1]);
          shopItem.setType(match[2]);
          shopItem.setItemId(match[3]);
          shopItem.addVariation(match[4]);

          items.push(shopItem);
        }
      });

      return items;
    })
  }
}

module.exports = ThupremeBot;
