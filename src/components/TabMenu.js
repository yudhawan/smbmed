import {PlusIcon,ClipboardIcon, RefreshIcon,} from '@heroicons/react/outline'
import {useNavigate, useLocation} from 'react-router-dom'
function TabMenu() {
    const navigate = useNavigate()
    const {pathname} = useLocation()
  return (
    <div className='fixed bottom-0 left-0 w-full h-16 py-3 px-20 lg:px-40 border-t border-gray-400 bg-white flex justify-between '>
        <div className='flex flex-col justify-center items-center cursor-pointer' onClick={()=>navigate('/')}>
            <PlusIcon className={`w-8 h-8 ${(pathname==="/")?'text-rose-800':'texrose-800'}`} />
            <p className={`text-sm ${(pathname==="/")?'text-rose-800':'texrose-800'} select-none`}>Add MRS</p>
        </div>
        <div className='flex flex-col justify-center items-center cursor-pointer' onClick={()=>navigate('/logactivity')}>
            <ClipboardIcon className={`w-5 h-5 ${(pathname==="/logactivity")?'text-rose-800':'texrose-800'}`} />
            <p className={`text-sm ${(pathname==="/logactivity")?'text-rose-800':'texrose-800'} select-none`}>Log Activity</p>
        </div>
    </div>
  )
}

export default TabMenu