import React from 'react'
import {useState, useEffect} from 'react'
import {Link, useNavigate, useParams} from 'react-router-dom'
import {getDoc, doc} from 'firebase/firestore'
import {getAuth} from 'firebase/auth'
import {db} from '../firebase.config'
import SwiperCore, {Navigation, Pagination, ScrollBar, A11y} from 'swiper'
import {Swiper, SwiperSlide} from 'swiper/react'
import 'swiper/swiper-bundle.css'


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
  
    return (    <main style={{ display: 'flex', justifyContent: 'center' }}>
    {listing ? (
      <div className="listingDetails">
        <img
          src={listing.imgUrls[0]}
          alt={listing.name}
          className='categoryListingImg'
          style={{ width: '100%' }}
        />

        <img
          src={listing.imgUrls[1]}
          alt={listing.name}
          className='categoryListingImg'
          style={{ width: '100%' }}
        />

        <p className="listingName" style={{ fontSize: '2rem' }}>{listing.name}</p>
        <p style={{ fontSize: '1.5rem' }}>{listing.regularPrice} - $</p>
        <p className="listingLocation" style={{ fontSize: '1.5rem' }}>{listing.location}</p>
        <p className="listingType" style={{ fontSize: '1.5rem' }}>For {listing.type}</p>
      
        <ul className="listingDetailsList">
          <li style={{ fontSize: '1.5rem' }}>
            {listing.bedrooms > 1 ? `${listing.bedrooms} Bedrooms` : 'One Bedroom'}
          </li>
          <li style={{ fontSize: '1.5rem' }}>
            {listing.bathrooms > 1 ? `${listing.bathrooms} Bathrooms` : 'One Bathroom'}
          </li>
          <li style={{ fontSize: '1.5rem' }}>{listing.parking && "Parking spot"}</li>
          <li style={{ fontSize: '1.5rem' }}>{listing.parking && "Furnished"}</li>
        </ul>
        <h1 style={{ fontSize: '2.5rem', fontFamily: 'cursive', color: 'blue'}}>Interested?</h1>
        <h2 style={{ fontSize: '2rem', fontFamily:'cursive', color: 'red'}}>Call our agency for more details: +40 (725 123 521)</h2>
      </div>
    ) : (
      <p style={{ fontSize: '2rem' }}>Loading...</p>
    )}
  </main>)
}

export default Listing;
