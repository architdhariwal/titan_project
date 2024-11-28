import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">
          {/* Collections Column */}
          <div>
            <h3 className="text-lg font-bold mb-4">COLLECTIONS</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-gray-300">Titan Automatics</a></li>
              <li><a href="#" className="hover:text-gray-300">Police Batman</a></li>
              <li><a href="#" className="hover:text-gray-300">Stellar</a></li>
              <li><a href="#" className="hover:text-gray-300">Raga Power Pearls</a></li>
              <li><a href="#" className="hover:text-gray-300">Nebula Jewels</a></li>
            </ul>
          </div>

          {/* Customer Service Column */}
          <div>
            <h3 className="text-lg font-bold mb-4">CUSTOMER SERVICE</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-gray-300">Payment Options</a></li>
              <li><a href="#" className="hover:text-gray-300">Track Order</a></li>
              <li><a href="#" className="hover:text-gray-300">Encircle Program</a></li>
              <li><a href="#" className="hover:text-gray-300">Find Titan World Stores</a></li>
            </ul>
          </div>

          {/* Contact Us Column */}
          <div>
            <h3 className="text-lg font-bold mb-4">CONTACT US</h3>
            <ul className="space-y-2">
              <li>1800-266-0123</li>
              <li><a href="mailto:customercare@titan.co.in">customercare@titan.co.in</a></li>
              <li><a href="#" className="hover:text-gray-300">Help & Contact</a></li>
              <li><a href="#" className="hover:text-gray-300">FAQs</a></li>
            </ul>
          </div>

          {/* Download App Section */}
          <div>
            <h3 className="text-lg font-bold mb-4">Download Titan World App</h3>
            <div className="flex flex-col gap-4">
              <a href="#" className="w-36">
                <img src="/app-store.png" alt="Download on App Store" className="w-full" />
              </a>
              <a href="#" className="w-36">
                <img src="/play-store.png" alt="Get it on Google Play" className="w-full" />
              </a>
            </div>
          </div>

          {/* Social Links Section */}
          <div>
            <h3 className="text-lg font-bold mb-4">Follow Us With</h3>
            <div className="flex gap-4">
              <a href="#" className="hover:opacity-80">
                <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
                  <i className="fab fa-facebook-f"></i>
                </div>
              </a>
              <a href="#" className="hover:opacity-80">
                <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
                  <i className="fab fa-instagram"></i>
                </div>
              </a>
              <a href="#" className="hover:opacity-80">
                <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
                  <i className="fab fa-twitter"></i>
                </div>
              </a>
              <a href="#" className="hover:opacity-80">
                <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
                  <i className="fab fa-youtube"></i>
                </div>
              </a>
            </div>
          </div>
        </div>

        {/* Chat Support */}
        <div className="text-center mb-8">
          <p className="mb-2">Want Help? Click Here To Chat With Us On</p>
          <p>Operating Hours: 10:00AM To 10:00PM Monday To Sunday</p>
        </div>

        {/* Payment Methods */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <img src="/visa.png" alt="Visa" className="h-6" />
          <img src="/mastercard.png" alt="Mastercard" className="h-6" />
          <img src="/paypal.png" alt="PayPal" className="h-6" />
          <img src="/amex.png" alt="American Express" className="h-6" />
        </div>

        {/* Copyright */}
        <div className="text-center text-sm border-t border-gray-700 pt-6">
          <p>© 2024 Titan Company Limited. All Rights Reserved. | Terms & Conditions | Privacy Policy | Wearable Privacy Policy</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;