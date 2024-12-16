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
          D1: 264834,
          D2: 264949,
          D3: 176126,
          R1: 106172,
          R2: 159314,
          R3: 319242,
        },
        2: {
          D1: 162281,
          D2: 202715,
          D3: 271374,
          D4: 270954,
          D5: 271177,
          R1: 380770,
          R2: 189434,
          R3: 253248,
          R4: 151590,
          R5: 380093,
        },
      },
      AVERAGE: {
        1: {
          D1: 242300,
          D2: 160832,
          D3: 241390,
          R1: 214266,
          R2: 429247,
          R3: 142498,
        },
        2: {
          D1: 214791,
          D2: 171436,
          D3: 286024,
          D4: 286756,
          D5: 286818,
          R1: 216783,
          R2: 325361,
          R3: 129349,
          R4: 162346,
          R5: 325497,
        },
      },
      DEMFAVORED: {
        1: {
          D1: 259489,
          D2: 259317,
          D3: 172700,
          R1: 424835,
          R2: 141007,
          R3: 211945,
        },
        2: {
          D1: 164254,
          D2: 274657,
          D3: 205653,
          D4: 275452,
          D5: 274373,
          R1: 130956,
          R2: 327558,
          R3: 163695,
          R4: 218162,
          R5: 327712,
        },
      },
      REPFAVORED: {
        1: {
          D1: 237810,
          D2: 476126,
          D3: 158609,
          R1: 258695,
          R2: 258029,
          R3: 171320,
        },
        2: {
          D1: 173322,
          D2: 289002,
          D3: 288877,
          D4: 216509,
          D5: 172987,
          R1: 216487,
          R2: 433119,
          R3: 173005,
          R4: 173635,
          R5: 434043,
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
