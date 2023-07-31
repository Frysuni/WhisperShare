import { CookieSerializeOptions, fastifyCookie } from "@fastify/cookie";
import fastifyCsrfProtection from "@fastify/csrf-protection";
import fastifyHelmet from "@fastify/helmet";
import { NestFastifyApplication } from "@nestjs/platform-fastify";
import secrets from "./common/secrets";

export default function(appRegister: NestFastifyApplication['register'], apiAddress: URL) {
  const cookieSerializeOptions: CookieSerializeOptions = {
      secure: apiAddress.protocol === 'https:',
      domain: apiAddress.hostname,
      httpOnly: true,
      sameSite: true,
      signed: true,
  };

  return Promise.all([
    appRegister(fastifyCookie, {
      hook: 'onRequest',
      secret: secrets.cookiesSignature,
      prefix: cookieSerializeOptions.secure ? '__Secure-' : undefined,
      parseOptions: cookieSerializeOptions,
    }),

    appRegister(fastifyCsrfProtection, {
      cookieOpts: cookieSerializeOptions,
      cookieKey: '_csrf',
      csrfOpts: {
        hmacKey: secrets.csrfHmacKey,
      },
      sessionPlugin: '@fastify/cookie',
    }),

    appRegister(fastifyHelmet, {
      global: true,
      hidePoweredBy: true,
    }),

  ]);
}