import axios from 'axios'

const DOMAIN_MAILER = 'http://localhost:8081'
const axiosMailer = axios.create({
  baseURL: DOMAIN_MAILER,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
})
export function mailerSignUp({username, email}) {
  return axiosMailer.get(`/mailer/${email}/${username}/sign-up`)
}
export function mailerCheckout(username, email, data) {
  return axiosMailer.post(`/mailer/${email}/${username}/checkout`, data)
}
export function mailerCustomDesign(username, email, data) {
  return axiosMailer.post(`/mailer/${email}/${username}/design`, data)
}
