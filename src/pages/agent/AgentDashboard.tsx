import { useState } from "react";
import { motion } from "framer-motion";
import {
  ClipboardList,
  Calendar,
  TrendingUp,
  TrendingDown,
  CalendarDays,
} from "lucide-react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { SummaryCard } from "@/components/ui/summary-card";
import ActivityTimeline from "../../components/agent/ActivityTimeline";
import { LeadDetailModal } from "@/components/agent/LeadDetailModal";
import { AddLeadModal } from "@/components/agent/AddLeadModal";
import { mockLeads, mockActivities } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Lead } from "@/components/tables/LeadsTable";

const statusColors: Record<string, string> = {
  new: "bg-primary text-primary-foreground",
  contacted: "bg-accent text-accent-foreground",
  qualified: "bg-warning text-warning-foreground",
  proposal: "bg-primary/80 text-primary-foreground",
  negotiation: "bg-warning/80 text-warning-foreground",
  converted: "bg-success text-success-foreground",
  lost: "bg-destructive text-destructive-foreground",
};

const AgentDashboard = () => {
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isAddLeadModalOpen, setIsAddLeadModalOpen] = useState(false);
  const [currentAgent] = useState("John Smith");

  const myLeads = mockLeads.filter((l) => l.assignedAgent === currentAgent);
  const followUpsToday = myLeads.filter(
    (l) => l.nextFollowUp && new Date(l.nextFollowUp).toDateString() === new Date().toDateString()
  ).length;
  const convertedLeads = myLeads.filter((l) => l.status === "converted").length;
  const lostLeads = myLeads.filter((l) => l.status === "lost").length;

  const handleLeadSelect = (lead: Lead) => {
    setSelectedLead(lead);
    setIsDetailModalOpen(true);
  };

  const handleSaveLead = (lead: Lead, updates: any) => {
    console.log("Saving lead:", {
      leadId: lead.id,
      ...updates,
    });
    setSelectedLead(null);
  };

  const handleAddLead = (leadData: any) => {
    console.log("Adding new lead:", leadData);
  };

  return (
    <DashboardLayout role="agent" title="My Dashboard">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 mb-6 md:mb-8">
        <SummaryCard
          title="My Leads"
          value={myLeads.length}
          icon={ClipboardList}
          delay={0}
        />
        <SummaryCard
          title="Follow-ups Today"
          value={followUpsToday}
          icon={Calendar}
          variant="warning"
          delay={0.1}
        />
        <SummaryCard
          title="Converted Leads"
          value={convertedLeads}
          icon={TrendingUp}
          variant="success"
          delay={0.2}
        />
        <SummaryCard
          title="Lost Leads"
          value={lostLeads}
          icon={TrendingDown}
          variant="destructive"
          delay={0.3}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 md:gap-6">
        {/* My Leads Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-2 rounded-lg md:rounded-xl border border-border bg-card shadow-sm overflow-hidden"
        >
          <div className="p-3 md:p-6 border-b border-border">
            <div className="flex flex-col xs:flex-row xs:items-center justify-between gap-3">
              <h2 className="text-base md:text-lg font-semibold text-foreground">My Leads</h2>
              <div className="flex gap-2 w-full xs:w-auto">
                <Button 
                  size="sm" 
                  variant="outline" 
                  onClick={() => {
                    console.log("Filter button clicked");
                  }}
                  className="text-xs md:text-sm flex-1 xs:flex-none"
                >
                  Filter
                </Button>
                <Button 
                  size="sm" 
                  className="bg-cyan-600 hover:bg-cyan-700 text-white text-xs md:text-sm flex-1 xs:flex-none" 
                  onClick={() => {
                    setIsAddLeadModalOpen(true);
                  }}
                >
                  Add Lead
                </Button>
              </div>
            </div>
          </div>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead className="min-w-[120px] md:min-w-[150px] text-xs md:text-sm">Lead Name</TableHead>
                  <TableHead className="hidden sm:table-cell min-w-[140px] md:min-w-[180px] text-xs md:text-sm">Contact</TableHead>
                  <TableHead className="min-w-[80px] md:min-w-[100px] text-xs md:text-sm">Status</TableHead>
                  <TableHead className="hidden md:table-cell min-w-[130px] text-xs md:text-sm">Follow-up</TableHead>
                  <TableHead className="text-right min-w-[100px] md:min-w-[160px] text-xs md:text-sm">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {myLeads.slice(0, 6).map((lead) => (
                  <TableRow
                    key={lead.id}
                    className="hover:bg-muted/50"
                  >
                    <TableCell className="font-medium text-xs md:text-sm py-3">{lead.name}</TableCell>
                    <TableCell className="hidden sm:table-cell text-xs md:text-sm">
                      <div className="text-xs md:text-sm">
                        <p className="text-muted-foreground truncate">{lead.email}</p>
                        <p className="text-muted-foreground truncate">{lead.phone}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={`${statusColors[lead.status]} text-xs`}>
                        {lead.status.charAt(0).toUpperCase() + lead.status.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell className="hidden md:table-cell text-xs md:text-sm">
                      {lead.nextFollowUp ? (
                        <div className="flex items-center gap-1 md:gap-2 text-xs md:text-sm">
                          <CalendarDays className="h-3 w-3 md:h-4 md:w-4 text-muted-foreground" />
                          <span className={`truncate ${
                            new Date(lead.nextFollowUp).toDateString() === new Date().toDateString()
                              ? "text-warning font-medium"
                              : ""
                          }`}>
                            {lead.nextFollowUp}
                          </span>
                        </div>
                      ) : (
                        <span className="text-muted-foreground">—</span>
                      )}
                    </TableCell>
                    <TableCell className="text-right py-3">
                      <div className="flex justify-end gap-1 md:gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            handleLeadSelect(lead);
                          }}
                          className="shrink-0 text-xs md:text-sm px-2 md:px-3 py-1 md:py-2"
                        >
                          View
                        </Button>
                        <Button
                          size="sm"
                          className="bg-cyan-600 hover:bg-cyan-700 text-white shrink-0 text-xs md:text-sm px-2 md:px-3 py-1 md:py-2"
                          onClick={() => {
                            handleLeadSelect(lead);
                          }}
                        >
                          Update
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </motion.div>

        {/* Activity Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="lg:col-span-1"
        >
          <ActivityTimeline activities={mockActivities} maxItems={6} />
        </motion.div>
      </div>

      {/* Lead Detail Modal */}
      <LeadDetailModal
        lead={selectedLead}
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        onSave={handleSaveLead}
      />

      {/* Add Lead Modal */}
      <AddLeadModal
        isOpen={isAddLeadModalOpen}
        onClose={() => setIsAddLeadModalOpen(false)}
        onSubmit={handleAddLead}
      />
    </DashboardLayout>
  );
};

export default AgentDashboard;