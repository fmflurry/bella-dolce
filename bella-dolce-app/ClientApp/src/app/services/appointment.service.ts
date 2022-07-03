import { Injectable } from "@angular/core";
import { Appointment } from "@app/models";
import { of } from "rxjs";

@Injectable({
providedIn: 'root'
})
export class AppointmentService {
  getAvailableAppointments() {
    // TODO : Query API


    // * for now on, fake data
    const appointments: Appointment[] = [
      new Appointment({ id: 1, day: new Date(Date.now()), times: [ new Date(Date.now())]}),
      new Appointment({ id: 2, day: new Date(Date.now()), times: [ new Date(Date.now())]}),
      new Appointment({ id: 3, day: new Date(Date.now()), times: [ new Date(Date.now())]}),
      new Appointment({ id: 4, day: new Date(Date.now()), times: [ new Date(Date.now())]}),
    ];

    return of(appointments);
  }
}
