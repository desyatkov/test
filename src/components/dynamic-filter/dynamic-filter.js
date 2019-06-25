import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  changeCheckBoxList,
  filterTicketsByStops,
  selectAllFilters,
  selectJustOne,
} from '../../actions';

import Checkbox from './checkbox';

import './dynamic-filter.scss';

const DynamicFilter = ({
  stops,
  updateCheckboxList,
  filterTickets,
  checkAllStops,
  selectAllFilters,
  selectJustOne,
}) => {
  const selectAllHandler = () => {
    selectAllFilters();
  };

  return (
    <div className="app__filter__bottom">
      <div className="app__filter__bottom__label">КОЛИЧЕСТВО ПЕРЕСАДОК</div>
      <ul className="app__filter__bottom__items">
        <Checkbox isChecked={checkAllStops} changeHandler={selectAllHandler} label="Все" />
        {stops.map(checkbox => {
          const { id } = checkbox;
          const selectOneHandler = () => {
            selectJustOne(id);
          };
          const changeHandler = () => {
            updateCheckboxList(id);
            filterTickets();
          };

          return (
            <Checkbox
              {...checkbox}
              key={`filter_${id}`}
              selectOneHandler={selectOneHandler}
              changeHandler={changeHandler}
            />
          );
        })}
      </ul>
    </div>
  );
};

const mapStateToProps = ({ stops, checkAllStops }) => {
  return { stops, checkAllStops };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      updateCheckboxList: changeCheckBoxList,
      filterTickets: filterTicketsByStops,
      selectAllFilters,
      selectJustOne,
    },
    dispatch,
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DynamicFilter);
