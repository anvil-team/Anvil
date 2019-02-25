class Model {
  models = [];
  constructor() {
    const context = require.context('./', false, /\.js$/);
    context.keys().forEach((k) => {
      if (!k.includes('index')) {
        const name = k.replace(/(.*\/)*([^.]+).*/gi, '$2');
        this.models.push({ [name]: context(k) });
      }
    });
  }


  toModels() {
    return this.models.reduce((acc, m) => {
      acc = { ...acc, ...m };
      return acc;
    }, {});
  }
}

const model = new Model();

export default model.toModels();
