import React, { useState, useEffect } from 'react';
import Form from './Form';
import styled from 'styled-components';

const Container = styled.div`
  padding: 20px;
`;

const Main = styled.div`
  display: flex;
  border-bottom: 100px;
`;

const Box = styled.div`
flex-grow: 3;
border: 1px black;
  h1 {
    text-align: center;
  };
  p {
    text-align: center;
    font-size: 2rem;
  };
  ul {
    list-style-type: none
  };
  li {
    font-size: 1.3rem;
    margin-bottom: 10px;
    &:hover {
      color: blue;
      cursor: pointer;
    };
    &:visited {
      color: blue;
      cursor: pointer;
    }
  };
`;

const App = (props) => {

  const [regioni, setRegioni] = useState([]);
  const [citta, setCitta] = useState([]);
  const [popolazione, setPopolazione] = useState([]);

  useEffect(() => {
    fetch("api/regioni")
    .then(res => res.json())
    .then(data => {
      setRegioni(data)
    });
  })

  const handleRegione = regione => {
    fetch(`/api/regioni/${regione.toLowerCase()}`)
    .then(res => res.json())
    .then(data => {
      setPopolazione("");
      setCitta(data)
    });
  }

  const handleCitta = citta => {
    fetch(`/api/citta/${citta.toLowerCase()}`)
    .then(res => res.json())
    .then(data => {
      setPopolazione(data[data.length - 1])
    });
  }

  return (
    <Container>
      <Main>
        <Box>
          <h1>Regioni</h1>
          <ul>
            {regioni.map(regione => <li key={regione} onClick={() => handleRegione(regione)}>{regione}</li>)}
          </ul>
        </Box>
        <Box>
          <h1>Citta</h1>
          <ul>
            {citta.map(citta => <li key={citta} onClick={() => handleCitta(citta)}>{citta}</li>)}
          </ul>
        </Box>
        <Box>
        <h1>Popolazione</h1>
        <p><strong>{popolazione}</strong></p>
        </Box>
        </Main>
        <hr/>
        <h3>Aggiungi:</h3>
        <Form />
    </Container>
  );
}

export default App;
