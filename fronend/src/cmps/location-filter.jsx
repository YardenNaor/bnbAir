import React, { useEffect, useState } from 'react'


export function LocationFilter({ handleChange, filterBy }) {

    const [filterByRegion, SetfilterByRegion] = useState(filterBy.region)
    // const [IsDisabled, setIsDisabled] = useState(true)

    useEffect(() => {
        //    console.log('filterByCapacity at capacityfilter udeeffect:',filterByCapacity) 
        handleChange({ name: 'region', value: filterByRegion })
    }, [filterByRegion])

    function onSetRegion(value) {
        // console.log('value:', value)
        SetfilterByRegion(value)
    }


    const regions = [
        { txt: 'I\'m flexible', value: 'flexible' },
        { txt: 'Middle East', value: 'middle east' },
        { txt: 'Europe', value: 'europe' },
        { txt: 'United States', value: 'united states' },
        { txt: 'France', value: 'france' },
        { txt: 'South America', value: 'south america' }
    ]

    return (
        <section className="location-filter">
            <p className='title'>Search by region</p>
            {regions.map((region) => {
                return <article key={region.value}>
                    <div className="img-container"
                        onClick={() => onSetRegion(region.value)}>
                        <img src={require(`../assets/img/${region.value}.jpg`)} alt="" />
                    </div>
                    <p>{region.txt}</p>
                </article>
            })}
        </section>
    )
}

// {`../assets/img/${region.value}.jpg`}