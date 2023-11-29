class OrderContext {
  /**@type {OrderContext} */
  static #instance;
  /**@type {Map} */
  #flowContext;

  constructor() {
    this.#flowContext = new Map();
  }

  static getInstance() {
    if (!this.#instance) {
      this.#instance = new OrderContext();
    }
    return this.#instance;
  }

  add(key, ctxInfo = {}) {
    this.#flowContext.set(key, ctxInfo);
  }

  get(key) {
    return this.#flowContext.get(key);
  }

  delete(key) {
    return this.#flowContext.delete(key)
  }
}

module.exports = OrderContext.getInstance();
