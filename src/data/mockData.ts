import { Lead } from "@/components/tables/LeadsTable";

export interface Activity {
  id: string;
  type: "call" | "email" | "meeting" | "note";
  message: string;
  time: string;
}

export const mockLeads: Lead[] = [
  {
    id: "1",
    name: "Alex Thompson",
    email: "alex@techcorp.com",
    phone: "+1 234 567 8901",
    company: "TechCorp Inc.",
    source: "Website",
    status: "new",
    assignedAgent: "John Smith",
    date: "2025-02-05",
    nextFollowUp: "2025-02-08",
  },
  {
    id: "2",
    name: "Sarah Johnson",
    email: "sarah@innovate.io",
    phone: "+1 234 567 8902",
    company: "Innovate.io",
    source: "Referral",
    status: "contacted",
    assignedAgent: "Emily Davis",
    date: "2025-02-04",
    nextFollowUp: "2025-02-07",
  },
  {
    id: "3",
    name: "Michael Chen",
    email: "m.chen@global.com",
    phone: "+1 234 567 8903",
    company: "Global Solutions",
    source: "LinkedIn",
    status: "qualified",
    assignedAgent: "Mike Wilson",
    date: "2025-02-03",
  },
  {
    id: "4",
    name: "Emma Williams",
    email: "emma@startup.co",
    phone: "+1 234 567 8904",
    company: "StartUp Co",
    source: "Ads",
    status: "proposal",
    assignedAgent: "Sarah Johnson",
    date: "2025-02-02",
  },
  {
    id: "5",
    name: "David Brown",
    email: "david@enterprise.net",
    phone: "+1 234 567 8905",
    company: "Enterprise Net",
    source: "Website",
    status: "converted",
    assignedAgent: "John Smith",
    date: "2025-01-28",
  },
  {
    id: "6",
    name: "Lisa Anderson",
    email: "lisa@media.com",
    phone: "+1 234 567 8906",
    company: "Media Group",
    source: "Referral",
    status: "negotiation",
    assignedAgent: "Emily Davis",
    date: "2025-02-01",
  },
  {
    id: "7",
    name: "James Wilson",
    email: "james@consulting.biz",
    phone: "+1 234 567 8907",
    company: "Wilson Consulting",
    source: "LinkedIn",
    status: "lost",
    assignedAgent: "Mike Wilson",
    date: "2025-01-25",
  },
  {
    id: "8",
    name: "Jennifer Lee",
    email: "jen@finance.co",
    phone: "+1 234 567 8908",
    company: "Finance Pro",
    source: "Website",
    status: "new",
    assignedAgent: "John Smith",
    date: "2025-02-06",
    nextFollowUp: "2025-02-08",
  },
  {
    id: "9",
    name: "Robert Garcia",
    email: "robert@techstart.io",
    phone: "+1 234 567 8909",
    company: "TechStart",
    source: "LinkedIn",
    status: "contacted",
    assignedAgent: "John Smith",
    date: "2025-02-07",
    nextFollowUp: "2025-02-09",
  },
  {
    id: "10",
    name: "Maria Rodriguez",
    email: "maria@digitalcorp.com",
    phone: "+1 234 567 8910",
    company: "Digital Corp",
    source: "Referral",
    status: "qualified",
    assignedAgent: "John Smith",
    date: "2025-02-05",
    nextFollowUp: "2025-02-08",
  },
];

export const mockAgents = [
  { id: "1", name: "John Smith", leadsAssigned: 45, converted: 24, pending: 8, status: "active" },
  { id: "2", name: "Emily Davis", leadsAssigned: 38, converted: 18, pending: 12, status: "active" },
  { id: "3", name: "Mike Wilson", leadsAssigned: 52, converted: 28, pending: 6, status: "active" },
  { id: "4", name: "Sarah Johnson", leadsAssigned: 41, converted: 22, pending: 10, status: "active" },
  { id: "5", name: "David Lee", leadsAssigned: 35, converted: 15, pending: 14, status: "active" },
];

interface MockUser {
  id: string;
  name: string;
  email: string;
  role: "Admin" | "Manager" | "Agent";
  status: "Active" | "Inactive";
}

export const mockUsers: MockUser[] = [
  { id: "1", name: "Admin User", email: "admin@athenura.com", role: "Admin", status: "Active" },
  { id: "2", name: "Manager One", email: "manager1@athenura.com", role: "Manager", status: "Active" },
  { id: "3", name: "John Smith", email: "john@athenura.com", role: "Agent", status: "Active" },
  { id: "4", name: "Emily Davis", email: "emily@athenura.com", role: "Agent", status: "Active" },
  { id: "5", name: "Mike Wilson", email: "mike@athenura.com", role: "Agent", status: "Inactive" },
  { id: "6", name: "Sarah Johnson", email: "sarah.johnson@athenura.com", role: "Manager", status: "Active" },
  { id: "7", name: "David Lee", email: "david.lee@athenura.com", role: "Agent", status: "Active" },
  { id: "8", name: "Jennifer Kim", email: "jennifer.kim@athenura.com", role: "Agent", status: "Active" },
];

export const mockNotifications = [
  { id: "1", message: "New lead assigned: Alex Thompson", time: "5 minutes ago", read: false },
  { id: "2", message: "Follow-up reminder: Sarah Johnson", time: "1 hour ago", read: false },
  { id: "3", message: "Lead converted: David Brown", time: "2 hours ago", read: true },
  { id: "4", message: "Meeting scheduled with Emma Williams", time: "3 hours ago", read: true },
];

export const mockActivities: Activity[] = [
  { id: "1", type: "call", message: "Called Alex Thompson - Interested in premium plan", time: "10:30 AM" },
  { id: "2", type: "email", message: "Sent proposal to Sarah Johnson", time: "09:15 AM" },
  { id: "3", type: "meeting", message: "Demo meeting with David Brown completed", time: "08:45 AM" },
  { id: "4", type: "note", message: "Updated contact info for Alex Thompson", time: "Yesterday 4:30 PM" },
  { id: "5", type: "call", message: "Follow-up call with David Brown - Ready to sign", time: "Yesterday 2:15 PM" },
  { id: "6", type: "email", message: "Sent contract to David Brown", time: "Yesterday 11:00 AM" },
  { id: "7", type: "meeting", message: "Scheduled follow-up meeting with Robert Garcia", time: "Yesterday 10:00 AM" },
  { id: "8", type: "note", message: "Added budget notes for Maria Rodriguez", time: "2 days ago" },
  { id: "9", type: "call", message: "Initial call with Jennifer Lee - Good prospect", time: "2 days ago" },
  { id: "10", type: "email", message: "Sent welcome email series to new lead", time: "3 days ago" },
];
