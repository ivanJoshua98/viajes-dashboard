import sql from "@/app/lib/data/db";
import { CardsData } from "@/app/lib/data/definitions";
import { formatDate } from "../utils/formatDateToLocal";

export async function fetchCardData() {
  try {
    const date = new Date();
    const actualMonth = date.getMonth();
    const actualYear = date.getFullYear();
    const actualDate = formatDate(date);
    const monthBeginning = formatDate(new Date(actualYear, actualMonth, 1));

    const [ cardData ] = await sql<CardsData[]>`
      SELECT
      -- Consulta 1: Cantidad de viajes en el mes
      (SELECT COUNT(*) 
       FROM viajes 
       WHERE 
        fecha BETWEEN ${monthBeginning} AND ${actualDate}
      ) AS cant_viajes_mes,

      -- Consulta 3: Ingresos por viajes en el mes
      (SELECT SUM(valor_flete_centavos) 
       FROM viajes 
       WHERE 
        fecha BETWEEN ${monthBeginning} AND ${actualDate}
      ) AS ingresos_viajes_mes,

      -- Consulta 2: Camión más usado
      (SELECT viajes.camion 
       FROM viajes 
       WHERE 
        fecha BETWEEN ${monthBeginning} AND ${actualDate}
       GROUP BY viajes.camion 
       ORDER BY COUNT(*) DESC 
       LIMIT 1) AS id_camion_mas_usado,

      (SELECT camiones.patente 
       FROM viajes 
       JOIN camiones ON viajes.camion = camiones.id 
       WHERE 
        fecha BETWEEN ${monthBeginning} AND ${actualDate}
       GROUP BY viajes.camion, camiones.patente 
       ORDER BY COUNT(*) DESC 
       LIMIT 1) AS patente_camion_mas_usado,

      (SELECT COUNT(*) 
       FROM viajes 
       WHERE 
        fecha BETWEEN ${monthBeginning} AND ${actualDate}
         AND camion = (
           SELECT viajes.camion 
           FROM viajes 
           WHERE 
            fecha BETWEEN ${monthBeginning} AND ${actualDate}
           GROUP BY viajes.camion 
           ORDER BY COUNT(*) DESC 
           LIMIT 1
         )
      ) AS usos_camion_mes,

      -- Consulta 4: Zona más visitada
      (SELECT viajes.zona 
       FROM viajes 
       WHERE 
        fecha BETWEEN ${monthBeginning} AND ${actualDate}
       GROUP BY viajes.zona 
       ORDER BY COUNT(*) DESC 
       LIMIT 1) AS id_zona_mas_visitada,

      (SELECT zonas.nombre 
       FROM viajes 
       JOIN zonas ON viajes.zona = zonas.id 
       WHERE 
        fecha BETWEEN ${monthBeginning} AND ${actualDate}
       GROUP BY viajes.zona, zonas.nombre 
       ORDER BY COUNT(*) DESC 
       LIMIT 1) AS nombre_zona_mas_visitada,

      (SELECT COUNT(*) 
       FROM viajes 
       WHERE 
        fecha BETWEEN ${monthBeginning} AND ${actualDate}
         AND zona = (
           SELECT viajes.zona 
           FROM viajes 
           WHERE 
            fecha BETWEEN ${monthBeginning} AND ${actualDate}
           GROUP BY viajes.zona 
           ORDER BY COUNT(*) DESC 
           LIMIT 1
         )
      ) AS viajes_zona_mes;
    `;

    return cardData;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch card data.');
  }
}