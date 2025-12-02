import { CL_mComputadora } from './CL_mComputadora.js';
export class CL_mDecanato {
    constructor(dataInicial) {
        this.computadoras = [];
        this.reportesActivos = [];
        this.cargarDataInicial(dataInicial);
    }
    cargarDataInicial(dataInicial) {
        this.computadoras = dataInicial.map(data => {
            const estadoDirecto = data.estado;
            // La lógica de limpieza de RAM se mantiene
            const memoriaLimpia = (data.memoria || '').toString().replace(/gb/gi, '').trim();
            const memoriaNormalizada = memoriaLimpia + 'GB';
            return new CL_mComputadora(data.numeroSerie, data.procesador, memoriaNormalizada, data.laboratorio, estadoDirecto, // Usamos el estado directo
            data.fila, data.puesto);
        });
    }
    registrarCompt(nuevaPC) {
        const index = this.computadoras.findIndex(pc => pc.numeroSerie === nuevaPC.numeroSerie);
        if (index > -1) {
            this.computadoras[index] = nuevaPC;
        }
        else {
            this.computadoras.push(nuevaPC);
        }
    }
    buscarPorSerial(serial) {
        return this.computadoras.find(pc => pc.numeroSerie === serial);
    }
    eliminarCompt(serial) {
        this.computadoras = this.computadoras.filter(pc => pc.numeroSerie !== serial);
        this.resolverReporte(serial); // Elimina cualquier reporte asociado
    }
    obtenerTodas() {
        return [...this.computadoras];
    }
    obtenerReportesActivos() {
        return [...this.reportesActivos];
    }
    buscarReporte(serial) {
        return this.reportesActivos.find(r => r.serial === serial);
    }
    agregarReporte(nuevoReporte) {
        const pc = this.buscarPorSerial(nuevoReporte.serial);
        // Solo agrega si la PC existe y no hay un reporte activo para ella.
        if (pc && !this.buscarReporte(nuevoReporte.serial)) {
            this.reportesActivos.push(nuevoReporte);
        }
    }
    resolverReporte(serial) {
        this.reportesActivos = this.reportesActivos.filter(r => r.serial !== serial);
    }
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
