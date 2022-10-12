import { addZeroNumber } from "@ltp/utils/index";
import moment from "moment";
import { useEffect, useState } from "react";

/**
  @return {{days: Number, hours: Number, minutes: Number, seconds: Number}}
*/

function useCountDown({ startTime = new Date(), endTime }) {
  const [time, setTime] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  useEffect(() => {
    if (!endTime) return;

    const _startTime = startTime ? new Date(startTime) : new Date();
    const _endTime = new Date(endTime);
    const diffTime = _endTime - _startTime;

    let duration = moment.duration(diffTime, "milliseconds");
    const INTERVAL_TIME = 1000;
    const milliseconds = Math.abs(_endTime - _startTime);
    const countDownTimer = setInterval(() => {
      duration = moment.duration(duration - INTERVAL_TIME, "milliseconds");
      const hours = parseInt(milliseconds / (1000 * 60 * 60));
      setTime({
        days: addZeroNumber(duration.days()),
        hours: addZeroNumber(hours),
        minutes: addZeroNumber(duration.minutes()),
        seconds: addZeroNumber(duration.seconds()),
      });
    }, INTERVAL_TIME);

    return () => clearInterval(countDownTimer);
  }, [startTime, endTime]);

  return time;
}

export default useCountDown;
