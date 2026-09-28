from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI
from pydantic import BaseModel
import pandas as pd
import joblib

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://network-intrusion-detection-frontend.onrender.com"],,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
model = joblib.load("final_model.pkl")
preprocess = joblib.load("preprocessor.pkl")


@app.get("/")
def home():
    return {"message": "Welcome to my backend"}


class NetworkFlow(BaseModel):
    Protocol: int
    Flow_Duration: int
    Total_Fwd_Packets: int
    Total_Backward_Packets: float
    Fwd_Packets_Length_Total: float
    Bwd_Packets_Length_Total: float
    Fwd_Packet_Length_Max: float
    Fwd_Packet_Length_Min: float
    Fwd_Packet_Length_Mean: float
    Fwd_Packet_Length_Std: float
    Bwd_Packet_Length_Max: float
    Bwd_Packet_Length_Min: float
    Bwd_Packet_Length_Mean: float
    Bwd_Packet_Length_Std: float
    Flow_Bytes_s: float
    Flow_Packets_s: float
    Flow_IAT_Mean: float
    Flow_IAT_Std: float
    Flow_IAT_Max: float
    Flow_IAT_Min: float
    Fwd_IAT_Total: float
    Fwd_IAT_Mean: float
    Fwd_IAT_Std: float
    Fwd_IAT_Max: float
    Fwd_IAT_Min: float
    Bwd_IAT_Total: float
    Bwd_IAT_Mean: float
    Bwd_IAT_Std: float
    Bwd_IAT_Max: float
    Bwd_IAT_Min: float
    Fwd_PSH_Flags: int
    Bwd_PSH_Flags: int
    Fwd_URG_Flags: int
    Bwd_URG_Flags: int
    Fwd_Header_Length: float
    Bwd_Header_Length: float
    Fwd_Packets_s: float
    Bwd_Packets_s: float
    Packet_Length_Min: float
    Packet_Length_Max: float
    Packet_Length_Mean: float
    Packet_Length_Std: float
    Packet_Length_Variance: float
    FIN_Flag_Count: int
    SYN_Flag_Count: int
    RST_Flag_Count: int
    PSH_Flag_Count: int
    ACK_Flag_Count: int
    URG_Flag_Count: int
    CWE_Flag_Count: int
    ECE_Flag_Count: int
    Down_Up_Ratio: float
    Avg_Packet_Size: float
    Avg_Fwd_Segment_Size: float
    Avg_Bwd_Segment_Size: float
    Fwd_Avg_Bytes_Bulk: float
    Fwd_Avg_Packets_Bulk: float
    Fwd_Avg_Bulk_Rate: float
    Bwd_Avg_Bytes_Bulk: float
    Bwd_Avg_Packets_Bulk: float
    Bwd_Avg_Bulk_Rate: float
    Subflow_Fwd_Packets: float
    Subflow_Fwd_Bytes: float
    Subflow_Bwd_Packets: float
    Subflow_Bwd_Bytes: float
    Init_Fwd_Win_Bytes: float
    Init_Bwd_Win_Bytes: float
    Fwd_Act_Data_Packets: float
    Fwd_Seg_Size_Min: float
    Active_Mean: float
    Active_Std: float
    Active_Max: float
    Active_Min: float
    Idle_Mean: float
    Idle_Std: float
    Idle_Max: float
    Idle_Min: float


@app.post("/NetworkFlow")
def create_schema(network_flow: NetworkFlow):

    data = network_flow.model_dump()

    df = pd.DataFrame([data])

    df.columns = preprocess.feature_names_in_

    processed_data = preprocess.transform(df)
    prediction = model.predict(processed_data)
    probability = model.predict_proba(processed_data)[0][prediction[0]]
   
    if prediction[0] == 0:
      result = "Benign"
    else:
       result = "DoS Attack"

    return {
    "prediction": int(prediction[0]),
    "classification": result,
    "confidence": round(float(probability), 4)
    

}
@app.get("/health")
def health():
    return {
        "status": "healthy",
        "model_loaded": True,
        "preprocessor_loaded": True
    }
@app.get("/demo-samples")
def get_demo_samples():
    df = pd.read_csv("ids_demo_samples1.csv")

    return {
        "samples": df.to_dict(orient="records")
    }

