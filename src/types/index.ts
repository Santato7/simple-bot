class User {
  name: string;
  whatsappID: string;
  step: number = 0;

  constructor(_name: string, _whatsappID: string) {
    this.name = _name;
    this.whatsappID = _whatsappID;
  }
}
