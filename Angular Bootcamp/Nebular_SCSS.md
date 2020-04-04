# SCSS Cheat Sheet

1. ##### Remove browser outline _(when any component is clicked)_

   ```css
   :focus {
     outline: 0;
   }
   ```

# Nebular

- Toastr Modal

  1. `NbToastrModule` import

     _app.module.ts_

     ```typescript
     import { NbToastrModule } from "@nebular/theme";
     // ...
     imports: [
       NbToastrModule.forRoot(),
     ],
     ```

  2. Toastr Usage

     ```typescript
     // Declaring Toastr
     showToast(position, status, duration, title: string, msg: string) {
         // 1. Message, 2. Title, 3. Configuration
         this.toastrService.show(`${msg}`, `${title}`,
         {
           // All configuration goes here
           position, // '[top|bottom]-[start|end|left|right]',
           status,   // 'basic', 'primary', 'success', 'info, 'warning', 'danger'
           duration, // In milliseconds
           limit: <number>  // Limits the number of notifications show in page
         });
       }

     // Calling Toastr to render
     this.showToast("top-start", "danger", 3000, 'Error Toastr', "Take me    with       your leader");
     ```

- Dialog Modal

  1. `NbDialogModule` import

     _app.module.ts_

     ```typescript
     import { NbDialogModule } from "@nebular/theme";
     // ...
     imports: [
       NbDialogModule.forRoot(),
     ],
     ```

  2. Dialog Usage

     - Dialog Component (shown when parent calls to open)

       _dialog.component.ts_

       ```typescript
       import { NbDialogRef } from '@nebular/theme';
       // ...
       export class DialogComponent {
         constructor(protected dialog: NbDialogRef<DialogComponent>) {}

         onCancel() {
           // Do nothing when the dialog window is closed
           this.dialog.close();
         }

         onClose() {
           this.dialog
             .close
             // Here goes the data object to be send to the parent component
             ();
         }
       }
       ```

     - Caller Component (asks for the dialog component to be displayed)

     ```typescript
     import { NbDialogService } from '@nebular/theme';
     import { DialogComponent } from '<PATH_TO_dialog.component.ts>';
     // ...
     export class CallerComponent {
       constructor(private dialogService: NbDialogService) {}

       openDialog() {
         this.dialogService
           // Calls the DialogComponent to be displayed as modal window
           .open(DialogComponent)
           .onClose.subscribe(dialogResponse => {
             // Here the data from DialogComponent 'onClose()' is received
           });
       }
     }
     ```
