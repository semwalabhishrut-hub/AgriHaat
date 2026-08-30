// ─── Farm2Market AI — Service Abstractions & Mock Providers ───
// These services isolate business & data logic from UI components.
// Later, when Supabase / Google Maps / Gemini API keys are supplied,
// only these service implementations change — all UI remains 100% untouched.

import {
  INITIAL_LISTINGS,
  INITIAL_ORDERS,
  INITIAL_PROCUREMENT_CENTRES,
  INITIAL_PROCUREMENT_BOOKINGS,
  INITIAL_DEMAND_FORECAST,
  INITIAL_NOTIFICATIONS,
  type ProduceListing,
  type Order,
  type ProcurementCentre,
  type ProcurementBooking,
  type LogisticsRoute,
  type DemandForecastData,
  type AppNotification,
} from "../store";

// Helper for local storage persistence
function getStorage<T>(key: string, defaultVal: T): T {
  if (typeof window === "undefined") return defaultVal;
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultVal;
  } catch {
    return defaultVal;
  }
}

function setStorage<T>(key: string, val: T): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(key, JSON.stringify(val));
  } catch {
    // ignore
  }
}

// ─── 1. Marketplace Service ───
export class MarketplaceService {
  static async getListings(): Promise<ProduceListing[]> {
    return getStorage("f2m_listings", INITIAL_LISTINGS);
  }

  static async getListingById(id: string): Promise<ProduceListing | null> {
    const listings = await this.getListings();
    return listings.find((l) => l.id === id) || null;
  }

  static async createListing(
    listing: Omit<ProduceListing, "id" | "createdAt" | "farmerRealizationPerKg" | "buyerPricePerKg" | "estimatedLogisticsPerKg" | "platformFeePerKg">
  ): Promise<ProduceListing> {
    const listings = await this.getListings();
    const logistics = 3;
    const platform = 1;
    const buyerPrice = listing.pricePerKg + logistics + platform;
    const farmerRealization = listing.pricePerKg;

    const newListing: ProduceListing = {
      ...listing,
      id: `list-${Date.now()}`,
      buyerPricePerKg: buyerPrice,
      estimatedLogisticsPerKg: logistics,
      platformFeePerKg: platform,
      farmerRealizationPerKg: farmerRealization,
      createdAt: new Date().toISOString(),
    };

    const updated = [newListing, ...listings];
    setStorage("f2m_listings", updated);
    return newListing;
  }
}

// ─── 2. Order Service ───
export class OrderService {
  static async getOrders(): Promise<Order[]> {
    return getStorage("f2m_orders", INITIAL_ORDERS);
  }

  static async getOrderById(id: string): Promise<Order | null> {
    const orders = await this.getOrders();
    return orders.find((o) => o.id === id) || null;
  }

  static async createBulkOrder(params: {
    buyerId: string;
    buyerName: string;
    buyerOrg: string;
    buyerPhone: string;
    deliveryAddress: string;
    deliveryCity: string;
    productName: string;
    requiredQuantityKg: number;
    targetPricePerKg: number;
  }): Promise<Order> {
    const orders = await this.getOrders();
    const orderNum = `FM-2026-${Math.floor(10000 + Math.random() * 90000)}`;

    // Aggregation logic across available listings
    const allocations = [
      { farmerId: "farmer-01", farmerName: "Ramesh Kumar (ABC FPO)", location: "Kanchipuram", allocatedKg: Math.round(params.requiredQuantityKg * 0.4), pricePerKg: 32 },
      { farmerId: "farmer-02", farmerName: "Suresh Reddy (GreenFields FPO)", location: "Walajabad", allocatedKg: Math.round(params.requiredQuantityKg * 0.35), pricePerKg: 31 },
      { farmerId: "farmer-03", farmerName: "Venkatesh Babu (Rayalaseema FPO)", location: "Chengalpattu", allocatedKg: Math.round(params.requiredQuantityKg * 0.25), pricePerKg: 33 },
    ];

    const buyerAmount = params.requiredQuantityKg * 40;
    const logisticsFee = params.requiredQuantityKg * 3;
    const platformFee = params.requiredQuantityKg * 1;
    const farmerPayable = buyerAmount - logisticsFee - platformFee;

    const newOrder: Order = {
      id: `ord-${Date.now()}`,
      orderNumber: orderNum,
      buyerId: params.buyerId,
      buyerName: params.buyerName,
      buyerOrganization: params.buyerOrg,
      buyerPhone: params.buyerPhone,
      deliveryAddress: params.deliveryAddress,
      deliveryCity: params.deliveryCity,
      items: [
        {
          listingId: "list-tomato-01",
          productName: params.productName,
          quantity: params.requiredQuantityKg,
          pricePerKg: 32,
          totalPrice: params.requiredQuantityKg * 32,
        },
      ],
      allocations,
      totalQuantityKg: params.requiredQuantityKg,
      totalBuyerAmount: buyerAmount,
      totalLogisticsFee: logisticsFee,
      totalPlatformFee: platformFee,
      totalFarmerPayable: farmerPayable,
      status: "Confirmed",
      statusHistory: [
        { status: "Placed", timestamp: new Date().toISOString() },
        { status: "Confirmed", timestamp: new Date().toISOString(), note: "Aggregated 3 nearby sellers automatically" },
      ],
      pickupScheduledAt: "Tomorrow, 08:30 AM",
      estimatedDeliveryAt: "Tomorrow, 02:00 PM",
      trackingRouteId: "route-001",
      paymentRef: `PAY-DEMO-${Math.floor(10000 + Math.random() * 90000)}`,
      createdAt: new Date().toISOString(),
    };

    const updated = [newOrder, ...orders];
    setStorage("f2m_orders", updated);
    return newOrder;
  }
}

// ─── 3. Procurement Centre Service ───
export class ProcurementService {
  static async getCentres(): Promise<ProcurementCentre[]> {
    return INITIAL_PROCUREMENT_CENTRES;
  }

  static async getCentreById(id: string): Promise<ProcurementCentre | null> {
    const centres = await this.getCentres();
    return centres.find((c) => c.id === id) || null;
  }

  static async getBookings(): Promise<ProcurementBooking[]> {
    return getStorage("f2m_proc_bookings", INITIAL_PROCUREMENT_BOOKINGS);
  }

  static async getBookingById(id: string): Promise<ProcurementBooking | null> {
    const bookings = await this.getBookings();
    return bookings.find((b) => b.id === id) || null;
  }

  static async bookSlot(params: {
    farmerId: string;
    farmerName: string;
    farmerPhone: string;
    centreId: string;
    date: string;
    timeSlot: string;
    produceName: string;
    expectedQuantityKg: number;
    ratePerKg: number;
  }): Promise<ProcurementBooking> {
    const bookings = await this.getBookings();
    const centres = await this.getCentres();
    const centre = centres.find((c) => c.id === params.centreId) || centres[0];

    const tokenNum = Math.floor(40 + Math.random() * 15);
    const bookingCode = `FM-PROC-${Math.floor(10000 + Math.random() * 90000)}`;

    const newBooking: ProcurementBooking = {
      id: `proc-book-${Date.now()}`,
      bookingCode,
      farmerId: params.farmerId,
      farmerName: params.farmerName,
      farmerPhone: params.farmerPhone,
      centreId: centre.id,
      centreName: centre.name,
      centreLocation: centre.address,
      date: params.date,
      timeSlot: params.timeSlot,
      produceName: params.produceName,
      produceNameHi: "टमाटर",
      expectedQuantityKg: params.expectedQuantityKg,
      ratePerKg: params.ratePerKg,
      tokenNumber: tokenNum,
      farmersAhead: Math.max(1, tokenNum - centre.nowServingToken),
      estimatedWaitMinutes: Math.max(15, (tokenNum - centre.nowServingToken) * 5),
      status: "Slot Booked",
      timeline: [
        { step: "Slot Booked", timestamp: new Date().toLocaleDateString("en-IN", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" }), completed: true },
        { step: "Gate Arrival & Checked In", timestamp: "Pending", completed: false },
        { step: `Token Queue Assigned (#${tokenNum})`, timestamp: "Pending", completed: false },
        { step: "Quality & Weighing Inspection", timestamp: "Pending", completed: false },
        { step: "Produce Accepted", timestamp: "Pending", completed: false },
        { step: "Direct Bank Payment Processing", timestamp: "Pending", completed: false },
        { step: "Payment Completed", timestamp: "Pending", completed: false },
      ],
      paymentStatus: "Pending Inspection",
      qrCodeUrl: `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${bookingCode}-TOKEN${tokenNum}`,
      createdAt: new Date().toISOString(),
    };

    const updated = [newBooking, ...bookings];
    setStorage("f2m_proc_bookings", updated);
    return newBooking;
  }
}

// ─── 4. Demand Forecast & Price Intelligence Service ───
export class ForecastService {
  static async getDemandForecast(): Promise<DemandForecastData> {
    return INITIAL_DEMAND_FORECAST;
  }
}

// ─── 5. Notification Service ───
export class NotificationService {
  static async getNotifications(): Promise<AppNotification[]> {
    return getStorage("f2m_notifications", INITIAL_NOTIFICATIONS);
  }

  static async markAllAsRead(): Promise<void> {
    const notifs = await this.getNotifications();
    const updated = notifs.map((n) => ({ ...n, read: true }));
    setStorage("f2m_notifications", updated);
  }
}
