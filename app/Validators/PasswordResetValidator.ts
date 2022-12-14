import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class PasswordResetValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    token: schema.string([rules.trim()]),
    email: schema.string([
      rules.trim(),
      rules.email(),
      rules.exists({ table: 'users', column: 'email' }),
    ]),
    password: schema.string([rules.trim(), rules.minLength(6), rules.confirmed()]),
  })

  public messages = {
    'required': 'The  field is required.',
    'exists': 'No account exists for this email address.',
    'password.minLength': 'Password must be a minimum of 6 chracters.',
    'password_confirmation.confirmed': 'Password confirmation does not match.',
  }
}
