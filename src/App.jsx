
import React from 'react'
import { useState } from 'react'
import Api from './Api'
import CrudForm from './components/CrudForm'
import CrudTable from './components/CrudTable'


const initialDB=[
  {
    "id": 1,
    "name": "Leanne Graham",
    "username": "Bret",
    "email": "Sincere@april.biz",
    "address": "direccion1",
    "phone": 77073803156442,
    "website": "hildegard.org"
  },
  {
    "id": 2,
    "name": "Ervin Howell",
    "username": "Antonette",
    "email": "Shanna@melissa.tv",
    "address": "direccion2",
    "phone": 10692659309125,
    "website": "anastasia.net"
  },
  {
    "id": 3,
    "name": "Clementine Bauch",
    "username": "Samantha",
    "email": "Nathan@yesenia.net",
    "address": "direccion3",
    "phone": 14631234447,
    "website": "ramiro.info"
  },
  {
    "id": 4,
    "name": "Patricia Lebsack",
    "username": "Karianne",
    "email": "Julianne.OConner@kory.org",
    "address": "direccion4",
    "phone": 493179623156,
    "website": "kale.biz"
  },
  {
    "id": 5,
    "name": "Chelsey Dietrich",
    "username": "Kamren",
    "email": "Lucio_Hettinger@annie.ca",
    "address": "direccion6",
    "phone": 2549541289,
    "website": "demarco.info"
  },
  {
    "id": 6,
    "name": "Mrs. Dennis Schulist",
    "username": "Leopoldo_Corkery",
    "email": "Karley_Dach@jasper.info",
    "address": "direccion6",
    "phone": 4779384786430,
    "website": "ola.org"
  },
  {
    "id": 7,
    "name": "Kurtis Weissnat",
    "username": "Elwyn.Skiles",
    "email": "Telly.Hoeger@billy.biz",
    "address":"direccion7",
    "phone": 2100676132,
    "website": "elvis.io"
  },
  {
    "id": 8,
    "name": "Nicholas Runolfsdottir V",
    "username": "Maxime_Nienow",
    "email": "Sherwood@rosamond.me",
    "address": "direccion8",
    "phone": 5864936943140,
    "website": "jacynthe.com"
  },
  {
    "id": 9,
    "name": "Glenna Reichert",
    "username": "Delphine",
    "email": "Chaim_McDermott@dana.io",
    "address": "direccion9",
    "phone": 976679441206,
    "website": "conrad.com"
  },
  {
    "id": 10,
    "name": "Clementina DuBuque",
    "username": "Moriah.Stanton",
    "email": "Rey.Padberg@karina.biz",
    "address": "direccion10",
    "phone": 10246483804,
    "website": "ambrose.net"
  }
]


function App() {
  const [db, setDb] = useState(initialDB)
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
      <h2>API</h2>
      <Api/>
      {"cadenas"}
      <hr />
      <h2>CRUD APP</h2>
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

export default App