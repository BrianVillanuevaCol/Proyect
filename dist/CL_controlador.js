import { CL_mDecanato } from './CL_mDecanato.js';
import { CL_vDecanato } from './CL_vDecanato.js';
import { DATA_COMPUTADORAS_INICIAL } from './data.js';
const CONTRASENA_ADMIN = "UCLA.DCYT"; // Contraseña hardcodeada
export class Controlador {
    constructor() {
        this.decanato = new CL_mDecanato(DATA_COMPUTADORAS_INICIAL);
        this.vista = new CL_vDecanato();
        this.setupEventListeners();
        this.updateUI(); // Carga inicial de la interfaz
    }
    // Configura todos los "listeners" (qué pasa cuando haces clic o cambias algo)
    setupEventListeners() {
        // Navegación: Ir a vista Usuario
        this.vista.btnAccesoUsuario.addEventListener('click', () => {
            this.vista.mostrarVista('usuario');
            this.updateUI();
        });
        // Navegación: Ir a vista Admin (pide contraseña)
        this.vista.btnAccesoAdmin.addEventListener('click', () => {
            const contrasenaIngresada = this.vista.solicitarContrasenaAdmin();
            if (contrasenaIngresada === CONTRASENA_ADMIN) {
                this.vista.mostrarVista('admin');
                this.updateUI();
            }
            else if (contrasenaIngresada !== null) {
                alert(" Contraseña incorrecta. Acceso denegado.");
            }
        });
        // Botones de "Regresar"
        this.vista.btnRegresarAdmin.addEventListener('click', () => {
            this.vista.mostrarVista('general');
        });
        this.vista.btnRegresarUsuario.addEventListener('click', () => {
            this.vista.mostrarVista('general');
        });
        // Abrir modal para crear nueva PC
        this.vista.btnMostrarForm.addEventListener('click', () => {
            this.vista.abrirModal(true);
        });
        // Guardar cambios (Crear o Editar PC)
        this.vista.btnAceptar.addEventListener('click', (e) => {
            e.preventDefault();
            this.handleAceptar();
        });
        // Cancelar modal formulario
        this.vista.btnEliminarCancelar.addEventListener('click', (e) => {
            e.preventDefault();
            this.vista.cerrarModal();
        });
        // Filtros de la vista de Administrador
        this.vista.filtroLaboratorio.addEventListener('change', () => {
            this.updateUI();
        });
        this.vista.filtroFila.addEventListener('change', () => {
            this.updateUI();
        });
        // Delegación de eventos para la lista de Administrador (Editar, Eliminar, Ver Reporte)
        this.vista.contenedorLista.addEventListener('click', (e) => {
            const target = e.target;
            const btnEditar = target.closest('.btn-editar');
            const btnEliminar = target.closest('.btn-eliminar-item');
            const btnAdvertencia = target.closest('.btn-advertencia');
            if (btnEditar) {
                const serial = btnEditar.getAttribute('data-serial');
                if (serial)
                    this.handleEditar(serial);
            }
            else if (btnEliminar) {
                const serial = btnEliminar.getAttribute('data-serial');
                if (serial)
                    this.handleEliminar(serial);
            }
            else if (btnAdvertencia) {
                const serialReporte = btnAdvertencia.getAttribute('data-serial-reporte');
                if (serialReporte)
                    this.handleVerReporte(serialReporte);
            }
        });
        // Manejo del modal de Ver Reporte (Admin)
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
        // Cerrar modal de detalles
        this.vista.btnCerrarVerDetalles.addEventListener('click', () => {
            this.vista.cerrarModalDetalles();
        });
        // Evento para abrir detalles desde la lista de Usuario
        this.vista.listaReporte.addEventListener('click', (e) => {
            const target = e.target;
            if (target.classList.contains('btn-ver-detalles')) {
                const serial = target.dataset.serial;
                if (serial) {
                    this.abrirModalVerDetalles(serial);
                }
            }
        });
        // Evento para reportar falla desde la lista de Usuario
        this.vista.listaReporte.addEventListener('click', (e) => {
            const target = e.target;
            const btnReportar = target.closest('.btn-reportar');
            if (btnReportar) {
                const serial = btnReportar.getAttribute('data-serial');
                if (serial)
                    this.vista.abrirModalReporte(serial);
            }
        });
        // Manejo del modal de Reportar (Usuario)
        this.vista.btnCancelarReporte.addEventListener('click', () => {
            this.vista.cerrarModalReporte();
        });
        this.vista.btnAceptarReporte.addEventListener('click', (e) => {
            e.preventDefault();
            this.handleAceptarReporte();
        });
        // Listeners para todos los filtros de la vista Usuario
        this.vista.filtroProcesador.addEventListener('change', () => {
            this.updateResultadosUI();
        });
        this.vista.filtroMemoria.addEventListener('change', () => {
            this.updateResultadosUI();
        });
        this.vista.filtroEstadoReporte.addEventListener('change', () => {
            this.updateResultadosUI();
        });
        this.vista.filtroLaboratorioUser.addEventListener('change', () => {
            this.updateResultadosUI();
        });
        this.vista.filtroFilaUser.addEventListener('change', () => {
            this.updateResultadosUI();
        });
    }
    // Procesa el envío de un reporte por parte del usuario
    handleAceptarReporte() {
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
    // Admin ve un reporte existente
    handleVerReporte(serial) {
        const reporte = this.decanato.buscarReporte(serial);
        if (reporte) {
            this.vista.abrirModalVerReporte(reporte);
        }
    }
    // Admin guarda una PC (nueva o editada)
    handleAceptar() {
        const nuevaPC = this.vista.obtenerDatosDeInputs();
        if (nuevaPC === null) {
            return;
        }
        this.decanato.registrarCompt(nuevaPC);
        this.vista.cerrarModal();
        this.updateUI();
    }
    // Admin elimina una PC
    handleEliminar(serial) {
        if (confirm(`¿Estás seguro de eliminar la computadora con Serial: ${serial}?`)) {
            this.decanato.eliminarCompt(serial);
            alert(`Computadora con serial ${serial} eliminada.`);
            this.vista.cerrarModal();
            this.updateUI();
        }
    }
    // Prepara el formulario para editar
    handleEditar(serial) {
        const pc = this.decanato.buscarPorSerial(serial);
        if (pc) {
            this.vista.cargarDatosEnInputs(pc);
        }
    }
    // Abre el modal con detalles completos de la PC
    abrirModalVerDetalles(serial) {
        const pcEncontrada = this.decanato.buscarPorSerial(serial);
        if (pcEncontrada) {
            this.vista.abrirModalDetalles(pcEncontrada);
        }
        else {
            console.error(`Error: Computadora con serial ${serial} no encontrada.`);
        }
    }
    // Actualiza la UI de Administrador (lista principal y estadísticas)
    updateUI() {
        const filtroLabStr = this.vista.filtroLaboratorio.value;
        const filtroFilaStr = this.vista.filtroFila.value;
        const computadorasCompletas = this.decanato.obtenerTodas();
        const stats = this.decanato.generarReporte(computadorasCompletas);
        this.vista.actualizarEstadisticasAdmin(stats.total, stats.funcionales, stats.noFuncionales, stats.enReparacion);
        // Filtros básicos de Admin (Lab y Fila)
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
        // También actualiza la vista de usuario por si acaso
        this.updateResultadosUI();
    }
    // Actualiza la UI de Usuario (lista con filtros avanzados)
    updateResultadosUI() {
        const filtroCPUStr = this.vista.filtroProcesador.value;
        const filtroMemoriaStr = this.vista.filtroMemoria.value;
        const filtroEstadoStr = this.vista.filtroEstadoReporte.value;
        const filtroLabStr = this.vista.filtroLaboratorioUser.value;
        const filtroFilaStr = this.vista.filtroFilaUser.value;
        let computadorasFiltradasReporte = this.decanato.obtenerTodas();
        // Lógica de filtrado en cascada
        if (filtroLabStr !== 'Todos') {
            const filtroLabNum = parseInt(filtroLabStr.trim());
            if (!isNaN(filtroLabNum)) {
                computadorasFiltradasReporte = computadorasFiltradasReporte.filter(pc => pc.laboratorio === filtroLabNum);
            }
        }
        if (filtroFilaStr !== 'Todos') {
            const filtroFilaNum = parseInt(filtroFilaStr.trim());
            if (!isNaN(filtroFilaNum)) {
                computadorasFiltradasReporte = computadorasFiltradasReporte.filter(pc => pc.fila === filtroFilaNum);
            }
        }
        if (filtroCPUStr !== 'Todos') {
            computadorasFiltradasReporte = computadorasFiltradasReporte.filter(pc => pc.procesador.toLowerCase() === filtroCPUStr.toLowerCase());
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
            computadorasFiltradasReporte = computadorasFiltradasReporte.filter(pc => pc.estado.toLowerCase() === filtroEstadoStr.toLowerCase());
        }
        this.vista.actualizarListaReporte(computadorasFiltradasReporte);
    }
}
