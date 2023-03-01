module.exports = (sequelize: any, DataTypes: any) => {
    const Client = sequelize.define('client', {
        firstname: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        lastname: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
        },
        phone: {
            type: DataTypes.STRING,
        },
        address: {
            type: DataTypes.STRING,
        },
        city: {
            type: DataTypes.STRING,
        },
    })
}