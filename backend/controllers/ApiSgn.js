import NodeCache from "node-cache";
import axios from "axios";

// ✅ Cache configuration
const cache = new NodeCache({
  stdTTL: 360,
  checkperiod: 320,
  useClones: false,
  maxKeys: 1000,
  deleteOnExpire: true,
});

// ✅ Axios instance for external API
const axiosInstance = axios.create({
  baseURL: "https://sigula.sinergigula.com/index.php/rest",
  headers: {
    "Content-Type": "application/json",
    Token: process.env.EXTERNAL_TOKEN,
  },
});

// ✅ Utility: Create a stable cache key
const generateCacheKey = (prefix, params) => {
  const sortedParams = Object.keys(params || {})
    .sort()
    .reduce((obj, key) => ({ ...obj, [key]: params[key] }), {});
  return `${prefix}_${JSON.stringify(sortedParams)}`;
};

// ✅ Utility: Remove null/undefined values from params
const cleanParams = (params) => {
  return Object.fromEntries(
    Object.entries(params).filter(([_, v]) => v != null)
  );
};

// ✅ Fetch function with cache
const fetchData = async (endpoint, params = {}) => {
  const clean = cleanParams(params);
  const cacheKey = generateCacheKey(endpoint, clean);

  const cached = cache.get(cacheKey);
  if (cached) return cached;

  try {
    const { data } = await axiosInstance.get(`/${endpoint}`, { params: clean });
    cache.set(cacheKey, data);
    return data;
  } catch (error) {
    console.error(`Error fetching ${endpoint}:`, error.message);
    throw new Error("Failed to fetch data from external API");
  }
};

// ✅ API to get Pabrik Gula data
export const getDataPabrik = (params) => fetchData("holding/rawUnit?tipe=2", params);

// ✅ API to get Production Pica data (Express.js handler)
export const getProductionPica = async (req, res, next) => {
  try {
    const data = await fetchData("picaholding/productionPica", req.query);
    return res.json(data.data);
  } catch (error) {
    next(error);
  }
};
