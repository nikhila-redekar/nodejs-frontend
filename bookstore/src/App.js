import logo from './logo.svg';
import './App.css';
import NavBar from './Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Footer from './Footer';
import Features from './Features';
import BannerSection from './BannerSection';
import Books from './Books';
import Home from './Home';
import Authors from './Author';
import MainBooks from './MainBooks';
import BooksBannerSection from './BooksBanner';
import BooksPage from './Books';
import GenrePage from './GenrePage';
import Search from './Search';


function App() {
  return (
    <>
      <BrowserRouter> 
     <NavBar/>
     <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/MainBooks" element={<MainBooks />} />
        <Route path="/Author" element={<Authors />} />
        <Route path="/GenrePage" element={<GenrePage />} />
        {/* {<Route path="/Search" element={<Search />} /> */}

      </Routes>
      {/* {<Books/> */}
     {/* {<BannerSection/> */}
      {/* {<Features/> */}
     <Footer/>


  </BrowserRouter> 
    </>
  );
}
export default App;
