import React, { useState, useEffect } from "react";
import "../App.css";

import StateSelector from "./StateSelector";
import CitySelector from "./CitySelector";
import BlockSelector from "./BlockSelector";
import PincodeSelector from "./PincodeSelector";

import API, { POST_API } from "../services/api";

function Home() {
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [blocks, setBlocks] = useState([]);
  const [pincodes, setPincodes] = useState([]);
  const [postOffices, setPostOffices] = useState([]);

  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedBlock, setSelectedBlock] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch States
  useEffect(() => {
    const fetchStates = async () => {
      try {
        setLoading(true);

        const response = await API.get("/countries/states");

        const india = response.data.data.find(
          (country) => country.name === "India"
        );

        if (india) {
          setStates(india.states);
        }
      } catch {
        setError("Unable to load states.");
      } finally {
        setLoading(false);
      }
    };

    fetchStates();
  }, []);

  // Fetch Cities
  useEffect(() => {
    if (!selectedState) return;

    const fetchCities = async () => {
      try {
        setLoading(true);

        const response = await API.post("/countries/state/cities", {
          country: "India",
          state: selectedState,
        });

        setCities(response.data.data);
      } catch {
        setError("Unable to load cities.");
      } finally {
        setLoading(false);
      }
    };

    fetchCities();
  }, [selectedState]);

  // Fetch Blocks
  useEffect(() => {
    if (!selectedCity) return;

    const fetchPostOffices = async () => {
      try {
        setLoading(true);

        const response = await POST_API.get(`/postoffice/${selectedCity}`);

        if (response.data[0].Status === "Success") {
          const offices = response.data[0].PostOffice;

          setPostOffices(offices);

          const uniqueBlocks = [
            ...new Set(
              offices.map((office) => office.Division || office.Taluk)
            ),
          ];

          setBlocks(uniqueBlocks);
          setError("");
        } else {
          setBlocks([]);
          setError("No blocks found.");
        }
      } catch {
        setError("Unable to load blocks.");
      } finally {
        setLoading(false);
      }
    };

    fetchPostOffices();
  }, [selectedCity]);

  // Fetch Pincodes
  useEffect(() => {
    if (!selectedBlock) return;

    const uniquePincodes = [
      ...new Set(
        postOffices
          .filter(
            (office) =>
              (office.Division || office.Taluk) === selectedBlock
          )
          .map((office) => office.Pincode)
      ),
    ];

    setPincodes(uniquePincodes);
  }, [selectedBlock, postOffices]);

  // Reset after changing State
  useEffect(() => {
    setSelectedCity("");
    setSelectedBlock("");
    setCities([]);
    setBlocks([]);
    setPincodes([]);
    setPostOffices([]);
    setError("");
  }, [selectedState]);

  // Reset after changing City
  useEffect(() => {
    setSelectedBlock("");
    setBlocks([]);
    setPincodes([]);
    setError("");
  }, [selectedCity]);

  const handleReset = () => {
    setSelectedState("");
    setSelectedCity("");
    setSelectedBlock("");

    setCities([]);
    setBlocks([]);
    setPincodes([]);
    setPostOffices([]);
    setError("");
  };

  return (
    <div className="container">
      <h1>Location Selector</h1>

      {loading && <p className="loading">Loading...</p>}

      <StateSelector
        states={states}
        selectedState={selectedState}
        setSelectedState={setSelectedState}
      />

      {selectedState && (
        <CitySelector
          cities={cities}
          selectedCity={selectedCity}
          setSelectedCity={setSelectedCity}
        />
      )}

      {error && <p className="error">{error}</p>}

      {selectedCity && (
        <BlockSelector
          blocks={blocks}
          selectedBlock={selectedBlock}
          setSelectedBlock={setSelectedBlock}
        />
      )}

      {selectedBlock && (
        <PincodeSelector pincodes={pincodes} />
      )}

      <button className="reset-btn" onClick={handleReset}>
        Reset
      </button>

      {selectedState && (
        <div className="summary">
          <h2>Selected Details</h2>

          <p><strong>State:</strong> {selectedState}</p>
          <p><strong>City:</strong> {selectedCity || "-"}</p>
          <p><strong>Block:</strong> {selectedBlock || "-"}</p>
          <p><strong>Pincodes:</strong> {pincodes.join(", ") || "-"}</p>
        </div>
      )}
    </div>
  );
}

export default Home;