import { useState } from "react";
import type { BalaceProps } from "../../../../models/interfaces/BalanceProps/BalanceProps";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDollar } from "@fortawesome/free-solid-svg-icons";
import "./Balance.css";
FontAwesomeIcon 

 
 
 const Balance = ( {emitMovement, currentBalance}: BalaceProps) => {
   const [renderInputForm, setRenderInputForm] = useState(false);
   const [IsFormValid, setIsFormValid] = useState(false);
   const [inputName, setInputName] = useState("");
   const [inputValue, setInputValue] = useState("");

   const handleRenderInputForm = () => setRenderInputForm(!false);

   const hideInputForm = () => {
    setRenderInputForm(false);
    setIsFormValid(false);
    setInputName("");
    setInputValue("");
   }
   
    return (
        <div>
            <div className="balance_container">
                <div className="balance_card">
                    <header className="balance_header">
                        <FontAwesomeIcon icon={faDollar} color="#7af1a7" size="2x"/>
                        <h2>Saldo</h2>
                    </header>

                <h3> {currentBalance > 0 ? currentBalance : "R$ 0"} </h3>
                </div>
            </div>
        </div>
    );
};

export default Balance;