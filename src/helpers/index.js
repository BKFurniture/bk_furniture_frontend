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
export const objectToArray = (object) => {
  let arrayString = []
  Object.keys(object).map((item) => {
    arrayString = arrayString.concat(object[item])
  })
  return arrayString
}
