import { useState } from "react";
import type { ExpenseProps } from "../../models/interfaces/ExpenseProps/ExpenseProps";
import "./Expense.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPercent } from "@fortawesome/free-solid-svg-icons";
import Button from "../Button/Button";

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
    <div>
      <div className="expense_container">
        <div className="expense_card">
          <header className="expense_header">
            <FontAwesomeIcon icon={faPercent} color="#E43F4d" size="2x" />
            <h2>Despesas</h2>
          </header>

          <h3> {currentExpenses > 0 ? currentExpenses : "R$ 0"} </h3>

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
              <div
                className={`input_form_container ${
                  !IsFormValid ? "invalid" : ""
                }`}
              >
                <input
                  type="text"
                  placeholder="Nome"
                  className="expense_input"
                  value={InputName}
                  onChange={handleInputNameForm}
                />
                <input
                  type="text"
                  placeholder="Valor"
                  className="expense_input"
                  value={InputValue}
                  onChange={handleInputValueForm}
                />
              </div>
              <div className="action_form_button_container"> 
                <Button 
                    title="Cancelar"
                    priority="Output"
                    action={hideInputForm}
                />
                <Button 
                    type="submit"
                    title="Adicionar"
                    priority="Input"
                />
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Expense;
