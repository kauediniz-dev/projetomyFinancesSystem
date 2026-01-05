import { useState } from "react";
import type { ExpenseProps } from "../../models/interfaces/ExpenseProps/ExpenseProps";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPercent } from "@fortawesome/free-solid-svg-icons";
import Button from "../Button/Button";
import { FormatMoney } from "../../utils/util";
import styled from "styled-components";
import type { FormContainerProps } from "../../models/interfaces/FormContainerProps/FormContainerProps";

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Card = styled.div`
  background-color: #36383e;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 500px;
  height: 300px;
  border-radius: 1.2rem;

  & h2 {
    margin-left: 1rem;
    font-weight: 500;
    font-size: 2.2rem;
    color: #dddcda;
  }

  & h3 {
    margin-left: 1rem;
    font-weight: 500;
    font-size: 2.2rem;
    color: #dddcda;
  }
`;

export const CardHeader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: -2rem;
`;

export const FormContainer = styled.div<FormContainerProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.8rem;

  & input {
    background: ${(props: FormContainerProps) =>
      props.invalid ? "#e43f4d7a" : "trasparent"};
    box-shadow: ${(props: FormContainerProps) =>
      props.invalid ? "inset #e43f4d 0 0 0 2px" : ""};
  }
`;

export const FormInput = styled.input`
  box-shadow: inset #dddcda 0 0 0 2px;
  border: 0;
  background: rgba(0, 0, 0, 0);
  appearance: none;
  width: 50%;
  position: relative;
  border-radius: 10px;
  padding: 9px 12px;
  line-height: 1.4;
  color: #dddcda;
  font-size: 16px;
  font-weight: 400;
  height: 30px;
  transition: all 0.2s ease;

  &:hover {
    box-shadow: 0 0 0 0 #fff inset, #7af1a7 0 0 0 2px;
  }
  &:focus {
    background: #ffffff00;
    outline: 0;
    box-shadow: 0 0 0 0 #fff inset, #7af1a7 0 0 0 3px;
  }
`;

export const ActionsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin-top: 1rem;
`;

const Expense = ({
  emitMovement,
  currentExpenses,
  currentBalance,
}: ExpenseProps) => {
  const [renderInputForm, setRenderInputForm] = useState(false);
  const [IsFormValid, setIsFormValid] = useState(true);
  const [InputName, setInputName] = useState("");
  const [InputValue, setInputValue] = useState("");

  const handleRenderInputForm = () => setRenderInputForm(!false);

  const hideInputForm = () => {
    setRenderInputForm(false);
    setIsFormValid(true);
    setInputName("");
    setInputValue("");
  };

  const formSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (InputName.trim().length === 0 || InputValue.trim().length === 0) {
      setIsFormValid(false);
    }

    if (currentBalance >= Number(InputValue)) {
      hideInputForm();
      emitMovement({
        name: InputName,
        value: InputValue,
        type: "Output",
      });
    } else {
      setIsFormValid(false);
    }
  };

  const handleInputNameForm = (event: React.FormEvent<HTMLInputElement>) => {
    const eventTarget = event.currentTarget as HTMLInputElement;
    const eventValue = eventTarget.value;
    InputName.trim().length > 0 ? setIsFormValid(true) : setIsFormValid(false);
    setInputName(eventValue);
  };

  const handleInputValueForm = (event: React.FormEvent<HTMLInputElement>) => {
    const eventTarget = event.currentTarget as HTMLInputElement;
    const eventValue = eventTarget.value;
    InputValue.trim().length > 0 ? setIsFormValid(true) : setIsFormValid(false);
    setInputValue(eventValue);
  };

  return (
    
      <Container>
        <Card>
          <CardHeader>
            <FontAwesomeIcon icon={faPercent} color="#E43F4d" size="2x" />
            <h2>Despesas</h2>
          </CardHeader>

          <h3>
            {" "}
            {currentExpenses > 0
              ? FormatMoney(String(currentExpenses))
              : "R$ 0"}{" "}
          </h3>

          {!renderInputForm && (
            <Button
              action={handleRenderInputForm}
              title="Saida"
              priority="Output"
              disable={currentBalance === 0}
            />
          )}

          {renderInputForm && (
            <form onSubmit={formSubmitHandler}>
              <FormContainer invalid={!IsFormValid}>
                <FormInput
                  type="text"
                  placeholder="Nome"
                  value={InputName}
                  onChange={handleInputNameForm}
                />
                <FormInput
                  type="text"
                  placeholder="Valor"
                  value={InputValue}
                  onChange={handleInputValueForm}
                />
              </FormContainer>
              <ActionsContainer>
                <Button
                  title="Cancelar"
                  priority="Output"
                  action={hideInputForm}
                />
                <Button type="submit" title="Adicionar" priority="Input" />
              </ActionsContainer>
            </form>
          )}
        </Card>
      </Container>
  );
};

export default Expense;
