import * as moment from 'moment';

export class User {
  id: number;
  firstName: string;
  lastName: string;
  public country: string;
  public completed: boolean;
  public phoneNumber: string;
  public birthDate: string;
  private image: string;

  constructor(id: number, firstName: string, lastName: string, country: string, completed: boolean,
              phoneNumber: string, image: string, birthDate: string) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.country = country;
    this.completed = completed;
    this.phoneNumber = phoneNumber;
    this.image = image;
    this.birthDate = birthDate;
  }

  public getFormattedBirthDate() {
    const result = moment(this.birthDate, 'YYYY/MM/DD');
    return result.format('MM/DD/YYYY');
  }

  public getBirthDate(): string {
    const result = moment(this.birthDate, 'YYYY/MM/DD');
    return result.toISOString();
  }
}
