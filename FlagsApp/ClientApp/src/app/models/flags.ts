export class Flag {
  code: string;
  //image: string; hacer getter
  description: string;

  constructor(code, description) {
    this.code = code;
    this.description = description;
  }
}

export const FLAGS: Flag[] = [
  new Flag("AL", ""),
  new Flag("AK", ""),
  new Flag("AZ", ""),
  new Flag("AR", ""),
  new Flag("CA", ""),
  new Flag("CO", ""),
  new Flag("CT", ""),
  new Flag("DE", ""),
  new Flag("FL", ""),
  new Flag("GA", ""),
  new Flag("HI", ""),
  new Flag("ID", ""),
  new Flag("IL", ""),
  new Flag("IN", ""),
  new Flag("IA", ""),
  new Flag("KS", ""),
  new Flag("KY", ""),
  new Flag("LA", ""),
  new Flag("ME", ""),
  new Flag("MD", ""),
  new Flag("MA", ""),
  new Flag("MI", ""),
  new Flag("MN", ""),
  new Flag("MS", ""),
  new Flag("MO", ""),
  new Flag("MT", ""),
  new Flag("NE", ""),
  new Flag("NV", ""),
  new Flag("NH", ""),
  new Flag("NJ", ""),
  new Flag("NM", ""),
  new Flag("NY", ""),
  new Flag("NC", ""),
  new Flag("ND", ""),
  new Flag("OH", ""),
  new Flag("OK", ""),
  new Flag("OR", ""),
  new Flag("PA", ""),
  new Flag("RI", ""),
  new Flag("SC", ""),
  new Flag("SD", ""),
  new Flag("TN", ""),
  new Flag("TX", ""),
  new Flag("UT", ""),
  new Flag("VT", ""),
  new Flag("VA", ""),
  new Flag("WA", ""),
  new Flag("WV", ""),
  new Flag("WI", ""),
  new Flag("WY", "")
];

export const FLAG_OBJECTS = FLAGS.map(f => {
  let result = {};
  result[f.code] = f;
  return result;
});
