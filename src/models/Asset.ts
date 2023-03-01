import { existsSync, readFileSync, createReadStream } from 'fs';

module.exports = (sequelize: any, DataTypes: any) => {
    const Asset = sequelize.define('asset', {
        originalname: {
            type: DataTypes.STRING,
            allowNull: false
        },
        path: {
            type: DataTypes.STRING,
            allowNull: false
        },
        encoding: DataTypes.STRING,
        mimetype: {
            type: DataTypes.STRING,
            allowNull: false
        },
        size: DataTypes.INTEGER
    })

    Asset.prototype.getData = function () {
        return (this.path && existsSync(this.path)) ? readFileSync(this.path) : null
    }

    Asset.prototype.getDataStream = function () {
        return (this.path && existsSync(this.path)) ? createReadStream(this.path) : null
    }
    return Asset;
}