import { Container } from '@mui/material';
import './App.css';
import Header from './components/Header/Header';
import SimpleBottomNavigation from './components/SimpleBottomNavigation';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Movies from './pages/movies/Movies';
import Trending from './pages/trending/Trending';
import Series from './pages/series/Series';
import Search from './pages/search/Search';

function App() {
  return (
    <Router>
      
    <>
    <Header/>
    <div className="app">

     <Container>
    <Routes>
      <Route path='/' element={<Trending/>}/>
      <Route path='/movies' element={<Movies/>}/>
      <Route path='/series' element={<Series/>}/>
      <Route path='/search' element={<Search/>}/>
    </Routes>
     </Container>
      
    </div>
    <SimpleBottomNavigation/>
    </>
    
    </Router>
  );
}

export default App;
