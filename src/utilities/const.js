const MINPASSLENGTH = 5;
const MAXPASSLENGTH = 12;

const DATAPERPAGE = 8;

const RANDOMPASS = "*CRM12345";

const USERSTYPES = [
  {
    id: "user",
    user: "User",
  },
  {
    id: "admin",
    user: "Admin",
  },
  {
    id: "manager",
    user: "Manager",
  },
  {
    id: "subadmin",
    user: "Sub Admin",
  },
];

const LEADSTYPES = [
  {
    id: "new",
    type: "New",
  },
  {
    id: "contacted",
    type: "Contacted",
  },
  {
    id: "qualified",
    type: "Qualified",
  },
  // {
  //   id: "converted",
  //   type: "Converted",
  // },
];


const DEALSTAGES = [ 
  {
    id: "new",
    type: "New",
  },
  {
    id: "qualified",
    type: "Qualified",
  },
  {
    id: "proposal-sent",
    type: "Proposal Sent",
  },
  {
    id: "closed-won",
    type: "Closed Won",
  },
  {
    id: "closed-lost",
    type: "Closed Lost",
  },
];


export { MINPASSLENGTH, MAXPASSLENGTH, DATAPERPAGE, USERSTYPES, RANDOMPASS, LEADSTYPES, DEALSTAGES };
