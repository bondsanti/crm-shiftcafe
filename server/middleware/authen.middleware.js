import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt'
import passport from 'passport'
import HandyStorage from 'handy-storage'
import { JWT_SECRET } from '../constant'
const storage = new HandyStorage({
  beautify: true,
})

const connect = storage.connect('./server/users.json')
const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: JWT_SECRET,
}
passport.use(
  // decode jwt auto
  new JwtStrategy(opts, (jwtPayload, done) => {
    try {
      const { users } = connect.state
      const oneUser = users.find((u) => u.id === jwtPayload.id)
      if (!oneUser) {
        return done(new Error('ไม่พบบัญชีผู้ใช้'), false)
      }
      return done(null, oneUser)
    } catch (e) {
      return done(e, false)
    }
  })
)

export default passport.authenticate('jwt', { session: false })
