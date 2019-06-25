class exchangeService {
  API_SERVICE = '/api/get-rates';

  getRates() {
    return fetch(this.API_SERVICE);
  }
}

export default new exchangeService();
