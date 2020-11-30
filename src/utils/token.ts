import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET as string

export interface IDecodedToken {
  userId: string
  exp: number
  iat: number
}

export async function generateToken(payload: object, expiresIn = '7d'): Promise<string> {
  return await new Promise((resolve, reject) => {
    if (JWT_SECRET !== undefined) {
      jwt.sign(
        payload,
        JWT_SECRET,
        {
          expiresIn,
        },
        (error, token) => {
          error !== null ? reject(error) : resolve(token as string)
        },
      )
    } else {
      reject(new Error('secret not found'))
    }
  })
}

export async function verifyToken(token: string): Promise<IDecodedToken> {
  token = token.replace('Bearer ', '')

  return await new Promise((resolve, reject) => {
    jwt.verify(token, JWT_SECRET, (error, decoded) => {
      error !== null ? reject(error) : resolve(decoded as IDecodedToken)
    })
  })
}
