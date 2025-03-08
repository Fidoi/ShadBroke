import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const chileData = [
  {
    nombre: 'Región Metropolitana de Santiago',
    provincias: [
      {
        nombre: 'Santiago',
        comunas: [
          'Santiago',
          'Cerrillos',
          'Cerro Navia',
          'Conchalí',
          'El Bosque',
          'Estación Central',
          'Huechuraba',
          'Independencia',
          'La Cisterna',
          'La Florida',
          'La Granja',
          'La Pintana',
          'La Reina',
          'Las Condes',
          'Lo Barnechea',
          'Lo Espejo',
          'Lo Prado',
          'Macul',
          'Maipú',
          'Ñuñoa',
          'Pedro Aguirre Cerda',
          'Peñalolén',
          'Providencia',
          'Pudahuel',
          'Quilicura',
          'Quinta Normal',
          'Recoleta',
          'Renca',
          'San Joaquín',
          'San Miguel',
          'San Ramón',
          'Vitacura',
        ],
      },
      {
        nombre: 'Cordillera',
        comunas: ['Puente Alto', 'Pirque', 'San José de Maipo'],
      },
      {
        nombre: 'Chacabuco',
        comunas: ['Colina', 'Lampa', 'Til-Til'],
      },
      {
        nombre: 'Maipo',
        comunas: ['San Bernardo', 'Buin', 'Paine', 'Calera de Tango'],
      },
      {
        nombre: 'Melipilla',
        comunas: ['Melipilla', 'Alhué', 'Curacaví', 'María Pinto', 'San Pedro'],
      },
      {
        nombre: 'Talagante',
        comunas: [
          'Talagante',
          'El Monte',
          'Isla de Maipo',
          'Padre Hurtado',
          'Peñaflor',
        ],
      },
    ],
  },
  {
    nombre: 'Arica y Parinacota',
    provincias: [
      {
        nombre: 'Arica',
        comunas: ['Arica', 'Camarones'],
      },
      {
        nombre: 'Parinacota',
        comunas: ['Putre', 'General Lagos'],
      },
    ],
  },
  {
    nombre: 'Tarapacá',
    provincias: [
      {
        nombre: 'Iquique',
        comunas: ['Iquique', 'Alto Hospicio'],
      },
      {
        nombre: 'Tamarugal',
        comunas: ['Pozo Almonte', 'Camiña', 'Colchane', 'Huara', 'Pica'],
      },
    ],
  },
  {
    nombre: 'Antofagasta',
    provincias: [
      {
        nombre: 'Antofagasta',
        comunas: ['Antofagasta', 'Mejillones', 'Sierra Gorda', 'Taltal'],
      },
      {
        nombre: 'El Loa',
        comunas: ['Calama', 'Ollagüe', 'San Pedro de Atacama'],
      },
      {
        nombre: 'Tocopilla',
        comunas: ['Tocopilla', 'María Elena'],
      },
    ],
  },
  {
    nombre: 'Atacama',
    provincias: [
      {
        nombre: 'Copiapó',
        comunas: ['Copiapó', 'Caldera', 'Tierra Amarilla'],
      },
      {
        nombre: 'Chañaral',
        comunas: ['Chañaral', 'Diego de Almagro'],
      },
      {
        nombre: 'Huasco',
        comunas: ['Vallenar', 'Huasco', 'Freirina', 'Alto del Carmen'],
      },
    ],
  },
  {
    nombre: 'Coquimbo',
    provincias: [
      {
        nombre: 'Elqui',
        comunas: [
          'La Serena',
          'Coquimbo',
          'Andacollo',
          'La Higuera',
          'Paiguano',
          'Vicuña',
        ],
      },
      {
        nombre: 'Limarí',
        comunas: [
          'Ovalle',
          'Combarbalá',
          'Monte Patria',
          'Punitaqui',
          'Río Hurtado',
        ],
      },
      {
        nombre: 'Choapa',
        comunas: ['Illapel', 'Canela', 'Los Vilos', 'Salamanca'],
      },
    ],
  },
  {
    nombre: 'Valparaíso',
    provincias: [
      {
        nombre: 'Marga Marga',
        comunas: ['Quilpué', 'Villa Alemana', 'Limache', 'Olmué'],
      },
      {
        nombre: 'Isla de Pascua',
        comunas: ['Isla de Pascua'],
      },
      {
        nombre: 'Los Andes',
        comunas: ['Los Andes', 'San Esteban', 'Calle Larga', 'Rinconada'],
      },
      {
        nombre: 'Petorca',
        comunas: ['Petorca', 'Cabildo', 'La Ligua', 'Papudo', 'Zapallar'],
      },
      {
        nombre: 'Quillota',
        comunas: ['Quillota', 'La Calera', 'Hijuelas', 'Nogales'],
      },
      {
        nombre: 'San Antonio',
        comunas: [
          'San Antonio',
          'Cartagena',
          'El Quisco',
          'El Tabo',
          'Santo Domingo',
        ],
      },
      {
        nombre: 'San Felipe de Aconcagua',
        comunas: [
          'San Felipe',
          'Llaillay',
          'Panquehue',
          'Catemu',
          'Santa María',
        ],
      },
      {
        nombre: 'Marga Marga',
        comunas: ['Quilpué', 'Villa Alemana'],
      },
    ],
  },
  {
    nombre: "Libertador General Bernardo O'Higgins",
    provincias: [
      {
        nombre: 'Cachapoal',
        comunas: [
          'Rancagua',
          'Machalí',
          'Graneros',
          'Codegua',
          'Requínoa',
          'Coltauco',
          'Doñihue',
          'Peumo',
          'Las Cabras',
        ],
      },
      {
        nombre: 'Colchagua',
        comunas: [
          'Santa Cruz',
          'San Fernando',
          'Chépica',
          'Lolol',
          'Nancagua',
          'Palmilla',
          'Peralillo',
          'Placilla',
          'Pichidegua',
          'Pumanque',
        ],
      },
      {
        nombre: 'Cardenal Caro',
        comunas: [
          'Pichilemu',
          'La Estrella',
          'Litueche',
          'Marchihue',
          'Navidad',
          'Paredones',
        ],
      },
    ],
  },
  {
    nombre: 'Maule',
    provincias: [
      {
        nombre: 'Talca',
        comunas: [
          'Talca',
          'Maule',
          'San Clemente',
          'Pencahue',
          'Río Claro',
          'Pelarco',
        ],
      },
      {
        nombre: 'Curicó',
        comunas: [
          'Curicó',
          'Hualañé',
          'Licantén',
          'Molina',
          'Teno',
          'Vichuquén',
        ],
      },
      {
        nombre: 'Linares',
        comunas: [
          'Linares',
          'Colbún',
          'Longaví',
          'Parral',
          'Retiro',
          'San Javier',
          'Villa Alegre',
          'Yerbas Buenas',
        ],
      },
      {
        nombre: 'Cauquenes',
        comunas: ['Cauquenes', 'Chanco', 'Pelluhue'],
      },
    ],
  },
  {
    nombre: 'Ñuble',
    provincias: [
      {
        nombre: 'Diguillín',
        comunas: ['Chillán', 'Chillán Viejo', 'El Carmen', 'Pinto', 'Coihueco'],
      },
      {
        nombre: 'Punilla',
        comunas: [
          'Quillón',
          'San Carlos',
          'San Fabián',
          'San Ignacio',
          'Ñiquén',
        ],
      },
      {
        nombre: 'Itata',
        comunas: [
          'Cobquecura',
          'Coelemu',
          'Ninhue',
          'Portezuelo',
          'Quirihue',
          'Ránquil',
          'Treguaco',
        ],
      },
    ],
  },
  {
    nombre: 'Biobío',
    provincias: [
      {
        nombre: 'Concepción',
        comunas: [
          'Concepción',
          'Coronel',
          'Chiguayante',
          'Florida',
          'Hualqui',
          'Lota',
          'Penco',
          'San Pedro de la Paz',
          'Santa Juana',
          'Talcahuano',
          'Tomé',
          'Hualpén',
        ],
      },
      {
        nombre: 'Arauco',
        comunas: [
          'Lebu',
          'Arauco',
          'Cañete',
          'Contulmo',
          'Curanilahue',
          'Tirúa',
          'Los Álamos',
        ],
      },
      {
        nombre: 'Bío Bío',
        comunas: [
          'Los Ángeles',
          'Antuco',
          'Cabrero',
          'Laja',
          'Mulchén',
          'Nacimiento',
          'Negrete',
          'Quilaco',
          'Quilleco',
          'San Rosendo',
          'Santa Bárbara',
          'Tucapel',
          'Yumbel',
        ],
      },
    ],
  },
  {
    nombre: 'La Araucanía',
    provincias: [
      {
        nombre: 'Cautín',
        comunas: [
          'Temuco',
          'Padre Las Casas',
          'Lautaro',
          'Perquenco',
          'Nueva Imperial',
          'Vilcún',
          'Carahue',
          'Teodoro Schmidt',
          'Cholchol',
        ],
      },
      {
        nombre: 'Malleco',
        comunas: [
          'Angol',
          'Collipulli',
          'Curacautín',
          'Ercilla',
          'Lonquimay',
          'Los Sauces',
          'Lumaco',
          'Purén',
          'Renaico',
          'Traiguén',
        ],
      },
    ],
  },
  {
    nombre: 'Los Ríos',
    provincias: [
      {
        nombre: 'Valdivia',
        comunas: [
          'Valdivia',
          'Corral',
          'Lanco',
          'Máfil',
          'Mariquina',
          'Paillaco',
          'Panguipulli',
        ],
      },
      {
        nombre: 'Ranco',
        comunas: ['La Unión', 'Río Bueno'],
      },
    ],
  },
  {
    nombre: 'Los Lagos',
    provincias: [
      {
        nombre: 'Osorno',
        comunas: ['Osorno', 'Puerto Octay', 'Río Negro', 'Purranque'],
      },
      {
        nombre: 'Llanquihue',
        comunas: [
          'Puerto Montt',
          'Puerto Varas',
          'Maullín',
          'Calbuco',
          'Frutillar',
          'Los Muermos',
        ],
      },
      {
        nombre: 'Chiloé',
        comunas: [
          'Ancud',
          'Castro',
          'Chonchi',
          'Quellón',
          'Dalcahue',
          'Puqueldón',
          'Curaco de Vélez',
        ],
      },
      {
        nombre: 'Palena',
        comunas: ['Palena'],
      },
    ],
  },
  {
    nombre: 'Aysén',
    provincias: [
      {
        nombre: 'Coyhaique',
        comunas: ['Coyhaique', 'Lago Verde'],
      },
      {
        nombre: 'Aysén',
        comunas: ['Aysén', 'Cisnes', 'Guaitecas'],
      },
      {
        nombre: 'General Carrera',
        comunas: ['Chile Chico', 'Río Ibáñez'],
      },
      {
        nombre: 'Capitán Prat',
        comunas: ['Cochrane', 'Tortel'],
      },
    ],
  },
  {
    nombre: 'Magallanes y de la Antártica Chilena',
    provincias: [
      {
        nombre: 'Magallanes',
        comunas: ['Punta Arenas', 'Laguna Blanca', 'Río Verde', 'Timaukel'],
      },
      {
        nombre: 'Última Esperanza',
        comunas: ['Puerto Natales', 'Torres del Paine'],
      },
      {
        nombre: 'Antártica Chilena',
        comunas: ['Puerto Williams', 'Antártica'],
      },
    ],
  },
];

async function main() {
  await prisma.comuna.deleteMany();
  await prisma.provincia.deleteMany();
  await prisma.region.deleteMany();

  console.log('Datos existentes borrados.');

  for (const regionData of chileData) {
    const { nombre: regionNombre, provincias } = regionData;
    await prisma.region.create({
      data: {
        nombre: regionNombre,
        provincias: {
          create: provincias.map((provinciaData) => {
            const { nombre: provinciaNombre, comunas } = provinciaData;
            return {
              nombre: provinciaNombre,
              comunas: {
                create: comunas.map((comunaNombre) => ({
                  nombre: comunaNombre,
                })),
              },
            };
          }),
        },
      },
    });
    console.log(`Región creada: ${regionNombre}`);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
