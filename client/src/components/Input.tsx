import React from "react"

type InputProps = {
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder: string;
    reference?: any;
};
  
export const Input: React.FC<InputProps> = ({ onChange, placeholder,reference }) => {
    return (
      <div>
          <input ref={reference} type={"text"} placeholder={placeholder} className="my-2 px-4 py-2 text-black z-100" onChange={onChange} />
      </div>
    )
  }