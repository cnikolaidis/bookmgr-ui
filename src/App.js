import { BrowserRouter, Routes, Route } from 'react-router-dom';
import EditAuthor from './pages/EditAuthor';
import Header from './components/Header';
import EditBook from './pages/EditBook';
import Authors from './pages/Authors';
import Books from './pages/Books';
import Home from './pages/Home';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Header/>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/books' element={<Books/>} />
          <Route path='/authors' element={<Authors/>} />
          <Route path='/editBook' element={<EditBook/>} />
          <Route path='/editBook/:isbn' element={<EditBook/>} />
          <Route path='/editAuthor' element={<EditAuthor/>} />
          <Route path='/editAuthor/:id' element={<EditAuthor/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
