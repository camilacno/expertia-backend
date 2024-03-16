import userRepository from '../repositories/user.repository.js'

async function createUser(user) {
  return await userRepository.createUser(user)
}

async function deleteUser(userId) {
  return await userRepository.deleteUser(userId)
}

async function getUsers() {
  return await userRepository.getUsers()
}

async function getUserById(userId) {
  return await userRepository.getUserById(userId)
}

async function getUserByEmail(userEmail) {
  return await userRepository.getUserByEmail(userEmail)
}

async function updateUser(userId, user) {
  return await userRepository.updateUser(userId, user)
}

async function updatePassword(userId, newPassword) {
  const hashedPassword = await bcrypt.hash(newPassword, 10)
  return await userRepository.updatePassword(userId, hashedPassword)
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
