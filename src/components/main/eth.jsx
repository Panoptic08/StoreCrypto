import React, { useState } from 'react';
import { mnemonicToSeed, generateMnemonic } from "bip39";
import { ethers } from "ethers"; 
import 'unorm'; 

function Eth() {
  const [darkMode, setDarkMode] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(1);
  const [addresses, setAddresses] = useState([]);
  const [inputmn, setInputmn] = useState("");  // Change initial value to empty string
  const [mnemonic, setMnemonic] = useState("");
  const [publicKey, setPublicKey] = useState("");
  const [privateKey, setPrivateKey] = useState("");
  const [balance, getbalance] = useState(0.0);
  const [addwallet, setaddwallet] = useState([]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };
  
  let mn = inputmn.trim();  // Trim whitespace to ensure a clean input
  const update = async ()=>{
    setCurrentIndex(currentIndex+1);
    try {
      const wallet = ethers.Wallet.fromMnemonic(mn);
      setPublicKey(wallet.address);  
      setPrivateKey(wallet.privateKey); 
      setMnemonic(mn);  
      setAddresses([...addresses, wallet.address]); 

      const response = await fetch("https://eth-mainnet.g.alchemy.com/v2/MM4Ea2T15gm-OhvQNLjrNI8cqYoV_Wcr", {
        method: 'POST', 
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jsonrpc: "2.0",
          id: 1,
          method: "eth_getBalance",
          params: [wallet.address, "latest"]
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json(); 
      getbalance(result.result);  // Update balance
      
    } catch (error) {
      console.error("Error generating wallet: ", error);
      alert("Invalid Seed: ", error);
    }
  }

  const generate = async () => {
    
    if (mn === "") {
      mn = generateMnemonic();  // If input is empty, generate a new mnemonic
    }

    try {
      const wallet = ethers.Wallet.fromMnemonic(mn);
      setPublicKey(wallet.address);  
      setPrivateKey(wallet.privateKey); 
      setMnemonic(mn);  
      setAddresses([...addresses, wallet.address]); 
      setCurrentIndex(currentIndex);

      const response = await fetch("https://eth-mainnet.g.alchemy.com/v2/MM4Ea2T15gm-OhvQNLjrNI8cqYoV_Wcr", {
        method: 'POST', 
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jsonrpc: "2.0",
          id: 1,
          method: "eth_getBalance",
          params: [wallet.address, "latest"]
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json(); 
      getbalance(result.result);  // Update balance
      
    } catch (error) {
      console.error("Error generating wallet: ", error);
      alert("Invalid Seed: ", error);
    }
  };

  return (
    <>
      <div className={`min-h-screen ${darkMode ? 'bg-white text-black' : 'bg-black text-white'}`}>
        <div className='flex flex-row justify-between'>
          <div className='flex mt-5 ml-5 justify-between flex-row cursor-pointer'>
            <img src="https://cdn-icons-png.flaticon.com/512/2810/2810114.png" alt="" className='rounded-xl h-12 mr-5 cursor-pointer hover:scale-110'/>
            <h1 className='text-3xl mt-2'>Ethereum</h1>
          </div>
          <div className='mt-2 mr-10'>
            <button 
              type='button'
              role='switch'
              aria-checked={darkMode ? 'true' : 'false'}
              onClick={toggleDarkMode}
              className="p-2 m-4 rounded"
            >
              <span className="toggle-switch-slider relative inline-block w-10 h-4 bg-gray-300 rounded-full transition-transform duration-200 ease-in-out h-5">
                <span className="toggle-switch-thumb absolute h-4 w-4 rounded-full bg-white transform transition-transform duration-200 ease-in-out"></span>
              </span>
            </button>
          </div>
        </div>
        <div className='items-center align-center justify-center mt-10'>
          <h1 className='text-3xl text-center cursor-pointer'>Secret Recovery Phrase</h1>
          <input 
            type="text" 
            placeholder='Enter your seed phrase or leave it empty to generate one.' 
            className='items-center align-center flex justify-center py-4 px-10 rounded border-2 w-4/12 mt-10 text-black'
            style={{ marginLeft: "32%" }} 
            onChange={(e) => setInputmn(e.target.value)} // Update state with input value
          />
          <button 
            className='bg-gray-800 mt-10 py-4 px-8 hover:bg-gray-400 rounded-xl text-center text-xl flex align-center items-center justify-center transition duration-150 ease-in'
            style={{ marginLeft: "45%" }} 
            onClick={generate} // No need to pass inputmn directly here
          > 
            Generate
          </button>
        </div>

        {/* Mnemonic Display Section */}
        {mnemonic && (
          <div className='mt-10 flex justify-center align-center items-center'>
            <div className='bg-black border-2 border-gray-600 rounded-xl text-xl cursor-pointer hover:bg-gray-800 transition duration-150 ease-in'>
              <h1 className='text-center'>Seed Phrase</h1>
              <div className='grid grid-cols-3 gap-3 py-4 px-4'>
                {mnemonic.split(" ").map((word, index) => (
                  <div key={index} className='bg-gray-800 py-2 px-1 rounded'>
                    {word}
                  </div>
                ))}
              </div>
              <button className='text-center flex justify-center align-center items-center hover:scale-125' style={{ marginLeft: "87%" }}>
                <img src="https://thumbs.dreamstime.com/b/copy-icon-filled-website-design-mobile-app-development-text-editor-collection-isolated-black-background-155359454.jpg" alt="" className='h-8 rounded mb-5'/>
              </button>
            </div>
          </div>
        )}

        {/* Wallet and Balance Section */}
        {publicKey && (
          <div className='mt-10 '>
            <h1 className='h-10  text-center text-2xl mr-12'>Wallet {currentIndex}</h1>
            <div className='flex justify-center align-center items-center'>
              <div className='bg-gray-800 border-2 border-black px-4 py-4 mb-20 rounded-xl'>
                <h1 className='text-center text-2xl'>{balance} ETH</h1>
                <div className='flex justify-evenly mt-5'>
                  <button><img src="https://www.svgrepo.com/show/533310/send-alt-1.svg" alt="" className='h-10 bg-white rounded px-2 hover:scale-110 hover:bg-blue-400'/>send</button>
                </div>
                <div className='flex flex-col hover:bg-gray-600 transiton duration-150 ease-in cursor-pointer'>
                  <h1 className='text-center text-xl py-4 px-4'>Public<br />{publicKey}</h1>
                  <h1 className='text-center text-xl py-4 px-4'>Private<br />{privateKey}</h1>
                </div>
              </div>
              <div className='ml-10' onClick={update}>
                <img src="https://static.thenounproject.com/png/3521088-200.png" alt="" className='h-10 bg-white rounded-xl cursor-pointer hover:scale-110 hover:border-4 hover:border-blue-500'/> 
                <h1 className='mt-4'>Add Wallet</h1>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Eth;
// sea cart company romance bullet swear useless street found test point fold
// 0xfbf3089a368a403056dc92b67353899644d6c5bc4c7fb1c63dec59411c770582