import React, { useState } from "react";
import { OptionChainRow, OptionChainData } from "./types";

/*
Sources:

Options Trading for Beginners (WITH DETAILED EXAMPLES)
https://www.youtube.com/watch?v=TyZsemV_0YA

Screenshot of Options Chain UI from E*Trade
https://user-images.githubusercontent.com/63244584/228619389-ea12555e-2d1b-4548-a34b-861a971986f3.png

Source of dummy data:
https://www.dolthub.com/repositories/post-no-preference/options/data/master/option_chain

Option Chain: What It Is and How To Read and Analyze It
https://www.investopedia.com/terms/o/optionchain.asp

TODO:
x consolidating rows of matching call/put contracts (based on symbol, date, and strike price)
- in/out of the money stacking
x date filtering
- layout prop to display data differently
- README.md should match other source component layouts
- What would demo website look like
- Storybook controls (ex: layout)
- compelling demo: realistic dummy data. Colors (configurable, react-value-flash in a table cell)
*/

interface OptionsChainUIProps {
  data: OptionChainData;
}

const OptionsChainUI: React.FC<OptionsChainUIProps> = ({ data }) => {
  const [selectedSymbol, setSelectedSymbol] = useState(data.rows[0].act_symbol);

  const handleSymbolChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSymbol(event.target.value);
  };

  const filteredRows = data.rows.filter(
    (row) => row.act_symbol === selectedSymbol
  );

  const groupedRows: OptionChainRow[][] = [];
  filteredRows.forEach((row) => {
    const existingGroup = groupedRows.find(
      (group) => group[0].date === row.date && group[0].strike === row.strike
    );
    if (existingGroup) {
      existingGroup.push(row);
    } else {
      groupedRows.push([row]);
    }
  });

  const uniqueSymbols = Array.from(
    new Set(data.rows.map((row) => row.act_symbol))
  );

  return (
    <div>
      <select value={selectedSymbol} onChange={handleSymbolChange}>
        {uniqueSymbols.map((symbol, index) => (
          <option key={index} value={symbol}>
            {symbol}
          </option>
        ))}
      </select>
      {groupedRows.map((group, index) => (
        <div key={index}>
          <h2>{`${group[0].date} - ${group[0].strike}`}</h2>
          <table>
            <thead>
              <tr>
                <th>Date</th>
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
            <tbody>
              {group.map((row, index) => (
                <tr key={index}>
                  {index === 0 && (
                    <>
                      <td rowSpan={group.length}>{row.date}</td>
                      <td rowSpan={group.length}>{row.strike}</td>
                    </>
                  )}
                  <td>{row.call_put}</td>
                  <td>{row.bid}</td>
                  <td>{row.ask}</td>
                  <td>{row.vol}</td>
                  <td>{row.delta}</td>
                  <td>{row.gamma}</td>
                  <td>{row.theta}</td>
                  <td>{row.vega}</td>
                  <td>{row.rho}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
};

export default OptionsChainUI;
