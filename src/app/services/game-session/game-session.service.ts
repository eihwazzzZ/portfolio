import { Injectable } from '@angular/core';
import { BaseService } from '../base/base.service';

@Injectable({
  providedIn: 'root'
})
export class GameSessionService extends BaseService {

  constructor() {
    super();
  }
}
