export interface Room{

    totalRooms: number;
    availableRooms: number;
    occupiedRooms: number;


}

export interface RoomsList{

    roomNumber?: string; 
    roomType: string;
    amenities: string;
    price: number;
    checkInTime: Date;
    checkOutTime: Date;
    rating: number;

}