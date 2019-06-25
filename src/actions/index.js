import ticketService from '../services/ticket-service';
import exchangeService from '../services/exchange-service';

const ticketError = error => {
  return {
    type: 'FETCH_TICKETS_FAILED',
    payload: error,
  };
};

const ticketLoaded = newTicket => {
  return {
    type: 'FETCH_TICKET_SUCCESS',
    payload: newTicket,
  };
};

const exchangeLoaded = data => {
  return {
    type: 'FETCH_EXCHANGE_SUCCESS',
    payload: data,
  };
};

const exchangeError = data => {
  return {
    type: 'FETCH_EXCHANGE_FAILED',
    payload: data,
  };
};

const changeCheckBoxList = filterId => {
  return {
    type: 'CHANGE_CHECKBOX_LIST',
    payload: filterId,
  };
};

const filterTicketsByStops = () => {
  return {
    type: 'FILTER_TICKET_BY_STOP',
  };
};

const updateActiveCurrency = currency => {
  return {
    type: 'UPDATE_ACTIVE_CURRENCY',
    payload: currency,
  };
};

const selectJustOne = id => {
  return {
    type: 'SELECT_JUST_ONE',
    payload: id,
  };
};

const selectAllFilters = () => {
  return {
    type: 'SELECT_ALL_FILTERS',
  };
};

const fetchTickets = () => () => dispatch => {
  ticketService
    .getTickets()
    .then(data => data.json())
    .then(data => dispatch(ticketLoaded(data.tickets)))
    .catch(error => dispatch(ticketError(error)));
};

const fetchRates = () => () => dispatch => {
  exchangeService
    .getRates()
    .then(data => data.json())
    .then(data => dispatch(exchangeLoaded(data)))
    .catch(error => dispatch(exchangeError(error)));
};

export {
  fetchTickets,
  fetchRates,
  changeCheckBoxList,
  filterTicketsByStops,
  updateActiveCurrency,
  selectAllFilters,
  selectJustOne,
};
