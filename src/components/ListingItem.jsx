import React from 'react'
import {Link} from 'react-router-dom'
import {ReactComponent as DeleteIcon} from '../assets/svg/deleteIcon.svg'
import bedIcon from '../assets/svg/bedIcon.svg'
import bathIcon from '../assets/svg/bathtubIcon.svg'

export default function ListingItem({listing, id}) {
  return (
    <li className='categoryListing'>
        <Link to={`/category/${listing.type}/${id}`} className='categoryListingLink'>
            <img src={listing.imageUrls[1]} alt={listing.name} className='categoryListingImg' />
        
        <div className="categoryListingDetails">
            <p className="categoryListingLocation">
                {listing.location}
            </p>
            <p className='categoryListingName'>{listing.name}</p>
                
            <p className="categoryListingPrice">
            ${listing.offer ? listing.discountedPrice : listing.regularPrice}
                {listing.type === 'rent' && ' / Month'}
            </p>

        </div>
        </Link>
        
        {
          //onDelete && ( <DeleteIcon className='removeIcon' fill='rgb(231,76,60)' onClick={() => onDelete(listing.id, listing.name)} />)}
        }
    </li>
  )
}
