import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'

const initialForm={
  id:null,
  name:"",
  username:"",
  email:"",
  address:"",
  phone:"",
  website:""
}
function CrudForm({ createData, updateData, dataToEdit, setDataToEdit }) {


  const [form, setForm] = useState(initialForm)

    // al escribir datos en el formulario se van actualizando en una sola variable (estado)
    const handleChange =(e)=>{
        setForm({
            ...form,
            [e.target.name]:e.target.value,
        })
    }
    
    // limpia el formulario
    const handleReset =(e)=>{
        setForm(initialForm)
        setDataToEdit(null)
    }
    const handleSubmit =(e)=>{
        e.preventDefault() // para que no se autoprocese el frmulario
        if(!form.name||!form.username){
          alert("Datos incompletos")
          return
        }

        // id de un formulario es nulo: se crea un nuevo dato
        if(form.id===null){
          console.log("se creo un dato")
          createData(form)
        }else{
          // si no es nulo se editara un formulario ya existente 
          console.log("se esta actualizando")
          updateData(form)
        }

        // se limpia el formulario
        handleReset()
    }

    useEffect(() => {

      if (dataToEdit) {
        // se actualiza el formulario con los datos que se recibe
        setForm(dataToEdit)
      }else{
        // sin datos actuales
        setForm(initialForm)
      }
      // Se estara evaluando cualquier cambio que tenga dataToEdit (por defecto es nulo)
      // al detectar un cambio diferente de nulo significa que se realizara un update
      // y se cargara el formulario para poder editarlo
    }, [dataToEdit])
    
  return (
    <div>
        <h3>{
          dataToEdit?"Editar":"Agregar"
          }</h3>
        <form onSubmit={handleSubmit}>
            <input type="text" name="name" value={form.name} placeholder='Nombre' onChange={handleChange}/>
            <input type="text" name="username" value={form.username} placeholder='Usuario' onChange={handleChange} />
            <input type="email" name="email" value={form.email} placeholder='Correo electronico' onChange={handleChange} />
            <input type="text" name="address" value={form.address} placeholder='Direccion' onChange={handleChange} />
            <input type="number" name="phone" value={form.phone} placeholder='Numerod e telefono' onChange={handleChange} />
            <input type="text" name="website" value={form.website} placeholder='Sitio web' onChange={handleChange} />
            <input type="submit" value="Enviar" />
            <input type="reset" value="Limpiar" onClick={handleReset} />
        </form>
    </div>
  )
}

export default CrudForm