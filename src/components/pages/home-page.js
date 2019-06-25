import React, { Fragment } from 'react';
import TicketList from '../tickets-list';
import DynamicFilter from '../dynamic-filter';
import CurrencyFilter from '../currency-filter';

const HomePage = () => {
  return (
    <Fragment>
      <div className="app__header" />
      <div className="app">
        <div className="app__filter">
          <CurrencyFilter />
          <DynamicFilter />
        </div>
        <div className="app__context">
          <TicketList />
        </div>
      </div>
    </Fragment>
  );
};

export default HomePage;
