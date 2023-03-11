export const getAccessToken = () => {
  return window.localStorage
    ? window.localStorage.getItem('access_token')
    : null
}
export const setAccessToken = (accessToken) => {
  return window.localStorage
    ? window.localStorage.setItem('access_token', accessToken)
    : null
}
