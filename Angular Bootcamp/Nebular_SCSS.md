# SCSS Cheat Sheet

1. ##### Remove browser outline _(when any component is clicked)_

   ```css
   :focus {
     outline: 0;
   }
   ```

# Nebular

- Toastr Modals

1. Importing

   ```typescript
   import { NbToastrModule } from "@nebular/theme";
   // ...
   imports: [
     NbToastrModule.forRoot();
   ],
   // ...
   ```

2.

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
this.showToast("top-start", "danger", 3000, 'Error Toastr', "Take me with your leader");
```
