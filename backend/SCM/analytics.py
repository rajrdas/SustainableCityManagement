import pandas as pd
from sklearn.cluster import KMeans
from sklearn.linear_model import LinearRegression


def get_bike_clusters():
    print("Getting bike clusters")
    bikedata = pd.read_csv('./SCM/utilities/bikedata.csv')
    bikedata = bikedata.groupby('time').agg('mean')
    bikedata = bikedata.astype(int)
    bikedata = bikedata / bikedata.max()
    clusters = 2
    kmeans = KMeans(n_clusters=clusters).fit(bikedata.T)
    predict = kmeans.predict(bikedata.T)
    locations = pd.read_csv('./SCM/utilities/locations.csv')
    locations = locations[['Name', 'Latitude', 'Longitude']]
    locations = locations.set_index('Name')
    locations['Cluster'] = pd.Series(index=bikedata.T.index.values, data=predict)
    locations.to_csv('./SCM/utilities/cluster.csv')


def get_bike_predictions():
    print("Getting bike predictions")
    location = pd.read_csv('./SCM/utilities/locations.csv')
    bikedata = pd.read_csv('./SCM/utilities/bikedata.csv')
    time_file = pd.read_csv('./SCM/utilities/time.csv')
    train_x = pd.get_dummies(bikedata['time'], drop_first=True)
    test_x = pd.get_dummies(time_file['time'], drop_first=True)
    for x in location['Name']:
        y = bikedata[x]
        lr = LinearRegression()
        model = lr.fit(train_x, y)
        predict = model.predict(test_x)
        time_file[x] = predict
        time_file[x] = time_file[x].astype(int)
    time_file.to_csv('./SCM/utilities/prediction.csv')
