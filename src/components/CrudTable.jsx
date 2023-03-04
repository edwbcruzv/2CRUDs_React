import React from 'react'
import TableRow from './TableRow'


function CrudTable({data, setDataToEdit, deleteData}) {
  return (
    <div>
        <h3>Tabla de datos</h3>
        <table>
            <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Usuario</th>
                    <th>Email</th>
                    <th>Direccion</th>
                    <th>Telefono</th>
                    <th>Sitio web</th>
                    <th>Acciones</th>
                </tr>
            </thead>

            <tbody>
                {
                    data.length===0? <tr><td colSpan='6'>Sin datos</td></tr>:
                    
                    data.map((e,index)=>{
                        return <TableRow key={index} elem={e} setDataToEdit={setDataToEdit} deleteData={deleteData}/>
                    }) 
                }
                
            </tbody>
        </table>
    </div>
  )
}

export default CrudTable