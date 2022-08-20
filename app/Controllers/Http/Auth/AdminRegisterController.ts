import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import RegisterValidator from 'App/Validators/RegisterValidator'
import Event from '@ioc:Adonis/Core/Event'
import Admin from 'App/Models/Admin'

export default class RegisterController {
  public create({ view }: HttpContextContract) {
    return view.render('auth/admin-register')
  }

  public async store({ request, auth, session, response }: HttpContextContract) {
    const payload = await request.validate(RegisterValidator)

    const admin = await Admin.create(payload)

    Event.emit('userRegistered', admin)

    session.flash({
      notification: {
        type: 'success',
        message: 'Register successful!',
      },
    })

    await auth.use('admin').login(admin)

    return response.redirect().toRoute('dashboard')
  }
}
