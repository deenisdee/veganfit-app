module.exports = async (req, res) => {
  res.status(200).json({
    allEnvKeys: Object.keys(process.env),
    FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
    FIREBASE_CLIENT_EMAIL: process.env.FIREBASE_CLIENT_EMAIL,
    FIREBASE_PRIVATE_KEY_EXISTS: !!process.env.FIREBASE_PRIVATE_KEY,
    MP_ACCESS_TOKEN_EXISTS: !!process.env.MP_ACCESS_TOKEN,
    MP_PUBLIC_KEY: process.env.MP_PUBLIC_KEY
  });
};
