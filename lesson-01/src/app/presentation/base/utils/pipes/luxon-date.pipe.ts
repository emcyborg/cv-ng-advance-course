import { Pipe, PipeTransform } from "@angular/core";
import { DateTime, Duration } from "luxon";

@Pipe({
  name: "luxonDate",
  standalone: true
})
export class LuxonDatePipe implements PipeTransform {

  transform(value: DateTime | Duration | Date | string | undefined, format: string = "DATE_SHORT"): any {
    if (value) {
      let dateTimeToUse: DateTime;
      if (value instanceof Date) {
        dateTimeToUse = DateTime.fromJSDate(value);
      } else if (value instanceof Duration) {
        dateTimeToUse = DateTime.fromMillis(value.toMillis());
      } else if (typeof value === "string") {
        dateTimeToUse = DateTime.fromFormat(value, "hh:mm:ss");
      } else {
        dateTimeToUse = value;
      }
      return dateTimeToUse.toFormat(format);
    }
    return;
  }

}
