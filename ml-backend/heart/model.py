
import numpy as np
import matplotlib.pyplot as plt
import pandas as pd
import joblib

dataset = pd.read_csv('uiHeart.csv')
X = dataset.iloc[:, :-1].values
y = dataset.iloc[:, -1].values

from sklearn.model_selection import train_test_split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size = 0.25, random_state = 0)

from sklearn.preprocessing import StandardScaler
sc = StandardScaler()
X_train= sc.fit_transform(X_train)
X_test = sc.transform(X_test)
joblib.dump(sc,'scaler.pkl')

from sklearn.naive_bayes import GaussianNB
classifier = GaussianNB()
classifier.fit(X_train, y_train)
joblib.dump(classifier,'model.pkl')