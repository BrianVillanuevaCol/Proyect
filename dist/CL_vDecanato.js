import { CL_mComputadora } from './CL_mComputadora.js';
export class CL_vDecanato {
    constructor() {
        // Referencias de Estadísticas
        this.vistaGeneral = document.getElementById('vista-general');
        this.vistaAdminContent = document.getElementById('vista-admin-content');
        this.vistaUsuarioContent = document.getElementById('vista-usuario-content');
        this.btnAccesoAdmin = document.getElementById('btn-acceso-admin');
        this.btnAccesoUsuario = document.getElementById('btn-acceso-usuario');
        this.btnRegresarAdmin = document.getElementById('btn-regresar-admin');
        this.btnRegresarUsuario = document.getElementById('btn-regresar-usuario');
        // --- Referencias de Modal Ver Detalles (Nuevo) ---
        this.modalVerDetalles = document.getElementById('modal-ver-detalles');
        this.btnCerrarVerDetalles = document.getElementById('btn-cerrar-ver-detalles');
        this.lblDetallesSerial = document.getElementById('lbl-detalles-serial-modal');
        this.lblDetallesProcesador = document.getElementById('lbl-detalles-procesador');
        this.lblDetallesMemoria = document.getElementById('lbl-detalles-memoria');
        this.lblDetallesLaboratorio = document.getElementById('lbl-detalles-laboratorio');
        this.lblDetallesUbicacion = document.getElementById('lbl-detalles-ubicacion');
        this.lblDetallesEstado = document.getElementById('lbl-detalles-estado');
        this.lblTotalAdmin = document.getElementById('lbl-total-admin');
        this.lblFuncionalAdmin = document.getElementById('lbl-funcional-admin');
        this.lblNoFuncionalAdmin = document.getElementById('lbl-no-funcional-admin');
        this.lblReparacionAdmin = document.getElementById('lbl-reparacion-admin');
        // Referencias de Contenedores y Filtros (Admin)
        this.contenedorLista = document.getElementById('lista-computadoras');
        this.filtroLaboratorio = document.getElementById('filtro-laboratorio');
        this.filtroFila = document.getElementById('filtro-fila');
        // Referencias para la Sección de Resultados/Consulta
        this.filtroProcesador = document.getElementById('filtro-procesador');
        this.filtroMemoria = document.getElementById('filtro-memoria');
        this.filtroEstadoReporte = document.getElementById('filtro-estado-reporte');
        // *** NUEVAS REFERENCIAS PARA FILTROS DE UBICACIÓN EN VISTA USUARIO ***
        this.filtroLaboratorioUser = document.getElementById('filtro-laboratorio-user');
        this.filtroFilaUser = document.getElementById('filtro-fila-user');
        this.lblTotalReporte = document.getElementById('lbl-total-reporte');
        this.listaReporte = document.getElementById('lista-reporte');
        // --- Referencias de Modal CRUD (Admin) ---
        this.modal = document.getElementById('modal-formulario');
        this.inpSerial = document.getElementById('inp-serial');
        this.inpProcesador = document.getElementById('inp-procesador');
        this.inpMemoria = document.getElementById('inp-memoria');
        this.inpLaboratorio = document.getElementById('inp-laboratorio');
        this.inpEstado = document.getElementById('inp-estado');
        this.inpFila = document.getElementById('inp-fila');
        this.inpPuesto = document.getElementById('inp-puesto');
        this.btnMostrarForm = document.getElementById('btn-mostrar-form');
        this.btnAceptar = document.getElementById('btn-aceptar');
        this.btnEliminarCancelar = document.getElementById('btn-eliminar-cancelar');
        this.modoEdicion = false;
        // --- Referencias de Modal de Reporte (Usuario) ---
        this.modalReporte = document.getElementById('modal-reporte');
        this.lblReporteSerial = document.getElementById('lbl-reporte-serial');
        this.inpDescripcionReporte = document.getElementById('inp-descripcion-reporte');
        this.btnAceptarReporte = document.getElementById('btn-aceptar-reporte');
        this.btnCancelarReporte = document.getElementById('btn-cancelar-reporte');
        // --- Referencias de Modal Ver Reporte (Admin) ---
        this.modalVerReporte = document.getElementById('modal-ver-reporte');
        this.lblReporteDetallesSerial = document.getElementById('lbl-reporte-detalles-serial');
        this.lblReporteDetallesDesc = document.getElementById('lbl-reporte-detalles-desc');
        this.btnCerrarVerReporte = document.getElementById('btn-cerrar-ver-reporte');
        this.btnResolverReporte = document.getElementById('btn-resolver-reporte');
    }
    abrirModalDetalles(pc) {
        // 1. Llenar el modal con los datos de la PC (CL_mComputadora)
        this.lblDetallesSerial.textContent = pc.numeroSerie;
        this.lblDetallesProcesador.textContent = pc.procesador;
        this.lblDetallesMemoria.textContent = pc.memoria;
        this.lblDetallesLaboratorio.textContent = pc.laboratorio.toString();
        this.lblDetallesUbicacion.textContent = `${pc.fila} / ${pc.puesto}`;
        this.lblDetallesEstado.textContent = pc.estado;
        // Aplicar estilo al estado (si tienes clases CSS definidas)
        this.lblDetallesEstado.className = `estado-${pc.estado.replace(/ /g, '-').toLowerCase()}`;
        // 2. Mostrar el modal
        this.modalVerDetalles.classList.remove('hidden');
    }
    cerrarModalDetalles() {
        this.modalVerDetalles.classList.add('hidden');
    }
    mostrarVista(vista) {
        // Ocultar todas
        this.vistaGeneral.style.display = 'none';
        this.vistaAdminContent.style.display = 'none';
        this.vistaUsuarioContent.style.display = 'none';
        // Mostrar la seleccionada
        if (vista === 'general') {
            this.vistaGeneral.style.display = 'block';
        }
        else if (vista === 'admin') {
            this.vistaAdminContent.style.display = 'block';
        }
        else if (vista === 'usuario') {
            this.vistaUsuarioContent.style.display = 'block';
        }
    }
    abrirModal(esCreacion) {
        this.modoEdicion = !esCreacion;
        this.modal.classList.remove('hidden');
        this.inpSerial.disabled = !esCreacion;
        // Lógica del botón 'Cancelar'
        this.btnEliminarCancelar.textContent = '✖ Cancelar';
        this.btnEliminarCancelar.classList.remove('btn-danger');
        this.btnEliminarCancelar.classList.add('btn-secondary');
        if (esCreacion) {
            this.limpiarInputs();
        }
    }
    cerrarModal() {
        this.modal.classList.add('hidden');
        this.limpiarInputs();
    }
    abrirModalReporte(serial) {
        this.lblReporteSerial.textContent = serial;
        this.inpDescripcionReporte.value = '';
        this.modalReporte.classList.remove('hidden');
    }
    cerrarModalReporte() {
        this.modalReporte.classList.add('hidden');
        this.inpDescripcionReporte.value = '';
    }
    abrirModalVerReporte(reporte) {
        this.lblReporteDetallesSerial.textContent = reporte.serial;
        this.lblReporteDetallesDesc.textContent = reporte.descripcion;
        this.btnResolverReporte.setAttribute('data-serial', reporte.serial);
        this.modalVerReporte.classList.remove('hidden');
    }
    cerrarModalVerReporte() {
        this.modalVerReporte.classList.add('hidden');
    }
    limpiarInputs() {
        this.inpSerial.value = '';
        this.inpProcesador.value = '';
        this.inpMemoria.value = '';
        this.inpLaboratorio.value = '';
        this.inpEstado.value = 'Funcional';
        this.inpFila.value = '';
        this.inpPuesto.value = '';
    }
    actualizarEstadisticasAdmin(total, funcionales, noFuncionales, enReparacion) {
        this.lblTotalAdmin.textContent = total.toString();
        this.lblFuncionalAdmin.textContent = funcionales.toString();
        this.lblNoFuncionalAdmin.textContent = noFuncionales.toString();
        this.lblReparacionAdmin.textContent = enReparacion.toString();
    }
    actualizarLista(computadoras, reportesActivos) {
        this.contenedorLista.innerHTML = '';
        if (computadoras.length === 0) {
            this.contenedorLista.innerHTML = '<p class="info-mensaje">No se encontraron computadoras con el filtro de Laboratorio/Fila.</p>';
            return;
        }
        const serialesReportados = new Set(reportesActivos.map(r => r.serial));
        const header = document.createElement('div');
        header.classList.add('item-computadora', 'item-header');
        header.innerHTML = `
            <div class="item-campo-header reporte-col">Reporte</div> 
            <div class="item-campo-header">Laboratorio</div>
            <div class="item-campo-header">Serial</div>
            <div class="item-campo-header">Fila</div>
            <div class="item-campo-header">Puesto</div>
            <div class="item-campo-header">Estado</div>
            <div class="acciones-item-header">Acciones</div>
        `;
        this.contenedorLista.appendChild(header);
        computadoras.forEach(pc => {
            const div = document.createElement('div');
            div.classList.add('item-computadora');
            let reporteHTML = `<div class="item-campo reporte-col"></div>`;
            if (serialesReportados.has(pc.numeroSerie)) {
                reporteHTML = `
                    <div class="item-campo reporte-col">
                        <button class="btn-advertencia" data-serial-reporte="${pc.numeroSerie}">
                            ⚠️
                        </button>
                    </div>
                `;
            }
            let estadoCssClass = pc.estado.toLowerCase().replace(/ /g, '-').replace('á', 'a').replace('ó', 'o');
            const memoriaParaMostrar = pc.memoria.replace(/gb/gi, '').trim() + ' GB';
            div.innerHTML = `
                ${reporteHTML} 
                <div class="item-campo"data-label="Laboratorio">Lab ${pc.laboratorio}</div>
                <div class="item-campo"data-label="Serial">${pc.numeroSerie}</div> 
                <div class="item-campo"data-label="Fila">${pc.fila}</div>
                <div class="item-campo"data-label="Puesto">${pc.puesto}</div>
                <div class="item-campo">
                    <span class="estado-celda estado-${estadoCssClass}">${pc.estado}</span>
                </div>
                
                <div class="acciones-item">
                    <button class="btn-editar" data-serial="${pc.numeroSerie}">Editar</button>
                    <button class="btn-eliminar-item btn-danger" data-serial="${pc.numeroSerie}">Eliminar</button>
                </div>
            `;
            this.contenedorLista.appendChild(div);
        });
    }
    actualizarListaReporte(computadoras) {
        this.listaReporte.innerHTML = '';
        this.lblTotalReporte.textContent = computadoras.length.toString();
        if (computadoras.length === 0) {
            this.listaReporte.innerHTML = '<p class="info-mensaje">No se encontraron computadoras que cumplan con los filtros.</p>';
            return;
        }
        const header = document.createElement('div');
        header.classList.add('item-computadora', 'item-header');
        header.innerHTML = `
            <div class="item-campo-header">Laboratorio</div>
            <div class="item-campo-header">Serial</div>
            <div class="item-campo-header">Fila</div>
            <div class="item-campo-header">Puesto</div>
            <div class="acciones-item-header">Acciones</div>
        `;
        this.listaReporte.appendChild(header);
        computadoras.forEach(pc => {
            const div = document.createElement('div');
            div.classList.add('item-computadora');
            div.innerHTML = `
                <div class="item-campo" data-label="Laboratorio">Lab ${pc.laboratorio}</div>
                <div class="item-campo" data-label="Serial">${pc.numeroSerie}</div>
                <div class="item-campo" data-label="Fila">${pc.fila}</div>
                <div class="item-campo" data-label="Puesto">${pc.puesto}</div>
                
                <div class="acciones-item">
                <button class="btn-reportar btn-info" data-serial="${pc.numeroSerie}">Reportar</button>
                <button class="btn-secondary btn-ver-detalles" data-serial="${pc.numeroSerie}">Ver Detalles</button>
                </div>
            `;
            this.listaReporte.appendChild(div);
        });
    }
    cargarDatosEnInputs(pc) {
        this.modoEdicion = true;
        this.abrirModal(false);
        this.inpSerial.value = pc.numeroSerie;
        this.inpSerial.disabled = true;
        this.inpProcesador.value = pc.procesador;
        const memoriaNum = pc.memoria.replace(/gb/gi, '').trim();
        this.inpMemoria.value = memoriaNum;
        this.inpLaboratorio.value = pc.laboratorio.toString();
        const estadoValido = ['Funcional', 'No Funcional', 'En Reparación'].includes(pc.estado) ? pc.estado : 'Funcional';
        this.inpEstado.value = estadoValido;
        this.inpFila.value = pc.fila.toString();
        this.inpPuesto.value = pc.puesto.toString();
    }
    obtenerDatosDeInputs() {
        const serialStr = this.inpSerial.value.trim();
        const labNum = parseInt(this.inpLaboratorio.value);
        const filaNum = parseInt(this.inpFila.value);
        const puestoNum = parseInt(this.inpPuesto.value);
        const procesador = this.inpProcesador.value.trim();
        // Obtenemos el valor numérico del input
        const memoriaStr = this.inpMemoria.value.trim();
        const memoriaNum = parseInt(memoriaStr);
        // VALIDACIÓN ESTRICTA DE RAM
        if (serialStr === '' || isNaN(labNum) || labNum < 1 || labNum > 6 || isNaN(filaNum) || filaNum < 1 || filaNum > 8 || isNaN(puestoNum) || puestoNum < 1 || puestoNum > 4 || procesador === '' || isNaN(memoriaNum) || memoriaNum <= 0) {
            if (memoriaStr === '' || isNaN(memoriaNum) || memoriaNum <= 0) {
                alert(" Error: La Memoria RAM debe ser un valor NUMÉRICO (ejemplo: 4, 8, 16) y positivo.");
            }
            else {
                alert(" Error: Completa todos los campos correctamente. Verifica los rangos de Laboratorio, Fila y Puesto.");
            }
            return null;
        }
        const memoriaConGB = memoriaNum.toString() + 'GB';
        return new CL_mComputadora(serialStr, procesador, memoriaConGB, labNum, this.inpEstado.value, filaNum, puestoNum);
    }
    obtenerDatosReporte() {
        const serial = this.lblReporteSerial.textContent;
        const descripcion = this.inpDescripcionReporte.value.trim();
        if (!serial || serial === 'N/A' || descripcion === '') {
            return null;
        }
        return {
            serial: serial,
            descripcion: descripcion
        };
    }
    solicitarContrasenaAdmin() {
        // Usamos el prompt nativo para pedir la contraseña
        return prompt("Ingrese la Contraseña");
    }
}
