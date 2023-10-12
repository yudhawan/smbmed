import { useEffect, useState, useRef } from 'react'
import {TrashIcon,SearchIcon, ChevronLeftIcon} from '@heroicons/react/outline'
import {useDispatch, useSelector} from 'react-redux'
import {getData,deleteData} from '../features/dataSlice'
import host from '../features/host'
function LogActivity() {
  const dispatch = useDispatch()
  const {mrs,isLoading} = useSelector(state=>state.data)
  const [search,setsearch] = useState('')
  const [selected,setselected] = useState('')
  useEffect(()=>{
    dispatch(getData())
  },[])
  return (
    <div  className='flex flex-col space-y-1 lg:space-y-3 w-full h-[80vh] overflow-auto py-2 px-4 lg:px-14 lg:py-4 -mt-4'>
      {selected?
      <>
      <div className="flex self-start items-center space-x-1 cursor-pointer" onClick={()=> setselected(null)}>
        <ChevronLeftIcon className="w-5 h-5 text-rose-500" />
        <p className="text-rose-500">Back</p>
      </div>
        {
        mrs.filter(val => val.id==parseInt(selected)).map(
        (data)=>{
          var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
          var today  = new Date(data.waktuKontrolUlang);  
          return(<>
        <div className='flex-col space-y-1'>
          <p className='text-gray-500 text-sm'>Nama Personil</p>
          <div className='py-1 px-2 border border-gray-400 rounded-md w-80'>
            <input type='text' disabled placeholder='Nama Personil' className='outline-none w-full' readOnly value={data.nama}/>
          </div>
        </div>
        <div className='flex-col space-y-1'>
          <p className='text-gray-500 text-sm'>Riwayat Penyakit</p>
          <div className='w-80 h-60 p-2 rounded-md border border-gray-400'>
              <textarea type="text" placeholder='Riwayat Penyakit' className='outline-none w-full h-full' readOnly value={data.riwayatPenyakit} />
          </div>
        </div>
        <div className='flex-col space-y-1'>
          <p className='text-gray-500 text-sm'>Tensi</p>
          <div className='w-80 p-2 rounded-md border border-gray-400'>
              <input type="text" placeholder='Tensi' className='outline-none w-full' readOnly value={data.tensi} />
          </div>
        </div>
        <div className='flex-col space-y-1'>
          <p className='text-gray-500 text-sm'>Nadi</p>
          <div className='w-80 p-2 rounded-md border border-gray-400'>
              <input type="number" placeholder='Nadi' className='outline-none w-full' readOnly value={data.nadi} />
          </div>
        </div>
        <div className='flex-col space-y-1'>
          <p className='text-gray-500 text-sm'>Suhu</p>
          <div className='w-80 p-2 rounded-md border border-gray-400'>
              <input type="text" placeholder='Suhu' className='outline-none w-full' readOnly value={data.suhu} />
          </div>
        </div>
        <div className='flex-col space-y-1'>
          <p className='text-gray-500 text-sm'>Pernapasan</p>
          <div className='w-80 p-2 rounded-md border border-gray-400'>
              <input type="text" placeholder='Pernapasan' className='outline-none w-full' readOnly value={data.pernapasan} />
          </div>
        </div>
        <div className='flex-col space-y-1'>
          <p className='text-gray-500 text-sm'>Saturasi</p>
          <div className='w-80 p-2 rounded-md border border-gray-400'>
              <input type="number" placeholder='Saturasi' className='outline-none w-full' readOnly value={data.saturasi} />
          </div>
        </div>
        <div className='flex-col space-y-1'>
          <p className='text-gray-500 text-sm'>GCS</p>
          <div className='w-80 p-2 rounded-md border border-gray-400'>
              <input type="text" placeholder='GCS' className='outline-none w-full' readOnly value={data.gcs}/>
          </div>
        </div>
        <div className='flex-col space-y-1'>
          <p className='text-gray-500 text-sm'>Pemeriksaan Fisik Lokal</p>
          <div className='w-80 p-2 rounded-md border border-gray-400'>
              <textarea type="text" placeholder='Pemeriksaan Fisik Lokal' className='outline-none w-full' readOnly value={data.pemeriksaanFisikLokal} />
          </div>
        </div>
        <div className='flex-col space-y-1'>
            <p className='text-gray-600 text-sm'>Pemeriksaan Penunjang</p>
            <div className='w-80 h-28 overflow-x-auto flex space-x-1'>
            {data.pemeriksaanPenunjang?data.pemeriksaanPenunjang.split(",").map((val, index)=><img key={index+1} src={host+'/medical/img/'+val} className="w-32 h-24 rounded-sm border border-indigo-300"/>)
            :<div className='w-32 h-24 rounded-md border border-indigo-300 bg-gray-300 flex justify-center items-center cursor-pointer'>
                <p className='text-gray-500 text-2xl'>Empty</p>
            </div>}
            </div>
        </div>
        <div className='flex-col space-y-1'>
          <p className='text-gray-500 text-sm'>Terapi</p>
          <div className='w-80 p-2 rounded-md border border-gray-400'>
              <textarea type="text" placeholder='Terapi' className='outline-none w-full' readOnly value={data.terapi}/>
          </div>
        </div>
        <div className='flex-col space-y-1'>
          <p className='text-gray-500 text-sm'>Diagnosis</p>
          <div className='w-80 p-2 rounded-md border border-gray-400'>
              <textarea type="text" placeholder='Diagnosis' className='outline-none w-full' readOnly value={data.diagnosis}/>
          </div>
        </div>
        <div className='flex-col space-y-1'>
          <p className='text-gray-500 text-sm'>Saran</p>
          <div className='w-80 p-2 rounded-md border border-gray-400'>
              <textarea type="text" placeholder='Saran' className='outline-none w-full' readOnly value={data.saran}/>
          </div>
        </div>
        <div className='flex-col space-y-1'>
          <p className='text-gray-500 text-sm'>Poli</p>
          <div className='w-80 p-2 rounded-md border border-gray-400'>
              <input type="text" placeholder='Poli' className='outline-none w-full' readOnly value={data.poli} />
          </div>
        </div>
        <div className='flex-col space-y-1'>
          <p className='text-gray-500 text-sm'>Rumah Sakit</p>
          <div className='w-80 p-2 rounded-md border border-gray-400'>
              <input type="text" placeholder='Rumah Sakit' className='outline-none w-full' readOnly value={data.rumahSakit} />
          </div>
        </div>
        <div className='flex-col space-y-1'>
          <p className='text-gray-500 text-sm'>Keterangan</p>
          <div className='w-80 p-2 rounded-md border border-gray-400'>
              <textarea type="text" placeholder='Keterangan' className='outline-none w-full' readOnly value={data.keterangan} />
          </div>
        </div>
        
        <div className='rounded-md border border-gray-400 p-2'>
            <p className='text-gray-400'>Waktu Kontrol Ulang</p>
            {data.waktuKontrolUlang?<input type="text" value={today.toLocaleDateString("en-US")} className="w-full" readOnly/>:<p className="text-gray-500">Tidak Ada</p>}
        </div>
        </>)}
        )
        }
      </>
      :<>
      <div className="w-80 h-auto border border-gray-400 rounded-xl flex items-center px-2 py-1 mb-4">
        <SearchIcon className='w-6 h-6 mr-2 text-gray-400'/>
        <input type="text" className="outline-none w-full text-gray-400" placeholder="Search..." value={search} onChange={(e)=> setsearch(e.target.value)} />
      </div>
      {
        mrs?.filter(val => val.nama.toLowerCase().includes(search.toLowerCase())).map((item,index)=>{
          const date = item.waktuKontrolUlang?new Date(item?.waktuKontrolUlang).toISOString().substring(0,10):''
          return(
            <div key={index+1} className='rounded-lg p-3 w-80 h-auto bg-green-100 border border-indigo-200 flex justify-start flex-col space-y-1 '>
              <div className='flex justify-between'>
                <p className='text-gray-600 font-semibold cursor-pointer' onClick={()=>setselected(item.id)}>{item.nama}</p>
                <div className='p-1 rounded-md bg-rose-500 h-fit cursor-pointer' onClick={()=>dispatch(deleteData(item.id))}><TrashIcon className='w-4 h-4 text-white' /></div>
              </div>
              <p className='text-gray-600  text-sm'></p>
              <div className='flex justify-between'>
                <p className='text-xs text-gray-500'>Check up {date}</p>
              </div>
            </div>
          )}
        )
      }
      </>}
    </div>
  )
}

export default LogActivity