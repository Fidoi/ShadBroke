import { Size } from '@/interfaces';

import { Gender } from '@prisma/client';
import { v2 as cloudinary } from 'cloudinary';
import path from 'path';
import fs from 'fs';
import { PrismaClient } from '@prisma/client';
import 'dotenv/config';
import sharp from 'sharp';

const prisma = new PrismaClient();

interface SeedProduct {
  description: string;
  images: string[];
  inStock: number;
  price: number;
  sizes: ValidSizes[];
  slug: string;
  tags: string[];
  title: string;
  type: ValidTypes;
  colors: string[];
  gender: 'men' | 'women' | 'kid';
}

type ValidSizes = 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL' | 'XXXL';
type ValidTypes = 'shirts' | 'pants' | 'hoodies' | 'hats';

interface SeedData {
  categories: string[];
  products: SeedProduct[];
}

cloudinary.config(process.env.CLOUDINARY_URL ?? '');

const optimizeImage = async (inputPath: string, outputPath: string) => {
  await sharp(inputPath).resize(1200).jpeg({ quality: 75 }).toFile(outputPath);
};

const deleteAllCloudinaryImages = async () => {
  try {
    console.log('🗑️ Eliminando imágenes antiguas de Cloudinary...');

    const response = await cloudinary.api.resources({
      type: 'upload',
      prefix: 'Shadbroke/productos/',
      max_results: 500,
    });

    if (response.resources.length === 0) {
      console.log('✅ No hay imágenes previas en Cloudinary.');
      return;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const publicIds = response.resources.map((file: any) => file.public_id);

    const batchSize = 100;
    for (let i = 0; i < publicIds.length; i += batchSize) {
      const batch = publicIds.slice(i, i + batchSize);
      await cloudinary.api.delete_resources(batch);
      console.log(`✅ Eliminado batch ${Math.floor(i / batchSize) + 1}`);
    }

    console.log(`✅ Se eliminaron ${publicIds.length} imágenes de Cloudinary.`);
  } catch (error) {
    console.error('❌ Error eliminando imágenes en Cloudinary:', error);
  }
};

const uploadImageToCloudinary = async (imagePath: string): Promise<string> => {
  if (!fs.existsSync(imagePath))
    throw new Error(`Imagen no encontrada: ${imagePath}`);

  const optimizedPath = imagePath.replace(/(\.\w+)$/, '-optimized$1');
  await optimizeImage(imagePath, optimizedPath);

  const result = await cloudinary.uploader.upload(optimizedPath, {
    folder: 'Shadbroke/productos/',
  });

  fs.unlinkSync(optimizedPath);

  return result.secure_url;
};

export const initialData: SeedData = {
  categories: ['Shirts', 'Pants', 'Hoodies', 'Hats'],

  products: [
    {
      title: 'Poleron ShadBroke',
      description:
        'El polerón Shadbroke combina suavidad, abrigo y un diseño versátil. Confeccionado en algodón y poliéster, cuenta con interior afelpado, capucha ajustable y bolsillo canguro. Ideal para cualquier ocasión, te mantiene cómodo y con estilo.',
      images: [
        'shadbroke_poleron_1.png',
        'shadbroke_poleron_2.png',
        'shadbroke_poleron_3.png',
      ],
      inStock: 72,
      price: 25000,
      sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
      slug: 'sweatshirt_shadbroke',
      type: 'shirts',
      tags: ['sweatshirt'],
      gender: 'women',
      colors: ['#dbbfa5'],
    },
    {
      title: 'Sudadera Chill con Cuello Redondo para Hombre',
      description:
        "Presentamos la Colección Tesla Chill. La sudadera con cuello redondo para hombre 'Chill' cuenta con un exterior premium y de gran peso, y un interior de felpa suave para brindar comodidad en cualquier temporada. Presenta un discreto logo en T de poliuretano termoplástico en el pecho y la marca Tesla debajo del cuello trasero. Fabricada con 60% algodón y 40% poliéster reciclado.",
      images: ['1740176-00-A_0_2000.jpg', '1740176-00-A_1.jpg'],
      inStock: 72,
      price: 28000,
      sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
      slug: 'mens_chill_crew_neck_sweatshirt',
      type: 'shirts',
      tags: ['sweatshirt'],
      gender: 'men',
      colors: ['#67707d'],
    },
    {
      title: 'Chaqueta de Camisa Acolchada para Hombre',
      description:
        'La chaqueta de camisa acolchada para hombre presenta un diseño único y acolchado que ofrece calidez y libertad de movimiento en épocas frías. Con una estética urbana, cuenta con discretos logos de Tesla inyectados con silicona debajo del cuello trasero y en la manga derecha, además de tiradores de cremallera de metal mate personalizados. Fabricada con 87% nailon y 13% poliuretano.',
      images: ['1740507-00-A_0_2000.jpg', '1740507-00-A_1.jpg'],
      inStock: 5,
      price: 45000,
      sizes: ['XS', 'S', 'M', 'XL', 'XXL'],
      slug: 'men_quilted_shirt_jacket',
      type: 'shirts',
      tags: ['jacket'],
      gender: 'men',
      colors: ['#39393b', '#474e5b'],
    },
    {
      title: 'Chaqueta Bomber Ligera Zip Up Raven para Hombre',
      description:
        "Presentamos la Colección Tesla Raven. La chaqueta bomber ligera con cremallera para hombre 'Raven' tiene una silueta moderna y premium, confeccionada con una mezcla sostenible de bambú y algodón para versatilidad en cualquier temporada. Presenta discretos logos de Tesla de poliuretano termoplástico en el pecho izquierdo y debajo del cuello trasero, un bolsillo oculto en el pecho con tiradores de cremallera mate personalizados y un interior de french terry. Fabricada con 70% bambú y 30% algodón.",
      images: ['1740250-00-A_0_2000.jpg', '1740250-00-A_1.jpg'],
      inStock: 10,
      price: 55000,
      sizes: ['S', 'M', 'L', 'XL', 'XXL'],
      slug: 'men_raven_lightweight_zip_up_bomber_jacket',
      type: 'shirts',
      tags: ['shirt'],
      gender: 'men',
      colors: ['#201f22'],
    },
    {
      title: 'Camiseta de Manga Larga Turbine para Hombre',
      description:
        "Presentamos la Colección Tesla Turbine. Diseñada para el estilo, la comodidad y el día a día, esta camiseta de manga larga para hombre 'Turbine' presenta un discreto logo en T a base de agua en el pecho izquierdo y la marca Tesla debajo del cuello trasero. El tejido, de doble tinte, ofrece un estilo suave y casual ideal para cualquier temporada. Fabricada con 50% algodón y 50% poliéster.",
      images: ['1740280-00-A_0_2000.jpg', '1740280-00-A_1.jpg'],
      inStock: 50,
      price: 25000,
      sizes: ['XS', 'S', 'M', 'L'],
      slug: 'men_turbine_long_sleeve_tee',
      type: 'shirts',
      tags: ['shirt'],
      gender: 'men',
      colors: ['#8c8a92'],
    },
    {
      title: 'Camiseta de Manga Corta Turbine para Hombre',
      description:
        "Presentamos la Colección Tesla Turbine. Diseñada para el estilo, la comodidad y el día a día, esta camiseta de manga corta para hombre 'Turbine' luce la marca Tesla en acuarela a lo largo del pecho y nuestro logo T debajo del cuello trasero. El tejido de doble tinte crea un estilo suave y casual ideal para cualquier temporada. Fabricada con 50% algodón y 50% poliéster.",
      images: ['1741416-00-A_0_2000.jpg', '1741416-00-A_1.jpg'],
      inStock: 50,
      price: 22000,
      sizes: ['M', 'L', 'XL', 'XXL'],
      slug: 'men_turbine_short_sleeve_tee',
      type: 'shirts',
      tags: ['shirt'],
      gender: 'men',
      colors: ['#cfcfda'],
    },
    {
      title: 'Camiseta Cybertruck Owl para Hombre',
      description:
        'Diseñada para la comodidad, la Camiseta Cybertruck Owl para hombre está confeccionada en 100% algodón y luce el icónico símbolo de Cybertruck en la parte trasera.',
      images: ['7654393-00-A_2_2000.jpg', '7654393-00-A_3.jpg'],
      inStock: 0,
      price: 20000,
      sizes: ['M', 'L', 'XL', 'XXL'],
      slug: 'men_cybertruck_owl_tee',
      type: 'shirts',
      tags: ['shirt'],
      gender: 'men',
      colors: ['#1b181c'],
    },
    {
      title: 'Camiseta Solar Roof para Hombre',
      description:
        "Inspirada en nuestro sistema integrado de paneles solares y almacenamiento, la Camiseta Solar Roof de Tesla promueve la energía limpia y sostenible a donde vayas. Diseñada para ofrecer un ajuste cómodo y un estilo moderno, presenta una vista aérea del diseño sin costuras del Techo Solar en el frente y el logo T sobre 'Solar Roof' en la parte trasera. Fabricada en 100% algodón peruano.",
      images: ['1703767-00-A_0_2000.jpg', '1703767-00-A_1.jpg'],
      inStock: 15,
      price: 20000,
      sizes: ['S', 'M', 'L', 'XL'],
      slug: 'men_solar_roof_tee',
      type: 'shirts',
      tags: ['shirt'],
      gender: 'men',
      colors: ['#1d1c1f'],
    },
    {
      title: 'Camiseta Let the Sun Shine para Hombre',
      description:
        "Inspirada en el recurso más ilimitado, la Camiseta 'Let the Sun Shine' destaca nuestro sistema integrado de energía solar y almacenamiento. Diseñada para ofrecer comodidad y estilo, luce un gráfico de atardecer junto con la marca Tesla en el frente y el logo T sobre 'Solar Roof' en la parte trasera. Fabricada en 100% algodón peruano.",
      images: ['1700280-00-A_0_2000.jpg', '1700280-00-A_1.jpg'],
      inStock: 17,
      price: 20000,
      sizes: ['XS', 'S', 'XL', 'XXL'],
      slug: 'men_let_the_sun_shine_tee',
      type: 'shirts',
      tags: ['shirt'],
      gender: 'men',
      colors: ['f2efef'],
    },
    {
      title: 'Camiseta 3D con Gran Logo para Hombre',
      description:
        'Diseñada para ofrecer un ajuste perfecto, comodidad y estilo, la Camiseta 3D con gran logo para hombre está confeccionada en 100% algodón peruano y luce un logo de Tesla impreso en 3D con silicona en el pecho.',
      images: ['8764734-00-A_0_2000.jpg', '8764734-00-A_1.jpg'],
      inStock: 12,
      price: 20000,
      sizes: ['XS', 'S', 'M'],
      slug: 'men_3d_large_wordmark_tee',
      type: 'shirts',
      tags: ['shirt'],
      gender: 'men',
      colors: ['#b9b9b7'],
    },
    {
      title: 'Camiseta 3D con Logo T para Hombre',
      description:
        'Diseñada para brindar comodidad y estilo, la Camiseta 3D con logo T para hombre está confeccionada en 100% algodón peruano y presenta un logo T impreso con silicona en el pecho izquierdo.',
      images: ['7652426-00-A_0_2000.jpg', '7652426-00-A_1.jpg'],
      inStock: 5,
      price: 20000,
      sizes: ['XS', 'S'],
      slug: 'men_3d_t_logo_tee',
      type: 'shirts',
      tags: ['shirt'],
      gender: 'men',
      colors: ['#dadde7'],
    },
    {
      title: 'Camiseta 3D con Pequeño Logo para Hombre',
      description:
        'Diseñada para ofrecer un ajuste perfecto, comodidad y estilo, la Camiseta 3D con pequeño logo para hombre está confeccionada en 100% algodón peruano e incorpora un discreto logo 3D impreso en silicona en el pecho izquierdo.',
      images: ['8528839-00-A_0_2000.jpg', '8528839-00-A_2.jpg'],
      inStock: 2,
      price: 20000,
      sizes: ['XS', 'S', 'M'],
      slug: 'men_3d_small_wordmark_tee',
      type: 'shirts',
      tags: ['shirt'],
      gender: 'men',
      colors: ['f6f5f5'],
    },
    {
      title: 'Camiseta Plaid Mode para Hombre',
      description:
        'Celebrando el modo de rendimiento de Tesla, la Camiseta Plaid Mode para hombre ofrece un ajuste excelente, comodidad y estilo. Confeccionada en 100% algodón, es lo más parecido a viajar en el asiento del copiloto en el Nürburgring.',
      images: ['1549268-00-A_0_2000.jpg', '1549268-00-A_2.jpg'],
      inStock: 82,
      price: 20000,
      sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
      slug: 'men_plaid_mode_tee',
      type: 'shirts',
      tags: ['shirt'],
      gender: 'men',
      colors: ['#1d1c1f'],
    },
    {
      title: 'Camiseta Powerwall para Hombre',
      description:
        "Inspirada en la popular batería Powerwall, la Camiseta Powerwall para hombre está confeccionada en 100% algodón y presenta la frase 'Pure Energy' debajo del logo en la parte trasera. Diseñada para ofrecer un ajuste, comodidad y estilo excepcionales, esta camiseta exclusiva promueve la energía sostenible en cualquier entorno.",
      images: ['9877034-00-A_0_2000.jpg', '9877034-00-A_2.jpg'],
      inStock: 24,
      price: 20000,
      sizes: ['XL', 'XXL'],
      slug: 'men_powerwall_tee',
      type: 'shirts',
      tags: ['shirt'],
      gender: 'men',
      colors: ['#131313'],
    },
    {
      title: 'Camiseta Battery Day para Hombre',
      description:
        'Inspirada en el Battery Day de Tesla y en la celda de batería sin pestañas, la Camiseta Battery Day celebra el futuro del almacenamiento de energía y la fabricación de celdas. Confeccionada en 100% algodón, luce un diseño estilizado de celda en el pecho. Hecha en Perú.',
      images: ['1633802-00-A_0_2000.jpg', '1633802-00-A_2.jpg'],
      inStock: 5,
      price: 18000,
      sizes: ['XS', 'S', 'XXL'],
      slug: 'men_battery_day_tee',
      type: 'shirts',
      tags: ['shirt'],
      gender: 'men',
      colors: ['#131313'],
    },
    {
      title: 'Camiseta A Prueba de Balas Cybertruck para Hombre',
      description:
        'Inspirada en el evento de presentación del Cybertruck, la Camiseta a prueba de balas Cybertruck para hombre está confeccionada en 100% algodón y luce el icónico símbolo de Cybertruck en la parte trasera.',
      images: ['7654399-00-A_0_2000.jpg', '7654399-00-A_1.jpg'],
      inStock: 150,
      price: 18000,
      sizes: ['M', 'L'],
      slug: 'men_cybertruck_bulletproof_tee',
      type: 'shirts',
      tags: ['shirt'],
      gender: 'men',
      colors: ['#1d1c1f'],
    },
    {
      title: 'Camiseta Haha Yes para Hombre',
      description:
        'Inspirada en el gráfico de confirmación de pedido del Model Y, la edición limitada Camiseta Haha Yes para hombre celebra tu pedido con comodidad y estilo. Confeccionada en 100% algodón peruano y con la marca Tesla impresa en el pecho, esta prenda será un recuerdo único por años.',
      images: ['7652410-00-A_0.jpg', '7652410-00-A_1_2000.jpg'],
      inStock: 10,
      price: 20000,
      sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
      slug: 'men_haha_yes_tee',
      type: 'shirts',
      tags: ['shirt'],
      gender: 'men',
      colors: ['ffffff'],
    },
    {
      title: 'Camiseta S3XY para Hombre',
      description:
        "Edición limitada: la Camiseta S3XY para hombre está diseñada para brindar un ajuste perfecto, comodidad y estilo. Confeccionada en 100% algodón, presenta un logo 'S3XY' impreso en 3D con silicona en el pecho. Hecha en Perú y disponible en negro.",
      images: ['8764600-00-A_0_2000.jpg', '8764600-00-A_2.jpg'],
      inStock: 34,
      price: 20000,
      sizes: ['XS', 'S', 'M', 'L'],
      slug: 'men_s3xy_tee',
      type: 'shirts',
      tags: ['shirt'],
      gender: 'men',
      colors: ['#1a171a'],
    },
    {
      title: 'Camiseta de Manga Larga 3D con Logo para Hombre',
      description:
        'Diseñada para ofrecer un ajuste perfecto, comodidad y estilo, esta camiseta de manga larga 3D con logo para hombre está confeccionada en 100% algodón y luce un discreto logo en el pecho izquierdo.',
      images: ['8764813-00-A_0_2000.jpg', '8764813-00-A_1.jpg'],
      inStock: 15,
      price: 22000,
      sizes: ['XL', 'XXL'],
      slug: 'men_3d_wordmark_long_sleeve_tee',
      type: 'shirts',
      tags: ['shirt'],
      gender: 'men',
      colors: ['f2efef'],
    },
    {
      title: 'Camiseta de Manga Larga 3D con Logo T para Hombre',
      description:
        'Diseñada para ofrecer un ajuste perfecto, comodidad y estilo, esta camiseta de manga larga 3D con logo T para hombre está confeccionada en 100% algodón y presenta un discreto logo T en el pecho izquierdo.',
      images: ['8529198-00-A_0_2000.jpg', '8529198-00-A_1.jpg'],
      inStock: 12,
      price: 22000,
      sizes: ['XS', 'XXL'],
      slug: 'men_3d_t_logo_long_sleeve_tee',
      type: 'shirts',
      tags: ['shirt'],
      gender: 'men',
      colors: ['f2efef'],
    },
    {
      title: 'Hoodie Ligero Raven para Hombre',
      description:
        "Presentamos la Colección Tesla Raven. Este hoodie ligero para hombre 'Raven' tiene una silueta relajada y premium, confeccionado con una mezcla sostenible de bambú y algodón. Presenta discretos logos de Tesla de poliuretano termoplástico en el pecho y en la manga, junto a un interior de french terry ideal para cualquier temporada. Fabricado con 70% bambú y 30% algodón.",
      images: ['1740245-00-A_0_2000.jpg', '1740245-00-A_1.jpg'],
      inStock: 10,
      price: 45000,
      sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
      slug: 'men_raven_lightweight_hoodie',
      type: 'hoodies',
      tags: ['hoodie'],
      gender: 'men',
      colors: ['#1d1c1f'],
    },
    {
      title: 'Hoodie Pullover Chill',
      description:
        'Presentamos la Colección Tesla Chill. El hoodie pullover Chill cuenta con un exterior premium y de gran peso, y un interior de felpa suave para brindar comodidad en cualquier temporada. Este hoodie unisex presenta discretos logos de Tesla de poliuretano termoplástico en el pecho y en la manga, una capucha de doble capa con costura única y bolsillos con tiradores de cremallera mate. Fabricado con 60% algodón y 40% poliéster reciclado.',
      images: ['1740051-00-A_0_2000.jpg', '1740051-00-A_1.jpg'],
      inStock: 10,
      price: 50000,
      sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
      slug: 'chill_pullover_hoodie',
      type: 'hoodies',
      tags: ['hoodie'],
      gender: 'men',
      colors: ['#5f6775'],
    },
    {
      title: 'Hoodie con Cremallera Completa Chill para Hombre',
      description:
        "Presentamos la Colección Tesla Chill. El hoodie con cremallera completa para hombre 'Chill' cuenta con un exterior premium y de gran peso, y un interior de felpa suave para brindar comodidad en cualquier temporada. Presenta discretos logos de Tesla de poliuretano termoplástico en el pecho y en la manga, una capucha de doble capa con costura única y bolsillos con tiradores de cremallera mate. Fabricado con 60% algodón y 40% poliéster reciclado.",
      images: ['1741111-00-A_0_2000.jpg', '1741111-00-A_1.jpg'],
      inStock: 100,
      price: 42000,
      sizes: ['XS', 'L', 'XL', 'XXL'],
      slug: 'men_chill_full_zip_hoodie',
      type: 'shirts',
      tags: ['shirt'],
      gender: 'men',
      colors: ['#4d5462', '#3f3d49'],
    },
    {
      title: 'Pullover Chill con Cremallera 1/4 - Gris para Hombre',
      description:
        "Presentamos la Colección Tesla Chill. El pullover con cremallera a 1/4 para hombre 'Chill' cuenta con un exterior premium y de gran peso, y un interior de felpa suave para brindar comodidad en cualquier temporada. Presenta discretos logos de Tesla de poliuretano termoplástico en el pecho y debajo del cuello, junto a un tirador de cremallera mate personalizado. Fabricado con 60% algodón y 40% poliéster reciclado.",
      images: ['1740140-00-A_0_2000.jpg', '1740140-00-A_1.jpg'],
      inStock: 7,
      price: 40000,
      sizes: ['XS', 'S', 'M'],
      slug: 'men_chill_quarter_zip_pullover_-_gray',
      type: 'shirts',
      tags: ['shirt'],
      gender: 'men',
      colors: ['#484652'],
    },
    {
      title: 'Pullover Chill con Cremallera 1/4 - Blanco para Hombre',
      description:
        "Presentamos la Colección Tesla Chill. El pullover con cremallera a 1/4 para hombre 'Chill' cuenta con un exterior premium y de gran peso, y un interior de felpa suave para brindar comodidad en cualquier temporada. Presenta discretos logos de Tesla de poliuretano termoplástico en el pecho y debajo del cuello, junto a un tirador de cremallera mate personalizado. Fabricado con 60% algodón y 40% poliéster reciclado.",
      images: ['1740145-00-A_2_2000.jpg', '1740145-00-A_1.jpg'],
      inStock: 15,
      price: 40000,
      sizes: ['XS', 'S', 'M', 'L'],
      slug: 'men_chill_quarter_zip_pullover_-_white',
      type: 'shirts',
      tags: ['shirt'],
      gender: 'men',
      colors: ['#e5e5e9'],
    },
    {
      title: 'Hoodie Pullover 3D con Gran Logo',
      description:
        'El hoodie pullover 3D con gran logo para hombre cuenta con un interior de felpa suave y una capucha ajustable con forro de jersey para mayor comodidad y protección. Diseñado en estilo masculino, presenta un logo 3D impreso en silicona en tono sobre tono en el pecho.',
      images: ['8529107-00-A_0_2000.jpg', '8529107-00-A_1.jpg'],
      inStock: 15,
      price: 38000,
      sizes: ['XS', 'S', 'XL', 'XXL'],
      slug: '3d_large_wordmark_pullover_hoodie',
      type: 'hoodies',
      tags: ['hoodie'],
      gender: 'men',
      colors: ['1e1e1e'],
    },
    {
      title: 'Hoodie con Graffiti Cybertruck',
      description:
        'Inspirado en el icónico logo de Tesla, el Hoodie con graffiti Cybertruck es un clásico en ciernes. Diseñado en estilo masculino, cuenta con felpa suave y una capucha ajustable con forro de jersey para brindar una cobertura cómoda.',
      images: ['7654420-00-A_0_2000.jpg', '7654420-00-A_1_2000.jpg'],
      inStock: 13,
      price: 35000,
      sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
      slug: 'cybertruck_graffiti_hoodie',
      type: 'hoodies',
      tags: ['hoodie'],
      gender: 'men',
      colors: ['1e1e1e'],
    },
    {
      title: 'Gorra Relaxed con Logo T',
      description:
        'La gorra Relaxed con logo T combina una silueta clásica con detalles modernos, incluyendo un logo T en 3D y un cierre con hebilla metálica. Su diseño ultrasuave es flexible y resistente a la abrasión, mientras que la banda interna cuenta con acolchado quilted para mayor comodidad y absorción de la humedad. La visera está fabricada con plástico reciclado. 100% algodón.',
      images: ['1657932-00-A_0_2000.jpg', '1657932-00-A_1.jpg'],
      inStock: 11,
      price: 25000,
      sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
      slug: 'relaxed_t_logo_hat',
      type: 'hats',
      tags: ['hat'],
      gender: 'men',
      colors: ['#282932'],
    },
    {
      title: 'Gorro con Puño Térmico',
      description:
        'El gorro con puño térmico presenta una silueta clásica combinada con detalles modernos. Su diseño ultrasuave y el forro interior acolchado ofrecen comodidad y retención de calor. 100% algodón.',
      images: ['1740417-00-A_0_2000.jpg', '1740417-00-A_1.jpg'],
      inStock: 13,
      price: 28000,
      sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
      slug: 'thermal_cuffed_beanie',
      type: 'hats',
      tags: ['hat'],
      gender: 'men',
      colors: ['#b4b8bd'],
    },
    {
      title: 'Chaqueta Puffer Corta para Mujer',
      description:
        'La chaqueta puffer corta para mujer presenta una silueta recortada y moderna, ideal para la temporada de frío. Cuenta con discretos logos de Tesla inyectados con silicona debajo del cuello trasero y en la manga derecha, tiradores de cremallera de metal mate y un cuello forrado de felpa suave. Fabricada con 87% nailon y 13% poliuretano.',
      images: ['1740535-00-A_0_2000.jpg', '1740535-00-A_1.jpg'],
      inStock: 85,
      price: 75000,
      sizes: ['XS', 'S', 'M'],
      slug: 'women_cropped_puffer_jacket',
      type: 'hoodies',
      tags: ['hoodie'],
      gender: 'women',
      colors: ['#4e5060'],
    },
    {
      title: 'Hoodie Corta con Medio Cierre Chill para Mujer',
      description:
        "Presentamos la Colección Tesla Chill. El hoodie corta con medio cierre para mujer 'Chill' cuenta con un exterior de felpa suave premium y una silueta recortada, ideal para el día a día. Dispone de un dobladillo elástico que se ajusta a la cintura, logos sutiles de Tesla en la capucha y la manga, una capucha de doble capa con costura única y un tirador de cremallera en anillo personalizado. Fabricado con 60% algodón y 40% poliéster reciclado.",
      images: ['1740226-00-A_0_2000.jpg', '1740226-00-A_1.jpg'],
      inStock: 10,
      price: 50000,
      sizes: ['XS', 'S', 'M', 'XXL'],
      slug: 'women_chill_half_zip_cropped_hoodie',
      type: 'hoodies',
      tags: ['hoodie'],
      gender: 'women',
      colors: ['#92897c'],
    },
    {
      title: 'Sudadera Holgada Raven para Mujer',
      description:
        "Presentamos la Colección Tesla Raven. La sudadera holgada para mujer 'Raven' tiene una silueta relajada y premium, confeccionada con una mezcla sostenible de bambú y algodón. Presenta un discreto logo de Tesla en la manga izquierda y un interior de french terry que brinda una sensación acogedora en cualquier temporada. Combínala con tus joggers Raven o tu look favorito.",
      images: ['1740260-00-A_0_2000.jpg', '1740260-00-A_1.jpg'],
      inStock: 9,
      price: 55000,
      sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
      slug: 'women_raven_slouchy_crew_sweatshirt',
      type: 'hoodies',
      tags: ['hoodie'],
      gender: 'women',
      colors: ['#373739'],
    },
    {
      title: 'Camiseta de Manga Larga Recortada Turbine para Mujer',
      description:
        "Presentamos la Colección Tesla Turbine. Diseñada para el estilo y la comodidad diaria, esta camiseta de manga larga recortada para mujer 'Turbine' presenta un discreto logo a base de agua de Tesla en el pecho y el logo T debajo del cuello trasero. El tejido de doble tinte ofrece un estilo suave y casual con una silueta recortada. Fabricada con 50% algodón y 50% poliéster.",
      images: ['1740290-00-A_0_2000.jpg', '1740290-00-A_1.jpg'],
      inStock: 10,
      price: 25000,
      sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
      slug: 'women_turbine_cropped_long_sleeve_tee',
      type: 'shirts',
      tags: ['shirt'],
      gender: 'women',
      colors: ['#807d85'],
    },
    {
      title: 'Camiseta de Manga Corta Recortada Turbine para Mujer',
      description:
        "Presentamos la Colección Tesla Turbine. Diseñada para el estilo y la comodidad diaria, esta camiseta de manga corta recortada para mujer 'Turbine' presenta un discreto logo a base de agua de Tesla en el pecho y el logo T debajo del cuello trasero. El tejido de doble tinte crea un estilo suave y casual con una silueta recortada. Fabricada con 50% algodón y 50% poliéster.",
      images: ['1741441-00-A_0_2000.jpg', '1741441-00-A_1.jpg'],
      inStock: 0,
      price: 23000,
      sizes: ['XS', 'S'],
      slug: 'women_turbine_cropped_short_sleeve_tee',
      type: 'shirts',
      tags: ['shirt'],
      gender: 'women',
      colors: ['f9f5f5'],
    },
    {
      title: 'Camiseta Corta de Escote Redondo con Logo T para Mujer',
      description:
        'Diseñada para el estilo y la comodidad, esta camiseta corta de escote redondo para mujer presenta un logo T en 3D impreso en silicona en tono sobre tono en el pecho izquierdo. Confeccionada con 50% algodón peruano y 50% viscosa peruana.',
      images: ['8765090-00-A_0_2000.jpg', '8765090-00-A_1.jpg'],
      inStock: 30,
      price: 22000,
      sizes: ['XS', 'S', 'M', 'L', 'XXL'],
      slug: 'women_t_logo_short_sleeve_scoop_neck_tee',
      type: 'shirts',
      tags: ['shirt'],
      gender: 'women',
      colors: ['#ffffff'],
    },
    {
      title: 'Camiseta Larga de Escote Redondo con Logo T para Mujer',
      description:
        'Diseñada para el estilo y la comodidad, esta camiseta larga de escote redondo para mujer presenta un logo T en 3D impreso en silicona en tono sobre tono en el pecho izquierdo. Confeccionada con 50% algodón peruano y 50% viscosa peruana.',
      images: ['8765100-00-A_0_2000.jpg', '8765100-00-A_1.jpg'],
      inStock: 16,
      price: 24000,
      sizes: ['XS', 'S', 'L', 'XL', 'XXL'],
      slug: 'women_t_logo_long_sleeve_scoop_neck_tee',
      type: 'shirts',
      tags: ['shirt'],
      gender: 'women',
      colors: ['#f9f5f5'],
    },
    {
      title: 'Camiseta Corta de Cuello en V con Pequeño Logo para Mujer',
      description:
        'Diseñada para el estilo y la comodidad, esta camiseta corta de cuello en V para mujer presenta un sutil logo 3D impreso en silicona en el pecho izquierdo. Confeccionada en 100% algodón peruano.',
      images: ['8765120-00-A_0_2000.jpg', '8765120-00-A_1.jpg'],
      inStock: 18,
      price: 22000,
      sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
      slug: 'women_small_wordmark_short_sleeve_v-neck_tee',
      type: 'shirts',
      tags: ['shirt'],
      gender: 'women',
      colors: ['#212121'],
    },
    {
      title: 'Camiseta Corta de Cuello Redondo con Gran Logo para Mujer',
      description:
        'Diseñada para el estilo y la comodidad, esta camiseta corta de cuello redondo para mujer luce un gran logo 3D impreso en silicona en tono sobre tono a lo largo del pecho. Confeccionada en 100% algodón pima peruano.',
      images: ['8765115-00-A_0_2000.jpg', '8765115-00-A_1.jpg'],
      inStock: 5,
      price: 22000,
      sizes: ['XL', 'XXL'],
      slug: 'women_large_wordmark_short_sleeve_crew_neck_tee',
      type: 'shirts',
      tags: ['shirt'],
      gender: 'women',
      colors: ['#373739'],
    },
    {
      title: 'Camiseta Plaid Mode para Mujer',
      description:
        'Celebrando el modo de rendimiento de Tesla, la Camiseta Plaid Mode para mujer ofrece un ajuste excelente, comodidad y estilo. Confeccionada en 100% algodón, es lo más parecido a viajar en el asiento del copiloto en el Nürburgring.',
      images: ['1549275-00-A_0_2000.jpg', '1549275-00-A_1.jpg'],
      inStock: 16,
      price: 22000,
      sizes: ['S', 'M'],
      slug: 'women_plaid_mode_tee',
      type: 'shirts',
      tags: ['shirt'],
      gender: 'women',
      colors: ['#212121'],
    },
    {
      title: 'Camiseta Powerwall para Mujer',
      description:
        "Inspirada en la popular batería Powerwall, la Camiseta Powerwall para mujer está confeccionada en 100% algodón y presenta la frase 'Pure Energy' debajo de nuestro logo en la parte trasera. Diseñada para ofrecer un ajuste, comodidad y estilo excepcionales, esta prenda exclusiva promueve la energía sostenible en cualquier entorno.",
      images: ['9877040-00-A_0_2000.jpg', '9877040-00-A_1.jpg'],
      inStock: 10,
      price: 50000,
      sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
      slug: 'women_powerwall_tee',
      type: 'shirts',
      tags: ['shirt'],
      gender: 'women',
      colors: ['#373739'],
    },
    {
      title: 'Chaqueta Corp para Mujer',
      description:
        "Totalmente personalizada y de estilo único, la Chaqueta Corp para mujer presenta un logo 'T' impreso en silicona en el pecho izquierdo y la marca Tesla de forma prominente en la espalda.",
      images: ['5645680-00-A_0_2000.jpg', '5645680-00-A_3.jpg'],
      inStock: 3,
      price: 40000,
      sizes: ['M', 'L', 'XL', 'XXL'],
      slug: 'women_corp_jacket',
      type: 'shirts',
      tags: ['shirt'],
      gender: 'women',
      colors: ['#1b181c'],
    },
    {
      title: 'Joggers Raven para Mujer',
      description:
        "Presentamos la Colección Tesla Raven. Los joggers para mujer 'Raven' tienen una silueta relajada y premium, confeccionados con una mezcla sostenible de algodón y bambú. Presentan un discreto logo de Tesla y un logo T, además de un interior de french terry que brinda comodidad en cualquier temporada. Combínalos con tu sudadera o cualquier otro estilo de la colección.",
      images: ['1740270-00-A_0_2000.jpg', '1740270-00-A_1.jpg'],
      inStock: 162,
      price: 45000,
      sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
      slug: 'women_raven_joggers',
      type: 'shirts',
      tags: ['shirt'],
      gender: 'women',
      colors: ['#1b181c'],
    },
    {
      title: 'Camiseta de Manga Larga Cybertruck para Niños',
      description:
        'Diseñada para ofrecer comodidad y estilo, la Camiseta de manga larga Cybertruck para niños presenta un logo graffiti de Cybertruck a base de agua en el pecho, la marca Tesla en el brazo izquierdo y el icónico logo T en el cuello trasero. Fabricada con 50% algodón y 50% poliéster.',
      images: ['1742694-00-A_1_2000.jpg', '1742694-00-A_3.jpg'],
      inStock: 10,
      price: 18000,
      sizes: ['XS', 'S', 'M'],
      slug: 'kids_cybertruck_long_sleeve_tee',
      type: 'shirts',
      tags: ['shirt'],
      gender: 'kid',
      colors: ['#131313'],
    },
    {
      title: 'Camiseta Garabateada con Logo T para Niños',
      description:
        'La Camiseta Garabateada con Logo T para Niños está confeccionada en 100% algodón peruano y presenta un logo T dibujado al estilo garabato, perfecto para que cada joven artista lo luzca.',
      images: ['8529312-00-A_0_2000.jpg', '8529312-00-A_1.jpg'],
      inStock: 0,
      price: 15000,
      sizes: ['XS', 'S', 'M'],
      slug: 'kids_scribble_t_logo_tee',
      type: 'shirts',
      tags: ['shirt'],
      gender: 'kid',
      colors: ['#babab8'],
    },
    {
      title: 'Camiseta Cybertruck para Niños',
      description:
        'La Camiseta Cybertruck para Niños presenta la icónica palabra grafiteada de Cybertruck y está confeccionada en 100% algodón peruano para brindar el máximo confort.',
      images: ['8529342-00-A_0_2000.jpg', '8529342-00-A_1.jpg'],
      inStock: 10,
      price: 15000,
      sizes: ['XS', 'S', 'M'],
      slug: 'kids_cybertruck_tee',
      type: 'shirts',
      tags: ['shirt'],
      gender: 'kid',
      colors: ['#f9f5f5'],
    },
    {
      title: 'Camiseta de Rayas de Carrera para Niños',
      description:
        'La renovada Camiseta de Rayas de Carrera para Niños está confeccionada en 100% algodón peruano e incorpora una banda de carreras mejorada junto con la marca Tesla en acabado cepillado, perfecta para cualquier pequeño amante de la velocidad.',
      images: ['8529354-00-A_0_2000.jpg', '8529354-00-A_1.jpg'],
      inStock: 10,
      price: 18000,
      sizes: ['XS', 'S', 'M'],
      slug: 'kids_racing_stripe_tee',
      type: 'shirts',
      tags: ['shirt'],
      gender: 'kid',
      colors: ['#1e1e1e'],
    },
    {
      title: 'Camiseta 3D con Logo T para Niños',
      description:
        'Diseñada para ofrecer un ajuste perfecto, comodidad y estilo, la Camiseta con Logo T de Tesla para Niños está confeccionada en 100% algodón peruano y presenta un logo T impreso en silicona en el pecho izquierdo.',
      images: ['7652465-00-A_0_2000.jpg', '7652465-00-A_1.jpg'],
      inStock: 10,
      price: 18000,
      sizes: ['XS', 'S', 'M'],
      slug: 'kids_3d_t_logo_tee',
      type: 'shirts',
      tags: ['shirt'],
      gender: 'kid',
      colors: ['#b4b8bd'],
    },
    {
      title: 'Camiseta a Cuadros para Niños',
      description:
        'La camiseta a cuadros está confeccionada en algodón peruano de grano largo, libre de OGM. Perú es el único país en el mundo donde el algodón se cosecha a mano a gran escala. Esta tradición de 4,500 años evita daños en la fibra durante la recolección y elimina la necesidad de usar químicos para abrir las plantas antes de la cosecha. El proceso ecológico resulta en un algodón suave, fuerte y brillante, ¡y la prenda se volverá aún más suave con cada lavado!',
      images: ['100042307_0_2000.jpg', '100042307_alt_2000.jpg'],
      inStock: 10,
      price: 18000,
      sizes: ['XS', 'S', 'M'],
      slug: 'kids_checkered_tee',
      type: 'shirts',
      tags: ['shirt'],
      gender: 'kid',
      colors: ['#9d2c1b'],
    },
    {
      title: "Mono 'Hecho en la Tierra por Humanos'",
      description:
        'Para el futuro viajero espacial con gusto exigente, este mono suave de algodón con cierre a presión en la parte inferior ofrece comodidad y estilo. Incluye etiquetado claro en caso de contacto con una nueva civilización espacial. Confeccionado en 100% algodón. Hecho en Perú.',
      images: ['1473809-00-A_1_2000.jpg', '1473809-00-A_alt.jpg'],
      inStock: 16,
      price: 17000,
      sizes: ['XS', 'S'],
      slug: 'made_on_earth_by_humans_onesie',
      type: 'shirts',
      tags: ['shirt'],
      gender: 'kid',
      colors: ['f9f5f5'],
    },
    {
      title: 'Mono Garabateado con Logo T',
      description:
        'El Mono Garabateado con Logo T para Niños está confeccionado en 100% algodón peruano y presenta un logo T dibujado al estilo garabato, ideal para que cada pequeño artista lo luzca.',
      images: ['8529387-00-A_0_2000.jpg', '8529387-00-A_1.jpg'],
      inStock: 0,
      price: 17000,
      sizes: ['XS', 'S'],
      slug: 'scribble_t_logo_onesie',
      type: 'shirts',
      tags: ['shirt'],
      gender: 'kid',
      colors: ['#f9f5f5'],
    },
    {
      title: "Mono 'Casi Cero Emisiones'",
      description:
        'Demuestra tu compromiso con la energía sostenible con este mono pícaro para los más pequeños. Nota: No evita emisiones. Confeccionado en 100% algodón. Hecho en Perú.',
      images: ['1473834-00-A_2_2000.jpg', '1473829-00-A_2_2000.jpg'],
      inStock: 10,
      price: 17000,
      sizes: ['XS', 'S'],
      slug: 'zero_emissions_(almost)_onesie',
      type: 'shirts',
      tags: ['shirt'],
      gender: 'kid',
      colors: ['#a2a2a2', '#ab301d'],
    },
    {
      title: 'Chaqueta Bomber Cyberquad para Niños',
      description:
        'Luce la Chaqueta Bomber Cyberquad para Niños durante tus aventuras. La prenda presenta una ilustración estilo grafiti de la silueta y marca de Cyberquad, tres bolsillos con cremallera y nuestro icónico logo T junto a la marca Tesla impresa en las mangas. Fabricada con 60% algodón y 40% poliéster.',
      images: ['1742702-00-A_0_2000.jpg', '1742702-00-A_1.jpg'],
      inStock: 10,
      price: 35000,
      sizes: ['XS', 'S', 'M'],
      slug: 'kids_cyberquad_bomber_jacket',
      type: 'shirts',
      tags: ['shirt'],
      gender: 'kid',
      colors: ['#131313'],
    },
    {
      title: 'Chaqueta Corp para Niños',
      description:
        'Deslumbra en el patio de recreo con la Chaqueta Corp para Niños. Inspirada en la original Chaqueta Corp de Tesla, esta prenda mantiene el mismo estilo discreto y materiales de alta calidad, pero en una escala reducida perfecta para los más pequeños.',
      images: ['1506211-00-A_0_2000.jpg', '1506211-00-A_1_2000.jpg'],
      inStock: 10,
      price: 25000,
      sizes: ['XS', 'S', 'M'],
      slug: 'kids_corp_jacket',
      type: 'shirts',
      tags: ['shirt'],
      gender: 'kid',
      colors: ['#131313'],
    },
  ],
};

const seedDatabase = async () => {
  try {
    console.log('🌱 Iniciando la siembra de datos...');

    await deleteAllCloudinaryImages();

    await prisma.orderItem.deleteMany();
    await prisma.productImage.deleteMany();
    await prisma.product.deleteMany();
    await prisma.category.deleteMany();
    console.log('✅ Datos antiguos eliminados.');

    const categories = await Promise.all(
      initialData.categories.map(async (name) => {
        const existingCategory = await prisma.category.findUnique({
          where: { name },
        });

        return existingCategory || prisma.category.create({ data: { name } });
      })
    );

    const categoryMap = new Map(
      categories.map((cat) => [cat.name.toLowerCase(), cat.id])
    );
    console.log('✅ Categorías creadas.');

    for (const productData of initialData.products) {
      const imageUrls = await Promise.all(
        productData.images.map(async (imageName) => {
          const imagePath = path.join(
            process.cwd(),
            'public',
            'products',
            imageName
          );
          return uploadImageToCloudinary(imagePath);
        })
      );

      const product = await prisma.product.create({
        data: {
          title: productData.title,
          description: productData.description,
          price: productData.price,
          inStock: productData.inStock,
          slug: productData.slug,
          sizes: productData.sizes as Size[],
          colors: productData.colors,
          tags: productData.tags,
          gender: productData.gender as Gender,
          categoryId: categoryMap.get(productData.type.toLowerCase())!,
        },
        include: {
          ProductImage: true,
        },
      });

      await prisma.productImage.createMany({
        data: imageUrls.map((url) => ({
          url,
          productId: product.id,
        })),
        skipDuplicates: true,
      });
    }

    console.log('✅ Productos y sus imágenes agregados exitosamente.');
    console.log('🎉 Siembra de datos completada con éxito.');
  } catch (e) {
    console.error('❌ Error durante la siembra de datos:', e);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
};

seedDatabase()
  .catch((e) => {
    console.error('❌ Error durante la siembra de datos:', e);
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
