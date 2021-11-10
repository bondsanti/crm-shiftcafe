export default (context) => {
  // console.log(context)
  const { loggedIn } = context.store.state.auth
  if (loggedIn) {
    // return context.redirect('/admin/report')
    context.app.router.push('/admin/report')
  }
}
