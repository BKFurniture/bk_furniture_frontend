import axios from 'axios'

const DOMAIN_MAILER = 'http://localhost:8081'
const axiosMailer = axios.create({
  baseURL: DOMAIN_MAILER,
})
export function mailerSignUp({username, email}) {
  return axiosMailer.get(`/mailer/${email}/${username}/sign-up`)
}
export function mailerCheckout(username, email, data) {
  return axiosMailer.post(`/mailer/${email}/${username}/checkout`, data)
}
