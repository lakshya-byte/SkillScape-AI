import React from "react";
import DashboardClientLayout from "@/components/Dasboard/DashboardClientLayout";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DashboardClientLayout>{children}</DashboardClientLayout>;
}
