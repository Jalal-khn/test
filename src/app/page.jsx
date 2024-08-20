"use client";
import { countryData } from "@/data/data";
import { useState } from "react";
import { Data } from "@/actions/file";

export default function Home() {
  const [cities, setCities] = useState([]);
  const [province, setProvince] = useState("");
  const [city, setCity] = useState("");
  const [population, setPopulation] = useState(0);
  const [message, setMessage] = useState("");

  const handleProvinceChange = (e) => {
    const selectedValue = e.target.value;
    setProvince(selectedValue);
    const filteredCities = countryData.find((province) => province.name === selectedValue);
    setCities(filteredCities?.cities || []);
    setCity(""); // Clear selected city when province changes
    setPopulation(0); // Clear population when province changes
  };

  const handleCityChange = (e) => {
    const selectedValue = e.target.value;
    const filteredCities = cities.find((city) => city.name === selectedValue);
    setPopulation(filteredCities ? filteredCities.population : 0);
    setCity(selectedValue);
  };

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await Data({ province, city, population });
      setMessage(response.error || response.success || "Submission successful");
    } catch (error) {
      setMessage("An error occurred: " + error.message);
    }
    
    setProvince("");
    setCity("");
    setCities([]);
    setPopulation(0);
  }

  return (
    <main>
      <div className="flex flex-col gap-5 justify-center items-center h-screen">
        <p className="text-3xl font-bold">PAKISTAN</p>
        <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
          <label htmlFor="province" className="text-xl font-bold">Province</label>
          <select id="province" onChange={handleProvinceChange} className="border-black border-2 px-2 py-1 rounded-md">
            <option value="">Select Province</option>
            {countryData.map((province) => (
              <option key={province.id} value={province.name}>{province.name}</option>
            ))}
          </select>
          <label htmlFor="city" className="text-xl font-bold">City</label>
          <select id="city" onChange={handleCityChange} className="border-black border-2 px-2 py-1 rounded-md">
            <option value="">Select City</option>
            {cities.map((city) => (
              <option key={city.id} value={city.name}>{city.name}</option>
            ))}
          </select>
          <input
            readOnly
            type="text"
            value={population}
            className="border-2 border-black rounded-md inline"
          />
          <p>{message}</p>
          <button type="submit" className="p-2 bg-red-600 rounded-md">Submit</button>
        </form>
      </div>
    </main>
  );
}
