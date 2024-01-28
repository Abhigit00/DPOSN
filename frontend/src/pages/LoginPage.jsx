import { useState, React } from 'react'
import Navbar from '../compments/navbar/Navbar'
import { Link } from 'react-router-dom'
function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    setEmail('')
    setPassword('')
  }

  function handleChange(e) {
    switch (e.target.name) {
      case 'email':
        setEmail(e.target.value)
        break
      case 'password':
        setPassword(e.target.value)
        break
      default:
        break
    }
  }

  return (
    <>
      <div className="w-screen h-screen flex flex-col">
        <Navbar />
        <div className="grid place-content-center w-screen h-screen bg-cyan-950">
          <div className="bg-white w-[23rem] h-[20rem]  sm:w-[26rem] sm:h-[20rem]  flex flex-col items-center rounded-lg outline outline-offset-2 outline-1">
            <h1 className="mt-4 text-xl">Log in</h1>

            <form className="flex flex-col w-80 h-56 mt-8 ">
              <input
                className="h-10 px-3 border-2 border-gray-500 p-2 rounded-md focus:border-teal-500 focus:outline-none"
                placeholder="Email"
                type="email"
                value={email}
                name="email"
                onChange={handleChange}
              ></input>
              <input
                className="h-10 mt-4 px-3 border-2 border-gray-500 p-2 rounded-md focus:border-teal-500 focus:outline-none"
                placeholder="Password"
                type="password"
                value={password}
                name="password"
                onChange={handleChange}
              ></input>

              <p className="mt-5">
                Don't have an account? <Link to="/signup">Create account</Link>
              </p>

              <button
                className="h-10 bg-pink-600 mt-5 rounded-lg text-white"
                onClick={handleSubmit}
              >
                Log in
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default LoginPage
