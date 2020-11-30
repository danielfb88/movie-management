import bcrypt from 'bcrypt'

export interface IHash {
  hash: string
  salt: String
}

export async function generateHash(password: string): Promise<IHash> {
  const salt = await bcrypt.genSalt(12)
  const hash = await bcrypt.hash(password, salt)

  return { hash, salt }
}
