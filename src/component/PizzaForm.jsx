import React, { useState, useEffect } from 'react';
import axios from "axios";
import * as yup from "yup";


const initialFormValues = {
    fLname: "", // text input 
    size: "", //dropdown
    toppings: false, //checkbox
    specialInstructions: "", //text input
}



const PizzaForm = () => {
    const [form, setForm] = useState(initialFormValues)

    return(
        <div>
            <form onSubmit = {submit}>
                <h2>Build your own pizza</h2>
                <h3>Choice of size</h3>
                <h4>Required</h4>
                <label>
                    {"Enter your name"}
                    <input
                        onChange = {change}
                        type = "text"
                        name = "fLname"
                        value = {form.fLname}
                    />
                </label>

                <label>
                    {"Size"}
                    <select
                        onChange = {change}
                        name = "size"
                        value = {form.size}
                    >
                        <option value = "">- Select an Option -</option>
                        <option value = "small">Small</option>
                        <option value = "medium">Medium</option>
                        <option value = "large">Large</option>
                    </select>
                </label>

                <label>
                    
                </label>
            </form>

        </div>
    )
}

export default PizzaForm