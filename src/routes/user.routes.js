import express from 'express'
import { celebrate, errors } from 'celebrate'
import userController from '../controllers/user.controller.js'
import userValidations from '../validations/user.validations.js'

const userRouter = express.Router()

// TODO: improve logic / structure to validate UUID
const validateUUID = celebrate({
  [Segments.PARAMS]: Joi.object({
    id: Joi.string().guid({ version: 'uuidv4' }).required(),
  }),
})

userRouter.post(
  '/',
  celebrate({ body: userValidations.createUserSchema }),
  userController.createUser
)
userRouter.put(
  '/:id',
  celebrate({ body: userValidations.editUserSchema }),
  userController.updateUser
)
userRouter.put(
  '/:id/change-password',
  celebrate({ body: changePasswordSchema }),
  userController.updatePassword
)
userRouter.delete('/:id', validateUUID, userController.deleteUser)
userRouter.get('/', userController.getUsers)
userRouter.get('/:id', validateUUID, userController.getUserById)
userRouter.get('/email/:email', userController.getUserByEmail)

userRouter.use(errors())

userRouter.use((err, req, res, next) => {
  console.error(err)
  res.status(500).send('Local error handling')
})

export default userRouter
