
import { CL_mComputadora, EstadoComputadora } from './CL_mComputadora.js';
import { Reporte } from './CL_vDecanato.js'; 

export interface Estadisticas {
    total: number;
    funcionales: number;
    noFuncionales: number;
    enReparacion: number;
}

export class CL_mDecanato {
    private computadoras: CL_mComputadora[] = [];
    private reportesActivos: Reporte[] = []; 

    constructor(dataInicial: any[]) {
        this.cargarDataInicial(dataInicial);
    }

    private cargarDataInicial(dataInicial: any[]): void {
        this.computadoras = dataInicial.map(data => {
            const estadoDirecto = data.estado as EstadoComputadora; 
            
            // La lógica de limpieza de RAM se mantiene
            const memoriaLimpia = (data.memoria || '').toString().replace(/gb/gi, '').trim(); 
            const memoriaNormalizada = memoriaLimpia + 'GB'; 

            return new CL_mComputadora(
                data.numeroSerie,
                data.procesador,
                memoriaNormalizada,
                data.laboratorio,
                estadoDirecto, // Usamos el estado directo
                data.fila,
                data.puesto
            );
        });
    }
    public registrarCompt(nuevaPC: CL_mComputadora): void {
        const index = this.computadoras.findIndex(pc => pc.numeroSerie === nuevaPC.numeroSerie);

        if (index > -1) {
            this.computadoras[index] = nuevaPC;
        } else {
            this.computadoras.push(nuevaPC);
        }
    }
    
    public buscarPorSerial(serial: string): CL_mComputadora | undefined {
        return this.computadoras.find(pc => pc.numeroSerie === serial);
    }

    public eliminarCompt(serial: string): void {
        this.computadoras = this.computadoras.filter(pc => pc.numeroSerie !== serial);
        this.resolverReporte(serial); // Elimina cualquier reporte asociado
    }

    public obtenerTodas(): CL_mComputadora[] {
        return [...this.computadoras];
    }
    
    public obtenerReportesActivos(): Reporte[] {
        return [...this.reportesActivos];
    }
    
    public buscarReporte(serial: string): Reporte | undefined {
        return this.reportesActivos.find(r => r.serial === serial);
    }
    
    public agregarReporte(nuevoReporte: Reporte): void {
        const pc = this.buscarPorSerial(nuevoReporte.serial);
        // Solo agrega si la PC existe y no hay un reporte activo para ella.
        if (pc && !this.buscarReporte(nuevoReporte.serial)) {
            this.reportesActivos.push(nuevoReporte);
        }
    }
    
    public resolverReporte(serial: string): void {
        this.reportesActivos = this.reportesActivos.filter(r => r.serial !== serial);
    }
    
    public generarReporte(computadoras: CL_mComputadora[]): Estadisticas {
        let funcionales = 0;
        let noFuncionales = 0;
        let enReparacion = 0;

        computadoras.forEach(pc => {
            if (pc.estado === 'Funcional') { 
                funcionales++;
            } else if (pc.estado === 'No Funcional') {
                noFuncionales++;
            } else if (pc.estado === 'En Reparación') {
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