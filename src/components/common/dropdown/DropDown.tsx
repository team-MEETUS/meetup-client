/* eslint-disable no-unused-vars */
import React from 'react';

import classNames from 'classnames/bind';

import style from './DropDown.module.scss';

interface Option {
  value: string;
  label: string;
}

interface DropDownProps {
  options: Option[];
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const DropDown = ({ options, value, onChange }: DropDownProps) => {
  const cn = classNames.bind(style);

  return (
    <select value={value} onChange={onChange} className={cn('select')}>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default DropDown;
