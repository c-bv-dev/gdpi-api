module.exports = (sequelize: any, DataTypes: any) => {
    const Society = sequelize.define('society', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: {
                msg: "Society name already exists!"
            }
        }
    })
}