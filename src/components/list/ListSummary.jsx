import {Link} from "react-router-dom"

const ListSummary = () => {
  return (
    <div className='col-md-4 align-self-start'>
        <div className='card'>
            <div className='card-body'>
                <h5 className='card-title'>List Summary</h5>
                <hr />
                <div className='d-flex justify-content-between'>
                    <span>Subtotal:</span>
                    <span>400dt</span>
                </div>
                <div className='d-flex justify-content-between'>
                    <span>Tax:</span>
                    <span>40dt</span>
                </div>
                <div className='d-flex justify-content-between mb-3'>
                    <span>Total:</span>
                    <strong>440dt</strong>
                </div>
                <Link to="/checkout">
                <button 
                    className='btn btn-primary w-100'
                    style={{ backgroundColor: '#6050DC', borderColor: '#6050DC' }}
                >
                    Proceed to Checkout
                </button>
                </Link>
            </div>
        </div>
    </div>
  )
}

export default ListSummary