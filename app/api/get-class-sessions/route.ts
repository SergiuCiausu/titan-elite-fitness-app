import { Class } from "@/lib/constants/class-sessions-type";
import { createClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {

        const body = await req.json();

        const { startDate, endDate, locationsIDs } = body;

        const supabase = await createClient();

        const query = supabase
        .from("Class_assignments")
        .select(`
            Class_sessions!inner (
                id,
                starts_at, 
                ends_at, 
                date, 
                Class_types!inner (name, icon), 
                Tenants!inner (name, province, city)
            ), 
            Coaches!inner (first_name, last_name)
        `)
        .gte("Class_sessions.date", startDate)
        .lte("Class_sessions.date", endDate)
        .order("Class_sessions(date)", { ascending: true })
        .order("Class_sessions(starts_at)", { ascending: true })
        .order("Class_sessions(id)", { ascending: true })
        .in("Class_sessions.tenant_id", locationsIDs);

        const { data, error } = await query as { data: Class[] | null, error: any};

        if (error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        // const classes : GroupedClass[] = [];

        if (!data) {
            return NextResponse.json({ classes: [] }, { status: 404 });
        }

        // let startHour = 25;
        // let startMinute = 61;
        // let maxEndHour = -1;
        // let maxEndMinute = -1;

        const processedData = data.map(session => {
            // const dateDayOfWeek = getISODay(new Date(session.Class_sessions.date));
            // const startsAtHour = parseInt(session.Class_sessions.starts_at.split(":")[0]);
            // const startsAtMinute = parseInt(session.Class_sessions.starts_at.split(":")[1]);
            // const endsAtHour = parseInt(session.Class_sessions.ends_at.split(":")[0]);
            // const endsAtMinute = parseInt(session.Class_sessions.ends_at.split(":")[1]);

            // const byHourKey = `${dateDayOfWeek}-${startsAtHour}`;
            // const byMinuteKey = `${dateDayOfWeek}-${startsAtHour}-${startsAtMinute}`;

            // let classesByHour = classes.find(hour => hour.byHourKey === byHourKey)

            const processedSession = {
                id: session.Class_sessions.id, 
                class_name: session.Class_sessions.Class_types.name,
                class_date: session.Class_sessions.date,
                class_day: parseInt(session.Class_sessions.date.split("-")[2]),
                class_month: parseInt(session.Class_sessions.date.split("-")[1]),
                class_year: parseInt(session.Class_sessions.date.split("-")[0]),
                class_starts_at: parseInt(session.Class_sessions.starts_at.split(":")[0]) * 60 + parseInt(session.Class_sessions.starts_at.split(":")[1]),
                class_ends_at: parseInt(session.Class_sessions.ends_at.split(":")[0]) * 60 + parseInt(session.Class_sessions.ends_at.split(":")[1]),
                class_icon: session.Class_sessions.Class_types.icon,
                tenant_name: session.Class_sessions.Tenants.name,
                tenant_city: session.Class_sessions.Tenants.city,
                tenant_province: session.Class_sessions.Tenants.province,
                coach_first_name: session.Coaches.first_name,
                coach_last_name: session.Coaches.last_name,
            }

            return processedSession;

        //     if (!classesByHour) {
        //         classesByHour = { byHourKey, byHourClasses: [], byHourLength: 0, startHour, startMinute, maxEndHour, maxEndMinute, stack: false, stackDate: "", stackUniqueClasses: [] }
        //         classes.push(classesByHour);
        //     }

        //     if (startsAtHour < classesByHour.startHour) {
        //         classesByHour.startHour = startsAtHour;
        //     }

        //     if (startsAtMinute < classesByHour.startMinute) {
        //         classesByHour.startMinute = startsAtMinute;
        //     }
            
        //     if (endsAtHour > classesByHour.maxEndHour) {
        //         classesByHour.maxEndHour = endsAtHour;
        //     }

        //     if (endsAtMinute > classesByHour.maxEndMinute) {
        //         classesByHour.maxEndMinute = endsAtMinute;
        //     }

        //     let classesByMinute = classesByHour.byHourClasses.find(minute => minute.byMinuteKey === byMinuteKey);

        //     if (!classesByMinute) {
        //         classesByMinute = { byMinuteKey, byMinuteClasses: []};
        //         classesByHour.byHourClasses.push(classesByMinute);
        //     }

        //     classesByMinute.byMinuteClasses.push(processedSession);
        //     classesByHour.byHourLength++;

        //     if (classesByHour.byHourLength > 6) {
        //         classesByHour.stack = true;
        //         classesByHour.stackDate = processedSession.class_date;
        //     }
                
        //     const isClassAddedToUnique = classesByHour.stackUniqueClasses.find(classIcon => classIcon === processedSession.class_icon);

        //     if (!isClassAddedToUnique) {
        //         classesByHour.stackUniqueClasses.push(processedSession.class_icon);
        //     }
        })

        // classes.map(hourGroup => {
        //     const day = parseInt(hourGroup.byHourKey.split("-")[0]);
        //     const hour = parseInt(hourGroup.byHourKey.split("-")[1]);
        //     const maxHour = hourGroup.maxEndHour;
        //     let nextHourGroup : GroupedClass | undefined = {
        //         byHourKey: "",
        //         byHourClasses: [{
        //                 byMinuteKey: "",
        //                 byMinuteClasses: []
        //         }],
        //         byHourLength: 0,
        //         startHour: 0,
        //         startMinute: 0,
        //         maxEndHour: 0,
        //         maxEndMinute: 0,
        //         stack: false,
        //         stackDate: "",
        //         stackUniqueClasses: []
        //     };

        //     for (let i = hour; i < maxHour; i++) {
        //         nextHourGroup = classes.find(hourGroup => parseInt(hourGroup.byHourKey.split("-")[0]) === day && parseInt(hourGroup.byHourKey.split("-")[1]) === i + 1);
        //         if (nextHourGroup) {
        //                 const firstMinute = parseInt(nextHourGroup.byHourClasses[0].byMinuteKey.split("-")[2]);
        //                 if (hourGroup.maxEndMinute > firstMinute) {
        //                     hourGroup.maxEndMinute = firstMinute;
        //                 }

        //                 if (hourGroup.maxEndHour > i + 1) {
        //                     hourGroup.maxEndHour = i + 1;
        //                 }
        //             }
        //             break;
        //         }
        // })

        return NextResponse.json({ classes: processedData }, { status: 200 });

    } catch (err) {
        return NextResponse.json({ error: err }, { status: 500 })
    }
}