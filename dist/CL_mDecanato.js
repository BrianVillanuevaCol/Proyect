import { CL_mComputadora } from './CL_mComputadora.js';
// Clase Modelo Principal: Gestiona la colección de datos
export class CL_mDecanato {
    // Al instanciar, carga los datos iniciales que vienen del archivo data.ts
    constructor(dataInicial) {
        this.computadoras = []; // Array principal de computadoras
        this.reportesActivos = []; // Array de reportes de fallas
        this.cargarDataInicial(dataInicial);
    }
    // Procesa la data cruda y crea objetos CL_mComputadora
    cargarDataInicial(dataInicial) {
        this.computadoras = dataInicial.map(data => {
            const estadoDirecto = data.estado;
            // Limpieza de datos: Quita espacios y 'gb' para normalizar la memoria
            const memoriaLimpia = (data.memoria || '').toString().replace(/gb/gi, '').trim();
            const memoriaNormalizada = memoriaLimpia + 'GB';
            return new CL_mComputadora(data.numeroSerie, data.procesador, memoriaNormalizada, data.laboratorio, estadoDirecto, // Usamos el estado directo
            data.fila, data.puesto);
        });
    }
    // Registra una nueva PC o actualiza una existente si el serial ya existe
    registrarCompt(nuevaPC) {
        const index = this.computadoras.findIndex(pc => pc.numeroSerie === nuevaPC.numeroSerie);
        if (index > -1) {
            this.computadoras[index] = nuevaPC; // Actualiza
        }
        else {
            this.computadoras.push(nuevaPC); // Registra nuevo
        }
    }
    // Busca una PC específica por su serial
    buscarPorSerial(serial) {
        return this.computadoras.find(pc => pc.numeroSerie === serial);
    }
    // Elimina una PC del array y borra su reporte asociado si tenía uno
    eliminarCompt(serial) {
        this.computadoras = this.computadoras.filter(pc => pc.numeroSerie !== serial);
        this.resolverReporte(serial);
    }
    // Devuelve una copia de todas las computadoras (para no modificar el array original directamente)
    obtenerTodas() {
        return [...this.computadoras];
    }
    // Devuelve todos los reportes activos
    obtenerReportesActivos() {
        return [...this.reportesActivos];
    }
    // Busca si existe un reporte para un serial específico
    buscarReporte(serial) {
        return this.reportesActivos.find(r => r.serial === serial);
    }
    // Agrega un reporte nuevo (solo si la PC existe y no tiene reporte previo)
    agregarReporte(nuevoReporte) {
        const pc = this.buscarPorSerial(nuevoReporte.serial);
        if (pc && !this.buscarReporte(nuevoReporte.serial)) {
            this.reportesActivos.push(nuevoReporte);
        }
    }
    // Elimina un reporte de la lista (lo marca como resuelto)
    resolverReporte(serial) {
        this.reportesActivos = this.reportesActivos.filter(r => r.serial !== serial);
    }
    // Calcula los totales para las gráficas/tarjetas de estadísticas
    generarReporte(computadoras) {
        let funcionales = 0;
        let noFuncionales = 0;
        let enReparacion = 0;
        computadoras.forEach(pc => {
            if (pc.estado === 'Funcional') {
                funcionales++;
            }
            else if (pc.estado === 'No Funcional') {
                noFuncionales++;
            }
            else if (pc.estado === 'En Reparación') {
                enReparacion++;
            }
        });
        return {
            total: computadoras.length,
            funcionales: funcionales,
            noFuncionales: noFuncionales,
            enReparacion: enReparacion,
        };
    }
}
