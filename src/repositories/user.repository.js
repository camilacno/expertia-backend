import pgConnection from '../database/postgres.db.js'

async function createUser(user) {
  const conn = await pgConnection()
  try {
    const sql =
      'INSERT INTO users (firstName, lastName, email, password, type, userId) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *'

    const values = [
      user.firstName,
      user.lastName,
      user.email,
      user.password,
      user.type,
      user.userId,
    ]

    const res = await conn.query(sql, values)
    return res.rows[0]
  } catch (error) {
    throw error
  } finally {
    await conn.release()
  }
}

async function deleteUser(userId) {
  const conn = await pgConnection()
  try {
    let sql = 'SELECT * FROM users WHERE userId = $1'
    let values = [userId]
    let res = await conn.query(sql, values)
    if (res.rows.length === 0) {
      throw new Error('User not found')
    }

    sql = 'DELETE FROM users WHERE userId = $1'
    await conn.query(sql, values)
  } catch (error) {
    throw error
  } finally {
    await conn.release()
  }
}

async function getUsers() {
  const conn = await pgConnection()
  try {
    const sql = 'SELECT * from users'
    const res = await conn.query(sql)
    return res.rows
  } catch (error) {
    throw error
  } finally {
    await conn.release()
  }
}

async function getUserById(userId) {
  const conn = await pgConnection()
  try {
    const sql = 'SELECT * FROM users WHERE userId = $1'
    const values = [userId]
    const res = await conn.query(sql, values)
    return res.rows[0]
  } catch (error) {
    throw error
  } finally {
    await conn.release()
  }
}

async function getUserByEmail(userEmail) {
  const conn = await pgConnection()
  try {
    const sql = 'SELECT * FROM users WHERE email = $1'
    const values = [userEmail]
    const res = await conn.query(sql, values)
    return res.rows[0]
  } catch (error) {
    throw error
  } finally {
    await conn.release()
  }
}

async function updateUser(userId, user) {
  const conn = await pgConnection()
  try {
    let sql = 'SELECT * FROM users WHERE userId = $1'
    let values = [userId]
    let res = await conn.query(sql, values)
    if (res.rows.length === 0) {
      throw new Error('User not found')
    }

    sql = 'UPDATE users SET '
    values = []
    let updateFields = []
    let index = 1
    for (let field in user) {
      if (user[field] !== undefined && user[field] !== '') {
        updateFields.push(`${field} = $${index}`)
        values.push(user[field])
        index++
      }
    }
    sql += updateFields.join(', ')
    sql += ' WHERE userId = $' + index
    sql += ' RETURNING *'
    values.push(userId)

    res = await conn.query(sql, values)
    return res.rows[0]
  } catch (error) {
    throw error
  } finally {
    await conn.release()
  }
}

async function updatePassword(userId, hashedPassword) {
  const conn = await pgConnection()
  try {
    const sql = 'UPDATE users SET password = $1 WHERE userId = $2 RETURNING *'
    const values = [hashedPassword, userId]
    const res = await conn.query(sql, values)
    return res.rows[0]
  } catch (error) {
    throw error
  } finally {
    await conn.release()
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
