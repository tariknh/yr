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
    <section className="p-6 flex grid-cols-6 grid-rows-6 flex-col items-center gap-6 pt-6 md:p-10 xl:grid">
     <Image className="absolute -z-10 blur-[2px]" src="/sun.jpeg" fill={true} alt={"image"}/>
        <form className="col-start-2 col-span-1 row-start-2 w-full flex flex-col gap-3" onSubmit={newCity}>
            <Input placeholder="Look up another city..." className="bg-muted" ></Input>
            <button type="submit" className={buttonVariants()}>
              Search
            </button>
        </form>
      <div className="w-full col-start-4 flex-col lg:flex-row col-span-3 row-span-1 flex items-center justify-between rounded-lg bg-foreground p-8">
        <h1 className="text-4xl font-extrabold leading-tight tracking-tighter text-muted md:text-4xl">{city.city.name}</h1>
        <Image src={`https://openweathermap.org/img/wn/${city.list[0].weather[0].icon}@2x.png`} width={100} height={100} alt={"Current Weather Icon"}/>
        <div className="flex flex-col">
            <p className="text-5xl text-muted">
            {(city.list[0].main.temp - 273.15).toFixed(1)}&#176;C
            </p>
            <p className="text-sm mt-2 text-muted text-right">
                Feels like {(city.list[0].main.feels_like - 273.15).toFixed(1)}&#176;C
            </p>
        </div>
      </div>
      <div className="w-full col-start-4 col-span-3 row-start-2 row-span-2 h-full flex flex-col rounded-lg bg-foreground p-8 gap-5">
        <h1 className="text-4xl font-extrabold leading-tight tracking-tighter text-muted md:text-4xl">Following Hours</h1>
        <div className="sm:m-auto p-8 sm:p-0 justify-evenly sm:justify-start flex-col sm:flex-row gap-3 sm:gap-5 flex">
            {city.list.map((info:any, value: any) =>{
                if(value<5){
                    return(
                        <div key={value} className="w-full justify-center flex sm:h-fit sm:w-24 flex-col items-center gap-2 rounded-lg bg-muted p-2">
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
