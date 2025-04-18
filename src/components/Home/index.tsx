/**
 * @author Anil Godara
 * @github anilgodara4239@gmail.com
 * @create date 2024-10-25 11:19:25
 * @modify date 2024-10-25 11:19:25
 * @desc Home Page
 */

import axios from 'axios'

import '../../App.css'
import useSWR from 'swr'
import { DataTable } from '../../libs/DataTable'
import ValidatingButton from '../../Global/Swr/ValidatingButton'
import { useState } from 'react'
export default function Index() {
  const [Page,setPage]=useState(1);
  const url=`https://jsonplaceholder.typicode.com/posts?_page=${Page}&_limit=10`
const fetcher = () =>{
    return axios.get(url)
}

const { data, error, isLoading,isValidating,mutate }:any = useSWR(url, fetcher,  {keepPreviousData: true,
})

console.log({data,error,isLoading},"APi Response")
const loadMore=()=>{
setPage(prev=>prev+1)
}
  
  return (
    <div>
      <div className='wrapins'>
        <ValidatingButton isValidating={isValidating} mutate={mutate} url={url}/>
        <DataTable
        defaultVisible={['title','price']}
        loadMore={loadMore}
        hasMore={Page>3?false:true}
        data={data?.data||[]}
        isLoading={isLoading||isValidating}
        columns={[{key:'title',label:'Name'},{key:'price',label:'Price'},{key:'phoneNumber',label:'Phone Number'},{key:'address',label:'Address'}]}
        key={'Hi'}
        />
        <section className="px-2 py-32 bg-white md:px-0">
          <div className="container items-center max-w-6xl px-8 mx-auto xl:px-5">
            <div className="flex flex-wrap items-center sm:-mx-3">
              <div className="w-full md:w-1/2 md:px-3">
                <div className="w-full pb-6 space-y-6 sm:max-w-md lg:max-w-lg md:space-y-4 lg:space-y-8 xl:space-y-9 sm:pr-5 lg:pr-0 md:pb-0">
                  <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-4xl lg:text-5xl xl:text-6xl">
                    <span className="block xl:inline">Scan & Redeem Rewards </span>
                    <span className="block text-primary xl:inline">in Just a Few Seconds.</span>
                  </h1>
                  <p className="mx-auto text-base text-gray-500 sm:max-w-md lg:text-xl md:max-w-3xl">Scan the QR code now to instantly earn reward points and unlock exclusive offers. Don't miss out on your chance to redeem great deals with just a simple scan!</p>
                  <div className="relative flex flex-col sm:flex-row sm:space-x-4">
                  </div>
                </div>
              </div>
              <div className="w-full md:w-1/2">
                <div className="w-full h-auto overflow-hidden rounded-md shadow-xl sm:rounded-xl">
                  <img src="https://images.unsplash.com/photo-1498049860654-af1a5c566876?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80" />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
