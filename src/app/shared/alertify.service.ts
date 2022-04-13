import {Injectable} from "@angular/core";

declare let alertify: any

@Injectable({
    providedIn:'root'
})

export class AlertifyService {
  constructor() {
  }

  success(message: string) {
    return alertify.success(message);
  }

  error(message: string) {
    return alertify.error(message);
  }

  warning(message: string) {
    return alertify.warning(message);
  }
}
