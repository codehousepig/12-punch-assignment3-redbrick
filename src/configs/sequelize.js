const baseDbSetting = {
  database: "redbrick",
  username: "admin",
  password: "redbrick",
  host: "redbrick.chiha599tyj3.ap-northeast-2.rds.amazonaws.com",
  timezone: "+09:00",
  dialect: "mysql",
  pool: {
    max: 100,
    min: 0,
    idle: 10000,
  },
  define: {
    charset: "utf8mb4",
    collate: "utf8mb4_unicode_ci",
    timestamps: true,
  },
};

module.exports = {
  production: Object.assign(
    baseDbSetting
  ),

  development: Object.assign(
    baseDbSetting
  ),

  test: Object.assign(
    baseDbSetting
  ),
};
