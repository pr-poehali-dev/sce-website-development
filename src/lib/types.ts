
export interface User {
  id: string;
  email: string;
  username: string;
  role: UserRole;
  createdAt: Date;
  verified: boolean;
}

export enum UserRole {
  ADMIN = "ADMIN",
  RESEARCHER = "RESEARCHER",
  STAFF = "STAFF",
  READER = "READER"
}

export interface SCEObject {
  id: string;
  number: string;
  name: string;
  containmentClass: ContainmentClass;
  riskClass: RiskClass;
  disruptionClass?: DisruptionClass;
  clearanceLevel: ClearanceLevel;
  description: string;
  containment: string;
  discovery?: string;
  addenda?: string[];
  images?: string[];
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

export enum ContainmentClass {
  SAFE = "SAFE",
  EUCLID = "EUCLID",
  KETER = "KETER",
  THAUMIEL = "THAUMIEL",
  NEUTRALIZED = "NEUTRALIZED",
  APOLLYON = "APOLLYON"
}

export enum RiskClass {
  NOTICE = "NOTICE",
  CAUTION = "CAUTION",
  WARNING = "WARNING",
  DANGER = "DANGER",
  CRITICAL = "CRITICAL"
}

export enum DisruptionClass {
  DARK = "DARK",
  VLAM = "VLAM",
  KENEQ = "KENEQ",
  EKHI = "EKHI",
  AMIDA = "AMIDA"
}

export enum ClearanceLevel {
  LEVEL_1 = "1",
  LEVEL_2 = "2",
  LEVEL_3 = "3",
  LEVEL_4 = "4",
  LEVEL_5 = "5"
}

export interface Post {
  id: string;
  title: string;
  content: string;
  author: string;
  createdAt: Date;
  updatedAt: Date;
  category: PostCategory;
  tags?: string[];
  featured?: boolean;
}

export enum PostCategory {
  NEWS = "NEWS",
  RESEARCH = "RESEARCH",
  ANNOUNCEMENT = "ANNOUNCEMENT",
  EVENT = "EVENT",
  OTHER = "OTHER"
}
