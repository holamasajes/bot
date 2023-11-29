//Get Collection function
/**
 * @param {ModelCtor<Model<any, any>>} model
 * @example await getCollection(
 * 
  ContactUserModel
  * )
  */
async function getCollection(model) {
  try {
    const collection = await model.findAll();
    return collection;
  } catch (error) {
    return [];
  }
}

module.exports = getCollection;
