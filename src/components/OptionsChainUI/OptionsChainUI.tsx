import React, { useEffect, useState } from "react";
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

interface OptionsChainUIProps {
  // Text of Call button
  callClickBtn?: string;
  // Text of Put button
  putClickBtn?: string;
  // Function for Call button
  callClickFunction?: Function;
  // Function for Put button
  putClickFunction?: Function;
}

function OptionsChainUI({
  callClickBtn = "Call Click",
  putClickBtn = "Put Click",
  callClickFunction,
  putClickFunction,
}: OptionsChainUIProps) {
  const [selectedSymbol, setSelectedSymbol] = useState("");
  const [selectedLayout, setSelectedLayout] = useState("unified");
  const [selectedDate, setSelectedDate] = useState("");
  const [stockPrice, setStockPrice] = useState<number | null>(null);

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

  // Get filtered data based on selected symbol and date, and sort by strike value
  const filteredData = dummyData
    .filter(
      (row) =>
        row.act_symbol === selectedSymbol &&
        (selectedDate === "" || row.date === selectedDate)
    )
    .sort((a, b) => parseFloat(b.strike) - parseFloat(a.strike));

  const renderTableRows = () => {
    const rowData: Array<{
      row: JSX.Element;
      isCallInMoney: boolean;
      isPutInMoney: boolean;
    }> = [];

    // Iterate through filtered data and group Call and Put pairs together
    for (let i = 0; i < filteredData.length; i += 2) {
      const callRow = filteredData[i];
      const putRow = filteredData[i + 1];

      // Determine if the option is in the money
      const isCallInMoney =
        (stockPrice && parseFloat(callRow.strike) < stockPrice) || false;
      const isPutInMoney =
        (stockPrice && parseFloat(putRow.strike) > stockPrice) || false;

      const row = (
        <tr
          key={`${callRow.act_symbol}_${callRow.expiration}_${callRow.strike}`}
          style={{
            backgroundColor: isCallInMoney
              ? "lightgreen"
              : isPutInMoney
              ? "lightsalmon"
              : "inherit",
          }}
        >
          <td>{callRow.expiration}</td>
          <td>
            <button
              onClick={(event) => {
                if (callClickFunction) {
                  callClickFunction(event);
                } else {
                  console.log(callRow);
                }
              }}
            >
              {callClickBtn}
            </button>
          </td>
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
          <td>
            <button
              onClick={(event) => {
                if (putClickFunction) {
                  putClickFunction(event);
                } else {
                  console.log(putRow);
                }
              }}
            >
              {putClickBtn}
            </button>
          </td>
        </tr>
      );
      rowData.push({ row, isCallInMoney, isPutInMoney });
    }
    // Sort rowData based on isCallInMoney and isPutInMoney
    rowData.sort((a, b) => {
      if (a.isCallInMoney && !b.isCallInMoney) {
        return -1;
      } else if (!a.isCallInMoney && b.isCallInMoney) {
        return 1;
      } else if (a.isPutInMoney && !b.isPutInMoney) {
        return 1;
      } else if (!a.isPutInMoney && b.isPutInMoney) {
        return -1;
      } else {
        return 0;
      }
    });

    return rowData.map((data) => data.row);
  };

  const updateStockPrice = (index: number) => {
    const values = [175.3, 175.8, 175.2, 174.6, 173.8, 176.2, 170, 172.5];
    if (index >= values.length) {
      index = 0;
    }
    setStockPrice(values[index]);
    setTimeout(() => updateStockPrice(index + 1), 5000);
  };

  useEffect(() => {
    updateStockPrice(0);
    return () => {
      // Cleanup
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      {selectedSymbol && (
        <div>
          <h2>
            {selectedSymbol} Stock Price:{" "}
            {stockPrice ? stockPrice.toFixed(2) : "N/A"}
          </h2>
        </div>
      )}
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
        <option value="unified">Unified Rows</option>
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
