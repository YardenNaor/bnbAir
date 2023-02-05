import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { stayService } from "../services/stay.service"


export function StayEdit() {
    const [isLoading, setIsLoading] = useState(false)
    const [stayToEdit, setStayToEdit] = useState(stayService.getEmptyStay())
    const navigate = useNavigate()
    const { id: stayId } = useParams()

    useEffect(() => {
        if (!stayId) return
        loadStay()
    }, [])


    async function loadStay() {
        try {
            setIsLoading(true)
            const stay = await stayService.getById(stayId)
            setStayToEdit(stay)
            setIsLoading(false)

        } catch (err) {
            console.log('error getting stay, in stay-edit')
            navigate('/stay')
            throw err
        }
    }

    function handleChange({ target }) {
        let { value, name: field, type } = target
        value = type === 'number' ? +value : value
        setStayToEdit((prevStay) => ({ ...prevStay, [field]: value }))
    }

    async function onSaveStay(ev) {
        ev.preventDefault()
        try {
            const stay = await stayService.save(stayToEdit)
            console.log("stay is saved!")
            navigate('/')

        } catch (err) {
            console.log("error saving stay")
            navigate('/')
            throw err
        }
    }

    return <section>
        {isLoading && <div class="loader"></div>}
        {!isLoading && <div>
        <h2>{stayToEdit._id ? 'Edit this stay' : 'Create a new stay'}</h2>
        <form onSubmit={onSaveStay}>
            <label htmlFor="name">Stay name:</label>
            <input type="text"
                name="name"
                id="name"
                placeholder="Enter a stay name"
                value={stayToEdit.name}
                onChange={handleChange}
            />

            <label htmlFor="price">Price</label>
            <input type="number"
                name="price"
                id="price"
                placeholder="Enter a price per night"
                value={stayToEdit.price}
                onChange={handleChange} />
            
            <label htmlFor="summery">summery</label>
            <textarea type="text"
            name="summery"
            id="summery"
            placeholder="Enter a summery"
            value={stayToEdit.summery}
            onChange={handleChange}
            />

            <div>
                <button>{stayToEdit._id ? 'Save stay' : 'Add a new stay'}</button>
                <Link to="/">Cancel</Link>
            </div>
        </form>
        </div>}
    </section>
}