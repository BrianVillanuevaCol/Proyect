import { CL_mComputadora, EstadoComputadora } from './CL_mComputadora.js';
import { Reporte } from './CL_vDecanato.js'; 

// Interfaz para definir qué datos lleva el reporte estadístico
export interface Estadisticas {
    total: number;
    funcionales: number;
    noFuncionales: number;
    enReparacion: number;
}

// Clase Modelo Principal: Gestiona la colección de datos
export class CL_mDecanato {
    private computadoras: CL_mComputadora[] = []; // Array principal de computadoras
    private reportesActivos: Reporte[] = [];      // Array de reportes de fallas

    // Al instanciar, carga los datos iniciales que vienen del archivo data.ts
    constructor(dataInicial: any[]) {
        this.cargarDataInicial(dataInicial);
    }

    // Procesa la data cruda y crea objetos CL_mComputadora
    private cargarDataInicial(dataInicial: any[]): void {
        this.computadoras = dataInicial.map(data => {
            const estadoDirecto = data.estado as EstadoComputadora; 
            
            // Limpieza de datos: Quita espacios y 'gb' para normalizar la memoria
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

    // Registra una nueva PC o actualiza una existente si el serial ya existe
    public registrarCompt(nuevaPC: CL_mComputadora): void {
        const index = this.computadoras.findIndex(pc => pc.numeroSerie === nuevaPC.numeroSerie);

        if (index > -1) {
            this.computadoras[index] = nuevaPC; // Actualiza
        } else {
            this.computadoras.push(nuevaPC); // Registra nuevo
        }
    }
    
    // Busca una PC específica por su serial
    public buscarPorSerial(serial: string): CL_mComputadora | undefined {
        return this.computadoras.find(pc => pc.numeroSerie === serial);
    }

    // Elimina una PC del array y borra su reporte asociado si tenía uno
    public eliminarCompt(serial: string): void {
        this.computadoras = this.computadoras.filter(pc => pc.numeroSerie !== serial);
        this.resolverReporte(serial); 
    }

    // Devuelve una copia de todas las computadoras (para no modificar el array original directamente)
    public obtenerTodas(): CL_mComputadora[] {
        return [...this.computadoras];
    }
    
    // Devuelve todos los reportes activos
    public obtenerReportesActivos(): Reporte[] {
        return [...this.reportesActivos];
    }
    
    // Busca si existe un reporte para un serial específico
    public buscarReporte(serial: string): Reporte | undefined {
        return this.reportesActivos.find(r => r.serial === serial);
    }
    
    // Agrega un reporte nuevo (solo si la PC existe y no tiene reporte previo)
    public agregarReporte(nuevoReporte: Reporte): void {
        const pc = this.buscarPorSerial(nuevoReporte.serial);
        if (pc && !this.buscarReporte(nuevoReporte.serial)) {
            this.reportesActivos.push(nuevoReporte);
        }
    }
    
    // Elimina un reporte de la lista (lo marca como resuelto)
    public resolverReporte(serial: string): void {
        this.reportesActivos = this.reportesActivos.filter(r => r.serial !== serial);
    }
    
    // Calcula los totales para las gráficas/tarjetas de estadísticas
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