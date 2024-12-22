import { useEffect, useState } from "react"
import ListItem from "./ListItem"
import ListSummary from "./ListSummary"
import api from "../../api"
import { BsEmojiFrownFill } from "react-icons/bs";

const ListPage = ({setNumberListItems}) => {

  const list_code = localStorage.getItem("list_code")
  const [listitems, setListItems] = useState([])

  useEffect(function(){
    api.get(`get_list?list_code=${list_code}`)
     .then(res => {
          console.log(res.data)
          setListItems(res.data.items)
     })

     .catch(err => {
          console.log(err.message)
     })
  }, [])

  if(listitems.length < 1){
    return(
      <div className="alert alert-primary" role="alert">
        No Favorite Home <BsEmojiFrownFill />
      </div>
    )
  }

  return (
    <div className='container my-3 py-3' style={{height:"80vh", overflow:"scroll"}}>
        <h5 className='mb-4'>Renting Homes </h5>
        <div className='row'>
            <div className='col-md-8'>
                  {listitems.map(item => <ListItem key={item.id} item={item}
                  listitems={listitems}
                  setNumberListItems={setNumberListItems}
                  setListItems={setListItems}

                  />)}
                
                
            </div>

            
        </div>
    </div>
  )
}

export default ListPage