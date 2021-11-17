const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) =>{
    sequelize.define('genre',{
        id:{
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
          },
        name: {
            type: DataTypes.STRING,
        }
    })
}