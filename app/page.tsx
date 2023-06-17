"use client"
import Link from "next/link"

import { siteConfig } from "@/config/site"
import { buttonVariants } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import WeatherPage from "./locationWeather/page"
import { useState } from "react"


export default function IndexPage() {

  const [madeRequest, setMadeRequest] = useState(false)
  const [city, setCity] = useState({})

  const displayCityWeather = async (cityRequest:any) =>{
    await cityRequest.preventDefault()
    const cityToFetch = cityRequest.target[0].value
    const fetchCity = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${cityToFetch}&appid=d5de881f5aa5bc04c30ee6b1cdde2adb`)
    const cityInfo = await fetchCity.json()
    if(cityInfo.message === "city not found"){
      return console.log("city not found")
  }
    await setCity(cityInfo)
    await setMadeRequest(true)
  }

  if (madeRequest) {
    return (
      <WeatherPage cityChoice={city}/>
    )
  } else {
    return (
      <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
        <div className="flex max-w-[980px] flex-col items-start gap-2">
          <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
            Whats the weather like?
          </h1>
          <p className="max-w-[700px] text-lg text-muted-foreground">
            Look up the weather of any location, on earth. Just earth for now.
          </p>
        </div>
        <form onSubmit={displayCityWeather}>
          <Input id="citychoice" className="w-1/4"/>
          <div className="flex gap-4">
            <button type="submit" className={buttonVariants()}>
              Check the weather
            </button>
          </div>
        </form>
      </section>
    )
  }
}
