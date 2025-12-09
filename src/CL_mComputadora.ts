export type EstadoComputadora = 'Funcional' | 'No Funcional' | 'En Reparación';

// Clase Modelo que representa una sola computadora
export class CL_mComputadora {
    constructor(
        public numeroSerie: string,          // Identificador único
        public procesador: string,           // Ej: i5, i7
        public memoria: string,              // Ej: 4GB, 8GB
        public laboratorio: number,          // Número de laboratorio (1-6)
        public estado: EstadoComputadora,    // Estado actual (usando el tipo definido arriba)
        public fila: number,                 // Ubicación física: Fila
        public puesto: number                // Ubicación física: Puesto
    ) {}

    // Método auxiliar para obtener un texto resumen de la PC (útil para logs o debugging)
    public obtenerResumen(): string {
        return `Lab ${this.laboratorio} - Fila ${this.fila} / Puesto ${this.puesto} (Serial: ${this.numeroSerie}) - Estado: ${this.estado}`;
    }
}