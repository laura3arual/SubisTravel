class Coords {
    latitude: number;
    longitude: number;
}

class Position {
   coords: Coords
    constructor(lat: number, lng: number = 0){
        this.coords = new Coords();
        this.coords.latitude = lat;
        this.coords.longitude = lng;
    }
}

class Marker {
    constructor(public lat: number, public lng: number, public label: string, public draggable: boolean) {

    }
}

export {Position, Marker};