import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import React from 'react'
import Home from './Home'
import { PrivateElement, PrivateRoute } from '../hooks/PrivateRoute';
import {LogoutIcon} from '@heroicons/react/outline'
import TabMenu from '../components/TabMenu';
import LogActivity from './LogActivity';
import {logout} from '../features/authSlice'
import {useDispatch} from 'react-redux'
function Main() {
  const dispatch = useDispatch()
  return (
    <Router>
        <div className='flex justify-center w-full '>
        <PrivateElement>
          <TabMenu/>
        </PrivateElement>
        <PrivateElement>
          <div className='w-full h-16 flex justify-between border-b border-rose-200 fixed top-0 left-0 items-center bg-transparent backdrop-blur-md'>
            <p className='text-rose-800 text-2xl lg:text-3xl font-bold ml-5'>MRS</p>
            <div className='text-white h-fit bg-rose-500 px-2 py-1 rounded-md flex items-center space-x-1 mr-5 cursor-pointer'onClick={()=>dispatch(logout())}>
              <LogoutIcon className='w-6 h-6 cursor-pointer text-white' />
              <p>Logout</p>
            </div>
          </div>
        </PrivateElement>
        <div className='mt-20'>
          <Routes>
            <Route element={<PrivateRoute/>}>
              <Route path="/" element={<Home />} />
              <Route path="/logactivity" element={<LogActivity />} />
            </Route>
          </Routes>
        </div>
        </div>
    </Router>
  )
}

export default Main