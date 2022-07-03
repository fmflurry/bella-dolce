import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { Appointment } from "@app/models";
import { AppointmentService } from "@app/services";

@Component({
  selector: '[app-select-rendez-vous]',
  templateUrl: './select-rendez-vous.component.html',
  styleUrls: ['./select-rendez-vous.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SelectRendezVousComponent implements OnInit {

  isLoading = true;
  availableAppointments: Appointment[] = [];
  selectedAppointmentId!: number;

  constructor(private appointmentService: AppointmentService) {}

  ngOnInit() {

    this.appointmentService.getAvailableAppointments().subscribe(appointments => {
      this.isLoading = false;
      this.availableAppointments = appointments;
    });

    // TODO : Sort appointments by most recents = descending

  }

}
