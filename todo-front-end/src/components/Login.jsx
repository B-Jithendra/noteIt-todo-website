import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate,Link } from 'react-router-dom'
function Login() {
    const navigateTo = useNavigate()
          const [seePassword, setSeePassword] = useState(false)
            const [email, setEmail] = useState("");
              const [password, setPassword] = useState("");
                async function handleSubmit(e) {
                  e.preventDefault()
                  try{
                  const res = await axios.post('http://localhost:8080/login', { email, password});
                  console.log(res)
                  // alert(res.data.message)
                    localStorage.setItem("userId", res.data.user._id)
                    localStorage.setItem("token", res.data.token)


                    res.data.message === 'Login Successfull' && navigateTo("/dashboard")
                  }
                  catch(err){
                      alert(err.response.data.message)
                  }
                }
  return (
    <div className="container">
      <div className="card-dark  ">
        <div className="card-body">
          <div className="card-title text-center fs-5">Login</div>
          <form action="" onSubmit={handleSubmit}>
          <div className="d-flex flex-column">
            
              
              <div className="text-center mt-5">
                <input
                  type="email"
                  id="name"
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

              <i className={ seePassword ? "fa-solid fa-eye-slash position-absolute eye" : "fa-solid fa-eye position-absolute eye" } onClick={() => setSeePassword(!seePassword)}></i>
            </div>
              <p className='mt-3'>Don't have an account?<Link to='/register'>Signup</Link> </p>
              <button className="text-center  btn-register">
                Login
              </button>
            
          </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login