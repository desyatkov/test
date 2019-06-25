import React from 'react';

const Checkbox = ({
  value = '',
  changeHandler = null,
  isChecked = true,
  label = '',
  selectOneHandler = null,
}) => {
  return (
    <li className="app__filter__bottom__items__item">
      <label className="app__filter__bottom__items__item__label" htmlFor={`connect_${value}`}>
        <span className="mark">
          <input
            type="checkbox"
            onChange={changeHandler}
            checked={isChecked}
            value={value}
            id={`connect_${value}`}
            className="mark__checkbox"
          />
          <span className="mark__sign" />
          <span className="mark__text">{label}</span>
        </span>
      </label>
      {selectOneHandler ? (
        <button
          className="app__filter__bottom__items__only"
          onClick={selectOneHandler}
          tabIndex={0}
          type="button"
        >
          ТОЛЬКО
        </button>
      ) : null}
    </li>
  );
};

export default Checkbox;
