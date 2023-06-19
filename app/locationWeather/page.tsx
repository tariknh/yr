"use state"
import Link from "next/link"

import { siteConfig } from "@/config/site"
import { buttonVariants } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Image from "next/image"
import { useState } from "react"


export default function WeatherPage(props: any) {

    let oldHourly = props.cityChoice.list
    let hourly = props.cityChoice
    const [city, setCity] = useState(props.cityChoice)

    const newCity = async (cityRequest:any) =>{
        await cityRequest.preventDefault()
        try {
            const cityToFetch = cityRequest.target[0].value
            const fetchCity = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${cityToFetch}&appid=d5de881f5aa5bc04c30ee6b1cdde2adb`)
            const cityInfo = await fetchCity.json()
            console.log(cityInfo)
            if(cityInfo.message === "city not found"){
                return console.log("city not found")
            }
            await setCity(cityInfo)
        } catch (error) {
            console.log(error)
        }
      }
    console.log(props)
  return (
    <section className="flex grid-cols-6 grid-rows-6 flex-col items-center gap-6 p-6 md:p-10 xl:grid">
     <Image className="absolute -z-10 blur-[2px]" src="/sun.jpeg" fill={true} alt={"image"}/>
        <form className="col-span-1 col-start-2 row-start-2 flex w-full flex-col gap-3" onSubmit={newCity}>
            <Input placeholder="Look up another city..." className="bg-muted" ></Input>
            <button type="submit" className={buttonVariants()}>
              Search
            </button>
        </form>
      <div className="col-span-3 col-start-4 row-span-1 flex w-full flex-col items-center justify-between rounded-lg bg-foreground p-8 lg:flex-row">
        <h1 className="text-4xl font-extrabold leading-tight tracking-tighter text-muted md:text-4xl">{city.city.name}</h1>
        <Image src={`https://openweathermap.org/img/wn/${city.list[0].weather[0].icon}@2x.png`} width={100} height={100} alt={"Current Weather Icon"}/>
        <div className="flex flex-col">
            <p className="text-5xl text-muted">
            {(city.list[0].main.temp - 273.15).toFixed(1)}&#176;C
            </p>
            <p className="mt-2 text-right text-sm text-muted">
                Feels like {(city.list[0].main.feels_like - 273.15).toFixed(1)}&#176;C
            </p>
        </div>
      </div>
      <div className="col-span-3 col-start-4 row-span-2 row-start-2 flex h-full w-full flex-col gap-5 rounded-lg bg-foreground p-8">
        <h1 className="text-4xl font-extrabold leading-tight tracking-tighter text-muted md:text-4xl">Following Hours</h1>
        <div className="flex flex-col justify-evenly gap-3 p-8 sm:m-auto sm:flex-row sm:justify-start sm:gap-5 sm:p-0">
            {city.list.map((info:any, value: any) =>{
                if(value<5){
                    return(
                        <div key={value} className="flex w-full flex-col items-center justify-center gap-2 rounded-lg bg-muted p-2 sm:h-fit sm:w-24">
                            <h1 className="font-bold">{(info.dt_txt).slice(11,16)}</h1>
                            <h2 className="text-3xl">{(info.main.temp-273.15).toFixed(0)}&#176;C</h2>
                            <Image src={`https://openweathermap.org/img/wn/${info.weather[0].icon}@2x.png`} width={100} height={100} alt={"Current Weather Icon"}/>
                        </div>
                    )
                }
            })
        }
        </div>
      </div>
    </section>
  )
}
