export class Timestamp {
  getDateFromTimestamp(timestamp: string | number | null) {
    const date = new Date(timestamp as number);
    return `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;
  }

  getIsoDateFromTimestamp(timestamp: string | number | null) {
    const date = new Date(timestamp as number);
    const pad = (num: number) => (num < 10 ? `0${num}` : num.toString());
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(
      date.getDate()
    )}`;
  }

  getTimestampFromDate(date: string | number | null) {
    return new Date(date as string).getTime();
  }
}
