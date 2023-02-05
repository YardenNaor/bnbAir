import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import { labels } from '../services/stay.service'
import { uptadeFilter } from '../store/stay.actions'

export function FilterCarousel() {

    const currFilterBy = useSelector((state) => state.stayModule.filterBy)

    function handleChange(value) {
        uptadeFilter({ ...currFilterBy, 'type': value })
    }

    function getLable(label) {
        return <div className={`type-container ${label}`} >
            <img src={require(`../assets/img/${label}.jpeg`)} alt={label} />
            <p>{label}</p>
        </div>
    }

    const value = 0
    return <section>
        <Tabs
            value={value}
            variant="scrollable"
            scrollbuttons="auto"
        >
            {labels.map((label) => {
                return <Tab key={label} label={getLable(label)}
                    onClick={() => handleChange(label)} />
            })
            }


        </Tabs>


    </section>

}