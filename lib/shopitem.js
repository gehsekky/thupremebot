class ShopItem {
  constructor() {
    this.variations = [];
    this.type = '';
    this.item = '';
    this.link = '';
  }

  addVariation(variation) {
    this.variations.push(variation);
  }

  setType(type) {
    this.type = type;
  }

  setItem(item) {
    this.item = item;
  }

  getItem() {
    return this.item;
  }

  setLink(link) {
    this.link = link;
  }
}

module.exports = ShopItem;
