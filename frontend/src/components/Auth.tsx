import { Landing } from './Landing'
import Home from './Home';

function Auth() {
  return (
    <div>
        <div className='h-[100vh] bg-[#040A20]   p-8'>
        <div className=' bg-gray-300   rounded-lg p-1'>
        <Home/>

        </div> 
        <div className='mt-[50px]'>
        <h1 className=' mt-[2rem] text-white text-center font-bold text-xl'>Welcome to Live chat! </h1>
        <p className='text-white text-center mt-1'>To get started please enter your name.</p>
        <div className='flex justify-center items-center mt-10'>
        <Landing/>
        </div>
        </div>
        </div>
    </div>
  )
}

export default Auth;