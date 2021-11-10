import HandyStorage from 'handy-storage'
import Jwt from 'jsonwebtoken'
import { JWT_SECRET } from '../constant'
import { comparePassword } from '../help'
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
