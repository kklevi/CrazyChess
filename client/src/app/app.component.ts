import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <!--The content below is only a placeholder and can be replaced.-->
    <div class="container-full">
      <alert></alert>
      <router-outlet></router-outlet>   
    </div>
  `,
  styles: []
})
export class AppComponent {
  title = 'Crazy Chess';
}
