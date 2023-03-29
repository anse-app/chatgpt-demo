import { encryptPassword } from '@/utils/auth'
import type { APIRoute } from 'astro'

// env 配置的密码
const realPassword = import.meta.env.SITE_PASSWORD
let passHash

export const post: APIRoute = async(context) => {
  const body = await context.request.json()

  // pass 为用户输入的密码
  let inputPass = body.inputPass
  const localPass = body.localPass

  const realPasswordHash = encryptPassword(realPassword.toString())

  if (inputPass)
    inputPass = encryptPassword(inputPass)
  passHash = inputPass

  if (localPass)
    passHash = localPass

  return new Response(JSON.stringify({
    code: (!realPassword || passHash === realPasswordHash) ? 0 : -1,
    password: passHash,
  }))
}
