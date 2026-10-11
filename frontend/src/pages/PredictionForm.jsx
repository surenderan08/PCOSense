import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ShieldCheck, ArrowRight, ArrowLeft, RefreshCw, Star, MapPin, Sparkles } from "lucide-react";
import axios from "axios";
import RiskGauge from "../components/RiskGauge";
import DietExerciseCard from "../components/DietExerciseCard";

export default function PredictionForm() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("pcosense_user") || "null");
  const [activeTab, setActiveTab] = useState(0);
  const [loading, setLoading] = useState(false);
  const [predictionData, setPredictionData] = useState(null);

  const [formData, setFormData] = useState({
    // Tab 1: Biometrics
    "Age (yrs)": "",
    "Weight (Kg)": "",
    "Height(Cm)": "",
    "Blood Group": "14.0",
    "Pulse rate(bpm)": "",
    "BP _Systolic (mmHg)": "",
    "BP _Diastolic (mmHg)": "",
    "Marraige Status (Yrs)": "",
    "Pregnant(Y/N)": "0",
    "No. of aborptions": "0",

    // Tab 2: Symptoms
    "Cycle(R/I)": "2",
    "Cycle length(days)": "",
    "Weight gain(Y/N)": "0",
    "hair growth(Y/N)": "0",
    "Skin darkening (Y/N)": "0",
    "Hair loss(Y/N)": "0",
    "Pimples(Y/N)": "0",
    "Fast food (Y/N)": "1",
    "Reg.Exercise(Y/N)": "0",
    "RR (breaths/min)": "",
    "Hb(g/dl)": "",

    // Tab 3: Lab Tests (Advanced)
    "I beta-HCG(mIU/mL)": "",
    "II beta-HCG(mIU/mL)": "",
    "FSH(mIU/mL)": "",
    "LH(mIU/mL)": "",
    "TSH (mIU/L)": "",
    "AMH(ng/mL)": "",
    "PRL(ng/mL)": "",
    "Vit D3 (ng/mL)": "",
    "PRG(ng/mL)": "",
    "RBS(mg/dl)": "",
    "Follicle No. (L)": "",
    "Follicle No. (R)": "",
    "Avg. F size (L) (mm)": "",
    "Avg. F size (R) (mm)": "",
    "Endometrium (mm)": "",
    "Hip(inch)": "",
    "Waist(inch)": ""
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const weight = parseFloat(formData["Weight (Kg)"]);
  const height = parseFloat(formData["Height(Cm)"]);
  const bmi = (weight && height) ? (weight / ((height / 100) ** 2)).toFixed(2) : null;

  const waist = parseFloat(formData["Waist(inch)"]);
  const hip = parseFloat(formData["Hip(inch)"]);
  const waistHipRatio = (waist && hip) ? (waist / hip).toFixed(2) : null;

  const fsh = parseFloat(formData["FSH(mIU/mL)"]);
  const lh = parseFloat(formData["LH(mIU/mL)"]);
  const fshLhRatio = (fsh && lh) ? (fsh / lh).toFixed(2) : null;

  const handleNext = () => {
    setActiveTab(prev => Math.min(prev + 1, 2));
  };

  const handleBack = () => {
    setActiveTab(prev => Math.max(prev - 1, 0));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const payload = {};
    Object.keys(formData).forEach(key => {
      const val = formData[key];
      if (val !== "") {
        payload[key] = parseFloat(val);
      }
    });

    if (user) {
      payload["user_id"] = user.id;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/predict", payload);
      setPredictionData(response.data);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      console.error(err);
      alert("Error calculating risk prediction. Please ensure the Flask backend is running on port 5000.");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setPredictionData(null);
    setActiveTab(0);
    setFormData({
      "Age (yrs)": "", "Weight (Kg)": "", "Height(Cm)": "", "Blood Group": "14.0",
      "Pulse rate(bpm)": "", "BP _Systolic (mmHg)": "", "BP _Diastolic (mmHg)": "",
      "Marraige Status (Yrs)": "", "Pregnant(Y/N)": "0", "No. of aborptions": "0",
      "Cycle(R/I)": "2", "Cycle length(days)": "", "Weight gain(Y/N)": "0",
      "hair growth(Y/N)": "0", "Skin darkening (Y/N)": "0", "Hair loss(Y/N)": "0",
      "Pimples(Y/N)": "0", "Fast food (Y/N)": "1", "Reg.Exercise(Y/N)": "0",
      "RR (breaths/min)": "", "Hb(g/dl)": "", "I beta-HCG(mIU/mL)": "",
      "II beta-HCG(mIU/mL)": "", "FSH(mIU/mL)": "", "LH(mIU/mL)": "",
      "TSH (mIU/L)": "", "AMH(ng/mL)": "", "PRL(ng/mL)": "", "Vit D3 (ng/mL)": "",
      "PRG(ng/mL)": "", "RBS(mg/dl)": "", "Follicle No. (L)": "", "Follicle No. (R)": "",
      "Avg. F size (L) (mm)": "", "Avg. F size (R) (mm)": "", "Endometrium (mm)": "",
      "Hip(inch)": "", "Waist(inch)": ""
    });
  };

  const mockDoctors = [
    { name: "Dr. Ananya Sharma", speciality: "Senior Obstetrician & Gynecologist", exp: "15+ Yrs Exp", clinic: "Veda Womens Clinic, Indiranagar", rating: 4.9 },
    { name: "Dr. Priya Patel", speciality: "Infertility & Reproductive Endocrinologist", exp: "12+ Yrs Exp", clinic: "Nurture Fertility Care, Whitefield", rating: 4.8 },
    { name: "Dr. Kavitha Reddy", speciality: "Consultant Gynecologist & PCOS Expert", exp: "10+ Yrs Exp", clinic: "Care & Cure Clinic, Jayanagar", rating: 4.7 }
  ];

  if (predictionData) {
    return (
      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "0 24px 60px 24px" }} className="animate-fade-in">
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <h1 style={{ fontSize: "2.2rem", fontWeight: 800 }}>Assessment <span className="gradient-text">Results</span></h1>
          <p style={{ color: "var(--text-secondary)", marginTop: "4px" }}>AI prediction report for PCOS risk</p>
        </div>

        <div className="glass-panel" style={{ padding: "32px", marginBottom: "32px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "32px", alignItems: "center" }}>
            <RiskGauge probability={predictionData.probability} riskLevel={predictionData.risk_level} />

            <div>
              <h2 style={{ fontSize: "1.5rem", fontWeight: 800, marginBottom: "16px" }}>Assessment Insight</h2>
              <p style={{ color: "var(--text-secondary)", lineHeight: "1.6", fontSize: "0.98rem", marginBottom: "20px" }}>
                {predictionData.recommendations.medical_advice}
              </p>

              <div style={{ display: "flex", gap: "12px" }}>
                <button onClick={resetForm} className="btn btn-secondary">
                  <RefreshCw size={16} />
                  Retake Test
                </button>
                {predictionData.risk_level !== "Low" && (
                  <a
                    href="https://www.practo.com/search/doctors?results_type=doctor&q=[%7B'word':'gynecologist','autocompleted':true,'category':'subspeciality'%7D]"
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-primary"
                  >
                    Consult on Practo
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>

        <h2 style={{ fontSize: "1.6rem", fontWeight: 800, margin: "40px 0 20px 0" }}>
          <span className="gradient-text">Personalized Diet & Workout Plans</span>
        </h2>
        <DietExerciseCard recommendations={predictionData.recommendations} />

        {predictionData.risk_level !== "Low" && (
          <div className="glass-panel" style={{ padding: "32px", marginTop: "40px" }}>
            <h3 style={{ fontSize: "1.3rem", fontWeight: 700, marginBottom: "6px" }}>Consult Top Specialists Nearby</h3>
            <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", marginBottom: "24px" }}>
              Based on your risk score, we recommend scheduling an evaluation with local Gynecologists or Endocrinologists.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {mockDoctors.map((doc, idx) => (
                <div key={idx} style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexWrap: "wrap",
                  gap: "16px",
                  padding: "20px",
                  borderRadius: "12px",
                  background: "rgba(255,255,255,0.01)",
                  border: "1px solid rgba(255,255,255,0.04)"
                }}>
                  <div>
                    <h4 style={{ fontWeight: 700, color: "var(--text-primary)", display: "flex", alignItems: "center", gap: "8px" }}>
                      {doc.name}
                      <span style={{ fontSize: "0.8rem", padding: "2px 8px", background: "rgba(251, 191, 36, 0.1)", color: "#fbbf24", borderRadius: "6px", display: "inline-flex", alignItems: "center", gap: "2px" }}>
                        <Star size={12} fill="#fbbf24" /> {doc.rating}
                      </span>
                    </h4>
                    <p style={{ color: "var(--text-secondary)", fontSize: "0.85rem", marginTop: "2px" }}>{doc.speciality} • {doc.exp}</p>
                    <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.8rem", marginTop: "6px", display: "flex", alignItems: "center", gap: "4px" }}>
                      <MapPin size={12} /> {doc.clinic}
                    </p>
                  </div>

                  <a
                    href={`https://www.practo.com/search/doctors?results_type=doctor&q=[%7B'word':'${encodeURIComponent(doc.name)}','autocompleted':true,'category':'doctor'%7D]`}
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-secondary"
                    style={{ padding: "8px 16px", fontSize: "0.85rem" }}
                  >
                    Book via Practo
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "0 24px 60px 24px" }} className="animate-fade-in">
      <div style={{ textAlign: "center", marginBottom: "32px" }}>
        <h1 style={{ fontSize: "2.2rem", fontWeight: 800 }}>PCOS Risk <span className="gradient-text">Diagnostics</span></h1>
        <p style={{ color: "var(--text-secondary)", marginTop: "4px" }}>Fill out your health metrics for predictive analysis</p>
      </div>

      <div style={{ display: "flex", background: "rgba(255, 255, 255, 0.02)", border: "1px solid rgba(255, 255, 255, 0.05)", borderRadius: "12px", padding: "6px", marginBottom: "32px", overflowX: "auto" }}>
        {["1. Biometrics & Lifestyle", "2. Physical Symptoms", "3. Laboratory Tests (Optional)"].map((tabName, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => setActiveTab(idx)}
            style={{
              flex: 1,
              padding: "12px 6px",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: 600,
              fontSize: "0.9rem",
              backgroundColor: activeTab === idx ? "var(--accent-rose)" : "transparent",
              color: activeTab === idx ? "white" : "var(--text-secondary)",
              whiteSpace: "nowrap",
              minWidth: "160px",
              transition: "var(--transition)"
            }}
          >
            {tabName}
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="glass-panel" style={{ padding: "36px" }}>
        {activeTab === 0 && (
          <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            <h3 style={{ fontSize: "1.2rem", fontWeight: 700, borderBottom: "1px solid rgba(255,255,255,0.05)", paddingBottom: "10px" }}>Basic & Physical Biometrics</h3>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "20px" }}>
              <div>
                <label style={{ display: "block", marginBottom: "8px", fontSize: "0.85rem", color: "var(--text-secondary)" }}>Age (years) *</label>
                <input type="number" name="Age (yrs)" value={formData["Age (yrs)"]} onChange={handleInputChange} placeholder="e.g. 28" required min="10" max="60" />
              </div>
              <div>
                <label style={{ display: "block", marginBottom: "8px", fontSize: "0.85rem", color: "var(--text-secondary)" }}>Weight (Kg) *</label>
                <input type="number" name="Weight (Kg)" value={formData["Weight (Kg)"]} onChange={handleInputChange} placeholder="e.g. 58" required min="30" max="150" />
              </div>
              <div>
                <label style={{ display: "block", marginBottom: "8px", fontSize: "0.85rem", color: "var(--text-secondary)" }}>Height (Cm) *</label>
                <input type="number" name="Height(Cm)" value={formData["Height(Cm)"]} onChange={handleInputChange} placeholder="e.g. 158" required min="100" max="220" />
              </div>
            </div>

            {bmi && (
              <div style={{ padding: "12px 16px", borderRadius: "8px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)", fontSize: "0.9rem", color: "var(--text-secondary)" }}>
                Calculated Body Mass Index (BMI): <strong style={{ color: "var(--accent-rose)" }}>{bmi} kg/m²</strong> (Typical range: 18.5 - 24.9)
              </div>
            )}

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "20px" }}>
              <div>
                <label style={{ display: "block", marginBottom: "8px", fontSize: "0.85rem", color: "var(--text-secondary)" }}>Pulse Rate (bpm)</label>
                <input type="number" name="Pulse rate(bpm)" value={formData["Pulse rate(bpm)"]} onChange={handleInputChange} placeholder="e.g. 72" />
              </div>
              <div>
                <label style={{ display: "block", marginBottom: "8px", fontSize: "0.85rem", color: "var(--text-secondary)" }}>Systolic BP (mmHg)</label>
                <input type="number" name="BP _Systolic (mmHg)" value={formData["BP _Systolic (mmHg)"]} onChange={handleInputChange} placeholder="e.g. 110" />
              </div>
              <div>
                <label style={{ display: "block", marginBottom: "8px", fontSize: "0.85rem", color: "var(--text-secondary)" }}>Diastolic BP (mmHg)</label>
                <input type="number" name="BP _Diastolic (mmHg)" value={formData["BP _Diastolic (mmHg)"]} onChange={handleInputChange} placeholder="e.g. 80" />
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "20px" }}>
              <div>
                <label style={{ display: "block", marginBottom: "8px", fontSize: "0.85rem", color: "var(--text-secondary)" }}>Marriage Status (Years)</label>
                <input type="number" name="Marraige Status (Yrs)" value={formData["Marraige Status (Yrs)"]} onChange={handleInputChange} placeholder="Years married" />
              </div>
              <div>
                <label style={{ display: "block", marginBottom: "8px", fontSize: "0.85rem", color: "var(--text-secondary)" }}>Are you Pregnant?</label>
                <select name="Pregnant(Y/N)" value={formData["Pregnant(Y/N)"]} onChange={handleInputChange}>
                  <option value="0">No</option>
                  <option value="1">Yes</option>
                </select>
              </div>
              <div>
                <label style={{ display: "block", marginBottom: "8px", fontSize: "0.85rem", color: "var(--text-secondary)" }}>Number of Abortions</label>
                <input type="number" name="No. of aborptions" value={formData["No. of aborptions"]} onChange={handleInputChange} min="0" />
              </div>
            </div>
          </div>
        )}

        {activeTab === 1 && (
          <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            <h3 style={{ fontSize: "1.2rem", fontWeight: 700, borderBottom: "1px solid rgba(255,255,255,0.05)", paddingBottom: "10px" }}>Period Cycle & Symptoms</h3>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "20px" }}>
              <div>
                <label style={{ display: "block", marginBottom: "8px", fontSize: "0.85rem", color: "var(--text-secondary)" }}>Period Regularity *</label>
                <select name="Cycle(R/I)" value={formData["Cycle(R/I)"]} onChange={handleInputChange}>
                  <option value="2">Regular Periods</option>
                  <option value="4">Irregular Periods</option>
                </select>
              </div>
              <div>
                <label style={{ display: "block", marginBottom: "8px", fontSize: "0.85rem", color: "var(--text-secondary)" }}>Typical Cycle Length (days) *</label>
                <input type="number" name="Cycle length(days)" value={formData["Cycle length(days)"]} onChange={handleInputChange} placeholder="e.g. 5" required />
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "20px" }}>
              <div>
                <label style={{ display: "block", marginBottom: "8px", fontSize: "0.85rem", color: "var(--text-secondary)" }}>Unexplained Weight Gain?</label>
                <select name="Weight gain(Y/N)" value={formData["Weight gain(Y/N)"]} onChange={handleInputChange}>
                  <option value="0">No</option>
                  <option value="1">Yes</option>
                </select>
              </div>
              <div>
                <label style={{ display: "block", marginBottom: "8px", fontSize: "0.85rem", color: "var(--text-secondary)" }}>Excessive Hair Growth (Hirsutism)?</label>
                <select name="hair growth(Y/N)" value={formData["hair growth(Y/N)"]} onChange={handleInputChange}>
                  <option value="0">No</option>
                  <option value="1">Yes</option>
                </select>
              </div>
              <div>
                <label style={{ display: "block", marginBottom: "8px", fontSize: "0.85rem", color: "var(--text-secondary)" }}>Skin Darkening / Pigmentation?</label>
                <select name="Skin darkening (Y/N)" value={formData["Skin darkening (Y/N)"]} onChange={handleInputChange}>
                  <option value="0">No</option>
                  <option value="1">Yes</option>
                </select>
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "20px" }}>
              <div>
                <label style={{ display: "block", marginBottom: "8px", fontSize: "0.85rem", color: "var(--text-secondary)" }}>Excessive Hair Loss / Thinning?</label>
                <select name="Hair loss(Y/N)" value={formData["Hair loss(Y/N)"]} onChange={handleInputChange}>
                  <option value="0">No</option>
                  <option value="1">Yes</option>
                </select>
              </div>
              <div>
                <label style={{ display: "block", marginBottom: "8px", fontSize: "0.85rem", color: "var(--text-secondary)" }}>Pimples / Acne break outs?</label>
                <select name="Pimples(Y/N)" value={formData["Pimples(Y/N)"]} onChange={handleInputChange}>
                  <option value="0">No</option>
                  <option value="1">Yes</option>
                </select>
              </div>
              <div>
                <label style={{ display: "block", marginBottom: "8px", fontSize: "0.85rem", color: "var(--text-secondary)" }}>Do you consume Fast Food regularly?</label>
                <select name="Fast food (Y/N)" value={formData["Fast food (Y/N)"]} onChange={handleInputChange}>
                  <option value="1">Yes</option>
                  <option value="0">No</option>
                </select>
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "20px" }}>
              <div>
                <label style={{ display: "block", marginBottom: "8px", fontSize: "0.85rem", color: "var(--text-secondary)" }}>Do you exercise regularly?</label>
                <select name="Reg.Exercise(Y/N)" value={formData["Reg.Exercise(Y/N)"]} onChange={handleInputChange}>
                  <option value="0">No</option>
                  <option value="1">Yes</option>
                </select>
              </div>
              <div>
                <label style={{ display: "block", marginBottom: "8px", fontSize: "0.85rem", color: "var(--text-secondary)" }}>Respiratory Rate (breaths/min)</label>
                <input type="number" name="RR (breaths/min)" value={formData["RR (breaths/min)"]} onChange={handleInputChange} placeholder="e.g. 18" />
              </div>
              <div>
                <label style={{ display: "block", marginBottom: "8px", fontSize: "0.85rem", color: "var(--text-secondary)" }}>Hemoglobin Hb (g/dl)</label>
                <input type="number" step="0.1" name="Hb(g/dl)" value={formData["Hb(g/dl)"]} onChange={handleInputChange} placeholder="e.g. 11" />
              </div>
            </div>
          </div>
        )}

        {activeTab === 2 && (
          <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            <div style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              borderBottom: "1px solid rgba(255,255,255,0.05)",
              paddingBottom: "10px"
            }}>
              <h3 style={{ fontSize: "1.2rem", fontWeight: 700 }}>Lab Test Reports</h3>
              <span style={{ fontSize: "0.8rem", color: "var(--accent-rose)", padding: "2px 8px", background: "rgba(214, 51, 132, 0.05)", borderRadius: "6px" }}>Optional • Autofills Medians if blank</span>
            </div>

            <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", lineHeight: "1.4" }}>
              If you have diagnostic blood tests or ultrasound scans, input them here. If left blank, our system will intelligently fill these parameters with the median values of typical patients to run the calculation.
            </p>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "20px" }}>
              <div>
                <label style={{ display: "block", marginBottom: "8px", fontSize: "0.85rem", color: "var(--text-secondary)" }}>FSH level (mIU/mL)</label>
                <input type="number" step="0.01" name="FSH(mIU/mL)" value={formData["FSH(mIU/mL)"]} onChange={handleInputChange} placeholder="e.g. 4.8" />
              </div>
              <div>
                <label style={{ display: "block", marginBottom: "8px", fontSize: "0.85rem", color: "var(--text-secondary)" }}>LH level (mIU/mL)</label>
                <input type="number" step="0.01" name="LH(mIU/mL)" value={formData["LH(mIU/mL)"]} onChange={handleInputChange} placeholder="e.g. 2.3" />
              </div>
              <div>
                <label style={{ display: "block", marginBottom: "8px", fontSize: "0.85rem", color: "var(--text-secondary)" }}>AMH level (ng/mL)</label>
                <input type="number" step="0.1" name="AMH(ng/mL)" value={formData["AMH(ng/mL)"]} onChange={handleInputChange} placeholder="e.g. 3.7" />
              </div>
            </div>

            {fshLhRatio && (
              <div style={{ padding: "10px", borderRadius: "6px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)", fontSize: "0.85rem", color: "var(--text-secondary)" }}>
                Calculated FSH/LH Ratio: <strong style={{ color: "var(--accent-rose)" }}>{fshLhRatio}</strong> (Elevated LH or ratio below 1 can indicate PCOS)
              </div>
            )}

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "20px" }}>
              <div>
                <label style={{ display: "block", marginBottom: "8px", fontSize: "0.85rem", color: "var(--text-secondary)" }}>Follicle Count (Left Ovary)</label>
                <input type="number" name="Follicle No. (L)" value={formData["Follicle No. (L)"]} onChange={handleInputChange} placeholder="e.g. 5" />
              </div>
              <div>
                <label style={{ display: "block", marginBottom: "8px", fontSize: "0.85rem", color: "var(--text-secondary)" }}>Follicle Count (Right Ovary)</label>
                <input type="number" name="Follicle No. (R)" value={formData["Follicle No. (R)"]} onChange={handleInputChange} placeholder="e.g. 6" />
              </div>
              <div>
                <label style={{ display: "block", marginBottom: "8px", fontSize: "0.85rem", color: "var(--text-secondary)" }}>Endometrium thickness (mm)</label>
                <input type="number" step="0.1" name="Endometrium (mm)" value={formData["Endometrium (mm)"]} onChange={handleInputChange} placeholder="e.g. 8.5" />
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "20px" }}>
              <div>
                <label style={{ display: "block", marginBottom: "8px", fontSize: "0.85rem", color: "var(--text-secondary)" }}>Waist Size (inches)</label>
                <input type="number" name="Waist(inch)" value={formData["Waist(inch)"]} onChange={handleInputChange} placeholder="e.g. 34" />
              </div>
              <div>
                <label style={{ display: "block", marginBottom: "8px", fontSize: "0.85rem", color: "var(--text-secondary)" }}>Hip Size (inches)</label>
                <input type="number" name="Hip(inch)" value={formData["Hip(inch)"]} onChange={handleInputChange} placeholder="e.g. 38" />
              </div>
              <div>
                <label style={{ display: "block", marginBottom: "8px", fontSize: "0.85rem", color: "var(--text-secondary)" }}>TSH Thyroid (mIU/L)</label>
                <input type="number" step="0.01" name="TSH (mIU/L)" value={formData["TSH (mIU/L)"]} onChange={handleInputChange} placeholder="e.g. 2.26" />
              </div>
            </div>

            {waistHipRatio && (
              <div style={{ padding: "10px", borderRadius: "6px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)", fontSize: "0.85rem", color: "var(--text-secondary)" }}>
                Calculated Waist:Hip Ratio: <strong style={{ color: "var(--accent-rose)" }}>{waistHipRatio}</strong> (Healthy range for women: &lt; 0.85)
              </div>
            )}

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "20px" }}>
              <div>
                <label style={{ display: "block", marginBottom: "8px", fontSize: "0.85rem", color: "var(--text-secondary)" }}>Prolactin PRL (ng/mL)</label>
                <input type="number" step="0.01" name="PRL(ng/mL)" value={formData["PRL(ng/mL)"]} onChange={handleInputChange} placeholder="e.g. 21.9" />
              </div>
              <div>
                <label style={{ display: "block", marginBottom: "8px", fontSize: "0.85rem", color: "var(--text-secondary)" }}>Vit D3 level (ng/mL)</label>
                <input type="number" step="0.1" name="Vit D3 (ng/mL)" value={formData["Vit D3 (ng/mL)"]} onChange={handleInputChange} placeholder="e.g. 25.9" />
              </div>
              <div>
                <label style={{ display: "block", marginBottom: "8px", fontSize: "0.85rem", color: "var(--text-secondary)" }}>Random Blood Sugar RBS (mg/dl)</label>
                <input type="number" name="RBS(mg/dl)" value={formData["RBS(mg/dl)"]} onChange={handleInputChange} placeholder="e.g. 100" />
              </div>
            </div>
          </div>
        )}

        <div style={{ display: "flex", justifyContent: "space-between", marginTop: "40px", borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: "24px" }}>
          {activeTab > 0 ? (
            <button type="button" onClick={handleBack} className="btn btn-secondary">
              <ArrowLeft size={16} />
              Back
            </button>
          ) : (
            <div />
          )}

          {activeTab < 2 ? (
            <button type="button" onClick={handleNext} className="btn btn-primary">
              Next Step
              <ArrowRight size={16} />
            </button>
          ) : (
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? "Analysing Metrics..." : "Run AI Diagnostics"}
              <ShieldCheck size={18} />
            </button>
          )}
        </div>
      </form>
    </div>
  );
}