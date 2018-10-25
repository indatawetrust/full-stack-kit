import axios from 'axios'
import Cookie from 'js-cookie'

const okFalse = () => ({ok: false})

export default store => ({
  login: (state, { username, password }) => {
    axios
      .post('/auth/login', {
        username,
        password,
      })
      .then(({data}) => {

        if (data.ok) {
          Cookie.set('token', data.token)

          store.setState({
            isLogin: true
          })
        }

      })
      .catch(okFalse)
  },
  register: (state) => {
    axios
      .post('/auth/register', {
        username,
        password,
      })
      .then(({data}) => {

      })
      .catch(okFalse)
  },
  isAuthenticated: (state) => {
    return axios
      .get('/auth/control', {
        headers: {
          Authorization: `Bearer ${Cookie.get('token')}`,
        },
      })
      .then(({data}) => {
        if (data.ok) {
          store.setState({
            isLogin: true
          })
        }
      })
      .catch(err => {
        store.setState({
          isLogin: false
        })
      })
  }
})
