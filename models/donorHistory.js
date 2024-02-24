export function donationHistoryModel(sequelize, DataTypes) {
    const donationHistory = sequelize.define( "donationHistory", {
        donorId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        dateOfDonation: {
            type: 'TIMESTAMP',
            allowNull: false
        }
    }, {timestamps: true}, )
    return donationHistory
}