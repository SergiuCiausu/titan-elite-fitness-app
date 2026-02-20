import { UUID } from "./uuid"

export type ClassSession = {
    id: UUID,
    class_name: string,
    class_date: string,
    class_day: number,
    class_month: number,
    class_year: number,
    class_starts_at: number,
    class_ends_at: number,
    class_icon: string,
    tenant_name: string,
    tenant_city: string,
    tenant_province: string,
    coach_first_name: string,
    coach_last_name: string,
    coach_name_unaccent?: string,
}

export type GroupedSchedule = {
  [hourKey: string]: {
    [minuteKey: string]: ClassSession[];
  };
}

export type Class = {
    id: UUID;
    Class_sessions: {
        id: string,
        starts_at: string;
        ends_at: string;
        date: string;
        Class_types: {
            name: string;
            icon: string;
            duration_default: number;
            capacity: number;
        };
        Tenants: {
            name: string;
            province: string;
            city: string;
        };
    };
    Coaches: {
        first_name: string;
        last_name: string;
    }
}

export type ClassOnDashboard = {
    id: UUID;
    Purchases: {
        Class_purchases: {
            Class_assignments: {
                Coaches: {
                    first_name: string;
                    last_name: string;
                    name_unaccent: string;
                };
                Class_sessions: {
                    starts_at: string;
                    ends_at: string;
                    date: string;
                    Class_types: {
                        name: string;
                        icon: string;
                        duration_default: number;
                    }
                    Tenants: {
                        name: string;
                        province: string;
                        city: string;
                    }
                }
            }
        }
    }
}

export type GroupedClass = {
    byHourKey: string,
    byHourClasses: {
            byMinuteKey: string,
            byMinuteClasses: ClassSession[]
    }[],
    byHourLength: number,
    startHour: number,
    startMinute: number,
    maxEndHour: number,
    maxEndMinute: number,
    stack: boolean,
    stackDate: string,
    stackUniqueClasses: string[]
}