import { MdFavoriteBorder  } from "react-icons/md";
import { BiSolidMessageSquareDetail } from "react-icons/bi";
import api, { BASE_URL } from "../../api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ListItem = ({item, listitems,setListItems,setNumberListItems}) => {
    const navigate = useNavigate();

    const handleIconClick = () => {
      navigate("/login"); // Navigation vers la page de login
    };
    const itemID = {item_id: item.id}

    function deleteListitem(){
        const confirmDelete = window.confirm("Are you want to delete this Home from favorite list?")
        console.log(itemID)

        if(confirmDelete){
            api.post("delete_listitem",itemID)
            .then(res => {
                console.log(res.data)
                toast.success("Home deleted successfully!")
                setListItems(listitems.fiter(listitem => listitem.id != item.id))
            })

            .catch(err => {
                console.log(err.message)
            })
        }
    }

  return (
    <div className='col-md-12'>
        <div
            className='cart-item d-flex align-items-center mb-3 p-3'
            style={{ backgroundColor: '#F8FAFC', borderRadius: '10px' }}
        >
            <img
                src={`${BASE_URL}${item.product.image}`}
                alt='Product Image'
                className='img-fluid'
                style={{width: '80px', height:'80px', objectFit: 'cover', borderRadius: '5px'}}
            />
            <div className='ms-3 flex-grow-1'>
                <h5 className='mb-1'>{item.product.name}</h5>
                <p className='mb-0 text-muted'>{`${item.price}DT`}</p>
            </div>
            <div className='d-flex align-items-center'>
                
                <button className='btn btn-secondary btn-md mx-2' onClick={handleIconClick}><BiSolidMessageSquareDetail/></button>
                <button className='btn btn-secondary btn-md' onClick={deleteListitem}><MdFavoriteBorder /></button>
            </div>
        </div>
    </div>
  )
}

export default ListItem