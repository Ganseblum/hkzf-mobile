const TOKEN_KEY = 'geek_city'


const getToken = () => localStorage.getItem(TOKEN_KEY)

const setToken = (token) => localStorage.setItem(TOKEN_KEY, token)

const removeToken = () => localStorage.removeItem(TOKEN_KEY)


export { getToken, setToken, removeToken }
