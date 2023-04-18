import React from 'react'
import Image from 'next/image'

// import LoaderSVG from '@/images/loader.svg'
// import LoaderSVG from '@/images/icons/metrics/svg/loader.svg'
import LoadingSVG from '@/images/loading.svg'

export const Loader = () => {
  return (
    <Image
      src={LoadingSVG}
      width={200}
      height={200}
      style={{
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        //   height: '100%',
        //   width: '100%',
        margin: 'auto',
        //   zIndex: 100000,
      }}
      alt="loader"
    ></Image>
  )
}
