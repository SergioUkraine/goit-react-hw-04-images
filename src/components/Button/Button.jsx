import { ButtonMore } from './Button.styled';

function Button({ onClick }) {
  return (
    <ButtonMore type="button" onClick={onClick}>
      Load more
    </ButtonMore>
  );
}

export default Button;
