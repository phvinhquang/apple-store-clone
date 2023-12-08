import { useState } from "react";

const useInput = function (validateValueFn) {
  const [enteredValue, setEnteredValue] = useState("");
  const [isTouched, setIsTouched] = useState(false);

  const valueIsValid = validateValueFn(enteredValue);
  const hasError = valueIsValid.status === false && isTouched;

  // Hàm xử lý sự kiện nhập input
  const valueChangeHandler = function (e) {
    setIsTouched(false);
    setEnteredValue(e.target.value);
  };

  // Hàm xử lý sự kiện blur input
  const inputBlurHandler = function () {
    setIsTouched(true);
  };

  const reset = function () {
    setEnteredValue("");
    setIsTouched(false);
  };

  return {
    value: enteredValue,
    isValid: valueIsValid,
    hasError: hasError,
    valueChangeHandler,
    inputBlurHandler,
    setEnteredValue,
    reset,
  };
};

export default useInput;
