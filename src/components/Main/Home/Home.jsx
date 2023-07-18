import { useContext, useEffect, useState, useRef } from "react";
import { motion, useInView, useAnimation } from "framer-motion";
import { UserContext } from "../../../context/userContext";
import PlayerStats from "./PlayerStats"
import { v4 } from "uuid";
const Home = () => {
  const {initialPlayersContext} = useContext(UserContext)
  const [randomPlayers, setRandomPlayers] = useState([])
  const ref = useRef(null)
  const isInView = useInView(ref, {once: false})
  const mainControls = useAnimation()

  useEffect(() => {
    if(isInView){ 
      mainControls.start("end")
    }
  }, [isInView])
  useEffect(() => {
    if (initialPlayersContext.length === 0) return
    const randomPlayers = []
    for(let i = 0; i < 5; i++){
      let randomNumber = Math.floor(Math.random() * initialPlayersContext.length)
      randomPlayers.push(initialPlayersContext[randomNumber])
    }
    setRandomPlayers([...randomPlayers])
  }, [initialPlayersContext])
  
  return (
    <section className="home">
      <h2 className="title">HOME</h2>
      <section className="home-main">
        <section className="home-text">
          <p>
          ¡Bienvenido a nuestra liga fantasy de pádel! 
          Si eres un apasionado del <b>pádel</b> y disfrutas de la estrategia y la competición, estás en el lugar adecuado. 
          Aquí podrás vivir la emoción de administrar tu propia pareja de pádel, eligiendo a la combinación ganadora y compitiendo contra otros jugadores para alcanzar la gloria!
          </p>
          <p>          
          Tendrás la oportunidad de crear tu equipo de ensueño seleccionando a tus jugadores favoritos entre una amplia gama de jugadores profesionales. Cada jugador tendrá sus propias estadísticas y puntuaciones basadas en su rendimiento real en torneos y partidos reales. Será tu habilidad para elegir a los jugadores adecuados y construir una estrategia sólida lo que marcará la diferencia.
          </p>
        </section>
      </section>
      <section className="home-players" ref={ref}>
      { 
        randomPlayers.length ? randomPlayers.map((ele, i) => 
          <motion.div
            className="wrapper-framer"  
            key={i}  
            variants={{
            start: {opacity: 0, x: -100},
            end: {opacity: 1, x: 0}
          }}
          initial="start"
          animate={mainControls}
          transition={{delay: 0.25, duration: 0.5}}
          >
           <article className="home-player" key={i}>
            <PlayerStats key={v4()}player={ele} />
          </article>
          </motion.div>)
        : null
      }
      </section>
    </section>
  );
};

export default Home;
