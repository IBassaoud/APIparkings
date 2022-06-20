const express = require('express');
const fs = require('fs');
const { off } = require('process');
const url = require('url');

const app = express();
const port = 8080;

// let parkings = fs.readFileSync('parkings.json');
// let myparking = JSON.parse(parkings);
// let reservation = fs.readFileSync('reservations.json');
// let myreservation = JSON.parse(reservation);

// console.log(parkings[0].id);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));


//Affiche mon fichier HTML 
app.get("/", function(req, res){
    res.sendFile(__dirname+"/index.html");
});

//########## PARKINGS ##########
//Affiche tout les éléments contenue dans mon tableau parkings
app.get('/parkings/', function(req, res) {
    fs.readFile('parkings.json', (err, data) => {
        if (err) throw err;
        let myparking = JSON.parse(data);
        res.json(myparking)
        console.log("Ca marche mon frère, check les parkings")
    });
 
});

//Séléctionne et affiche un élément dans mon tableau contenant les parkings
app.get('/parkings/:id', function(req, res) {
    fs.readFile('parkings.json', (err, data) => {
        if (err) throw err;
        const id = req.params.id;       
        let lookforParking = JSON.parse(data).find(parking => parking.id == id)
        res.send(lookforParking)
    });
});

//Séléctionne et supprime un élément dans mon tableau contenant les parkings et sauvegarde les modifications dans le fichier JSON
app.delete('/parkings/:id', function(req, res) {
    fs.readFile('parkings.json', (err, data) => {
        if (err) throw err;
        let myparkings = JSON.parse(data);
        const id = parseInt(req.params.id);       
        const found = myparkings.find(parking => parking.id == id);
        myparkings.splice(myparkings.indexOf(found), 1);
        console.log(myparkings)
        res.send(myparkings)
        fs.writeFile('parkings.json', JSON.stringify(myparkings, null, 4), (err) => {
            if(err) throw err;
            console.log("-----\nLe parking : "+ found.id +" a été supprimé avec sucès\n-----");
            });
    });
});

//Ajoute un élément dans mon tableau contenant les parkings et sauvegarde les modifications dans le fichier JSON
app.post('/parkings/', function(req, res) {
    // const new_park_id = req.params.id;
    fs.readFile('parkings.json', (err, data) => {
        if (err) throw err;
        let myparkings = JSON.parse(data);
        myparkings.push(req.body);
        //console.log(req.body);
        res.send(myparkings);
        console.log(myparkings)
        fs.writeFile('parkings.json', JSON.stringify(myparkings, null, 4), (err) => {
            if(err) throw err;
            console.log("The Parking "+req.body.id+ " was successfuly added !");
            });
    });
})

//Séléctionne et modifie un élément dans mon tableau contenant les parkings et sauvegarde les modifications dans le fichier JSON
app.patch('/parkings/:id', function(req, res) {
    fs.readFile('parkings.json', (err, data) => {
        if (err) throw err;
        let myparkings = JSON.parse(data);
        const id = parseInt(req.params.id);       
        let selectedParking = myparkings.find(parking => parking.id == id);
        selectedParking.id = req.body.id ;
        selectedParking.name = req.body.name +" "+ selectedParking.id ;
        selectedParking.type = req.body.type ;
        selectedParking.city = req.body.city ;
        res.send(myparkings);
        fs.writeFile('parkings.json', JSON.stringify(myparkings, null, 4), (err) => {
            if(err) throw err;
            console.log("The Parking "+req.body.id+ " was successfuly added !");
            });
    });
});

//########## RESERVATIONS ##########
//Affiche tout les éléments contenue dans mon tableau reservations
app.get('/parkings/:id/reservations/', function(req, res) {
    fs.readFile('reservations.json', (err, data) => {
        if (err) throw err;
        let myreservations = JSON.parse(data);
        res.json(myreservations)
        console.log("Ca marche mon frère, check les parkings")
    });
 
});

//Séléctionne et affiche un élément dans mon tableau contenant les parkings
app.get('/parkings/:id/reservations/:idR', function(req, res) {
    fs.readFile('reservations.json', (err, data) => {
        if (err) throw err;
        const idPRK = req.params.id; 
        const idRSV = req.params.idR;       
        let lookforReservation = JSON.parse(data).find(reservation => reservation.id == idRSV)
        res.send(lookforReservation)
    });
});

//Séléctionne et supprime un élément dans mon tableau contenant les parkings et sauvegarde les modifications dans le fichier JSON
app.delete('/parkings/:id/reservations/:idR', function(req, res) {
    fs.readFile('reservations.json', (err, data) => {
        if (err) throw err;
        let myreservations = JSON.parse(data);
        const id = parseInt(req.params.id);       
        const found = myreservations.find(reservation => reservation.id == id);
        myreservations.splice(myreservations.indexOf(found), 1);
        console.log(myreservations)
        res.send(myreservations)
        fs.writeFile('reservations.json', JSON.stringify(myreservations, null, 4), (err) => {
            if(err) throw err;
            console.log("-----\nLa reservation : "+ found.id +" a été supprimé avec sucès\n-----");
            });
    });
});

//Ajoute un élément dans mon tableau contenant les parkings et sauvegarde les modifications dans le fichier JSON
app.post('/parkings/:id/reservations/', function(req, res) {
    // const new_park_id = req.params.id;
    fs.readFile('reservations.json', (err, data) => {
        if (err) throw err;
        let myreservations = JSON.parse(data);
        myreservations.push(req.body);
        //console.log(req.body);
        res.send(myreservations);
        console.log(myreservations)
        fs.writeFile('reservations.json', JSON.stringify(myreservations, null, 4), (err) => {
            if(err) throw err;
            console.log("The Parking "+req.body.id+ " was successfuly added !");
            });
    });
});

//Séléctionne et modifie un élément dans mon tableau contenant les parkings et sauvegarde les modifications dans le fichier JSON
app.patch('/parkings/:id/reservations/:idR', function(req, res) {
    fs.readFile('reservations.json', (err, data) => {
        if (err) throw err;
        let myreservations = JSON.parse(data);
        const idRSV = parseInt(req.params.idR);       
        let selectedReservation = myreservations.find(reservation => reservation.id == idRSV);
        selectedReservation.id = req.body.id ;
        selectedReservation.parking = req.body.parking ;
        selectedReservation.parkingId = req.body.parkingId ;
        selectedReservation.city = req.body.city ;
        selectedReservation.clientName = req.body.clientName ;
        selectedReservation.vehicle = req.body.vehicle ;
        selectedReservation.licensePlate = req.body.licensePlate;
        selectedReservation.checkin = req.body.checkin ;
        selectedReservation.checkout = req.body.checkout ;
        res.send(myreservations);
        fs.writeFile('reservations.json', JSON.stringify(myreservations, null, 4), (err) => {
            if(err) throw err;
            console.log("The Parking "+req.body.id+ " was successfuly added !");
            });
    });
});

app.listen(port);
console.log('Server started at http://localhost:' + port);
