import { useState, useEffect } from 'react'
import logo from '/logo.png'

function App() {
  const [RFC, setRFC] = useState("")
  const [CURP, setCURP] = useState("")
  const [errorRFC, setErrorRFC] = useState("")
  const [errorCURP, setErrorCURP] = useState("")
  const [validacionRFC, setValidacionRFC] = useState("")
  const [validacionCURP, setValidacionCURP] = useState("")
  const [errorGeneral, setErrorGeneral] = useState("")
  const [validacionGeneral, setValidacionGeneral] = useState("")
  const [edad, setEdad] = useState(0)

  const estados = ["AS", "BC", "BS", "CC", "CL", "CM", "CS", "CH", "DF", "DG", "GT", "GR", "HG", "JC", "MC", "MN", "MS", "NT", "NL", "OC", "PL", "QT", "QR", "SP", "SL", "SR", "TC", "TS", "TL", "VZ", "YN", "ZS"]

  const validarRFC = (e:any) => {
    e.preventDefault()
    
    setRFC(RFC.toUpperCase())

    const iniciales = RFC.substring(0, 4)
    const validationIniciales = new RegExp('^[A-Z]+$', 'i');

    let añoNacimiento = CURP.substring(4,6)
    const mesNacimiento = CURP.substring(6,8)
    const diaNacimiento = CURP.substring(8,10)
    if(Number(añoNacimiento) < 25){
      añoNacimiento = "20" + añoNacimiento;
    }
    const fechaNacimiento = new Date(Number(añoNacimiento), Number(mesNacimiento), Number(diaNacimiento))
    const fechaActual = new Date()

    if(RFC === ""){
      setErrorRFC("El RFC esta vacio")
    }else if(RFC.length < 12){
      setErrorRFC("El RFC es menor a los caracteres establecidos")
      setValidacionRFC("")
    }else if(RFC.length > 12){
      setErrorRFC("El RFC es mayor a los caracteres establecidos")
      setValidacionRFC("")
    }else if(!validationIniciales.test(iniciales) ){
      setErrorRFC("El RFC contiene un error en las iniciales")
      setValidacionRFC("")
    }else if(fechaNacimiento > fechaActual){
      setErrorRFC("El RFC contiene un error en la fecha de nacimiento")
      setValidacionRFC("")
    }else {
      setValidacionRFC("El RFC es válido")
      setErrorRFC("")
    } 

    validarGeneral()
  }

  const validarCurp = (e:any) => {
    e.preventDefault()
    
    setCURP(CURP.toUpperCase())

    const iniciales = CURP.substring(0, 4)
    const validationIniciales = new RegExp('^[A-Z]+$', 'i');
    
    let añoNacimiento = CURP.substring(4,6)
    const mesNacimiento = CURP.substring(6,8)
    const diaNacimiento = CURP.substring(8,10)
    if(Number(añoNacimiento) < 25){
      añoNacimiento = "20" + añoNacimiento;
    }
    const fechaNacimiento = new Date(Number(añoNacimiento), Number(mesNacimiento), Number(diaNacimiento))
    const fechaActual = new Date()

    const genero = CURP.charAt(10)
    const estado = CURP.substring(11,13)

    if(CURP == ""){
      setErrorCURP("El CURP está vacio")
      setValidacionCURP("")
    }else if(CURP.length < 18){
      setErrorCURP("El CURP es menor a los caracteres establecidos")
      setValidacionCURP("")
    }else if(CURP.length > 18){
      setErrorCURP("El CURP es mayor a los caracteres establecidos")
      setValidacionCURP("")
    }else if(!validationIniciales.test(iniciales) ){
      setErrorCURP("El CURP contiene un error en las iniciales")
      setValidacionCURP("")
    }else if(genero !== "M" && genero !== "H"){
      setErrorCURP("El CURP contiene un error en el identificador de sexo")
      setValidacionCURP("")
    }else if(!estados.includes(estado)){
      setErrorCURP("El CURP contiene un error en el identificador de estado")
      setValidacionCURP("")
    } else if(fechaNacimiento > fechaActual){
      setErrorCURP("El CURP contiene un error en la fecha de nacimiento")
      setValidacionCURP("")
    } else {
      setValidacionCURP("El CURP es válido")
      setErrorCURP("")
    } 

    if(fechaActual.getMonth()+1 > fechaNacimiento.getMonth()){
      setEdad(fechaActual.getFullYear() - fechaNacimiento.getFullYear())
    }else if(fechaNacimiento.getMonth() == fechaActual.getMonth()+1){
      if(fechaActual.getDate() >= fechaNacimiento.getDate()){
        setEdad(fechaActual.getFullYear() - fechaNacimiento.getFullYear())
      }else{
        setEdad((fechaActual.getFullYear() - fechaNacimiento.getFullYear())-1)
      }
    }else{
      setEdad((fechaActual.getFullYear() - fechaNacimiento.getFullYear()) - 1)
    }

    validarGeneral()
  }

  const validarGeneral = () => {
    if(validacionRFC === "El RFC es válido" && validacionCURP === "El CURP es válido"){
      const sameCURP = CURP.substring(0, 10)
      const sameRFC = RFC.substring(0, 10)

      if(sameCURP === sameRFC){
        setValidacionGeneral("Los datos son validos")
        setErrorGeneral("")
      }else{
        setErrorGeneral("Los datos no coinciden")
        setValidacionGeneral("")
      }
    }
  }

  useEffect(() => {
    setTimeout(() => {
      validarGeneral()
    }, 1000)
  }, [validacionRFC, validacionCURP])

  return (
    <div className="container">
      <h1 className="text-center text-primary">Validador de RFC y CURP</h1>
      <br/>
      <div className="row">
        <div className="col-sm-6">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">RFC</h5>
              <form onSubmit={(e) => validarRFC(e)}>
                <input type="text" className="form-control" id="rfcInput" placeholder='Ingresa tu RFC' onChange={(e) => setRFC(e.target.value)}/>
                <br/>
                <button type="submit" className="btn btn-success">Validar</button>
              </form>
            </div>
          </div>
          {errorRFC && <div className="alert alert-danger mt-2">{errorRFC}</div>}
          {validacionRFC && <div className="alert alert-success mt-2">{validacionRFC}</div>}
        </div>
        <div className="col-sm-6">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">CURP</h5>
              <form onSubmit={(e) => validarCurp(e)}>
                <input type="text" className="form-control" id="curpInput" placeholder='Ingresa tu CURP' onChange={(e) => setCURP(e.target.value)}/>
                <br/>
                <button type="submit" className="btn btn-success">Validar</button>
              </form>
            </div>
          </div>
          {errorCURP && <div className="alert alert-danger mt-2">{errorCURP}</div>}
          {validacionCURP && <div className="alert alert-success mt-2">{validacionCURP}</div>}
        </div>
      </div>
      {errorGeneral && <div className="alert alert-danger mt-2">{errorGeneral}</div>}
      {validacionGeneral && <div className="alert alert-success mt-2">{validacionGeneral}</div>}
      {validacionGeneral && <div className="alert alert-info mt-2">Su edad es: {edad} años</div>}
      <br/>
      <div className="row">
        <div className="col text-center">
          <strong>
            <p>Christian Alejandro Muñoz Gaytán</p>
            <p>Arquitectura de software</p>
            <p>IDGS703</p>
          </strong>  
          <img src={logo} className="img-fluid" alt="Logo UTL" style={{height:"10rem"}} />
        </div>
      </div>
    </div>
  )
}

export default App
