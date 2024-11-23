

const DistrictTable = () => {
  const data = [
    {
      district: "District 1",
      white: "50%",
      dem: "60%",
      repb: "20%",
    },
    {
      district: "District 2",
      white: "60%",
  
      dem: "50%",
      repb: "40%",
    },
    {
      district: "District 3",
      white: "55%",
   
      dem: "55%",
      repb: "45%",
    },
    {
      district: "District 4",
      white: "45%",
      dem: "51%",
      repb: "49%",
    },
  ];

  const tableStyle = {
    width: "100%",
    borderCollapse: "collapse",
    fontFamily: "Arial, sans-serif",
  };

  const thStyle = {
    backgroundColor: "#f3f4f6",
    color: "#6b7280",
    padding: "12px",
    textAlign: "left",
    fontSize: "12px",
    fontWeight: "bold",
    textTransform: "uppercase",
    borderBottom: "1px solid #e5e7eb",
  };

  const tdStyle = {
    padding: "12px",
    borderBottom: "1px solid #e5e7eb",
    fontSize: "14px",
  };

  const headers = [
    "District",


    "Dem. %",
    "Repb. %",

  ];

  const columns = [
    "white",

    "dem",
    "repb"
];

  return (
    <div style={{ overflowX: "auto" }}>
      <table style={tableStyle}>
        <thead>
          <tr>

            {
              headers.map((header) => (
                <th style={thStyle}>{header}</th>
              ))
            }
            
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr
              key={index}
              style={{
                backgroundColor: index % 2 === 0 ? "#ffffff" : "#f9fafb",
              }}
            >
               {
                columns.map(col => (
                    <td key={col} style={tdStyle}>{row[col]}</td>
                ))
               }
              
         
              
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DistrictTable;
