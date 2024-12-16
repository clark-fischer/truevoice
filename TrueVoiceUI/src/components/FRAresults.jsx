import React from "react";

const ElectoralResultsTable = ({ fips, characteristic }) => {
  // Data source
  const data = {
    NV: {
      FAIR: {
        1: {
          D1: 219733,
          D2: 175695,
          D3: 220119,
          D4: 190412,
          R1: 209470,
          R2: 166977,
          R3: 209615,
          R4: 181365,
        },
      },
      AVERAGE: {
        1: {
          D1: 219725,
          D2: 190458,
          D3: 175710,
          D4: 220082,
          R1: 181046,
          R2: 209530,
          R3: 209518,
          R4: 167214,
        },
      },
      DEMFAVORED: {
        1: {
          D1: 219640,
          D2: 220273,
          D3: 190338,
          D4: 175699,
          R1: 181305,
          R2: 209958,
          R3: 167056,
          R4: 209087,
        },
      },
      REPFAVORED: {
        1: {
          D1: 220449,
          D2: 175307,
          D3: 219781,
          D4: 190280,
          R1: 181398,
          R2: 167113,
          R3: 209579,
          R4: 209328,
        },
      },
    },
    CO: {
      FAIR: {
        1: {
          D1: 203839,
          D2: 204539,
          D3: 174314,
          R1: 217590,
          R2: 130153,
          R3: 152463,
        },
        2: {
          D1: 171604,
          D2: 185958,
          D3: 163421,
          D4: 185667,
          D5: 185571,
          R1: 137345,
          R2: 179082,
          R3: 144340,
          R4: 156115,
          R5: 179331,
        },
      },
      AVERAGE: {
        1: {
          D1: 190931,
          D2: 191651,
          D3: 163530,
          R1: 165001,
          R2: 140539,
          R3: 236075,
        },
        2: {
          D1: 194024,
          D2: 169475,
          D3: 193042,
          D4: 193020,
          D5: 178451,
          R1: 170536,
          R2: 148514,
          R3: 170951,
          R4: 130953,
          R5: 137584,
        },
      },
      DEMFAVORED: {
        1: {
          D1: 197548,
          D2: 168705,
          D3: 198030,
          R1: 125364,
          R2: 209443,
          R3: 146772,
        },
        2: {
          D1: 189119,
          D2: 189661,
          D3: 174812,
          D4: 190060,
          D5: 166488,
          R1: 140141,
          R2: 182739,
          R3: 147653,
          R4: 183050,
          R5: 159468,
        },
      },
      REPFAVORED: {
        1: {
          D1: 231836,
          D2: 138942,
          D3: 162224,
          R1: 176921,
          R2: 176853,
          R3: 151258,
        },
        2: {
          D1: 184626,
          D2: 210111,
          D3: 209831,
          D4: 210383,
          D5: 194313,
          R1: 141757,
          R2: 162691,
          R3: 124718,
          R4: 131144,
          R5: 162941,
        },
      },
    },
  };

  // Candidate information
  const candidateInfo = {
    NV: [
      { district: 1, dem: "Dina Titus", rep: "Joyce Bentley" },
      { district: 2, dem: "Patricia Ackerman", rep: "Mark Amodei" },
      { district: 3, dem: "Susie Lee", rep: "Daniel Rodimer" },
      { district: 4, dem: "Steven Horsford", rep: "Jim Marchant" },
    ],
    CO: [
      { district: 1, dem: "Diana DeGette", rep: "Jennifer Qualteri" },
      { district: 2, dem: "Joe Neguse", rep: "Marshall Dawson" },
      { district: 3, dem: "Adam Frisch", rep: "Lauren Boebert" },
      { district: 4, dem: "Ike McCorkle", rep: "Ken Buck" },
      { district: 5, dem: "David Torres", rep: "Doug Lamborn" },
      { district: 6, dem: "Jason Crow", rep: "Steve Monahan" },
      { district: 7, dem: "Brittany Pettersen", rep: "Erik Aadland" },
      { district: 8, dem: "Yadira Caraveo", rep: "Barbara Krikmeyer" },
    ],
  };

  // Determine winners and losers based on votes
  const getCandidatesSorted = (districtData) => {
    return Object.entries(districtData)
      .map(([key, votes]) => ({
        key,
        votes,
        party: key.startsWith("D") ? "Democratic" : "Republican",
        candidate: key.startsWith("D")
          ? candidateInfo[fips].find((c) => `D${c.district}` === key)?.dem
          : candidateInfo[fips].find((c) => `R${c.district}` === key)?.rep,
      }))
      .sort((a, b) => b.votes - a.votes);
  };

  function formatNumberWithCommas(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  // Render a single table
  const renderTable = (candidates, numWinners, n) => {
    const rows = candidates.map((candidate, index) => (
      <tr key={candidate.key}>
        <td>{candidate.candidate}</td>
        <td>{candidate.party}</td>
        <td>{formatNumberWithCommas(candidate.votes)}</td>
        <td>{index < numWinners ? "Win" : "Lose"}</td>
      </tr>
    ));

    return (
      <table border="1" style={{  width: "100%" }}>
        <thead>
          <tr style={{ fontWeight: "bold" }}>
            <td>Candidates (District {n})</td>
            <td>Party</td>
            <td>Votes</td>
            <td>Result</td>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    );
  };

  // Get data and candidate information based on fips
  const currentData = data[fips]?.[characteristic];

  if (!currentData) {
    return <div>Invalid fips or characteristic.</div>;
  }

  // Render tables based on fips
  if (fips === "CO") {
    const firstTableCandidates = getCandidatesSorted(currentData["1"]);
    const secondTableCandidates = getCandidatesSorted(currentData["2"]);

    return (
      <div>
        {/* <p style={{fontWeight: "bold"}}>District 1</p> */}
        {renderTable(firstTableCandidates, 3, 1)}
        {/* <p style={{fontWeight: "bold"}}>District 2</p> */}
        {renderTable(secondTableCandidates, 5, 2)}
      </div>
    );
  }

  if (fips === "NV") {
    const candidates = getCandidatesSorted(currentData["1"]);
    return <div>{renderTable(candidates, 4, 1)}</div>;
  }

  return <div>Invalid data structure.</div>;
};

export default ElectoralResultsTable;
