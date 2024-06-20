import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './LiftSimulator.css';

const LiftSimulator = () => {
    const [liftData, setLiftData] = useState({ level: 0, status: "Idle" });

    useEffect(() => {
        const interval = setInterval(() => {
            axios.get('http://45.55.200.160:5000/api/lift')
                .then(response => {
                    setLiftData(response.data);
                })
                .catch(error => {
                    console.error('There was an error fetching the lift data!', error);
                });
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const levels = [4, 3, 2, 1, 0];
    
    return (
        <div className="lift-container">
            <div className="lift">
                <div className="lift-shaft">
                    <div className="lift-car" style={{ bottom: `${liftData.level * 20}%` }}>
                        <div className="lift-status">
                            {liftData.status === "Idle" 
                                ? `Lift is at Level ${liftData.level}` 
                                : liftData.status}
                        </div>
                    </div>
                </div>
            </div>
            <div className="lift-controls">
                <h2>Lift Controls</h2>
                {levels.map(level => (
                    <div key={level} className="lift-indicator">
                        <div className={`light ${liftData.level === level ? 'active' : ''}`}></div>
                        <span>Level {level}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default LiftSimulator;
