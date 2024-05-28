const logoutSession = () => {
  window.localStorage.removeItem('_token')
}

export default {
  logoutSession
}
