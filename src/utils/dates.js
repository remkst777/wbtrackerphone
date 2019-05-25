import moment from "moment";

const getStartOfDay = day => {
  return moment(day)
    .startOf("day")
    .format("LL");
};

const getTimezoneDifference = () => {
  const minInMS = 60 * 1000;
  const diff = new Date().getTimezoneOffset() * minInMS;

  return diff;
};

export { getStartOfDay, getTimezoneDifference };
