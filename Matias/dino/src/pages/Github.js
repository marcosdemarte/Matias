import { React, useState, useEffect } from "react";


export const Github = () => {

    const handleCV = () => {
        const url = 'https://drive.google.com/file/d/1wFm6JDE0dRr30xPzfTrbDgJF05G5LSwg/view?usp=drive_link';
        window.open(url, '_blank');
    };


    return (
        <section className="hidden">


            Contribuciones Github
            <br />

            <a href="https://github.com/marcosdemarte" target="_blank" className="pt-2 pb-2">https://github.com/marcosdemarte</a>

            <br />
            *link img
            {/**
                   * 
                    <ActivityCalendar data={data} />; 
                   * 
                   * 
                   */}

            Contribuciones Github


        </section>
    );
};
