// import { v4 as uuidV4 } from 'uuid'
import HandyStorage from 'handy-storage'
// import bcrypt from 'bcrypt'
const storage = new HandyStorage({
  beautify: true,
})
export const allUser = (req, res, next) => {
  try {
    const data = storage.connect('./server/users.json')
    const { users } = data.state
    // const salt = bcrypt.genSaltSync(10)
    // const hash = bcrypt.hashSync('123456', salt)
    res.json(users)
  } catch (e) {
    next(e)
  }
}
