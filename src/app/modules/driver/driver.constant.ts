export const driverFilterableFields: string[] = ['searchTerm', 'vehicleId'];

export const driverSearchableFields: string[] = ['vehicleId'];

export const driverRelationalFields: string[] = ['vehicleId', 'driverId'];
export const driverRelationalFieldsMapper: { [key: string]: string } = {
  vehicleId: 'vehicle',
  driverId: 'driver',
};
