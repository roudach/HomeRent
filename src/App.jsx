import { BrowserRouter, Routes, Route } from "react-router-dom"
import MainLayout from "./layout/MainLayout"
import HomePage from "./components/home/HomePage"
import NotFoundPage from "./components/ui/NotFoundPage"
import ProductPage from "./components/product/ProductPage"
import { useEffect, useState } from "react"
import api from "./api"
import ListPage from "./components/list/ListPage"
import LoginPage from "./components/user/LoginPage"

const App = () => {

  const [numListItems, setNumberListItems] = useState(0);
  const list_code = localStorage.getItem("list_code")
  
  useEffect(function(){
    if(list_code){
      api.get(`get_list_stat?list_code=${list_code}`)
      .then(res => {
        console.log(res.data)
        setNumberListItems(res.data.num_of_items)
      })

      .catch(err => {
        console.log(err.message)
      })
    }
    
  }, [])

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<MainLayout numListItems={numListItems} />}>
      <Route index element={<HomePage />} />
      <Route path="products/:slug" element={<ProductPage setNumberListItems={setNumberListItems} />} />
      <Route path="list" element={<ListPage setNumberListItems={setNumberListItems} />} />
      <Route path="login" element={<LoginPage/>}/>
      <Route path="*" element={<NotFoundPage />}/>
      
      </Route>
    </Routes>
    </BrowserRouter>
  )
}

export default App