
import React, { useState, useCallback, useEffect } from "react";

function App() {
  const [password, setpassword] = useState("");
  const [length, setlength] = useState(8);
  const [number, setnumber] = useState(false);
  const [specialcharAllow, setspecialcharAllow] = useState(false);

  const toggleNumber = () => setnumber(!number);
  const toggleSpecialChar = () => setspecialcharAllow(!specialcharAllow);

  const generatePassword = () => {
    let pass = "";
    let string = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmn";
    if (specialcharAllow) string += "!@#$%^&*(){}[].,<>/?`:";
    if (number) string += "1234567890";

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * string.length);
      pass += string.charAt(randomIndex);
    }

    setpassword(pass);
  };

  useEffect(() => {
    generatePassword();
  
  }, [length, specialcharAllow, number]);
  const copyToClipboard = () => {
    navigator.clipboard.writeText(password);
  
    const alertElements = document.querySelectorAll(".alert");
    const containerElements = document.querySelectorAll(".container");
    console.log(alertElements);
    alertElements.forEach((alertElement) => {
      alertElements[1].classList.add("copied");
      alertElements[0].classList.add("copied3");

      alertElements[0].innerText = "✓";
      alertElements[1].innerText = "Copied";
    });
  
    containerElements.forEach((containerElement) => {
      containerElement.classList.add("copied2");
    });
  
    setTimeout(() => {
      alertElements.forEach((alertElement,i) => {
        alertElement.classList.remove("copied");
        alertElement.classList.remove("copied3");
        alertElements[1].innerText = "Copy Password";
        alertElements[0].innerText = "New";
      });
  
      containerElements.forEach((containerElement) => {
        containerElement.classList.remove("copied2");

      });
  
    }, 3000);
  };
  
  return (
    <div className="container">
      <label>
        Generated Password:
        <input  type="text" value={password} readOnly />
        <button className="lol copy-button alert " onClick={generatePassword}> New</button>
      </label>
      <button className="copy-button alert" onClick={copyToClipboard}>
        Copy Password 
      </button>

      
      <label>
        
        <label htmlFor="passwordLength" style={{paddingTop:'30px',marginBottom:'0px'}}>Password Length: <span style={{color:'black'}}> {length}  </span></label>
      <input
        id="passwordLength"
        type="range"
        min="8"
        max="30"
        value={length}
        onChange={(e) => setlength(parseInt(e.target.value))}
        style={{
          width: '80%',
          height:'10px',
          
          borderRadius: '5px',
          boxShadow: '0 0 5px rgba(0, 0, 0, 0.1)',
          outline: 'none',
          appearance: 'none',
        }}
        className="custom-range slider"
      />
      
      </label>

      <label>
        Allow Numbers:
        <input type="checkbox" checked={number} onChange={toggleNumber} />
      </label>

      <label>
        Allow Special Characters:
        <input
          type="checkbox"
          checked={specialcharAllow}
          onChange={toggleSpecialChar}
        />
      </label>
    </div>
  );
}

export default App;
