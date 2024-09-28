import React , { useState }  from 'react'
import { Link } from 'react-router-dom';


function Header() {
    const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (darkMode) {
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
    }
  };

  
    

    return (
        <>
<div className={`min-h-screen ${darkMode ? 'bg-white text-black' : 'bg-black text-white'}`}>
<div className='flex flex-row justify-between'>
<div className='flex mt-5 ml-5 justify-between flex-row'>
      <img src="https://cdn-icons-png.flaticon.com/512/2810/2810114.png" alt="" className='rounded-xl h-12 mr-5  cursor-pointer hover:scale-110'/>
      <h1 className='text-3xl  mt-2'>Coinz</h1>
      </div>


      <div className='mt-2 mr-10'>
      <button 
       type='button'
       role='switch'
       aria-checked={darkMode ? 'true' : 'false'}
        onClick={toggleDarkMode}
        className="p-2 m-4  rounded"
      >
       
       <span className="toggle-switch-slider relative inline-block w-10 h-4 bg-gray-300 rounded-full transition-transform duration-200 ease-in-out h-5">
          <span className="toggle-switch-thumb absolute h-4 w-4 rounded-full bg-white transform transition-transform duration-200 ease-in-out"></span>
        </span>
        {/* {darkMode ? 'Switch to Dark Mode' : 'Switch to Light Mode'} */}
      </button>
      </div>



        </div>

        {/* <div className=''>
            <h1 className='text-white text-4xl text-center mt-20'>Coinz here to serve you, create, <br /> store and trade your crypto</h1>
        </div> */}

        <div className="contentBox text-center mt-12">
          <h1 className="text-4xl md:text-5xl font-bold bounce text-balance glow-effect fade-in">
            Coinz: Future of Trading
          </h1>
          <p className="text-lg md:text-2xl mt-6 text-balance text-gray-300 fade-in delay-2">
          Coinz here to serve you, create, store and trade your crypto
          </p>
        </div>
      


        <div className='align-center items-center flex flex-row justify-center justify-evenly mt-64'>
          <Link to="/content">
            <button className='bg-gray-800 text-white text-2xl rounded-xl py-3 px-4 hover:scale-110 hover:bg-gray-600 '>Solana</button>
          </Link>
          
            <button className='bg-gray-400 text-black text-2xl rounded-xl py-3  px-4 hover:scale-110 hover:bg-gray-800'>Etherium</button>
        </div>



    </div>


        

        </>
    )
}

export default Header
