import Cookies from 'js-cookie'

export const TOKEN_KEY = 'token'
export const cookieExpires = new Date().getTime() + 60 * 3 * 1000

export const setToken = (token) => {
  return Cookies.set(TOKEN_KEY, token)
}

export const getToken = () => {
  return Cookies.get(TOKEN_KEY)
}

export const removeToken = () => {
  return Cookies.remove(TOKEN_KEY)
}
