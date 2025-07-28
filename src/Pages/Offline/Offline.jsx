import React, { useEffect } from 'react';
import offline from '../../assets/images/offline.png';
import { Helmet } from 'react-helmet';

export default function Offline() {
    useEffect(() => {
        document.title = "Offline";
    }, []);

    return (
        <>
            <Helmet>
                <meta name="description" content="It looks like you're offline. Please check your internet connection to continue shopping on Fresh Cart." />
            </Helmet>
            <div className="container mx-auto flex flex-col items-center justify-center py-12">
                <img loading='lazy' src={offline} alt="offline" className='w-100 h-100'  />
                <h3 className=" text-center font-extrabold my-3 text-mainColor text-4xl">You are offline!</h3>
                <p className={` text-muted  mb-3 text-center dark:text-white `}>
                    Please check your internet connection
                </p>
            </div>
        </>
    );
}
