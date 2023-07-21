import { Sequelize } from 'sequelize';

// Se crea una nueva instancia de Sequelize para conectarse a la base de datos MySQL
const db = new Sequelize('bysnmbtrbyjbcaad1hqq', 'uhzngho6brgx4eto', 'N67KdhXVETNQmJMzbHSc', {
    host: 'bysnmbtrbyjbcaad1hqq-mysql.services.clever-cloud.com',  // Dirección del host de la base de datos
    dialect: 'mysql'  // Indicamos que estamos utilizando MySQL como dialecto de la base de datos
});

export default db;  // Exportamos la instancia de Sequelize para poder utilizarla en otros archivos
