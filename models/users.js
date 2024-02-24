export function userModel(sequelize, DataTypes) {
    const User = sequelize.define( "user", {
        login: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        fullName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        city: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {timestamps: true}, )
    return User
}