import * as yup from 'yup';
import { Formik } from 'formik';
import {
  Container,
  SearchForm,
  Button,
  SearchIcon,
  DeleteIcon,
  ButtonLabel,
  SearchInput,
  LogoContainer,
  LogoIcon,
  LogoLabel,
} from './Searchbar.styled';
import PropTypes from 'prop-types';

const schema = yup.object().shape({
  searchQuery: yup.string().required(),
});

function Searchbar({ onSubmit }) {
  const handleSubmit = async (values, { setSubmitting }) => {
    await onSubmit(values.searchQuery);
    setSubmitting(false);
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
        {({ values, isSubmitting }) => (
          <SearchForm>
            <Button type="submit" disabled={isSubmitting}>
              <SearchIcon />
              <ButtonLabel>Search</ButtonLabel>
            </Button>
            <SearchInput
              name="searchQuery"
              type="text"
              autoComplete="off"
              autoFocus
              placeholder="Search images and photos"
            ></SearchInput>

            {values.searchQuery ? (
              <Button type="reset" disabled={isSubmitting}>
                <DeleteIcon />
                <ButtonLabel>Delete</ButtonLabel>
              </Button>
            ) : (
              <Button type="button" />
            )}
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
