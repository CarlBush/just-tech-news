const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

// CREATE OUR USER MODEL
class User extends Model {}

//DEFINE TABLES COLUMNS AND CONFIG

/*
--------------TABLE CONFIG STUFF HERE--------------
sequelize - pass in our imported sequelize connection (the direct connection to our database)
timestamps - don't automatically create createdAt/updatedAt timestamp fields
freezeTableName - don't pluralize name of database table
underscored - use underscores instead of camel-casing (i.e. `comment_text` and not `commentText`)
modelName - make it so our model name stays lowercase in the database
*/

User.init(
    {
        //CREATING THE COLUMNS
        id:
        {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        username:
        {
            type: DataTypes.STRING,
            allowNull: false
        },
        email:
        {
            type: DataTypes.STRING,
            allowNull: false,
            uinque: true,
            validate: {
                isEmail: true
            }
        },
        password: 
        {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [4]
            }
        }

    },
    {
        // TABLE CONFIGURATION OPTIONS GO HERE (https://sequelize.org/v5/manual/models-definition.html#configuration))
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: "user"
    }
);

module.exports = User;