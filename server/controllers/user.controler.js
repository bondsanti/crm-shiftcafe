import HandyStorage from 'handy-storage'
import Jwt from 'jsonwebtoken'
import { JWT_SECRET } from '../constant'
import {
  comparePassword,
  encodePassword,
  findValueByEmail,
  findValueByUsername,
  randomId,
  findValueById,
} from '../help'
// import { randomId } from '../help'

const storage = new HandyStorage({
  beautify: true,
})
export const allUser = (req, res, next) => {
  try {
    const data = storage.connect('./server/users.json')
    const { users } = data.state

    // const id2 = await randomId()
    // console.log(users)

    res.json(users)
  } catch (e) {
    next(e)
  }
}

export const me = (req, res, next) => {
  try {
    delete req.user.password
    // console.log(req.user)
    res.json({
      user: req.user,
    })
  } catch (e) {
    next(e)
  }
}

export const signin = async (req, res, next) => {
  try {
    const data = storage.connect('./server/users.json')
    const { users } = data.state
    const { username, password } = req.body
    const oneUser = users.find((u) => u.username === username)
    if (!oneUser) {
      throw new Error('ไม่พบชื่อผู้ใช้')
    }
    const checkPassword = await comparePassword(password, oneUser.password)
    if (!checkPassword) {
      throw new Error('รหัสผ่านไม่ถูกต้อง')
    }

    const token = Jwt.sign(
      {
        id: oneUser.id,
        username: oneUser.username,
        name: oneUser.name,
      },
      JWT_SECRET,
      { expiresIn: '5 days' }
    )
    res.json({ message: 'เข้าสู่ระบบสำเร็จ', token })
  } catch (e) {
    next(e)
  }
}

export const createUser = async (req, res, next) => {
  try {
    const data = storage.connect('./server/users.json')
    const { users } = data.state
    const { name, email, username, password, role } = req.body
    await findValueByEmail(users, email)
    await findValueByUsername(users, username)
    const obj = {
      id: await randomId(),
      name,
      email,
      username,
      password: await encodePassword(password),
      role,
    }
    users.push(obj)
    data.setState({ users })
    data.save()
    res.json(obj)
  } catch (e) {
    next(e)
  }
}

export const updateUser = async (req, res, next) => {
  try {
    const data = storage.connect('./server/users.json')
    const { users } = data.state
    const { name, email, username, password, id, role } = req.body
    const index = await findValueById(users, id)

    users[index].name = name
    users[index].email = email
    if (
      users[index].password === password &&
      users[index].password.length === password.length
    ) {
      users[index].password = password
    } else {
      users[index].password = await encodePassword(password)
    }
    users[index].username = username
    users[index].role = role
    data.setState({ users })
    data.save()
    res.json(users[index])
  } catch (e) {
    next(e)
  }
}

export const deleteUser = async (req, res, next) => {
  try {
    const data = storage.connect('./server/users.json')
    const { users } = data.state
    const { id } = req.params
    const index = await findValueById(users, id)
    users.splice(index, 1)
    data.setState({ users })
    data.save()
    res.json(users)
  } catch (e) {
    next(e)
  }
}
