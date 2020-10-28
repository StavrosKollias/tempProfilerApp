import React from 'react';


import './App.scss';
import MainContainerComponent from './Components/MainContainerComponent/MainContainerComponent';



const App: React.FC<{}> = (props) => {

  return (
    <div className="App">
     <MainContainerComponent/>
    </div>
  );
}

export default App;