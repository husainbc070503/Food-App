import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Components/Home';
import Index from './Components/Index';
import IndexCat from './Components/Category/IndexCat';
import { FoodContext } from './Contexts/FoodContext';
import AddItem from './Components/Items/AddItem';

function App() {
  return (
    <BrowserRouter>
      <FoodContext>
        <Routes>
          <Route path='/' element={<Home />}>
            <Route path='/' index element={<Index />} />
            <Route path='/category' element={<IndexCat />} />
            <Route path='/item' element={<AddItem />} />
          </Route>
        </Routes>
      </FoodContext>
    </BrowserRouter>
  );
}

export default App;
