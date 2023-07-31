import { from } from 'env-var';

export const AppConfig = () => {
  const env = from(process.env);

  return {
    app: {
      address: env.get('APP_ADDRESS').required().asUrlObject(),
      port:    env.get('APP_PORT')   .required().asPortNumber(),
      assetsAutoRouting: env.get('APP_ASSETS-AUTO-ROUTING').required().asBoolStrict(),
    },
  };
};