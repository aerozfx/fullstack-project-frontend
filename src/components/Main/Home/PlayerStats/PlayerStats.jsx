import React from "react";

const PlayerStats = ({player}) => {
  return (
    <section className="player-stats">
      <article className="player-image">
        <img src={player.image} alt={`${player.firstName} ${player.surname}`}/>
      </article>
      <section className="stats">
        <article className="player-info">
          <p className="player-name">{player.firstName}</p>
          <p className="player-surname">{player.surname}</p>
        </article>
        <section className="player-performance">
          <article className="player-ranking">
            <p>Ranking: </p>
            <p className="stat">{player.ranking}</p>
          </article>
          <article className="player-puntos">
          <p>Puntos: </p>
            <p className="stat">{player.puntos}</p>
          </article>
          <article className="player-racha">
            <p>Racha: </p>
            <p className="stat">{player["victorias-consecutivas"]}</p>
          </article>
        </section>
        <section className="player-value">
          <article className="player-matches-won">
            <p>Victorias</p>
            <p className="stat">{player["partidos-ganados"]}</p>
          </article>
          <article className="player-percentage-won">
            <p>Efectividad</p>
            <p className="stat">{player["efectividad"]}</p>
          </article>
          <article className="player-last-tournament">
            <p>último torneo</p>
            <p className="stat">{player["efectividad"]}</p>
          </article>
        </section>
      </section>
    </section>
  );
};

export default PlayerStats;
