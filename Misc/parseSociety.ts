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

export const parseRole = (role: number) => {

  let rol;

  switch (role) {
    case 1:
      rol = 'Student Treasurer'; // Student Treasurer
      break;
    case 2:
      rol = 'Counsellor'; // Society Counsellor
      break;
    case 3:
      rol = 'Treasurer'; // Main Treasurer
      break;
    case 4:
      rol = 'Branch Counsellor'; // Branch Counsellor
      break;
    case 5:
      rol = 'Accounts Dept'; // Accounts Dept
      break;
  }
  return rol;
}