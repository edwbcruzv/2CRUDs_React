import React from 'react'

function TableRow({elem, setDataToEdit, deleteData}) {
  const {
    id,
    name,
    username,
    email,
    address,
    phone,
    website
  }=elem


  return (
    <tr>
        <td>{name}</td>
        <td>{username}</td>
        <td>{email}</td>
        <td>{address}</td>
        <td>{phone}</td>
        <td>{website}</td>
        
        <td>
            <button onClick={()=>setDataToEdit(elem)}>Editar</button>
            <button onClick={()=>deleteData(id)}>Eliminar</button>
        </td>
    </tr>
  )
}

export default TableRow