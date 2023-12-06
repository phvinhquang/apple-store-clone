import { useState } from "react";

const useInput = function (validateValueFn) {
  const [enteredValue, setEnteredValue] = useState("");
  const [isTouched, setIsTouched] = useState(false);

  const valueIsValid = validateValueFn(enteredValue);
  const hasError = !valueIsValid && isTouched;

  // Hàm xử lý sự kiện nhập input
  const valueChangeHandler = function (e) {
    setEnteredValue(e.target.value);
  };

  // Hàm xử lý sự kiện blur input
  const inputBlurHandler = function (e) {
    setIsTouched(true);
  };

  const reset = function () {
    setEnteredValue("");
    setIsTouched(false);
  };
  //  Export setEnterdValue để có thể chỉnh default value khi edit
  return {
    value: enteredValue,
    isValid: valueIsValid,
    hasError: hasError,
    valueChangeHandler,
    inputBlurHandler,
    setEnteredValue,
    setIsTouched,
    reset,
  };
};

export default useInput;
