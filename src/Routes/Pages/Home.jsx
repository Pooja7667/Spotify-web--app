import React from 'react'
import Download from '../HomeComps/Download'
import Banner from '../HomeComps/Banner'
import FeatureVideo from '../HomeComps/FeatureVideo'
import TopSongs from '../HomeComps/TopSongs'
import TopArtist from '../HomeComps/TopArtist'
import { Helmet } from 'react-helmet'

const Home = () => {
  return (
    <>
     <Helmet>
        <title>Home</title>
        <meta name="description" content="Home page includes top-songs top-artists radio-top shazam applemusic" />
      </Helmet>
    {/* <Download/> */}
    {/* <Banner/> */}
    <FeatureVideo/>
    <TopSongs/>
    <TopArtist/>
    </>
  )
}

export default Home