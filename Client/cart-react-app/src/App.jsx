import { useState } from 'react'
import './App.css'
import axios from "axios"


function App() {
  const [user, setUser] = useState({email:"",password:""})

  function onChange(e){

    let val=e.target.value;
    let name=e.target.name;
    console.log(val);
    console.log(name);

    setUser({...user,[name] : val});
  }

  async function handleSubmit(e){
    e.preventDefault();
    try {
      console.log("user",user);
      await axios.post("http://localhost:3000/users/login", user);
      console.log("SuccessFull login");
      
    } catch (error) {
      console.error(error);
    }

  }

  return (
    <>
    <center>
      <dir>
        <form onSubmit={handleSubmit}>
          <table>
            <tr>
              <td><label htmlFor="emil">email:</label></td>
              <td><input type="email" id='email' value={user.email} onChange={onChange} placeholder='Enter Email' name='email'/></td>
            </tr>
            <tr>
              <td><label htmlFor="password">email:</label></td>
              <td><input type="password" id='password' value={user.password} onChange={onChange} placeholder='Enter PassWord' name='password'/></td>
            </tr>
            <tr>
              <td></td>
              <td><input type="submit" value={"Login"} /></td>
            </tr>
          </table>
        </form>
      </dir>
    </center>
    </>
  )
}

export default App
