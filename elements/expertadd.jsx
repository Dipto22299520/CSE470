import React, { useState } from "react";
import axios from "axios";
function myForm(){
    const[formData, setFormData]=useState({
        name:"",
        email:"",
        expert_in:"",
        phone_no:"",
        self_intro:""
    })
    const handleSubmit= async(e)=>{
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:5000/signup", formData);
            alert("Data submitted successfully!");
          }
        catch (err) {
            console.error(err);
            alert("Error submitting data");
          }
    }
}