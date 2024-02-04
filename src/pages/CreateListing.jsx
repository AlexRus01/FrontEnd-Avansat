import {useState, useEffect, useRef} from 'react'
import {getAuth, onAuthStateChanged} from 'firebase/auth'
import {useNavigate} from 'react-router-dom'
import Spinner from '../components/Spinner'

function CreateListing(){
    const [geolocationEnabled, setGeolocationEnabled] = useState(true)

    const[loading, setLoading] = useState(false)

    const [formData, setFormData] = useState({
        type: 'rent',
        name: '',
        bedrooms: 1,
        bathrooms: 1,
        parking: false,
        furnished: false,
        address: '',
        offer: false,
        regularPrice: 0,
        discountedPrice: 0,
        images: {},
        latitude: 0,
        longitude: 0
    })
    
    const {type,name,bedrooms,bathrooms,parking,furnished,address,offer,regularPrice,discountedPrice,images,latitude, longitude} = formData

    const auth = getAuth()
    const navigate = useNavigate()
    const isMounted = useRef(true)

    useEffect(() => {
        if(isMounted){
            onAuthStateChanged(auth, (user) => {  if(user){
                setFormData({...formData, useRef: user.uid})
            }else{
                navigate('/sign-in')
            }
        })
        }

        return () => {
            isMounted.current = false
        }


    }, [isMounted])

    const onSubmit = e => {
        e.preventDefault()
    }

    if(loading){
        return <Spinner />
    }
    return <div className='profile'>
        <header>
            <p className="pageHeader">Create a listing</p>
        </header>

        <main>
            <form onSubmit={onSubmit}></form>
        </main>
    </div>
}

export default CreateListing