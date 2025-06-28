import axios from 'axios'
import React from 'react'
import {create} from 'zustand'
import api from '../lib/axios'
import toast from 'react-hot-toast';

const useAuth = create ((set)=>({
    authUser:null,
    isSignUp:false,
    isLogging:false,
    isCheckAuth:true, 

    checkAuth:async ()=>{
        try {
            console.log("Checking auth...");
            const res= await api.get("/auth/check");
            console.log("Auth check response:", res.data);
            set({authUser:res.data})
        } catch (error) {
            console.log("ERROR in checkAuth",error);
            set({authUser:null});
        } finally{
            set({isCheckAuth:false});
        }
    },

    signup: async(data)=>{
        set({isSignUp:true});
        try {
            console.log("Signing up with data:", data);
            const res = await api.post("/auth/signUp", data);
            console.log("Signup response:", res.data);
            toast.success("Account created successfully");
            set({authUser:res.data});
        } catch (error) {
            console.log("ERROR in signup",error);
            toast.error(error.response?.data?.message || "Signup failed");
        } finally{
            set({isSignUp:false});
        }
    },

    login: async(data)=>{
        set({isLogging:true});
        try {
            console.log("Logging in with data:", data);
            const res = await api.post("/auth/login", data);
            console.log("Login response:", res.data);
            toast.success("Logged in successfully");
            set({authUser:res.data});
        } catch (error) {
            console.log("ERROR in login",error);
            toast.error(error.response?.data?.message || "Login failed");
        } finally{
            set({isLogging:false});
        }
    }
}));

export default useAuth;