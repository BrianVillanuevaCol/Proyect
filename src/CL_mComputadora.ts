
export type EstadoComputadora = 'Funcional' | 'No Funcional' | 'En Reparación';

export class CL_mComputadora {
    constructor(
        public numeroSerie: string,          // Alfanumérico (Input: Text)
        public procesador: string,
        public memoria: string,
        public laboratorio: number,          // Laboratorio ahora es numérico (Input: Number)
        public estado: EstadoComputadora,
        public fila: number,                 // Fila (1-8)
        public puesto: number                // Puesto (1-4)
    ) {}

    public obtenerResumen(): string {
        return `Lab ${this.laboratorio} - Fila ${this.fila} / Puesto ${this.puesto} (Serial: ${this.numeroSerie}) - Estado: ${this.estado}`;
    }
}