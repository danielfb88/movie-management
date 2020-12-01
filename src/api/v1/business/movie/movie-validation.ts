import { body } from 'express-validator'

export const createValidation = [body('name').exists(), body('director').exists(), body('gender').exists()]
