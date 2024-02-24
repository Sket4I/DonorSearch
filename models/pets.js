export function petsModel(sequelize, DataTypes) {
    const Pets = sequelize.define( "pets", {
        petName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        petType: {
            type: DataTypes.STRING,
            allowNull: false
        },
        breed: {
            type: DataTypes.STRING,
            allowNull: true
        },
        age: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        weight: {
            type: DataTypes.DOUBLE,
            allowNull: false
        },
        bloodTransfusion: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        bloodGroup: {
            type: DataTypes.STRING,
            allowNull: false
        },
        vaccinations: {
            type: DataTypes.STRING,
            allowNull: false
        },
        ownerId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        bloodCenter: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        donor: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        numberOfDonations: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        lastDonation: {
            type: 'TIMESTAMP',
            allowNull: true
        },
        petAvatar: {
            type: DataTypes.STRING,
            allowNull: true
        }
    }, {timestamps: true}, )
    return Pets
}