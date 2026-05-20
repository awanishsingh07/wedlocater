export const INITIAL_GUESTS = [
  { id: "g001", name: "Ramesh & Sunita Sharma",    relation: "Parents (Bride)",    side: "Bride",  phone: "+91 98765 00001", email: "ramesh.sharma@email.com", rsvp: "Accepted", attending: 4, table: 1,  dietary: "Vegetarian", notes: "Bride's parents & siblings" },
  { id: "g002", name: "Vijay & Meena Kapoor",      relation: "Parents (Groom)",    side: "Groom",  phone: "+91 98765 00002", email: "vijay.kapoor@email.com",  rsvp: "Accepted", attending: 3, table: 2,  dietary: "Vegetarian", notes: "Groom's parents" },
  { id: "g003", name: "Ananya Sharma",             relation: "Sister (Bride)",     side: "Bride",  phone: "+91 98765 00003", email: "ananya.s@email.com",      rsvp: "Accepted", attending: 2, table: 1,  dietary: "Vegetarian", notes: "Maid of honour" },
  { id: "g004", name: "Rohan Kapoor",              relation: "Brother (Groom)",    side: "Groom",  phone: "+91 98765 00004", email: "rohan.k@email.com",       rsvp: "Accepted", attending: 2, table: 2,  dietary: "Non-veg",    notes: "Best man" },
  { id: "g005", name: "Pradeep & Lata Sharma",     relation: "Uncle (Bride)",      side: "Bride",  phone: "+91 98765 00005", email: "pradeep@email.com",       rsvp: "Accepted", attending: 2, table: 3,  dietary: "Vegetarian", notes: "" },
  { id: "g006", name: "Suresh Kapoor",             relation: "Uncle (Groom)",      side: "Groom",  phone: "+91 98765 00006", email: "suresh.k@email.com",      rsvp: "Pending",  attending: 0, table: 4,  dietary: "Vegetarian", notes: "Awaiting response" },
  { id: "g007", name: "Dr. Kavita Mehta",          relation: "Family Friend",      side: "Both",   phone: "+91 98765 00007", email: "kavita.m@email.com",      rsvp: "Accepted", attending: 2, table: 5,  dietary: "Jain",       notes: "Family doctor" },
  { id: "g008", name: "Sneha & Vikram Nair",       relation: "Friends (Couple)",   side: "Bride",  phone: "+91 98765 00008", email: "sneha.nair@email.com",    rsvp: "Accepted", attending: 2, table: 6,  dietary: "Non-veg",    notes: "College friends" },
  { id: "g009", name: "Arun Kumar",                relation: "Colleague",          side: "Groom",  phone: "+91 98765 00009", email: "arun.k@email.com",        rsvp: "Declined", attending: 0, table: 0,  dietary: "Vegetarian", notes: "Out of town" },
  { id: "g010", name: "Pooja & Nikhil Mehta",      relation: "Friends (Couple)",   side: "Both",   phone: "+91 98765 00010", email: "pooja.m@email.com",       rsvp: "Accepted", attending: 2, table: 7,  dietary: "Non-veg",    notes: "" },
  { id: "g011", name: "Grandma Shakuntala",        relation: "Grandmother (Bride)", side: "Bride", phone: "+91 98765 00011", email: "",                        rsvp: "Accepted", attending: 1, table: 1,  dietary: "Vegetarian", notes: "Wheelchair accessible seating" },
  { id: "g012", name: "Riya Kapoor",               relation: "Cousin (Groom)",     side: "Groom",  phone: "+91 98765 00012", email: "riya.kapoor@email.com",   rsvp: "Pending",  attending: 0, table: 0,  dietary: "Vegan",      notes: "" },
  { id: "g013", name: "Ashok & Neeta Jain",        relation: "Business Associate", side: "Groom",  phone: "+91 98765 00013", email: "ashok.j@email.com",       rsvp: "Accepted", attending: 2, table: 8,  dietary: "Jain",       notes: "" },
  { id: "g014", name: "Dr. Rahul Verma",           relation: "Friend",             side: "Bride",  phone: "+91 98765 00014", email: "rahul.v@email.com",       rsvp: "Pending",  attending: 0, table: 0,  dietary: "Non-veg",    notes: "" },
  { id: "g015", name: "Meera & Arjun Patel",       relation: "Friends (Couple)",   side: "Both",   phone: "+91 98765 00015", email: "meera.p@email.com",       rsvp: "Accepted", attending: 2, table: 9,  dietary: "Vegetarian", notes: "" },
  { id: "g016", name: "Kiran Das",                 relation: "Colleague (Bride)",  side: "Bride",  phone: "+91 98765 00016", email: "kiran.d@email.com",       rsvp: "Declined", attending: 0, table: 0,  dietary: "Non-veg",    notes: "Travelling abroad" },
  { id: "g017", name: "Santosh & Prabha Sharma",   relation: "Relatives (Bride)",  side: "Bride",  phone: "+91 98765 00017", email: "",                        rsvp: "Accepted", attending: 4, table: 10, dietary: "Vegetarian", notes: "" },
  { id: "g018", name: "Zara & Imran Sheikh",       relation: "Friends",            side: "Both",   phone: "+91 98765 00018", email: "zara.s@email.com",        rsvp: "Pending",  attending: 0, table: 0,  dietary: "Halal",      notes: "" },
];

export const RSVP_STATUSES = ["Accepted", "Pending", "Declined"];
export const SIDES          = ["Both", "Bride", "Groom"];
export const DIETARY_OPTS   = ["Vegetarian", "Non-veg", "Vegan", "Jain", "Halal", "No restriction"];
export const RELATION_OPTS  = [
  "Parents (Bride)", "Parents (Groom)", "Sibling (Bride)", "Sibling (Groom)",
  "Grandparent", "Uncle / Aunt", "Cousin", "Family Friend",
  "Friend", "Colleague", "Business Associate", "Other",
];