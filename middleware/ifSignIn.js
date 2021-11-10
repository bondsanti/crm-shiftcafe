export default (context) => {
  const { loggedIn } = context.store.state.auth
  if (loggedIn) {
    return context.redirect('/admin/report')
  }
}
