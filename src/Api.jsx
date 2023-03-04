import React from 'react'
import { useState } from 'react'
import CrudForm from './components/CrudForm'
import CrudTable from './components/CrudTable'

function Api() {
  const [db, setDb] = useState([])
  const [dataToEdit, setDataToEdit] = useState(null)

  function createData(data) {
    data.id=Date.now()
    setDb([...db,data])
  }

  function updateData(data) {
    let newData=db.map((elem)=>{
      if(elem.id===data.id){
        return data
      }else{
        return elem
      }
    })
    setDb(newData)
  }
  function deleteData(id) {
    console.log("eliminando")
    let isDelete=window.confirm(`¿Estas seguro de eliminar el registro con id ${id} ?`)
    
    if (isDelete) {
      let newData=db.filter((elem)=>{
        return elem.id!==id
      })
      setDb(newData)
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
        <CrudTable 
          data={db}
          setDataToEdit={setDataToEdit}
          deleteData={deleteData} />
      </article>
    </div>
  )
}

export default Api