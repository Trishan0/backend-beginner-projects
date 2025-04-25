import dotenv from 'dotenv';
import express from 'express';
import path from 'path';
import fs from 'fs';
import axios from 'axios';
import {fileURLToPath } from 'url'
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dotenvPath = path.join(__dirname, '../api/.env')
import { Router } from "express";


dotenv.config({path:dotenvPath});

const api = express();
const router = Router();

const API_KEY = process.env.API_KEY;

//async await method
async function getWeather() {
    try {
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);
    }catch (error) {
        console.error("Fetch failed:", error);
    }
}

// promises
const getWeatherPromise = ()=>{
    fetch(url)
        .then(response => response.json())
        .then(data =>console.log(data))
        .catch(error => console.error(error))
    console.log("Fetch successful! from promise")
}

// Proper async function
const getWeatherAxios = async (location) => {
    const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=us&include=days&key=${API_KEY}&contentType=json`

    try {
        const response = await axios.get(url);
        return response.data
    } catch (error) {
        console.error("Fetch failed:", error.message);
    }
};

router.get('/weather', async (req, res) => {
    const location = req.query.location || 'chicago'; // default fallback

    try {
        const data = await getWeatherAxios(location);

        // Extract specific data from each day
        const daysData = data.days.map(day => ({
            datetime: day.datetime,
            sunrise: day.sunrise,
            temp: day.temp,
            sunset: day.sunset,
            description: day.description
        }));
        fs.writeFile('weather.json', JSON.stringify(daysData), 'utf-8', (err) => {
            if (err) throw err;
            console.log('File is created successfully.');
        })
        // Send response with the extracted data
        res.json({
            location: data.address,
            days: daysData
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }

})
api.use(router);
const PORT = 3000;
api.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});