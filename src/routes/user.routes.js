import express from 'express'
import { celebrate, errors } from 'celebrate'
import userController from '../controllers/user.controller.js'
import userValidationSchema from '../validations/userValidations/userValidation.js'
import passwordValidationSchema from '../validations/userValidations/passwordValidation.js'

const userRouter = express.Router()

userRouter.post(
  '/',
  celebrate({ body: userValidationSchema }),
  userController.createUser
)
userRouter.put(
  '/:id',
  celebrate({ body: userValidationSchema }),
  userController.updateUser
)
userRouter.put(
  '/:id/change-password',
  celebrate({ body: passwordValidationSchema }),
  userController.updatePassword
)
userRouter.delete('/:id', userController.deleteUser)
userRouter.get('/', userController.getUsers)
userRouter.get('/:id', userController.getUserById)
userRouter.get('/email/:email', userController.getUserByEmail)

userRouter.use(errors())

userRouter.use((err, req, res, next) => {
  console.error(err)
  res.status(500).send('Local error handling')
})

export default userRouter
