import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import TicketListItem from '../ticket-list-item';
import { fetchTickets } from '../../actions';
import Spinner from '../spinner';
import ErrorIndicator from '../error-indicator';
import './tickets-list.scss';

const TicketsList = ({ ticket }) => {
  if (ticket.length === 0) {
    return (
      <ol className="app__context__items">
        <TransitionGroup className="app__context__items__empty">
          <CSSTransition key={Math.random()} timeout={500} classNames="item">
            <li>Please select at least one filter</li>
          </CSSTransition>
        </TransitionGroup>
      </ol>
    );
  } else {
    return (
      <ol className="app__context__items">
        <TransitionGroup className="app__context__items__wrap">
          {ticket.map(ticket => (
            <CSSTransition key={Math.random()} timeout={500} classNames="item">
              <li className="ticket-item" key={Math.random()}>
                <TicketListItem ticket={ticket} />
              </li>
            </CSSTransition>
          ))}
        </TransitionGroup>
      </ol>
    );
  }
};

class TicketsListContainer extends Component {
  componentDidMount() {
    const { fetchTickets } = this.props;
    fetchTickets();
  }

  render() {
    const { filteredTicket, loading, error } = this.props;

    if (loading) {
      return <Spinner />;
    }

    if (error) {
      return <ErrorIndicator />;
    }

    return <TicketsList ticket={filteredTicket} />;
  }
}

const mapStateToProps = ({ filteredTicket, loading, error }) => {
  return { filteredTicket, loading, error };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ fetchTickets: fetchTickets() }, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TicketsListContainer);
