module.exports = (sequelize: any, DataTypes: any) => {
    const Materials = sequelize.define('materials', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: {
                msg: "Materials name already exists!"
            }
        },
        type: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    })
}