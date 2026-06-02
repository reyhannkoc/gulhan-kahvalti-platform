// Royalty-free images sourced from Unsplash — stored as local assets.
// To replace: swap the file in src/assets/brand/ with the same filename.
import corridorPlaceImg from '../assets/brand/place/corridor-place.jpg'
import entrancePlantsImg from '../assets/brand/place/entrance-plants.jpg'
import homemadeJarsImg from '../assets/brand/products/homemade-jars.jpg'
import jarLabelImg from '../assets/brand/products/jar-label.jpg'
import heroSeaDrinkImg from '../assets/brand/sea/hero-sea-drink.jpg'
import menuPhotoImg from '../assets/brand/sea/menu-photo.jpg'
import seaViewImg from '../assets/brand/sea/sea-view.jpg'

export const brandImages = {
  // Hero section — café/drink lifestyle with warm tones
  heroSeaDrink: heroSeaDrinkImg,

  // Sea view — coastal blue water, aerial perspective
  seaView: seaViewImg,

  // Homemade jars — artisan preserves and spreads
  homemadeJars: homemadeJarsImg,

  // Restaurant entrance with plants — Mediterranean ambiance
  entrancePlants: entrancePlantsImg,

  // Restaurant corridor/interior — warm, inviting atmosphere
  corridorPlace: corridorPlaceImg,

  // Jar label close-up — for product detail sections
  jarLabel: jarLabelImg,

  // Breakfast/food spread — for menu and food sections
  menuPhoto: menuPhotoImg,
} as const
