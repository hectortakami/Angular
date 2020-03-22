# Structural Directives

Structural directives are responsible for HTML layout. They shape or reshape the DOM's structure, typically by adding, removing, or manipulating elements.

As with other directives, you apply a structural directive to a host element. The directive then does whatever it's supposed to do with that host element and its descendants.

## \*NG-IF

A structural directive that conditionally includes a template based on the value of an expression coerced to Boolean. When the expression evaluates to true, Angular renders the template provided in a then clause, and when false or null, Angular renders the template provided in an optional else clause. The default template for the else clause is blank.

## \*NG-FOR

The ngForOf directive is generally used in the shorthand form \*ngFor. In this form, the template to be rendered for each iteration is the content of an anchor element containing the directive.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.
