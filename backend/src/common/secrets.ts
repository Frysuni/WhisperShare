import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

export default getSecrets();

interface Secrets {
  jwtSecretKey: string,
  cookiesSignature: string,
  csrfHmacKey: string,
}

function getSecrets(): Secrets {
  const pathToSecretsFile = resolve(process.cwd(), '.secrets');

  if (existsSync(pathToSecretsFile)) return JSON.parse(readFileSync(pathToSecretsFile).toString());

  const secrets = {
    jwtSecretKey: generateRandomString(),
    cookiesSignature: generateRandomString(),
    csrfHmacKey: generateRandomString(),
  };

  writeFileSync(pathToSecretsFile, JSON.stringify(secrets));

  return secrets;
}

function generateRandomString() {
  const charCodes: number[] = [];
  const randomLength = 32 + ~~(Math.random() * 16 + 1);
  for (let i = 0; i < randomLength; i++) {
      let rand = Math.floor(Math.random() * 62);
      const charCode = rand += rand > 9 ? (rand < 36 ? 55 : 61) : 48;
      charCodes.push(charCode);
  }
  return String.fromCharCode(...charCodes);
}