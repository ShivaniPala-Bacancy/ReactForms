import './App.css';
import {BrowserRouter, Route} from 'react-router-dom';
import Participate from './components/Participate/Participate'
import NavigationItems from './components/Navigation/NavigationItems/NavigationItems'
import Contestants from './containers/Contestants/Contestants';
import Layout  from './components/Layout/Layout';
function App() {
  return (
    <BrowserRouter>
      <Layout />
      
    </BrowserRouter>
  );
}

export default App;
