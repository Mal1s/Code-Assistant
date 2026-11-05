import { cities } from "./cities";
import { services } from "./services";

export interface FreightRoute {
  from: string;
  to: string;
  distance: string;
  time: string;
  price: string;
}

export function getFreightRouteSlug(from: string, to: string) {
  return `${from.toLowerCase()}-${to.toLowerCase().replace(/ /g, "-")}`;
}

export const freightRoutes: Record<string, FreightRoute> = {};

for (const city of Object.values(cities)) {
  for (const route of city.popularRoutes) {
    freightRoutes[getFreightRouteSlug(route.from, route.to)] ??= route;
  }
}

for (const service of Object.values(services)) {
  for (const route of service.popularRoutes) {
    freightRoutes[getFreightRouteSlug(route.from, route.to)] ??= route;
  }
}
