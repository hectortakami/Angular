import {
  Directive,
  EventEmitter,
  HostListener,
  Output,
  Input
} from '@angular/core';
import { FileModel } from '../models/file-model';

@Directive({
  selector: '[appNgDropFiles]'
})
export class NgDropFilesDirective {
  @Input() droppedFiles: FileModel[] = [];
  @Output() mouseHover: EventEmitter<boolean> = new EventEmitter();

  constructor() {}

  @HostListener('dragover', ['$event'])
  public onDragEnter(event: any) {
    this._preventBrowser2Open(event);
    this.mouseHover.emit(true);
  }

  @HostListener('dragleave', ['$event'])
  public onDragExit(event: any) {
    this.mouseHover.emit(false);
  }

  @HostListener('drop', ['$event'])
  public onDrop(event: any) {
    const transference = this._getTransference(event);
    if (transference) {
      this._extractFiles(transference.files);
      this._preventBrowser2Open(event);
      this.mouseHover.emit(false);
    }
  }

  private _getTransference(event: any) {
    return event.dataTransfer
      ? event.dataTransfer
      : event.originalEvent.dataTransfer;
  }

  private _extractFiles(archivosLista: FileList) {
    for (const propiedad in Object.getOwnPropertyNames(archivosLista)) {
      const archivoTemporal = archivosLista[propiedad];

      if (this._validateFile(archivoTemporal)) {
        const nuevoArchivo = new FileModel(archivoTemporal);
        this.droppedFiles.push(nuevoArchivo);
      }
    }
    console.log(this.droppedFiles);
  }

  // Validaciones
  private _validateFile(archivo: File): boolean {
    if (
      !this._preventDuplicateFiles(archivo.name) &&
      this._preventFileType(archivo.type)
    ) {
      return true;
    } else {
      return false;
    }
  }

  private _preventBrowser2Open(event) {
    event.preventDefault();
    event.stopPropagation();
  }

  private _preventDuplicateFiles(nombreArchivo: string): boolean {
    for (const archivo of this.droppedFiles) {
      if (archivo.fileName === nombreArchivo) {
        console.log('El archivo ' + nombreArchivo + ' ya esta agregado');
        return true;
      }
    }
    return false;
  }

  private _preventFileType(fileType: string): boolean {
    if (fileType === '' || fileType === undefined) {
      return false;
    } else {
      // Define allowed doctype file types
      if (fileType.startsWith('image')) {
        return true;
      } else {
        return false;
      }
    }
  }
}
