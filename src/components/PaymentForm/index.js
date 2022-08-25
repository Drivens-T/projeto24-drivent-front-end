import React from 'react';
import Cards from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css';
import InputMask from 'react-input-mask';
import styled from 'styled-components';
import Button from '../Form/Button';

export default class PaymentForm extends React.Component {
  state = {
    cvc: '',
    expiry: '',
    focus: '',
    name: '',
    number: '',
  };

  handleInputFocus = (e) => {
    this.setState({ focus: e.target.name });
  };

  handleInputChange = (e) => {
    const { name, value } = e.target;

    this.setState({ [name]: value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    // eslint-disable-next-line no-console
    console.log(this.state);
  };

  render() {
    return (
      <CardContainer>
        <Cards
          cvc={this.state.cvc}
          expiry={this.state.expiry}
          focused={this.state.focus}
          name={this.state.name}
          number={this.state.number}
        />
        <CardForm onSubmit={this.handleSubmit}>
          <div>
            <InputMask
              type="tel"
              name="number"
              placeholder="Card Number"
              required
              onChange={this.handleInputChange}
              onFocus={this.handleInputFocus}
              mask="9999 9999 9999 9999"
              maskChar=""
              pattern="\b\d{4}[ ]?\d{4}[ ]?\d{4}[ ]?\d{4}\b"
            />
            <small>E.g.: 49..., 51..., 36..., 37...</small>
          </div>
          <input
            type="text"
            name="name"
            placeholder="Name"
            required
            onChange={this.handleInputChange}
            onFocus={this.handleInputFocus}
          />
          <div>
            <InputMask
              type="tel"
              name="expiry"
              placeholder="Valid Thru"
              pattern="\d\d/\d\d"
              required
              onChange={this.handleInputChange}
              onFocus={this.handleInputFocus}
              mask="99/99"
              maskChar=""
            />
            <input
              type="tel"
              name="cvc"
              placeholder="CVC"
              pattern="\d{3,4}"
              maxLength="4"
              required
              onChange={this.handleInputChange}
              onFocus={this.handleInputFocus}
            />
          </div>
          <SubmitContainer>
            <Button type="submit" disabled={false}>
              FINALIZAR PAGAMENTO
            </Button>
          </SubmitContainer>
        </CardForm>
      </CardContainer>
    );
  }
}

const CardContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: start;
  align-items: flex-start;
  gap: 30px;
  .rccs {
    margin: 0;
  }
  @media (max-width: 800px) {
    flex-direction: column;
  }
`;

const CardForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 13px;
  max-width: 320px;
  input {
    height: 45px;
    max-width: 320px;
    background: white;
    border-radius: 6px;
    font-size: 20px;
    color: black;
    padding-left: 7px;
    border: 1px solid #a4a4a4;
    ::placeholder {
      color: #a4a4a4;
    }
  }
  div:nth-child(1) {
    display: flex;
    flex-direction: column;
  }
  div:nth-child(3) {
    display: flex;
    gap: 10px;
    input:first-child {
      width: 200px;
    }
    input:last-child {
      width: 100px;
    }
  }
  small {
    color: #a4a4a4;
    font-size: 16px;
    margin-top: 5px;
    font-weight: 400;
  }
`;

const SubmitContainer = styled.div`
  position: absolute;
  left: 0;
  bottom: -77px;
  @media (max-width: 800px) {
    position: static;
    margin-top: 15px;
  }
`;
