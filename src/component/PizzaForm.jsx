import React, { useState, useEffect } from 'react';
import axios from "axios";
import * as yup from "yup";
import {useHistory} from 'react-router-dom'


const initialState = {
    fLname: "", // text input 
    size: "", //dropdown
    pepperoni: false, //checkbox
    chicken: false,
    ham: false,
    bacon: false,
    specialInstructions: "", //text input
}



const PizzaForm = (props) => {

    const formSchema = yup.object().shape({
        fLname: yup.string().min(2, "name must be at least 2 characters"), 
        size: yup.string().min(1,"Please select a size"),
        pepperoni: yup.boolean(),
        chicken: yup.boolean(),
        ham: yup.boolean(),
        bacon: yup.boolean(),
        specialInstructions: yup.string()
    })


    const {newOrder} = props
    // const history = useHistory()
    const [form, setForm] = useState(initialState)
    const [disabled, setDisabled] = useState(true)
    const [error, setError] = useState({
        fLname: "",
        size: ""
    })

    const validateChange = (name, value) => {
        yup.reach(formSchema, name)
            .validate(value)
            .then(()=>{
                setError({...error, [name]: ""})
            })
            .catch((err)=>{
                setError({...error,[name]: err.errors[0]})
            })
    }

    const change = (e) => {
        const {name, type, checked} = e.target
        let {value} = e.target
        value = type === "checkbox" ? checked : value
        validateChange(name, value)
        setForm({...form, [name]: value})
    }

    const submit = (e) => {
        e.preventDefault()

        axios.post("https://reqres.in/api/orders", form)
            .then(res => {
                console.log(res.data)
                newOrder(res.data)
                setForm(initialState)
                // history.push("/")
            }).catch(err => console.error(err))
    }

    useEffect(() => {
        formSchema.isValid(form)
            .then((enabled)=> {
                setDisabled(!enabled)
            })
    }, [form])



    return(
        <div>
            <form id = "pizza-form" onSubmit = {submit}>
                <h2>Build your own pizza</h2>
 
                <label>
                    Enter your name: <span>{`${error.fLname}`}</span>
                    <input
                        id = "name-input"
                        onChange = {change}
                        type = "text"
                        name = "fLname"
                        value = {form.fLname}
                    />
                </label>

                <label>
                    Size: <span>{`${error.size}`}</span>
                    <select
                        id = "size-dropdown"
                        onChange = {change}
                        name = "size"
                    >
                        <option value = "">- Please Select -</option>
                        <option value = "Small">Small</option>
                        <option value = "Medium">Medium</option>
                        <option value = "Large">Large</option>
                    </select>
                </label>

                <h3>Toppings</h3>
                <label>Pepperoni
                    <input
                        onChange = {change}
                        type = "checkbox"
                        name = "pepperoni"
                        checked = {form.pepperoni}
                    />
                </label>

                <label>Chicken
                    <input
                        onChange = {change}
                        type = "checkbox"
                        name = "chicken"
                        checked = {form.chicken}
                    />
                </label>

                <label>Ham
                    <input
                        onChange = {change}
                        type = "checkbox"
                        name = "ham"
                        checked = {form.ham}
                    />
                </label>

                <label>Bacon
                    <input
                        onChange = {change}
                        type = "checkbox"
                        name = "bacon"
                        checked = {form.bacon}
                    />
                </label>

                <label>
                    {"Special Instructions?"}
                    <input
                        id = "special-text"
                        onChange = {change}
                        type = "text"
                        name = "specialInstructions"
                        value = {form.specialInstructions}
                    />
                </label>          
                <button id = "order-button" disabled = {disabled} type ="submit">Add to Order</button>      
            </form>

        </div>
    )
}

export default PizzaForm