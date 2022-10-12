import { Box } from "@chakra-ui/react";
import { msToTime } from "@ltp/utils/validate";
import { useEffect, useState } from "react";

function CountDown({ endDate, onFinish }) {
  const [timer, setTimer] = useState("");

  useEffect(() => {
    let countDownTimer;
    if (endDate instanceof Date) {
      const duration = endDate - new Date();
      countDownTimer = setTimeout(() => {
        if (duration < 1) {
          onFinish instanceof Function && onFinish();
          return;
        }
        setTimer(msToTime(duration));
      }, 1000);
    }
    return () => clearTimeout(countDownTimer);
  }, [endDate, timer]);

  return (
    <Box display="inline-block" as="span">
      {timer}
    </Box>
  );
}

export default CountDown;
