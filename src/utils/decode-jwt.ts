import { AnyObject } from 'immer/dist/internal';

interface SodamPayload {
  email: string;
  name: string;
  exp: number;
}

const isValidPayload = (payload: AnyObject): payload is SodamPayload => {
  if (!('email' in payload && 'name' in payload && 'exp' in payload)) return false;
  return (
    typeof payload.email === 'string' &&
    typeof payload.name === 'string' &&
    typeof payload.exp === 'number'
  );
};

export const decodeJwt = (token: string) => {
  const [, incodedPayload] = token.split('.');
  if (!incodedPayload) return null;

  try {
    const buffer = Buffer.from(incodedPayload, 'base64');
    const decodedPayload = JSON.parse(buffer.toString());
    if (!isValidPayload(decodedPayload)) return null;

    return {
      email: decodedPayload.email,
      name: decodedPayload.name,
      exp: decodedPayload.exp,
    };
  } catch (error) {
    return null;
  }
};
