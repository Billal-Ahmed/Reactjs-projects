import { useState, useCallback, useEffect, useRef} from "react";

function App() {
  const [length, setLength] = useState(23);
  const [password, setPassword] = useState("");
  const [isCharacter, setIsCharacter] = useState(false);
  const [isNumber, setIsNumber] = useState(false);

  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(() => {
    let chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let numbers = "0123456789";
    let symbols = "!@#$%^&*()_+[]{}|;':,.<>?";
    let password = "";
    if(isCharacter){
      chars += symbols;
    }
    if(isNumber){
      chars += numbers;
    }

    for(let i=0;i<length; i++){
     let ccc = Math.floor(Math.random()*chars.length+1)
      password += chars.charAt(ccc) 
    }
    setPassword(password)
},[length, isCharacter,isNumber,setPassword])

  const Copy_password_to_clipboard = useCallback(()=>{
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, length);
    window.navigator.clipboard.writeText(password);
  },[password])
  useEffect(()=>{
    passwordGenerator();
  },[length, isCharacter,isNumber,setPassword])

  return (
    <>
      <section className="">
        <div className="container p-5 bg-black text-shadow-fuchsia-100 text-amber-100 flex flex-col justify-center items-center min-w-fit h-96">
          <div className="p-3">
            <h1 className="min-w-fit w-full text-center">
              Password Generator
            </h1>
          </div>
          <div className="">
            <input
              type="text"
              name=""
              id=""
              value={password}
              placeholder="Password"
              readOnly
              className="outline-none bg-amber-50 text-black w-96 p-3 h-20 text-xl"
              ref={passwordRef}
            />
            <button
              type="submit"
              className="bg-blue-200 text-black p-3 h-20 w-32 text-2xl font-bold hover:bg-blue-400 transition-all duration-300 cursor-pointer"
              onClick={Copy_password_to_clipboard}>
              Copy
            </button>
          </div>
          <div className="min-w-full flex justify-center items-center gap-2">
            <label htmlFor="">Rang {length}</label>
            <input type="range" name="" id="" min={8} max={70} 
            defaultValue={length}
            onChange={(e)=>{
              setLength(e.target.value);
              // setPassword(
              //   Math.random().toString(36).slice(2, length + 2)
              // );
            }}
            />

            <label htmlFor="numberInput">Numbers</label>
            <input type="checkbox" name="" id="numberInput"
            defaultChecked={isNumber}
            onChange={()=>{
              setIsNumber(!isNumber);
              
            }}
            />

            <label htmlFor="characterInput">Characters</label>
            <input 
            type="checkbox"
            name=""
            id="characterInput"
            defaultChecked={isCharacter}
            onChange={()=>{
              setIsCharacter(!isCharacter);   
            }}
            />
          </div>
        </div>
      </section>
    </>
  );
}

export default App;
