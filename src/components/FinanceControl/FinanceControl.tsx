import type { Movement } from "../../models/interfaces/Movement/Movement";
import type { FinanceControlProps } from "../../models/interfaces/FinanceControlProps/FinanceControlProps";
import Balance from "../Balance/Balance";
import Expense from "../Expense/Expense";
import "./FinanceControl.css";

const FinanceControl = ({
  handleSetMovement,
  balance,
  expenses,
}: FinanceControlProps) => {
  const receiveNewMovement = (movement: Movement) => {
    movement && handleSetMovement(movement);
  };

  return (
    <div className="container_finances">
      <Balance currentBalance={balance} emitMovement={receiveNewMovement} />
      <Expense
        currentBalance={balance}
        currentExpenses={expenses}
        emitMovement={receiveNewMovement}
      />
    </div>
  );
};

export default FinanceControl;
