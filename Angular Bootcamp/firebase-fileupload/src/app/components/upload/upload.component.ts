import { Component } from '@angular/core';
import { FileModel } from 'src/app/models/file-model';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent {
  hoverDropzone = false;
  uploadedFiles: FileModel[] = [];

  constructor(private firebase: FirebaseService) {}

  clearLoading() {
    this.uploadedFiles = [];
  }

  upload2Firebase() {
    if (this.uploadedFiles.length > 0) {
      this.firebase.upload2Firestorage(this.uploadedFiles);
    }
  }
}
