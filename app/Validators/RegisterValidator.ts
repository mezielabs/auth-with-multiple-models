import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class RegisterValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    name: schema.string([rules.trim()]),
    email: schema.string([
      rules.trim(),
      rules.email(),
      rules.normalizeEmail({ allLowercase: true }),
      rules.maxLength(255),
      rules.unique({ table: 'users', column: 'email' }),
    ]),
    password: schema.string([rules.trim(), rules.minLength(6), rules.confirmed()]),
  })

  public messages = {
    'required': 'The  field is required.',
    'unique': 'The  has already been taken.',
    'password.minLength': 'Password must be a minimum of 6 chracters.',
    'password_confirmation.confirmed': 'Password confirmation does not match.',
  }
}
