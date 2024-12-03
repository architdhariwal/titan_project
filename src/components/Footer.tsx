import React from 'react';
import { Facebook, Instagram, Twitter, Youtube } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">
          <div>
            <h3 className="text-lg font-bold mb-4">CUSTOMER SERVICE</h3>
            <ul className="space-y-2">
              <li><a href="https://www.titan.co.in/content/payment-options.html?lang=en_IN" className="hover:text-gray-300">Payment Options</a></li>
              <li><div className="hover:text-gray-300">Track Order</div></li>
              <li><a href="https://www.titanencircle.com/" className="hover:text-gray-300">Encircle Program</a></li>
              <li><div  className="hover:text-gray-300">Find Titan World Stores</div></li>
            </ul>
          </div>


          <div>
            <h3 className="text-lg font-bold mb-4">CONTACT US</h3>
            <ul className="space-y-2">
              <li>1800-266-0123</li>
              <li><a href="mailto:customercare@titan.co.in">customercare@titan.co.in</a></li>
              <li><a href="https://www.titan.co.in/help-faqs.html?lang=en_IN" className="hover:text-gray-300">Help & Contact</a></li>
              <li><a href="https://www.titan.co.in/faq.html?lang=en_IN" className="hover:text-gray-300">FAQs</a></li>
            </ul>
          </div>

    
          <div>
            <h3 className="text-lg font-bold mb-4">Download Titan World App</h3>
            <div className="flex flex-col gap-4">
              <div className="w-36">
                <img src="https://www.titan.co.in/on/demandware.static/-/Library-Sites-TitanSharedLibrary/default/dw435df752/images/footer/Group%2015609.png" alt="Download on App Store" className="w-full" />
              </div>
              <div  className="w-36">
                <img src="https://www.titan.co.in/on/demandware.static/-/Library-Sites-TitanSharedLibrary/default/dwac46a6ed/images/footer/Group%2015610@2x.png" alt="Get it on Google Play" className="w-full" />
              </div>
            </div>
          </div>

      
          <div>
            <h3 className="text-lg font-bold mb-4">Follow Us With</h3>
            <div className="flex gap-4">
              
                <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
                  <Facebook className="text-white" size={18} />
                </div>
             
              
                <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
                  <Instagram className="text-white" size={18} />
                </div>
             
             
                <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
                  <Twitter className="text-white" size={18} />
                </div>
             
              
                <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
                  <Youtube className="text-white" size={18} />
                </div>
             
            </div>
          </div>
        </div>

  
        <div className="text-center mb-8">
          <p className="mb-2">Want Help? Click Here To Chat With Us On</p>
          <p>Operating Hours: 10:00AM To 10:00PM Monday To Sunday</p>
        </div>

  
        <div className="text-center text-sm border-t border-gray-700 pt-6">
          <p>© 2024 Titan Company Limited. All Rights Reserved. | Terms & Conditions | Privacy Policy | Wearable Privacy Policy</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;