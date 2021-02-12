import usersController from './controller/usersController.js'
import authController from './controller/authController.js'

const routes = route => {
  route.get('/', (req, res) => {
    res.send(`Api server in running (${new Date()})`)
  })

  route.route('/auth/login').post(authController.login)

  route.route('/auth/verify').post(authController.verify)

  route.route('/auth/register').post(authController.register)

  route.route('/users').get(usersController.getAll).post(usersController.create)

  route.route('/users/:id').get(usersController.getOne).put(usersController.update).delete(usersController.delete)
}

export default routes
