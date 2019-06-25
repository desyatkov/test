import { sortBy, map, filter } from 'lodash';
import uuid from 'uuid';

const initialState = {
  ticket: [],
  filteredTicket: [],
  loading: true,
  error: null,
  stops: [
    { id: uuid(), value: 0, isChecked: true, label: 'Без пересадок' },
    { id: uuid(), value: 1, isChecked: true, label: '1 пересадка' },
    { id: uuid(), value: 2, isChecked: true, label: '2 пересадки' },
    { id: uuid(), value: 3, isChecked: true, label: '3 пересадки' },
  ],
  checkAllStops: true,
  testItem: [],
  activeCurrency: 'RUB',
  exchangeRate: 1,
  exchange: {},
  loadingExchange: true,
  errorExchange: null,
};

const selectAllStops = (stops, checkAllStops) => {
  const clone = [...stops];
  let isChecked = true;

  if (checkAllStops) isChecked = false;

  clone.forEach(item => {
    item.isChecked = isChecked;
  });

  return clone;
};

const selectExactStop = (stops, id) => {
  const clone = selectAllStops(stops, true);

  const index = clone.findIndex(item => item.id === id);
  const updated = { ...clone[index], isChecked: true };
  return [...clone.slice(0, index), updated, ...clone.slice(index + 1)];
};

const sortTicketsByPrice = array => {
  return sortBy(array, ['price']);
};

const checkBoxSelectedLength = stopsList => {
  return map(filter(stopsList, 'isChecked'), 'value');
};

const filterListByCheckedFilter = (stopsList, ticketList) => {
  const checkedList = checkBoxSelectedLength(stopsList);

  if (checkedList.length === 0) {
    return [];
  }
  return sortTicketsByPrice(
    filter(ticketList, function(o) {
      return checkedList.includes(o.stops);
    }),
  );
};

const updateStops = (list, id) => {
  const index = list.findIndex(item => item.id === id);
  const updated = { ...list[index], isChecked: !list[index].isChecked };
  return [...list.slice(0, index), updated, ...list.slice(index + 1)];
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_TICKETS_FAILED':
      return {
        ...state,
        ticket: [],
        loading: false,
        error: action.payload,
      };

    case 'FETCH_TICKET_SUCCESS':
      return {
        ...state,
        ticket: action.payload,
        filteredTicket: sortTicketsByPrice(action.payload),
        loading: false,
        error: null,
      };

    case 'CHANGE_CHECKBOX_LIST':
      const updatedStops = updateStops(state.stops, action.payload);
      return {
        ...state,
        loading: false,
        error: null,
        stops: updatedStops,
        checkAllStops: checkBoxSelectedLength(updatedStops).length >= updatedStops.length,
      };

    case 'FILTER_TICKET_BY_STOP':
      return {
        ...state,
        filteredTicket: filterListByCheckedFilter(state.stops, state.ticket),
      };

    case 'UPDATE_ACTIVE_CURRENCY':
      return {
        ...state,
        activeCurrency: action.payload,
        exchangeRate: state.exchange[`RUB_${action.payload}`],
      };

    case 'FETCH_EXCHANGE_SUCCESS':
      return {
        ...state,
        exchange: { ...action.payload, RUB_RUB: 1 },
        loadingExchange: false,
        errorExchange: null,
      };

    case 'FETCH_EXCHANGE_FAILED':
      return {
        ...state,
        exchange: {},
        loadingExchange: false,
        errorExchange: action.payload,
      };

    case 'SELECT_ALL_FILTERS':
      return {
        ...state,
        checkAllStops: !state.checkAllStops,
        stops: selectAllStops(state.stops, state.checkAllStops),
        filteredTicket: !state.checkAllStops ? sortTicketsByPrice(state.ticket) : [],
      };

    case 'SELECT_JUST_ONE':
      return {
        ...state,
        checkAllStops: false,
        stops: selectExactStop(state.stops, action.payload),
        filteredTicket: filterListByCheckedFilter(
          selectExactStop(state.stops, action.payload),
          state.ticket,
        ),
      };

    default:
      return state;
  }
};

export default reducer;
