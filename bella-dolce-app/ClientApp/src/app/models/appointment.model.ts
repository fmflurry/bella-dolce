export class Appointment {

  id: number;
  day: string;
  times: string[];

  constructor({...params}: { id: number, day: Date, times: Date[]}) {
    this.id = params.id;
    this.day = this.getDay(params.day);
    this.times = params.times?.map(time => this.getTime(time));
  }

  private getDay(date: Date) {
    const d = new Date(date);
    

    // format day daynunmber month year
    const days: Record<number, string> = {
      0: 'Dimanche',
      1: 'Lundi',
      2: 'Mardi',
      3: 'Mercredi',
      4: 'Jeudi',
      5: 'Vendredi',
      6: 'Samedi'
    };
    const day = days[d.getDay()];
    const dayNumber = d.getDate().toLocaleString('fr-FR', { minimumIntegerDigits: 2});
    const month = (d.getMonth() + 1).toLocaleString('fr-FR', { minimumIntegerDigits: 2});
    const year = d.getFullYear();

    return `${day} ${dayNumber}/${month}/${year}`;
  }

  private getTime(time: Date) {
    const t = new Date(time);
    const hours = t.getHours().toLocaleString('fr-FR', { minimumIntegerDigits: 2});
    const minutes = t.getMinutes().toLocaleString('fr-FR', { minimumIntegerDigits: 2});
    
    return `${hours}:${minutes}`;
  }


}