import axiosClient from './axios.js'

export class ChatBox {
  endpoint = '/chatbot'

  async sendMessage(message) {
    return axiosClient.post(`${this.endpoint}/answer/`, {message})
  }
}

export default new ChatBox()
