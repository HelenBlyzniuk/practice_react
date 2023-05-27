import { useState } from 'react';

import { FiSearch } from 'react-icons/fi';
import { FormBtn, InputSearch, SearchFormStyled } from './SearchForm.styled';

export const SearchForm = ({ onSubmit }) => {
  const [query, setQuery] = useState('');
  const onChange = e => {
    setQuery(e.target.value);
  };
  const onFormSubmit = e => {
    e.preventDefault();
    if (!query.trim()) {
      return;
    }
    onSubmit(query.trim().toLowerCase());
  };
  //
  return (
    <>
      <h2>SearchForm</h2>
      <SearchFormStyled onSubmit={onFormSubmit}>
        <InputSearch onChange={onChange} value={query} />
        <FormBtn>
          <FiSearch />
        </FormBtn>
      </SearchFormStyled>
    </>
  );
};
