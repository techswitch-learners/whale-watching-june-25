import { useEffect, useState } from 'react';
import { Cloudinary } from '@cloudinary/url-gen';
import { AdvancedImage, responsive, placeholder } from '@cloudinary/react';

import CloudinaryUploadWidget from './components/CloudinaryUploadWidget';
import './App.scss';

  const App = () => {
  // Configuration
  const cloudName = 'hzxyensd5';
  const uploadPreset = 'aoh4fpwm';

  // State
  const [publicId, setPublicId] = useState<string|null>('');

  // Cloudinary configuration
  const cld = new Cloudinary({
    cloud: {
      cloudName,
    },
  });

  // Upload Widget Configuration
  const uwConfig = {
    cloudName,
    uploadPreset,

  };

  //function test(public_id: string,cld: { image: (arg0: string) => { (): any; new(): any; toURL: { (): any; new(): any; }; }; }) {

//  export function test(public_id: string) {

//   if (public_id) {
//   const imageUrl = cld.image(public_id).toURL();
//  // storeImageUrl(imageUrl);
  

// //const storeImageUrl = async (url: string) => {
  
//     //try {
//     const response = fetch('/api/store-image-url', {

//   //  const response = await fetch('/api/store-image-url', {
//        method: 'POST',
//        headers: {
//    'Content-Type': 'application/json',
//  },
//     body: JSON.stringify({ Public_Id: public_id, Image_URL: imageUrl }),
//   });
//   };
// }

//   if (!response.ok) {
//    throw new Error('Failed to store image URL');
//  }

// console.log('Image URL stored successfully');
//  } catch (error) {
//    console.error('Error storing image URL:', error);
// }
//  };
//};

// const App = () => {
//   // Configuration
//   const cloudName = 'hzxyensd5';
//   const uploadPreset = 'aoh4fpwm';

//   // State
//   const [publicId, setPublicId] = useState('');

//   // Cloudinary configuration
//   const cld = new Cloudinary({
//     cloud: {
//       cloudName,
//     },
//   });

//   // Upload Widget Configuration
//   const uwConfig = {
//     cloudName,
//     uploadPreset,

//   };


  
// useEffect(() => {
// if (publicId) {
//   const imageUrl = cld.image(publicId).toURL();
//   storeImageUrl(imageUrl);
// }
// }, [publicId]);






  return (
    
    <div className="App">

      <CloudinaryUploadWidget uwConfig={uwConfig} setPublicId={setPublicId} />
    </div>
  );

};

export default App;
