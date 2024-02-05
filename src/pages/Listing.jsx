import React from 'react'
import {useState, useEffect} from 'react'
import {Link, useNavigate, useParams} from 'react-router-dom'
import {getDoc, doc} from 'firebase/firestore'
import {getAuth} from 'firebase/auth'
import {db} from '../firebase.config'

function Listing() {
    const [listing, setListing] = useState(null)
    const [shareLinkCopied, setShareLinkCopied] = useState(false)
    const [loading, setLoading] = useState(true)

    const navigate = useNavigate()
    const params = useParams()
    const auth = getAuth()

    useEffect(() => {
        const fetchListing = async() => {
            const docRef = doc(db, 'listings', params.listingId)
            const docSnap = await getDoc(docRef)
            
            if(docSnap.exists()){
                setListing(docSnap.data())
                console.log(docSnap.data())
                console.log("Alex")
                setLoading(false)
            }else{
                console.log("Matei")
            }
        }
        fetchListing()
    }, [window.location.pathname, params.listingId])
  
    return (<main>
    {listing ? (
      <div className="listingDetails">
        <p className="listingName">{listing.name}</p>
        <p>{listing.regularPrice} - $</p>
        <p className="listingLocation">{listing.location}</p>
        <p className="listingType">For {listing.type}</p>
      
        <ul className="listingDetailsList">
            <li>
                {listing.bedrooms > 1 ? `${listing.bedrooms} Bedrooms` : 'One Bedroom'}
            </li>

            <li>
                {listing.bathrooms >1 ? `${listing.bathrooms} Bathrooms` : 'One Bathroom'}
            </li>

            <li>{listing.parking && "Parking spot"}</li>
            <li>{listing.parking && "Furnished"}</li>
        </ul>
      <h1>Interesed?</h1>
      <h2>Call our agency for more details: +40 (725 123 521)</h2>
      </div>
    ) : (
      <p>Loading...</p>
    )}
    </main>)
}

export default Listing;
