const {
    generateHash
  } = require('@app/utils/functions/hash')
  
  module.exports = (sequelize:any, DataTypes:any) => {
    const User = sequelize.define('user', {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          msg: "Username already exists!"
        }
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: {
            msg: "Must be a valid email address",
          }
        }
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        set(this:any, value:string) {
          console.log(value)
          const hashedPassword = generateHash(value)
          this.setDataValue('password', hashedPassword)
          
        }
      },
      isAdmin: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      accessToken: {
        type: DataTypes.STRING
      }
    }, {
      defaultScope: {
        attributes: {
          exclude: ['password', 'accessToken']
        }
      },
      scopes: {
        withPassword: {
          attributes: {
            include: ["password"]
          }
        },
        withToken: {
          attributes: {
            include: ["accessToken"]
          }
        }
      }
    })
  
    return User
  }