class ShopItem {
  constructor() {
    this.variations = [];
    this.type = '';
    this.itemId = '';
    this.link = '';
  }

  addVariation(variation) {
    this.variations.push(variation);
  }

  hasVariation(variation) {
    return this.variations.indexOf(variation) > -1;
  }

  setType(type) {
    this.type = type;
  }

  setItemId(itemId) {
    this.itemId = itemId;
  }

  getItemId() {
    return this.itemId;
  }

  setLink(link) {
    this.link = link;
  }
}

module.exports = ShopItem;
