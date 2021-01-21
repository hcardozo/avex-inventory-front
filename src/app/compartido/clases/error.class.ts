import { MessageService } from "primeng/api";
import { ETipoAlerta } from "../enums/tipo-alerta.enum";
import { AlertaService } from "../services/alerta/alerta.service";

export class ErrorClass {
    constructor(
        public alertService: AlertaService
    ) {}

    public informarError(tipo: ETipoAlerta, titulo: string, descripcion: string): void {
        this.alertService.mostrarNotificacion(tipo,titulo,descripcion);
        setTimeout(()=> {
            this.alertService.ocultarNotificacion();
        }, 3000);
    }
}
