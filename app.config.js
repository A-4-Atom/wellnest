module.exports = ({ config }) => {
  if (process.env.EXPO_PUBLIC_ENVIRONMENT === "production") {
    config.name = "Wellnest";
    config.slug = "wellnest-prod";
    config.android.package = "com.vikascsgo.wellnest";
    config.android.googleServicesFile = "./assets/google-services-prod.json";
  } else if (process.env.EXPO_PUBLIC_ENVIRONMENT === "development") {
    config.name = "Wellnest Dev";
    config.slug = "wellnest-dev";
    config.android.package = "com.vikascsgo.wellnest.dev";
    config.android.googleServicesFile = "./assets/google-services-dev.json";
  }
  return {
    ...config,
  };
};
