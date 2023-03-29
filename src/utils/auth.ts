import * as crypto from 'crypto'
import { sha256 } from 'js-sha256'

interface AuthPayload {
  t: number
  m: string
}

export async function digestMessage(message: string) {
  if (typeof crypto !== 'undefined' && crypto?.subtle?.digest) {
    const msgUint8 = new TextEncoder().encode(message)
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8)
    const hashArray = Array.from(new Uint8Array(hashBuffer))
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
  } else {
    return sha256(message).toString()
  }
}

export const generateSignature = async(payload: AuthPayload) => {
  const { t: timestamp, m: lastMessage } = payload
  const secretKey = import.meta.env.PUBLIC_SECRET_KEY as string
  const signText = `${timestamp}:${lastMessage}:${secretKey}`
  // eslint-disable-next-line no-return-await
  return await digestMessage(signText)
}

export const verifySignature = async(payload: AuthPayload, sign: string) => {
  // if (Math.abs(payload.t - Date.now()) > 1000 * 60 * 5) {
  //   return false
  // }
  const payloadSign = await generateSignature(payload)
  return payloadSign === sign
}

export function encryptPassword(password: string): string {
  if (!password)
    throw new Error('Password cannot be empty.')

  // 将secret_key作为加密的salt
  const salt = import.meta.env.SECRET_KEY
  const hash = crypto.createHmac('sha256', salt)
    .update(password)
    .digest('hex')
  return hash
}

// export function comparePasswords(password: string, hash: string): boolean {
//   const salt = import.meta.env.SECRET_KEY;
//   const newHash = crypto.createHmac('sha256', salt)
//                         .update(password)
//                         .digest('hex');
//   return newHash === hash;
// }
