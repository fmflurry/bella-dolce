import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: 'duration',
})
export class DurationPipe implements PipeTransform {

  transform(durationMinutes: any) {
    // less than 1 hour
    if (durationMinutes < 60) {
      return `${durationMinutes}mn` ;
    }

    // 1 hour
    if (durationMinutes === 60) {
      return `1h`;
    }

    // more than 1 hour
    const hours = Math.floor(durationMinutes / 60);
    const minutes = durationMinutes % 60;
    return `${hours}h ${minutes}mn`;
  }

}