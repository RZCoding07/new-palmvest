import { Sequelize } from "sequelize";
import { db_master } from "../config/database.js";

const DataTypes = Sequelize;

const PicaParams = db_master.define('pica_params', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
    },
    parameter: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    w1: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    w2: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    w3: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    kriteria: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    ca: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    pica_type: {
        type: DataTypes.TEXT,
        allowNull: false
    }
}, {
    freezeTableName: true
});

export default PicaParams;