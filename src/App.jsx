import { useEffect, useState } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { UserContext } from './context/userContext'
import './App.css'
import "../styles/styles.scss"
import Main from './components/Main'
import Header from "./components/Header"
import axios from 'axios'
import Cookies from 'js-cookie'
import { decodeToken } from 'react-jwt'

function App() {

  const [initialPlayersContext, setInitialPlayersContext] = useState([])
  const [isLogged, setIsLogged] = useState(false)
  const [userId, setUserId] = useState("")
  const [width, setWidth] = useState(window.innerWidth)
  const [userData, setUserData] = useState({
    user_currency: 0,
    name: ""
  })
  const [currency, setCurrency] = useState(0)

  useEffect(() => {
    (async () => {
      let res = await axios.get("/api/players")
      let {data} = res.data
      return data
    })().then(res => setInitialPlayersContext([...res]))
  }, [])
  
  useEffect(() => {
    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [width])

  useEffect(() => {
    let cookie = Cookies.get("access-token")
    if(cookie){
      let token = decodeToken(cookie)
      setIsLogged(token.isLogged)
    } else {
      setIsLogged(false)
    }
  }, [userId])

  useEffect(() => {
    (async () => {
      try {
        let res = await axios.get("/api/currency")
        let {message} = res.data
        setUserData({
          ...message
        })
      } catch (error) {
        console.log("No hay token")
      }
    })()
  }, [currency, userId])

  const handleResize = () => {
    setWidth(window.innerWidth)
  }
  const updateCurrency = (newCurrency) => setCurrency(newCurrency)
  const updatePlayers = (players) => setInitialPlayersContext([...players])
  const updateUserId = (user_id) => setUserId(user_id)
  const context = {
    initialPlayersContext,
    updatePlayers, 
    isLogged, 
    updateUserId, 
    width, 
    userData, 
    updateCurrency, 
    currency
  }
  return (
    <>
    <BrowserRouter>
    <UserContext.Provider value={context}>
      <Header />
      <Main />
    </UserContext.Provider>
    </BrowserRouter>
    </>)
}

export default App
