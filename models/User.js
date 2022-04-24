const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

const bcrypt = require("bcrypt");

// CREATE OUR USER MODEL
class User extends Model { }

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
    //hooks added to the second object
    //set up beforeCreate lifecycle "hook" functionality
    {
        //OTHER WAY OF DOING IT
        //     beforeCreate(userData) {
        //         return bcrypt.hash(userData.password, 10).then(newUserData => {
        //           return newUserData
        //         });
        // };

        hooks: {
            async beforeCreate(newUserData) {
                newUserData.password = await bcrypt.hash(newUserData.password, 10);
                return newUserData;
            },
            async beforeUpdate(updatedUserData) {
                updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
                return updatedUserData;
            }
        },

        // TABLE CONFIGURATION OPTIONS GO HERE (https://sequelize.org/v5/manual/models-definition.html#configuration))
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: "user"
    }
);

module.exports = User;


