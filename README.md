# Obij - Restaurant
Provide food static API
 - name of item
 - image
 - price of item
 - description of item

#  Clone and switch branch
Clone the repo with ssh
```
git clone git@github.com:aurellemeless/obij.git
```
OR

Clone the repo with https
```
git clone https://github.com/aurellemeless/obij.git
```


Switch branch
```
git checkout static-api
```
#  Installation

Move to api directory
```
cd api
```

Install the dependencies 

```
npm install
```
Start the server

```
npm start
```
Enjoy with Obij API
#  Check the list

http://localhost:8001/meals

```js
[
    // ...
    {
        "id":5,
        "name" : "Name of the meal",
        "description" : " description of the meal",
        "image" : "URL of the meal",
        "price" : 0, // price of the meal as int,
    }
    // ...
]

```