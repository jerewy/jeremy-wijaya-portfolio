"use client";

import type { RoomObject } from "../room-scene";
import type { PixelIconName } from "../pixel-icons";
import { ProjectsPanel } from "./projects-panel";
import {
  AboutPanel,
  CertificatesPanel,
  ContactPanel,
  ResumePanel,
  SkillsPanel,
} from "./info-panels";

export const PANEL_META: Record<
  RoomObject,
  { title: string; shortTitle?: string; subtitle: string; icon: PixelIconName; isWide?: boolean }
> = {
  robot: { title: "About me", subtitle: "Player profile", icon: "robot" },
  computer: { title: "Projects", subtitle: "3 cartridges loaded", icon: "monitor", isWide: true },
  shelf: { title: "Skills", subtitle: "Inventory", icon: "book" },
  board: { title: "Resume", subtitle: "Quest log", icon: "paper" },
  certs: { title: "Certificates", shortTitle: "Certs", subtitle: "Achievements", icon: "medal" },
  phone: { title: "Contact", subtitle: "Open channel", icon: "phone" },
};

export function PanelContent({
  object,
  onNavigate,
}: {
  object: RoomObject;
  onNavigate: (object: RoomObject) => void;
}) {
  switch (object) {
    case "robot":
      return <AboutPanel onNavigate={onNavigate} />;
    case "computer":
      return <ProjectsPanel />;
    case "shelf":
      return <SkillsPanel />;
    case "board":
      return <ResumePanel />;
    case "certs":
      return <CertificatesPanel />;
    case "phone":
      return <ContactPanel />;
  }
}
