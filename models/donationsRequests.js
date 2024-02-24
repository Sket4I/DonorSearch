export function donationsRequestsModel(sequelize, DataTypes) {
    const donationsRequests = sequelize.define( "donationRequests", {
        petId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        city: {
            type: DataTypes.STRING,
            allowNull: false
        },
        amountOfBlood: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        dateEndOfSearch: {
            type: 'TIMESTAMP',
            allowNull: false
        }
    }, {timestamps: true}, )
    return donationsRequests
}