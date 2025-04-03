import sys
import joblib
import xgboost as xgb
import pandas as pd

# Load model + encoder
model = joblib.load('need_factor_model.pkl')
encoder = joblib.load('area_encoder.pkl')

# Get args: area, students, books
area = sys.argv[1]
students = int(sys.argv[2])
libraryBooks = int(sys.argv[3])

area_encoded = encoder.transform([area])[0]

X = pd.DataFrame([[area_encoded, students, libraryBooks]], columns=['area_encoded', 'students', 'libraryBooks'])

# Predict
prediction = model.predict(X)[0]
print(prediction)
