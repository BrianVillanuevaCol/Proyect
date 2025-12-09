import { CL_mComputadora, EstadoComputadora } from './CL_mComputadora.js';

// Estructura de datos para un reporte (Serial + Descripción)
export interface Reporte {
    serial: string;
    descripcion: string;
}

// Clase Vista: Se encarga de manipular el HTML
export class CL_vDecanato {
    // --- Referencias a las Vistas Principales (Pantallas) ---
    public vistaGeneral = document.getElementById('vista-general') as HTMLDivElement;
    public vistaAdminContent = document.getElementById('vista-admin-content') as HTMLDivElement;
    public vistaUsuarioContent = document.getElementById('vista-usuario-content') as HTMLDivElement;
    
    // --- Botones de Navegación ---
    public btnAccesoAdmin = document.getElementById('btn-acceso-admin') as HTMLButtonElement;
    public btnAccesoUsuario = document.getElementById('btn-acceso-usuario') as HTMLButtonElement;
    public btnRegresarAdmin = document.getElementById('btn-regresar-admin') as HTMLButtonElement;
    public btnRegresarUsuario = document.getElementById('btn-regresar-usuario') as HTMLButtonElement;


    // --- Elementos del Modal "Ver Detalles" ---
    public modalVerDetalles = document.getElementById('modal-ver-detalles') as HTMLDivElement;
    public btnCerrarVerDetalles = document.getElementById('btn-cerrar-ver-detalles') as HTMLButtonElement;
    public lblDetallesSerial = document.getElementById('lbl-detalles-serial-modal') as HTMLSpanElement;
    public lblDetallesProcesador = document.getElementById('lbl-detalles-procesador') as HTMLSpanElement;
    public lblDetallesMemoria = document.getElementById('lbl-detalles-memoria') as HTMLSpanElement;
    public lblDetallesLaboratorio = document.getElementById('lbl-detalles-laboratorio') as HTMLSpanElement;
    public lblDetallesUbicacion = document.getElementById('lbl-detalles-ubicacion') as HTMLSpanElement;
    public lblDetallesEstado = document.getElementById('lbl-detalles-estado') as HTMLSpanElement;


    // Método para llenar y mostrar el modal de detalles
    public abrirModalDetalles(pc: CL_mComputadora): void {
        this.lblDetallesSerial.textContent = pc.numeroSerie;
        this.lblDetallesProcesador.textContent = pc.procesador;
        this.lblDetallesMemoria.textContent = pc.memoria;
        this.lblDetallesLaboratorio.textContent = pc.laboratorio.toString();
        this.lblDetallesUbicacion.textContent = `${pc.fila} / ${pc.puesto}`;
        this.lblDetallesEstado.textContent = pc.estado;

        // Asigna clase CSS dinámica según el estado para el color
        this.lblDetallesEstado.className = `estado-${pc.estado.replace(/ /g, '-').toLowerCase()}`;

        this.modalVerDetalles.classList.remove('hidden');
    }

    public cerrarModalDetalles(): void {
        this.modalVerDetalles.classList.add('hidden');
    }

    // Método para cambiar entre vistas (General, Admin, Usuario)
    public mostrarVista(vista: 'general' | 'admin' | 'usuario') {
        this.vistaGeneral.style.display = 'none';
        this.vistaAdminContent.style.display = 'none';
        this.vistaUsuarioContent.style.display = 'none';

        if (vista === 'general') {
            this.vistaGeneral.style.display = 'block';
        } else if (vista === 'admin') {
            this.vistaAdminContent.style.display = 'block';
        } else if (vista === 'usuario') {
            this.vistaUsuarioContent.style.display = 'block';
        }
    }

    // --- Referencias de Estadísticas (Admin) ---
    public lblTotalAdmin = document.getElementById('lbl-total-admin') as HTMLSpanElement; 
    public lblFuncionalAdmin = document.getElementById('lbl-funcional-admin') as HTMLSpanElement; 
    public lblNoFuncionalAdmin = document.getElementById('lbl-no-funcional-admin') as HTMLSpanElement; 
    public lblReparacionAdmin = document.getElementById('lbl-reparacion-admin') as HTMLSpanElement; 

    // --- Referencias de Filtros y Lista Admin ---
    public contenedorLista = document.getElementById('lista-computadoras') as HTMLDivElement;
    public filtroLaboratorio = document.getElementById('filtro-laboratorio') as HTMLSelectElement; 
    public filtroFila = document.getElementById('filtro-fila') as HTMLSelectElement; 
    
    // --- Referencias de Filtros y Lista Usuario ---
    public filtroProcesador = document.getElementById('filtro-procesador') as HTMLSelectElement; 
    public filtroMemoria = document.getElementById('filtro-memoria') as HTMLSelectElement; 
    public filtroEstadoReporte = document.getElementById('filtro-estado-reporte') as HTMLSelectElement; 
    
    public filtroLaboratorioUser = document.getElementById('filtro-laboratorio-user') as HTMLSelectElement;
    public filtroFilaUser = document.getElementById('filtro-fila-user') as HTMLSelectElement;
    
    public lblTotalReporte = document.getElementById('lbl-total-reporte') as HTMLSpanElement;
    public listaReporte = document.getElementById('lista-reporte') as HTMLDivElement;
    
    // --- Referencias del Modal de Formulario (Crear/Editar) ---
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

    public modoEdicion: boolean = false; // Bandera para saber si estamos editando o creando
    
    // --- Referencias del Modal Reportar (Usuario) ---
    public modalReporte = document.getElementById('modal-reporte') as HTMLDivElement;
    public lblReporteSerial = document.getElementById('lbl-reporte-serial') as HTMLSpanElement; 
    public inpDescripcionReporte = document.getElementById('inp-descripcion-reporte') as HTMLTextAreaElement;
    public btnAceptarReporte = document.getElementById('btn-aceptar-reporte') as HTMLButtonElement;
    public btnCancelarReporte = document.getElementById('btn-cancelar-reporte') as HTMLButtonElement;
    
    // --- Referencias del Modal Ver Reporte (Admin) ---
    public modalVerReporte = document.getElementById('modal-ver-reporte') as HTMLDivElement;
    public lblReporteDetallesSerial = document.getElementById('lbl-reporte-detalles-serial') as HTMLSpanElement;
    public lblReporteDetallesDesc = document.getElementById('lbl-reporte-detalles-desc') as HTMLSpanElement;
    public btnCerrarVerReporte = document.getElementById('btn-cerrar-ver-reporte') as HTMLButtonElement;
    public btnResolverReporte = document.getElementById('btn-resolver-reporte') as HTMLButtonElement;
    
    // Muestra el modal de formulario (limpia inputs si es creación)
    public abrirModal(esCreacion: boolean) {
        this.modoEdicion = !esCreacion;
        this.modal.classList.remove('hidden');
        this.inpSerial.disabled = !esCreacion; // Deshabilita serial si es edición
        
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
    
    // Métodos para el modal de reportar (Usuario)
    public abrirModalReporte(serial: string) {
        this.lblReporteSerial.textContent = serial; 
        this.inpDescripcionReporte.value = ''; 
        this.modalReporte.classList.remove('hidden');
    }

    public cerrarModalReporte() {
        this.modalReporte.classList.add('hidden');
        this.inpDescripcionReporte.value = '';
    }
    
    // Métodos para el modal de ver reporte (Admin)
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

    // Actualiza los números en las tarjetas de estadísticas (Admin)
    public actualizarEstadisticasAdmin(total: number, funcionales: number, noFuncionales: number, enReparacion: number): void {
        this.lblTotalAdmin.textContent = total.toString();
        this.lblFuncionalAdmin.textContent = funcionales.toString();
        this.lblNoFuncionalAdmin.textContent = noFuncionales.toString(); 
        this.lblReparacionAdmin.textContent = enReparacion.toString();
    }
    
    // Genera la tabla HTML para el Administrador
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
            
            // Icono de alerta si hay reporte
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

            // Estructura de la fila (con data-label para responsivo en CSS)
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
    
    // Genera la tabla HTML para el Usuario
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

    // Pre-carga los datos de una PC en el formulario para editar
    public cargarDatosEnInputs(pc: CL_mComputadora) {
        this.modoEdicion = true;
        this.abrirModal(false); 
        
        this.inpSerial.value = pc.numeroSerie; 
        this.inpSerial.disabled = true; // No se puede editar el serial
        this.inpProcesador.value = pc.procesador;
        
        const memoriaNum = pc.memoria.replace(/gb/gi, '').trim();
        this.inpMemoria.value = memoriaNum; 
        
        this.inpLaboratorio.value = pc.laboratorio.toString(); 
        
        const estadoValido = ['Funcional', 'No Funcional', 'En Reparación'].includes(pc.estado) ? pc.estado : 'Funcional';
        this.inpEstado.value = estadoValido; 
        
        this.inpFila.value = pc.fila.toString();
        this.inpPuesto.value = pc.puesto.toString();
    }

    // Lee y valida los datos del formulario de creación/edición
    public obtenerDatosDeInputs(): CL_mComputadora | null {
        const serialStr = this.inpSerial.value.trim();
        const labNum = parseInt(this.inpLaboratorio.value);
        const filaNum = parseInt(this.inpFila.value);
        const puestoNum = parseInt(this.inpPuesto.value);
        const procesador = this.inpProcesador.value.trim();
        
        const memoriaStr = this.inpMemoria.value.trim(); 
        const memoriaNum = parseInt(memoriaStr);

        // VALIDACIÓN ESTRICTA: Verifica vacíos y rangos numéricos
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
    
    // Obtiene datos del formulario de reporte
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
        return prompt("Ingrese la Contraseña");
    }
}