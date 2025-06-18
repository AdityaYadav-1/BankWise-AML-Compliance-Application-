export interface Transaction {
  id: number;
  accountNumber: string;
  amount: number;
  timestamp: string;
  suspicious: boolean;
  suspiciousReason?: string;
}