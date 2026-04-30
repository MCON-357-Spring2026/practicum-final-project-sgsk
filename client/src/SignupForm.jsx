import { useState } from 'react';
import './SignupForm.css';

function SignupForm() {
    const [formData, setFormData] = useState({
        first_name: '',
        phone_number: '',
        location_lat: null,
        location_lng: null,
        location_label: '',
        zmanim_opinion: 'gra',
        alert_preferences: [18]
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleGPS = () => {
        navigator.geolocation.getCurrentPosition(
            (pos) => {
                setFormData({
                    ...formData,
                    location_lat: pos.coords.latitude,
                    location_lng: pos.coords.longitude,
                    location_label: `${pos.coords.latitude.toFixed(4)}, ${pos.coords.longitude.toFixed(4)}`
                });
            },
            (err) => {
                alert('Could not get location. Please enter it manually.');
            }
        );
    };

    return (
        <div className="signup-card">
            <h2>Create your alert</h2>
            <p className="card-subtitle">One-time setup · takes under a minute</p>

            <div className="form-group">
                <label>First name</label>
                <input
                    name="first_name"
                    placeholder="Sarah"
                    value={formData.first_name}
                    onChange={handleChange}
                />
            </div>

            <div className="form-group">
                <label>Phone number</label>
                <input
                    name="phone_number"
                    placeholder="+1 (212) 555-0100"
                    value={formData.phone_number}
                    onChange={handleChange}
                />
            </div>

            <div className="form-group">
                <label>Zmanim opinion</label>
                <div className="select-wrapper">
                    <select
                        name="zmanim_opinion"
                        value={formData.zmanim_opinion}
                        onChange={handleChange}
                    >
                        <option value="gra">Gra</option>
                        <option value="baalhatanya">Baal HaTanya</option>
                        <option value="MGA">Magen Avraham</option>
                    </select>
                </div>
            </div>

            <div className="form-group">
                <label>Alert timing</label>
                <div className="alert-inputs">
                    {formData.alert_preferences.map((alert, index) => (
                        <div className="alert-row" key={index}>
                            <input
                                type="number"
                                value={alert}
                                onChange={(e) => {
                                    const updated = [...formData.alert_preferences];
                                    updated[index] = parseInt(e.target.value);
                                    setFormData({ ...formData, alert_preferences: updated });
                                }}
                            />
                            <span className="unit-label">minutes before</span>
                        </div>
                    ))}
                    {formData.alert_preferences.length < 3 && (
                        <button
                            className="btn-add-alert"
                            onClick={() => setFormData({
                                ...formData,
                                alert_preferences: [...formData.alert_preferences, 18]
                            })}
                        >
                            + Add another alert
                        </button>
                    )}
                </div>
            </div>

            <div className="form-group">
                <label>Location</label>
                <div className="location-row">
                    <input
                        name="location_label"
                        placeholder="City, State"
                        value={formData.location_label}
                        onChange={handleChange}
                    />
                    <button className="btn-gps" onClick={handleGPS}>
                        Detect
                    </button>
                </div>
            </div>

            <div className="divider" />

            <button className="btn-submit">
                Send me Shabbat alerts
            </button>
        </div>
    );
}

export default SignupForm;