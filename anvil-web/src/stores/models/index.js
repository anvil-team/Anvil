class Model {
  modelList = [];

  use(name) {
    try {
      const model = require(`./${name}`);
      this.modelList.push({ [name]: model });
    } catch (err) {
      console.warn('not exist the model of', name);
    }
  }

  toModels() {
    return this.modelList.reduce((acc, m) => {
      acc = { ...acc, ...m };
      return acc;
    }, {});
  }
}

const model = new Model();

model.use('login');
model.use('user');
model.use('category');

export default model.toModels();
