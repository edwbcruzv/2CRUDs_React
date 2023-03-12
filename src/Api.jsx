import React, { useEffect } from 'react'
import { useState } from 'react'
import CrudForm from './components/CrudForm'
import CrudTable from './components/CrudTable'
import Loader from './components/Loader'
import Message from './components/Message'
import {helperHTTP} from './helpers/helperHTTP'

function Api() {
  const [db, setDb] = useState(null)
  const [dataToEdit, setDataToEdit] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)
  let api=helperHTTP()
  let url="http://localhost:5000/clientes"

  useEffect(() => {
    setLoading(true)
    

    api.get(url).then((res)=>{
      console.log(res)
      if (res.err===false || res.err===undefined) {
        // sin errores
        setError(null)
        setDb(res)
        console.log("Respuesta:",res)
      }else{
        setError(res)
        setDb(null)
        console.log("error:",res)
      }
      setLoading(false)
    })
    
    
  }, [])
  


  function createData(data) {
    data.id=Date.now()
    let options={body:data,headers:{"content-type":"application/json"}}
    api.post(url,options)
      .then((res)=>{
        console.log(res)
        if (res.err===false || res.err===undefined) {
        // sin errores
        setDb([...db,data])
        
        }else{
        setError(res)
        }
      })
    
  }

  function updateData(data) {
    let endpoint=`${url}/${data.id}`
    console.log(endpoint)

    let options={body:data,headers:{"content-type":"application/json"}}
    api.put(endpoint,options)
      .then((res)=>{
        console.log(res)
        if (res.err===false || res.err===undefined) {
        // sin errores
        let newData=db.map((elem)=>{
          if(elem.id===data.id){
            return data
          }else{
            return elem
          }
        })
        setDb(newData)
        }else{
        setError(res)
        }
      })
  }

  function deleteData(id) {
    let endpoint=`${url}/${id}`
    let options={headers:{"content-type":"application/json"}}
    
    let isDelete=window.confirm(`¿Estas seguro de eliminar el registro con id ${id} ?`)
    
    if (isDelete) {
      
      api.del(endpoint,options)
      .then((res)=>{
        console.log(res)
        if (res.err===false || res.err===undefined) {
        // sin errores
          let newData=db.filter((elem)=>{
            return elem.id!==id
          })
        setDb(newData)
        }else{
        setError(res)
        }
      })
    }
  }

  return (
    <div>
      <article className='grid-1-2'>
        <CrudForm 
          createData={createData}
          updateData={updateData}
          dataToEdit={dataToEdit}
          setDataToEdit={setDataToEdit}/>
        {/* Si loadding es verdadero, Loader se renderiza */}
        {loading&&<Loader />}
        
        {/* cuando error es verdadero, se renderizara mensaje */}
        {error&&<Message msg={`Error ${error.status}:${error.statusText}`} bgColor={"#dc3545"}/>}

        {/* si la db tiene contenido, la tabla se renderiza */}
        {db&&<CrudTable 
          data={db}
          setDataToEdit={setDataToEdit}
          deleteData={deleteData} />
        }
        
        
      </article>
    </div>
  )
}

export default Api