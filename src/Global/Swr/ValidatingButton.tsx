import { GoSync } from 'react-icons/go'

export default function ValidatingButton({isValidating,mutate,url}:any) {
  return (
    <div className='flex justify-end mb-2 p-3'>
                 <button
                 disabled={isValidating}
                 onClick={()=>mutate(url,(prev:any)=>prev)}
                 className="flex items-center justify-center p-2 bg-white text-gray-400 rounded-full shadow-lg  focus:outline-none transition-all duration-300"
                  >
    
            {isValidating? <> <GoSync className="animate-spin text-primary" size={15} />
            <span className='ml-1'>Refreshing...</span></>:<> <GoSync className=" text-primary" size={15} />
            <span className='ml-1'>Refresh</span></>}
          
        </button>
            </div>
  )
}
