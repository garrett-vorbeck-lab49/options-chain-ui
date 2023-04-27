export interface OptionChainRow {
  date: string;
  act_symbol: string;
  expiration: string;
  strike: string;
  call_put: string;
  bid: string;
  ask: string;
  vol: string;
  delta: string;
  gamma: string;
  theta: string;
  vega: string;
  rho: string;
}

export interface OptionChainData {
  query_execution_status: string;
  query_execution_message: string;
  repository_owner: string;
  repository_name: string;
  commit_ref: string;
  sql_query: string;
  schema: Array<{ columnName: string; columnType: string }>;
  rows: Array<OptionChainRow>;
}
