import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import uuid from 'uuid';

import { fetchRates, updateActiveCurrency } from '../../actions';
import ErrorIndicator from '../error-indicator';
import './currency-filter.scss';

const Button = ({ label, activeCurrency, updateActiveCurrency, disabled, filteredTicket }) => {
  const className = 'app__filter__top__buttons__item';
  return (
    <button
      type="button"
      className={activeCurrency === label ? 'active ' + className : className}
      onClick={event => updateActiveCurrency(event.target.dataset.currency)}
      data-currency={label}
      disabled={disabled || filteredTicket.length === 0}
    >
      {label}
    </button>
  );
};

class CurrencyFilter extends Component {
  buttonsLabels = [
    { id: uuid(), label: 'RUB' },
    { id: uuid(), label: 'USD' },
    { id: uuid(), label: 'EUR' },
  ];

  componentDidMount() {
    const { fetchRates } = this.props;
    fetchRates();
  }

  render() {
    const { loadingExchange, errorExchange } = this.props;

    if (errorExchange) {
      return <ErrorIndicator />;
    }

    return (
      <div className="app__filter__top">
        <div className="app__filter__top__label">ВАЛЮТА</div>
        <div className="app__filter__top__buttons">
          {this.buttonsLabels.map(item => {
            const { id, label } = item;
            return <Button disabled={loadingExchange} key={id} label={label} {...this.props} />;
          })}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({
  activeCurrency,
  exchange,
  loadingExchange,
  errorExchange,
  filteredTicket,
}) => {
  return { activeCurrency, exchange, loadingExchange, errorExchange, filteredTicket };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      updateActiveCurrency: updateActiveCurrency,
      fetchRates: fetchRates(),
    },
    dispatch,
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CurrencyFilter);
