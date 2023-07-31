import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { FastifyRequest, FastifyReply } from 'fastify';

export type CookieType = string | undefined;
export type CookiesType = { [cookieName: string]: string | undefined; } | undefined
export const Cookies = createParamDecorator(
  (key: string | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest() as FastifyRequest;

    if (key) return unsignCookies(request, key);

    return unsignCookies(request);
  },
);

export function unsignCookies(request: FastifyRequest | FastifyReply): CookiesType
export function unsignCookies(request: FastifyRequest | FastifyReply, key: string): CookieType
export function unsignCookies(request: FastifyRequest | FastifyReply, key?: string) {
  if (!request.cookies) return undefined;

  if (key) {
    const cookieRaw = request.cookies[key];
    if (!cookieRaw) return undefined;

    const cookie = request.unsignCookie(cookieRaw);
    if (!cookie.valid) return undefined;
    return cookie.value;
  }

  const cookies: CookiesType = {};
  for (const cookieKey in request.cookies) cookies[cookieKey] = unsignCookies(request, cookieKey);
  return cookies;
}
