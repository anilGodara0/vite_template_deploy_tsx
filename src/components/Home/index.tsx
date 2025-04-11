/**
 * @author Anil Godara
 * @github anilgodara4239@gmail.com
 * @create date 2024-10-25 11:19:25
 * @modify date 2024-10-25 11:19:25
 * @desc Home Page
 */

import '../../App.css'
import { DataTable } from '../../libs/DataTable'
export default function Index() {
  const data=[
    {name:'Anil',email:'anil@yopmail.com',phoneNumber:"+9187237123",address:'USA'},
    {name:'Amit',email:'amit@yopmail.com',phoneNumber:"+912831823812831",address:'Here'},
    {name:'Shivam',email:'shivam@yopmail.com',phoneNumber:'+9128712371273',address:'Test'}
  ]
  return (
    <div>
      <div className='wrapins'>
        <DataTable
        defaultVisible={['name','email']}
        data={data}
        columns={[{key:'name',label:'Name'},{key:'email',label:'Email'},{key:'phoneNumber',label:'Phone Number'},{key:'address',label:'Address'}]}
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
