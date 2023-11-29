const { dbInstance } = require("../conexion");

//updateData User in Database
/**
 * @param {object}data
 * @param {ModelCtor<Model<any, any>>} model
 * @example await setData(
 *  {
    name: "User User",
    email: "mail@mail.com",
  },
  ContactUserModel
  * )
  */
async function setData(data, model) {
  const transaction = await dbInstance.transaction();
  try {
    const newDate = await model.create(data, {
      transaction: transaction,
    });

    await transaction.commit();
    return newDate;
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
}

module.exports = setData;
