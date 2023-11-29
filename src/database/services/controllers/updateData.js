const { dbInstance } = require("../conexion");

// Update database fields
/**
 * @param {string} idWhere
 * @param {object} data
 * @param {ModelCtor<Model<any, any>>} model
 * @example await updateData(
 *  573200804949,
{
    name: "User User",
    email: "mail@mail.com",    
  },
 
  ContactUserModel
  * )
  */
async function updateData(idWhere, data, model) {
  const transaction = await dbInstance.transaction();

  try {
    const updateInfo = await model.update(
      data,
      {
        where: idWhere,
      },
      {
        transaction: transaction,
      }
    );
    await transaction.commit();
    return updateInfo;
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
}

module.exports = updateData;
