import PicaRules from "../models/PicaRulesModel.js";

const picaRules= {
  // Get all PicaRules
  getAllPicaRules: async (req, res) => {
    try {
      const picaRules = await PicaRules.findAll();
      res.status(200).json({
        success: true,
        data: picaRules,
        message: "PicaRules retrieved successfully",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error retrieving PicaRules",
        error: error.message,
      });
    }
  },

  // Get PicaRules by ID
  getPicaRulesById: async (req, res) => {
    try {
      const { id } = req.params;
      const picaRule = await PicaRules.findByPk(id);

      if (!picaRule) {
        return res.status(404).json({
          success: false,
          message: "PicaRule not found",
        });
      }

      res.status(200).json({
        success: true,
        data: picaRule,
        message: "PicaRule retrieved successfully",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error retrieving PicaRule",
        error: error.message,
      });
    }
  },

  // Create new PicaRule
  createPicaRule: async (req, res) => {
    try {
      const { parameter, satuan, variable, good, moderate, poor, bobot, type } =
        req.body;

      const newPicaRule = await PicaRules.create({
        parameter,
        satuan,
        variable,
        good,
        moderate,
        poor,
        bobot,
        type,
      });

      res.status(201).json({
        success: true,
        data: newPicaRule,
        message: "PicaRule created successfully",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error creating PicaRule",
        error: error.message,
      });
    }
  },

  // Create multiple PicaRules (bulk create)
  createBulkPicaRules: async (req, res) => {
    try {
      const { rules } = req.body;

      const newPicaRules = await PicaRules.bulkCreate(rules, {
        validate: true,
        individualHooks: false,
      });

      res.status(201).json({
        success: true,
        data: newPicaRules,
        message: "PicaRules created successfully",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error creating PicaRules",
        error: error.message,
      });
    }
  },

  // Update PicaRule
  updatePicaRule: async (req, res) => {
    try {
      const { id } = req.params;
      const { parameter, satuan, variable, good, moderate, poor, bobot, type } =
        req.body;

      const picaRule = await PicaRules.findByPk(id);

      if (!picaRule) {
        return res.status(404).json({
          success: false,
          message: "PicaRule not found",
        });
      }

      await picaRule.update({
        parameter,
        satuan,
        variable,
        good,
        moderate,
        poor,
        bobot,
        type,
      });

      res.status(200).json({
        success: true,
        data: picaRule,
        message: "PicaRule updated successfully",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error updating PicaRule",
        error: error.message,
      });
    }
  },

  // Delete PicaRule
  deletePicaRule: async (req, res) => {
    try {
      const { id } = req.params;
      const picaRule = await PicaRules.findByPk(id);

      if (!picaRule) {
        return res.status(404).json({
          success: false,
          message: "PicaRule not found",
        });
      }

      await picaRule.destroy();

      res.status(200).json({
        success: true,
        message: "PicaRule deleted successfully",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error deleting PicaRule",
        error: error.message,
      });
    }
  },

  // Get PicaRules by type
  getPicaRulesByType: async (req, res) => {
    try {
      const { type } = req.params;
      const picaRules = await PicaRules.findAll({
        where: { type },
      });

      res.status(200).json({
        success: true,
        data: picaRules,
        message: `PicaRules with type ${type} retrieved successfully`,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error retrieving PicaRules by type",
        error: error.message,
      });
    }
  },

  // Initialize default PicaRules (DMG)
  initializeDefaultPicaRules: async (req, res) => {
    try {
      const defaultPicaRules = [
        {
          parameter: "Pol Hilang",
          variable: "Mewakili rend",
          satuan: "%",
          good: "< 2,2",
          moderate: "> 2,2 && < 2,8",
          poor: "> 2,8",
          bobot: "15",
          type: "DMG",
        },
        {
          parameter: "Steam on Cane",
          variable:
            "Boiler Tekanan Tinggi dan Penggerak Gilingan Motor Listrik",
          satuan: "%",
          good: "< 50",
          moderate: "> 50 && < 55",
          poor: "> 55",
          bobot: "15",
          type: "DMG",
        },
        {
          parameter: "Steam on Cane",
          variable: "Boiler Tekanan Tinggi dan Penggerak Gilingan Turbin Uap",
          satuan: "%",
          good: "< 55",
          moderate: "> 55 && < 60",
          poor: "> 60",
          bobot: null,
          type: "DMG",
        },
        {
          parameter: "Steam on Cane",
          variable:
            "Boiler Tekanan Menengah dan Penggerak Gilingan Motor Listrik",
          satuan: "%",
          good: "< 55",
          moderate: "> 55 && < 60",
          poor: "> 60",
          bobot: null,
          type: "DMG",
        },
        {
          parameter: "Steam on Cane",
          variable: "Boiler Tekanan Menengah dan Penggerak Gilingan Turbin Uap",
          satuan: "%",
          good: "< 55",
          moderate: "> 55 && < 60",
          poor: "> 60",
          bobot: null,
          type: "DMG",
        },
        {
          parameter: "Steam on Cane",
          variable: "Boiler Tekanan Menengah dan Penggerak Gilingan Mesin Uap",
          satuan: "%",
          good: "< 57",
          moderate: "> 57 && < 62",
          poor: "> 62",
          bobot: null,
          type: "DMG",
        },
        {
          parameter: "Utilitas",
          variable: null,
          satuan: "%",
          good: "> 90",
          moderate: "> 84 && < 90",
          poor: "< 84",
          bobot: "25",
          type: "DMG",
        },        {
          parameter: "Jam Henti Giling Pabrik (A)",
          variable: null,
          satuan: "%",
          good: "< 5",
          moderate: "> 5 && < 8",
          poor: "> 8",
          bobot: "15",
          type: "DMG",
        },
        {
          parameter: "Jam Henti Giling Pabrik (B)",
          variable: null,
          satuan: "%",
          good: "< 5",
          moderate: "> 5 && < 8",
          poor: "> 8",
          bobot: "15",
          type: "DMG",
        }
      ];

      // Hapus data lama jika ada
      await PicaRules.destroy({ where: {} });

      // Buat data baru
      const newPicaRules = await PicaRules.bulkCreate(defaultPicaRules);

      res.status(201).json({
        success: true,
        data: newPicaRules,
        message: "Default PicaRules initialized successfully",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error initializing default PicaRules",
        error: error.message,
      });
    }
  },


    // Initialize default PicaRules (LMG)
  initializeDefaultPicaRulesLMG: async (req, res) => {
    try {
      const defaultPicaRulesLMG = [
        {
          parameter: "Progress Maintenance (Kurva S)",
          variable: "Real/Rencana (Kurva S)",
          satuan: "%",
          good: "> 0",
          moderate: ">= -5 && < 0",
          poor: "< -5",
          bobot: "70",
          type: "LMG"
        },
        {
          parameter: "Pengajuan Pengadaan Investasi PG",
          variable: "Kalkulasi : Real Penyelesaian PR (inc Dokumen : Kajian, KAK, PH) dibagi Total Paket Sinusa (Exc YAD)",
          satuan: "%",
          good: "> 90",
          moderate: ">= 80 && < 90",
          poor: "< 70",
          bobot: "15",
          type: "LMG"
        },
        {
          parameter: "Progress Pengadaan Investasi",
          variable: "Kalkulasi : Total Paket Terbit SPPBJ dibagi Total Paket Sinusa (Exc YAD)",
          satuan: "%",
          good: "> 85",
          moderate: ">= 70 && < 85",
          poor: "< 70",
          bobot: "5",
          type: "LMG"
        },
        {
          parameter: "Progress Pelaksanaan Investasi PG",
          variable: "Kalkulasi : Total Paket Real 100 % Lapangan Pekerjaan dibagi Total Paket Sinusa (Exc YAD)",
          satuan: "%",
          good: "> 80",
          moderate: ">= 50 && < 80",
          poor: "< 50",
          bobot: "10",
          type: "LMG"
        }
      ];

      // Hapus data LMG lama jika ada
      await PicaRules.destroy({ where: { type: 'LMG' } });

      // Buat data LMG baru
      const newPicaRules = await PicaRules.bulkCreate(defaultPicaRulesLMG);

      res.status(201).json({
        success: true,
        data: newPicaRules,
        message: 'Default LMG PicaRules initialized successfully'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error initializing default LMG PicaRules',
        error: error.message
      });
    }
  },
};

export default picaRules;
