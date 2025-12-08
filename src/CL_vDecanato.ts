import { CL_mComputadora, EstadoComputadora } from './CL_mComputadora.js';

export interface Reporte {
    serial: string;
    descripcion: string;
}

export class CL_vDecanato {
    // Referencias de Estadísticas
    public vistaGeneral = document.getElementById('vista-general') as HTMLDivElement;
    public vistaAdminContent = document.getElementById('vista-admin-content') as HTMLDivElement;
    public vistaUsuarioContent = document.getElementById('vista-usuario-content') as HTMLDivElement;
    
    public btnAccesoAdmin = document.getElementById('btn-acceso-admin') as HTMLButtonElement;
    public btnAccesoUsuario = document.getElementById('btn-acceso-usuario') as HTMLButtonElement;
    public btnRegresarAdmin = document.getElementById('btn-regresar-admin') as HTMLButtonElement;
    public btnRegresarUsuario = document.getElementById('btn-regresar-usuario') as HTMLButtonElement;



    // --- Referencias de Modal Ver Detalles (Nuevo) ---
    public modalVerDetalles = document.getElementById('modal-ver-detalles') as HTMLDivElement;
    public btnCerrarVerDetalles = document.getElementById('btn-cerrar-ver-detalles') as HTMLButtonElement;
    public lblDetallesSerial = document.getElementById('lbl-detalles-serial-modal') as HTMLSpanElement;
    public lblDetallesProcesador = document.getElementById('lbl-detalles-procesador') as HTMLSpanElement;
    public lblDetallesMemoria = document.getElementById('lbl-detalles-memoria') as HTMLSpanElement;
    public lblDetallesLaboratorio = document.getElementById('lbl-detalles-laboratorio') as HTMLSpanElement;
    public lblDetallesUbicacion = document.getElementById('lbl-detalles-ubicacion') as HTMLSpanElement;
    public lblDetallesEstado = document.getElementById('lbl-detalles-estado') as HTMLSpanElement;


    public abrirModalDetalles(pc: CL_mComputadora): void {
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

    public cerrarModalDetalles(): void {
        this.modalVerDetalles.classList.add('hidden');
    }

    public mostrarVista(vista: 'general' | 'admin' | 'usuario') {
        // Ocultar todas
        this.vistaGeneral.style.display = 'none';
        this.vistaAdminContent.style.display = 'none';
        this.vistaUsuarioContent.style.display = 'none';

        // Mostrar la seleccionada
        if (vista === 'general') {
            this.vistaGeneral.style.display = 'block';
        } else if (vista === 'admin') {
            this.vistaAdminContent.style.display = 'block';
        } else if (vista === 'usuario') {
            this.vistaUsuarioContent.style.display = 'block';
        }
    }
    public lblTotalAdmin = document.getElementById('lbl-total-admin') as HTMLSpanElement; 
    public lblFuncionalAdmin = document.getElementById('lbl-funcional-admin') as HTMLSpanElement; 
    public lblNoFuncionalAdmin = document.getElementById('lbl-no-funcional-admin') as HTMLSpanElement; 
    public lblReparacionAdmin = document.getElementById('lbl-reparacion-admin') as HTMLSpanElement; 

    // Referencias de Contenedores y Filtros (Admin)
    public contenedorLista = document.getElementById('lista-computadoras') as HTMLDivElement;
    public filtroLaboratorio = document.getElementById('filtro-laboratorio') as HTMLSelectElement; 
    public filtroFila = document.getElementById('filtro-fila') as HTMLSelectElement; 
    
    // Referencias para la Sección de Resultados/Consulta
    public filtroProcesador = document.getElementById('filtro-procesador') as HTMLSelectElement; 
    public filtroMemoria = document.getElementById('filtro-memoria') as HTMLSelectElement; 
    public filtroEstadoReporte = document.getElementById('filtro-estado-reporte') as HTMLSelectElement; 
    
    // *** NUEVAS REFERENCIAS PARA FILTROS DE UBICACIÓN EN VISTA USUARIO ***
    public filtroLaboratorioUser = document.getElementById('filtro-laboratorio-user') as HTMLSelectElement;
    public filtroFilaUser = document.getElementById('filtro-fila-user') as HTMLSelectElement;
    
    public lblTotalReporte = document.getElementById('lbl-total-reporte') as HTMLSpanElement;
    public listaReporte = document.getElementById('lista-reporte') as HTMLDivElement;
    
    // --- Referencias de Modal CRUD (Admin) ---
    public modal = document.getElementById('modal-formulario') as HTMLDivElement;
    public inpSerial = document.getElementById('inp-serial') as HTMLInputElement;
    public inpProcesador = document.getElementById('inp-procesador') as HTMLInputElement;
    public inpMemoria = document.getElementById('inp-memoria') as HTMLInputElement;
    public inpLaboratorio = document.getElementById('inp-laboratorio') as HTMLInputElement; 
    public inpEstado = document.getElementById('inp-estado') as HTMLSelectElement;
    public inpFila = document.getElementById('inp-fila') as HTMLInputElement;
    public inpPuesto = document.getElementById('inp-puesto') as HTMLInputElement;

    public btnMostrarForm = document.getElementById('btn-mostrar-form') as HTMLButtonElement;
    public btnAceptar = document.getElementById('btn-aceptar') as HTMLButtonElement;
    public btnEliminarCancelar = document.getElementById('btn-eliminar-cancelar') as HTMLButtonElement; 

    public modoEdicion: boolean = false;
    
    // --- Referencias de Modal de Reporte (Usuario) ---
    public modalReporte = document.getElementById('modal-reporte') as HTMLDivElement;
    public lblReporteSerial = document.getElementById('lbl-reporte-serial') as HTMLSpanElement; 
    public inpDescripcionReporte = document.getElementById('inp-descripcion-reporte') as HTMLTextAreaElement;
    public btnAceptarReporte = document.getElementById('btn-aceptar-reporte') as HTMLButtonElement;
    public btnCancelarReporte = document.getElementById('btn-cancelar-reporte') as HTMLButtonElement;
    
    // --- Referencias de Modal Ver Reporte (Admin) ---
    public modalVerReporte = document.getElementById('modal-ver-reporte') as HTMLDivElement;
    public lblReporteDetallesSerial = document.getElementById('lbl-reporte-detalles-serial') as HTMLSpanElement;
    public lblReporteDetallesDesc = document.getElementById('lbl-reporte-detalles-desc') as HTMLSpanElement;
    public btnCerrarVerReporte = document.getElementById('btn-cerrar-ver-reporte') as HTMLButtonElement;
    public btnResolverReporte = document.getElementById('btn-resolver-reporte') as HTMLButtonElement;
    
    public abrirModal(esCreacion: boolean) {
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

    public cerrarModal() {
        this.modal.classList.add('hidden');
        this.limpiarInputs();
    }
    
    public abrirModalReporte(serial: string) {
        this.lblReporteSerial.textContent = serial; 
        this.inpDescripcionReporte.value = ''; 
        this.modalReporte.classList.remove('hidden');
    }

    public cerrarModalReporte() {
        this.modalReporte.classList.add('hidden');
        this.inpDescripcionReporte.value = '';
    }
    
    public abrirModalVerReporte(reporte: Reporte) {
        this.lblReporteDetallesSerial.textContent = reporte.serial;
        this.lblReporteDetallesDesc.textContent = reporte.descripcion;
        this.btnResolverReporte.setAttribute('data-serial', reporte.serial); 
        this.modalVerReporte.classList.remove('hidden');
    }

    public cerrarModalVerReporte() {
        this.modalVerReporte.classList.add('hidden');
    }

    private limpiarInputs() {
        this.inpSerial.value = '';
        this.inpProcesador.value = '';
        this.inpMemoria.value = '';
        this.inpLaboratorio.value = '';
        this.inpEstado.value = 'Funcional'; 
        this.inpFila.value = '';
        this.inpPuesto.value = '';
    }

    public actualizarEstadisticasAdmin(total: number, funcionales: number, noFuncionales: number, enReparacion: number): void {
        this.lblTotalAdmin.textContent = total.toString();
        this.lblFuncionalAdmin.textContent = funcionales.toString();
        this.lblNoFuncionalAdmin.textContent = noFuncionales.toString(); 
        this.lblReparacionAdmin.textContent = enReparacion.toString();
    }
    
    public actualizarLista(computadoras: CL_mComputadora[], reportesActivos: Reporte[]): void {
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
                <div class="item-campo">Lab ${pc.laboratorio}</div>
                <div class="item-campo">${pc.numeroSerie}</div> 
                <div class="item-campo">${pc.fila}</div>
                <div class="item-campo">${pc.puesto}</div>
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
    
    public actualizarListaReporte(computadoras: CL_mComputadora[]): void {
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
                <div class="item-campo">Lab ${pc.laboratorio}</div>
                <div class="item-campo">${pc.numeroSerie}</div>
                <div class="item-campo">${pc.fila}</div>
                <div class="item-campo">${pc.puesto}</div>
                
                <div class="acciones-item">
                <button class="btn-reportar btn-info" data-serial="${pc.numeroSerie}">Reportar</button>
                <button class="btn-secondary btn-ver-detalles" data-serial="${pc.numeroSerie}">Ver Detalles</button>
                </div>
            `;

            this.listaReporte.appendChild(div);
        });
    }

    public cargarDatosEnInputs(pc: CL_mComputadora) {
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

    public obtenerDatosDeInputs(): CL_mComputadora | null {
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
            } else {
                 alert(" Error: Completa todos los campos correctamente. Verifica los rangos de Laboratorio, Fila y Puesto.");
            }
            return null;
        }

        const memoriaConGB = memoriaNum.toString() + 'GB';

        return new CL_mComputadora(
            serialStr,
            procesador,
            memoriaConGB, 
            labNum,
            this.inpEstado.value as EstadoComputadora,
            filaNum,
            puestoNum
        );
    }
    
    public obtenerDatosReporte(): Reporte | null {
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

    public solicitarContrasenaAdmin(): string | null {
        // Usamos el prompt nativo para pedir la contraseña
        return prompt("Ingrese la Contraseña");
    }
}