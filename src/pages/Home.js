import React, { useEffect, useRef, useState } from 'react'
import {useDispatch,useSelector} from 'react-redux'
import {addData} from '../features/dataSlice'
import {getData} from '../features/personilSlice'
function Home() {
    const dispatch = useDispatch()
    const {mrs,isLoading ,error} = useSelector(state=>state.data)
    const {personil} = useSelector(state=>state.personil)
    const {user} = useSelector(state=>state.auth)
    const [data,setdata] = useState({
        nama:'',
        riwayatPenyakit:'',
        tensi: null,
        nadi:null,
        suhu:null,
        pernapasan:null,
        saturasi:null,
        gcs:null,
        pemeriksaanFisikLokal:'',
        terapi:'',
        diagnosis:'',
        saran:'',
        waktuKontrolUlang:null,
        poli:'',
        rumahSakit:'',
        keterangan:'',
        userId:user?.id
    })
    const [image,setimage] = useState(null)
    const [validation,setvalidation] = useState('')
    const img = useRef(null)
    const [picture,setpicture]=useState(null)
    const [autofill,setautofill] = useState('')
    function handleSubmit(){
        const cekPersonil = personil.find(p=>p.nama===data.nama)
        if(!cekPersonil) return setvalidation('Nama Personil Belum Terdaftar')
        if(data.nama==="") return setvalidation('Nama cannot be empty')
        if(data.riwayatPenyakit==="") return setvalidation('Riwayat Penyakit cannot be empty')
        if(data.tensi==null) return setvalidation('Tensi cannot be empty')
        if(data.nadi==null) return setvalidation('Nadi cannot be empty')
        if(data.suhu==null) return setvalidation('Suhu cannot be empty')
        if(data.pernapasan==null) return setvalidation('Pernapasan cannot be empty')
        if(data.saturasi==null) return setvalidation('Saturasi cannot be empty')
        if(data.gcs==null) return setvalidation('GCS cannot be empty')
        if(data.pemeriksaanFisikLokal==="") return setvalidation('Pemeriksaan Fisik Lokal cannot be empty')
        if(data.terapi==="") return setvalidation('Terapi cannot be empty')
        if(data.diagnosis==="") return setvalidation('Diagnosis cannot be empty')
        if(data.saran==="") return setvalidation('Saran cannot be empty')
        if(data.poli=="") return setvalidation('Poli cannot be empty')
        if(data.rumahSakit==="") return setvalidation('Rumah Sakit cannot be empty')
        setvalidation('')
        setautofill('')
        return submit()
    }
    const submit = () => {
        dispatch(addData({image:image, data: data}))
        setdata({
            nama:'',
            riwayatPenyakit:'',
            tensi: '',
            nadi:null,
            suhu:'',
            pernapasan:null,
            saturasi:null,
            gcs:null,
            pemeriksaanFisikLokal:'',
            terapi:'',
            diagnosis:'',
            saran:'',
            waktuKontrolUlang:null,
            poli:'',
            rumahSakit:'',
            keterangan:''
        })
        setimage(null)
        setpicture(null)
        setvalidation('')
    }
    useEffect(() => {
        dispatch(getData())
    },[])
  return (
    <div className='flex flex-col pb-20 space-y-2 lg:space-y-3 w-full h-[80vh] overflow-auto p-2 lg:px-14 lg:py-4'>
        <div className='relative w-full h-fit'>
          <div className='py-1 px-2 border border-gray-400 rounded-md w-80'>
            <input type='text' placeholder='Nama Personil' className='outline-none w-full' value={data.nama} onChange={(e)=>{
              setdata({...data, nama:e.target.value})
              setautofill(e.target.value)
              }} />
          </div>
          {autofill?<div className='bg-white absolute top-8 w-80 max-h-40 left-0 flex-col p-2 divide-y border-r border-b border-l rounded-md border-gray-400'>
            {personil?.filter(val => val.nama.toLowerCase().includes(data.nama.toLowerCase())).map((val,index)=>{
                if (val.length==0) return setdata({...data, nama:''})
                return(
                    <p key={index+1} className='text-xs text-gray-600 rounded-sm pl-2 py-1 hover:bg-gray-100 cursor-pointer font-semibold' onClick={()=>{
                        setdata({...data, nama:val.nama})
                        setautofill('')
                    }}>{val.nama}</p>
                )
            }
            )}
          </div>:<></>}
        </div>
        <div className='w-80 p-2 rounded-md border border-gray-400'>
            <textarea type="text" placeholder='Riwayat Penyakit' className='outline-none w-full' value={data.riwayatPenyakit} onChange={(e)=> setdata({...data, riwayatPenyakit: e.target.value})} />
        </div>
        <div className='w-80 p-2 rounded-md border border-gray-400'>
            <input type="text" placeholder='Tensi' className='outline-none w-full' value={data.tensi} onChange={(e)=> setdata({...data, tensi: e.target.value})} />
        </div>
        <div className='w-80 p-2 rounded-md border border-gray-400'>
            <input type="number" placeholder='Nadi' className='outline-none w-full' value={data.nadi} onChange={(e)=> setdata({...data, nadi: e.target.value})} />
        </div>
        <div className='w-80 p-2 rounded-md border border-gray-400'>
            <input type="text" placeholder='Suhu' className='outline-none w-full' value={data.suhu} onChange={(e)=> setdata({...data, suhu: e.target.value})} />
        </div>
        <div className='w-80 p-2 rounded-md border border-gray-400'>
            <input type="text" placeholder='Pernapasan' className='outline-none w-full' value={data.pernapasan} onChange={(e)=> setdata({...data, pernapasan: e.target.value})} />
        </div>
        <div className='w-80 p-2 rounded-md border border-gray-400'>
            <input type="number" placeholder='Saturasi' className='outline-none w-full' value={data.saturasi} onChange={(e)=> setdata({...data, saturasi: e.target.value})} />
        </div>
        <div className='w-80 p-2 rounded-md border border-gray-400'>
            <input type="text" placeholder='GCS' className='outline-none w-full' value={data.gcs} onChange={(e)=> setdata({...data, gcs: e.target.value})} />
        </div>
        <div className='w-80 p-2 rounded-md border border-gray-400'>
            <textarea type="text" placeholder='Pemeriksaan Fisik Lokal' className='outline-none w-full' value={data.pemeriksaanFisikLokal} onChange={(e)=> setdata({...data, pemeriksaanFisikLokal: e.target.value})} />
        </div>
        <input ref={img} hidden type="file" multiple accept='image/*' onChange={(e)=>{
            let pic = []
            for(let i=0;i<e.target.files.length;i++){
                pic.push( URL.createObjectURL(e.target.files[i])) 
            }
            setpicture(pic)
            setimage(e.target.files)
            
        }} />
        <div className='flex-col space-y-1'>
            <p className='text-gray-600 text-sm'>Pemeriksaan Penunjang</p>
            

            
            {picture?
            <div className='w-80 h-28 overflow-x-auto flex space-x-1'>
                {
                    picture.map((val,index)=><img key={index+1} src={val} className="w-32 h-24 rounded-sm border border-indigo-300" onClick={()=> img.current.click()} />)
                }
            </div>
            :<div className='w-32 h-24 rounded-md border border-indigo-300 bg-gray-300 flex justify-center items-center cursor-pointer' onClick={()=> img.current.click()}>
                <p className='text-gray-500 text-2xl'>Empty</p>
            </div>}
        </div>
        <div className='w-80 p-2 rounded-md border border-gray-400'>
            <textarea type="text" placeholder='Terapi' className='outline-none w-full' value={data.terapi} onChange={(e)=> setdata({...data, terapi: e.target.value})} />
        </div>
        <div className='w-80 p-2 rounded-md border border-gray-400'>
            <textarea type="text" placeholder='Diagnosis' className='outline-none w-full' value={data.diagnosis} onChange={(e)=> setdata({...data, diagnosis: e.target.value})} />
        </div>
        <div className='w-80 p-2 rounded-md border border-gray-400'>
            <textarea type="text" placeholder='Saran' className='outline-none w-full' value={data.saran} onChange={(e)=> setdata({...data, saran: e.target.value})} />
        </div>
        <div className='w-80 p-2 rounded-md border border-gray-400'>
            <input type="text" placeholder='Poli' className='outline-none w-full' value={data.poli} onChange={(e)=> setdata({...data, poli: e.target.value})} />
        </div>
        <div className='w-80 p-2 rounded-md border border-gray-400'>
            <input type="text" placeholder='Rumah Sakit' className='outline-none w-full' value={data.rumahSakit} onChange={(e)=> setdata({...data, rumahSakit: e.target.value})} />
        </div>
        <div className='w-80 p-2 rounded-md border border-gray-400'>
            <textarea type="text" placeholder='Keterangan' className='outline-none w-full' value={data.keterangan} onChange={(e)=> setdata({...data, keterangan: e.target.value})} />
        </div>
        <div className='rounded-md border border-gray-400 p-2'>
            <p className='text-gray-400'>Waktu Kontrol Ulang</p>
            <input type="date" value={data.waktuKontrolUlang} onChange={(e)=> setdata({...data, waktuKontrolUlang: e.target.value})} />
        </div>
        {validation&&<p className='text-red-600'>{validation}</p>}
        <button className='text-white bg-green-600 px-2 py-1 rounded-md w-fit' onClick={handleSubmit}>{isLoading?<>Loading...</>:<>Submit</>}</button>
        {error&&<p className='text-red-600'>{error}</p>}
    </div>
  )
}

export default Home