import React from 'react';

const DistrictTable = () => {
  const data = [
    { district: "District 1", white: "50%", africanAmerican: "20%", asianAmerican: "15%", latinoHispanic: "15%", dem: "60%", repb: "20%", partyWins: "Democrat" },
    { district: "District 2", white: "60%", africanAmerican: "10%", asianAmerican: "10%", latinoHispanic: "20%", dem: "50%", repb: "40%", partyWins: "Republican" },
    { district: "District 3", white: "55%", africanAmerican: "15%", asianAmerican: "10%", latinoHispanic: "20%", dem: "55%", repb: "45%", partyWins: "Democrat" },
    { district: "District 4", white: "45%", africanAmerican: "25%", asianAmerican: "15%", latinoHispanic: "15%", dem: "51%", repb: "49%", partyWins: "Democrat" },
  ];

  const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse',
    fontFamily: 'Arial, sans-serif',
  };

  const thStyle = {
    backgroundColor: '#f3f4f6',
    color: '#6b7280',
    padding: '12px',
    textAlign: 'left',
    fontSize: '12px',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    borderBottom: '1px solid #e5e7eb',
  };

  const tdStyle = {
    padding: '12px',
    borderBottom: '1px solid #e5e7eb',
    fontSize: '14px',
  };

  return (
    <div style={{ overflowX: 'auto' }}>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>District</th>
            <th style={thStyle}>White</th>
            <th style={thStyle}>African-American</th>
            <th style={thStyle}>Asian-American</th>
            <th style={thStyle}>Latino/Hispanic</th>
            <th style={thStyle}>Dem. %</th>
            <th style={thStyle}>Repb. %</th>
            <th style={thStyle}>Party Wins</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index} style={{ backgroundColor: index % 2 === 0 ? '#ffffff' : '#f9fafb' }}>
              <td style={{ ...tdStyle, fontWeight: 'bold' }}>{row.district}</td>
              <td style={tdStyle}>{row.white}</td>
              <td style={tdStyle}>{row.africanAmerican}</td>
              <td style={tdStyle}>{row.asianAmerican}</td>
              <td style={tdStyle}>{row.latinoHispanic}</td>
              <td style={tdStyle}>{row.dem}</td>
              <td style={tdStyle}>{row.repb}</td>
              <td style={{ ...tdStyle, color: row.partyWins === 'Democrat' ? '#2563eb' : '#dc2626', fontWeight: 'bold' }}>
                {row.partyWins}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DistrictTable;