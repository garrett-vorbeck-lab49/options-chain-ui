import React, { useState } from "react";
import { dummyOptionChainData } from "./dummyData";

interface OptionRow {
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

// Use the rows from dummyOptionChainData
const dummyData: OptionRow[] = dummyOptionChainData.rows;

function OptionsChainUI() {
  const [selectedSymbol, setSelectedSymbol] = useState("");
  const [selectedLayout, setSelectedLayout] = useState("unified");
  const [selectedDate, setSelectedDate] = useState("");

  // Get unique symbols from dummy data
  const uniqueSymbols = Array.from(
    new Set(dummyData.map((row) => row.act_symbol))
  );

  // Render the unique symbols as options.
  const renderOptions = () =>
    uniqueSymbols.map((symbol) => (
      <option key={symbol} value={symbol}>
        {symbol}
      </option>
    ));

  // Get unique dates for the selected symbol
  const uniqueDates = Array.from(
    new Set(
      dummyData
        .filter((row) => row.act_symbol === selectedSymbol)
        .map((row) => row.date)
    )
  );

  // Render the unique dates as options
  const renderDateOptions = () =>
    uniqueDates.map((date) => (
      <option key={date} value={date}>
        {date}
      </option>
    ));

  // Get filtered data based on selected symbol and date
  const filteredData = dummyData.filter(
    (row) =>
      row.act_symbol === selectedSymbol &&
      (selectedDate === "" || row.date === selectedDate)
  );

  const renderTableRows = () => {
    const rows: JSX.Element[] = [];

    // Iterate through filtered data and group Call and Put pairs together
    for (let i = 0; i < filteredData.length; i += 2) {
      const callRow = filteredData[i];
      const putRow = filteredData[i + 1];

      rows.push(
        <tr
          key={`${callRow.act_symbol}_${callRow.expiration}_${callRow.strike}`}
        >
          <td>{callRow.expiration}</td>
          <td>{callRow.call_put}</td>
          <td>{callRow.bid}</td>
          <td>{callRow.ask}</td>
          <td>{callRow.vol}</td>
          <td>{callRow.delta}</td>
          <td>{callRow.gamma}</td>
          <td>{callRow.theta}</td>
          <td>{callRow.vega}</td>
          <td>{callRow.rho}</td>
          <td>{callRow.strike}</td>
          <td>{putRow.call_put}</td>
          <td>{putRow.bid}</td>
          <td>{putRow.ask}</td>
          <td>{putRow.vol}</td>
          <td>{putRow.delta}</td>
          <td>{putRow.gamma}</td>
          <td>{putRow.theta}</td>
          <td>{putRow.vega}</td>
          <td>{putRow.rho}</td>
        </tr>
      );
    }

    return rows;
  };

  return (
    <div>
      <select
        value={selectedSymbol}
        onChange={(e) => setSelectedSymbol(e.target.value)}
      >
        <option value="">Select a Symbol</option>
        {renderOptions()}
      </select>
      <select
        value={selectedDate}
        onChange={(e) => setSelectedDate(e.target.value)}
      >
        <option value="">Select a Date</option>
        {renderDateOptions()}
      </select>
      <select
        value={selectedLayout}
        onChange={(e) => setSelectedLayout(e.target.value)}
      >
        <option value="unified" selected>
          Unified Rows
        </option>
        <option value="split">Split Rows</option>
      </select>
      {selectedSymbol && <h2>{selectedSymbol}</h2>}
      <table>
        <thead>
          <tr>
            <th>Expiration</th>
            <th>Call/Put</th>
            <th>Bid</th>
            <th>Ask</th>
            <th>Vol</th>
            <th>Delta</th>
            <th>Gamma</th>
            <th>Theta</th>
            <th>Vega</th>
            <th>Rho</th>
            <th>Strike</th>
            <th>Call/Put</th>
            <th>Bid</th>
            <th>Ask</th>
            <th>Vol</th>
            <th>Delta</th>
            <th>Gamma</th>
            <th>Theta</th>
            <th>Vega</th>
            <th>Rho</th>
          </tr>
        </thead>
        <tbody>{renderTableRows()}</tbody>
      </table>
    </div>
  );
}

export default OptionsChainUI;
