import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { X, Phone, Mail, Building2, Calendar } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Lead } from "@/components/tables/LeadsTable";

interface LeadDetailModalProps {
  lead: Lead | null;
  isOpen: boolean;
  onClose: () => void;
  onSave?: (lead: Lead, updates: any) => void;
}

const statusColors: Record<string, string> = {
  new: "bg-blue-500/10 text-blue-600 border border-blue-200",
  contacted: "bg-purple-500/10 text-purple-600 border border-purple-200",
  qualified: "bg-amber-500/10 text-amber-600 border border-amber-200",
  proposal: "bg-indigo-500/10 text-indigo-600 border border-indigo-200",
  negotiation: "bg-orange-500/10 text-orange-600 border border-orange-200",
  converted: "bg-green-500/10 text-green-600 border border-green-200",
  lost: "bg-red-500/10 text-red-600 border border-red-200",
};

export const LeadDetailModal = ({
  lead,
  isOpen,
  onClose,
  onSave,
}: LeadDetailModalProps) => {
  const [editedStatus, setEditedStatus] = useState("");
  const [editedNotes, setEditedNotes] = useState("");
  const [editedFollowUpDate, setEditedFollowUpDate] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (lead) {
      setEditedStatus(lead.status);
      setEditedNotes("");
      setEditedFollowUpDate(lead.nextFollowUp || "");
    }
  }, [lead]);

  const handleSave = () => {
    setIsSaving(true);
    if (lead && onSave) {
      onSave(lead, {
        status: editedStatus,
        notes: editedNotes,
        nextFollowUp: editedFollowUpDate,
      });
    }
    setTimeout(() => {
      setIsSaving(false);
      onClose();
    }, 500);
  };

  if (!lead) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-[95vw] max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="flex flex-row items-start justify-between">
          <div className="flex-1">
            <DialogTitle className="text-2xl">{lead.name}</DialogTitle>
            <p className="text-sm text-muted-foreground mt-1">{lead.company}</p>
          </div>
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </DialogHeader>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6 mt-6"
        >
          {/* Lead Contact Information */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4">
              Contact Information
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-muted/30 p-4 rounded-lg">
              <div className="flex items-start gap-3">
                <Mail className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-muted-foreground">Email</p>
                  <p className="text-sm font-medium break-all">{lead.email}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-muted-foreground">Phone</p>
                  <p className="text-sm font-medium">{lead.phone}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Building2 className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-muted-foreground">Company</p>
                  <p className="text-sm font-medium">{lead.company}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Badge variant="outline" className="text-xs mt-px">
                  {lead.source}
                </Badge>
              </div>
            </div>
          </div>

          {/* Lead Metadata */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4">
              Lead Information
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label className="text-xs text-muted-foreground mb-2 block">
                  Current Status
                </Label>
                <div className="flex items-center gap-2">
                  <Badge className={statusColors[lead.status]}>
                    {lead.status.charAt(0).toUpperCase() + lead.status.slice(1)}
                  </Badge>
                </div>
              </div>
              <div>
                <Label className="text-xs text-muted-foreground mb-2 block">
                  Lead Date
                </Label>
                <p className="text-sm font-medium">{lead.date}</p>
              </div>
            </div>
          </div>

          {/* Status Update */}
          <div className="space-y-3 bg-accent/20 p-4 rounded-lg border border-accent/30">
            <h3 className="text-sm font-semibold text-foreground">
              Update Lead Status
            </h3>
            <Select value={editedStatus} onValueChange={setEditedStatus}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="new">New</SelectItem>
                <SelectItem value="contacted">Contacted</SelectItem>
                <SelectItem value="qualified">Qualified</SelectItem>
                <SelectItem value="proposal">Proposal</SelectItem>
                <SelectItem value="negotiation">Negotiation</SelectItem>
                <SelectItem value="converted">Converted</SelectItem>
                <SelectItem value="lost">Lost</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Notes */}
          <div className="space-y-3">
            <Label className="text-sm font-semibold">Add Notes</Label>
            <Textarea
              placeholder="Add interaction notes, observations, or next steps..."
              className="min-h-[100px] resize-none"
              value={editedNotes}
              onChange={(e) => setEditedNotes(e.target.value)}
            />
            <p className="text-xs text-muted-foreground">
              Character count: {editedNotes.length}/500
            </p>
          </div>

          {/* Follow-up Date */}
          <div className="space-y-3">
            <Label htmlFor="followup-date" className="text-sm font-semibold">
              Next Follow-up Date
            </Label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
              <Input
                id="followup-date"
                type="date"
                value={editedFollowUpDate}
                onChange={(e) => setEditedFollowUpDate(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-border">
            <Button
              className="flex-1 bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white"
              onClick={handleSave}
              disabled={isSaving}
            >
              {isSaving ? "Saving..." : "Save Changes"}
            </Button>
            <Button variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
          </div>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
};

export default LeadDetailModal;
