import { CL_mDecanato } from './CL_mDecanato.js';
import { CL_vDecanato, Reporte } from './CL_vDecanato.js';
import { DATA_COMPUTADORAS_INICIAL } from './data.js'; 


const CONTRASENA_ADMIN = "UCLA.DCYT";

export class Controlador {
    private decanato: CL_mDecanato;
    private vista: CL_vDecanato;

    constructor() {
        this.decanato = new CL_mDecanato(DATA_COMPUTADORAS_INICIAL); 
        this.vista = new CL_vDecanato();
        this.setupEventListeners();
        this.updateUI(); 
    }

    private setupEventListeners() {

        //Acceso de USUARIO (Acceso libre)
        this.vista.btnAccesoUsuario.addEventListener('click', () => {
            this.vista.mostrarVista('usuario');
            // Asegura que la vista de usuario se refresque con los datos
            this.updateUI(); 
        });

        //Acceso de ADMINISTRADOR (Acceso protegido)
        this.vista.btnAccesoAdmin.addEventListener('click', () => {
            const contrasenaIngresada = this.vista.solicitarContrasenaAdmin();
            
            // Verifica la contraseña
            if (contrasenaIngresada === CONTRASENA_ADMIN) {
                this.vista.mostrarVista('admin');
                // Asegura que la vista de admin se refresque con los datos
                this.updateUI(); 
            } else if (contrasenaIngresada !== null) {
                // Si el usuario ingresó algo, pero es incorrecto
                alert(" Contraseña incorrecta. Acceso denegado.");
            }
            // Si es 'null', el usuario presionó Cancelar, no hace nada.
        });
        
            // Botones de regreso a la vista general
        this.vista.btnRegresarAdmin.addEventListener('click', () => {
            this.vista.mostrarVista('general');
        });


        this.vista.btnRegresarUsuario.addEventListener('click', () => {
            this.vista.mostrarVista('general');
        });

        //LISTENERS VISTA ADMINISTRADOR 
        this.vista.btnMostrarForm.addEventListener('click', () => {
            this.vista.abrirModal(true); // Abre en modo Creación
        });

        this.vista.btnAceptar.addEventListener('click', (e) => {
            e.preventDefault();
            this.handleAceptar();
        });

        // Lógica del botón 'Cancelar'
        this.vista.btnEliminarCancelar.addEventListener('click', (e) => {
            e.preventDefault();
            this.vista.cerrarModal(); 
        });

        // Filtros Lab/Fila (Admin)
        this.vista.filtroLaboratorio.addEventListener('change', () => {
            this.updateUI();
        });
        this.vista.filtroFila.addEventListener('change', () => {
            this.updateUI();
        });

        // Delegación de Eventos para Editar, Eliminar y VER REPORTE (Admin)
        this.vista.contenedorLista.addEventListener('click', (e) => {
            const target = e.target as HTMLElement;
            const btnEditar = target.closest('.btn-editar');
            const btnEliminar = target.closest('.btn-eliminar-item');
            const btnAdvertencia = target.closest('.btn-advertencia');

            if (btnEditar) {
                const serial = btnEditar.getAttribute('data-serial');
                if (serial) this.handleEditar(serial);
            } else if (btnEliminar) {
                const serial = btnEliminar.getAttribute('data-serial');
                if (serial) this.handleEliminar(serial); 
            } else if (btnAdvertencia) {
                const serialReporte = btnAdvertencia.getAttribute('data-serial-reporte');
                if (serialReporte) this.handleVerReporte(serialReporte);
            }
        });
        
        // Botones del modal de Ver Reporte (Admin)
        this.vista.btnCerrarVerReporte.addEventListener('click', () => {
            this.vista.cerrarModalVerReporte();
        });
        this.vista.btnResolverReporte.addEventListener('click', () => {
            const serial = this.vista.btnResolverReporte.getAttribute('data-serial');
            if (serial) {
                this.decanato.resolverReporte(serial);
                this.vista.cerrarModalVerReporte();
                this.updateUI(); 
                alert(` Reporte de PC ${serial} marcado como resuelto.`);
            }
        });

        
        // Delegación de Eventos para el botón REPORTAR
        this.vista.listaReporte.addEventListener('click', (e) => {
            const target = e.target as HTMLElement;
            const btnReportar = target.closest('.btn-reportar');
            
            if (btnReportar) {
                const serial = btnReportar.getAttribute('data-serial');
                if (serial) this.vista.abrirModalReporte(serial);
            }
        });
        
        // Botones del Modal de Reporte (Usuario)
        this.vista.btnCancelarReporte.addEventListener('click', () => {
            this.vista.cerrarModalReporte();
        });
        
        this.vista.btnAceptarReporte.addEventListener('click', (e) => {
            e.preventDefault();
            this.handleAceptarReporte();
        });
        
        // Filtros de Reporte (Disparan la actualización)
        this.vista.filtroProcesador.addEventListener('change', () => {
            this.updateResultadosUI(); 
        });
        this.vista.filtroMemoria.addEventListener('change', () => {
            this.updateResultadosUI();
        });
        this.vista.filtroEstadoReporte.addEventListener('change', () => {
            this.updateResultadosUI();
        });
    }
    

    private handleAceptarReporte() {
        const nuevoReporte = this.vista.obtenerDatosReporte();

        if (nuevoReporte === null) {
            alert("Error: Debes escribir una descripción del problema.");
            return;
        }
        
        this.decanato.agregarReporte(nuevoReporte);
        this.vista.cerrarModalReporte();
        this.updateUI(); 
        alert(`Reporte enviado para PC ${nuevoReporte.serial}.`);
    }
    
    private handleVerReporte(serial: string) {
        const reporte = this.decanato.buscarReporte(serial);
        if (reporte) {
            this.vista.abrirModalVerReporte(reporte);
        }
    }

    private handleAceptar() {
        const nuevaPC = this.vista.obtenerDatosDeInputs(); 
        if (nuevaPC === null) {
            return;
        }
        
        this.decanato.registrarCompt(nuevaPC);
        this.vista.cerrarModal();
        this.updateUI(); 
    }
    
    private handleEliminar(serial: string) {
        if (confirm(`¿Estás seguro de eliminar la computadora con Serial: ${serial}?`)) {
            this.decanato.eliminarCompt(serial);
            alert(`Computadora con serial ${serial} eliminada.`);
            this.vista.cerrarModal(); 
            this.updateUI();
        }
    }

    private handleEditar(serial: string) {
        const pc = this.decanato.buscarPorSerial(serial);
        if (pc) {
            this.vista.cargarDatosEnInputs(pc);
        }
    }

    // --- MÉTODOS DE ACTUALIZACIÓN DE UI ---

    private updateUI() {
        const filtroLabStr = this.vista.filtroLaboratorio.value;
        const filtroFilaStr = this.vista.filtroFila.value;
        
        //  Estadísticas GLOBALES
        const computadorasCompletas = this.decanato.obtenerTodas();
        const stats = this.decanato.generarReporte(computadorasCompletas); 
        this.vista.actualizarEstadisticasAdmin(stats.total, stats.funcionales, stats.noFuncionales, stats.enReparacion);
        
        //  Lista Filtrada por Lab/Fila (Vista Admin)
        let computadorasFiltradasAdmin = [...computadorasCompletas]; 
        if (filtroLabStr !== 'Todos') {
            const filtroLabNum = parseInt(filtroLabStr);
            computadorasFiltradasAdmin = computadorasFiltradasAdmin.filter(pc => pc.laboratorio === filtroLabNum);
        }
        if (filtroFilaStr !== 'Todos') {
            const filtroFilaNum = parseInt(filtroFilaStr);
            computadorasFiltradasAdmin = computadorasFiltradasAdmin.filter(pc => pc.fila === filtroFilaNum);
        }
        
        const reportesActivos = this.decanato.obtenerReportesActivos(); 
        this.vista.actualizarLista(computadorasFiltradasAdmin, reportesActivos); 
        
        this.updateResultadosUI();
    }
    
    private updateResultadosUI() {
        const filtroCPUStr = this.vista.filtroProcesador.value;
        const filtroMemoriaStr = this.vista.filtroMemoria.value;
        const filtroEstadoStr = this.vista.filtroEstadoReporte.value; 

        let computadorasFiltradasReporte = this.decanato.obtenerTodas(); 

        if (filtroCPUStr !== 'Todos') {
            computadorasFiltradasReporte = computadorasFiltradasReporte.filter(pc => 
                pc.procesador.toLowerCase() === filtroCPUStr.toLowerCase()
            );
        }
        
        if (filtroMemoriaStr !== 'Todos') {
            const filtroMemoriaNum = parseInt(filtroMemoriaStr.trim()); 
            
            if (!isNaN(filtroMemoriaNum)) {
                computadorasFiltradasReporte = computadorasFiltradasReporte.filter(pc => {
                    
                    const pcMemoriaStr = pc.memoria.replace(/gb/gi, '').trim(); 
                    const pcMemoriaNum = parseInt(pcMemoriaStr); 
                    
                    return !isNaN(pcMemoriaNum) && pcMemoriaNum === filtroMemoriaNum;
                });
            }
        }

        if (filtroEstadoStr !== 'Todos') {
            computadorasFiltradasReporte = computadorasFiltradasReporte.filter(pc => 
                pc.estado === filtroEstadoStr
            );
        }

        this.vista.actualizarListaReporte(computadorasFiltradasReporte);
    }
}