import { useEffect, useState } from "react"
import api from "../../api"
import Header from "./Header"
import ListContainer from "./ListContainer"
import PlaceHolderContainer from "../ui/PlaceHolderContainer"
import Error from "../ui/Error"
import { randomValue } from "../../GenerateListCode"

const HomePage = () => {

  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")


  useEffect(function(){
    if(localStorage.getItem("list_code") === null){
      localStorage.setItem("list_code", randomValue)
    }
  }, [])


  useEffect(function(){
    setLoading(true)
    api.get("products")
    
    .then(res => {
      console.log(res.data)
      setProducts(res.data)
      setLoading(false)
      setError("")
    })

    .catch(err => {
      console.log(err.message)
      setLoading(false)
      setError(err.message)
    })

  }, [])

  
  return (
    <>
    <Header />
    {error && <Error error={error} />}
    {loading && <PlaceHolderContainer />}
    {loading || error !="" || <ListContainer products={products} /> }
    
    
    </>
  )
}

export default HomePage