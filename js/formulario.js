
document.addEventListener('DOMContentLoaded', ()=>{
    formulario();
});

function formulario(){

    const datosForm = {
        nombre : '',
        email: '',
        mensaje: ''
    }

    const nombre = document.querySelector('#nombre');
    const email = document.querySelector('#email');
    const mensaje = document.querySelector('#mensaje');
    const formulario = document.querySelector('form');
    const enviar = document.querySelector('form [type="submit"]');
    const spinner = document.querySelector('#spinner');


    nombre.addEventListener('blur', validarCampos);
    email.addEventListener('blur', validarCampos);
    mensaje.addEventListener('blur', validarCampos);
    enviar.addEventListener('click', enviarFormulario);

    function enviarFormulario(e){
        e.preventDefault();
        //&& !validarEmail(email)
        const {nombre, email, mensaje} = datosForm;
        if(Object.values(datosForm).includes('') && !validarEmail(email)){
            mensajeFormulario('Todos los campos son obligatorios', true);
            
            return;
        }
            mensajeFormulario('El mensaje se envio correctamente')
    }

    function mensajeFormulario(mensaje, error = null){
        const mensajeCrea = document.createElement('P');
        mensajeCrea.textContent = mensaje;
        if(error){
            mensajeCrea.classList.add('noEnviado');
            formulario.appendChild(mensajeCrea);


        }else{
            mensajeCrea.classList.add('enviado');
            spinner.classList.remove('quitar');
            spinner.classList.add('agregar');
            setTimeout(()=>{
                spinner.classList.add('quitar');
                spinner.classList.remove('agregar');
                formulario.appendChild(mensajeCrea);
                setTimeout(()=>{
                    mensajeCrea.remove();
                },3000)
            },4000)
        }
        
            setTimeout(()=>{
                mensajeCrea.remove();
            },3000);

        
    }

    function validarCampos(e){
        const referencia = e.target.parentElement.parentElement;
        if(e.target.value.trim() === ''){
            //temple string
            alerta(`El campo ${e.target.id} se encuentra vacio`, referencia);
            return;
        }
        if(e.target.id === 'email' && !validarEmail(e.target.value) ){
            alerta('El campo email no es valido', referencia);
            datosForm.email = '';
            return;
        }

        limpiarAlerta(referencia);
        datosForm[e.target.id] = e.target.value;
        console.log(datosForm);
    }

     function alerta(mensaje, referencia){
        //limpiar alerta
        limpiarAlerta(referencia);
        const error = document.createElement('DIV');
        error.textContent = mensaje;
        error.classList.add('error');

        referencia.appendChild(error);
    }

    function limpiarAlerta(referencia){
        const error = referencia.querySelector('.error');
        if(error){
            error.remove();
        }
    }

    function validarEmail(email){
        //exprecion regular
        const regex =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
        resultado = regex.test(email);
        return resultado;
    }

}

