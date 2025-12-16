import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
function Register() {
const navigateTo = useNavigate()

  const [seePassword, setSeePassword] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e) {
    e.preventDefault()
    try{
    const res = await axios.post('http://localhost:8080/register', {name, email, password});
    const response = res.data.message
    console.log(response)
    alert(response)
    response == 'Registered Successfully' && navigateTo('/login')

    }
    catch(err){
        console.log(err.response.data.message)
        alert(err.response.data.message)
    }
  }
  return (
    <div className="container ">
      <div className="card-dark  ">
        <div className="card-body">
          <div className="card-title text-center fs-5">Register</div>
          <form action="" onSubmit={handleSubmit}>
            <div className="d-flex flex-column">
              <div className="text-center">
                <input
                  type="text"
                  id="name"
                  placeholder="Enter your Name"
                  className="my-4"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="text-center">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="mb-4"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="position-relative">
                <input
                  type={seePassword ? "text" : "password"}
                  id="password"
                  className="w-100"
                  autoComplete="off"
                  placeholder="Enter password"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />

                <i
                  className={
                    seePassword
                      ? "fa-solid fa-eye-slash position-absolute eye"
                      : "fa-solid fa-eye position-absolute eye"
                  }
                  onClick={() => setSeePassword(!seePassword)}
                ></i>
              </div>
              <p className="mt-4">
                Already have an account?<Link to="/login">Login</Link>
              </p>
              <button className="text-center  btn-register">Register</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
