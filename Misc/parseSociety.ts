export const parseSociety = (society: number) => {

  let soc;

  switch (society) {
    case 1:
      soc = 'Main';
      break;
    case 2:
      soc = 'Computer Society'
      break;

    case 3:
      soc = 'Communication Society'
      break;

    case 4:
      soc = 'SPS'
      break;

    case 5:
      soc = 'APS'
      break;

    case 6:
      soc = 'RAS'
      break;

    case 7:
      soc = 'PES'
      break;

    case 8:
      soc = 'Sight'
      break;

    case 9:
      soc = 'WIE'
      break;
  }
  return soc;
}
