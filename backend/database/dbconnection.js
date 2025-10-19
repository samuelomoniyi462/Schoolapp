import  Sequelize  from "sequelize";

const sequelizeConnection = new Sequelize('schoolapp', 'root', '12345678rtr', {
    dialect: 'mysql',
    host: 'localhost',
})


export default sequelizeConnection