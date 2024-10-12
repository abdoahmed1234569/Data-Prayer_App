import Prayer from "./component/Prayer"
import { useEffect, useState } from 'react';

function App() {

  const [prayerTime, setPrayerTimes] = useState({})
  const [dateTime, setDateTime] = useState("")
  const [city, setCity] = useState("Cairo")

  const cities = [
    { name: "Cairo", value: "Cairo" },
    { name: "Alexandria", value: "Alexandria" },
    { name: "Giza", value: "Giza" },
    { name: "Mansoura", value: "Mansoura" },
    { name: "Aswan", value: "Aswan" },
    { name: "Luxor", value: "Luxor" },
  ];

  useEffect(() => {
    
    const fetchPrayerApi = async () => {
      try {
        const res = await fetch(`https://api.aladhan.com/v1/timingsByCity/12-10-2024?city=Eg&country=${city}`)
        const {data} = await res.json()
        console.log(data);
        setPrayerTimes(data.timings)
        setDateTime(data.date.gregorian.date);
      } catch (err) {
        console.error(err);
      }
    }

    fetchPrayerApi()
  }, [city]);

  return (
    <section>
      <div className="container">
        <div className="top_section">
          <div className="city">
            <h3>City</h3>
            <select onChange={(e) => setCity(e.target.value)}>
              {cities.map((city) => (
                <option value={city.value} key={city.value}>
                  {city.name}
                </option>
              ))}
            </select>
          </div>
          <div className="date">
            <h3>Date</h3>
            <h4>{dateTime}</h4>
          </div>
        </div>
        <Prayer name="Fajr" time={prayerTime.Fajr} />
        <Prayer name="Dhuhr" time={prayerTime.Dhuhr} />
        <Prayer name="Asr" time={prayerTime.Asr} />
        <Prayer name="Maghrib" time={prayerTime.Maghrib} />
        <Prayer name="Isha" time={prayerTime.Isha} />
      </div>
    </section>
  );
}

export default App
