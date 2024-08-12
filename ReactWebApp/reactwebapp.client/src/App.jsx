import { useEffect, useState } from 'react';
import './App.css';

function App() {
    const [forecasts, setForecasts] = useState();

    useEffect(() => {
        populateWeatherData();
    }, []);

    const contents = forecasts === undefined
        ? <p><em>Loading... Please refresh once the ASP.NET backend has started. See <a href="https://aka.ms/jspsintegrationreact">https://aka.ms/jspsintegrationreact</a> for more details.</em></p>
        : <table className="table table-striped" aria-labelledby="tableLabel">
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Temp. (C)</th>
                    <th>Temp. (F)</th>
                    <th>Summary</th>
                </tr>
            </thead>
            <tbody>
                {forecasts.map(forecast =>
                    <tr key={forecast.date}>
                        <td>{forecast.date}</td>
                        <td>{forecast.temperatureC}</td>
                        <td>{forecast.temperatureF}</td>
                        <td>{forecast.summary}</td>
                    </tr>
                )}
            </tbody>
        </table>;

    return (
        <div>
            <h1 id="tableLabel">Weather forecast</h1>
            <p>This component demonstrates fetching data from the server.</p>
            {contents}
        </div>
    );
    
    async function populateWeatherData() {
        try {
            const response = await fetch('weatherforecast');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            // Đọc phản hồi dưới dạng văn bản
            const text = await response.text();

            // Nếu phản hồi trống, ném lỗi
            if (!text) {
                throw new Error('Response body is empty');
            }

            // Phân tích cú pháp JSON
            const data = JSON.parse(text);
            console.log('Fetched data:', data);
            setForecasts(data);
        } catch (error) {
            console.error('Fetch error:', error);
        }
    }

}

export default App;