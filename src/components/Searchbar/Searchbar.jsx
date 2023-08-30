import * as yup from 'yup';
import { Formik } from 'formik';
import {
  Container,
  LogoContainer,
  LogoIcon,
  LogoLabel,
  SearchForm,
  SearchButton,
  ButtonLabel,
  SearchInput,
  SearchIcon,
} from './Searchbar.styled';
import PropTypes from 'prop-types';

const schema = yup.object().shape({
  searchQuery: yup.string().required(),
});

function Searchbar({ onSubmit }) {
  const handleSubmit = async (values, { resetForm, setSubmitting }) => {
    await onSubmit(values.searchQuery);
    setSubmitting(false);
    resetForm();
  };
  return (
    <Container>
      <LogoContainer href="https://pixabay.com">
        <LogoIcon id="logo" />
        <LogoLabel>Free images</LogoLabel>
      </LogoContainer>
      <Formik
        initialValues={{ searchQuery: '' }}
        validationSchema={schema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <SearchForm>
            <SearchButton type="submit" disabled={isSubmitting}>
              <SearchIcon />
              <ButtonLabel>Search</ButtonLabel>
            </SearchButton>
            <SearchInput
              name="searchQuery"
              type="text"
              autoComplete="off"
              autoFocus
              placeholder="Search images and photos"
            ></SearchInput>
          </SearchForm>
        )}
      </Formik>
    </Container>
  );
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;
