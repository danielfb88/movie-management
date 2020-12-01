import { body, check, param } from 'express-validator'
import UserdService from './user-service'

export const signUpValidation = [
  body('name').exists(),

  check('email')
    .exists()
    .bail()
    .isEmail()
    .withMessage('must be a valid email')
    .bail()
    .custom(async value => {
      const userService = new UserdService()

      const user = await userService.findByEmail(value)
      if (user !== undefined) {
        return await Promise.reject(new Error('E-mail already in use'))
      }
    }),

  body('password').not().isEmpty(),

  body('isAdmin').not().isEmpty(),
]

export const signInValidation = [
  check('email').exists().bail().isEmail().withMessage('must be a valid email'),

  body('password').not().isEmpty(),
]

export const updateValidation = [body('name').exists(), param('id').exists()]

export const deleteValidation = [param('id').exists()]
