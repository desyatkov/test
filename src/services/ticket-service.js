class ticketService {
  API_SERVICE = '/api/get-tickets';

  getTickets() {
    return fetch(this.API_SERVICE);
  }
}

export default new ticketService();
