export const getAccessToken = () => {
  return window.localStorage
    ? window.localStorage.getItem('access_token')
    : null
}
export const getRefreshToken = () => {
  return window.localStorage
    ? window.localStorage.getItem('refresh_token')
    : null
}
export const getItemLocalStorage = (itemName) => {
  return window.localStorage ? window.localStorage.getItem(itemName) : null
}
export const setAccessToken = (accessToken) => {
  return window.localStorage
    ? window.localStorage.setItem('access_token', accessToken)
    : null
}
export const setRefreshToken = (accessToken) => {
  return window.localStorage
    ? window.localStorage.setItem('refresh_token', accessToken)
    : null
}
export const setStoreCartItems = (items) => {
  return window.localStorage
    ? window.localStorage.setItem('cartItems', JSON.stringify(items))
    : null
}
export const objectToArray = (object) => {
  let arrayString = []
  Object.keys(object).map((item) => {
    arrayString = arrayString.concat(object[item])
  })
  return arrayString
}
