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

const PROJECTSTATUS = [
  {
    id: "pending",
    type: "Pending",
  },
  {
    id: "in-progress",
    type: "In Progress",
  },
  {
    id: "completed",
    type: "Completed",
  },
  {
    id: "on-hold",
    type: "On Hold",
  },
  {
    id: "cancelled",
    type: "Cancelled",
  },
];

const TASKPRIORITY = [
  {
    id: "low",
    type: "Low",
  },
  {
    id: "medium",
    type: "Medium",
  },
  {
    id: "high",
    type: "High",
  },
  {
    id: "critical",
    type: "Critical",
  },
];

const TASKTYPES = [
  {
    id: "general",
    type: "General",
  },
  {
    id: "follow-up",
    type: "Follow-up",
  },
  {
    id: "sales",
    type: "Sales",
  },
  {
    id: "customer-support",
    type: "Customer Support",
  },
  {
    id: "lead-qualification",
    type: "Lead Qualification",
  },
  {
    id: "opportunity-managemen",
    type: "Opportunity Management",
  },
  {
    id: "project-management",
    type: "Project Management",
  },
  {
    id: "administrative",
    type: "Administrative",
  },
  {
    id: "escalation",
    type: "Escalation",
  },
  {
    id: "custom",
    type: "Custom",
  },
];

const TASKSTATUS = [
  {
    id: "pending",
    type: "Pending",
  },
  {
    id: "in-progress",
    type: "In Progress",
  },
  {
    id: "completed",
    type: "Completed",
  },
  {
    id: "overdue",
    type: "Overdue",
  },
];

const INTERACTIONTYPES = [
  {
    id: "email",
    type: "Email",
  },
  {
    id: "call",
    type: "Call",
  },
  {
    id: "meeting",
    type: "Meeting",
  },
];

// Transaction


const PAYMENTMETHODS = [
  {
    id: "CASH",
    method: "Cash",
  },
  {
    id: "ONLINE",
    method: "Online",
  },
  {
    id: "CHEQUE",
    method: "Cheque",
  },
  {
    id: "BANKTRANSFER",
    method: "Bank Transfer",
  },
  {
    id: "OTHER",
    method: "Other",
  },
];



const PAYMENTSTATUS = [
  {
    id: "ADVANCE",
    status: "Advance",
  },
  {
    id: "PARTIAL",
    status: "Partial",
  },
  {
    id: "PENDING",
    status: "Pending",
  },
  {
    id: "COMPLETE",
    status: "Complete",
  },
  {
    id: "OTHER",
    status: "Other",
  },
];


export {
  MINPASSLENGTH,
  MAXPASSLENGTH,
  DATAPERPAGE,
  USERSTYPES,
  RANDOMPASS,
  LEADSTYPES,
  DEALSTAGES,
  PROJECTSTATUS,
  TASKPRIORITY,
  TASKTYPES,
  TASKSTATUS,
  INTERACTIONTYPES,
  PAYMENTMETHODS,
  PAYMENTSTATUS
};
