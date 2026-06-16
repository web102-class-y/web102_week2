export const questions  = [
  {
    title: "What does HIDS stand for?",
    answer: "Host-based Intrusion Detection System",
  },
  {
    title: "What does HIPS stand for?",
    answer: "Host-based Intrusion Prevention System",
  },
  {
    title: "What does NIDS stand for?",
    answer: "Network-based Intrusion Detection System",
  },
  {
    title: "What is one program you can use for HIDP on Linux?",
    answer: "auditd",
  },
  {
    title: "audit.rules file path for auditd?",
    answer: "/etc/audit/audit.rules",
  },
  {
    title: "Where are audit logs stored by default for auditd?",
    answer: "/var/log/audit/audit.log",
  },
  {
    title: "-w [What do you need to put here for audit.rules?] -p rwa -k unit2_project_changes",
    answer: "File path",
  },
  {
    title: "-w /protected_files -p [What do you need to put here for audit.rules?] -k unit2_project_changes",
    answer: "Listening permissions",
  },
  {
    title: "-w /protected_files -p [What does \"a\" stand for here in audit.rules?] -k unit2_project_changes",
    answer: "Attribute changes",
  },
  {
    title: "-w /protected_files -p rwa -k [What do you put here in audit.rules?]",
    answer: "Key / label (Customized label name, e.g., unit2_project_changes)",
  },
  {
    title: "How do you search audit logs by label (key) and time?",
    answer: "ausearch -k <key> -ts <start time> -te <end time>  (ausearch -k unit2_project_changes -ts today -te now)",
  },
]