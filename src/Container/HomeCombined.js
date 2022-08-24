import React from 'react'
import { Footer } from '../Components/Footer';
import { RegisterEmail } from '../Components/RegisterEmail';
import { SearchForm } from '../Components/SearchForm';
import { RoomComponent } from '../Components/RoomComponent';
import { AboutComponent } from '../Components/AboutComponent';
import { ContactComponent } from '../Components/ContactComponent';
export const HomeCombined = () => {
    return (
        <>
        <div className="background" >
        <div className="form">
        <SearchForm />
        </div>
    </div>
    <RoomComponent/>
    <AboutComponent/>
    <RegisterEmail />
    <ContactComponent/>
    <Footer />
    </>
    )
}
