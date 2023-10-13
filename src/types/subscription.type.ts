export interface Subscription {
  subscriptionStatus: boolean;
  publishable_key?: string;
  pricing_table_id?: string;
  owner_email?: string;
  url?: string;
}

export interface CustomerDetails {
  onTrial: boolean;
  subscriptionEndDate: string;
  limit?: number;
}
