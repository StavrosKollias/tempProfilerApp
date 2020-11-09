import React from 'react';


import './App.scss';
import MainContainer from './Components/MainContainer/MainContainer';



const App: React.FC<{}> = (props) => {

  return (
    <div className="App">
     <MainContainer/>
    </div>
  );
}

export default App;