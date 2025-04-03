import pandas as pd
import xgboost as xgb
from sklearn.preprocessing import LabelEncoder
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score
import joblib

# Load dataset
df = pd.read_csv('school_data.csv')

# Encode area
le = LabelEncoder()
df['area_encoded'] = le.fit_transform(df['area'])

# Features & target
X = df[['area_encoded', 'students', 'libraryBooks']]
y = df['needFactor']

# Train/test split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)

# Train model
model = xgb.XGBClassifier(objective='multi:softmax', num_class=5)
model.fit(X_train, y_train)

# Save model and label encoder
joblib.dump(model, 'need_factor_model.pkl')
joblib.dump(le, 'area_encoder.pkl')

# Optional: Evaluate
preds = model.predict(X_test)
print("Accuracy:", accuracy_score(y_test, preds))
