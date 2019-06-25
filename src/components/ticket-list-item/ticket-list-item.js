import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import dayjs from 'dayjs';
import { ReactComponent as FlyLogo } from '../svg/fly.svg';
import { ReactComponent as PlaneLogo } from '../svg/plane.svg';
import ru from '../../utils/locate';
import './ticket-list-item.scss';

const TicketListItem = ({ ticket, exchangeRate, activeCurrency }) => {
  const numberWithSpaces = num => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  };

  const declOfNum = number => {
    const titles = ['ПЕРЕСАДКА', 'ПЕРЕСАДКИ', 'ПЕРЕСАДОК'];
    const cases = [2, 0, 1, 1, 1, 2];
    return titles[
      number % 100 > 4 && number % 100 < 20 ? 2 : cases[number % 10 < 5 ? number % 10 : 5]
    ];
  };

  dayjs.locale('ru-custom', ru);

  const dataFormat = date => {
    return dayjs(date).format('D MMM YYYY, dd');
  };

  const {
    arrival_time,
    departure_time,
    arrival_date,
    price,
    carrier,
    origin,
    origin_name,
    destination,
    destination_name,
    stops,
    departure_date,
  } = ticket;

  const exchangedPrice = numberWithSpaces(Math.ceil(price * exchangeRate)).replace(/ /g, '\u2009');

  return (
    <Fragment>
      <div className="ticket-item__cta">
        <div className="ticket-item__cta__logo">
          <img className="ticket-item__cta__logo__link" src={`/img/${carrier}.png`} alt="" />
        </div>
        <NavLink to="/" className="ticket-item__cta__link">
          <span>Купить</span>
          <span>
            {`за\u00a0`}
            <span
              className={`exchanged-${activeCurrency.toLocaleLowerCase()} app__context__items__item__exch`}
            >
              {exchangedPrice}
            </span>
          </span>
        </NavLink>
      </div>
      <div className="ticket-item__right">
        <div className="ticket-item__info">
          <div className="ticket-item__info__time">
            <div className="ticket-item__info__time__dep">{departure_time}</div>
            <div className="ticket-item__info__time__stop">
              {stops === 0 ? null : (
                <div className="ticket-item__info__time__stop__text">
                  {`${stops} ${declOfNum(stops)}`}
                </div>
              )}
              <div className="ticket-item__info__time__stop__sign">
                <div className="ticket-item__info__time__stop__sign__line" />
                <PlaneLogo />
              </div>
            </div>
            <div className="ticket-item__info__time__arrival">{arrival_time}</div>
          </div>
        </div>
        <div className="ticket-item__info__fly">
          <div className="ticket-item__info__fly__dep">
            <div className="ticket-item__info__fly__dep__city">{`${origin}, ${origin_name}`}</div>
            <div className="ticket-item__info__fly__dep__data">{dataFormat(departure_date)}</div>
          </div>
          <div className="ticket-item__info__fly__arrival">
            <div className="ticket-item__info__fly__arrival__city">
              {`${destination}, ${destination_name}`}
            </div>
            <div className="ticket-item__info__fly__arrival__data">{dataFormat(arrival_date)}</div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

TicketListItem.propTypes = {
  ticket: PropTypes.object.isRequired,
};

const mapStateToProps = ({ exchangeRate, activeCurrency }) => {
  return { exchangeRate, activeCurrency };
};

export default connect(mapStateToProps)(TicketListItem);
