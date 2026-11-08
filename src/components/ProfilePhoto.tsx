import { useState, type ImgHTMLAttributes } from 'react'
import { PROFILE_IMAGE_SRC } from '@/data/profile'

const FALLBACK_IMAGE = '/avatar.svg'

type ProfilePhotoProps = Omit<ImgHTMLAttributes<HTMLImageElement>, 'src'>

export default function ProfilePhoto(props: ProfilePhotoProps) {
  const [usingFallback, setUsingFallback] = useState(false)

  return (
    <img
      {...props}
      src={usingFallback ? FALLBACK_IMAGE : PROFILE_IMAGE_SRC}
      alt={usingFallback ? 'Illustrated profile image placeholder for Fernan Rembulat' : props.alt}
      onError={() => setUsingFallback(true)}
    />
  )
}
