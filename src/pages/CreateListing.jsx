import {useState, useEffect, useRef} from 'react'
import {getAuth, onAuthStateChanged} from 'firebase/auth'
import {useNavigate} from 'react-router-dom'
import Spinner from '../components/Spinner'
import {getStorage, ref, uploadBytesResumable, getDownloadURL,} from 'firebase/storage'
import {db} from '../firebase.config'
import {v4 as uuidv4} from 'uuid'
import {toast} from 'react-toastify'
import {addDoc, collection, serverTimestamp} from 'firebase/firestore'

function CreateListing(){
    const [geolocationEnabled, setGeolocationEnabled] = useState(false)

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



    const onSubmit = async(e) => {
        e.preventDefault()
        
        console.log(formData)
        console.log('alex')
        let location = address
        const storeImage = async (image) => {
            return new Promise((resolve, reject) => {
                const storage = getStorage()
                const fileName = `${auth.currentUser.uid}-${image.name}-${uuidv4()}`

                const storageRef = ref(storage, 'images/' + fileName)

                const uploadTask = uploadBytesResumable(storageRef, image)
                
                uploadTask.on('state_changed', 
                        (snapshot) => {
                            // Observe state change events such as progress, pause, and resume
                            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                            console.log('Upload is ' + progress + '% done');
                            switch (snapshot.state) {
                            case 'paused':
                                console.log('Upload is paused');
                                break;
                            case 'running':
                                console.log('Upload is running');
                                break;
                            }
                        }, 
                        (error) => {
                            reject(error)
                        }, 
                        () => {
                            // Handle successful uploads on complete
                            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                            resolve(downloadURL);
                            });
                        }
                        );
                        
                        
            })
        }
        
        const imgUrls = await Promise.all(
            [...images].map((image) => storeImage(image))
        ).catch(() => {
            setLoading(false)
            toast.error('Images not uploaded')
            return
        })
        
        
        const formDataCopy = {
            ...formData,
            imgUrls,
            timestamp: serverTimestamp()
        }

        delete formDataCopy.images
        delete formDataCopy.address
        location && (formDataCopy.location = location)
        !formDataCopy.offer && delete formDataCopy.discountedPrice

        const docRef = await addDoc(collection(db, 'listings'), formDataCopy)
        setLoading(false)
        toast.success("Listing saved")
        navigate(`/category/${formDataCopy.type}/${docRef.id}`)
    }
    const onMutate = (e) => {
        let boolean = null

        if(e.target.value === 'true'){
            boolean = true
        }
        if(e.target.value === 'false'){
            boolean = false
        }

        if(e.target.files){
            setFormData((prevState) => ({
                ...prevState,
                images: e.target.files
            }))
        }
        if(!e.target.files){
            setFormData((prevState) => ({
                ...prevState,
                [e.target.id]: boolean ?? e.target.value,
            }))
        }
    }
    if(loading){
        return <Spinner />
    }



    return <div className='profile'>
        <header>
            <p className="pageHeader">Create a listing</p>
        </header>

        <main>
            <form onSubmit={onSubmit}>
                <label className="formLabel">Sell / Rent</label>
                <div className="formButtons">
                    <button type="button" className={type === 'sale' ? 'formButtonActive' : 'formButton'} id="type" value="sale" onClick={onMutate}>
                        Sell
                    </button>

                    <button type="rent" className={type === 'rent' ? 'formButtonActive' : 'formButton'} id="type" value="rent" onClick={onMutate}>
                        Rent
                    </button>
                </div>

                <input className="formInputName" type="text" id="name" value={name} onChange={onMutate} maxLength='32' minLength='10' required />
            
            <div>
            <div className='formRooms flex'>
                <div>
                    <label className="formLabel">Bedrooms</label>
                    <input 
                    className="formInputSmall" type="number" id="bedrooms" value={bedrooms} onChange={onMutate} min='1' max='50' required />
                </div>


            <div>
                <label className="formLabel">Bathrooms</label>
                <input className="formInputSmall" type="number" id="bathrooms" value={bathrooms} onChange={onMutate} min='1' max='50' required />
            </div>
            </div>
        </div>

        <label className='formLabel'>Parking spot</label>
        <div className='formButtons'>
            <button className={parking ? 'formButtonActive' : 'formButton'} type="button" id="parking" value={true} onClick={onMutate} min='1' max='50'>
                Yes
            </button>
            <button className={
                !parking && parking != null ? 'formButtonActive' : 'formButton'}
                type="button"
                id="parking"
                value={false}
                onClick={onMutate}>
                    No
                </button>
            
        </div>

        <label className="formLabel">Furnished</label>
        <div className="formButtons">
            <button className={furnished ? "formButtonActive" : "formButton"}
            type="button"
            id="furnished"
            value={true}
            onClick={onMutate}>
                Yes
            </button>

            <button className={!furnished && furnished !== null ? "formButtonActive" : "formButton"} type="button" id="furnished" value={false} onClick={onMutate}>
                No
            </button>
        </div>


        <label className="formLabel">Address</label>

        <textarea className="formInputAddress" type="text" id="address" value={address} onChange={onMutate} required/>

        <label className='formLabel'>Regular price</label>
        <div className="formPricediv">
            <input className="formInputSmall" type="number" id="regularPrice" value={regularPrice}
            onChange={onMutate} min='50' max='100000000' required />
            <p className="formPriceText">$</p>
        </div>

        <label className="formLabel">Images</label>
        <p className="imagesInfo">The first image will be the cover</p>
        <input className="formInputFile" type="file" id="images" onChange={onMutate} max='6' accept='.jpg,.png,.jpeg' multiple />
        <button type="submit" className="primaryButton createListingButton">Create Listing</button>
        </form>
        
        

        </main>
    </div>
}

export default CreateListing