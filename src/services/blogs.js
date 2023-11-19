import axios from 'axios'
const baseUrl = '/api/blogs'

const getHeaders = (user) => {
  return {
    headers: {
      'Authorization': `Bearer ${user.token}`
    }
  }
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async (blog, user) => {
  const headers = getHeaders(user)
  const response = await axios.post(baseUrl, blog, headers)
  return response.data
}

export default { getAll, create }
