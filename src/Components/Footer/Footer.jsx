import React from 'react';

export default function Footer() {
    return (
        <footer className="bg-slate-200 dark:bg-slate-900 text-gray-800 dark:text-white pt-10">
            <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between gap-10">
                {/* Left Section - Logo & Description */}
                <div className="flex flex-col gap-4 max-w-sm">
                    <div className="flex items-center gap-2">
                        <img width="40" src="https://img.icons8.com/nolan/64/gallery.png" alt="Gallery logo" />
                        <h2 className="text-xl font-bold text-mainColor dark:text-white">Gallery</h2>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                        Discover and shop the best art pieces and visuals, curated just for you.
                    </p>
                </div>
                {/* Center Section - CTA */}
                <div className="flex flex-col gap-4 max-w-md w-full">
                    <h3 className="text-lg font-semibold text-mainColor dark:text-white">Get the Gallery App</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                        We’ll send you a link, open it on your phone to download the app.
                    </p>
                    <div className="flex gap-2">
                        <input type="email" id="footer-email"  name="footer-email" placeholder="Enter your email"
                            className="flex-1 p-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-slate-800 text-sm"/>
                        <button className="bg-mainColor text-white px-4 py-2 rounded hover:bg-opacity-90 transition">
                            Get Link
                        </button>
                    </div>
                </div>
            </div>
            {/* Bottom Line */}
            <div className="border-t mt-10 pt-4 pb-6 text-center text-sm text-gray-500 dark:text-gray-400">
                © 2025 Rowida Adel. All rights reserved.
            </div>
        </footer>
    );
}
