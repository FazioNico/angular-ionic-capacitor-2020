import { Component } from '@angular/core';
import { Motion, Plugins } from '@capacitor/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'CapacitorDemo';
  alpha: number = 0;
  datas: any;
  private _datas$: BehaviorSubject<any> = new BehaviorSubject(null);
  datas$: Observable<any> = this._datas$.asObservable().pipe(
    // manipulation de donnée avec les opérateur RxJs
    // map(datas =>  {
    //   return {
    //     ...datas,
    //     alpha: datas?.alpha + '°'
    //   }
    // })
  );

  async runMotion(btnOn: HTMLIonButtonElement, btnOff: HTMLIonButtonElement) {
    console.log(btnOff);
    btnOn.disabled = true;
    btnOff.disabled = false;
    Motion.addListener('orientation', (event) => {
      console.log('-->', event);
      this.alpha = event?.alpha;
      const data = {
        alpha: event?.alpha,
        beta: event?.beta,
        gamma: event?.gamma
      }
      this.datas = data;
      this._datas$.next(data);
    });

  }

  stopMotion(btnOn: HTMLIonButtonElement, btnOff: HTMLIonButtonElement) {
    btnOn.disabled = false;
    btnOff.disabled = true;
    Motion.removeAllListeners();
  }
}
