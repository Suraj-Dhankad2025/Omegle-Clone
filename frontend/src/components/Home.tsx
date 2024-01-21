export const Home = ()=> {
    return (
        <div>
            <div className='rounded-md'>
                <div id="navhead" className='flex md:ml-[120px] md:mr-[103px]  text-center items-center h-[1px] justify-between mx-10  md:space-x-20 '>
                    <div className='flex justify-center items-center'>
                        <img src='video-chat.png' className='w-8'></img>
                        <h1 className='text-[24px]'><b>: LIVE</b>Chat</h1>
                    </div>
                    <div className=''>
                        <div className=' flex gap-[82px]   font-[400] h-[42px]  items-center' >
                            <div className=' flex list-none items-center'>
                                <img className='w-10' src='/anonymity.png'></img>
                                <li>Chat with random strangers!</li>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}