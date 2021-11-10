export default (context) => {
  const { loggedIn } = context.store.state.auth
  if (!loggedIn) {
    // return context.redirect('/admin')
    // context.app.router.push('/admin')
    // context.store.$router.push('/admin')
    // eslint-disable-next-line unicorn/error-message
    const error = new Error()
    error.message = 'กรุณาเข้าสู่ระบบ'
    error.statusCode = 401
    throw error
  }
}
