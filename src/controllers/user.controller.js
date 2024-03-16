import bcrypt from 'bcrypt'

import userService from '../services/user.service.js'

async function createUser(req, res, next) {
  let userToCreate = req.body

  const existingUser = await userService.getUserByEmail(userToCreate.email)
  if (existingUser) {
    return res.status(404).send({ message: 'Email already in use' })
  }

  try {
    const user = await userService.createUser(userToCreate)
    res.send(user)
    logger.info(`POST /user - ${JSON.stringify(user)}`)
  } catch (error) {
    next(error)
  }
}

async function deleteUser(req, res, next) {
  try {
    let userId = req.params.id
    await userService.deleteUser(userId)
    logger.info(`DELETE /user - ${userId}`)
    res.status(200).send(`User ${userId} deletado com sucesso`)
  } catch (error) {
    next(error)
  }
}

async function getUsers(req, res, next) {
  try {
    const users = await userService.getUsers()
    logger.info(`GET /user - all`)
    res.json(users)
  } catch (error) {
    next(error)
  }
}

async function getUserById(req, res, next) {
  try {
    let id = req.params.id
    let user = await userService.getUserById(id)
    logger.info(`GET /user - ${id}`)
    res.send(user)
  } catch (err) {
    next(err)
  }
}

async function getUserByEmail(req, res, next) {
  try {
    let email = req.params.email
    let user = await userService.getUserByEmail(email)
    logger.info(`GET /user - ${email}`)
    res.send(user)
  } catch (err) {
    next(err)
  }
}

async function updateUser(req, res, next) {
  try {
    const userId = req.params.id
    let userUpdates = req.body

    const existingUser = await userService.getUserById(userId)
    if (!existingUser) {
      return res.status(404).send({ message: 'User not found' })
    }

    if (userUpdates.password) {
      userUpdates.password = await bcrypt.hash(userUpdates.password, 10)
    }

    const updatedUser = await userService.updateUser(userId, userUpdates)

    delete updatedUser.password

    logger.info(`PUT /user - ${JSON.stringify(updatedUser)}`)
    res.send(updatedUser)
  } catch (error) {
    next(error)
  }
}

async function updatePassword(req, res, next) {
  try {
    const userId = req.params.id
    const { newPassword } = req.body

    const existingUser = await userService.getUserById(userId)
    if (!existingUser) {
      return res.status(404).send({ message: 'User not found' })
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10)

    await userService.updatePassword(userId, { password: hashedPassword })

    logger.info(`PUT /user/${userId}/change-password`)
    res.status(200).send({ message: 'Password updated successfully' })
  } catch (error) {
    next(error)
  }
}

export default {
  createUser,
  deleteUser,
  getUsers,
  getUserById,
  getUserByEmail,
  updateUser,
  updatePassword,
}
