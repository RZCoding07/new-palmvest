import { Sequelize } from "sequelize";
import { db_master } from "../config/database.js";

const DataTypes = Sequelize;

const PicaRules = db_master.define('pica_rules', {
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
    satuan: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    variable: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    good: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    moderate: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    poor: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    bobot: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    type: {
        type: DataTypes.TEXT,
        defaultValue: "DMG",
        allowNull: false
    },
}, {
    freezeTableName: true
});

export default PicaRules;