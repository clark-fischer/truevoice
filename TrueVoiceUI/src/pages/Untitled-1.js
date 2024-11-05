
  useEffect(() => {
    // Function to fetch data from the Spring server
    const fetchDistrictsData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/nevada/districts/all"
        );
        console.log("Fetched data:", response.data); // Log the fetched data to the console
        set_state_smd(response.data);
      } catch (error) {
        console.error("Error fetching data:", error); // Log any error
      }
    };

    fetchDistrictsData(); // Call the function to fetch data
  }, []);


  {objects.map((o, i) => {
    return (
      <Tooltip key={i} label="These are Nevada's districts, as of 2024.">
        <button
          onClick={() => changeDistrictMap(state_smd)}
          style={styles.button}
        >
          {o.title}
        </button>
      </Tooltip>
    )
  })}