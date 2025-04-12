
import React from 'react'
import Navbar from '../../../components/User/Navbar'

import Hero from "../../../components/User/Sections/Hero"
import Portfolio from "../../../components/User/Sections/Portfolio"
import Service from "../../../components/User/Sections/Service"
import Contact from "../../../components/User/Sections/Contact"
import Footer from "../../../components/User/Footer"
function Home() {
    return (
        <div>
            <Navbar />
            <Hero />
            <Portfolio />
            <Service />
            <Contact />
            <Footer />
        </div>
    )
}

export default Home