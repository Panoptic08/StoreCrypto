import React, { useState } from 'react';
import nacl from 'tweetnacl';
import { generateMnemonic, mnemonicToSeedSync } from 'bip39';
import { derivePath } from 'ed25519-hd-key';
import { Keypair } from '@solana/web3.js';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

function Content() {
  // Declare publicKey as a string or null
  const [publicKey, setPublicKey] = useState<string | null>(null);
  const [pKey, setPKey] = useState<string | null>(null);
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [nemo, setMnemonic] = useState<string>("");
  const [showPrivateKey, setShowPrivateKey] = useState<boolean>(false);
  const [mnemonic, setmnemonic] = useState("");

  const generate = () => {
    if (!nemo) {
      setPublicKey(null); // Valid since publicKey can be null
      alert("Enter mnemonic seed phrase!");
      return;
    }
    try {
      
      const seed = mnemonicToSeedSync(nemo);
      const path = `m/44'/501'/0'/0'`; // Derivation path
      const derivedSeed = derivePath(path, seed.toString('hex')).key;
      const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
      const pbKey = Keypair.fromSecretKey(secret).publicKey.toBase58();
      const keypair = Keypair.fromSecretKey(secret);
      
      setPublicKey(pbKey); // Setting a string to publicKey

    } catch (error) {
      console.error('Error generating key:', error);
    }
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (darkMode) {
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
    }
  };

  const toggleShowPrivateKey = () => {
    setShowPrivateKey(!showPrivateKey);
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-white text-black' : 'bg-black text-white'}`}>
      <div className='flex flex-row justify-between'>
        <div className='flex mt-5 ml-5 justify-between flex-row'>
          <img
            src='https://cdn-icons-png.flaticon.com/512/2810/2810114.png'
            alt='Logo'
            className='rounded-xl h-12 mr-5 cursor-pointer hover:scale-110'
          />
          <h1 className='text-3xl mt-2'>Coinz</h1>
        </div>
        <div className='mt-2 mr-10'>
          <button
            type='button'
            role='switch'
            aria-checked={darkMode ? 'true' : 'false'}
            onClick={toggleDarkMode}
            className='p-2 m-4 rounded'
          >
            <span className='toggle-switch-slider relative inline-block w-10 h-4 bg-gray-300 rounded-full transition-transform duration-200 ease-in-out h-5'>
              <span className='toggle-switch-thumb absolute h-4 w-4 rounded-full bg-white transform transition-transform duration-200 ease-in-out'></span>
            </span>
          </button>
        </div>
      </div>

      <div className='contentBox text-center mt-12'>
        <h1 className='text-4xl md:text-5xl font-bold bounce text-balance glow-effect fade-in mb-20'>
          Secret Recovery Phase
        </h1>
        <div className='flex justify-evenly'>
          <input
            type='password'
            className='bg-gray-800 py-3 px-2 rounded w-6/12'
            placeholder='Enter Seed phrase or Generate new...'
            onChange={(e) => setMnemonic(e.target.value)}
          />
         <button  className='bg-gray-800 text-white text-2xl rounded-xl py-3 px-4 hover:scale-110 hover:bg-gray-400' onClick={async function() {
  const mn = await generateMnemonic();
  setmnemonic(mn)
}}>
            Create seed Phase
          </button>
          <button
            className='bg-gray-800 text-white text-2xl rounded-xl py-3 px-4 hover:scale-110 hover:bg-gray-400'
            onClick={generate}
          >
            Generate
          </button>
        </div>

        <div> 
          {mnemonic && (
            <div className='text-white'>
              {mnemonic}
            </div>
          )}
        </div>
      </div>
      {publicKey && (
        <>
          <div className='flex justify-evenly'>
            <div className='bg-gray-400 text-center w-6/12 rounded-l items-center align-center justify-center transition duration-300 ease-in-out  border-gray-400 cursor-pointer mt-20'>
              <h1 className='text-3xl bg-black py-3 px-4'>Wallet</h1>
              <h1 className='text-2xl py-3 px-4'>Public key <br />{publicKey}</h1>
              <div className='relative'>
                <h1 className='text-2xl py-3 px-4 bg-pink-800'>
                  Private Key <br />
                  {showPrivateKey ?showPrivateKey : '••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••'}
                </h1>
                <button
                  onClick={toggleShowPrivateKey}
                  className='absolute top-1/2 right-4 transform -translate-y-1/2'
                >
                  {showPrivateKey ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>
            <div className='mt-10 cursor-pointer'>
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4BobdMLXfDMvVEAVbrhQqfxX5s0tDp1pkLQ&s" alt="" className='h-12 hover:border-2 rounded-full hover:scale-110 border-red-600 transition duration-300 ease-in-out' /> Add Wallet
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Content;


// import React, { useState } from 'react';
// import nacl from 'tweetnacl';
// import { mnemonicToSeedSync } from 'bip39';
// import { derivePath } from 'ed25519-hd-key';
// import { Keypair } from '@solana/web3.js';
// import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Importing FontAwesome icons

// function Content() {
//   const [publicKey, setPublicKey] = useState<string | null>(null);
//   const [privateKey, setPrivateKey] = useState<string | null>(null);
//   const [darkMode, setDarkMode] = useState<boolean>(false);
//   const [nemo, setMnemonic] = useState<string>("");
//   const [showPrivateKey, setShowPrivateKey] = useState<boolean>(false);

//   const generate = () => {
//     if (!nemo) {
//       setPublicKey(null);
//       setPrivateKey(null); // Reset private key
//       alert("Enter mnemonic seed phrase!");
//       return;
//     }
//     try {
//       const seed = mnemonicToSeedSync(nemo);
//       const path = `m/44'/501'/0'/0'`; // Derivation path
//       const derivedSeed = derivePath(path, seed.toString('hex')).key; // Ensure it's hex string
//       const keyPair = nacl.sign.keyPair.fromSeed(new Uint8Array(derivedSeed));
//       const pbKey = Keypair.fromSecretKey(keyPair.secretKey).publicKey.toBase58();

//       setPublicKey(pbKey);
//       setPrivateKey(Buffer.from(keyPair.secretKey).toString('hex')); // Convert to hex string
//     } catch (error) {
//       console.error('Error generating key:', error);
//     }
//   };

//   const toggleDarkMode = () => {
//     setDarkMode(!darkMode);
//     if (darkMode) {
//       document.documentElement.classList.remove('dark');
//     } else {
//       document.documentElement.classList.add('dark');
//     }
//   };

//   const toggleShowPrivateKey = () => {
//     setShowPrivateKey(!showPrivateKey);
//   };

//   return (
//     <div className={`min-h-screen ${darkMode ? 'bg-white text-black' : 'bg-black text-white'}`}>
//       <div className='flex flex-row justify-between'>
//         <div className='flex mt-5 ml-5 justify-between flex-row'>
//           <img
//             src='https://cdn-icons-png.flaticon.com/512/2810/2810114.png'
//             alt='Logo'
//             className='rounded-xl h-12 mr-5 cursor-pointer hover:scale-110'
//           />
//           <h1 className='text-3xl mt-2'>Coinz</h1>
//         </div>
//         <div className='mt-2 mr-10'>
//           <button
//             type='button'
//             role='switch'
//             aria-checked={darkMode ? 'true' : 'false'}
//             onClick={toggleDarkMode}
//             className='p-2 m-4 rounded'
//           >
//             <span className='toggle-switch-slider relative inline-block w-10 h-4 bg-gray-300 rounded-full transition-transform duration-200 ease-in-out h-5'>
//               <span className='toggle-switch-thumb absolute h-4 w-4 rounded-full bg-white transform transition-transform duration-200 ease-in-out'></span>
//             </span>
//           </button>
//         </div>
//       </div>

//       <div className='contentBox text-center mt-12'>
//         <h1 className='text-4xl md:text-5xl font-bold bounce text-balance glow-effect fade-in mb-20'>
//           Secret Recovery Phrase
//         </h1>
//         <div className='flex justify-evenly'>
//           <input
//             type='password'
//             className='bg-gray-800 py-3 px-2 rounded w-6/12'
//             placeholder='Enter Seed phrase or Generate new...'
//             onChange={(e) => setMnemonic(e.target.value)}
//           />
//           <button
//             className='bg-gray-800 text-white text-2xl rounded-xl py-3 px-4 hover:scale-110 hover:bg-gray-400'
//             onClick={generate}
//           >
//             Generate
//           </button>
//         </div>
//       </div>
//       {publicKey && (
//         <>
//           <div className='flex justify-evenly'>
//             <div className='bg-gray-400 text-center w-6/12 rounded-l items-center align-center justify-center transition duration-300 ease-in-out border-gray-400 cursor-pointer mt-20'>
//               <h1 className='text-3xl bg-black py-3 px-4'>Wallet</h1>
//               <h1 className='text-2xl py-3 px-4'>Public key <br />{publicKey}</h1>
//               <div className='relative'>
//                 <h1 className='text-2xl py-3 px-4 bg-pink-800'>
//                   Private Key <br />
//                   {showPrivateKey ? privateKey : '••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••'}
//                 </h1>
//                 <button
//                   onClick={toggleShowPrivateKey}
//                   className='absolute top-1/2 right-4 transform -translate-y-1/2'
//                 >
//                   {showPrivateKey ? <FaEyeSlash /> : <FaEye />}
//                 </button>
//               </div>
//             </div>
//             <div className='mt-10 cursor-pointer'>
//               <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4BobdMLXfDMvVEAVbrhQqfxX5s0tDp1pkLQ&s" alt="" className='h-12 hover:border-2 rounded-full hover:scale-110 border-red-600 transition duration-300 ease-in-out' /> Add Wallet
//             </div>
//           </div>
//         </>
//       )}
//     </div>
//   );
// }

// export default Content;
