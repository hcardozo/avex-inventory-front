import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ETipoAlerta } from '../../enums/tipo-alerta.enum';

@Injectable()
export class AlertaService {

  constructor(public messageService: MessageService) { }


  public mostrarNotificacion(tipo: ETipoAlerta, titulo: string, descripcion: string): void {
    this.messageService.add({ severity: tipo, summary: titulo, detail: descripcion });
  }

  public ocultarNotificacion(): void {
    this.messageService.clear();

  }
}

