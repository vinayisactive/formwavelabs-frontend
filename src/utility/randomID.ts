"use client"

export const randomID = () : string => {
    return Math.floor(Math.random() * 10001).toString(); 
}

