import React from 'react'
import {Link} from 'react-router-dom'
import {ReactComponent as DeleteIcon} from '../assets/svg/deleteIcon.svg'
import bedIcon from '../assets/svg/bedIcon.svg'
import bathIcon from '../assets/svg/bathtubIcon.svg'

export default function ListingItem({listing, id}) {
  return (
<li className='categoryListing' style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
  <Link to={`/category/${listing.type}/${id}`} className='categoryListingLink'>
    <img
      src={listing.imgUrls[0]}
      alt={listing.name}
      className='categoryListingImg'
    />
    <div className="categoryListingDetails" style={{ textAlign: 'center' }}>
      <p className="categoryListingLocation">
        {listing.location}
      </p>
      <p className='categoryListingName'>{listing.name}</p>
      <p className="categoryListingPrice" style={{ textAlign: 'center', margin: '0 auto' }}>
        ${listing.regularPrice}
        {listing.type === 'rent' && ' / Month'}
      </p>
    </div>
  </Link>
  {/* onDelete && (<DeleteIcon className='removeIcon' fill='rgb(231,76,60)' onClick={() => onDelete(listing.id, listing.name)} />)} */}
</li>

  )
}
