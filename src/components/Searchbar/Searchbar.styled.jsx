import styled from '@emotion/styled';
import { Form, Field } from 'formik';
import { ImSearch } from 'react-icons/im';
import { ReactComponent as logo } from '../../images/logo.svg';

export const Container = styled.header`
  top: 0;
  left: 0;
  position: sticky;
  z-index: 1100;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 64px;
  padding-right: 24px;
  padding-left: 24px;
  padding-top: 12px;
  padding-bottom: 12px;
  color: #fff;
  background-color: #3f51b5;
  box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.2),
    0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12);
`;

export const SearchForm = styled(Form)`
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 600px;
  background-color: #fff;
  border-radius: 3px;
  overflow: hidden;
`;

export const SearchButton = styled.button`
  display: inline-block;
  width: 48px;
  height: 48px;
  border: 0;
  opacity: 0.6;
  transition: opacity 250ms cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  outline: none;
  &:hover {
    opacity: 1;
  }
  /* margin-right: 8px; // Добавили отступ справа */
  background-color: transparent; // Добавили фон в режиме прозрачности
  border: none; // Убрали рамку
`;

export const ButtonLabel = styled.span`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  clip-path: inset(50%);
  border: 0;
`;

export const SearchInput = styled(Field)`
  display: inline-block;
  width: 100%;
  font: inherit;
  font-size: 20px;
  border: none;
  outline: none;
  padding-left: 4px;
  padding-right: 4px;
  &::placeholder {
    font: inherit;
    font-size: 18px;
  }
`;

export const SearchIcon = styled(ImSearch)`
  width: 24px;
  height: 24px;
`;

export const LogoContainer = styled.a`
  position: absolute;
  right: 3%;
  top: 10%;
  text-align: left;
  text-decoration: none;
  font-size: 14px;
  line-height: 1.2;
  padding: 9px 12px 9px;
  border: 1px solid #fff;
  border-radius: 5px;
  background-color: rgba(0, 0, 0, 0.3);
  &:hover,
  :focus {
    border-color: aquamarine;
    outline-color: aquamarine;
  }
  &:hover > span,
  :focus > span {
    color: aquamarine;
  }
  &:hover > *,
  :focus > * {
    fill: aquamarine;
  }
`;

export const LogoIcon = styled(logo)`
  width: 70px;
  height: 18px;
  fill: #fff;
`;

export const LogoLabel = styled.span`
  font-family: Open Sans, Arial, sans-serif;
  display: block;
  color: #fff;
`;
