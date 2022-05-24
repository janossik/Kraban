import { FormEvent, useReducer } from "react";
import { Input, Label, StyledButton, Wrapper } from "./Form.styles";

interface FormProps<initialStateType> {
  required?: boolean;
  buttonText: string;
  initialState: initialStateType;
  handler: (value: initialStateType, e: FormEvent<HTMLFormElement>) => void;
}

const Form = <initialStateType extends { [key: string]: string | number }>({
  required = false,
  initialState,
  handler,
  buttonText,
}: FormProps<initialStateType>) => {
  type keyType = keyof typeof initialState;
  const keys = Object.keys(initialState) as keyType[];
  for (const key of keys) {
    if (
      typeof initialState[key] !== "string" &&
      typeof initialState[key] !== "number"
    ) {
      throw new Error(
        ` ${key} must be a string or a number, it is now a ${typeof initialState[
          key
        ]} value and not valid.`
      );
    }
  }
  const reducer = (
    state: typeof initialState,
    action: {
      type: string;
      value?: string | number;
    }
  ) => {
    if ("reset" === action.type) {
      return initialState;
    }
    for (const key of keys) {
      if (key === action.type) {
        return { ...state, [key]: action.value };
      }
    }
    console.error("Invalid action");
    return state;
  };
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <Wrapper
      onSubmit={(e) => {
        e.preventDefault();
        handler(state, e);
        dispatch({ type: "reset" });
      }}
    >
      {Object.keys(state).map((key) => {
        return (
          <Label key={key}>
            <div>{key}</div>
            <div>
              <Input
                name={key}
                placeholder={key}
                value={state[key]}
                type={
                  key === "password"
                    ? "password"
                    : typeof initialState[key as keyof typeof initialState]
                }
                autoComplete="off"
                required={required}
                onChange={({ currentTarget }) =>
                  dispatch({ type: key, value: currentTarget.value })
                }
              />
            </div>
          </Label>
        );
      })}
      <StyledButton type="submit">{buttonText}</StyledButton>
    </Wrapper>
  );
};

export default Form;
