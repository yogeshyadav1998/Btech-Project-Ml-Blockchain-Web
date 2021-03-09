import numpy as np
from flask import Flask, request, jsonify, render_template
import joblib
output=''
app = Flask(__name__) #Initialize the flask App
modelload = joblib.load('model.pkl')
scalerload=joblib.load('scaler.pkl')
@app.route('/')
def home():
    return render_template('index.html')

@app.route('/predict',methods=['POST'])
def predict():
    '''
    For rendering results on HTML GUI
    '''
    int_features = [float(x) for x in request.form.values()]
    final_features = [np.array(int_features)]
    
    print(final_features)
    prediction = modelload.predict(scalerload.transform(final_features))
    print(prediction)
    if prediction[0]==0:
        output='Less Chances'
    else:
        output='High Chances'
    return render_template('index.html', prediction_text=output)

if __name__ == "__main__":
    app.run(debug=True)