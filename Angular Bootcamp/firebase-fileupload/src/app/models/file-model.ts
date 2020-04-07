export class FileModel {
  constructor(
    public file: File,
    public fileName = file.name,
    public url?: string,
    public uploadProgress: number = 0,
    public status: boolean = false // Sets value true when the file is already uploaded
  ) {}
}
