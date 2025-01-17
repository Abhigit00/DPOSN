import { useState, React, useContext } from 'react'
import Navbar from '../components/Navbar/Navbar'

import { useLocation, useNavigate } from 'react-router-dom'
import EthContext from '../contexts/EthContext'
import NoProfile from '../assets/images/userprofile.png'
import Cookies from 'js-cookie'
import Web3 from 'web3'
import { BiCamera } from 'react-icons/bi'
import { pinFileToIPFS } from '../ipfs-utils/PinataUtils'

const date = new Date()

const months = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
]

const days = []
const years = []

for (let i = 1; i <= 31; i++) {
  days.push(i)
}

for (let i = date.getFullYear(); i >= 1905; i--) {
  years.push(i)
}

function ProfileCreation() {
  const location = useLocation()

  const {
    state: { contract, accounts },
  } = useContext(EthContext)

  const navigate = useNavigate()

  const { userName } = location.state

  const [file, setFile] = useState(null)

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    day: date.getDate(),
    month: months[date.getMonth()],
    year: date.getFullYear(),
    status: '',
  })

  async function handleSubmit(e) {
    e.preventDefault()
    let imageCID = ''
    if (file) {
      imageCID = await pinFileToIPFS(file)
    }
    await registerUser(imageCID, userName, form)
    Cookies.set('user', accounts[0])
    Cookies.set('loggedIn', true)
    navigate('/')
  }

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })
  }

  // useEffect(() => {
  //   async function loadContract() {
  //     const web3 = new Web3(window.ethereum)
  //   }
  //   loadContract()
  // }, [])

  async function registerUser(imageCID, userName, form) {
    let dateOfBirth = `${form.day}/${form.month}/${form.year}`

    // console.log(
    //   account,
    //   email,
    //   password,
    //   form.firstName,
    //   form.lastName,
    //   dateOfBirth,
    //   form.gender
    // )

    await contract.methods
      .registerUser(
        accounts[0],
        imageCID,
        Web3.utils.padRight(Web3.utils.asciiToHex(userName), 64),
        Web3.utils.padRight(Web3.utils.asciiToHex(form.firstName), 64),
        Web3.utils.padRight(Web3.utils.asciiToHex(form.lastName), 64),
        Web3.utils.padRight(Web3.utils.asciiToHex(dateOfBirth), 64),
        Web3.utils.padRight(Web3.utils.asciiToHex(form.status), 64)
      )
      .send({ from: accounts[0] })
  }

  return (
    <>
      <div className="w-screen h-screen bg-gradient-to-r to-red-300 from-slate-300 overflow-hidden">
        <Navbar />
        <div className="grid place-content-center h-full">
          <div className="bg-white w-[20rem] h-[30rem]  sm:w-[30rem] sm:h-[36rem]  flex flex-col items-center  place-content-center rounded-lg shadow-xl">
            <h1 className="mt-4 text-xl">Profile Details</h1>
            <label
              htmlFor="imgUpload"
              className="flex items-center gap-1 text-base text-ascent-2 hover:text-ascent-1 cursor-pointer"
            >
              <input
                type="file"
                onChange={(e) => {
                  setFile(e.target.files[0])
                  console.log(e.target.files[0])
                }}
                className="hidden"
                id="imgUpload"
                data-max-size="5120"
                accept=".jpg, .png, .jpeg"
              />
              <span className="rela">
                <div className="w-20 h-20 mt-3 rounded-full border-2 bg-slate-400 flex justify-center relative ">
                  {/* <BiPlusCircle /> */}
                  <div className="overflow-hidden h-full w-full rounded-full border-2">
                    <img
                      className="h-full w-full object-cover object-center"
                      src={file ? URL.createObjectURL(file) : NoProfile}
                    ></img>
                  </div>

                  <div className="absolute bottom-0 right-0">
                    <BiCamera size={25} />
                  </div>
                </div>
              </span>
            </label>
            <form className="flex flex-col w-80 h-80 mt-8 ">
              <input
                className="h-10 px-3 border-2 border-gray-500 p-2 rounded-md focus:border-teal-500 focus:outline-none"
                placeholder="First Name"
                type="firstName"
                value={form.firstName}
                name="firstName"
                onChange={handleChange}
              ></input>
              <input
                className="h-10 mt-4 px-3 border-2 border-gray-500 p-2 rounded-md focus:border-teal-500 focus:outline-none"
                placeholder="Last Name"
                type="lastName"
                value={form.lastName}
                name="lastName"
                onChange={handleChange}
              ></input>
              <input
                className="h-10 mt-4 px-3 border-2 border-gray-500 p-2 rounded-md focus:border-teal-500 focus:outline-none"
                placeholder="Status"
                type="status"
                value={form.status}
                name="status"
                onChange={handleChange}
              ></input>
              <p className="mt-2 text-xs text-gray-500 h-3px">Date of birth</p>
              <div className="flex flex-row mt-1">
                <select
                  className="w-1/4 mr-1 h-10 text-sm border-2 border-gray-500 p-2 rounded-md focus:border-teal-500 focus:outline-none"
                  name="day"
                  value={form.day}
                  onChange={handleChange}
                >
                  {days.map((val) => (
                    <option key={val}>{val}</option>
                  ))}
                </select>
                <select
                  className="w-1/4 mr-1 h-10 text-sm border-2 border-gray-500 p-2 rounded-md focus:border-teal-500 focus:outline-none"
                  name="month"
                  value={form.month}
                  onChange={handleChange}
                >
                  {months.map((val) => (
                    <option key={val}>{val}</option>
                  ))}
                </select>
                <select
                  className="w-1/2 h-10 text-sm  border-2 border-gray-500 p-2 rounded-md focus:border-teal-500 focus:outline-none"
                  name="year"
                  value={form.year}
                  onChange={handleChange}
                >
                  {years.map((val) => (
                    <option key={val}>{val}</option>
                  ))}
                </select>
              </div>
              <button
                className="h-10 bg-pink-600 mt-5 rounded-lg text-white"
                onClick={handleSubmit}
              >
                Created Profile
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default ProfileCreation
