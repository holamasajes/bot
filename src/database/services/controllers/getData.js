// Getter Information of the person from the database
/**
 * @param {string} number
 * @param {ModelCtor<Model<any, any>>} model
 * @example await getData(
 *  573200804949,
  ContactUserModel
  * )
  */
async function getData(date, model) {
  try {
    const data = await model.findOne({
      where: date,
    });
    if (data) {
      return data.dataValues;
    } else {
      return data;
    }
  } catch (error) {
    throw error;
  }
}

module.exports = getData;
