export default function validateOtherInfo(otherInfo, par) {
  let check = true;
  for (let key in otherInfo) {
    if (otherInfo[key] === null || otherInfo[key] === undefined) {
      par.style.display = "block";
      check = false;
    }
  }
  return check;
}
