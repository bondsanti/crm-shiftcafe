import HandyStorage from 'handy-storage'
const storage = new HandyStorage({
  beautify: true,
})
export const allAdviser = (req, res, next) => {
  try {
    const connect = storage.connect('./server/userAffiliate.json')
    res.json(connect.state.adviser)
  } catch (e) {
    next(e)
  }
}
