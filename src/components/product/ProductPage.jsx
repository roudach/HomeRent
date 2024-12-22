import { useParams } from "react-router-dom"
import ProductPagePlaceHolder from "./ProductPagePlaceHolder"
import RelatedProducts from "./RelatedProducts"
import { useEffect, useState } from "react"
import api from "../../api"
import { BASE_URL } from "../../api"
import { toast } from "react-toastify"


const ProductPage = ({setNumberListItems}) => {

    const { slug } = useParams()
    const [product, setProduct] = useState({})
    const [similarProducts, setSimilarProducts] = useState([])
    const [loading, setLoading] = useState(false)
    const [inList, setInList] = useState(false)
    const list_code = localStorage.getItem("list_code")


    useEffect(function(){
        if(product.id){
            api.get(`product_in_list?list_code=${list_code}&product_id=${product.id}`)
            .then(res => {
                console.log(res.data)
                setInList(res.data.product_in_list)
            })

            .catch(err => {
                console.log(err.message)
            })

        }
        
    }, [list_code, product.id])


    const newItem = {list_code: list_code , product_id : product.id}

    function add_item(){
        api.post("add_item/", newItem)
        .then(res => {
            console.log(res.data)
            setInList(true)
            toast.success(`${product.name} Added to List!`)
            setNumberListItems(curr => curr + 1)
        })

        .catch(err => {
            console.log(err.message)
        })
    }

    useEffect(function(){
        setLoading(true)
        api.get(`product_detail/${slug}`)
        .then(res => {
            console.log(res.data)
            setProduct(res.data)
            setSimilarProducts(res.data.similar_products)
            setLoading(false)
        })
        .catch(err => {
            console.log(err.message)
            setLoading(false)
        })
    }, [slug])

    if(loading){
        return <ProductPagePlaceHolder />
    }

  return (
    <div>
        
        <section className='py-3'>
            <div className='container px-4 px-lg-5 my-5'>
                <div className='row gx-4 gx-lg-5 mx-3 align-items-center'>
                    <div className='col-md-6'>
                        <img 
                            className='card-img-top mb-5 mb-md-0'
                            src={`${BASE_URL}${product.image}`} 
                            alt="..."
                        />
                    </div>
                    <div className='col-md-6'>
                        <div className='small mb-1'>SKU: BST-498</div>
                        <h1 className='display-5 fw-bolder'>{product.name}</h1>
                        <div className='fs-5 mb-5'>
                            <span>{`${product.price}DT`}</span>
                        </div>
                        <p className='lead'>
                            {product.description}
                        </p>
                        <div className='d-flex'>
                            <button
                                className='btn btn-outline-dark flex-shrink-0'
                                type='button'
                                onClick={add_item}
                                disabled={inList}
                            >
                                <i className='bi-cart-fill me-1'></i>
                                {inList ? "Home added to list" : "Add to list"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        
        <RelatedProducts products={similarProducts}/>
    </div>
  )
}

export default ProductPage