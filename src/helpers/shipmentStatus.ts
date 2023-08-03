export type ShipmentStatus = 'Arrived' | 'In Transit' | 'Not Departed Yet';
export function determineShipmentStatus(departureDate: string, arrivalDateOriginal: string): ShipmentStatus {
  const now = new Date('2023-02-14 14:00:00 UTC')
  const departure = new Date(departureDate)
  const arrival = new Date(arrivalDateOriginal)

  if (arrival < now && departure < now) {
    return 'Arrived';
  } else if (arrival > now && departure < now) {
    return 'In Transit';
  } else {
    return 'Not Departed Yet';
  }
}
