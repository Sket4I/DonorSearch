export function donationsRequestsModel(sequelize, DataTypes) {
    const donationsRequests = sequelize.define( "donationRequests", {
        fullName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        contact: {
            type: DataTypes.STRING,
            allowNull: false
        },
        petType: {
            type: DataTypes.STRING,
            allowNull: false
        },
        petName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        reason: {
            type: DataTypes.STRING,
            allowNull: false
        },
        amountOfBlood: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        donorsSize: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        bloodGroup: {
            type: DataTypes.STRING,
            allowNull: false
        },
        city: {
            type: DataTypes.STRING,
            allowNull: false
        },
        vet: {
            type: DataTypes.STRING,
            allowNull: false
        },
        dateEndOfSearch: {
            type: 'TIMESTAMP',
            allowNull: false
        }
    }, {timestamps: true}, )
    return donationsRequests
}