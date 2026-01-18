module.exports = async (req, res) => {
  res.status(200).json({
    allEnvKeys: Object.keys(process.env),
    FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
    MP_ACCESS_TOKEN: process.env.MP_ACCESS_TOKEN?.substring(0, 20) + '...'
  });
};
