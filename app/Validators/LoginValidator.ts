import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class LoginValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    email: schema.string([rules.trim()]),
    password: schema.string([rules.trim()]),
    remember: schema.boolean.optional(),
  })

  public messages = {
    required: 'The  field is required.',
  }
}
